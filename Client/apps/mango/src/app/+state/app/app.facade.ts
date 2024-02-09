import { Injectable } from '@angular/core';
import { BreadCrumb, Client, ContactRecord, MangoSubApps, UserAuth, UserInfo, V06GlobalSession } from '@mango/data-models/lib-data-models';

import { Store, select } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';
import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors';

@Injectable()
export class MangoAppFacade {

  loaded$ = this.store.pipe(select(AppSelectors.loaded));
  currentSubApp$ = this.store.pipe(select(AppSelectors.currentSubApp));
  authenticatedUser$ = this.store.pipe(select(AppSelectors.authenticatedUser));
  accessToken$ = this.store.pipe(select(AppSelectors.accessToken));
  clientKey$ = this.store.pipe(select(AppSelectors.client));
  userInfo$ = this.store.pipe(select(AppSelectors.userInfo));
  breadcrumbs$ = this.store.pipe(select(AppSelectors.breadcrumbs))
  userClient$ = this.store.pipe(select(AppSelectors.clientInfo));
  contactRecord$ = this.store.pipe(select(AppSelectors.contactRecord));
  globalSession$ = this.store.pipe(select(AppSelectors.globalSession));
  moduleId$ = this.store.pipe(select(AppSelectors.moduleId));
  showSubLeftNav$ = this.store.pipe(select(AppSelectors.showSubLeftNav));
  currentRenderFormDocumentParams$ = this.store.pipe(select(AppSelectors.currentRenderFormDocumentParams));

  constructor(private store: Store) { }

  init() {
    this.store.dispatch(AppActions.init());
  }

  localAuth() {
    this.store.dispatch(AppActions.localAuth());
  }

  setLoading(display: boolean): void {
    this.store.dispatch(AppActions.setLoading({ display }))
  }

  loadSubApp(subApp: MangoSubApps): void {
    this.store.dispatch(AppActions.loadSubApp({ subApp }))
  }


  setAuthenticatedUser(user: UserAuth): void {
    this.store.dispatch(AppActions.setAuthenticatedUser({ user }))
  }

  setAccessToken(accessToken: string) {
    this.store.dispatch(AppActions.setAccessToken({ accessToken }));
  }

  setUserInfo(userInfo: UserInfo): void {
    this.store.dispatch(AppActions.setUserInfo({ userInfo }))
  }

  setBreadcrumbs(breadcrumbs: BreadCrumb[]): void {
    this.store.dispatch(AppActions.setBreadcrumbs({ breadcrumbs }));
  }

  setClientInfo(clientInfo: Client): void {
    this.store.dispatch(AppActions.setClientInfo({ clientInfo }))
  }

  setClientKey(clientKey: string): void {
    this.store.dispatch(AppActions.setClientKey({ clientKey }))
  }

  setContactRecord(contactRecord: ContactRecord): void {
    this.store.dispatch(AppActions.setContactRecord({ contactRecord }))
  }

  setModuleId(moduleId: number): void {
    this.store.dispatch(AppActions.setModuleId({ moduleId }))
  }

  showSubLeftNav(showSubLeftNav: boolean): void {
    this.store.dispatch(AppActions.setShowSubLetNav({ show: showSubLeftNav }))
  }

  setCurrentRenderFormDocumentParams(params: string): void {
    this.store.dispatch(AppActions.setCurrentRenderFormDocumentParams({ params }))
  }

  logout(config?: { logoutCA: boolean }): void {
    this.store.dispatch(AppActions.logout({ logoutCA: (config || { logoutCA: true }).logoutCA }))
  }

  clearState() {
    this.store.dispatch(AppActions.clearState());
  }

  navigateLeftNevMenu(navLink: SharedLeftNavLink): void {
    this.store.dispatch(AppActions.navigateLeftNavMenu({ navLink }))
  }

  getGlobalSesssoin(): void {
    this.store.dispatch(AppActions.getGlobalSession())
  }

  updateGlobalSession(session?: V06GlobalSession): void {
    this.store.dispatch(AppActions.updateGlobalSession({ session }))
  }
}
