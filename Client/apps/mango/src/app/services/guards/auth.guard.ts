import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Params, UrlTree } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { MangoNavigationService } from '../navigation.service';
import { JwtService, AuthService, UtilitiesService } from '@mango/core-shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private facade: MangoAppFacade, 
    private activatedRoute: ActivatedRoute, 
    private navigationService: MangoNavigationService, 
    private authService: AuthService,
    private jwtService: JwtService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.facade.accessToken$.pipe(
      switchMap(accessToken => combineLatest([of(accessToken), this.activatedRoute.queryParams, this.activatedRoute.pathFromRoot])),
      map(([accessToken, params, url]) => {
        return [accessToken, params, url]
      }),
      switchMap(([accessToken, params, url]: [string, Params, string]) => {
        if (!!accessToken || !!params.auth_code) {
          return of(true)
        } 
        
        if (UtilitiesService.isLocalEnvironment()) {
          let token = this.jwtService.getToken()
          if (token) return of(true)       

          this.navigationService.redirectToCentralAuth()
          return of(false)
        } 

        return this.authService.getCurrentUserAccessToken().pipe(
          map(accessToken => {
            if (accessToken) {
              this.facade.setAccessToken(accessToken)
              return true
            }
          }),
          catchError(error => {
            this.facade.logout()
            this.navigationService.redirectToCentralAuth()
            return of(false)
          })
        )
      })
    )
  }
}
