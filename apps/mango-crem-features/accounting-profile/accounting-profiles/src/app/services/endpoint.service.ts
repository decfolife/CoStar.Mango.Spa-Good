import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ConfigurationService } from './configuration.service';

@Injectable()
export class EndpointService {
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO',
      UseQueryOptimization: '1',
    }),
  };

  // private readonly _loginUrl: string = '/api/account/login';

  constructor(protected http: HttpClient, public configurations: ConfigurationService) { }

  rootUrl(): string {
    return ConfigurationService.baseUrl();
  }

  // get loginUrl() {
  //   return this.configurations.baseUrl + this._loginUrl;
  // }

  useQueryOptimization(): boolean {
    return this.httpOptions.headers.get('UseQueryOptimization') === '1';
  }

  protected handleError<T>(operation = 'operation'): any {
    return (error: any): Observable<T> => {
      console.error(operation, error);

      return of(null as T);
    };
  }

  responseToObject(response) {
    if (Object.prototype.hasOwnProperty.call(response, 'd')) {
      return JSON.parse(response.d);
    }

    return response;
  }
}
