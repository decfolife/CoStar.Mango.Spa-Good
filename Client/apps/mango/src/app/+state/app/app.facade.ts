import { Injectable } from '@angular/core';
import { AdminFlags, BreadCrumb, Client, ContactRecord, MangoSubApps, RedirectorLink, UserAuth, UserInfo, V06GlobalSession } from '@mango/data-models/lib-data-models';
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
  contactRecord$: Observable<ContactRecord>
  clientKey$: Observable<string>
  clientInfo$: Observable<Client>
  userHasMultipleContactRecords$: Observable<boolean>
  userHasMultipleProfiles$: Observable<boolean>
  userInfo$: Observable<UserInfo>
  isEmulatedUser$: Observable<boolean>
  isEmulateUserInitiatedFromV06$: Observable<boolean>
  breadcrumbs$: Observable<BreadCrumb[]>
  globalSession$: Observable<V06GlobalSession>
  moduleId$: Observable<number>
  showSubLeftNav$: Observable<boolean>
  currentRenderFormDocumentParams$: Observable<string>
  v06Auth$:  Observable<any>
  adminFlags$:  Observable<AdminFlags>
  redirectorLinks$: Observable<RedirectorLink[]>

  constructor(private store: Store) {
    this.loaded$ = this.store.pipe(select(AppSelectors.loaded));
    this.currentSubApp$ = this.store.pipe(select(AppSelectors.currentSubApp));
    this.authenticatedUser$ = this.store.pipe(select(AppSelectors.authenticatedUser));
    this.contactRecord$ = this.store.pipe(select(AppSelectors.contactRecord));
    this.clientKey$ = this.store.pipe(select(AppSelectors.client));
    this.clientInfo$ = this.store.pipe(select(AppSelectors.clientInfo));
    this.userHasMultipleContactRecords$ = this.store.pipe(select(AppSelectors.userHasMultipleContactRecords));
    this.userHasMultipleProfiles$ = this.store.pipe(select(AppSelectors.userHasSecurityProfiles));
    this.userInfo$ = this.store.pipe(select(AppSelectors.userInfo));
    this.isEmulatedUser$ = this.store.pipe(select(AppSelectors.isEmulatedUser));
    this.isEmulateUserInitiatedFromV06$ = this.store.pipe(select(AppSelectors.isEmulateUserInitiatedFromV06));
    this.breadcrumbs$ = this.store.pipe(select(AppSelectors.breadcrumbs))
    this.globalSession$ = this.store.pipe(select(AppSelectors.globalSession));
    this.moduleId$ = this.store.pipe(select(AppSelectors.moduleId));
    this.showSubLeftNav$ = this.store.pipe(select(AppSelectors.showSubLeftNav));
    this.currentRenderFormDocumentParams$ = this.store.pipe(select(AppSelectors.currentRenderFormDocumentParams));
    this.v06Auth$ = this.store.pipe(select(AppSelectors.v06Auth));
    this.adminFlags$ = this.store.pipe(select(AppSelectors.adminFlags));
    this.redirectorLinks$ = this.store.pipe(select(AppSelectors.redirectorLinks));
  }

  init() {
    this.store.dispatch(AppActions.init());
  }

  loadCurrentUser() {
    this.store.dispatch(AppActions.loadCurrentUser());
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

  setUserInfo(userInfo: UserInfo): void {
    this.store.dispatch(AppActions.setUserInfo({ userInfo }))
  }

  setBreadcrumbs(breadcrumbs: BreadCrumb[]): void {
    this.store.dispatch(AppActions.setBreadcrumbs({ breadcrumbs }));
  }

  setClientInfo(clientInfo: Client): void {
    this.store.dispatch(AppActions.setupClientSettingsSuccess({ clientInfo }))
  }

  setClientKey(clientKey: string): void {
    this.store.dispatch(AppActions.setClientKey({ clientKey }))
  }

  setContactRecord(contactRecord: ContactRecord): void {
    this.store.dispatch(AppActions.setContactRecord({ contactRecord }))
  }

  setupContactRecord(): void {
    this.store.dispatch(AppActions.setupContactRecord())
  }

  setEmulatedUser(contactId: number, initiatedFromV06: boolean = false): void {
    this.store.dispatch(AppActions.setEmulatedUser({ contactId, initiatedFromV06 }))
  }

  setEmulatedUserContact(contactRecord: ContactRecord, initiatedFromV06: boolean = false): void {
    this.store.dispatch(AppActions.setEmulatedUserSuccess({ contactRecord, initiatedFromV06 }))
  }

  stopEmulatingUser(initiatedFromV06: boolean = false): void {
    this.store.dispatch(AppActions.stopEmulatingUser({ initiatedFromV06 }))
  }

  setupIdleTimeout(): void {
    this.store.dispatch(AppActions.setupIdleTimeout())
  }

  logoutWhenTimedOut(): void {
    this.store.dispatch(AppActions.logoutWhenTimedOut())
  }

  setModuleId(moduleId: number): void {
    this.store.dispatch(AppActions.setModuleId({ moduleId }))
  }

  loadRedirectorLinks(): void {
    this.store.dispatch(AppActions.loadRedirectorLinks())
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
