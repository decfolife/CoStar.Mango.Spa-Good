import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { MangoNavigationService } from '../navigation.service';
import { Location } from '@angular/common';
import { UserService } from '@mango/core-shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private facade: MangoAppFacade, private navigationService: MangoNavigationService, private userService: UserService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.facade.accessToken$.pipe(
      switchMap(accessToken => {
        if (accessToken) {
          return of(true)
        } else {
          return this.userService.getCurrentUserAccessToken().pipe(
            map(accessToken => {
              if (accessToken) {
                this.facade.setAccessToken(accessToken)
                return true
              }
            }),
            catchError(error => {
              this.navigationService.redirectToCentralAuth()
              return of(false)
            })
          )
        }
      }),
    )
  }

}
