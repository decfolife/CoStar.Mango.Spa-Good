import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtService, UserService, UtilitiesService } from "@mango/core-shared";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginResponse } from "libs/data-models/lib-data-models/src/lib/models/userAuth";
import { combineLatest, of } from "rxjs";
import { catchError, filter, map, switchMap, take } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import { CentralAuthFacade } from "../facades";

@Injectable()

export class AuthenticationEffects {
  constructor(
    private actions$: Actions, 
    private userService: UserService, 
    private jwtService: JwtService,
    private centralAuthFacade: CentralAuthFacade,
    private router: Router) { }

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
        switchMap((action: { type: string, response: LoginResponse }) => combineLatest([of(action.response), this.centralAuthFacade.isClientSpecificLogin$.pipe(take(1))])),
        switchMap(([response, isClientSpecificLogin]) => {
          if (!isClientSpecificLogin) {
            this.userService.setAuth(response.user)
          }

          if (!response.user.hasMultipleSites) {
            // Treat user as if they came in through customer specific login page
            this.centralAuthFacade.setClientSpecificLogin(true)
            this.centralAuthFacade.setSelectedClientKey(response.user.clientKey)
            this.centralAuthFacade.setOpenClientInNewTab(false)
          }

          if (UtilitiesService.isLocalEnvironment()) {
            this.jwtService.saveToken(response.authToken)
          }

          return of(
            AppActions.setUser({ user: response.user }),
            AppActions.setAccessToken({ accessToken: response.authToken })
          )
        })
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
        })
      )
  )
}