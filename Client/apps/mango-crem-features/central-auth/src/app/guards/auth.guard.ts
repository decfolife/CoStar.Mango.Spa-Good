import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { UserService } from '@mango/core-shared';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CentralAuthFacade } from '../+state/facades';

@Injectable()
export class AuthGuard implements CanActivate {
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
    return this.getAccessToken().pipe(map(accessToken => {
      if (accessToken) {
        this.centralAuthFacade.setAccessToken(accessToken)
        return true
      } else {
        this.router.navigate(['/']);
        return false
      }
    }))
  }

  getAccessToken(): Observable<string> {
    return this.centralAuthFacade.accessToken$.pipe(
      switchMap(accessToken => accessToken ? of(accessToken) : this.userService.getCurrentUserAccessToken())
    )
  }
}
