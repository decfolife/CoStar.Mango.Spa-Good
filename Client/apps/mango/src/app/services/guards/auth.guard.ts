import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { MangoNavigationService } from '../navigation.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private facade: MangoAppFacade, private activatedRoute: ActivatedRoute, private navigationService: MangoNavigationService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.facade.authenticatedUser$.pipe(
      switchMap(user => combineLatest([of(user), this.activatedRoute.queryParams, this.activatedRoute.pathFromRoot])),
      map(([user, params, url]) => {
        if (!!user || !!params.auth_code) {
          return true
        } else {
          this.navigationService.redirectToCentralAuth()
         return false
        }
      }));
  }

}
