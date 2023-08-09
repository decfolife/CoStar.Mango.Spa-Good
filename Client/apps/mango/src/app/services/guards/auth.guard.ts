import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { OAUTH_REDIRECT_QUERY_PARAM } from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private facade: MangoAppFacade, private router: Router, private activatedRoute: ActivatedRoute) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.facade.authenticatedUser$.pipe(
      switchMap(user => combineLatest([of(user), this.activatedRoute.queryParams])),
      map(([user, params]) => {
        if (!!user || !!params.auth_code) {
          return true
        } else {
          const url = `${environment.CAUrl}oauth/authorize?${OAUTH_REDIRECT_QUERY_PARAM}=${window.location.origin}/auth/validate`
          // window.location.href = url
         return false
        }
      }));
  }

}
