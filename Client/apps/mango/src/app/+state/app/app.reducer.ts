import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  RedirectorLink,
  AdminFlags,
  BreadCrumb,
  Client,
  ContactRecord,
  MangoSubApps,
  UserAuth,
  UserInfo,
  V06GlobalSession,
} from '@mango/data-models/lib-data-models';
import * as AppActions from './app.actions';
import { MangoAppEntity } from './app.models';

export const APP_FEATURE_KEY = 'mango';

export interface State extends EntityState<MangoAppEntity> {
  loaded: boolean;
  error?: string | null;
  currentSubApp: MangoSubApps;
  client: string;
  contactRecord: ContactRecord;
  userHasMultipleContactRecords: boolean;
  userHasSecurityProfiles: boolean;
  authenticatedUser: UserAuth;
  v06Auth: any;
  userInfo: UserInfo;
  isEmulatedUser: boolean;
  isEmulateUserInitiatedFromV06: boolean;
  breadcrumbs: BreadCrumb[];
  clientInfo: Client;
  moduleId: number;
  showSubLeftNav: boolean;
  currentRenderFormDocumentParams: string;
  globalSession: V06GlobalSession;
  adminFlags: AdminFlags;
  redirectorLinks: RedirectorLink[];
  currentProjectId: number | null;
  nav: NavState;
}
export interface NavState {
  navigationLinks: any[];
  activeLink: string | null;
  navLinksFetched: boolean;
}

export interface MangoPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const appAdapter: EntityAdapter<MangoAppEntity> =
  createEntityAdapter<MangoAppEntity>();

export const initialState: State = appAdapter.getInitialState({
  loaded: false,
  client: null,
  currentSubApp: null,
  contactRecord: null,
  userHasMultipleContactRecords: null,
  userHasSecurityProfiles: null,
  authenticatedUser: null,
  v06Auth: null,
  userInfo: null,
  isEmulatedUser: false,
  isEmulateUserInitiatedFromV06: false,
  breadcrumbs: null,
  clientInfo: null,
  moduleId: null,
  showSubLeftNav: false,
  currentRenderFormDocumentParams: null,
  globalSession: {},
  adminFlags: null,
  redirectorLinks: null,
  currentProjectId: null,
  nav: {
    navigationLinks: [],
    activeLink: null,
    navLinksFetched: false,
  },
});

const appReducer = createReducer(
  initialState,
  on(AppActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AppActions.loadSubApp, (state, { subApp }) => ({
    ...state,
    error: null,
    currentSubApp: subApp,
  })),
  on(
    AppActions.loadLeftNavLinksSuccess,
    (state, { navigationLinks, activeLink, navLinksFetched }) => ({
      ...state,
      nav: {
        ...state.nav,
        navigationLinks,
        activeLink,
        navLinksFetched,
      },
    })
  ),
  on(AppActions.setLoading, (state, { display }) => ({
    ...state,
    loaded: !display,
    error: null,
  })),
  on(AppActions.setAuthenticatedUser, (state, { user }) => ({
    ...state,
    error: null,
    authenticatedUser: user,
  })),
  on(
    AppActions.setV06Auth,
    (state, { authCode, redirectionUri, clientKey }) => ({
      ...state,
      error: null,
      v06Auth: { authCode, redirectionUri, clientKey },
    })
  ),
  on(AppActions.setUserInfo, (state, { userInfo }) => ({
    ...state,
    error: null,
    userInfo: userInfo,
  })),
  on(AppActions.setupClientSettingsSuccess, (state, { clientInfo }) => ({
    ...state,
    error: null,
    clientInfo: clientInfo,
  })),
  on(AppActions.setClientKey, (state, { clientKey }) => ({
    ...state,
    error: null,
    client: clientKey,
  })),
  on(AppActions.setBreadcrumbs, (state, { breadcrumbs }) => ({
    ...state,
    error: null,
    breadcrumbs,
  })),
  on(AppActions.setContactRecord, (state, { contactRecord }) => ({
    ...state,
    error: null,
    contactRecord,
  })),
  on(AppActions.updateContactRecord, (state, { contactRecord }) => ({
    ...state,
    error: null,
    contactRecord,
  })),
  on(
    AppActions.setUserHasMultipleContactRecords,
    (state, { hasMultipleContactRecords }) => ({
      ...state,
      error: null,
      userHasMultipleContactRecords: hasMultipleContactRecords,
    })
  ),
  on(AppActions.setUserHasSecurityProfiles, (state) => ({
    ...state,
    error: null,
  })),
  on(
    AppActions.setUserHasSecurityProfilesSuccess,
    (state, { hasSecurityProfiles }) => ({
      ...state,
      error: null,
      userHasSecurityProfiles: hasSecurityProfiles,
    })
  ),
  on(AppActions.setEmulatedUser, (state, { initiatedFromV06 }) => ({
    ...state,
    error: null,
    isEmulateUserInitiatedFromV06: initiatedFromV06,
  })),
  on(AppActions.setEmulatedUserSuccess, (state, { contactRecord }) => ({
    ...state,
    error: null,
    contactRecord,
    isEmulatedUser: true,
  })),
  on(AppActions.stopEmulatingUser, (state, { initiatedFromV06 }) => ({
    ...state,
    error: null,
    isEmulatedUser: false,
    isEmulateUserInitiatedFromV06: initiatedFromV06,
  })),
  on(AppActions.setModuleId, (state, { moduleId }) => ({
    ...state,
    error: null,
    moduleId,
  })),
  on(AppActions.setShowSubLetNav, (state, { show }) => ({
    ...state,
    error: null,
    showSubLeftNav: show,
  })),
  on(AppActions.setCurrentRenderFormDocumentParams, (state, { params }) => ({
    ...state,
    error: null,
    currentRenderFormDocumentParams: params,
  })),
  on(AppActions.getGlobalSessionSuccess, (state, { session }) => ({
    ...state,
    error: null,
    globalSession: session.data,
  })),
  on(AppActions.setAdminFlagsSuccess, (state, { flags }) => ({
    ...state,
    adminFlags: flags,
  })),
  on(AppActions.loadRedirectorLinksSuccess, (state, { redirectorLinks }) => ({
    ...state,
    error: null,
    redirectorLinks: redirectorLinks,
  })),
  on(AppActions.setCurrentProjectId, (state, { projectId }) => ({
    ...state,
    currentProjectId: projectId,
  })),
  on(AppActions.clearState, () => ({ ...initialState }))
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
