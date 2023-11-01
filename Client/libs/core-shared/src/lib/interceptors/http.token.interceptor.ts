import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService, UserService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    let token = this.getAccessToken();
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });

    return next.handle(request);
  }

  /** 
   * Ideally, the access token (JWT) should be grabbed from state management as well as we should be 
   * using http-only cookies to keep a user's session. 
   * 
   * CentralAuth now uses session cookies and no longer stores the JWT in localstorage. It stores the token in memory only. 
   * However, MangoSPA still stores in localstorage until we add cookie auth for sessions.
   * 
   * So:
   *    If application is CentralAuth, grab token from memory
   *    If application is MangoSPA, grab token from localstorage
  */
  getAccessToken() {
    let token = this.userService.accessTokenValue;

    if (!token) {
      token = this.jwtService.getToken(); // localstorage
    }

    return token;
  }
}
