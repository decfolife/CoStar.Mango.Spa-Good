import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SettingsService, StorageService, UserService } from "@mango/core-shared";
import { UserAuth } from "@mango/data-models/lib-data-models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserIdleService } from "libs/core-shared/src/lib/services";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import * as AppActions from '../actions';
import { CentralAuthFacade } from "../facades";

@Injectable()

export class AuthenticationEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade, private router: Router, private settingsService: SettingsService, private acitvatedRoute: ActivatedRoute, private storageService: StorageService, private idleService: UserIdleService) { }


  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGIN),
        switchMap((action: { type: string, credentials: any }) => this.userService.login(action.credentials).pipe(
          filter(user => !!user),
          map(user => AppActions.loginSuccess({ user })),
          catchError(_ => of(AppActions.loginError())
          )),
        )
      )
  )

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGIN_SUCCESS),
        switchMap((action: { type: string, user: UserAuth }) => of(
          AppActions.setUser({ user: action.user }),
          AppActions.setAccessToken({ accessToken: action.user.authToken })
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
          this.router.navigate(['/'])
        }
        )
      ), { dispatch: false }
  )

}