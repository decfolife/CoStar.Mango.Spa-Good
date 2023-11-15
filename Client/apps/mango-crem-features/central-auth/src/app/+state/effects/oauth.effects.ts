import { Injectable } from "@angular/core";
import { UserService } from "@mango/core-shared";
import { MultiClientLoginHttpRequest } from "@mango/data-models/lib-data-models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { combineLatest, of } from "rxjs";
import { catchError, delay, filter, map, switchMap, take, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment.dev";
import * as AppActions from '../actions/actions';
import * as OAuthActions from '../actions/oauth.actions';
import { CentralAuthFacade } from "../facades";

@Injectable()

export class OAuthEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade) { }

  initAuthorization$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.INIT_AUTHORIZATION),
        switchMap(_ => combineLatest([this.centralAuthFacade.selectedClient$.pipe(take(1)), this.centralAuthFacade.selectedContactRecord$.pipe(take(1))])),
        filter(([client, contactRecord]) => !!client && !!contactRecord),
        map(([client, contactRecord]): MultiClientLoginHttpRequest => ({ clientKey: client.clientKey, contactID: contactRecord.contactID, contactRole: contactRecord.userRoleName })),
        map(payload => OAuthActions.loginToClientSite({ payload }))
      )
  )

  authorize$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.AUTHORIZE),
        switchMap(_ => combineLatest([this.centralAuthFacade.redirectionUri$.pipe(take(1)), this.centralAuthFacade.clientAccessToken$.pipe(take(1))])),
        filter(([redirectUri, clientAccessToken]) => !!redirectUri && !!clientAccessToken),
        switchMap(([redirectUri, clientAccessToken]) => this.userService.retrieveAuthorizationCode(redirectUri).pipe(
          map(response => OAuthActions.authorizeSuccess({ authorizationCode: response.code })),
          catchError(_ => of(OAuthActions.authorizeError()))
        ))
      )
  )

  loginToClientSite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.LOGIN_TO_CLIENT_SITE),
        switchMap((action: { type: string, payload: MultiClientLoginHttpRequest }) => this.userService.loginToClientSite(action.payload).pipe(
          map(response => OAuthActions.loginToClientSiteSuccess({ authToken: response.authToken })),
          catchError(_ => of(OAuthActions.loginToClientSiteError(), AppActions.purgeClientSelection()))
        ))
      )
  )

  loginToClientSiteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.LOGIN_TO_CLIENT_SITE_SUCCESS),
        switchMap(_ => combineLatest([this.centralAuthFacade.selectedClient$.pipe(take(1)), this.centralAuthFacade.redirectionUri$.pipe(take(1)), this.centralAuthFacade.openClientInNewTab$.pipe(take(1))])),
        filter(([client]) => !!client),
        map(([client, redirectionUri, openClientInNewTab]) => {
          const newRedirectionUri = !redirectionUri ? `${environment.cremBaseUrl.replace('[CLIENT]', client.clientKey)}v06/login.aspx?mul=${openClientInNewTab ? 'true' : 'false'}` : decodeURIComponent(redirectionUri)
          this.centralAuthFacade.setRedirectionUri(newRedirectionUri)
          return OAuthActions.authorize()
        }),
      )
  )


  redirectToClient$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.AUTHORIZE_SUCCESS),
        switchMap(_ => combineLatest([this.centralAuthFacade.redirectionUri$.pipe(take(1)), this.centralAuthFacade.authorizationCode$.pipe(take(1)), this.centralAuthFacade.openClientInNewTab$.pipe(take(1))])),
        filter(([redirectionUri, authorizationCode]) => !!redirectionUri && !!authorizationCode),
        tap(([redirectionUri, authorizationCode, openClientInNewTab]) => {
          let decodedRedirectUri = decodeURIComponent(redirectionUri)
          // CREM Special handling
          if (decodedRedirectUri.includes('v06') && decodedRedirectUri.includes('ReturnUrl')) {
            const baseUrl = decodedRedirectUri.substring(0, decodedRedirectUri.indexOf('ReturnUrl') + 10)
            const returnUrl = decodedRedirectUri.substring(decodedRedirectUri.indexOf('ReturnUrl') + 10)
            decodedRedirectUri = `${baseUrl}${encodeURIComponent(returnUrl)}`
          }
          const url = updateQueryStringParameter(decodedRedirectUri, 'auth_code', authorizationCode)
          openClientInNewTab ? window.open(url, "_blank") : window.location.href = url
        }),
        delay(1000),
        map(_ => AppActions.purgeClientSelection())
      )
  )
}

// To be refactored

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}
