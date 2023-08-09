import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { FilterDetail, UserSelectedFilters } from '../models';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class PortfolioDashboardService extends EndpointService{
  constructor(protected http: HttpClient, @Optional()  facade: MangoAppFacade  ) {
    super(http, facade);
  }

    getPortfolioDashboardByIdWithChildrenQuery(dashboardId: number): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.dashboards}Dashboards/${dashboardId}`;
            return this.callHttpGet(url, 'getDashboardByIdWithChildrenQuery')
        }

        const url = `${environment.appUrls.dashboards}GetDashboardByIdWithChildrenQuery`;
        return this.callHttpPost(url, 'getDashboardByIdWithChildrenQuery', { dashboardId })
    }

  getUserModuleRights(objectTypeIds: any[]): Observable<any> {
    //["All"] = Return all rights
    //[1,5,14,33] = Return the rights for the ids in the list
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetUserModuleRights`;
      return this.callHttpPost(url, 'getUserModuleRights',  { objectTypeIds })
    }

    const url = environment.appUrls.dashboards + 'GetUserModuleRights';
    return this.callHttpPost(url, 'getUserModuleRights', { objectTypeIds })
  }

  postUserSettings(dashboardUserSettings: any[]): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/SaveUserSettings`;
      return this.callHttpPost(url, 'updateUserSettings',  dashboardUserSettings)
    }

    const url = environment.appUrls.dashboards + 'SaveUserSettings';
    return this.callHttpPost(url, 'updateUserSettings', { dashboardUserSettings })
  }
  
  postCacheSettings(dashboardId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/ClearDashboardCache`;
      return this.callHttpPost(url, 'updateCacheSettings', dashboardId)
    }

    const url = environment.appUrls.dashboards + 'ClearDashboardCache';
    return this.callHttpPost(url, 'updateCacheSettings', {dashboardId})
  }

  getAllPortfolioFilters(elementTypeNames: any[]): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}portfoliofilters/GetAllPortfolioFilters`;
      return this.callHttpPost(url, 'GetAllPortfolioFilters',  elementTypeNames )
    }

    const url = environment.appUrls.dashboards + 'GetAllPortfolioFilters';
    return this.callHttpPost(url, 'GetAllPortfolioFilters', { elementTypeNames })
  }

  getFilterDataByElementType(elementTypeName: string): Observable<FilterDetail[]> {
    return of<FilterDetail[]>();
    // if (environment.isRestful) {
    //   const url = `${environment.appUrls.dashboards}portfoliofilters/GetPortfolioFilterDataByElementType/${elementTypeName}`;
    //   return this.callHttpGet(url, 'GetPortfolioFilterDataByElementType')
    // }

    // const url = environment.appUrls.dashboards + 'GetPortfolioFilterDataByElementType';
    // return this.callHttpPost(url, 'GetPortfolioFilterDataByElementType', { elementTypeName })
  }

  getCardDataByElementType(currency: number, unitOfMeasureId: number, elementTypeName: string, keyDate: string, selectedFilters: string): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}portfolioCards/GetCardDataByElementType`;
      return this.callHttpPost(url, 'getCardDataByElementType', { currency, unitOfMeasureId, elementTypeName, keyDate, selectedFilters })
    }

    const url = environment.appUrls.dashboards + 'GetCardDataByElementType';
    return this.callHttpPost(url, 'getCardDataByElementType', { currency, unitOfMeasureId, elementTypeName, keyDate, selectedFilters })
  }

  getPortfolioCardFilters(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}PortfolioFilters/GetPortfolioCardFilters`;
      return this.callHttpGet(url, 'getPortfolioCardFilters')
    }

    const url = `${environment.appUrls.dashboards}GetPortfolioCardFilters`;
    return this.callHttpPost(url, 'getPortfolioCardFilters', null)
  }
  
  getRedirectorLinkList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetRedirectorLinkList`;
      return this.callHttpGet(url, 'getRedirectorLinkList')
    }

    const url = `${environment.appUrls.dashboards}GetRedirectorLinkList`;
    return this.callHttpPost(url, 'getRedirectorLinkList', null)
  }

  getGetUOMAndCurrency(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Portfolio/GetUOMAndCurrency`;
      return this.callHttpGet(url, 'getGetUOMAndCurrency')
    }
    const url = `${environment.appUrls.dashboards}GetUOMAndCurrency`;
    return this.callHttpPost(url, 'getGetUOMAndCurrency', null)
  }
  
  getUserPreferences(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
      return this.callHttpGet(url, 'getGetUserPreferences')
    }
    const url = `${environment.appUrls.dashboards}GetUserPreferences`;
    return this.callHttpPost(url, 'getGetUserPreferences', null)
  }

  getLeaseOptionsByLease(leaseAbstractId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}portfolioCards/GetPortfolioLeaseOption/${leaseAbstractId}`;
      return this.callHttpGet(url, 'getPortfolioLeaseOption')
    }
    const url = `${environment.appUrls.dashboards}GetPortfolioLeaseOption`;
    return this.callHttpPost(url, 'GetPortfolioLeaseOption', { leaseAbstractId })
  }

  getUserFilters(dashboardId): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetUserFilters/${dashboardId}`;
      return this.callHttpGet(url, 'getUserFilters')
    }
    const url = `${environment.appUrls.dashboards}GetUserFilters`;
    return this.callHttpPost(url, 'getUserFilters', { dashboardId })
  }

  saveUserFilters(userSelectedFilters: UserSelectedFilters): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/SaveUserFilters`;
      return this.callHttpPost(url, 'saveUserFilters',  userSelectedFilters)
    }

    const url = environment.appUrls.dashboards + 'SaveUserFilters';
    return this.callHttpPost(url, 'saveUserFilters', { userSelectedFilters })
  }

  getDefaultStartPagesList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Portfolio/GetDefaultStartPageLinks`;
      return this.callHttpGet(url, 'GetDefaultStartPageLinks')
    }
    const url = `${environment.appUrls.dashboards}GetDefaultStartPageLinks`;
    return this.callHttpPost(url, 'GetDefaultStartPageLinks', null)
  }
  
  getActivityFeedFile(urlPath: string): Observable<any> {
    const url = `${environment.appUrls.dashboards}GetActivityFeedCardFile`;
    return this.callHttpPostByteArray(url, 'getActivityFeedFile', { urlPath });
  }
}
