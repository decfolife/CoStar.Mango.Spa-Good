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

export const clientKey = createSelector(
    getAppState,
    (state: State) => state.clientKey
);

export const contactId = createSelector(
    getAppState,
    (state: State) => state.contactId
);

export const isUserAuthenticated = createSelector(
    getAppState,
    (state: State) => !!state.user && !!state.clientKey && !!state.contactId
);

export const redirectionUri = createSelector(
    getAppState,
    (state: State) => state.redirectionUri
);

export const authorizationCode = createSelector(
    getAppState,
    (state: State) => state.authorizationCode
);