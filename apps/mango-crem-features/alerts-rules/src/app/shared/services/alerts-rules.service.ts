/* eslint-disable no-prototype-builtins */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { AlertRuleUpdate, ApiResponse } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HttpParamsObj = HttpParams | { [param: string]: any };
type HeadersObj = {
  headers: HttpHeaders,
  params?: HttpParamsObj
};

@Injectable({ providedIn: 'root' })
export class AlertsRulesService {
  private apiUrl: string;

  private httpOptions: HeadersObj = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO',
      CAEnabled: 'false'
    })
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.appUrls.alertsRules;
  }

  getUserModuleRights() {
    return this.callHttpGet(`${this.apiUrl}/GetUserModuleRights`, 'getUserModuleRights');
  }

  getAlertTypes() {
    return this.callHttpGet(`${this.apiUrl}/GetAlertTypes`, 'getAlertTypes');
  }

  getAlertRuleSeverities() {
    return this.callHttpGet(
      `${this.apiUrl}/GetAlertRuleSeverities`, 'getAlertRuleSeverities'
    );
  }

  getAlertRules(OTID: number) {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}/GetAlertRules/${OTID}`, 'getAlertRules');
    }

    return this.callHttpGet(
      `${this.apiUrl}/GetAlertRules`, 'getAlertRules', { objectTypeId: OTID }
    );
  }

  updateAlertRules(rules: AlertRuleUpdate[]) {
    if (environment.isRestful) {
      return this.callHttpPost(
        `${this.apiUrl}/UpdateAlertRules`, 'updateAlertRules', JSON.stringify(rules)
      );
    }

    return this.callHttpPost(
      `${this.apiUrl}/UpdateAlertRules`, 'updateAlertRules',
      JSON.stringify({ ruleUpdates: rules })
    );
  }

  getIsAlertDismissedReasonRequired(objectTypeId: number) {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/IsAlertDismissedReasonRequired/ObjectType/${objectTypeId}`,
        'isDismissReasonRequired'
      );
    }

    return this.callHttpGet(
      `${this.apiUrl}/IsAlertDismissedReasonRequired`, 'isDismissReasonRequired', { objectTypeId }
    );
  }

  toggleAlertDismissedReasonIsRequired(objectTypeId: number) {
    if(environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/ToggleAlertDismissedReasonIsRequired/ObjectType/${objectTypeId}`,
        'toggleReasonRequired'
      );
    }

    return this.callHttpGet(
        `${this.apiUrl}/ToggleAlertDismissedReasonIsRequired`, 'toggleReasonRequired', { objectTypeId }
    );
  }

  protected callHttpGet(url: string, logName: string, httpOptionsParams?: HttpParamsObj) {
    if (httpOptionsParams) {
      this.httpOptions.params = httpOptionsParams;
    }

    return this.http.get(url, this.httpOptions).pipe(
      map(x => this.toApiResponse(x)),
      catchError(this.handleError(logName))
    );
  }

  protected callHttpPost(url: string, logName: string, postBody: string) {
    return this.http.post(url, postBody, this.httpOptions).pipe(
      map(x => this.toApiResponse(x)),
      catchError(this.handleError(logName))
    );
  }

  private handleError(logName: string = 'Operation not provided') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<ApiResponse> => {
      console.error(logName, error);

      return of({
        succeeded: false,
        message: error.statusText,
        data: []
      });
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toApiResponse(value: any): ApiResponse {
    const val = value.hasOwnProperty('d')
      ? value.d
      : value;

    const res = val.hasOwnProperty('Result')
      ? JSON.parse(val.Result)
      : val;

    const data = res.hasOwnProperty('data')
      ? (res.data instanceof String)
        ? JSON.parse(res.data)
        : res.data
      : res;

    return {
      succeeded: res.succeeded,
      message: res.message,
      data: data.hasOwnProperty('data') ? data.data : data
    }
  }
}
