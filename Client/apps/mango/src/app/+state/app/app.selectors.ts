import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, State } from './app.reducer';

export const getAppState = createFeatureSelector<State>(APP_FEATURE_KEY);

export const currentSubApp = createSelector(
  getAppState,
  (state: State) => state.currentSubApp
);

export const loaded = createSelector(
  getAppState,
  (state: State) => state.loaded
);

export const authenticatedUser = createSelector(
  getAppState,
  (state: State) => state.authenticatedUser
);

export const v06Auth = createSelector(
  getAppState,
  (state: State) => state.v06Auth
);

export const adminFlags = createSelector(
  getAppState,
  (state: State) => state.adminFlags
);

export const redirectorLinks = createSelector(
  getAppState,
  (state: State) => state.redirectorLinks
);

export const userInfo = createSelector(
  getAppState,
  (state: State) => state.userInfo
);

export const isEmulatedUser = createSelector(
  getAppState,
  (state: State) => state.isEmulatedUser
);

export const isEmulateUserInitiatedFromV06 = createSelector(
  getAppState,
  (state: State) => state.isEmulateUserInitiatedFromV06
);

export const breadcrumbs = createSelector(
  getAppState,
  (state: State) => state.breadcrumbs
);

export const clientInfo = createSelector(
  getAppState,
  (state: State) => state.clientInfo
);

export const contactRecord = createSelector(
  getAppState,
  (state: State) => state.contactRecord
);

export const userHasMultipleContactRecords = createSelector(
  getAppState,
  (state: State) => state.userHasMultipleContactRecords
);

export const userHasSecurityProfiles = createSelector(
  getAppState,
  (state: State) => state.userHasSecurityProfiles
);

export const client = createSelector(
  getAppState,
  (state: State) => state.client
);

export const globalSession = createSelector(
  getAppState,
  (state: State) => state.globalSession
);

export const moduleId = createSelector(
  getAppState,
  (state: State) => state.moduleId
);

export const showSubLeftNav = createSelector(
  getAppState,
  (state: State) => state.showSubLeftNav
);

export const currentRenderFormDocumentParams = createSelector(
  getAppState,
  (state: State) => state.currentRenderFormDocumentParams
);

export const currentProjectId = createSelector(
  getAppState,
  (state: State) => state.currentProjectId
);
