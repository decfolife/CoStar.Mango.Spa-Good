import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "@mango/core-shared";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginResponse } from "libs/data-models/lib-data-models/src/lib/models/userAuth";
import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import * as AppActions from '../actions/actions';

@Injectable()

export class AuthenticationEffects {

  constructor(private actions$: Actions, private userService: UserService, private router: Router) { }

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
          this.router.navigate(['/'], {queryParamsHandling: 'merge'})
          return AppActions.clearState()
        }
        )
      )
  )
}