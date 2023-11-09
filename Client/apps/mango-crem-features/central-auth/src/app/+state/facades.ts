import { Injectable } from "@angular/core";
import { UserAuth, UserSite } from "@mango/data-models/lib-data-models";
import { select, Store } from "@ngrx/store";
import * as AppActions from './actions';
import * as AppSelectors from './selectors';

@Injectable()
export class CentralAuthFacade {

  isUserAuthenticated$ = this.store.pipe(select(AppSelectors.isUserAuthenticated));
  authorizationCode$ = this.store.pipe(select(AppSelectors.authorizationCode));
  redirectionUri$ = this.store.pipe(select(AppSelectors.redirectionUri));
  isClientSpecificLogin$ = this.store.pipe(select(AppSelectors.isClientSpecificLogin));
  userClients$ = this.store.pipe(select(AppSelectors.userClients));
  userRecentClients$ = this.store.pipe(select(AppSelectors.userRecentClients));
  client$ = this.store.pipe(select(AppSelectors.client));
  contactId$ = this.store.pipe(select(AppSelectors.contactId));
  accessToken$ = this.store.pipe(select(AppSelectors.accessToken));
  user$ = this.store.pipe(select(AppSelectors.user));
  ssoSettings$ = this.store.pipe(select(AppSelectors.ssoSettings));
  userContactRecords$ = this.store.pipe(select(AppSelectors.userContactRecords));

  constructor(private store: Store) { }

  appInit() {
    this.store.dispatch(AppActions.init());
  }
  
  login(credentials: any) {
    this.store.dispatch(AppActions.login({ credentials}));
  }

  logout() {
    this.store.dispatch(AppActions.logout());
  }

  setUser(user: UserAuth) {
    this.store.dispatch(AppActions.setUser({ user }));
  }

  getUserClients() {
    this.store.dispatch(AppActions.getUserClients());
  }

  getContactRecords(clientKey: string) {
    this.store.dispatch(AppActions.getContactRecords({ clientKey }));
  }

  getClientSSOSetings(clientKey: string) {
    this.store.dispatch(AppActions.getClientSSOSettings({ clientKey }));
  }

  setAccessToken(accessToken: string) {
    this.store.dispatch(AppActions.setAccessToken({ accessToken }));
  }

  setClientSpecificLogin(isClientSpecific: boolean) {
    this.store.dispatch(AppActions.setClientSpecificLogin({ isClientSpecific }));
  }

  setSelectedClientKey(clientKey: string) {
    this.store.dispatch(AppActions.setSelectedClientKey({ clientKey }));
  }

  setClient(client: UserSite) {
    this.store.dispatch(AppActions.setSelectedClient({ client }));
  }

  setContactId(contactId: number) {
    this.store.dispatch(AppActions.setContactRecord({ contactId }));
  }

  setRedirectionUri(redirectionUri: string) {
    this.store.dispatch(AppActions.setRedirectionUri({ redirectionUri }));
  }

  retrieveAuthorizationCode(redirectUri: string) {
    this.store.dispatch(AppActions.retrieveAuthorizationCode({ redirectUri }));
  }

  redirectToClient() {
    this.store.dispatch(AppActions.redirectToClient());
  }

  clearState() {
    this.store.dispatch(AppActions.clearState());
  }
}