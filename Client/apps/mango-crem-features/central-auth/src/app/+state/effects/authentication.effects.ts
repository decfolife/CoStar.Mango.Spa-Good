import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SettingsService, StorageService, UserService } from "@mango/core-shared";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserIdleService } from "libs/core-shared/src/lib/services";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import { CentralAuthFacade } from "../facades";
import { LoginResponse } from "libs/data-models/lib-data-models/src/lib/models/userAuth";

@Injectable()

export class AuthenticationEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade, private router: Router, private settingsService: SettingsService, private acitvatedRoute: ActivatedRoute, private storageService: StorageService, private idleService: UserIdleService) { }

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGIN),
        switchMap((action: { type: string, credentials: any }) => this.userService.login(action.credentials).pipe(
          filter(response => !!response),
          map(response => AppActions.loginSuccess({ response })),
          catchError(_ => of(AppActions.loginError())
          )),
        )
      )
  )

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGIN_SUCCESS),
        switchMap((action: { type: string, response: LoginResponse }) => of(
          AppActions.setUser({ user: action.response.user }),
          AppActions.setAccessToken({ accessToken: action.response.authToken })
        ))
      )
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOG_OUT),
        map(_ => {
          this.userService.logout()
          this.centralAuthFacade.clearState()
          this.router.navigate(['/'], {queryParamsHandling: 'merge'})
        }
        )
      ), { dispatch: false }
  )
}