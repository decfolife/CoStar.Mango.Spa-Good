import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
} from '@angular/router';

import { UserService } from '@mango/core-shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CentralAuthFacade } from '../+state/facades';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  isInboundOn: boolean;

  constructor(
    private userService: UserService,
    private centralAuthFacade: CentralAuthFacade,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const url: string = state.url;
    return this.isAuthenticated();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.isAuthenticated();
  }

  isAuthenticated(): Observable<boolean> {
    return this.userService.getCurrentUserAccessToken().pipe(
      map((token: string) => {
        if (token) {
          if (!this.userService.accessTokenValue) {
            this.userService.setAccessToken(token)
            this.centralAuthFacade.setAccessToken(this.userService.accessTokenValue)
          }
       
          return true;
        }

        this.router.navigate(['/']);

        return false
      })
    )
  }
}
