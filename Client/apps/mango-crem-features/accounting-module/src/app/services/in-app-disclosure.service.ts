import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable } from 'rxjs';

import { CardConfig, SortingOrder } from '@mango/data-models/lib-data-models';
import { map } from 'rxjs/operators';

@Injectable()

export class InAppDisclosureService extends EndpointService{

  public dateFormat: string;
  private httpOptionsWithParams;
  private httpOptions;

  constructor(
     protected http: HttpClient, 
     @Optional() facade: MangoAppFacade
  ) {
    super(http, facade);
    this.getHttpHeaders().subscribe((result) => {
      this.httpOptions = result;
      this.httpOptionsWithParams = result;
    })
  }

  public getSegments(criteriaSetID?, includeArchived: boolean = false): Observable<any> {
    let param;
   
    if (criteriaSetID) {
      param = { CriteriaSetID: criteriaSetID, includeArchived: includeArchived };
    } else {
      param = { includeArchived: includeArchived };
    }

    const url = `${environment.appUrls.reports}ReportsSegments/Segments`;
    return this.callHttpGet(url, 'getSegments',  param);
  }

  public getIADCardData(dashboardID, segmentID, reportingYear, reportingCurrency) {
    let param = { dashboardID: dashboardID, segmentID : segmentID, reportingYear: reportingYear, reportingCurrencyISO: reportingCurrency };
    const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardData`;
    return this.callHttpGet(url, 'getIADCardData',  param)  
  }

  public getIADCardConfigs(dashboardId: number, cardConfig?: CardConfig[]): Observable<any> {

    const param = { dashboardId: dashboardId };
    const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardConfigs`;

    // TODO: Move logic back to corresponding dashboard
    if(cardConfig){ // Only proceeds to custom configurations if cardConfig is provided
      return this.callHttpGet(url, 'getIADCardData',  param)
        .pipe(
          map( result => {
            const fieldConfigs = [];
            result.data.forEach( (card, i) => {
              const fieldConfig = JSON.parse(card.CardJSONSchema);
              fieldConfig.splice(2,1);// todo: this needs to be fixed. API response w/ extra data (?)
              // todo: the data array should be transformed using the for each instead of pushing later
              // The array corresponds to the order coming from the API in the CardJSONSchema field
              // This should be 'find field' in the Array of objects, or API returns object to prevent changing indexes
              fieldConfig[0].sortingMethod = () => this.rowSort(undefined, undefined, card.sortingOrder);
              fieldConfig[1].sortingMethod =  () => this.rowSort(undefined, undefined, card.sortingOrder);
              fieldConfig[2].format = card.format;
              fieldConfig[fieldConfig.length - 1].calculateSummaryValue = cardConfig[i]?.calculateSummaryValue;
              fieldConfig[fieldConfig.length - 1].calculateCustomSummary = cardConfig[i]?.calculateCustomSummary;
              fieldConfigs.push(fieldConfig);
            });
            result.data = fieldConfigs;
            return result;
          }),
        );
    } else {
      return this.callHttpGet(url, 'getIADCardData',  param);
    }

  }

  public getAccountingCriteriaSets() {
    const url = `${environment.appUrls.accountingService}/criteriasets`
    return this.callHttpGet(url, 'getAccountingCriteriaSets');
  }

  public exportIADData(segmentID: number, reportingYear: number) {
    const param = { segmentID: segmentID, reportingYear: reportingYear };
    const url = `${environment.appUrls.inAppDisclosure}IAD/Export`;

    return this.callHttpGet(url, 'Export',  param)
  }

  getUserPreferences(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'getGetUserPreferences')
  }

  public getCurrencyDecimalPrecision(currencyISO) {
    let param = { currencyISO: currencyISO }
    const url = `${environment.appUrls.inAppDisclosure}IAD/CurrencyPrecision`

    return this.callHttpGet(url, 'getCurrencyPrecision', param)
  }

  private rowSort(a?, b?, sortingOrder?: SortingOrder) {
    if (sortingOrder?.[a.value] > sortingOrder?.[b.value])
      return 1;
    if (sortingOrder?.[b.value] > sortingOrder?.[a.value])
      return -1;
    else
      return 0;
  }

  public SetDefault(segmentID: number, criteriaSetID: number) {
    const body = { SegmentID: segmentID, CriteriaSetID: criteriaSetID }
    const url = `${environment.appUrls.reports}ReportsSegments/SetDefault`

    return this.callHttpPost(url, 'setDefault', body)
  }

}