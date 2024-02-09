import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService, UserService } from '../services';
import { switchMap, take } from 'rxjs/operators';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private facade: MangoAppFacade) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.facade.accessToken$.pipe(
      take(1),
      switchMap(token => {
        const headers = this.generateRequestHeaders(token)
        const request = req.clone({ setHeaders: headers })
        return next.handle(request)
      }))
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
}
