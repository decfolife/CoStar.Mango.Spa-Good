import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CENTRAL_AUTH_FEATURE_KEY, State } from "./reducers";

export const getAppState = createFeatureSelector<State>(
    CENTRAL_AUTH_FEATURE_KEY
);

export const loading = createSelector(
    getAppState,
    (state: State) => state.loading
);

export const error = createSelector(
    getAppState,
    (state: State) => state.error
);

export const user = createSelector(
    getAppState,
    (state: State) => state.user
);

export const userClients = createSelector(
    getAppState,
    (state: State) => state.userClients
);

export const userRecentClients = createSelector(
    getAppState,
    (state: State) => state.userRecentClients
);

export const selectedClientKey = createSelector(
    getAppState,
    (state: State) => state.selectedClientKey
);

export const selectedClient = createSelector(
    getAppState,
    (state: State) => state.selectedClient
);

export const contactRecord = createSelector(
    getAppState,
    (state: State) => state.selectedContactRecord
);

export const contactId = createSelector(
    getAppState,
    (state: State) => state.selectedContactId
);

export const selectedDefaultContactRecord = createSelector(
    getAppState,
    (state: State) => state.selectedDefaultContactRecord
);

export const isClientSpecificLogin = createSelector(
    getAppState,
    (state: State) => state.isClientSpecificLogin
);

export const openClientInNewTab = createSelector(
    getAppState,
    (state: State) => state.openClientInNewTab
);

export const isUserAuthenticated = createSelector(
    getAppState,
    (state: State) => !!state.user && !!state.selectedClient && !!state.selectedContactId
);

export const redirectionUri = createSelector(
    getAppState,
    (state: State) => state.redirectionUri
);

export const authorizationCode = createSelector(
    getAppState,
    (state: State) => state.authorizationCode
);

export const ssoSettings = createSelector(
    getAppState,
    (state: State) => state.ssoSettings
);

export const userContactRecords = createSelector(
    getAppState,
    (state: State) => state.userContactRecords
);


export const isSwitchContactRecord = createSelector(
    getAppState,
    (state: State) => state.isSwitchContactRecord
);

export const loadCurrentUserComplete = createSelector(
    getAppState,
    (state: State) => state.loadCurrentUserComplete
);