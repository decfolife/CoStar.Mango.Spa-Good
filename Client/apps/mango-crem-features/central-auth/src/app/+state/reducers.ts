import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppActions from './actions';
import { CentralAuthEntity } from './models';
import { Client, ContactRecord, MangoSubApps, UserAuth, UserInfo } from '@mango/data-models/lib-data-models';

export const CENTRAL_AUTH_FEATURE_KEY = 'central_auth';

export interface State extends EntityState<CentralAuthEntity> {
  loaded: boolean,
  user: UserAuth,
  contactId: number,
  clientKey: string,
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
  contactId: null,
  clientKey: null,
  redirectionUri: null,
  authorizationCode: null
});

const appReducer = createReducer(
  initialState,
  on(AppActions.setUser, (state, { user }) => ({ ...state, error: null, user })),
  on(AppActions.setClientKey, (state, { clientKey }) => ({ ...state, error: null, clientKey })),
  on(AppActions.setContactRecord, (state, { contactId }) => ({ ...state, error: null, contactId })),
  on(AppActions.setRedirectionUri, (state, { redirectionUri }) => ({ ...state, error: null, redirectionUri })),
  on(AppActions.retrieveAuthorizationCodeSuccess, (state, { authorizationCode }) => ({ ...state, error: null, authorizationCode })),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
