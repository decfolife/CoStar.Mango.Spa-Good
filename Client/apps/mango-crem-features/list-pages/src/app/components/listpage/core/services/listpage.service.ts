import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EndpointService } from '@mango/core-shared';
import { environment } from 'apps/mango/src/environments/environment.local';
import { MapDataRequest } from '../../shared/models/map-data-request';
import {
  ApiResponse,
  GetGridDataRequest,
  GetViewDropdownDataRequest,
  HideListViewRequest,
  LeaseInfo,
  ListView,
  ObjectSecurityRequest,
  SetDefaultListViewRequest,
} from '../../shared/models';

@Injectable()
export class ListPageService extends EndpointService {

  // this function's endpoint will always go to the ListPage.aspx. This is used to get
  // properties that was passed in as input variables into the old version of the list
  // pages custom element
  getListPageProperties(): Observable<ApiResponse> {
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

  getGridData(request: GetGridDataRequest): Observable<ApiResponse> {
    return this.callHttpPost(`${environment.appUrls.listpages}gridData`, 'getGridData', request)
  }

  getListPageColumns(listPageId: number): Observable<ApiResponse> {
    return this.callHttpGet(`${environment.appUrls.listpages + listPageId}/columnDefinitionList`, 'getListPageColumns')
  }

  updateListView(listView): Observable<ApiResponse> {
    return this.callHttpPut(`${environment.appUrls.listpages}ListViewUpdate`, 'updateListView', listView)
  }

  setDefaultListView(request: SetDefaultListViewRequest): Observable<ApiResponse> {
    return this.callHttpPut(`${environment.appUrls.listpages}SetDefaultListView`, 'setDefaultListView', request)
  }

  getClientPreferenceByField(Field: string): Observable<any> {
    return this.callHttpGet(`${environment.appUrls.formWizard}FormWizards/GetClientPreferenceByField?Pref=${Field}`, 'getClientPreferenceByField')
  }

  getListView(listView: ListView): Observable<ApiResponse> {
    return this.callHttpGet(`${environment.appUrls.listpages}views/${listView.id}/${listView.listViewType}`, 'getListView')
  }

  getListViewSelectorItems(request: GetViewDropdownDataRequest): Observable<ApiResponse> {
    return this.callHttpGet(`${environment.appUrls.listpages}ListViewSelectorItems/${request.objectTypeId}`, 'getListViewSelectorItems')
  }

  getAddWizards(objectTypeId: number, objectTypeTypeId: number): Observable<ApiResponse> {
    return this.callHttpGet(`${environment.appUrls.listpages}addWizards/${objectTypeId}/${objectTypeTypeId}`, 'getAddWizards')
  }

  getUserModuleRights(objectTypeIds: string): Observable<ApiResponse> {
    return this.callHttpPost(`${environment.appUrls.listpages}GetUserModuleRights`, 'getUserModuleRights', { objectTypeIds })
  }

  getRedirectorLinkList(): Observable<ApiResponse> {
    return this.callHttpGet(`${environment.appUrls.listpages}RedirectorLinkList`, 'getRedirectorLinkList')
  }

  getObjectSecurity(request: ObjectSecurityRequest): Observable<ApiResponse> {
    return this.callHttpPost(`${environment.appUrls.listpages}objectSecurity`, 'getObjectSecurity', request)
  }

  getDynamicSQL(request: GetGridDataRequest): Observable<ApiResponse> {
    return this.callHttpPost(`${environment.appUrls.listpages}dynamicSQL`, 'getDynamicSQL', request)
  }

  createUserListView(userView: ListView): Observable<number> {
    return this.callHttpPost(`${environment.appUrls.listpages}views`, 'createUserListView', userView)
  }

  deleteUserView(userViewId: number): Observable<ApiResponse> {
    return this.callHttpDelete(`${environment.appUrls.listpages}views/${userViewId}`, 'deleteUserView')
  }

  getMarkerList(request: MapDataRequest): Observable<ApiResponse> {
    return this.callHttpPost(`${environment.appUrls.listpages}MarkerList`, 'getMarkerList', request)
  }

  hideListView(request: HideListViewRequest): Observable<ApiResponse> {
    return this.callHttpPost(`${environment.appUrls.listpages}HideListView`, 'hideListView', request)
  }

  getPortfolios() {
    return this.callHttpGet(`${environment.appUrls.listpages}Portfolios`, 'getPortfolios')
  }

  getGoogleMapAPIKey() {
    const url = `${environment.appUrls.listpages}GoogleMapAPIKey`;
    return this.callHttpGet(`${environment.appUrls.listpages}GoogleMapAPIKey`, 'getGoogleMapAPIKey')
  }

  getGoogleMappingChannel() {
    return this.callHttpGet(`${environment.appUrls.listpages}GoogleMappingChannel`, 'getGoogleMappingChannel')
  }

  getLeaseInfo(leaseAbstractID: number) {
    return this.callHttpGet(`${environment.appUrls.financials}Lease/LeaseInfo/${leaseAbstractID}`, 'getLeaseInfo')
  }

  postLeaseInfo(request: LeaseInfo) {
    return this.callHttpPost(`${environment.appUrls.listpages}Lease/LeaseInfo`, 'postLeaseInfo', request)
  }

  copyCharge(glEventID: number) {
    const url = `${environment.appUrls.financials}Lease/CopyCharge`;
    return this.callHttpPost(`${environment.appUrls.listpages}Lease/CopyCharge`, 'copyCharge', { glEventID })
  }

  deleteCharge(objectTypeTypeId, gLEventIdList: number[]) {
    return this.callHttpPost(`${environment.appUrls.listpages}Lease/DeleteGLEvents`, 'deleteCharge', { objectTypeTypeId, gLEventIdList })
  }

  getGLEventInfo(leaseAbstractID: number, glEventID: number) {
    return this.callHttpGet(`${environment.appUrls.financials}Lease/GLEventInfo/${leaseAbstractID}/${glEventID}`, 'getGLEventInfo')
  }

  protected handleError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      console.error(operation, error);
      // This code will fire when running locally. If hosted in aspx, the aspx page will
      // likely catch 500 or other status codes and return a ListPageResponse with success=false, which is a 200
      // in the sense of this error handling, therefore, these codes would be bypassed when hosted in aspx. 
      if (operation === 'getGridData') {
        if (error.status === 404) {
          return of({
            success: false,
            clientErrorMessage:'You do not have permission to access this list view.'
          });
        } else if (error.status === 408) {
          return of({
            success: false,
            clientErrorMessage:'The query for this view did not return within ' +
            'the timeout limit. The recommendation is to reduce the number of columns and try ' +
            'again. If this problem persists then the ad-hoc reporting features may yield better results.',
            status: 408
          });
        }
        return of({
          success: false,
          clientErrorMessage:'There was an error retrieving the data for this list view.'
        });
     }
     if (operation === 'getListPageColumns'){
      return of({
        success: false,
        clientErrorMessage:'There was an error retrieving the columns for this list view.'
      });
     }
     if (operation == 'getDynamicSQL') {
      return of({
        success: false,
        clientErrorMessage:'There was an error retrieving the data.'
      });
     }    
     return of(null);
    };
  }
}
