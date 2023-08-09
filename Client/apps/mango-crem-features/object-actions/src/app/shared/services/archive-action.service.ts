/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ArchiveActionService {

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

  public checkSystemUser(contactID: number): Observable<ApiResponse> {
    let route = 'CheckSystemUser';
    const param = {
      ContactId: contactID
    };
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'CheckSystemUser', param, environment.appUrls.objectActions + route);
    } else {
      route = 'objectActions/' + route;
    }
    return this.getHttpGetApiResponse(route, 'CheckSystemUser', param, environment.appUrls.objectActions + route);
  }

  public GetCompanyVendorsCustomers(companyID: number): Observable<ApiResponse> {
    let route = 'GetCompanyVendorsCustomers';
    const param = {
      CompanyID: companyID
    };
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'CompanyVendorsCustomers', param, environment.appUrls.objectActions + route);
    } else {
      route = 'objectActions/CompanyVendorsCustomers';
    }
    return this.getHttpGetApiResponse(route, 'CompanyVendorsCustomers', param, environment.appUrls.objectActions + route);
  }

  public archiveContact(contactID: number): Observable<ApiResponse> {
    let route = 'ArchiveContact';
    if (!environment.isRestful) {
      return this.getHttpPostApiResponse(route + '?contactID=' + contactID, 'ArchiveContact' + contactID, { ContactID: contactID });
    } else {
      route = 'objectActions/' + route;
    }
    return this.getHttpPostApiResponse(route + '?contactID=' + contactID, 'ArchiveContact' + contactID, {});
  }

  public archiveCompany(companyID: number): Observable<ApiResponse> {
    let route = 'ArchiveCompany';
    if (!environment.isRestful) {
      return this.getHttpPostApiResponse(route + '?companyID=' + companyID, 'ArchiveCopmany' + companyID, { CompanyID: companyID });
    } else {
      route = 'objectActions/' + route;
    }
    return this.getHttpPostApiResponse(route + '?companyID=' + companyID, 'ArchiveCopmany' + companyID, {});
  }

  public getContactName(contactID: number): Observable<ApiResponse> {
    let route = 'GetContactName';
    const param = {
      ContactId: contactID
    };
    if (!environment.isRestful) {
      return this.getHttpGetApiResponse(route, 'GetContactName', param, environment.appUrls.objectActions + route);
    } else {
      route = 'objectActions/ContactName';
    }
    return this.getHttpGetApiResponse(route, 'GetContactName', param, environment.appUrls.objectActions + route);
  }

  public getBuildingsPremiseLeaseAssociations(leaseAbstractId, listType, isPremiseHidden = 0): Observable<ApiResponse> {
    let route = 'GetBuildingsPremiseLeaseAssociations';
    let param;
    if (!environment.isRestful) {
      param = {
        ListType: listType,
        IsPremiseHidden: isPremiseHidden,
        LeaseAbstractId: leaseAbstractId
      }
      return this.getHttpGetApiResponse(route, 'GetBuildingsPremiseLeaseAssociations', param, environment.appUrls.objectActions + route);
    } else {
      route = 'objectActions/' + route;
      param = {
        LeaseAbstractId: leaseAbstractId,
        ListType: listType,
        IsPremiseHidden: isPremiseHidden
      }
    }
    return this.getHttpGetApiResponse(route, 'GetBuildingsPremiseLeaseAssociations', param, environment.appUrls.objectActions + route);
  }

  public getBuildingPremiseArchiveData(buildingId, premiseId, listType, isPremiseHidden = 0): Observable<ApiResponse> {
    let route = 'GetBuildingPremiseArchiveData';
    let param;
    if (!environment.isRestful) {
      param = {
        ListType: listType,
        PremiseId: premiseId,
        IsPremiseHidden: isPremiseHidden,
        BuildingId: buildingId
      }
      
      return this.getHttpGetApiResponse(route, 'GetBuildingPremiseArchiveData', param, environment.appUrls.objectActions + route);
    } else {
      route = 'objectActions/' + route;
      param = {
        BuildingId: buildingId,
        PremiseId: premiseId,
        ListType: listType,
        IsPremiseHidden: isPremiseHidden
      }
    }
    return this.getHttpGetApiResponse(route, 'GetBuildingPremiseArchiveData', param, environment.appUrls.objectActions + route);
  }

  public archiveBuildingPremiseLease(buildingId, premiseId, leaseId, isPremiseHidden): Observable<ApiResponse> {
    let route = 'ArchiveBuildingPremiseLease';
    let param;
    if (!environment.isRestful) {
      param = {
        request: {
          BuildingId: buildingId,
          PremiseId: premiseId,
          LeaseId: leaseId,
          isPremiseHidden: isPremiseHidden
        }
      }
      return this.getHttpPostApiResponse(route, 'ArchiveBuildingPremiseLease', param);
    } else {
      route = 'objectActions/' + route;
      param = {
        BuildingId: buildingId,
        PremiseId: premiseId,
        LeaseId: leaseId,
        isPremiseHidden: isPremiseHidden,
      }
    }
    return this.getHttpPostApiResponse(route, 'GetBuildingsPremiseLeaseAssociations', param);
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
    postBody: any): Observable<ApiResponse> {
    url = environment.appUrls.objectActions + url

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