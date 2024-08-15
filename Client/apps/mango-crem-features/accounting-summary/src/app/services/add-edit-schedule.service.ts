import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';
import { ClassificationTypeName } from "@mango/data-models/lib-data-models";

@Injectable({
  providedIn: 'root'
})
export class AddEditScheduleService extends EndpointService {
  private apiUrl: string;
  private leaseAbstractId: any;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.accountingSummary);
    this.leaseAbstractId = localStorage.getItem('accSumLeaseAbstractId');
  }
  
  getCommonDropdowns() {
    return this.callHttpGet(`${this.apiUrl}AccountingEvents/GetCommonDropdowns/Lease/${this.leaseAbstractId}`, 'getCommonDropdowns');
  }

  getClassificationSettings() {
    return this.callHttpGet(`${this.apiUrl}AccountingEvents/GetClassificationSettings/Lease/${this.leaseAbstractId}`, 'getClassificationSettings');
  }

  getPortfolioSettings() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetPortfolioSettings/lease/${this.leaseAbstractId}`, 'getPortfolioSettings');
  }

  getTermCalculations(termBegin: Date, termEnd: Date) {
    return this.callHttpPost(`${this.apiUrl}AccountingEvents/GetTermCalculations`, 'getTermCalculations', JSON.stringify({ leaseAbstractID: this.leaseAbstractId, termBegin, termEnd}));
  }

  getDateOptions() {
    return this.callHttpGet(`${this.apiUrl}AccountingEvents/GetDateOptions/Lease/${this.leaseAbstractId}`, 'getDateOptions');
  }

  getAccountingEventData(ScheduleId: number) {
    return this.callHttpGet(`${this.apiUrl}AccountingEvents/GetAccountingEvent/${ScheduleId}`, 'getAccountingEventData');
  }

  getDiscountRateOptions(currency: string, termBegin: Date, termInMonths: number) {
    return this.callHttpPost(`${this.apiUrl}AccountingEvents/GetDiscountRateOptions`, 'getDiscountRateOptions', JSON.stringify({ leaseAbstractID: this.leaseAbstractId, currency ,termBegin, termInMonths}));
  }

  getEffectiveRate(annualRateType: number, discountRate: number, CompoundFrequencyType: number) {
    return this.callHttpPost(`${this.apiUrl}AccountingEvents/getEffectiveRate`, 'getEffectiveRate', JSON.stringify({ annualRateType ,discountRate, CompoundFrequencyType}));
  }

  getFunctionalCurrencyRateLookup(termBegin: Date, localCurrency: string, functionalCurrency: string) {
    return this.callHttpPost(`${this.apiUrl}AccountingEvents/GetFunctionalCurrencyRateLookup`, 'getFunctionalCurrencyRateLookup', JSON.stringify({ leaseAbstractID: this.leaseAbstractId, termBegin, localCurrency, functionalCurrency}));
  }

  /**
   * Returns the Classification Name from the corresponding enum given a ClassificationID
   *
   * @param {number} classificationID
   * @return {*}  {(string | undefined)}
   * @memberof AccountingSummaryService
   */
  getClassificationName(classificationID: number): string | undefined {
    for (const key in ClassificationTypeName) {
      if (ClassificationTypeName[key as keyof typeof ClassificationTypeName] === classificationID) {
        return key;
      }
    }
    return undefined;
  }

}