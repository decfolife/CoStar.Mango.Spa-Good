import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'apps/mango/src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})

export class EndpointService {
  constructor(protected http: HttpClient) { }

  protected rootUrl = `${environment.appUrls.accounting || EndpointService.baseUrl()}`;
  
  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO'
    }),
  };

  public static baseUrl(): any {
    return document.getElementsByTagName('base')[0].href;
  }

  // eslint-disable-next-line class-methods-use-this
  protected handleError<T>(operation = 'operation'): any {
    return (error: any): Observable<T> => {
      console.error(operation, error);

      return of(null as T);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  public responseToObject(response) {
    if (Object.prototype.hasOwnProperty.call(response, 'd')) {
      return JSON.parse(response.d);
    }
    return response;
  }
}
