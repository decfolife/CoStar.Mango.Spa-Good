import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  JwtService,
  UtilitiesService,
  parseBool,
} from '@mango/core-shared/lib-core-shared';
import {
  OAuthTokenHTTPResponse,
  UserAuth,
} from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import * as AppActions from '../app.actions';
import { MangoAppFacade } from '../app.facade';
import { MangoNavigationService } from '@mangoSpa/src/app/services/navigation.service';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private jwtService: JwtService,
    private navigationService: MangoNavigationService,
    private router: Router,
    private facade: MangoAppFacade
  ) {}

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.LOAD_CURRENT_USER),
      switchMap((_) => {
        const queryParams = new URLSearchParams(window.location.search);
        return of(queryParams);
      }),
      filter((queryParams) => {
        // Prevent the loadCurrentUser effect from being run when we are in the middle of the login process
        const isValidatePath = window.location.pathname === '/auth/validate';
        const containsAuthCode = queryParams.has('auth_code');
        return !isValidatePath && !containsAuthCode;
      }),
      switchMap((_) =>
        this.authService.getCurrentUser().pipe(
          filter((response) => !!response),
          map((user) => {
            return AppActions.setAuthenticatedUser({ user });
          }),
          catchError((_) => {
            return of(AppActions.noOpAction());
          })
        )
      )
    )
  );

  oauthAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.OAUTH_AUTH),
      switchMap(
        (action: {
          authCode: string;
          redirectionUri: string;
          source: string;
        }) =>
          this.authService.retrieveJwt(action.authCode, action.source).pipe(
            filter((response) => !!response),
            map((response) =>
              AppActions.oauthAuthSuccess({
                response: response,
                redirectionUrl: action.redirectionUri,
                source: action.source,
              })
            ),
            catchError((_) => of(AppActions.logout({ logoutV06: false })))
          )
      )
    )
  );

  oauthAuthenticationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.OAUTH_AUTH_SUCCESS),
      switchMap(
        (action: {
          response: OAuthTokenHTTPResponse;
          redirectionUrl: string;
          source: string;
        }) => {
          let decodedToken = this.authService.getDecodedAuthToken(
            action.response.accessToken
          );

          const user: UserAuth = {
            userId: parseInt(decodedToken.userId),
            email: decodedToken.email,
            contactId: parseInt(decodedToken.contactId),
            clientKey: decodedToken.clientKey,
            isAutoProvisioned: parseBool(decodedToken.isAutoProvisioned),
            isServiceAccount: parseBool(decodedToken.isServiceAccount),
            isRemUser: parseInt(decodedToken.securityLevel) > -1,
          };

          if (UtilitiesService.isLocalEnvironment()) {
            this.jwtService.saveToken(action.response.accessToken);
          } else if (!action.source) {
            // Only redirect to V06 to finalize login if source has no value.
            this.facade.setV06oauthAuth(
              action.response.code,
              action.redirectionUrl,
              user.clientKey
            );
          }

          this.facade.setAuthenticatedUser(user);

          return combineLatest([of(action.redirectionUrl)]);
        }
      ),
      switchMap(([redirectUrl]: [string]) => {
        let url = redirectUrl ? decodeURIComponent(redirectUrl) : '/';
        this.router.navigateByUrl(url);

        return of(AppActions.init());
      })
    )
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOGOUT_ACTION),
        tap((action: { logoutV06: boolean }) => {
          this.authService.logout();
          this.facade.clearState();

          if (UtilitiesService.isLocalEnvironment()) {
            window.location.href = environment.CAUrl;
            return;
          }

          if (action.logoutV06) {
            this.navigationService.redirectToV06Logout();
            return;
          }

          this.navigationService.redirectToCentralAuth(false);
        })
      ),
    { dispatch: false }
  );
}
