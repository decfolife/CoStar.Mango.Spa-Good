import { Component, OnDestroy, OnInit } from '@angular/core';
import { DBkeys, StorageService } from '@mango/core-shared';
import { ContactRecord, UserAuth } from '@mango/data-models/lib-data-models';
import * as dayjs from 'dayjs';
import { UserIdleService } from 'libs/core-shared/src/lib/services';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CentralAuthFacade } from './+state/facades';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mango-central-auth';

  subs: Subscription[] = []
  constructor(private storageService: StorageService, private centralAuthFacade: CentralAuthFacade, private idleService: UserIdleService) { }

  ngOnInit(): void {
    this.logoutWhenTimedout()
    this.subs.push(this.centralAuthFacade.user$.pipe(
      filter(user => !!user),
      tap(_ => {
        document.onmousemove = _ => this.idleService.resetTimer()
        document.onkeydown = _ => this.idleService.resetTimer()
        this.idleService.startWatching()
      }),
      switchMap(_ => this.idleService.onTimerStart()),
      switchMap(_ => this.idleService.onTimeout().pipe(tap(_ => {
        this.idleService.stopWatching()
        document.onmousemove = null
        document.onkeydown = null
        this.centralAuthFacade.logout()
      })))
    ).subscribe())

    this.populateLoggedInUserData()
    this.centralAuthFacade.authorizationCode$.pipe(
      filter(authorizationCode => !!authorizationCode),
      map(_ => this.centralAuthFacade.redirectToClient())
    ).subscribe()
  }

  logoutWhenTimedout() {
    const idleTimeoutDate = dayjs(this.storageService.getData(DBkeys.IDLE_TIMEOUT))
    const currentDate = dayjs(new Date())
    if (currentDate.diff(idleTimeoutDate) > 0) {
      this.storageService.savePermanentData(null, DBkeys.IDLE_TIMEOUT)
      this.centralAuthFacade.logout()
    }
  }

  populateLoggedInUserData(): void {
    const user: UserAuth = this.storageService.getDataObject(DBkeys.USER_AUTH);
    const clientKey: string = this.storageService.getDataObject(DBkeys.CLIENT_KEY);
    const contactRecord: ContactRecord = this.storageService.getDataObject(DBkeys.CONTACT_RECORD);

    this.centralAuthFacade.setUser(user)
    this.centralAuthFacade.setClientKey(clientKey)
    this.centralAuthFacade.setContactId((contactRecord || {}).contactID)
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe())
      this.idleService.stopWatching()
  }
}
