import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { ClientSSOSettings, ContactRecord, UserAuth, UserSite } from '@mango/data-models/lib-data-models';
import * as AppActions from './actions/actions';
import * as OAuthActions from './actions/oauth.actions';
import { CentralAuthEntity } from './models';

export const CENTRAL_AUTH_FEATURE_KEY = 'central_auth';

export interface State extends EntityState<CentralAuthEntity> {
  loading: boolean,
  error: boolean,
  user: UserAuth,
  accessToken: string,
  selectedContactId: number,
  selectedContactRecord: ContactRecord
  selectedClientKey: string,
  selectedClient: UserSite,
  openClientInNewTab: boolean,
  userClients: UserSite[],
  userContactRecords: ContactRecord[]
  userDefaultContactRecordId: number,
  ssoSettings: ClientSSOSettings,
  userRecentClients: UserSite[],
  isClientSpecificLogin: boolean,
  redirectionUri: string,
  authorizationCode: string
  isSwitchContactRecord: boolean
}

export interface CentralAuthPartialState {
  readonly [CENTRAL_AUTH_FEATURE_KEY]: State;
}

export const appAdapter: EntityAdapter<CentralAuthEntity> = createEntityAdapter<CentralAuthEntity>();

export const initialState: State = appAdapter.getInitialState({
  loading: false,
  error: false,
  user: null,
  accessToken: null,
  selectedContactRecord: null,
  selectedClientKey: null,
  selectedClient: null,
  openClientInNewTab: true,
  userClients: null,
  userRecentClients: null,
  userContactRecords: null,
  userDefaultContactRecordId: null,
  ssoSettings: null,
  selectedContactId: null,
  isClientSpecificLogin: false,
  redirectionUri: null,
  authorizationCode: null,
  isSwitchContactRecord: false
});

const appReducer = createReducer(
  initialState,
  on(AppActions.setUser, (state, { user }) => ({ ...state, user })),
  on(AppActions.login, (state) => ({ ...state, loading: true })),
  on(AppActions.loginSuccess, (state) => ({ ...state, error: false, loading: false })),
  on(AppActions.loginError, (state) => ({ ...state, error: true, loading: false })),
  on(AppActions.setLoading, (state, { loading }) => ({ ...state, loading })),
  on(AppActions.setSelectedClientKey, (state, { clientKey }) => ({ ...state, selectedClientKey: clientKey })),
  on(AppActions.setAccessToken, (state, { accessToken }) => ({ ...state, accessToken })),
  on(AppActions.setSelectedClient, (state, { client }) => ({ ...state, selectedClient: client })),
  on(AppActions.setSelectedContactID, (state, { contactId }) => ({ ...state, selectedContactId: contactId })),
  on(AppActions.setContactRecord, (state, { contactRecord }) => ({ ...state, selectedContactRecord: contactRecord })),
  on(AppActions.getUserClients, (state, _) => ({ ...state, error: false, loading: true })),
  on(AppActions.getUserClientsSuccess, (state, { clientSites }) => ({ ...state, error: false, loading: false, userClients: clientSites.userSites, userRecentClients: clientSites.recentUserSites })),
  on(AppActions.getClientSSOSettingsSuccess, (state, { ssoSettings }) => ({ ...state, error: false, ssoSettings })),
  on(AppActions.setRedirectionUri, (state, { redirectionUri }) => ({ ...state, redirectionUri })),
  on(AppActions.setClientSpecificLogin, (state, { isClientSpecific }) => ({ ...state, isClientSpecificLogin: isClientSpecific })),
  on(AppActions.setOpenClientInNewTab, (state, { openClientInNewTab }) => ({ ...state, openClientInNewTab })),
  on(AppActions.setIsSwitchContactRecord, (state, { isSwitchContactRecord }) => ({ ...state, isSwitchContactRecord })),
  on(OAuthActions.authorize, (state) => ({ ...state, loading: true })),
  on(OAuthActions.authorizeSuccess, (state, { authorizationCode }) => ({ ...state, error: false, loading: false, authorizationCode })),
  on(OAuthActions.authorizeError, (state) => ({ ...state, error: true, loading: false })),
  on(AppActions.getContactRecords, (state, _) => ({ ...state, error: false, loading: true })),
  on(AppActions.getContactRecordsSuccess, (state, { contactRecords }) => ({ ...state, error: false, loading: false, userContactRecords: contactRecords })),
  on(AppActions.purgeClientSelection, (state) => ({
    ...state,
    userContactRecords: null,
    userDefaultContactRecordId: null,
    selectedClient: null,
    selectedClientKey: null,
    selectedContactRecord: null,
    selectedContactId: null,
    openClientInNewTab: true,
    authorizationCode: null,
    redirectionUri: null,
    isSwitchContactRecord: null
  })),
  on(AppActions.clearState, () => ({ ...initialState })),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
