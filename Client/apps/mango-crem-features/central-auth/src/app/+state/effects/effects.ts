import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DBkeys, SettingsService, StorageService, UserService } from "@mango/core-shared";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { combineLatest, of } from "rxjs";
import * as dayjs from 'dayjs';
import { filter, map, switchMap, tap } from "rxjs/operators";
import * as AppActions from '../actions';
import { CentralAuthFacade } from "../facades";
import { ContactRecordHTTPObject, ContactRecord, UserAuth, CentralAuthError, CentralAuthErrorCodes, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE, USER_LOGGED_OUT_ERROR_MESSAGE } from "@mango/data-models/lib-data-models";
import { UserIdleService } from "libs/core-shared/src/lib/services";

@Injectable()

export class CentralAuthEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade, private router: Router, private settingsService: SettingsService, private acitvatedRoute: ActivatedRoute, private storageService: StorageService, private idleService: UserIdleService) { }

  appInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.APP_INIT),
        switchMap(_ => of(
          AppActions.populateLoggedInUserData(),
          AppActions.setSelectedClientKeyFromRoute(),
          AppActions.handleCustomQueryParams(),
          AppActions.setupRedirectionToClientWhenLoggedIn(),
          AppActions.setupIdle(),
          AppActions.setupLogoutWhenTimedOut()
        ))
      )
  )

  setSelectedClientKeyFromRoute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SET_SELECTED_CLIENT_KEY_FROM_ROUTE),
        switchMap(_ => combineLatest([this.acitvatedRoute.queryParamMap, this.acitvatedRoute.paramMap])),
        map(([queryParamMap, paramMap]) => queryParamMap.get('clientKey') || paramMap.get('clientKey')),
        filter(clientKey => !!clientKey),
        map(clientKey => AppActions.setSelectedClientKey({ clientKey }))
      )
  )


  setupIdle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_IDLE),
        switchMap(_ => this.centralAuthFacade.user$),
        filter(user => !!user),
        tap(_ => {
          document.onmousemove = _ => this.idleService.resetTimer()
          document.onkeydown = _ => this.idleService.resetTimer()
          this.idleService.startWatching()
        }),
        switchMap(_ => this.idleService.onTimerStart()),
        switchMap(_ => this.idleService.onTimeout()),
        map(_ => {
          this.idleService.stopWatching()
          document.onmousemove = null
          document.onkeydown = null
          return AppActions.logout()
        })
      )
  )

  setupRedirectionToClientWhenLoggedIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_REDIRECTION_TO_CLIENT_WHEN_LOGGED_IN),
        switchMap(_ => combineLatest([
          this.centralAuthFacade.authorizationCode$,
          this.centralAuthFacade.client$,
          this.centralAuthFacade.contactId$
        ])),
        filter(([authorizationCode, client, contactId]) => !!authorizationCode && !!client && !!contactId),
        map(_ => AppActions.redirectToClient())
      )
  )

  setupLogoutWhenTimedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_LOGOUT_WHEN_TIMED_OUT),
        map(_ => [dayjs(this.storageService.getData(DBkeys.IDLE_TIMEOUT)), dayjs(new Date())]),
        filter(([idleTimeoutDate, currentDate]) => currentDate.diff(idleTimeoutDate) > 0),
        map(_ => {
          this.storageService.savePermanentData(null, DBkeys.IDLE_TIMEOUT)
          return AppActions.logout()
        })
      )
  )

  handleCustomQueryParams$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.HANDLE_CUSTOM_QUERY_PARAMS),
        switchMap(_ => this.acitvatedRoute.queryParamMap),
        map(queryParamsMap => [queryParamsMap.get('auth'), queryParamsMap.get('caforcelogout')]),
        tap(([auth, caForceLogout]) => {
          if (auth === 'false') {
            this.centralAuthFacade.logout()
            throw new CentralAuthError({
              message: UNEXPECTED_ERROR_MESSAGE,
              title: 'Error',
              errorType: MangoErrorTypes.FATAL,
              errorCode: CentralAuthErrorCodes.InternalError
            })
          }

          if (caForceLogout === 'true') {
            this.centralAuthFacade.logout()
            throw new CentralAuthError({
              message: USER_LOGGED_OUT_ERROR_MESSAGE,
              title: 'Error',
              errorType: MangoErrorTypes.FATAL,
              errorCode: CentralAuthErrorCodes.ForceLogout
            })
          }
        })
      ), { dispatch: false }
  )



  populateLoggedInUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.POPULATE_LOGGED_IN_USER_DATA),
        tap(_ => {
          const user: UserAuth = this.storageService.getDataObject(DBkeys.USER_AUTH);
          user ? this.centralAuthFacade.setUser(user) : null
        })
      ), { dispatch: false }
  )


  getUserClients$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_USER_CLIENTS),
        switchMap(_ => this.centralAuthFacade.user$),
        filter(user => !!user),
        switchMap(user => this.userService.getClientSitesByUser(user.email)),
        map(response => AppActions.getUserClientsSuccess({ clientSites: response }))
      )
  )

  populateSelectedClient$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SET_SELECTED_CLIENT_KEY),
        switchMap((action: { type: string, clientKey: string }) => combineLatest([this.centralAuthFacade.user$, this.centralAuthFacade.userClients$, of(action.clientKey)])),
        filter(([user, clients, clientKey]) => !!user && !!clients && !!clientKey),
        map(([user, clients, clientKey]) => clients.find(client => client.clientKey.toLowerCase() === clientKey.toLowerCase())),
        filter(selectedClient => !!selectedClient),
        map(selectedClient => AppActions.setSelectedClient({ client: selectedClient }))
      )
  )

  getClientSSSOSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_CLIENT_SSO_SETTINGS),
        switchMap((action: { type: string, clientKey: string }) => this.settingsService.getClientSsoSettings(action.clientKey)),
        map(response => AppActions.getClientSSOSettingsSuccess({ ssoSettings: response }))
      )
  )

  getContactRecords$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_CONTACT_RECORDS),
        switchMap((action: { type: string, clientKey: string }) => combineLatest([of(action.clientKey), this.centralAuthFacade.user$])),
        filter(([clientKey, user]) => !!clientKey && !!user),
        switchMap(([clientKey, user]) => this.userService.getContactRecords(user.email, clientKey)),
        map(response => AppActions.getContactRecordsSuccess({ contactRecords: response.contactRecords.map(contactRecordMapper) }))
      )
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
        map(([redirectionUri, authorizationCode]) => {
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
      ), { dispatch: false }
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

function contactRecordMapper(contactRecordHttpObject: ContactRecordHTTPObject): ContactRecord {
  const {
    contactID,
    contactFirstName: firstName,
    contactLastName: lastName,
    contactUserID: userName, userRoleName, requireSSO, isDefaultLoginContact } = contactRecordHttpObject
  return {
    contactID,
    firstName,
    lastName,
    userName,
    userRoleName,
    requireSSO,
    isDefaultLoginContact
  }
}
