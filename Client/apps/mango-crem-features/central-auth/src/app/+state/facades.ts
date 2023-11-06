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
  client$ = this.store.pipe(select(AppSelectors.client));
  contactId$ = this.store.pipe(select(AppSelectors.contactId));
  accessToken$ = this.store.pipe(select(AppSelectors.accessToken));
  user$ = this.store.pipe(select(AppSelectors.user));

  constructor(private store: Store) { }

  logout() {
    this.store.dispatch(AppActions.logout());
  }

  setUser(user: UserAuth) {
    this.store.dispatch(AppActions.setUser({ user }));
  }

  setAccessToken(accessToken: string) {
    this.store.dispatch(AppActions.setAccessToken({ accessToken }));
  }

  setClient(client: UserSite) {
    this.store.dispatch(AppActions.setClient({ client }));
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
}