import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Params, UrlTree } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { MangoNavigationService } from '../navigation.service';
import { JwtService, AuthService, UtilitiesService } from '@mango/core-shared';
import { UserAuth } from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private facade: MangoAppFacade,
    private activatedRoute: ActivatedRoute,
    private navigationService: MangoNavigationService,
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.facade.authenticatedUser$.pipe(
      switchMap((user) =>
        combineLatest([
          of(user),
          this.activatedRoute.queryParams,
          this.activatedRoute.pathFromRoot,
        ])
      ),
      map(([user, params, url]: [UserAuth, Params, any]) => {
        return [user, params, url];
      }),
      switchMap(([user, params, url]: [UserAuth, Params, string]) => {
        if (!!user || !!params.auth_code) {
          return of(true);
        }

        if (UtilitiesService.isLocalEnvironment()) {
          let token = this.jwtService.getToken();
          if (token) return of(true);

          this.navigationService.redirectToCentralAuth();
          return of(false);
        }

        return this.authService.getCurrentUser().pipe(
          map((user) => {
            if (user) {
              this.facade.setAuthenticatedUser(user);
              return true;
            }
          }),
          catchError((error) => {
            this.facade.logout(true);
            return of(false);
          })
        );
      })
    );
  }
}
