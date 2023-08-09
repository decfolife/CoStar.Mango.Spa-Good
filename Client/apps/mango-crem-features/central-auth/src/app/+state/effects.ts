import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import * as AppActions from './actions';
import { map, switchMap } from "rxjs/operators";
import { UserService } from "@mango/core-shared";
import { Router } from "@angular/router";
import { CentralAuthFacade } from "./facades";
import { HttpClient } from "@angular/common/http";
import { combineLatest, of } from "rxjs";

@Injectable()

export class CentralAuthEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade, private router: Router, private http: HttpClient) { }

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOG_OUT),
        map(_ => {
          this.userService.logout()
          this.centralAuthFacade.setClientKey(null)
          this.centralAuthFacade.setContactId(null)
          this.centralAuthFacade.setUser(null)
          this.router.navigate(['/'])
        }
        )
      ), { dispatch: false }
  )

  retrieveAuthorizationCode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.RETRIEVE_AUTHORIZATION_CODE),
        switchMap((action: { type: string, redirectUri: string }) => this.userService.retrieveAuthorizationCode(action.redirectUri).pipe(
          map(response => AppActions.retrieveAuthorizationCodeSuccess({ authorizationCode: response.code }))
        ))
      )
  )

  redirectToClient$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.REDIRECT_TO_CLIENT),
        switchMap(_ => combineLatest([this.centralAuthFacade.redirectionUri$, this.centralAuthFacade.authorizationCode$])),
        map(([redirectionUri, authorizationCode])=> {
          let decodedRedirectUri = decodeURIComponent(redirectionUri)
          // CREM Special handling
          if (decodedRedirectUri.includes('v06') && decodedRedirectUri.includes('ReturnUrl')) {
            const baseUrl = decodedRedirectUri.substring(0, decodedRedirectUri.indexOf('ReturnUrl') + 10)
            const returnUrl = decodedRedirectUri.substring(decodedRedirectUri.indexOf('ReturnUrl') + 10)
            decodedRedirectUri = `${baseUrl}${encodeURIComponent(returnUrl)}`
          }
          const url = updateQueryStringParameter(decodedRedirectUri, 'auth_code', authorizationCode)
          window.location.href = url
        })
      ), {dispatch: false}
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