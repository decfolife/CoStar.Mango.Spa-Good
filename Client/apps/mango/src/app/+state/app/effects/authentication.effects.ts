import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DBkeys, JwtService, StorageService, UserService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
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
    private storageService: StorageService,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router,
    private facade: MangoAppFacade) { }


  localAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOCAL_AUTH),
        map(_ => this.storageService.getData(DBkeys.USER_AUTH)),
        filter(authenticatedUser => !!authenticatedUser),
        switchMap(authenticatedUser => of(AppActions.setAuthenticatedUser({ user: authenticatedUser }), AppActions.init()))
      ),
  );

  oauthAuthentication$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.OAUTH_AUTH),
        switchMap((action: { authCode: string, redirectionUri: string }) => combineLatest([this.userService.retrieveJwt(action.authCode), of(action.redirectionUri)])),
        concatMap(([response, redirectionUrl]: [OAuthTokenHTTPResponse, string]) => {
          let decodedToken = this.userService.getDecodedAuthToken(response.accessToken)

          const user: UserAuth = {
            userId: parseInt(decodedToken.userId),
            email: decodedToken.email,
            contactId: parseInt(decodedToken.contactId),
            clientKey: decodedToken.clientKey,
            isAutoProvisioned: this.userService.parseBool(decodedToken.isAutoProvisioned),
            isServiceAccount: this.userService.parseBool(decodedToken.isServiceAccount),
            isRemUser: parseInt(decodedToken.securityLevel) > -1,
          }

          if (UtilitiesService.isLocalEnvironment()) {
            this.jwtService.saveToken(response.accessToken)
          }

          this.facade.setAccessToken(response.accessToken)
          this.userService.setAuth(user)
          this.storageService.savePermanentData(user.clientKey, DBkeys.CLIENT_KEY)
          return combineLatest([of(user), of(response.accessToken), this.userService.getContactRecord(user.email, user.contactId, user.clientKey), of(redirectionUrl)])
        }),
        map(([user, accessToken, contactRecordHttpResponse, redirectUrl]: [UserAuth, string, ContactRecordHTTPObject, string]) => {
          const contactRecord = this.userService.parseContactRecordHttpObject(contactRecordHttpResponse)
          this.storageService.savePermanentData(contactRecord, DBkeys.CONTACT_RECORD)
          return [user, accessToken, contactRecord, redirectUrl]
        }),
        switchMap(([user, accessToken, contactRecord, redirectUrl]: [UserAuth, string, ContactRecord, string]) => {
          this.router.navigateByUrl(decodeURIComponent(redirectUrl) || '/')
          return of(
            AppActions.setAuthenticatedUser({ user }),
            AppActions.setAccessToken({ accessToken }),
            AppActions.setContactRecord({ contactRecord }),
            AppActions.init()
          )
        }),
      ),
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGOUT_ACTION),
        tap((action: { logoutCA: boolean }) => {
          this.userService.logoutCREM()
          this.facade.clearState()
          window.location.href = environment.CAUrl
        })
      ),
    { dispatch: false }
  );
}
