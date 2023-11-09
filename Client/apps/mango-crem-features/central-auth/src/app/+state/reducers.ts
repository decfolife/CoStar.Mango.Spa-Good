import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { ClientSSOSettings, ContactRecord, UserAuth, UserSite } from '@mango/data-models/lib-data-models';
import * as AppActions from './actions';
import { CentralAuthEntity } from './models';

export const CENTRAL_AUTH_FEATURE_KEY = 'central_auth';

export interface State extends EntityState<CentralAuthEntity> {
  loaded: boolean,
  user: UserAuth,
  accessToken: string,
  contactId: number,
  selectedClientKey: string,
  selectedClient: UserSite,
  userClients: UserSite[],
  userContactRecords: ContactRecord[]
  ssoSettings: ClientSSOSettings,
  userRecentClients: UserSite[],
  isClientSpecificLogin: boolean,
  redirectionUri: string,
  authorizationCode: string
}

export interface CentralAuthPartialState {
  readonly [CENTRAL_AUTH_FEATURE_KEY]: State;
}

export const appAdapter: EntityAdapter<CentralAuthEntity> = createEntityAdapter<CentralAuthEntity>();

export const initialState: State = appAdapter.getInitialState({
  loaded: false,
  user: null,
  accessToken: null,
  selectedClientKey: null,
  selectedClient: null,
  userClients: null,
  userRecentClients: null,
  userContactRecords: null,
  ssoSettings: null,
  contactId: null,
  isClientSpecificLogin: false,
  redirectionUri: null,
  authorizationCode: null
});

const appReducer = createReducer(
  initialState,
  on(AppActions.setUser, (state, { user }) => ({ ...state, error: null, user })),
  on(AppActions.setSelectedClientKey, (state, { clientKey }) => ({ ...state, error: null, selectedClientKey: clientKey })),
  on(AppActions.setAccessToken, (state, { accessToken }) => ({ ...state, error: null, accessToken })),
  on(AppActions.setSelectedClient, (state, { client }) => ({ ...state, error: null, selectedClient: client })),
  on(AppActions.setContactRecord, (state, { contactId }) => ({ ...state, error: null, contactId })),
  on(AppActions.getUserClientsSuccess, (state, { clientSites }) => ({ ...state, error: null, userClients: clientSites.userSites, userRecentClients: clientSites.recentUserSites })),
  on(AppActions.getClientSSOSettingsSuccess, (state, { ssoSettings }) => ({ ...state, error: null, ssoSettings })),
  on(AppActions.setRedirectionUri, (state, { redirectionUri }) => ({ ...state, error: null, redirectionUri })),
  on(AppActions.setClientSpecificLogin, (state, { isClientSpecific }) => ({ ...state, error: null, isClientSpecificLogin: isClientSpecific })),
  on(AppActions.retrieveAuthorizationCodeSuccess, (state, { authorizationCode }) => ({ ...state, error: null, authorizationCode })),
  on(AppActions.getContactRecordsSuccess, (state, { contactRecords }) => ({ ...state, error: null, userContactRecords: contactRecords })),
  on(AppActions.clearState, () => ({ ...initialState })),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
