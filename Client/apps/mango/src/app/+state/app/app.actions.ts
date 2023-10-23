import { Client, ContactRecord, Link, MangoSubApps, UserAuth, UserInfo, BreadCrumb } from '@mango/data-models/lib-data-models';
import { createAction, props } from '@ngrx/store';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';

export const SET_LOADING = '[UI] Set Loading'
export const APP_INIT = '[Mango App] APP Init'
export const SETUP_HEADER = '[Mango App] Setup Header'
export const SETUP_AUTHENTICATION = '[Mango App] Setup Authentication'
export const SETUP_CREM_AUTHENTICATION = '[Mango App] Setup CREM Authentication'
export const SETUP_CLIENT_KEY = '[Mango App] Setup Client Key'
export const SETUP_CONTACT_RECORD = '[Mango App] Setup Contact Record'
export const SETUP_USER_INFO = '[Mango App] Setup User Info'
export const LOAD_SUB_APP_ACTION = '[Mango App] Load Sub App'
export const SET_AUTHENTICATED_USER_ACTION = '[Mango App] Set Authenticated User'
export const SET_CLIENT_KEY_ACTION = '[Mango App] Set Client Key'
export const SET_USER_INFO_ACTION = '[Mango App] Set User Info'
export const SET_CLIENT_INFO_ACTION = '[Mango App] Set Client Info'
export const SET_BREADCRUMBS = '[Mango App] Set Breadcrumbs'
export const SET_CONTACT_RECORD = '[Mango App] Set Contact Record'
export const LOGOUT_ACTION = '[Mango App] Log Out'
export const SET_MODULE_ID = '[Mango App] Set Module Id'
export const SET_RENDER_FORM_LEFTNAV_DISPLAYED = '[Mango App] Render Form LeftNav Displayed'
export const NAVIGATE_LEFT_NAV_MENU = '[Mango App] Navigate Left Nav Menu'
export const NAVIGATE_HOME = '[Mango App] Navigate Home'
export const GET_GLOBAL_SESSION = '[Mango App] Get Global Session'
export const GET_GLOBAL_SESSION_SUCCESS = '[Mango App] Get Global Session Success'
export const UPDATE_GLOBAL_SESSION = '[Mango App] Update Global Session'
export const UPDATE_GLOBAL_SESSION_SUCCESS = '[Mango App] Update Global Session Success'

export const init = createAction(APP_INIT);

export const setupHeader = createAction(SETUP_HEADER);

export const setupAuthentication = createAction(SETUP_AUTHENTICATION);

export const setupCremAuthentication = createAction(SETUP_CREM_AUTHENTICATION, props<{ authCode: string, redirectionUri: string }>());

export const setupClientKey = createAction(SETUP_CLIENT_KEY);

export const setupContactRecord = createAction(SETUP_CONTACT_RECORD);

export const setupUserInfo = createAction(SETUP_USER_INFO);

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
  LOGOUT_ACTION
);

export const setModuleId = createAction(
  SET_MODULE_ID,
  props<{ moduleId: number }>()
);

export const setRenderFormLeftNavDisplayed = createAction(
  SET_RENDER_FORM_LEFTNAV_DISPLAYED,
  props<{ renderFormLeftNavDisplayed: boolean }>()
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
  props<{ session: any }>()
);

export const updateGlobalSession = createAction(UPDATE_GLOBAL_SESSION);
export const updateGlobalSessionSuccess = createAction(UPDATE_GLOBAL_SESSION_SUCCESS);
