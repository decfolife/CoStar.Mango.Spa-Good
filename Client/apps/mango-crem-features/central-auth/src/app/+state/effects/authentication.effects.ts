import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtService, UtilitiesService } from "@mango/core-shared";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginResponse } from "libs/data-models/lib-data-models/src/lib/models/userAuth";
import { combineLatest, of } from "rxjs";
import { catchError, filter, map, switchMap, take } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import { CentralAuthFacade } from "../facades";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { MangoErrorTypes, NOTIFICATION_ERROR_TYPES_MAP } from "@mango/data-models/lib-data-models";

@Injectable()

export class AuthenticationEffects {
  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private notificationService: ToastrService,
    private centralAuthFacade: CentralAuthFacade,
    private router: Router) { }

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGIN),
        switchMap((action: { type: string, credentials: any }) => this.authService.login(action.credentials).pipe(
          filter(response => !!response),
          map(response => AppActions.loginSuccess({ response })),
            catchError(error => {
              this.notificationService[NOTIFICATION_ERROR_TYPES_MAP[MangoErrorTypes.FATAL]](error.message, error.title)
              return of(AppActions.loginError())
            }
          )),
        )
      )
  )

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGIN_SUCCESS),
        switchMap((action: { type: string, response: LoginResponse }) => {
          const user = action.response.user

          return of(
            AppActions.setUser({ user: user })
          )
        })
      )
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOG_OUT),
        map(_ => {
          this.authService.logout()
          this.router.navigate(['/'], {queryParamsHandling: 'merge'})
          return AppActions.clearState()
        })
      )
  )
}