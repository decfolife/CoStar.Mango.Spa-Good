import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '@mango/core-shared';
import { OAUTH_CLIENT_KEY_QUERY_PARAM, OAUTH_CONTACT_ID_QUERY_PARAM, OAUTH_LOGOUT_QUERY_PARAM, OAUTH_REDIRECT_QUERY_PARAM } from '@mango/data-models/lib-data-models';
import { EMPTY, Subscription, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../../+state/facades';

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
  constructor(private centralAuthFacade: CentralAuthFacade, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.subs.add(this.activatedRoute.queryParamMap.pipe(
      map(queryParams => ({
        redirect_uri: queryParams.get(OAUTH_REDIRECT_QUERY_PARAM),
        // Disable reading client key and contact record
        client_key: /*queryParams.get(OAUTH_CLIENT_KEY_QUERY_PARAM)*/ null,
        contact_id: /*queryParams.get(OAUTH_CONTACT_ID_QUERY_PARAM)*/ null,
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
        !!client_key ? this.centralAuthFacade.setClient({ clientKey: client_key }) : null
        !!contact_id ? this.centralAuthFacade.setContactId(parseInt(contact_id)) : null
        this.centralAuthFacade.setRedirectionUri(encodeURIComponent(redirect_uri))
      }),
      switchMap(_ => combineLatest([this.centralAuthFacade.isUserAuthenticated$, this.centralAuthFacade.redirectionUri$, this.centralAuthFacade.client$])),
      switchMap(([isUserAuthenticated, redirectUri, client]) => {
        if (!client) {
          return of(this.router.navigate(['/customer-selection']))
        }
        return !!isUserAuthenticated ? of(this.centralAuthFacade.retrieveAuthorizationCode(redirectUri)) : of(this.router.navigate(['/', client.clientKey || '']))
      }
      )
    ).subscribe())
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
