import { Injectable } from '@angular/core';
import { BreadCrumb, Client, ContactRecord, MangoSubApps, UserAuth, UserInfo, V06GlobalSession } from '@mango/data-models/lib-data-models';

import { Store, select } from '@ngrx/store';

import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';
import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class MangoAppFacade { 

  loaded$: Observable<boolean>
  currentSubApp$: Observable<MangoSubApps>
  authenticatedUser$: Observable<UserAuth>
  accessToken$: Observable<string>
  clientKey$: Observable<string>
  userInfo$: Observable<UserInfo>
  breadcrumbs$: Observable<BreadCrumb[]>
  userClient$: Observable<Client>
  contactRecord$: Observable<ContactRecord>
  userHasMultipleContactRecords$: Observable<boolean>
  globalSession$: Observable<V06GlobalSession>
  moduleId$: Observable<number>
  showSubLeftNav$: Observable<boolean>
  currentRenderFormDocumentParams$: Observable<string>
  v06Auth$:  Observable<any>

  constructor(private store: Store) {
    this.loaded$ = this.store.pipe(select(AppSelectors.loaded));
    this.currentSubApp$ = this.store.pipe(select(AppSelectors.currentSubApp));
    this.authenticatedUser$ = this.store.pipe(select(AppSelectors.authenticatedUser));
    this.accessToken$ = this.store.pipe(select(AppSelectors.accessToken));
    this.clientKey$ = this.store.pipe(select(AppSelectors.client));
    this.userInfo$ = this.store.pipe(select(AppSelectors.userInfo));
    this.breadcrumbs$ = this.store.pipe(select(AppSelectors.breadcrumbs))
    this.userClient$ = this.store.pipe(select(AppSelectors.clientInfo));
    this.contactRecord$ = this.store.pipe(select(AppSelectors.contactRecord));
    this.userHasMultipleContactRecords$ = this.store.pipe(select(AppSelectors.userHasMultipleContactRecords));
    this.globalSession$ = this.store.pipe(select(AppSelectors.globalSession));
    this.moduleId$ = this.store.pipe(select(AppSelectors.moduleId));
    this.showSubLeftNav$ = this.store.pipe(select(AppSelectors.showSubLeftNav));
    this.currentRenderFormDocumentParams$ = this.store.pipe(select(AppSelectors.currentRenderFormDocumentParams));
    this.v06Auth$ = this.store.pipe(select(AppSelectors.v06Auth));
  }

  init() {
    this.store.dispatch(AppActions.init());
  }

  localAuth() {
    this.store.dispatch(AppActions.localAuth());
  }

  // If source=v06, that means we came from V06 and V06 is already logged in.
  // Therefore, there is no need to redirect to V06 to finalize login.
  oauthAuth(authCode: string, redirectionUri: string, source: string): void {
    this.store.dispatch(AppActions.oauthAuth({ authCode, redirectionUri, source }))
  }

  setV06oauthAuth(authCode: string, redirectionUri: string, clientKey: string): void {
    this.store.dispatch(AppActions.setV06Auth({ authCode, redirectionUri, clientKey }))
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

  logout(logoutV06: boolean = false): void {
    this.store.dispatch(AppActions.logout({ logoutV06: logoutV06 }))
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

  goToExternalURL(url?: string): void {
    this.store.dispatch(AppActions.goToExternalURL({ url }))
  }
}
