import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralAuthFacade } from '../../../+state/facades';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EMPTY, Subscription, combineLatest, iif, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CentralAuthError, CentralAuthUIError, MangoErrorTypes, OAUTH_CLIENT_KEY_QUERY_PARAM, OAUTH_CONTACT_ID_QUERY_PARAM, OAUTH_LOGOUT_QUERY_PARAM, OAUTH_REDIRECT_QUERY_PARAM } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-authorize',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CentralAuthFacade],
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss'],
})
export class AuthorizeComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription()
  constructor(private centralAuthFacade: CentralAuthFacade, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subs.add(this.activatedRoute.queryParamMap.pipe(
      map(queryParams => ({
        redirect_uri: queryParams.get(OAUTH_REDIRECT_QUERY_PARAM),
        client_key: queryParams.get(OAUTH_CLIENT_KEY_QUERY_PARAM),
        contact_id: queryParams.get(OAUTH_CONTACT_ID_QUERY_PARAM),
        logout: queryParams.get(OAUTH_LOGOUT_QUERY_PARAM)
      })),
      switchMap(({ redirect_uri, client_key, contact_id, logout }) => {
        if (logout && logout === 'true') {
          this.centralAuthFacade.logout()
          return EMPTY
        } else {
          return of({ redirect_uri, client_key, contact_id })
        }
      }),
      map(({ redirect_uri, client_key, contact_id }) => {
        !!client_key ? this.centralAuthFacade.setClientKey(client_key) : null
        !!contact_id ? this.centralAuthFacade.setContactId(parseInt(contact_id)) : null
        this.centralAuthFacade.setRedirectionUri(encodeURIComponent(redirect_uri))
      }),
      switchMap(_ => combineLatest([this.centralAuthFacade.isUserAuthenticated$, this.centralAuthFacade.redirectionUri$])),
      switchMap(([isUserAuthenticated, redirectUri]) => !!isUserAuthenticated ? of(this.centralAuthFacade.retrieveAuthorizationCode(redirectUri)) : of(this.router.navigate(['/']))
      )
    ).subscribe())
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
