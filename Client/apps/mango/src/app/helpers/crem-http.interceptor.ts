import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CremHttpInterceptor implements HttpInterceptor {
    
    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header that security scans have found in the past
        request = request.clone({
            setHeaders: {
              "X-Xss-Protection": "0",
              "X-Content-Type-Options": "nosniff",
              "Content-Security-Policy": "default-src 'self' script-src 'self' ",
              "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
              "X-UA-Compatible": "IE=edge, chrome=1",
              "X-Frame-Options": "SAMEORIGIN",
            }
          });
            return next.handle(request);
        }
    }
