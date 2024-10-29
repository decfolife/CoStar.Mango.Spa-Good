import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';
import { ClassificationTypeName } from '@mango/data-models/lib-data-models';
import { ProrationData } from '@accounting-summary/models/proration-data.model';
import { OtherCharge } from '@accounting-summary/models/other-charge.model';
import { Subject } from 'rxjs';
import { CalculateValues } from '@accounting-summary/models/interfaces/calculate-values.interfaces';
import { AccountingEventPayload } from '@accounting-summary/models/interfaces/save-accounting-event.interfaces';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AddEditScheduleService extends EndpointService {
  private apiUrl: string;
  private leaseAbstractId: any;
  public chargeMinAndMaxDateOptionPopulated = new Subject<any>();

  constructor(
    protected http: HttpClient,
    @Optional() facade: MangoAppFacade,
    private messageService: MessageService
  ) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.accountingSummary);
    this.leaseAbstractId = Number(
      localStorage.getItem('accSumLeaseAbstractId')
    );
  }

  getCommonDropdowns() {
    return this.callHttpGet(
      `${this.apiUrl}AccountingEvents/GetCommonDropdowns/Lease/${this.leaseAbstractId}`,
      'getCommonDropdowns'
    );
  }

  getClassificationSettings() {
    return this.callHttpGet(
      `${this.apiUrl}AccountingEvents/GetClassificationSettings/Lease/${this.leaseAbstractId}`,
      'getClassificationSettings'
    );
  }

  getPortfolioSettings() {
    return this.callHttpGet(
      `${this.apiUrl}AccountingSummary/GetPortfolioSettings/lease/${this.leaseAbstractId}`,
      'getPortfolioSettings'
    );
  }

  getTermCalculations(termBegin: string, termEnd: string) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingEvents/GetTermCalculations`,
      'getTermCalculations',
      JSON.stringify({
        leaseAbstractID: this.leaseAbstractId,
        termBegin,
        termEnd,
      })
    );
  }

  getDateOptions() {
    return this.callHttpGet(
      `${this.apiUrl}AccountingEvents/GetDateOptions/Lease/${this.leaseAbstractId}`,
      'getDateOptions'
    );
  }

  getAccountingEventData(ScheduleId: number) {
    return this.callHttpGet(
      `${this.apiUrl}AccountingEvents/GetAccountingEvent/${ScheduleId}`,
      'getAccountingEventData'
    );
  }

  getDiscountRateOptions(
    currency: string,
    termBegin: Date,
    termInMonths: number
  ) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingEvents/GetDiscountRateOptions`,
      'getDiscountRateOptions',
      JSON.stringify({
        leaseAbstractID: this.leaseAbstractId,
        currency,
        termBegin,
        termInMonths,
      })
    );
  }

  getEffectiveRate(
    annualRateType: number,
    discountRate: number,
    CompoundFrequencyType: number
  ) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingEvents/getEffectiveRate`,
      'getEffectiveRate',
      JSON.stringify({ annualRateType, discountRate, CompoundFrequencyType })
    );
  }

  getFunctionalCurrencyRateLookup(
    termBegin: Date,
    localCurrency: string,
    functionalCurrency: string
  ) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingEvents/GetFunctionalCurrencyRateLookup`,
      'getFunctionalCurrencyRateLookup',
      JSON.stringify({
        leaseAbstractID: this.leaseAbstractId,
        termBegin,
        localCurrency,
        functionalCurrency,
      })
    );
  }

  getClassificationTestResults(
    classificationId: number,
    test1: boolean,
    test2: boolean,
    test3: boolean,
    test4: boolean,
    test5: boolean
  ) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingEvents/GetClassificationTestResults`,
      'getClassificationTestResults',
      JSON.stringify({ classificationId, test1, test2, test3, test4, test5 })
    );
  }

  getSchedulePayment(
    classificationID: number,
    isIncome: boolean,
    scheduleCurrencyID: number,
    leaseRecognitionScheduleID: number,
    copiedFromScheduleID: number,
    remeasureTypeId: number,
    includeFromFirst: boolean,
    fromDate: string,
    toDate: string
  ) {
    return this.callHttpPost(
      `${this.apiUrl}Payments/GetSchedulePayments`,
      'getSchedulePayments',
      JSON.stringify({
        leaseAbstractID: this.leaseAbstractId,
        classificationID,
        isIncome,
        scheduleCurrencyID,
        leaseRecognitionScheduleID,
        copiedFromScheduleID,
        remeasureTypeId,
        includeFromFirst,
        fromDate,
        toDate,
      })
    );
  }

  getScheduleTransactions(
    glEventId: number,
    paymentEventSource: string,
    targetCurrencyId: number
  ) {
    return this.callHttpPost(
      `${this.apiUrl}Payments/GetScheduleTransactions`,
      'getScheduleTransactions',
      JSON.stringify({
        leaseAbstractID: this.leaseAbstractId,
        glEventId,
        paymentEventSource,
        targetCurrencyId,
      })
    );
  }

  getProratedAmounts(prorationData: ProrationData) {
    return this.callHttpPost(
      `${this.apiUrl}Payments/GetProratedAmounts`,
      'getProratedAmounts',
      prorationData
    );
  }

  saveOtherCharge(otherCharge: OtherCharge) {
    return this.callHttpPost(
      `${this.apiUrl}Payments/SaveOtherCharge`,
      'saveOtherCharge',
      otherCharge
    );
  }

  deleteOtherCharge(glEventID: number) {
    return this.callHttpDelete(
      `${this.apiUrl}Payments/DeleteOtherCharge/${glEventID}`,
      'deletothercharge'
    );
  }

  saveROUAssetObtained(
    scheduleId: number,
    rouAssetMethodId: number,
    rouAssetObtainedAmount: number,
    rouAssetObtainedDate: Date
  ) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingSummary/SaveROUAssetObtainedInformation`,
      'saveROUAssetObtained',
      JSON.stringify({
        scheduleId,
        rouAssetMethodId,
        rouAssetObtainedAmount,
        rouAssetObtainedDate,
      })
    );
  }

  calculateValues(addEventData: CalculateValues) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingEvents/CalculateValues`,
      'calculateValues',
      addEventData
    );
  }

  saveAccountingEvent(saveAccountingEventData: AccountingEventPayload) {
    return this.callHttpPost(
      `${this.apiUrl}AccountingEvents/SaveAccountingEvent`,
      'saveAccountingEvent',
      saveAccountingEventData
    );
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
      if (
        ClassificationTypeName[key as keyof typeof ClassificationTypeName] ===
        classificationID
      ) {
        return key;
      }
    }
    return undefined;
  }

  toShortDateString(dateInput: Date): string | null {
    if (!dateInput) {
      return null;
    }
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  showSuccess(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      sticky: true,
    });
  }

  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      sticky: true,
    });
  }

  showInfo(summary: string, detail: string) {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      sticky: true,
    });
  }

  showWarn(summary: string, detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      sticky: true,
    });
  }

  clearMessages() {
    this.messageService.clear();
  }
}
