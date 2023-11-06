import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { UserAuth, UserSite } from '@mango/data-models/lib-data-models';
import * as AppActions from './actions';
import { CentralAuthEntity } from './models';

export const CENTRAL_AUTH_FEATURE_KEY = 'central_auth';

export interface State extends EntityState<CentralAuthEntity> {
  loaded: boolean,
  user: UserAuth,
  accessToken: string,
  contactId: number,
  client: UserSite,
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
  client: null,
  contactId: null,
  redirectionUri: null,
  authorizationCode: null
});

const appReducer = createReducer(
  initialState,
  on(AppActions.setUser, (state, { user }) => ({ ...state, error: null, user })),
  on(AppActions.setAccessToken, (state, { accessToken }) => ({ ...state, error: null, accessToken })),
  on(AppActions.setClient, (state, { client }) => ({ ...state, error: null, client })),
  on(AppActions.setContactRecord, (state, { contactId }) => ({ ...state, error: null, contactId })),
  on(AppActions.setRedirectionUri, (state, { redirectionUri }) => ({ ...state, error: null, redirectionUri })),
  on(AppActions.retrieveAuthorizationCodeSuccess, (state, { authorizationCode }) => ({ ...state, error: null, authorizationCode })),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
