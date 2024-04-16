import { ClientSSOSettings, ClientSitesByUser, ContactRecord, MultiClientLoginHttpRequest, UserAuth, UserSite } from "@mango/data-models/lib-data-models";
import { createAction, props } from "@ngrx/store";
import { LoginResponse } from "libs/data-models/lib-data-models/src/lib/models/userAuth";

export const APP_INIT = '[UI] App Init'
export const LOGIN = '[UI] Login'
export const LOGIN_SUCCESS = '[UI] Login Success'
export const LOGIN_ERROR = '[UI] Login Error'
export const SET_LOADING = '[UI] Set Loading'
export const SET_USER_DEFAULT_CONTACT_ID = '[UI] Set User Default Contact Id'
export const SET_OPEN_CLIENT_IN_NEW_TAB = '[UI] Set Open Client In New Tab'
export const SET_IS_SWITCH_CONTACT_RECORD = '[UI] Set Is Switch Contact Record'
export const REDIRECT_TO_CUSTOMER_SELECTION = '[UI] Redirect To Customer Selection'
export const HANDLE_USER_ALREADY_LOGGED_IN = '[UI] Handle User Already Logged IN'
export const HANDLE_SSO_CLIENT_LOGIN = '[UI] Handle SSO Client Login'
export const POPULATE_LOGGED_IN_USER_DATA = '[UI] Populate Logged In User Data'
export const SETUP_ROUTE_AND_QUERY_PARAMS = '[UI] Setup Route And Query Params'
export const HANDLE_CUSTOM_QUERY_PARAMS = '[UI] Handle Custom Query Params'
export const START_AUTHORIZATION_WHEN_FULLY_SELECTED = '[UI] Go To Authorization When Fully Selected'
export const SETUP_IDLE = '[UI] Setup Idle'
export const SETUP_LOGOUT_WHEN_TIMED_OUT = '[UI] Log Out When Timed Out'
export const SETUP_LOGOUT_EVENT_LISTENER = '[UI] Setup Logout Event Listener'
export const SET_USER = '[UI] Set User'
export const SET_SELECTED_CLIENT_KEY = '[UI] Set Selected Client Key'
export const SET_CLIENT = '[UI] Set Client'
export const SET_SELECTED_CONTACT_ID = '[UI] Set Selected Contact ID'
export const SET_CONTACT_RECORD = '[UI] Set Contact Record'
export const SET_REDIRECTION_URI = '[UI] Set Redirection URI'
export const SET_IS_CLIENT_SPECIFIC_LOGIN = '[UI] Set Client Specific Login'
export const GET_USER_CLIENTS = '[UI] Get User Clients'
export const GET_USER_CLIENTS_SUCCESS = '[UI] Get User Clients Success'
export const GET_CLIENT_SSO_SETTINGS = '[UI] Get Client SSO Settings'
export const GET_CLIENT_SSO_SETTINGS_SUCCESS = '[UI] Get Client SSO Settings Success'
export const GET_CONTACT_RECORDS = '[UI] Get Contact Records'
export const GET_CONTACT_RECORDS_SUCCESS = '[UI] Get Contact Records Success'
export const LOG_OUT = '[UI] Log Out'
export const SET_ACCESS_TOKEN = '[UI] Set Access Token'
export const PURGE_CLIENT_SELECTION = '[UI] Purge Client Selection'
export const CLEAR_STATE = '[UI] Clear State'
export const NO_OP_ACTION = '[UI] No Op Action'


export const init = createAction(APP_INIT);
export const login = createAction(LOGIN, props<{ credentials: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{ response: LoginResponse }>());
export const loginError = createAction(LOGIN_ERROR);
export const setLoading = createAction(SET_LOADING, props<{ loading: boolean }>());
export const setOpenClientInNewTab = createAction(SET_OPEN_CLIENT_IN_NEW_TAB, props<{ openClientInNewTab: boolean }>());
export const setIsSwitchContactRecord = createAction(SET_IS_SWITCH_CONTACT_RECORD, props<{ isSwitchContactRecord: boolean }>());
export const startAuthorizationWhenFullySelected = createAction(START_AUTHORIZATION_WHEN_FULLY_SELECTED);
export const redirectToCustomerSelection = createAction(REDIRECT_TO_CUSTOMER_SELECTION);
export const handleUserAlreadyLoggedIn = createAction(HANDLE_USER_ALREADY_LOGGED_IN);
export const handleSSOClientLogin = createAction(HANDLE_SSO_CLIENT_LOGIN);
export const populateLoggedInUserData = createAction(POPULATE_LOGGED_IN_USER_DATA);
export const setupRouteAndQueryParams = createAction(SETUP_ROUTE_AND_QUERY_PARAMS);
export const handleCustomQueryParams = createAction(HANDLE_CUSTOM_QUERY_PARAMS);
export const setupIdle = createAction(SETUP_IDLE);
export const setupLogoutWhenTimedOut = createAction(SETUP_LOGOUT_WHEN_TIMED_OUT);
export const setupLogoutEventListener = createAction(SETUP_LOGOUT_EVENT_LISTENER);
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
export const setSelectedContactID = createAction(SET_SELECTED_CONTACT_ID, props<{ contactId: number }>());
export const setContactRecord = createAction(SET_CONTACT_RECORD, props<{ contactRecord: ContactRecord }>());
export const setRedirectionUri = createAction(SET_REDIRECTION_URI, props<{ redirectionUri: string }>());
export const purgeClientSelection = createAction(PURGE_CLIENT_SELECTION);
export const clearState = createAction(CLEAR_STATE);
export const noOpAction = createAction(NO_OP_ACTION);

