import { Injectable } from '@angular/core';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { UserAuth } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as AppActions from '../app.actions';
import { MangoAppFacade } from '../app.facade';


@Injectable()
export class AuthenticationEffects {
  constructor(private actions$: Actions,
    private userService: UserService,
    private facade: MangoAppFacade) { }

  localAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOCAL_AUTH),
        switchMap(_ => this.facade.accessToken$),
        filter(accessToken => !!accessToken),
        switchMap(accessToken => {
          const decodedToken = this.userService.getDecodedAuthToken(accessToken)
          const user: UserAuth = {
            email: decodedToken.email,
            contactId: parseInt(decodedToken.contactId),
            clientKey: decodedToken.clientKey,
            isAutoProvisioned: this.userService.parseBool(decodedToken.isAutoProvisioned),
            isServiceAccount: this.userService.parseBool(decodedToken.isServiceAccount),
            isRemUser: parseInt(decodedToken.securityLevel) > -1,
          }
          return of(AppActions.setAuthenticatedUser({ user }), AppActions.init())
        })
      )
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGOUT_ACTION),
        tap((action: { logoutCA: boolean }) => {
          this.userService.logout()
          this.facade.clearState()
          window.location.href = `${environment.CAUrl}${action.logoutCA ? `?logout=true` : ''}`
        })
      ),
    { dispatch: false }
  );
}
