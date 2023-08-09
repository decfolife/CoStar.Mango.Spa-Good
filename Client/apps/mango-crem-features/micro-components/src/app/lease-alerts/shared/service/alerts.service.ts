/* eslint-disable no-prototype-builtins */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from '../../../../../../../mango/src/environments/environment.local';
import { ApiResponse, LeaseAlertFilter, LeaseAlertToggleDTO } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HttpParamsObj = HttpParams | { [param: string]: any };
type HeadersObj = {
  headers: HttpHeaders,
  params?: HttpParamsObj
};

const LEASE_OTID = 4;

@Injectable({ providedIn: 'root' })
export class AlertsService {
  isEuroDateFormat = false;

  private apiUrl: string;

  private readonly OBJECT_TYPE_ID = 4;

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
    this.apiUrl = environment.appUrls.alerts;
  }

  getUserModuleRights() {
    return this.callHttpGet(`${this.apiUrl}/GetUserModuleRights`, 'getUserModuleRights');
  }

  getPortfolios() {
    if (environment.isRestful) {
      return this.callHttpGet(`${environment.appUrls.listpages}Portfolios`, 'getPortfolios');
    }

    return this.callHttpPost(`${environment.appUrls.listpages}GetPortfolios`, 'getPortfolios', '');
  }

  getRedirectorLinkList() {
    if (environment.isRestful) {
      return this.callHttpGet(`${environment.appUrls.listpages}RedirectorLinkList`, 'redirectorLinkList');
    }

    return this.callHttpPost(`${environment.appUrls.listpages}GetRedirectorLinkList`, 'redirectorLinkList', '');
  }

  getAlertTypes() {
    return this.callHttpGet(`${this.apiUrl}/GetAlertTypes`, 'getAlertTypes');
  }

  getAlertRuleSeverities() {
    return this.callHttpGet(
      `${this.apiUrl}/GetAlertRuleSeverities`, 'getAlertRuleSeverities'
    );
  }

  getAlertRules() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}/GetAlertRules/${this.OBJECT_TYPE_ID}`, 'getAlertRules');
    }

    return this.callHttpGet(
      `${this.apiUrl}/GetAlertRules`, 'getAlertRules', { objectTypeId: this.OBJECT_TYPE_ID }
    );
  }

  getUndismissedLeaseAlertsStats(leaseAbstractID: number) {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}/GetUndismissedLeaseAlertsStats/LeaseAbstractID/${leaseAbstractID}`,
        'getUndismissedLeaseAlertsStatsByLeaseAbstractID');
    }

    return this.callHttpGet(
      `${this.apiUrl}/GetUndismissedLeaseAlertsStatsByLeaseAbstractID`,
      'getUndismissedLeaseAlertsStatsByLeaseAbstractID',
      { leaseAbstractID: leaseAbstractID }
    );
  }

  filterLeaseAlerts(leaseAlertFilter: LeaseAlertFilter, pageNumber: number = 1) {
    leaseAlertFilter.pageNumber = pageNumber;

    if (environment.isRestful) {
      return this.callHttpPost(
        `${this.apiUrl}/SearchLeaseAlerts`, 'searchLeaseAlerts', JSON.stringify(leaseAlertFilter)
      );
    }

    return this.callHttpPost(
      `${this.apiUrl}/SearchLeaseAlerts`, 'searchLeaseAlerts',
      JSON.stringify({ leaseAlertFilters: leaseAlertFilter })
    );
  }

  runLeaseAlertRulesByLeaseAbstractID(leaseAbstractID: number) {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}/RunLeaseAlertRules/LeaseAbstractID/${leaseAbstractID}`,
        'runLeaseAlertRulesByLeaseAbstractID');
    }

    return this.callHttpGet(
      `${this.apiUrl}/RunLeaseAlertRulesByLeaseAbstractID`,
      'runLeaseAlertRulesByLeaseAbstractID',
      { leaseAbstractID: leaseAbstractID }
    );
  }

  toggleLeaseAlertsIsDismissed(leaseAlerts: LeaseAlertToggleDTO) {
    if (environment.isRestful) {
      return this.callHttpPost(
        `${this.apiUrl}/ToggleLeaseAlertsIsDismissed`, 'toggleLeaseAlertsIsDismissed',
        JSON.stringify(leaseAlerts)
      );
    }

    return this.callHttpPost(
      `${this.apiUrl}/ToggleLeaseAlertsIsDismissed`, 'toggleLeaseAlertsIsDismissed',
      JSON.stringify({ leaseAlerts: leaseAlerts })
    );
  }

  getIsAlertDismissedReasonRequired() {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/IsAlertDismissedReasonRequired/ObjectType/${LEASE_OTID}`,
        'isDismissReasonRequired'
      );
    }

    return this.callHttpGet(
      `${this.apiUrl}/IsAlertDismissedReasonRequired`, 'isDismissReasonRequired',
      { objectTypeId: LEASE_OTID }
    );
  }

  getAlertDismissReasons() {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/GetAlertDismissReasons/ObjectTypeID/${LEASE_OTID}`,
        'getAlertDismissReasons'
      );
    }

    return this.callHttpGet(
      `${this.apiUrl}/GetAlertDismissReasons`, 'getAlertDismissReasons',
      { objectTypeId: LEASE_OTID }
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
    // ListPages API returns a different object, so this alters it to match the expected object
    if (value.hasOwnProperty('portfolios')) {
      value = new ApiResponse(true, '', value.portfolios);
    }

    const val = value.hasOwnProperty('d')
      ? value.d
      : value;

    const res = val.hasOwnProperty('Result')
      ? (typeof(val.Result) === 'string')
        ? JSON.parse(val.Result)
        : val.Result
      : val;

    let data = res.hasOwnProperty('data')
      ? (typeof(res.data) === 'string')
        ? JSON.parse(res.data)
        : res.data
      : res;

    // Again with listpages differences
    if (typeof(data) === 'string') {
      data = JSON.parse(data);
    }

    if (data.portfolios) {
      data = data.portfolios;
    }

    return {
      succeeded: res.succeeded,
      message: res.message,
      data: data.hasOwnProperty('data') ? data.data : data
    }
  }
}
