import { Injectable } from "@angular/core";
import { SettingsService } from "@mango/core-shared";
import { ContactRecord, ContactRecordHTTPObject } from "@mango/data-models/lib-data-models";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { combineLatest, of } from "rxjs";
import { filter, finalize, map, switchMap, take } from "rxjs/operators";
import * as AppActions from '../actions/actions';
import { CentralAuthFacade } from "../facades";
import { AuthService } from "../../services/auth.service";

@Injectable()

export class HttpEffects {

  constructor(private actions$: Actions, private authService: AuthService, private centralAuthFacade: CentralAuthFacade, private settingsService: SettingsService) { }

  getUserClients$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_USER_CLIENTS),
        switchMap(_ => combineLatest([this.centralAuthFacade.user$.pipe(take(1)), this.centralAuthFacade.accessToken$.pipe(take(1))])),
        filter(([user, accessToken]) => !!user && !!accessToken),
        switchMap(([user, accessToken]) => this.authService.getClientSitesByUser(user.email)),
        map(response => AppActions.getUserClientsSuccess({ clientSites: response }))
      )
  )

  getContactRecords$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_CONTACT_RECORDS),
        switchMap((action: { type: string, clientKey: string }) => combineLatest([of(action.clientKey), this.centralAuthFacade.user$.pipe(take(1))])),
        filter(([clientKey, user]) => !!clientKey && !!user),
        switchMap(([clientKey, user]) => this.authService.getContactRecords(user.email, clientKey)),
        map(response => AppActions.getContactRecordsSuccess({ contactRecords: response.contactRecords.map(contactRecordMapper) })),
        finalize(() => {
          this.centralAuthFacade.setLoading(false);
        })
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
