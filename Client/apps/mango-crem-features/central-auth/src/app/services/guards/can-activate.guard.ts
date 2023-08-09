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



@Injectable()
export class CanActivateGuard implements CanActivate, CanActivateChild, CanLoad {
  isInboundOn: boolean;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    return this.isAuthenticated();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    let isAuthenticated = this.userService.isUserAuthenticated();

    if (isAuthenticated) return true;

    this.router.navigate(['/']);

    return isAuthenticated;
  }
}
