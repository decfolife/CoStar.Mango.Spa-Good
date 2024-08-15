import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()

export class DataService extends EndpointService {
  quickSearchUrl: string = UtilitiesService.getBaseApiUrl(Api.quickSearch)
  dashboardsUrl: string = UtilitiesService.getBaseApiUrl(Api.dashboards)

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getPortfolioMetricDataByElementType(elementTypeName: string, unitOfMeasureId: number, selectedFilters: string, exchangeRateId: number): Observable<any> {
    return of(1);
    //   const url = `${this.dashboards}PortfolioMetrics/GetMetricDataByElementType`;
    //   return this.callHttpPost(url, 'getMetricDataByElementType', { elementTypeName, unitOfMeasureId, selectedFilters, exchangeRateId })
  }

  getProjectMetricDataByElementType(elementTypeName: string,  selectedFilters: string): Observable<any> {
    return of(1);
    //   const url = 'http://localhost:57586/api/ProjectsMetrics/GetMetricDataByElementType';
    //   return this.callHttpPost(url, 'getMetricDataByElementType', { elementTypeName, selectedFilters})
  }

  getQuickSearchModules() : Observable<any> {
    const url = `${this.quickSearchUrl}/quicksearch/getmodulevalues`;
    return this.callHttpGet(url, 'getmodulevalues');
  }

  getTypeAheadResults(searchString: string, moduleId: number): Observable<any> {
    const url = `${this.quickSearchUrl}/quicksearch/gettypeaheadvalues/${searchString}/${moduleId}`;
    return this.callHttpGet(url, 'gettypeaheadvalues');
  }

  fetchAllPortfolioMetrics(schemaMetrics: any, unitOfMeasureId: number, selectedFilters: string, exchangeRateId: number): Observable<any> {
    const url = `${this.dashboardsUrl}PortfolioMetrics/GetAllPortfolioMetrics`;
    return this.callHttpPost(url, 'getAllPortfolioMetrics', { schemaMetrics, unitOfMeasureId, selectedFilters, exchangeRateId })
  }

  fetchAllProjectMetrics(schemaMetrics: any, selectedFilters: string): Observable<any> {
    const url = `${this.dashboardsUrl}ProjectsMetrics/GetAllProjectMetrics`;
    return this.callHttpPost(url, 'getAllProjectMetrics', { schemaMetrics, selectedFilters })
  }

  getRedirectorLinkList(): Observable<any> {
    const url = `${this.dashboardsUrl}dashboards/GetRedirectorLinkList`;
    return this.callHttpGet(url, 'getRedirectorLinkList')
  }
}

