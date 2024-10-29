/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Api, ApiResponse } from '@mango/data-models/lib-data-models';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilitiesService } from '@mango/core-shared';

@Injectable()
export class ArchiveActionService {
  objectActions: string = UtilitiesService.getBaseApiUrl(Api.objectActions);
  baseUrl: string = '';

  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'BLANK',
      CAEnabled: 'false',
    }),
  };

  protected httpOptionsWithParams: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'BLANK',
      CAEnabled: 'false',
    }),
  };

  constructor(protected http: HttpClient) {}

  public checkSystemUser(contactID: number): Observable<ApiResponse> {
    let route = 'CheckSystemUser';
    const param = {
      ContactId: contactID,
    };

    route = 'objectActions/' + route;

    return this.getHttpGetApiResponse(
      route,
      'CheckSystemUser',
      param,
      this.objectActions + route
    );
  }

  public GetCompanyVendorsCustomers(
    companyID: number
  ): Observable<ApiResponse> {
    let route = 'GetCompanyVendorsCustomers';
    const param = {
      CompanyID: companyID,
    };

    route = 'objectActions/CompanyVendorsCustomers';

    return this.getHttpGetApiResponse(
      route,
      'CompanyVendorsCustomers',
      param,
      this.objectActions + route
    );
  }

  public archiveContact(contactID: number): Observable<ApiResponse> {
    let route = 'ArchiveContact';

    route = 'objectActions/' + route;

    return this.getHttpPostApiResponse(
      route + '?contactID=' + contactID,
      'ArchiveContact' + contactID,
      {}
    );
  }

  public archiveCompany(companyID: number): Observable<ApiResponse> {
    let route = 'ArchiveCompany';
    route = 'objectActions/' + route;

    return this.getHttpPostApiResponse(
      route + '?companyID=' + companyID,
      'ArchiveCopmany' + companyID,
      {}
    );
  }

  public getContactName(contactID: number): Observable<ApiResponse> {
    let route = 'GetContactName';
    const param = {
      ContactId: contactID,
    };

    route = 'objectActions/ContactName';

    return this.getHttpGetApiResponse(
      route,
      'GetContactName',
      param,
      this.objectActions + route
    );
  }

  public getBuildingsPremiseLeaseAssociations(
    leaseAbstractId,
    listType,
    isPremiseHidden = 0
  ): Observable<ApiResponse> {
    let route = 'GetBuildingsPremiseLeaseAssociations';

    route = 'objectActions/' + route;
    let param = {
      LeaseAbstractId: leaseAbstractId,
      ListType: listType,
      IsPremiseHidden: isPremiseHidden,
    };

    return this.getHttpGetApiResponse(
      route,
      'GetBuildingsPremiseLeaseAssociations',
      param,
      this.objectActions + route
    );
  }

  public getBuildingPremiseArchiveData(
    buildingId,
    premiseId,
    listType,
    isPremiseHidden = 0
  ): Observable<ApiResponse> {
    let route = 'GetBuildingPremiseArchiveData';

    route = 'objectActions/' + route;
    let param = {
      BuildingId: buildingId,
      PremiseId: premiseId,
      ListType: listType,
      IsPremiseHidden: isPremiseHidden,
    };

    return this.getHttpGetApiResponse(
      route,
      'GetBuildingPremiseArchiveData',
      param,
      this.objectActions + route
    );
  }

  public archiveBuildingPremiseLease(
    buildingId,
    premiseId,
    leaseId,
    isPremiseHidden
  ): Observable<ApiResponse> {
    let route = 'ArchiveBuildingPremiseLease';
    let param;

    route = 'objectActions/' + route;
    param = {
      BuildingId: buildingId,
      PremiseId: premiseId,
      LeaseId: leaseId,
      isPremiseHidden: isPremiseHidden,
    };

    return this.getHttpPostApiResponse(
      route,
      'GetBuildingsPremiseLeaseAssociations',
      param
    );
  }

  // ApiResponse calls //
  protected getHttpGetApiResponse(
    url: string,
    functionName: string,
    httpOptionsParams?: HttpParams | { [param: string]: any },
    overrideLocalUrl = null
  ): Observable<ApiResponse> {
    if (httpOptionsParams) {
      this.httpOptionsWithParams.params = httpOptionsParams;
    }
    url = this.baseUrl + url;
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    }
    if (httpOptionsParams) {
      return this.http.get(url, this.httpOptionsWithParams).pipe(
        map((x) => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
    } else {
      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toApiResponse(x) as any),
        catchError(this.handleApiResponseError(functionName))
      );
    }
  }

  protected getHttpPostApiResponse(
    url: string,
    functionName: string,
    postBody: any
  ): Observable<ApiResponse> {
    url = this.objectActions + url;

    return this.http.post(url, postBody, this.httpOptions).pipe(
      map((x) => this.toApiResponse(x) as any),
      catchError(this.handleApiResponseError(functionName))
    );
  }

  protected getHttpPutApiResponse(
    url: string,
    functionName: string,
    putBody: any,
    overrideBaseUrl: boolean = false,
    overrideLocalUrl
  ): Observable<ApiResponse> {
    if (overrideBaseUrl) {
      url = this.objectActions + url;
    } else {
      url = this.baseUrl + url;
    }
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    }
    // url = 'http://localhost:39187' + url;
    return this.http.put(url, putBody, this.httpOptions).pipe(
      map((x) => this.toApiResponse(x) as any),
      catchError(this.handleApiResponseError(functionName))
    );
  }

  protected getHttpDeleteApiResponse(
    url: string,
    functionName: string,
    overrideBaseUrl: boolean = false,
    overrideLocalUrl
  ): Observable<ApiResponse> {
    if (overrideBaseUrl) {
      url = this.objectActions + url;
    } else {
      url = this.baseUrl + url;
    }
    if (overrideLocalUrl) {
      url = overrideLocalUrl;
    }
    // url = 'http://localhost:39187' + url;
    return this.http.delete(url, this.httpOptions).pipe(
      map((x) => this.toApiResponse(x) as any),
      catchError(this.handleApiResponseError(functionName))
    );
  }

  protected handleApiResponseError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      if (error) {
        return of({
          success: false,
          data: '',
          clientErrorMessage:
            error?.error?.clientErrorMessage || error.statusText,
        });
      }
      return of(null);
    };
  }

  protected toApiResponse(value: any): ApiResponse {
    const result: ApiResponse = {
      success: false,
      data: '{}',
      clientErrorMessage: '',
    };

    result.success = value.success ? value.success : false;
    result.data =
      value.data || (!value.data && value.data === 0) ? value.data : '{}';
    result.clientErrorMessage = result.success ? '' : result.data;
    return result;
  }
}
