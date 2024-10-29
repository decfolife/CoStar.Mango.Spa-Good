import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CentralAuthFacade } from '../+state/facades';
import {
  OAUTH_CLIENT_KEY_QUERY_PARAM,
  OAUTH_REDIRECT_QUERY_PARAM,
  SHOW_MULTI_CONTACT_POPUP_QUERY_PARAM,
} from '@mango/data-models/lib-data-models';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard {
  isInboundOn: boolean;

  constructor(
    private authService: AuthService,
    private centralAuthFacade: CentralAuthFacade,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const clientKey =
      route.queryParamMap.get('clientKey') ||
      route.paramMap.get('clientKey') ||
      route.queryParamMap.get(OAUTH_CLIENT_KEY_QUERY_PARAM);
    const redirectUri = route.queryParamMap.get(OAUTH_REDIRECT_QUERY_PARAM);
    const showMultiContactPopup = route.queryParamMap.get(
      SHOW_MULTI_CONTACT_POPUP_QUERY_PARAM
    );

    !!clientKey ? this.centralAuthFacade.setSelectedClientKey(clientKey) : null;
    !!redirectUri
      ? this.centralAuthFacade.setRedirectionUri(redirectUri)
      : null;
    !!showMultiContactPopup
      ? this.centralAuthFacade.setIsSwitchContactRecord(true)
      : null;
    !!clientKey || !!redirectUri
      ? this.centralAuthFacade.setOpenClientInNewTab(false)
      : null;

    return this.centralAuthFacade.user$.pipe(
      switchMap((user) => {
        if (user) {
          return of(true);
        }

        return this.authService.getCurrentUser().pipe(
          map((user) => {
            if (user) {
              this.centralAuthFacade.setUser(user);
              return true;
            }
          }),
          catchError((error) => {
            this.router.navigate(['/'], { queryParamsHandling: 'merge' });
            return of(false);
          })
        );
      })
    );
  }
}
