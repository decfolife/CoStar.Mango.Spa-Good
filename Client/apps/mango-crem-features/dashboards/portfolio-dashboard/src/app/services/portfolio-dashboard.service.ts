import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { FilterDetail, UserSelectedFilters } from '../models';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class PortfolioDashboardService extends EndpointService {
  dashboards: string = UtilitiesService.getBaseApiUrl(Api.dashboards)

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getPortfolioDashboardByIdWithChildrenQuery(dashboardId: number): Observable<any> {
    const url = `${this.dashboards}Dashboards/${dashboardId}`;
    return this.callHttpGet(url, 'getDashboardByIdWithChildrenQuery')
  }

  getUserModuleRights(objectTypeIds: any[]): Observable<any> {
    //["All"] = Return all rights
    //[1,5,14,33] = Return the rights for the ids in the list
    const url = `${this.dashboards}Dashboards/GetUserModuleRights`;
    return this.callHttpPost(url, 'getUserModuleRights',  { objectTypeIds })
  }

  postUserSettings(dashboardUserSettings: any[]): Observable<any> {
    const url = `${this.dashboards}Dashboards/SaveUserSettings`;
    return this.callHttpPost(url, 'updateUserSettings',  dashboardUserSettings)
  }
  
  postCacheSettings(dashboardId: number): Observable<any> {
    const url = `${this.dashboards}Dashboards/ClearDashboardCache`;
    return this.callHttpPost(url, 'updateCacheSettings', dashboardId)  
  }

  getAllPortfolioFilters(elementTypeNames: any[]): Observable<any> {
    const url = `${this.dashboards}portfoliofilters/GetAllPortfolioFilters`;
    return this.callHttpPost(url, 'GetAllPortfolioFilters',  elementTypeNames )  
  }

  getFilterDataByElementType(elementTypeName: string): Observable<FilterDetail[]> {
    return of<FilterDetail[]>();
    //   const url = `${this.dashboards}portfoliofilters/GetPortfolioFilterDataByElementType/${elementTypeName}`;
    //   return this.callHttpGet(url, 'GetPortfolioFilterDataByElementType')
  }

  getCardDataByElementType(currency: number, unitOfMeasureId: number, elementTypeName: string, keyDate: string, selectedFilters: string): Observable<any> {
    const url = `${this.dashboards}portfolioCards/GetCardDataByElementType`;
    return this.callHttpPost(url, 'getCardDataByElementType', { currency, unitOfMeasureId, elementTypeName, keyDate, selectedFilters })
  }

  getPortfolioCardFilters(): Observable<any> {
    const url = `${this.dashboards}PortfolioFilters/GetPortfolioCardFilters`;
    return this.callHttpGet(url, 'getPortfolioCardFilters')
  }
  
  getRedirectorLinkList(): Observable<any> {
    const url = `${this.dashboards}Dashboards/GetRedirectorLinkList`;
    return this.callHttpGet(url, 'getRedirectorLinkList')
  }

  getGetUOMAndCurrency(): Observable<any> {
    const url = `${this.dashboards}Portfolio/GetUOMAndCurrency`;
    return this.callHttpGet(url, 'getGetUOMAndCurrency')
  }
  
  getUserPreferences(): Observable<any> {
    const url = `${this.dashboards}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'getGetUserPreferences')
  }

  getLeaseOptionsByLease(leaseAbstractId: number): Observable<any> {
    const url = `${this.dashboards}portfolioCards/GetPortfolioLeaseOption/${leaseAbstractId}`;
    return this.callHttpGet(url, 'getPortfolioLeaseOption')
  }

  getUserFilters(dashboardId): Observable<any> {
    const url = `${this.dashboards}Dashboards/GetUserFilters/${dashboardId}`;
    return this.callHttpGet(url, 'getUserFilters')
  }

  saveUserFilters(userSelectedFilters: UserSelectedFilters): Observable<any> {
    const url = `${this.dashboards}Dashboards/SaveUserFilters`;
    return this.callHttpPost(url, 'saveUserFilters',  userSelectedFilters)
  }

  getDefaultStartPagesList(): Observable<any> {
    const url = `${this.dashboards}Portfolio/GetDefaultStartPageLinks`;
    return this.callHttpGet(url, 'GetDefaultStartPageLinks')
  }
  
  getActivityFeedFile(urlPath: string): Observable<any> {
    const url = `${this.dashboards}GetActivityFeedCardFile`;
    return this.callHttpPostByteArray(url, 'getActivityFeedFile', { urlPath });
  }
}
