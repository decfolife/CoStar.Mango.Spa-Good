import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DBkeys, SettingsService, StorageService, UserService } from "@mango/core-shared";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { combineLatest, of } from "rxjs";
import * as dayjs from 'dayjs';
import { filter, map, switchMap, tap } from "rxjs/operators";
import * as AppActions from '../actions';
import { CentralAuthFacade } from "../facades";
import { ContactRecordHTTPObject, ContactRecord, UserAuth, CentralAuthError, CentralAuthErrorCodes, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE, USER_LOGGED_OUT_ERROR_MESSAGE } from "@mango/data-models/lib-data-models";
import { UserIdleService } from "libs/core-shared/src/lib/services";

@Injectable()

export class AuthenticationEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade, private router: Router, private settingsService: SettingsService, private acitvatedRoute: ActivatedRoute, private storageService: StorageService, private idleService: UserIdleService) { }


  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGIN),
        switchMap((action: { type: string, credentials: any }) => this.userService.login(action.credentials)),
        filter(user => !!user),
        switchMap(user => of(AppActions.setUser({ user }), AppActions.setAccessToken({ accessToken: user.authToken })))
      )
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOG_OUT),
        map(_ => {
          this.userService.logout()
          this.centralAuthFacade.clearState()
          this.router.navigate(['/'])
        }
        )
      ), { dispatch: false }
  )

}