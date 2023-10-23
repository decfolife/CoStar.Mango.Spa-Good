import { Injectable } from '@angular/core';
import { BreadCrumb, Client, ContactRecord, Link, MangoSubApps, UserAuth, UserInfo } from '@mango/data-models/lib-data-models';

import { select, Store, Action } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';

@Injectable()
export class MangoAppFacade {

  loaded$ = this.store.pipe(select(AppSelectors.loaded));
  currentSubApp$ = this.store.pipe(select(AppSelectors.currentSubApp));
  authenticatedUser$ = this.store.pipe(select(AppSelectors.authenticatedUser));
  clientKey$ = this.store.pipe(select(AppSelectors.client));
  userInfo$ = this.store.pipe(select(AppSelectors.userInfo));
  breadcrumbs$ = this.store.pipe(select(AppSelectors.breadcrumbs))
  userClient$ = this.store.pipe(select(AppSelectors.clientInfo));
  contactRecord$ = this.store.pipe(select(AppSelectors.contactRecord));
  globalSession$ = this.store.pipe(select(AppSelectors.globalSession));
  moduleId$ = this.store.pipe(select(AppSelectors.moduleId), take(1));
  renderFormLeftNavDisplayed$ = this.store.pipe(select(AppSelectors.renderFormLeftNavDisplayed), take(1));
  //Subjects
  moduleIdBehaviorSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null)
  renderFormBehaviorSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor(private store: Store) { }

  init() {
    this.store.dispatch(AppActions.init());
  }

  setLoading(display: boolean): void {
    this.store.dispatch(AppActions.setLoading({ display }))
  }

  loadSubApp(subApp: MangoSubApps): void {
    this.store.dispatch(AppActions.loadSubApp({ subApp }))
  }

  setupCremAuthentication(authCode: string, redirectionUri: string): void {
    this.store.dispatch(AppActions.setupCremAuthentication({ authCode, redirectionUri }))
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
    this.setRenderFormLeftNavDisplayed(false);
    this.moduleIdBehaviorSubject$.next(moduleId)
  }

  setRenderFormLeftNavDisplayed(renderFormLeftNavDisplayed: boolean): void {
    this.store.dispatch(AppActions.setRenderFormLeftNavDisplayed({ renderFormLeftNavDisplayed }))
  }

  dispatchRenderFormEvent(routeUrl: string): void {
    this.setRenderFormLeftNavDisplayed(true);
    this.renderFormBehaviorSubject$.next(routeUrl)
  }

  logout(): void {
    this.store.dispatch(AppActions.logout())
  }

  navigateLeftNevMenu(navLink: SharedLeftNavLink): void {
    this.store.dispatch(AppActions.navigateLeftNavMenu({ navLink }))
  }

  getGlobalSesssoin(): void {
    this.store.dispatch(AppActions.getGlobalSession())
  }

  updateGlobalSession(): void {
    this.store.dispatch(AppActions.updateGlobalSession())
  }
}
