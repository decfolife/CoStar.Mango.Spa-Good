import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { BreadCrumb, Client, ContactRecord, MangoSubApps, UserAuth, UserInfo, V06GlobalSession } from '@mango/data-models/lib-data-models';
import * as AppActions from './app.actions';
import { MangoAppEntity } from './app.models';

export const APP_FEATURE_KEY = 'mango';

export interface State extends EntityState<MangoAppEntity> {
  loaded: boolean,
  error?: string | null,
  currentSubApp: MangoSubApps,
  client: string,
  contactRecord: ContactRecord,
  authenticatedUser: UserAuth,
  accessToken: string,
  v06Auth: any,
  userInfo: UserInfo,
  breadcrumbs: BreadCrumb[],
  clientInfo: Client,
  moduleId: number,
  showSubLeftNav: boolean,
  currentRenderFormDocumentParams: string,
  globalSession: V06GlobalSession
}

export interface MangoPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const appAdapter: EntityAdapter<MangoAppEntity> = createEntityAdapter<MangoAppEntity>();

export const initialState: State = appAdapter.getInitialState({
  loaded: false,
  client: null,
  currentSubApp: null,
  contactRecord: null,
  authenticatedUser: null,
  accessToken: null,
  v06Auth: null,
  userInfo: null,
  breadcrumbs: null,
  clientInfo: null,
  moduleId: null,
  showSubLeftNav: false,
  currentRenderFormDocumentParams: null,
  globalSession: {}
});

const appReducer = createReducer(
  initialState,
  on(AppActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AppActions.loadSubApp, (state, { subApp }) => ({ ...state, error: null, currentSubApp: subApp })),
  on(AppActions.setLoading, (state, { display }) => ({ ...state, loaded: !display, error: null })),
  on(AppActions.setAuthenticatedUser, (state, { user }) => ({ ...state, error: null, authenticatedUser: user })),
  on(AppActions.setAccessToken, (state, { accessToken }) => ({ ...state, error: null, accessToken })),
  on(AppActions.setV06Auth, (state, { authCode, redirectionUri, clientKey }) => ({ ...state, error: null, v06Auth: { authCode, redirectionUri, clientKey } })),
  on(AppActions.setUserInfo, (state, { userInfo }) => ({ ...state, error: null, userInfo: userInfo })),
  on(AppActions.setClientInfo, (state, { clientInfo }) => ({ ...state, error: null, clientInfo: clientInfo })),
  on(AppActions.setClientKey, (state, { clientKey }) => ({ ...state, error: null, client: clientKey })),
  on(AppActions.setBreadcrumbs, (state, { breadcrumbs }) => ({ ...state, error: null, breadcrumbs })),
  on(AppActions.setContactRecord, (state, { contactRecord }) => ({ ...state, error: null, contactRecord })),
  on(AppActions.setModuleId, (state, { moduleId }) => ({ ...state, error: null, moduleId })),
  on(AppActions.setShowSubLetNav, (state, { show }) => ({ ...state, error: null, showSubLeftNav: show })),
  on(AppActions.setCurrentRenderFormDocumentParams, (state, { params }) => ({ ...state, error: null, currentRenderFormDocumentParams: params })),
  on(AppActions.getGlobalSessionSuccess, (state, { session }) => ({ ...state, error: null, globalSession: session.data})),
  on(AppActions.clearState, () => ({ ...initialState })),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
