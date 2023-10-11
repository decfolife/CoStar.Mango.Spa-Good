import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as AppActions from '../app.actions';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DBkeys, HeaderService, SettingsService, StorageService, UserService } from '@mango/core-shared/lib-core-shared';
import { MangoAppFacade } from '../app.facade';
import { combineLatest, of } from 'rxjs';
import { ContactRecord, ContactRecordHTTPObject, User, UserAuth } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';


@Injectable()
export class AuthenticationEffects {
  constructor(private actions$: Actions,
    private headerService: HeaderService,
    private storageService: StorageService,
    private userService: UserService,
    private settingsService: SettingsService,
    private router: Router,
    private facade: MangoAppFacade) { }

  setupAuthentication$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_AUTHENTICATION),
        map(_ => this.userService.currentUserValue),
        filter(authenticatedUser => !!authenticatedUser),
        switchMap(authenticatedUser => of(AppActions.setAuthenticatedUser({ user: authenticatedUser })))
      ),
  );

  setupCremAuthentication$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_CREM_AUTHENTICATION),
        switchMap((action: { authCode: string, redirectionUri: string }) => combineLatest([this.userService.retrieveJwt(action.authCode), of(action.redirectionUri)])),
        map(([response, redirectionUrl]) => [this.userService.parseUserJWT(response.accessToken), redirectionUrl]),
        switchMap(([user, redirectionUrl]: [UserAuth, string]) => {
          this.userService.setAuth(user)
          this.settingsService.clientKey$.next(user.clientKey)
          this.storageService.savePermanentData(user.clientKey, DBkeys.CLIENT_KEY)
          return combineLatest([of(user), this.userService.retrieveContactRecord(user.email, user.contactId, user.clientKey), of(redirectionUrl)])
        }),
        map(([user, contactRecordHttpResponse, redirectUrl]: [UserAuth, ContactRecordHTTPObject, string]) => {
          const contactRecord = this.userService.parseContactRecordHttpObject(contactRecordHttpResponse)
          this.settingsService.contactRecord$.next(contactRecord)
          this.storageService.savePermanentData(contactRecord, DBkeys.CONTACT_RECORD)
          return [user, contactRecord, redirectUrl]
        }),
        switchMap(([user, contactRecord, redirectUrl]: [UserAuth, ContactRecord, string]) => {
          this.router.navigateByUrl(decodeURIComponent(redirectUrl) || '/')
          return of(
            AppActions.setAuthenticatedUser({ user }),
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
          const url = `${environment.CAUrl}oauth/authorize?logout=true`
          window.location.href = url
        })
      ),
    { dispatch: false }
  );
}
