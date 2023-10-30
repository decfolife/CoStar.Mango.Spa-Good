import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as AppActions from './actions';
import * as AppSelectors from './selectors';
import { ContactRecord, UserAuth } from "@mango/data-models/lib-data-models";

@Injectable()
export class CentralAuthFacade {

  isUserAuthenticated$ = this.store.pipe(select(AppSelectors.isUserAuthenticated));
  authorizationCode$ = this.store.pipe(select(AppSelectors.authorizationCode));
  redirectionUri$ = this.store.pipe(select(AppSelectors.redirectionUri));
  clientKey$ = this.store.pipe(select(AppSelectors.clientKey));
  contactId$ = this.store.pipe(select(AppSelectors.contactId));
  user$ = this.store.pipe(select(AppSelectors.user));

  constructor(private store: Store) { }

  logout() {
    this.store.dispatch(AppActions.logout());
  }

  setUser(user: UserAuth) {
    this.store.dispatch(AppActions.setUser({ user }));
  }

  setClientKey(clientKey: string) {
    this.store.dispatch(AppActions.setClientKey({ clientKey }));
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