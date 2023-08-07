import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class FormWizardService {

  baseUrl: string = "";
  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'UserId': '2',
      'ClientKey': 'BLANK',
      'CAEnabled': 'false'
    })
  };

  protected httpOptionsWithParams: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'UserId': '2',
      'ClientKey': 'BLANK',
      'CAEnabled': 'false'
    })
  };

  constructor(
    protected http: HttpClient
  ) {
  }

  public getRenderSelect(lookupId, requestTypeId, lookupSql = "0", p1 = "0", p2 = "0", p3 = "0"): Observable<ApiResponse> {
    let route = "RenderSelects";
    let param;
    if (!environment.isRestful) {
      param = {
        LookupID: lookupId,
        RequestTypeID: requestTypeId,
        p1: p1,
        p2: p2,
        p3: p3,
        LookupSQL: lookupSql
      }
      
      return this.getHttpGetApiResponse(route, 'RenderSelects', param, environment.appUrls.formWizard + route);
    } else {
      route = "RenderSelects/" + route;
      param = {
        LookupID: lookupId,
        RequestTypeID: requestTypeId,
        p1: p1,
        p2: p2,
        p3: p3,
        LookupSQL: lookupSql
      }
    }
    return this.getHttpGetApiResponse(route, 'RenderSelects', param, environment.appUrls.formWizard + route);
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

  public getRedirectorLink(OTID: number, OTTID: number): Observable<any> {
    let route = "GetRedirectorLink";
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'GetRedirectorLink', { OTID: OTID, OTTID: OTTID }, environment.appUrls.formWizard + route)
    } else {
      route = "Dashboards/" + route;
    }
    return this.getHttpGetApiResponse(route, 'GetRedirectorLink', { OTID: OTID, OTTID: OTTID}, environment.appUrls.formWizard + route)
  }

  public getBuildingLeaseDefaultInfo(OID: number, OTID: number): Observable<any> {
    let route = "GetBuildingLeaseDefaultInfo";
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'GetBuildingLeaseDefaultInfo', { ObjectID: OID, ObjectTypeID: OTID }, environment.appUrls.formWizard + route)
    } else {
      route = "FormWizards/" + route;
    }
    return this.getHttpGetApiResponse(route, 'GetBuildingLeaseDefaultInfo', { ObjectID: OID, ObjectTypeID: OTID }, environment.appUrls.formWizard + route)
  }

  public addTransaction(transaction: any): Observable<any> {
    let route = "AddTransaction";
    let param;
    if (!environment.isRestful) {
      param = {
        request: transaction
      }
      return this.getHttpPostApiResponse(route, 'AddTransaction', param, environment.appUrls.formWizard + route)
    } else {
      route = "FormWizards/" + route;
      param = transaction;
    }
    return this.getHttpPostApiResponse(route, 'AddTransaction', param, environment.appUrls.formWizard + route)
  }

  public getManagers(teamId: number): Observable<any> {
    let route = "GetManagers";
    let param = {
      TeamID: teamId
    }
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'GetManagers', param, environment.appUrls.formWizard + route)
    } else {
      route = "FormWizards/managers";
    }
    return this.getHttpGetApiResponse(route, 'GetManagers', param, environment.appUrls.formWizard + route)
  }
  
  public getClientPreferenceByField(Field: string): Observable<any> {
    let route = "GetClientPreferenceByField";
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'GetClientPreferenceByField', {Pref: Field}, environment.appUrls.formWizard + route)
    }
    route = "FormWizards/GetClientPreferenceByField";
    return this.getHttpGetApiResponse(route, 'FormWizards/GetClientPreferenceByField', {Pref: Field}, environment.appUrls.formWizard + route)
  }

  public getProjectWizardClientPreferences(): Observable<any> {
    let route = "GetProjectWizardClientPreferences";
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'GetProjectWizardClientPreferences', {}, environment.appUrls.formWizard + route)
    }
    route = "FormWizards/GetProjectWizardClientPreferences";
    return this.getHttpGetApiResponse(route, 'FormWizards/GetProjectWizardClientPreferences', {}, environment.appUrls.formWizard + route)
  }

  // ApiResponse calls //
  protected getHttpGetApiResponse(url: string, functionName: string, httpOptionsParams?: HttpParams | { [param: string]: any }, overrideLocalUrl = null): Observable<ApiResponse> {
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

  protected getHttpPostApiResponse(url: string, functionName: string, postBody: any, overrideLocalUrl): Observable<ApiResponse> {
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    }

    return this.http.post(url, postBody, this.httpOptions)
      .pipe(
        map(x => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
  }

  protected getHttpPutApiResponse(url: string, functionName: string, putBody: any, overrideBaseUrl: boolean = false, overrideLocalUrl): Observable<ApiResponse> {
    if (overrideBaseUrl) {
      url = environment.appUrls.formWizard + url
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

  protected getHttpDeleteApiResponse(url: string, functionName: string, overrideBaseUrl: boolean = false, overrideLocalUrl): Observable<ApiResponse> {
    if (overrideBaseUrl) {
      url = environment.appUrls.formWizard + url
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
    let result: ApiResponse =
    {
      success: false,
      data: "{}",
      clientErrorMessage: ""
    };

    if (environment.isRestful) {
      result.success = value.success ? value.success : false;
      result.data = (value.data || (!value.data && value.data === 0)) ? value.data : "{}";
      result.clientErrorMessage = result.success ? "" : result.data;
      return result;
    }

    let res = value?.d?.Result ? value.d.Result : value.d;
    let data;
    
    try {
      data = JSON.parse(res);
    } catch (e) {
      data = res;
    }
    result.success = data.success;
    result.data = (data.data || (!data.data && data.data === 0)) ? data.data : ((data || data === 0) ? data : "{}");
    result.clientErrorMessage = result.success ? "" : result.data;
    return result;
  }
}