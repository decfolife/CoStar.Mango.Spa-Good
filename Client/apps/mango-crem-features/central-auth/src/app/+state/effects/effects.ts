import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DBkeys, SettingsService, StorageService, UserService } from "@mango/core-shared";
import { CentralAuthError, CentralAuthErrorCodes, ContactRecord, ContactRecordHTTPObject, MangoErrorTypes, OAUTH_LOGOUT_QUERY_PARAM, UNEXPECTED_ERROR_MESSAGE, USER_LOGGED_OUT_ERROR_MESSAGE, UserAuth } from "@mango/data-models/lib-data-models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as dayjs from 'dayjs';
import { UserIdleService } from "libs/core-shared/src/lib/services";
import { combineLatest, of } from "rxjs";
import { filter, first, map, single, switchMap, take, takeUntil, takeWhile, tap } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import * as OAuthActions from '../actions/oauth.actions';
import { CentralAuthFacade } from "../facades";

@Injectable()

export class CentralAuthEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade, private router: Router, private settingsService: SettingsService, private acitvatedRoute: ActivatedRoute, private storageService: StorageService, private idleService: UserIdleService) { }

  appInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.APP_INIT),
        switchMap(_ => of(
          AppActions.populateLoggedInUserData(),
          //AppActions.setupRouteAndQueryParams(),
          AppActions.handleCustomQueryParams(),
          OAuthActions.setupOAuthRedirectionToClient(),
          AppActions.setupIdle(),
          AppActions.setupLogoutWhenTimedOut()
        ))
      )
  )

  handleUserAlreadyLoggedIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.HANDLE_USER_ALREADY_LOGGED_IN),
        switchMap(_ => combineLatest([this.centralAuthFacade.user$])),
        filter(([user]) => !!user),
        tap(([user]) => {
          if (user.isServiceAccount) {
            this.router.navigate(['service-account-configuration'])
          } else {
            this.router.navigate(['customer-selection'], { queryParamsHandling: 'merge' })
          }
        })
      ), { dispatch: false }
  )

  handleSSOClientLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.HANDLE_SSO_CLIENT_LOGIN),
        switchMap(_ => this.centralAuthFacade.ssoSettings$),
        filter(ssoSettings => !!ssoSettings),
        tap(ssoSettings => ssoSettings.forceSSO && ssoSettings.isSSOEnabled ? window.location.href = ssoSettings.ssoUri : null)
      ), { dispatch: false }
  )

  redirectToCustomerSelection$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.REDIRECT_TO_CUSTOMER_SELECTION),
        tap(_ => {
          this.router.navigate(['/customer-selection'], { queryParamsHandling: 'merge' })
        })
      ), { dispatch: false }
  )


  /*setupRouteAndQueryParams$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_ROUTE_AND_QUERY_PARAMS),
        switchMap(_ => combineLatest([this.acitvatedRoute.firstChild.queryParamMap, this.acitvatedRoute.paramMap])),
        tap(console.log),
        map(([queryParamMap, paramMap]) => ([
          queryParamMap.get('clientKey') || paramMap.get('clientKey') || queryParamMap.get(OAUTH_CLIENT_KEY_QUERY_PARAM),
          queryParamMap.get(OAUTH_REDIRECT_QUERY_PARAM),
          queryParamMap.get(OAUTH_CONTACT_ID_QUERY_PARAM)
        ])),
        switchMap(([clientKey, redirectUri, contactId]) => {
          const actionsToDispatch = []
          !!clientKey ? actionsToDispatch.push(AppActions.setSelectedClientKey({ clientKey })) : null
          !!redirectUri ? actionsToDispatch.push(AppActions.setRedirectionUri({ redirectionUri: redirectUri })) : null
          !!contactId ? actionsToDispatch.push(AppActions.setSelectedContactID({ contactId: parseInt(contactId) })) : null
          return of(...actionsToDispatch)
        })
      )
  )*/

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
        map(queryParamsMap => [queryParamsMap.get('auth'), queryParamsMap.get('caforcelogout'), queryParamsMap.get(OAUTH_LOGOUT_QUERY_PARAM)]),
        tap(([auth, caForceLogout, logout]) => {
          if (logout === 'true') {
            this.centralAuthFacade.logout()
          }
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
        switchMap(_ => combineLatest([this.centralAuthFacade.user$.pipe(take(1)), this.centralAuthFacade.accessToken$.pipe(take(1))])),
        filter(([user, accessToken]) => !!user && !!accessToken),
        switchMap(([user, accessToken]) => this.userService.getClientSitesByUser(user.email)),
        map(response => AppActions.getUserClientsSuccess({ clientSites: response }))
      )
  )

  populateSelectedClientAndContactRecords$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SET_SELECTED_CLIENT_KEY),
        switchMap((action: { type: string, clientKey: string }) => combineLatest([this.centralAuthFacade.user$.pipe(first(user => !!user)), this.centralAuthFacade.userClients$.pipe(first(clients => !!clients)), of(action.clientKey)])),
        filter(([user, clients, clientKey]) => !!user && !!clients && !!clientKey),
        map(([user, clients, clientKey]) => clients.find(client => client.clientKey.toLowerCase() === clientKey.toLowerCase())),
        filter(selectedClient => !!selectedClient),
        switchMap(selectedClient => of(AppActions.setSelectedClient({ client: selectedClient }), AppActions.getContactRecords({ clientKey: selectedClient.clientKey })))
      )
  )

  populateSelectedContactRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SET_SELECTED_CONTACT_ID),
        switchMap((action: { type: string, contactId: number }) => combineLatest([this.centralAuthFacade.user$.pipe(take(1)), this.centralAuthFacade.userContactRecords$, of(action.contactId)])),
        filter(([user, contactRecords, selectedContactId]) => !!user && !!contactRecords && !!selectedContactId),
        map(([user, contactRecords, selectedContactId]) => contactRecords.find(contacRecord => contacRecord.contactID === selectedContactId)),
        filter(selectedContactRecord => !!selectedContactRecord),
        map(selectedContactRecord => AppActions.setContactRecord({ contactRecord: selectedContactRecord }))
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
        switchMap((action: { type: string, clientKey: string }) => combineLatest([of(action.clientKey), this.centralAuthFacade.user$.pipe(take(1))])),
        filter(([clientKey, user]) => !!clientKey && !!user),
        switchMap(([clientKey, user]) => this.userService.getContactRecords(user.email, clientKey)),
        map(response => AppActions.getContactRecordsSuccess({ contactRecords: response.contactRecords.map(contactRecordMapper) }))
      )
  )

  getContactRecordsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_CONTACT_RECORDS_SUCCESS),
        map((action: { type: string, contactRecords: ContactRecord[] }) => action.contactRecords),
        filter(contactRecords => !!contactRecords && contactRecords.length <= 1),
        switchMap(contactRecord => {
          if (contactRecord.length === 0) {
            return of(AppActions.setSelectedContactID({ contactId: 0 }), AppActions.setContactRecord({ contactRecord: { contactID: 0 } }))
          } else {
            return of(AppActions.setSelectedContactID({ contactId: contactRecord[0].contactID }))
          }
        })
      )
  )

  startAuthorizationWhenFullySelected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.START_AUTHORIZATION_WHEN_FULLY_SELECTED),
        switchMap(_ => combineLatest([this.centralAuthFacade.selectedClient$, this.centralAuthFacade.selectedContactRecord$])),
        filter(([client, contactRecord]) => !!client && !!contactRecord),
        map(_ => OAuthActions.initAuthorization()),
      )
  )
}


// To be refactored

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
