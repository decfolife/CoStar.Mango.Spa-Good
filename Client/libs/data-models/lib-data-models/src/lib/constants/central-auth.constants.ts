import { InjectionToken } from "@angular/core";

export const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error has occurred. Please try again.';
export const USER_LOGGED_OUT_ERROR_MESSAGE = 'Your session has expired due to recent changes. You may attempt to log in again or contact your system administrator for more details.';
export const USER_LOGGED_OUT_MESSAGE = 'Your session has expired or is no longer valid.';
export const V06_LOGIN_ERROR_MESSAGE = 'An unexpected error has occurred while logging you into CoStar Real Estate Manager. Please try again.';
export const IS_CA_STANDALONE_APP = new InjectionToken<boolean>('IS_CA_STANDALONE_APP')
export const OAUTH_REDIRECT_QUERY_PARAM = 'redirect_uri'
export const OAUTH_AUTH_CODE_QUERY_PARAM = 'auth_code'
export const OAUTH_LOGOUT_QUERY_PARAM = 'logout'
export const OAUTH_CLIENT_KEY_QUERY_PARAM = 'client_key'
export const OAUTH_CONTACT_ID_QUERY_PARAM = 'contact_id'
export const SOURCE_APP_QUERY_PARAM = 'source'
export const SHOW_MULTI_CONTACT_POPUP_QUERY_PARAM = 'showMutliContactPopup'

export const IDLE_TIMOUT_DELAY_SECONDS = 900