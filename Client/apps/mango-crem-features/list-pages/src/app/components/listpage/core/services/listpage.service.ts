import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import {
  ApiResponse,
  GetGridDataRequest,
  GetViewDropdownDataRequest,
  HideListViewRequest,
  SetDefaultListViewRequest,
  ListView,
  ObjectSecurityRequest,
  LeaseInfo,
} from '../../shared/models';
import { EndpointService } from './endpoint.service';
import { MapDataRequest } from '../../shared/models/map-data-request';
import { environment } from 'apps/mango/src/environments/environment.local';

@Injectable()
export class ListPageService extends EndpointService {
  getListPageProperties(): Observable<ApiResponse> {
    //this function's endpoint will always go to the ListPage.aspx. This is used to get
    //properties that was passed in as input variables into the old version of the list
    //pages custom element
    if (environment.isRestful) {
      //let result : ApiResponse ;
      const result =
      {
        data: {
            objectTypeId: 4,
            isSuperUser: true,
            canEditNotes: true,
            showPortfolioPicker: true,
            showAddButton: true,
            showListMapToggle: true,
            showDeleteButton: true
        },
        clientErrorMessage: '',
        success: true,
        status: null
      };
      return of(result);
    }

    const url = environment.appUrls.listpages + 'GetListPageProperties';

    return this.http.post(url, `{}`, this.httpOptions).pipe(
      map((x) => this.toObject(x) as any),
      catchError(this.handleError('getListPageProperties'))
    );
  }

  getGridData(request: GetGridDataRequest): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'gridData';

