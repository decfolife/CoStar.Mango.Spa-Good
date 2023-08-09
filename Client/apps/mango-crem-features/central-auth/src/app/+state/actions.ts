import { ContactRecord, UserAuth } from "@mango/data-models/lib-data-models";
import { createAction, props } from "@ngrx/store";

export const SET_USER = '[UI] Set User'
export const SET_CLIENT_KEY = '[UI] Set Client Key'
export const SET_CONTACT_RECORD = '[UI] Set Contact Record'
export const SET_REDIRECTION_URI = '[UI] Set Redirection URI'
export const RETRIEVE_AUTHORIZATION_CODE = '[UI] Retrieve Authorization Code'
export const RETRIEVE_AUTHORIZATION_CODE_SUCCESS = '[UI] Retrieve Authorization Code Success'
export const REDIRECT_TO_CLIENT = '[UI] Redirect To Client'
export const LOG_OUT = '[UI] Log Out'


export const logout = createAction(LOG_OUT);
export const setUser = createAction(SET_USER, props<{ user: UserAuth }>());
export const setClientKey = createAction(SET_CLIENT_KEY, props<{ clientKey: string }>());
export const setContactRecord = createAction(SET_CONTACT_RECORD, props<{ contactId: number }>());
export const setRedirectionUri = createAction(SET_REDIRECTION_URI, props<{ redirectionUri: string }>());
export const retrieveAuthorizationCode = createAction(RETRIEVE_AUTHORIZATION_CODE, props<{ redirectUri: string }>());
export const retrieveAuthorizationCodeSuccess = createAction(RETRIEVE_AUTHORIZATION_CODE_SUCCESS, props<{ authorizationCode: string }>());
export const redirectToClient = createAction(REDIRECT_TO_CLIENT);
