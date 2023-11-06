import { Component, OnDestroy, OnInit } from '@angular/core';
import { DBkeys, StorageService } from '@mango/core-shared';
import { UserAuth } from '@mango/data-models/lib-data-models';
import * as dayjs from 'dayjs';
import { UserIdleService } from 'libs/core-shared/src/lib/services';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CentralAuthFacade } from './+state/facades';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  subs: Subscription[] = []

  constructor(private storageService: StorageService, private centralAuthFacade: CentralAuthFacade, private idleService: UserIdleService) { }

  ngOnInit(): void {
    this.populateLoggedInUserData()
    this.logoutWhenTimedout()

    this.subs.push(
      this.setupRedirectionWhenLoggedIn().subscribe(),
      this.setupIdleLogout().subscribe()
    )
  }

  setupRedirectionWhenLoggedIn(): Observable<any> {
    return combineLatest([
      this.centralAuthFacade.authorizationCode$,
      this.centralAuthFacade.client$,
      this.centralAuthFacade.contactId$
    ]).pipe(
      filter(([authorizationCode, client, contactId]) => !!authorizationCode && !!client && !!contactId),
      map(_ => this.centralAuthFacade.redirectToClient())
    )
  }

  setupIdleLogout(): Observable<any> {
    return this.centralAuthFacade.user$.pipe(
      filter(user => !!user),
      tap(_ => {
        document.onmousemove = _ => this.idleService.resetTimer()
        document.onkeydown = _ => this.idleService.resetTimer()
        this.idleService.startWatching()
      }),
      switchMap(_ => this.idleService.onTimerStart()),
      switchMap(_ => this.idleService.onTimeout()),
      tap(_ => {
        this.idleService.stopWatching()
        document.onmousemove = null
        document.onkeydown = null
        this.centralAuthFacade.logout()
      })
    )
  }

  populateLoggedInUserData(): void {
    const user: UserAuth = this.storageService.getDataObject(DBkeys.USER_AUTH);
    this.centralAuthFacade.setUser(user)
  }

  logoutWhenTimedout() {
    const idleTimeoutDate = dayjs(this.storageService.getData(DBkeys.IDLE_TIMEOUT))
    const currentDate = dayjs(new Date())
    if (currentDate.diff(idleTimeoutDate) > 0) {
      this.storageService.savePermanentData(null, DBkeys.IDLE_TIMEOUT)
      this.centralAuthFacade.logout()
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
    this.idleService.stopWatching()
  }
}