      return this.http.post(url, request, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getGridData'))
      );
    }

    const url = environment.appUrls.listpages + 'GetGridData';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getGridData'))
      );
  }

  getListPageColumns(listPageId: number): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + listPageId + '/columnDefinitionList';

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getListPageColumns'))
      );
    }

    const url = environment.appUrls.listpages + 'GetColumnDefinitionList';

    return this.http
      .post(url, `{ "listPageId": ${listPageId} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getListPageColumns'))
      );
  }

  updateListView(listView): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'ListViewUpdate';

      return this.http
        .put(url, listView, this.httpOptions)
        .pipe(catchError(this.handleError('updateListView')));
    }

    const url = environment.appUrls.listpages + 'UpdateListView';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(listView)} }`, this.httpOptions)
      .pipe(catchError(this.handleError('updateListView')));
  }

  setDefaultListView(
    request: SetDefaultListViewRequest
  ): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'SetDefaultListView';

      return this.http
        .put(url, request, this.httpOptions)
        .pipe(catchError(this.handleError('setDefaultListView')));
    }

    const url = environment.appUrls.listpages + 'SetDefaultListView';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(catchError(this.handleError('setDefaultListView')));
  }

  getClientPreferenceByField(Field: string): Observable<any> {
    if (environment.isRestful) {
      const url = environment.appUrls.formWizard + 'FormWizards/GetClientPreferenceByField?Pref=' + Field;
      return this.http
        .get(
          url,
          this.httpOptions
        )
        .pipe(
          map((x) => this.toObject(x) as any),
          catchError(this.handleError('GetClientPreferenceByField'))
        );
    }
    const url = environment.appUrls.formWizard + 'GetClientPreferenceByField?Pref=' + Field;
    return this.http
        .get(
          url,
          this.httpOptions
        )
        .pipe(
          map((x) => this.toObject(x) as any),
          catchError(this.handleError('GetClientPreferenceByField'))
        );
  }

  getListView(listView: ListView): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url =
        environment.appUrls.listpages +
        'views/' +
        listView.id +
        '/' +
        listView.listViewType;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getListView'))
      );
    }

    const url = environment.appUrls.listpages + 'GetListView';

    return this.http
      .post(
        url,
        `{ "request": { "ListViewId":${listView.id}, "ListViewType":${listView.listViewType} } }`,
        this.httpOptions
      )
      .pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getListView'))
      );
  }

  getListViewSelectorItems(
    request: GetViewDropdownDataRequest
  ): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url =
        environment.appUrls.listpages + 'ListViewSelectorItems/' + request.objectTypeId;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getListViewSelectorItems'))
      );
    }

    const url = environment.appUrls.listpages + 'GetListViewSelectorItems';

    return this.http
      .post(
        url,
        `{ "objectTypeId": ${request.objectTypeId} }`,
        this.httpOptions
      )
      .pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getListViewSelectorItems'))
      );
  }

  getAddWizards(objectTypeId: number, objectTypeTypeId: number): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'addWizards/' + objectTypeId +'/' + objectTypeTypeId;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getAddWizards'))
      );
    }

    const url = environment.appUrls.listpages + 'GetAddWizards';

    return this.http
      .post(url, `{ "objectTypeId": ${objectTypeId}, "objectTypeTypeId": ${objectTypeTypeId} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getAddWizards'))
      );
  }
  getUserModuleRights(objectTypeIds: string): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'GetUserModuleRights';

      return this.http.post(url,{objectTypeIds}, this.httpOptions).pipe(
        map((x) => this.toObject(x)),
        catchError(this.handleError('getUserModuleRights'))
      );
    }

    const url = environment.appUrls.listpages +'GetUserModuleRights';

    return this.http
      .post<any>(url, `{ "objectTypeIds": ${JSON.stringify( objectTypeIds)} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObject(x)),
        catchError(this.handleError('getUserModuleRights'))
      );
  }

  getRedirectorLinkList(): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'RedirectorLinkList';

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getRedirectorLinkList'))
      );
    }

    const url = environment.appUrls.listpages + 'GetRedirectorLinkList';

    return this.http.post(url, '{}', this.httpOptions).pipe(
      map((x) => this.toObject(x) as any),
      catchError(this.handleError('getRedirectorLinkList'))
    );
  }

  getObjectSecurity(request: ObjectSecurityRequest): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'objectSecurity';

      return this.http.post(url, request, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getObjectSecurity'))
      );
    }

    const url = environment.appUrls.listpages + 'GetObjectSecurity';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getObjectSecurity'))
      );
  }

  getDynamicSQL(request: GetGridDataRequest): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'dynamicSQL';

      return this.http.post(url, request, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getDynamicSQL'))
      );
    }

    const url = environment.appUrls.listpages + 'GetDynamicSQL';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(
        map((x) => (x as any).d.Result as any),
        catchError(this.handleError('getDynamicSQL'))
      );
  }

  createUserListView(userView: ListView): Observable<number> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'views';

      return this.http.post(url, userView, this.httpOptions).pipe(
        map((x) => (x as any) as number),
        catchError(this.handleError('createUserView'))
      );
    }

    const url = environment.appUrls.listpages + 'CreateUserView';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(userView)} }`, this.httpOptions)
      .pipe(
        map((x) => (x as any).d.Result.data as number),
        catchError(this.handleError('createUserView'))
      );
  }

  deleteUserView(userViewId: number): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'views/' + userViewId;

      return this.http
        .delete(url, this.httpOptions)
        .pipe(catchError(this.handleError('deleteUserView')));
    }

    const url = environment.appUrls.listpages + 'DeleteUserView';

    return this.http
      .post(url, `{ "userViewId": ${userViewId} }`, this.httpOptions)
      .pipe(catchError(this.handleError('deleteUserView')));
  }

  getMarkerList(request: MapDataRequest): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'MarkerList';

      return this.http.post(url, request, this.httpOptions).pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getMarkerList'))
      );
    }

    const url = environment.appUrls.listpages + 'GetMarkerList';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObject(x) as any),
        catchError(this.handleError('getMarkerList'))
      );
  }

  hideListView(request: HideListViewRequest): Observable<ApiResponse> {
    if (environment.isRestful) {
      const url = environment.appUrls.listpages + 'HideListView';

      return this.http
        .post(url, request, this.httpOptions)
        .pipe(catchError(this.handleError('hideListView')));
    }

    const url = environment.appUrls.listpages + 'HideListView';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(catchError(this.handleError('hideListView')));
  }

  getPortfolios() {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}Portfolios`;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x)),
        catchError(this.handleError('getPortfolios'))
      );
    }

    const url = `${environment.appUrls.listpages}GetPortfolios`;

    return this.http.post(url, '{}', this.httpOptions).pipe(
      map((x) => this.toObject(x)),
      catchError(this.handleError('getPortfolios'))
    );
  }

  getGoogleMapAPIKey() {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}GoogleMapAPIKey`;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x)),
      catchError(this.handleError("googleMapAPIKey"))
      );
    }

    const url = `${environment.appUrls.listpages}GetGoogleMapAPIKey`;

    return this.http.post(url, this.httpOptions).pipe(
      map((x) => this.toObject(x)),
      catchError(this.handleError("googleMapAPIKey"))
    );
  }

  getGoogleMappingChannel() {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}GoogleMappingChannel`;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x)),
      catchError(this.handleError("googleMappingChannel"))
      );
    }

    const url = `${environment.appUrls.listpages}GetGoogleMappingChannel`;

    return this.http.post(url, this.httpOptions).pipe(
      map((x) => this.toObject(x)),
      catchError(this.handleError("googleMappingChannel"))
    );
  }

  getLeaseInfo(leaseAbstractID: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.financials}Lease/LeaseInfo/${leaseAbstractID}`;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObjectFinancialsApi(x)),
      catchError(this.handleError("GetLeaseInfo"))
      );
    }

    const url = `${environment.appUrls.financials}GetLeaseInfo`;

    return this.http.post(url,`{ "leaseAbstractID": ${leaseAbstractID} }`,this.httpOptions).pipe(
      map((x) => this.toObjectFinancialsApi(x)),
      catchError(this.handleError("GetLeaseInfo"))
    );
  }

  postLeaseInfo(request: LeaseInfo) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.financials}Lease/LeaseInfo`;

      return this.http.post(url, request, this.httpOptions).pipe(
        map((x) => this.toObjectFinancialsApi(x) as any),
        catchError(this.handleError('SetLeaseInfo'))
      );
    }

    const url = environment.appUrls.financials + 'SetLeaseInfo';

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObjectFinancialsApi(x) as any),
        catchError(this.handleError('SetLeaseInfo'))
      );
  }

  copyCharge(glEventID: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.financials}Lease/CopyCharge`;

      return this.http.post(url, {glEventID}, this.httpOptions).pipe(
        map((x) => this.toObjectFinancialsApi(x) as any),
        catchError(this.handleError('copyCharge'))
      );
    }

    const url = environment.appUrls.financials + 'CopyCharge';

    return this.http
      .post(url, `{ "glEventID": ${JSON.stringify(glEventID)} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObjectFinancialsApi(x) as any),
        catchError(this.handleError('copyCharge'))
      );
  }

  deleteCharge(objectTypeTypeId, gLEventIdList: number[]) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.financials}Lease/DeleteGLEvents`;

      return this.http.post(url, {objectTypeTypeId, gLEventIdList}, this.httpOptions).pipe(
        map((x) => this.toObjectFinancialsApi(x) as any),
        catchError(this.handleError('deleteCharge'))
      );
    }

    const url = environment.appUrls.financials + 'DeleteGLEvents';
    let request = { objectTypeTypeId,  gLEventIdList}

    return this.http
      .post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions)
      .pipe(
        map((x) => this.toObjectFinancialsApi(x) as any),
        catchError(this.handleError('deleteCharge'))
      );
  }

  getGLEventInfo(leaseAbstractID: number, glEventID: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.financials}Lease/GLEventInfo/${leaseAbstractID}/${glEventID}`;

      return this.http.get(url, this.httpOptions).pipe(
        map((x) => this.toObject(x)),
      catchError(this.handleError("GetGLEventInfo"))
      );
    }

    const url = `${environment.appUrls.financials}GetGLEventInfo`;

    return this.http.post(url,`{ "leaseAbstractID": ${leaseAbstractID}, "glEventID": ${glEventID} }`,this.httpOptions).pipe(
      map((x) => this.toObjectFinancialsApi(x)),
      catchError(this.handleError("GetGLEventInfo"))
    );
  }
}
