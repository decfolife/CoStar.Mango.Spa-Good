import { createAction, props } from "@ngrx/store";

export const INIT_AUTHORIZATION = '[UI] Init Authorization'

export const AUTHORIZE = '[UI] Authorize'
export const AUTHORIZE_SUCCESS = '[UI] Authorize Success'
export const AUTHORIZE_ERROR = '[UI] Authorize Error'
export const SETUP_OAUTH_REDIRECTION_TO_CLIENT = '[UI] Setup Redirection To Client When Logged In'
export const SET_CLIENT_ACCESS_TOKEN = '[UI] Set Client Access Token'


export const initAuthorization = createAction(INIT_AUTHORIZATION);
export const authorize = createAction(AUTHORIZE);
export const authorizeSuccess = createAction(AUTHORIZE_SUCCESS, props<{ authorizationCode: string }>());
export const authorizeError = createAction(AUTHORIZE_ERROR);
export const setupOAuthRedirectionToClient = createAction(SETUP_OAUTH_REDIRECTION_TO_CLIENT);
