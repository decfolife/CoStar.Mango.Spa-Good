import { Injectable } from '@angular/core';
import { CookieService, DBkeys, StorageService } from '@mango/core-shared/lib-core-shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as AppActions from '../app.actions';
import { MangoAppFacade } from '../app.facade';
import * as dayjs from 'dayjs';
import { UserIdleService } from 'libs/core-shared/src/lib/services';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class IdleEffects {
    constructor(
        private actions$: Actions,
        private facade: MangoAppFacade,
        private idleService: UserIdleService,
        private storageService: StorageService, 
        public dialog: MatDialog,
    ) { }

    setupIdleTimeout$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(AppActions.SETUP_IDLE_TIMEOUT),
            switchMap(_ => combineLatest([this.facade.authenticatedUser$, this.facade.clientKey$, this.facade.clientInfo$])),
            filter(([user, clientKey, clientInfo]) => !!user && !!clientKey && !!clientInfo),
            tap(([_, clientKey, clientInfo]) => {
              const sharedInfo = CookieService.getSharedInfoCookie(clientKey)

              if (sharedInfo && sharedInfo.ClientIdleTimeout === 0) {
                return AppActions.noOpAction();
              }
              if (!sharedInfo && clientInfo.clientIdleTimeOut === 0) {
                return AppActions.noOpAction();
              }

              let idleMinutes = sharedInfo ? sharedInfo.ClientIdleTimeout : clientInfo.clientIdleTimeOut
    
              this.idleService.setConfigValues({
                idle: (idleMinutes - 1) * 60,
                timeout: 60,
                isMangoSpa: true
              })

              // V06 sets mangoIdle = true by default. 
              // When in SPA, need to set to false by default.
              this.idleService.setMangoIdleCookieProperty(false)
              
              document.onmousemove = _ => this.idleService.resetTimer()
              document.onkeydown = _ => this.idleService.resetTimer()
              this.idleService.startWatching()
            }),
            switchMap(_ => this.idleService.onTimerStart()),
            switchMap(_ => this.idleService.onTimeout()),
            map(_ => {
              this.idleService.stopWatching()
              document.onmousemove = null
              document.onkeydown = null
              return AppActions.logout({ logoutV06: true })
            })
          )
    )

    // logoutWhenTimedOut$ = createEffect(
    //     () =>
    //       this.actions$.pipe(
    //         ofType(AppActions.SETUP_LOGOUT_WHEN_TIMED_OUT),
    //         map(_ => [dayjs(this.storageService.getData(DBkeys.IDLE_TIMEOUT)), dayjs(new Date())]),
    //         filter(([idleTimeoutDate, currentDate]) => currentDate.diff(idleTimeoutDate) > 0),
    //         map(_ => {
    //           this.storageService.savePermanentData(null, DBkeys.IDLE_TIMEOUT)
    //           this.idleService.stopWatching()
    //           document.onmousemove = null
    //           document.onkeydown = null
    //           return AppActions.logout({ logoutV06: true })
    //         })
    //       )
    // )
}