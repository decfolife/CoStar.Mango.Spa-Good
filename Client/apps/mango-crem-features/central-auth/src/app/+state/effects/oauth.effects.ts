import { Injectable } from "@angular/core";
import { UserService } from "@mango/core-shared";
import { MultiClientLoginHttpRequest, OAUTH_AUTH_CODE_QUERY_PARAM } from "@mango/data-models/lib-data-models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, combineLatest, of, throwError } from "rxjs";
import { catchError, delay, filter, finalize, map, switchMap, take, tap } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import * as OAuthActions from '../actions/oauth.actions';
import { CentralAuthFacade } from "../facades";
import { environment } from "../../../environments/environment.dev";

@Injectable()

export class OAuthEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade) { }

  initAuthorization$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.INIT_AUTHORIZATION),
        switchMap(_ => combineLatest(
          [
            this.centralAuthFacade.selectedClient$.pipe(take(1)), 
            this.centralAuthFacade.selectedContactRecord$.pipe(take(1)),
            this.centralAuthFacade.isClientSpecificLogin$.pipe(take(1))
          ])
        ),
        filter(([client, contactRecord]) => !!client && !!contactRecord),
        map(([client, contactRecord, isClientSpecificLogin]) => {
          let request: MultiClientLoginHttpRequest = { clientKey: client.clientKey, contactID: contactRecord.contactID, contactRole: contactRecord.userRoleName }
          return [request, isClientSpecificLogin]
        }),
        tap(_ => this.centralAuthFacade.setLoading(true)),
        switchMap(([payload, isClientSpecificLogin]: [MultiClientLoginHttpRequest, boolean]) => this.userService.loginToClientSite(payload).pipe(
          catchError((e) => {
            this.centralAuthFacade.setLoading(false);
            
            if (!isClientSpecificLogin) {
              this.centralAuthFacade.purgeClientSelection()
              this.centralAuthFacade.getUserClients()
            }

            this.centralAuthFacade.logoutWhenIsClientSpecificLoginAndloginToClientSiteFailed();
            return throwError(e)
          })
        )),
        tap(_ => this.centralAuthFacade.setLoading(false)),
        filter(response => !!response && !!response.authToken),
        tap(response => this.centralAuthFacade.setAccessToken(response.authToken)),
        switchMap(_ => combineLatest([this.centralAuthFacade.selectedClient$.pipe(take(1)), this.centralAuthFacade.redirectionUri$.pipe(take(1))])),
        filter(([client]) => !!client),
        map(([client, redirectionUri]) => {

          // const newRedirectionUri = !redirectionUri 
          //   ? `${environment.cremBaseUrl.replace('[CLIENT]', client.clientKey)}/v06/login.aspx` 
          //   : decodeURIComponent(redirectionUri)

          // TEMPORARY
          let newRedirectionUri = ''
          if (environment.name === 'TEST' && client.clientKey.toLowerCase() === 'retaildemo') {
            newRedirectionUri = !redirectionUri 
              ? `https://${client.clientKey}.test.corp.virtualpremise.com/v06/login.aspx?` 
              : decodeURIComponent(redirectionUri)
          } else {
            newRedirectionUri = !redirectionUri 
            ? `${environment.cremBaseUrl.replace('[CLIENT]', client.clientKey)}/v06/login.aspx` 
            : decodeURIComponent(redirectionUri)
          }
          // TEMPORARY

          this.centralAuthFacade.setSelectedContactId(0)
          this.centralAuthFacade.setRedirectionUri(newRedirectionUri)
          return OAuthActions.authorize()
        }),
      ) as Observable<any>
  )

  // If user is coming in through client specific login page OR user doesn't have multiple sites AND
  // the loginToClientSite() method failed, log them out.
  logoutWhenIsClientSpecificLoginAndloginToClientSiteFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOG_OUT_WHEN_CLIENT_SPECIFIC_LOGIN_AND_LOGIN_TO_CLIENT_FAILED),
        switchMap(_ => combineLatest([this.centralAuthFacade.isClientSpecificLogin$.pipe(take(1)), this.centralAuthFacade.user$.pipe(take(1))])),
        filter(([isClientSpecificLogin, user]) => !!isClientSpecificLogin || !user.hasMultipleSites),
        map(_ => {
          return AppActions.logout()
        })
      )
  )

  redirectToClient$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.AUTHORIZE_SUCCESS),
        switchMap(_ => combineLatest([
          this.centralAuthFacade.redirectionUri$.pipe(take(1)), 
          this.centralAuthFacade.authorizationCode$.pipe(take(1)), 
          this.centralAuthFacade.openClientInNewTab$.pipe(take(1)),
          this.centralAuthFacade.isClientSpecificLogin$.pipe(take(1))
        ])
        ),
        filter(([redirectionUri, authorizationCode]) => !!redirectionUri && !!authorizationCode),
        tap(([redirectionUri, authorizationCode, openClientInNewTab, isClientSpecificLogin]) => {
          if (isClientSpecificLogin) {
            this.userService.purgeAuth()
            this.centralAuthFacade.clearState()
          }

          const url = UtilsClass.generateClientUrl(redirectionUri, authorizationCode)
          openClientInNewTab ? window.open(url, "_blank") : window.location.href = url
        }),
        delay(2000),
        switchMap(_ => this.centralAuthFacade.isClientSpecificLogin$.pipe(take(1))),
        switchMap((isClientSpecificLogin) => {
          if (isClientSpecificLogin) {
            return of(AppActions.noOpAction())
          }

          return of(
            AppActions.purgeClientSelection(),
            AppActions.getUserClients()
          )
        })
      )
  )

  // To be refactored
}

export class UtilsClass {

  static generateClientUrl(redirectionUri: string, authorizationCode: string): string {
    let decodedRedirectUri = decodeURIComponent(redirectionUri)
    // CREM Special handling
    if (decodedRedirectUri.includes('v06') && decodedRedirectUri.includes('ReturnUrl')) {
      const baseUrl = decodedRedirectUri.substring(0, decodedRedirectUri.indexOf('ReturnUrl') + 10)
      const returnUrl = decodedRedirectUri.substring(decodedRedirectUri.indexOf('ReturnUrl') + 10)
      decodedRedirectUri = `${baseUrl}${encodeURIComponent(returnUrl)}`
    }
    const url = this.addQueryParamWithProperSymbol(decodedRedirectUri, OAUTH_AUTH_CODE_QUERY_PARAM, authorizationCode)
    return url
  }

  static addQueryParamWithProperSymbol(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }
}