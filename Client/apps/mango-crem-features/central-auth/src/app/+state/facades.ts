import { Injectable } from '@angular/core';
import { ContactRecord, UserSite } from '@mango/data-models/lib-data-models';
import { Store, select } from '@ngrx/store';
import * as AppActions from './actions/actions';
import * as OAuthActions from './actions/oauth.actions';
import * as AppSelectors from './selectors';
import { UserAuth } from '../models/userAuth';
import { DefaultContactRecordSelection } from '../models/default-contact';

@Injectable()
export class CentralAuthFacade {
  loading$ = this.store.pipe(select(AppSelectors.loading));
  error$ = this.store.pipe(select(AppSelectors.error));
  user$ = this.store.pipe(select(AppSelectors.user));
  isUserAuthenticated$ = this.store.pipe(
    select(AppSelectors.isUserAuthenticated)
  );
  authorizationCode$ = this.store.pipe(select(AppSelectors.authorizationCode));
  redirectionUri$ = this.store.pipe(select(AppSelectors.redirectionUri));
  isClientSpecificLogin$ = this.store.pipe(
    select(AppSelectors.isClientSpecificLogin)
  );
  userClients$ = this.store.pipe(select(AppSelectors.userClients));
  userRecentClients$ = this.store.pipe(select(AppSelectors.userRecentClients));
  selectedClientKey$ = this.store.pipe(select(AppSelectors.selectedClientKey));
  selectedClient$ = this.store.pipe(select(AppSelectors.selectedClient));
  contactId$ = this.store.pipe(select(AppSelectors.contactId));
  selectedContactRecord$ = this.store.pipe(select(AppSelectors.contactRecord));
  selectedDefaultContactRecord$ = this.store.pipe(
    select(AppSelectors.selectedDefaultContactRecord)
  );
  ssoSettings$ = this.store.pipe(select(AppSelectors.ssoSettings));
  userContactRecords$ = this.store.pipe(
    select(AppSelectors.userContactRecords)
  );
  openClientInNewTab$ = this.store.pipe(
    select(AppSelectors.openClientInNewTab)
  );
  isSwitchContactRecord$ = this.store.pipe(
    select(AppSelectors.isSwitchContactRecord)
  );
  loadCurrentUserComplete$ = this.store.pipe(
    select(AppSelectors.loadCurrentUserComplete)
  );

  constructor(private store: Store) {}

  appInit() {
    this.store.dispatch(AppActions.init());
  }

  setLoadCurrentUserComplete(loadCurrentUserComplete: boolean) {
    this.store.dispatch(
      AppActions.setLoadCurrentUserComplete({ loadCurrentUserComplete })
    );
  }

  initAuthorization() {
    this.store.dispatch(OAuthActions.initAuthorization());
  }

  setLoading(loading: boolean) {
    this.store.dispatch(AppActions.setLoading({ loading }));
  }

  login(credentials: any) {
    this.store.dispatch(AppActions.login({ credentials }));
  }

  logout() {
    this.store.dispatch(AppActions.logout());
  }

  logoutWhenIsClientSpecificLoginAndloginToClientSiteFailed() {
    this.store.dispatch(
      AppActions.logoutWhenIsClientSpecificLoginAndloginToClientSiteFailed()
    );
  }

  setUser(user: UserAuth) {
    this.store.dispatch(AppActions.setUser({ user }));
  }

  setOpenClientInNewTab(openClientInNewTab: boolean) {
    this.store.dispatch(
      AppActions.setOpenClientInNewTab({ openClientInNewTab })
    );
  }

  setIsSwitchContactRecord(isSwitchContactRecord: boolean) {
    this.store.dispatch(
      AppActions.setIsSwitchContactRecord({ isSwitchContactRecord })
    );
  }

  getUserClients() {
    this.store.dispatch(AppActions.getUserClients());
  }

  getContactRecords(clientKey: string) {
    this.store.dispatch(AppActions.getContactRecords({ clientKey }));
  }

  handleUserAlreadyLoggedIn() {
    this.store.dispatch(AppActions.handleUserAlreadyLoggedIn());
  }

  handleSSOClientLogin() {
    this.store.dispatch(AppActions.handleSSOClientLogin());
  }

  purgeClientSelection() {
    this.store.dispatch(AppActions.purgeClientSelection());
  }

  getClientSSOSettings(clientKey: string) {
    this.store.dispatch(AppActions.getClientSSOSettings({ clientKey }));
  }

  setClientSpecificLogin(isClientSpecific: boolean) {
    this.store.dispatch(
      AppActions.setClientSpecificLogin({ isClientSpecific })
    );
  }

  setSelectedClientKey(clientKey: string) {
    this.store.dispatch(AppActions.setSelectedClientKey({ clientKey }));
  }

  setClient(client: UserSite) {
    this.store.dispatch(AppActions.setSelectedClient({ client }));
  }

  setSelectedContactId(contactId: number) {
    this.store.dispatch(AppActions.setSelectedContactID({ contactId }));
  }

  setSelectedContactRecord(contactRecord: ContactRecord) {
    this.store.dispatch(AppActions.setContactRecord({ contactRecord }));
  }

  setSelectedDefaultContactRecord(
    defaultContactSelection: DefaultContactRecordSelection
  ) {
    this.store.dispatch(
      AppActions.setDefaultContactRecord({
        defaultContact: defaultContactSelection,
      })
    );
  }

  setRedirectionUri(redirectionUri: string) {
    this.store.dispatch(AppActions.setRedirectionUri({ redirectionUri }));
  }

  startAuthorizationWhenFullySelected() {
    this.store.dispatch(AppActions.startAuthorizationWhenFullySelected());
  }

  authorize(accessToken: string) {
    this.store.dispatch(OAuthActions.authorize({ accessToken }));
  }

  clearState() {
    this.store.dispatch(AppActions.clearState());
  }
}
