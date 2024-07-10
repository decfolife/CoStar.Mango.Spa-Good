import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DBkeys, SettingsService, StorageService } from "@mango/core-shared";
import { CentralAuthError, CentralAuthErrorCodes, ContactRecord, MangoErrorTypes, V06_LOGIN_ERROR_MESSAGE, USER_LOGGED_OUT_ERROR_MESSAGE, OAUTH_REDIRECT_QUERY_PARAM } from "@mango/data-models/lib-data-models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as dayjs from 'dayjs';
import { UserIdleService } from "libs/core-shared/src/lib/services";
import { combineLatest, of } from "rxjs";
import { catchError, filter, first, map, switchMap, take, tap } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import * as OAuthActions from '../actions/oauth.actions';
import { CentralAuthFacade } from "../facades";
import { AuthService } from "../../services/auth.service";
import { CentralAuthURLService } from "../../services/url.service";

@Injectable()

export class AppEffects {

  constructor(
    private actions$: Actions, 
    private centralAuthFacade: CentralAuthFacade, 
    private router: Router, 
    private authService: AuthService,
    private settingsService: SettingsService, 
    private acitvatedRoute: ActivatedRoute, 
    private storageService: StorageService, 
    private urlService: CentralAuthURLService,
    private idleService: UserIdleService) { }

  appInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.APP_INIT),
        switchMap(_ => of(
          AppActions.loadCurrentUser(),
          //AppActions.setupRouteAndQueryParams(),
          AppActions.handleCustomQueryParams(),
          OAuthActions.setupOAuthRedirectionToClient(),
          AppActions.setupIdle(),
          AppActions.setupLogoutWhenTimedOut(),
          AppActions.setupLogoutEventListener()
        ))
      )
  )

  handleUserAlreadyLoggedIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.HANDLE_USER_ALREADY_LOGGED_IN),
        switchMap(_ => combineLatest([this.centralAuthFacade.user$, this.centralAuthFacade.isClientSpecificLogin$])),
        filter(([user]) => !!user),
        tap(([user, isClientSpecificLogin]) => {          
          if (user.isServiceAccount) {
            this.router.navigate(['service-account-configuration'])
            return
          } 

          // If user is coming in through customer specific login page
          if (isClientSpecificLogin) {
            this.centralAuthFacade.getUserClients()
            this.centralAuthFacade.startAuthorizationWhenFullySelected()
            return
          }
          
          this.router.navigate(['customer-selection'], { queryParamsHandling: 'merge' })       
        })
      ), { dispatch: false }
  )

  loadCurrentUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.LOAD_CURRENT_USER),
        switchMap(_ => this.authService.getCurrentUser().pipe(
          filter(response => !!response),
          map(user => {
            this.centralAuthFacade.setUser(user)
            return AppActions.setLoadCurrentUserComplete({loadCurrentUserComplete: true})
          }),
          catchError(_ => {
            return of(
              AppActions.setLoadCurrentUserComplete({loadCurrentUserComplete: true})
            )
          })
        ))
      )
  );

  handleSSOClientLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.HANDLE_SSO_CLIENT_LOGIN),
        switchMap(_ => this.centralAuthFacade.ssoSettings$),
        filter(ssoSettings => !!ssoSettings),
        tap(ssoSettings => {
          if (ssoSettings.isSSOEnabled && ssoSettings.forceSSO) {
            window.location.href = ssoSettings.ssoUri
          }
        })
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

  setupLogoutEventListener$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_LOGOUT_EVENT_LISTENER),
        tap(_ => window.addEventListener('storage', this.logoutStorageEventListener.bind(this)))
      ), { dispatch: false }
  )

  private logoutStorageEventListener(event: StorageEvent): void {
    if (event.storageArea == localStorage && event?.key === 'logout-event') {
      this.centralAuthFacade.logout()
      this.removeEventListener()
    }
  }

  private removeEventListener(): void {
    window.removeEventListener("storage", this.logoutStorageEventListener.bind(this));
  }

  handleCustomQueryParams$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.HANDLE_CUSTOM_QUERY_PARAMS),
        switchMap(_ => this.acitvatedRoute.queryParamMap),
        map(queryParamsMap => [
          queryParamsMap.get('auth'), 
          queryParamsMap.get('caforcelogout'), 
          queryParamsMap.get(OAUTH_REDIRECT_QUERY_PARAM)
        ]),
        tap(([auth, caForceLogout, redirectUri]) => {
          if (auth === 'false') {
            throw new CentralAuthError({
              message: V06_LOGIN_ERROR_MESSAGE,
              title: 'Error',
              errorType: MangoErrorTypes.FATAL,
              errorCode: CentralAuthErrorCodes.V06LoginError
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

          !!redirectUri ? this.centralAuthFacade.setRedirectionUri(redirectUri) : null;
        })
      ), { dispatch: false }
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

  startAuthorizationWhenFullySelected$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.START_AUTHORIZATION_WHEN_FULLY_SELECTED),
        switchMap(_ => combineLatest([this.centralAuthFacade.selectedClient$, this.centralAuthFacade.selectedContactRecord$])),
        filter(([client, contactRecord]) => !!client && !!contactRecord),
        switchMap(([client, contactRecord]) => {
          if (client.isSSOEnabled && (client.forceSSO || contactRecord.requireSSO)) {
            this.centralAuthFacade.setSelectedContactId(0)
            window.open(client.ssoUri, "_blank");
            
            return of(
              AppActions.purgeClientSelection(),
              AppActions.getUserClients()
            )
          }

          return of(OAuthActions.initAuthorization())
        }),
      )
  )
}

