import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { FilterDetail, UserSelectedFilters } from '../models';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class PortfolioDashboardService extends EndpointService{
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getPortfolioDashboardByIdWithChildrenQuery(dashboardId: number): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/${dashboardId}`;
    return this.callHttpGet(url, 'getDashboardByIdWithChildrenQuery')
  }

  getUserModuleRights(objectTypeIds: any[]): Observable<any> {
    //["All"] = Return all rights
    //[1,5,14,33] = Return the rights for the ids in the list
    const url = `${environment.appUrls.dashboards}Dashboards/GetUserModuleRights`;
    return this.callHttpPost(url, 'getUserModuleRights',  { objectTypeIds })
  }

  postUserSettings(dashboardUserSettings: any[]): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/SaveUserSettings`;
    return this.callHttpPost(url, 'updateUserSettings',  dashboardUserSettings)
  }
  
  postCacheSettings(dashboardId: number): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/ClearDashboardCache`;
    return this.callHttpPost(url, 'updateCacheSettings', dashboardId)  
  }

  getAllPortfolioFilters(elementTypeNames: any[]): Observable<any> {
    const url = `${environment.appUrls.dashboards}portfoliofilters/GetAllPortfolioFilters`;
    return this.callHttpPost(url, 'GetAllPortfolioFilters',  elementTypeNames )  
  }

  getFilterDataByElementType(elementTypeName: string): Observable<FilterDetail[]> {
    return of<FilterDetail[]>();
    //   const url = `${environment.appUrls.dashboards}portfoliofilters/GetPortfolioFilterDataByElementType/${elementTypeName}`;
    //   return this.callHttpGet(url, 'GetPortfolioFilterDataByElementType')
  }

  getCardDataByElementType(currency: number, unitOfMeasureId: number, elementTypeName: string, keyDate: string, selectedFilters: string): Observable<any> {
    const url = `${environment.appUrls.dashboards}portfolioCards/GetCardDataByElementType`;
    return this.callHttpPost(url, 'getCardDataByElementType', { currency, unitOfMeasureId, elementTypeName, keyDate, selectedFilters })
  }

  getPortfolioCardFilters(): Observable<any> {
    const url = `${environment.appUrls.dashboards}PortfolioFilters/GetPortfolioCardFilters`;
    return this.callHttpGet(url, 'getPortfolioCardFilters')
  }
  
  getRedirectorLinkList(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetRedirectorLinkList`;
    return this.callHttpGet(url, 'getRedirectorLinkList')
  }

  getGetUOMAndCurrency(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Portfolio/GetUOMAndCurrency`;
    return this.callHttpGet(url, 'getGetUOMAndCurrency')
  }
  
  getUserPreferences(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'getGetUserPreferences')
  }

  getLeaseOptionsByLease(leaseAbstractId: number): Observable<any> {
    const url = `${environment.appUrls.dashboards}portfolioCards/GetPortfolioLeaseOption/${leaseAbstractId}`;
    return this.callHttpGet(url, 'getPortfolioLeaseOption')
  }

  getUserFilters(dashboardId): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetUserFilters/${dashboardId}`;
    return this.callHttpGet(url, 'getUserFilters')
  }

  saveUserFilters(userSelectedFilters: UserSelectedFilters): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/SaveUserFilters`;
    return this.callHttpPost(url, 'saveUserFilters',  userSelectedFilters)
  }

  getDefaultStartPagesList(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Portfolio/GetDefaultStartPageLinks`;
    return this.callHttpGet(url, 'GetDefaultStartPageLinks')
  }
  
  getActivityFeedFile(urlPath: string): Observable<any> {
    const url = `${environment.appUrls.dashboards}GetActivityFeedCardFile`;
    return this.callHttpPostByteArray(url, 'getActivityFeedFile', { urlPath });
  }
}
