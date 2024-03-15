import { BreadCrumb, Client, ContactRecord, GlobalSessionHttpObject, MangoSubApps, OAuthTokenHTTPResponse, UserAuth, UserInfo, V06GlobalSession } from '@mango/data-models/lib-data-models';
import { createAction, props } from '@ngrx/store';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';

export const SET_LOADING = '[UI] Set Loading'
export const APP_INIT = '[Mango App] APP Init'
export const SETUP_HEADER = '[Mango App] Setup Header'
export const OAUTH_AUTH = '[Mango App] Start OAuth Auth'
export const OAUTH_AUTH_SUCCESS = '[Mango App] OAuth Auth Success'
export const LOCAL_AUTH = '[Mango App] Start Local Auth'
export const REDIRECT_TO_V06_TO_FINALIZE_LOGIN = '[Mango App] Redirect to V06 To Finalize Login'
export const SET_V06_AUTH_ACTION = '[Mango App] Set V06 Auth Code and Redirect URI temporarily'
export const SETUP_CLIENT_KEY = '[Mango App] Setup Client Key'
export const SETUP_CONTACT_RECORD = '[Mango App] Setup Contact Record'
export const SETUP_USER_INFO = '[Mango App] Setup User Info'
export const LOAD_SUB_APP_ACTION = '[Mango App] Load Sub App'
export const SET_AUTHENTICATED_USER_ACTION = '[Mango App] Set Authenticated User'
export const SET_ACCESS_TOKEN_ACTION = '[Mango App] Set Access Token'
export const SET_CLIENT_KEY_ACTION = '[Mango App] Set Client Key'
export const SET_USER_INFO_ACTION = '[Mango App] Set User Info'
export const SET_CLIENT_INFO_ACTION = '[Mango App] Set Client Info'
export const SET_BREADCRUMBS = '[Mango App] Set Breadcrumbs'
export const SET_CONTACT_RECORD = '[Mango App] Set Contact Record'
export const LOGOUT_ACTION = '[Mango App] Log Out'
export const CLEAR_STATE = '[Mango App] Clear State'
export const SET_MODULE_ID = '[Mango App] Set Module Id'
export const SET_SHOW_SUB_LEFT_NAV = '[Mango App] Set Show Sub Left Nav'
export const SET_CURRENT_RENDER_FORM_DOCUMENT_PARAMS = '[Mango App] Set Current Render Form Document Params'
export const NAVIGATE_LEFT_NAV_MENU = '[Mango App] Navigate Left Nav Menu'
export const NAVIGATE_HOME = '[Mango App] Navigate Home'
export const GET_GLOBAL_SESSION = '[Mango App] Get Global Session'
export const GET_GLOBAL_SESSION_SUCCESS = '[Mango App] Get Global Session Success'
export const UPDATE_GLOBAL_SESSION = '[Mango App] Update Global Session'
export const UPDATE_GLOBAL_SESSION_SUCCESS = '[Mango App] Update Global Session Success'
export const POPULATE_BREADCRUMBS_FROM_SESSION = '[Mango App] Populate Breadcrumbs From Session'

export const init = createAction(APP_INIT);
export const localAuth = createAction(LOCAL_AUTH);
export const oauthAuth = createAction(OAUTH_AUTH, props<{ authCode: string, redirectionUri: string, source: string }>());
export const oauthAuthSuccess = createAction(OAUTH_AUTH_SUCCESS, props<{ response: OAuthTokenHTTPResponse, redirectionUrl: string, source: string }>());
export const setupClientKey = createAction(SETUP_CLIENT_KEY);
export const setupContactRecord = createAction(SETUP_CONTACT_RECORD);
export const setupUserInfo = createAction(SETUP_USER_INFO);
export const redirectToV06ToFinalizeLogin = createAction(REDIRECT_TO_V06_TO_FINALIZE_LOGIN);

export const setV06Auth = createAction(
  SET_V06_AUTH_ACTION,
  props<{ authCode: string, redirectionUri: string, clientKey: string }>()
);

export const setBreadcrumbs = createAction(
  SET_BREADCRUMBS,
  props<{ breadcrumbs: BreadCrumb[] }>()
);

export const setLoading = createAction(
  SET_LOADING,
  props<{ display: boolean }>()
);

export const loadSubApp = createAction(
  LOAD_SUB_APP_ACTION,
  props<{ subApp: MangoSubApps }>()
);

export const setAuthenticatedUser = createAction(
  SET_AUTHENTICATED_USER_ACTION,
  props<{ user: UserAuth }>()
);

export const setAccessToken = createAction(
  SET_ACCESS_TOKEN_ACTION,
  props<{ accessToken: string }>()
);

export const setUserInfo = createAction(
  SET_USER_INFO_ACTION,
  props<{ userInfo: UserInfo }>()
);

export const setClientInfo = createAction(
  SET_CLIENT_INFO_ACTION,
  props<{ clientInfo: Client }>()
);

export const setClientKey = createAction(
  SET_CLIENT_KEY_ACTION,
  props<{ clientKey: string }>()
);

export const setContactRecord = createAction(
  SET_CONTACT_RECORD,
  props<{ contactRecord: ContactRecord }>()
);

export const logout = createAction(
  LOGOUT_ACTION,
  props<{ logoutV06?: boolean }>()
);

export const clearState = createAction(CLEAR_STATE);

export const setModuleId = createAction(
  SET_MODULE_ID,
  props<{ moduleId: number }>()
);

export const setShowSubLetNav = createAction(
  SET_SHOW_SUB_LEFT_NAV,
  props<{ show: boolean }>()
);

export const setCurrentRenderFormDocumentParams = createAction(
  SET_CURRENT_RENDER_FORM_DOCUMENT_PARAMS,
  props<{ params: string }>()
);

export const navigateLeftNavMenu = createAction(
  NAVIGATE_LEFT_NAV_MENU,
  props<{ navLink: SharedLeftNavLink }>()
);

export const navigateHome = createAction(
  NAVIGATE_HOME
);

export const getGlobalSession = createAction(GET_GLOBAL_SESSION);

export const getGlobalSessionSuccess = createAction(
  GET_GLOBAL_SESSION_SUCCESS,
  props<{ session: GlobalSessionHttpObject }>()
);

export const updateGlobalSession = createAction(UPDATE_GLOBAL_SESSION, props<{ session: V06GlobalSession}>());
export const updateGlobalSessionSuccess = createAction(UPDATE_GLOBAL_SESSION_SUCCESS);

export const populateBreadcrumbsFromSession = createAction(POPULATE_BREADCRUMBS_FROM_SESSION);
