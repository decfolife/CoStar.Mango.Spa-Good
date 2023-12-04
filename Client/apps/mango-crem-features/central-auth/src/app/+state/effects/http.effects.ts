import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DBkeys, SettingsService, StorageService, UserService } from "@mango/core-shared";
import { CentralAuthError, CentralAuthErrorCodes, ContactRecord, ContactRecordHTTPObject, MangoErrorTypes, OAUTH_LOGOUT_QUERY_PARAM, UNEXPECTED_ERROR_MESSAGE, USER_LOGGED_OUT_ERROR_MESSAGE, UserAuth } from "@mango/data-models/lib-data-models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as dayjs from 'dayjs';
import { UserIdleService } from "libs/core-shared/src/lib/services";
import { combineLatest, of } from "rxjs";
import { catchError, filter, first, map, switchMap, take, tap } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import * as OAuthActions from '../actions/oauth.actions';
import { CentralAuthFacade } from "../facades";

@Injectable()

export class HttpEffects {

  constructor(private actions$: Actions, private userService: UserService, private centralAuthFacade: CentralAuthFacade, private settingsService: SettingsService) { }

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


  getClientSSSOSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_CLIENT_SSO_SETTINGS),
        switchMap((action: { type: string, clientKey: string }) => this.settingsService.getClientSsoSettings(action.clientKey)),
        map(response => AppActions.getClientSSOSettingsSuccess({ ssoSettings: response }))
      )
  )
  
  authorize$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OAuthActions.AUTHORIZE),
        switchMap(_ => combineLatest([this.centralAuthFacade.redirectionUri$.pipe(take(1)), this.centralAuthFacade.accessToken$.pipe(take(1))])),
        filter(([redirectUri, accessToken]) => !!redirectUri && !!accessToken),
        switchMap(([redirectUri, accessToken]) => this.userService.retrieveAuthorizationCode(redirectUri).pipe(
          map(response => OAuthActions.authorizeSuccess({ authorizationCode: response.code })),
          catchError(_ => of(OAuthActions.authorizeError()))
        ))
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
