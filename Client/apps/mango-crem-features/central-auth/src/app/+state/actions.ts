import { ClientSSOSettings, ClientSitesByUser, ContactRecord, MultiClientLoginHttpRequest, UserAuth, UserSite } from "@mango/data-models/lib-data-models";
import { createAction, props } from "@ngrx/store";

export const APP_INIT = '[UI] App Init'
export const LOGIN = '[UI] Login'
export const POPULATE_LOGGED_IN_USER_DATA = '[UI] Populate Logged In User Data'
export const SET_SELECTED_CLIENT_KEY_FROM_ROUTE = '[UI] Set Selected Client Key From Route'
export const HANDLE_CUSTOM_QUERY_PARAMS = '[UI] Handle Custom Query Params'
export const SETUP_REDIRECTION_TO_CLIENT_WHEN_LOGGED_IN = '[UI] Setup Redirection To Client When Logged In'
export const SETUP_IDLE = '[UI] Setup Idle'
export const SETUP_LOGOUT_WHEN_TIMED_OUT = '[UI] Log Out When Timed Out'
export const SET_USER = '[UI] Set User'
export const SET_SELECTED_CLIENT_KEY = '[UI] Set Selected Client Key'
export const SET_CLIENT = '[UI] Set Client'
export const SET_CONTACT_RECORD = '[UI] Set Contact Record'
export const SET_REDIRECTION_URI = '[UI] Set Redirection URI'
export const SET_IS_CLIENT_SPECIFIC_LOGIN = '[UI] Set Client Specific Login'
export const GET_USER_CLIENTS = '[UI] Get User Clients'
export const GET_USER_CLIENTS_SUCCESS = '[UI] Get User Clients Success'
export const GET_CLIENT_SSO_SETTINGS = '[UI] Get Client SSO Settings'
export const GET_CLIENT_SSO_SETTINGS_SUCCESS = '[UI] Get Client SSO Settings Success'
export const GET_CONTACT_RECORDS = '[UI] Get Contact Records'
export const GET_CONTACT_RECORDS_SUCCESS = '[UI] Get Contact Records Success'
export const RETRIEVE_AUTHORIZATION_CODE = '[UI] Retrieve Authorization Code'
export const RETRIEVE_AUTHORIZATION_CODE_SUCCESS = '[UI] Retrieve Authorization Code Success'
export const REDIRECT_TO_CLIENT = '[UI] Redirect To Client'
export const LOGIN_TO_CLIENT_SITE = '[UI] Login To CLient Site'
export const LOGIN_TO_CLIENT_SITE_SUCCESS = '[UI] Login To CLient Site Success'
export const LOG_OUT = '[UI] Log Out'
export const SET_ACCESS_TOKEN = '[UI] Set Access Token'
export const CLEAR_STATE = '[UI] Clear State'


export const init = createAction(APP_INIT);
export const login = createAction(LOGIN, props<{ credentials: string }>());
export const populateLoggedInUserData = createAction(POPULATE_LOGGED_IN_USER_DATA);
export const setSelectedClientKeyFromRoute = createAction(SET_SELECTED_CLIENT_KEY_FROM_ROUTE);
export const handleCustomQueryParams = createAction(HANDLE_CUSTOM_QUERY_PARAMS);
export const setupRedirectionToClientWhenLoggedIn = createAction(SETUP_REDIRECTION_TO_CLIENT_WHEN_LOGGED_IN);
export const setupIdle = createAction(SETUP_IDLE);
export const setupLogoutWhenTimedOut = createAction(SETUP_LOGOUT_WHEN_TIMED_OUT);
export const logout = createAction(LOG_OUT);
export const setUser = createAction(SET_USER, props<{ user: UserAuth }>());
export const setSelectedClientKey = createAction(SET_SELECTED_CLIENT_KEY, props<{ clientKey: string }>());
export const getUserClients = createAction(GET_USER_CLIENTS);
export const getUserClientsSuccess = createAction(GET_USER_CLIENTS_SUCCESS, props<{ clientSites: ClientSitesByUser }>());
export const getClientSSOSettings = createAction(GET_CLIENT_SSO_SETTINGS, props<{ clientKey: string }>());
export const getClientSSOSettingsSuccess = createAction(GET_CLIENT_SSO_SETTINGS_SUCCESS, props<{ ssoSettings: ClientSSOSettings }>());
export const getContactRecords = createAction(GET_CONTACT_RECORDS, props<{ clientKey: string }>());
export const getContactRecordsSuccess = createAction(GET_CONTACT_RECORDS_SUCCESS, props<{ contactRecords: ContactRecord[] }>());
export const setAccessToken = createAction(SET_ACCESS_TOKEN, props<{ accessToken: string }>());
export const setClientSpecificLogin = createAction(SET_IS_CLIENT_SPECIFIC_LOGIN, props<{ isClientSpecific: boolean }>());
export const setSelectedClient = createAction(SET_CLIENT, props<{ client: UserSite }>());
export const setContactRecord = createAction(SET_CONTACT_RECORD, props<{ contactId: number }>());
export const setRedirectionUri = createAction(SET_REDIRECTION_URI, props<{ redirectionUri: string }>());
export const loginToClientSite = createAction(LOGIN_TO_CLIENT_SITE, props<{ payload: MultiClientLoginHttpRequest }>());
export const loginToClientSiteSuccess = createAction(LOGIN_TO_CLIENT_SITE_SUCCESS);
export const retrieveAuthorizationCode = createAction(RETRIEVE_AUTHORIZATION_CODE, props<{ redirectUri: string }>());
export const retrieveAuthorizationCodeSuccess = createAction(RETRIEVE_AUTHORIZATION_CODE_SUCCESS, props<{ authorizationCode: string }>());
export const redirectToClient = createAction(REDIRECT_TO_CLIENT);
export const clearState = createAction(CLEAR_STATE);

