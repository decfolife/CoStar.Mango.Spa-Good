import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@mango/core-shared';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthURLService } from '../../services/url.service';

@Component({
  selector: 'mango-central-auth',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [CentralAuthURLService]
})
export class IndexComponent implements OnInit {

  user$ = this.centralAuthFacade.user$

  subs: Subscription[] = []
  constructor(private centralAuthFacade: CentralAuthFacade, private urlService: CentralAuthURLService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
      this.subs.push(this.customerSpecificLoginHandler().subscribe(), this.alreadyLoggedInUserHandler().subscribe(), this.ssoLoginHandler().subscribe())
  }

  ssoLoginHandler(): Observable<any> {
    return this.centralAuthFacade.ssoSettings$.pipe(
      filter(ssoSettings => !!ssoSettings),
      tap(ssoSettings => ssoSettings.forceSSO && ssoSettings.isSSOEnabled ?  window.location.href = ssoSettings.ssoUri : null)
    )
  }

  alreadyLoggedInUserHandler(): Observable<any> {
    return combineLatest([this.centralAuthFacade.user$, this.centralAuthFacade.isUserAuthenticated$]).pipe(
      filter(([user, isUserFullyAuthenticated]) => !!user),
      tap(([user, isUserFullyAuthenticated]) => {
        if (user.isServiceAccount) {
          this.router.navigate(['service-account-configuration'])
        } else if (!isUserFullyAuthenticated) {
          this.router.navigate(['customer-selection'])
        }
      }),
      map(_ => this.urlService.readClientSiteRouteParam()),
    )
  }

  
  customerSpecificLoginHandler(): Observable<any> {
    return of(this.urlService.readClientSiteRouteParam())
      .pipe(
        filter(clientKey => !!clientKey),
        tap(_ => this.centralAuthFacade.setClientSpecificLogin(true)),
        tap(clientKey => this.centralAuthFacade.getClientSSOSetings(clientKey)),
      )
  }
}
