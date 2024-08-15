import { JwtService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private facade: MangoAppFacade, private jwtService: JwtService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (UtilitiesService.isLocalEnvironment()) {
      let token = this.jwtService.getToken()
      const headers = this.generateRequestHeaders(token)
      const request = req.clone({ setHeaders: headers })
      return next.handle(request).pipe(
        catchError(this.handleError)
      )
    }

    return this.facade.authenticatedUser$.pipe(
      take(1),
      switchMap(user => {
        const headers = this.generateRequestHeaders(null)
        const request = req.clone({ setHeaders: headers, withCredentials: true })
        return next.handle(request)
      }),
      catchError(this.handleError)
    )
  }

  generateRequestHeaders(accessToken: string): any {
    const headers = {
      'source-app': 'crem-mango',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    accessToken ? headers['Authorization'] = `Bearer ${accessToken}` : null
    return headers
  }

  // Needs to be an arrow function otherwise injector does not work.
  handleError = (errorResponse: HttpErrorResponse) => {
    if (UtilitiesService.isLocalEnvironment()) { 
      if (errorResponse.status === 401 || errorResponse.status === 0) {
        this.facade.logout(true)
      }

      return throwError(errorResponse);
    }

    this.facade.authenticatedUser$.pipe(
      take(1),
      filter(user => !!user),
      tap(_ => {
        if (errorResponse.status === 401) {
          this.facade.logout(true)
        }
      })
    ).subscribe();

    // if (errorResponse.status === 401) {
    //   this.facade.logout(true)
    // }

    return throwError(errorResponse);
  }
}
