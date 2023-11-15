import { MultiClientLoginHttpRequest } from "@mango/data-models/lib-data-models";
import { createAction, props } from "@ngrx/store";

export const INIT_AUTHORIZATION = '[UI] Init Authorization'

export const AUTHORIZE = '[UI] Authorize'
export const AUTHORIZE_SUCCESS = '[UI] Authorize Success'
export const AUTHORIZE_ERROR = '[UI] Authorize Error'
export const SETUP_OAUTH_REDIRECTION_TO_CLIENT = '[UI] Setup Redirection To Client When Logged In'
export const LOGIN_TO_CLIENT_SITE = '[UI] Login To Client Site'
export const LOGIN_TO_CLIENT_SITE_SUCCESS = '[UI] Login To Client Site Success'
export const LOGIN_TO_CLIENT_SITE_ERROR = '[UI] Login To Client Site Error'


export const initAuthorization = createAction(INIT_AUTHORIZATION);
export const authorize = createAction(AUTHORIZE);
export const authorizeSuccess = createAction(AUTHORIZE_SUCCESS, props<{ authorizationCode: string }>());
export const authorizeError = createAction(AUTHORIZE_ERROR);
export const setupOAuthRedirectionToClient = createAction(SETUP_OAUTH_REDIRECTION_TO_CLIENT);
export const loginToClientSite = createAction(LOGIN_TO_CLIENT_SITE, props<{ payload: MultiClientLoginHttpRequest }>());
export const loginToClientSiteSuccess = createAction(LOGIN_TO_CLIENT_SITE_SUCCESS, props<{ authToken: string }>());
export const loginToClientSiteError = createAction(LOGIN_TO_CLIENT_SITE_ERROR);
