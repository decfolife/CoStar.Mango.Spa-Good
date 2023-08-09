/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/member-ordering */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { environment } from '../../../../../../mango/src/environments/environment.local';

@Injectable()
export class EndpointService {
  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO'
    })
  };

  private static logged = false;

  constructor(protected http: HttpClient) {
    if (environment.name !== 'PROD' && !EndpointService.logged) {
      EndpointService.logged = true;
    }
  }

  protected callHttpGet(url: string, functionName: string): Observable<any> {
    return this.http.get(url, this.httpOptions)
      .pipe(
        map(x => this.toObject(x) as any),
        catchError(this.handleError(functionName))
      );
  }

  protected callHttpPost(url: string, functionName: string, postBody: any): Observable<any> {
    return this.http.post(url, postBody, this.httpOptions)
      .pipe(
        map(x => this.toObject(x) as any),
        catchError(this.handleError(functionName))
      );
  }

  protected handleError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      console.error(operation, error);
      return of(null);
    };
  }

  protected toObject(value: any): any {
    if (environment.isRestful) {
      return {
        success: true,
        data: value?.data
          ? value.data
          : value,
        clientErrorMessage: null
      }
    }

    const res = value?.d?.Result ? value.d.Result : value.d;
    const data = JSON.parse(res);;

    return {
      success: res.success,
      data: data?.data
        ? data.data
        : data,
      clientErrorMessage: res.clientErrorMessage
    };
  }

  // Added ApiResponse supports //
  protected getHttpGetApiResponse(url: string, functionName: string): Observable<ApiResponse> {
    return this.http.get(url, this.httpOptions)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
  }

  protected getHttpPostApiResponse(url: string, functionName: string, postBody: any): Observable<ApiResponse> {
    return this.http.post(url, postBody, this.httpOptions)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
  }

  protected handleApiResponseError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      console.error(operation, error);
      if (environment.isRestful && error) {
        return of({
          success: false,
          data: '',
          clientErrorMessage: error.statusText
        });
      }
      return of(null);
    };
  }

  protected toApiResponse(value: any): ApiResponse {
    if (environment.isRestful) {
      return {
        success: true,
        data: value?.data
          ? value.data
          : value,
        clientErrorMessage: null
      }
    }

    const res = value?.d?.Result ? value.d.Result : value.d;
    // console.log('res (in v06)', res);
    let data;

    if (res?.data) {
      data = JSON.parse(res.data);
    } else {
      data = res;
    }

    // console.log('data (in v06)', data);

    return {
      success: res.success,
      data: data?.data
        ? data.data
        : data,
      clientErrorMessage: res.clientErrorMessage
    };
  }
}
