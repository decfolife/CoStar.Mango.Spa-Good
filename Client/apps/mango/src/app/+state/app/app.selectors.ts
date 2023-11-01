import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APP_FEATURE_KEY,
  State
} from './app.reducer';

export const getAppState = createFeatureSelector< State>(
  APP_FEATURE_KEY
);

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

export const userInfo = createSelector(
  getAppState,
  (state: State) => state.userInfo
);

export const breadcrumbs = createSelector(
  getAppState,
  (state: State) => state.breadcrumbs
)

export const clientInfo = createSelector(
  getAppState,
  (state: State) => state.clientInfo
);

export const contactRecord = createSelector(
  getAppState,
  (state: State) => state.contactRecord
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