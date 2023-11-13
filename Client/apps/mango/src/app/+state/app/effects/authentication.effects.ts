import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DBkeys, HeaderService, JwtService, StorageService, UserService } from '@mango/core-shared/lib-core-shared';
import { ContactRecord, ContactRecordHTTPObject, OAuthTokenHTTPResponse, UserAuth } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';
import * as AppActions from '../app.actions';
import { MangoAppFacade } from '../app.facade';


@Injectable()
export class AuthenticationEffects {
  constructor(private actions$: Actions,
    private headerService: HeaderService,
    private storageService: StorageService,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router,
    private facade: MangoAppFacade) { }

  setupAuthentication$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_AUTHENTICATION),
        map(_ => this.storageService.getData(DBkeys.USER_AUTH)),
        filter(authenticatedUser => !!authenticatedUser),
        switchMap(authenticatedUser => of(AppActions.setAuthenticatedUser({ user: authenticatedUser })))
      ),
  );

  setupCremAuthentication$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_CREM_AUTHENTICATION),
        switchMap((action: { authCode: string, redirectionUri: string }) => combineLatest([this.userService.retrieveJwt(action.authCode), of(action.redirectionUri)])),
        concatMap(([response, redirectionUrl]: [OAuthTokenHTTPResponse, string]) => {
          let decodedToken = this.userService.getDecodedAuthToken(response.accessToken)

          const user: UserAuth = {
            email: decodedToken.email,
            contactId: parseInt(decodedToken.contactId),
            clientKey: decodedToken.clientKey,
            isAutoProvisioned: this.userService.parseBool(decodedToken.isAutoProvisioned),
            isServiceAccount: this.userService.parseBool(decodedToken.isServiceAccount)
          }
          // Temporary until cookie auth is implemented in MangoSPA
          this.jwtService.saveToken(response.accessToken)

          this.userService.setAuth(user, response.accessToken)
          this.storageService.savePermanentData(user.clientKey, DBkeys.CLIENT_KEY)
          return combineLatest([of(user), this.userService.getContactRecord(user.email, user.contactId, user.clientKey), of(redirectionUrl)])
        }),
        map(([user, contactRecordHttpResponse, redirectUrl]: [UserAuth, ContactRecordHTTPObject, string]) => {
          const contactRecord = this.userService.parseContactRecordHttpObject(contactRecordHttpResponse)
          this.storageService.savePermanentData(contactRecord, DBkeys.CONTACT_RECORD)
          return [user, contactRecord, redirectUrl]
        }),
        switchMap(([user, contactRecord, redirectUrl]: [UserAuth, ContactRecord, string]) => {
          let accessToken = this.storageService.getData(DBkeys.JWT_TOKEN)
          this.router.navigateByUrl(decodeURIComponent(redirectUrl) || '/')
          return of(
            AppActions.setAuthenticatedUser({ user }),
            AppActions.setAccessToken({ accessToken }),
            AppActions.setContactRecord({ contactRecord })
          )
        }),
      ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SET_AUTHENTICATED_USER_ACTION),
        switchMap(_ => this.facade.authenticatedUser$),
        filter(user => !!user),
        tap(user => this.headerService.loggedInUser$.next(user)),
      ), { dispatch: false }
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGOUT_ACTION),
        tap(_ => {
          this.userService.logout()
          this.headerService.logout$.next(false)
          this.facade.setAuthenticatedUser(null)
          this.facade.setAccessToken(null)
          const url = `${environment.CAUrl}?logout=true`
          window.location.href = url
        })
      ),
    { dispatch: false }
  );
}
