/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FormItemService {

  baseUrl: string = '';
  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO',
      CAEnabled: 'false'
    })
  };

  protected httpOptionsWithParams: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO',
      CAEnabled: 'false'
    })
  };

  constructor(
    protected http: HttpClient
  ) {
  }

  public GetFormItemChangeHistory(formItemID: number, objectID: number, objectTypeID: number, relatedObjectID: number, relatedObjectTypeID: number
      , relationshipDefinitionID: number, objectTypeTypeID: number): Observable<ApiResponse> {
    let route = 'GetFormItemChangeHistory';
    const param = {
      FormItemID: formItemID,
      ObjectID: objectID,
      ObjectTypeID: objectTypeID,
      RelatedObjectID: relatedObjectID,
      RelatedObjectTypeID: relatedObjectTypeID,
      RelationshipDefinitionID: relationshipDefinitionID,
      ObjectTypeTypeID: objectTypeTypeID
    };
    if (!environment.isRestful) {
      route = '' + route;
      return this.getHttpGetApiResponse(route, 'GetFormItemChangeHistory', param, environment.appUrls.objectActions + route);
    } else {
      route = 'ObjectActions/' + route;
    }
    return this.getHttpGetApiResponse(route, 'GetFormItemChangeHistory', param, environment.appUrls.objectActions + route);
  }

  public getUserPreferences(): Observable<any> {
    let route = "GetUserPreferences";
    if (!environment.isRestful) {
      return this.getHttpPostApiResponse(route, 'GetUserPreferences', {}, environment.appUrls.dashboards + route)
    } else {
      route = "Dashboards/" + route;
    }
    return this.getHttpGetApiResponse(route, 'GetUserPreferences', {}, environment.appUrls.dashboards + route)
  }

  public GetFormItemChangeHistoryWithParam(param: any): Observable<ApiResponse> {
  let route = 'GetFormItemChangeHistory';
  if (!environment.isRestful) {
    route = '' + route;
    return this.getHttpGetApiResponse(route, 'GetFormItemChangeHistory', param, environment.appUrls.objectActions + route);
  } else {
    route = 'ObjectActions/' + route;
  }
  return this.getHttpGetApiResponse(route, 'GetFormItemChangeHistory', param, environment.appUrls.objectActions + route);
}



  // ApiResponse calls //
  protected getHttpGetApiResponse(
    url: string,
    functionName: string,
    httpOptionsParams?: HttpParams | { [param: string]: any },
    overrideLocalUrl = null): Observable<ApiResponse> {
    if (httpOptionsParams) {
      this.httpOptionsWithParams.params = httpOptionsParams;
    }
    url = this.baseUrl + url;
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    }
    if (httpOptionsParams) {
      return this.http.get(url, this.httpOptionsWithParams)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
    } else { 
      return this.http.get(url, this.httpOptions)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
    }
  }

  protected getHttpPostApiResponse(
    url: string,
    functionName: string,
    postBody: any,
    overrideLocalUrl): Observable<ApiResponse> {
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    } else {
      url = environment.appUrls.objectActions + url
    }

    return this.http.post(url, postBody, this.httpOptions)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
  }

  protected getHttpPutApiResponse(
    url: string,
    functionName: string,
    putBody: any,
    overrideBaseUrl: boolean = false,
    overrideLocalUrl): Observable<ApiResponse> {
    if (overrideBaseUrl) {
      url = environment.appUrls.objectActions + url
    } else {
      url = this.baseUrl + url;
    }
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    }
    // url = 'http://localhost:39187' + url;
    return this.http.put(url, putBody, this.httpOptions)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
  }

  protected getHttpDeleteApiResponse(
    url: string,
    functionName: string,
    overrideBaseUrl: boolean = false,
    overrideLocalUrl): Observable<ApiResponse> {
    if (overrideBaseUrl) {
      url = environment.appUrls.objectActions + url
    } else {
      url = this.baseUrl + url;
    }
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    }
    // url = 'http://localhost:39187' + url;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
  }

  protected handleApiResponseError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      if (environment.isRestful && error) {
        return of({
          success: false,
          data: '',
          clientErrorMessage: error?.error?.clientErrorMessage || error.statusText
        });
      }
      return of(null);
    };
  }

  protected toApiResponse(value: any): ApiResponse {
    const result: ApiResponse =
    {
      success: false,
      data: '{}',
      clientErrorMessage: ''
    };

    if (environment.isRestful) {
      result.success = value.success ? value.success : false;
      result.data = (value.data || (!value.data && value.data === 0)) ? value.data : '{}';
      result.clientErrorMessage = result.success ? '' : result.data;
      return result;
    }

    const res = value?.d?.Result ? value.d.Result : value.d;
    const data = JSON.parse(res);
    result.success = data.success;
    result.data = (data.data || (!data.data && data.data === 0)) ? data.data : '{}';
    result.clientErrorMessage = result.success ? '' : result.data;
    return result;
  }
}