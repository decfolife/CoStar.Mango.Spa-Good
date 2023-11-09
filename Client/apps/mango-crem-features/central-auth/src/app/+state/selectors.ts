import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CENTRAL_AUTH_FEATURE_KEY, State } from "./reducers";

export const getAppState = createFeatureSelector<State>(
    CENTRAL_AUTH_FEATURE_KEY
);

export const user = createSelector(
    getAppState,
    (state: State) => state.user
);

export const accessToken = createSelector(
    getAppState,
    (state: State) => state.accessToken
);

export const userClients = createSelector(
    getAppState,
    (state: State) => state.userClients
);

export const userRecentClients = createSelector(
    getAppState,
    (state: State) => state.userRecentClients
);

export const client = createSelector(
    getAppState,
    (state: State) => state.selectedClient
);

export const contactId = createSelector(
    getAppState,
    (state: State) => state.contactId
);

export const isClientSpecificLogin = createSelector(
    getAppState,
    (state: State) => state.isClientSpecificLogin
);


export const isUserAuthenticated = createSelector(
    getAppState,
    (state: State) => !!state.user && !!state.selectedClient && !!state.contactId
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