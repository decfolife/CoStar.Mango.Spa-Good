/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ConfigurationService } from './configuration.service';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root' })
export class EndpointService {
  constructor(protected http: HttpClient,
    protected configurations: ConfigurationService) { }

  protected rootUrl = `${this.configurations.baseUrl}/api`;

  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO'
    }),
  };

  public static baseUrl() {
    return environment.appUrls.batchAccounting ?? document.getElementsByTagName('base')[0].href;
  }

  protected handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(operation, error);

      return of(null as T);
    };
  }

  public responseToObject(response) {
    if (Object.prototype.hasOwnProperty.call(response, 'd')) {
      return JSON.parse(response.d);
    }

    return response;
  }
}
