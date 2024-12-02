import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { isClassificationTypeName } from '@mango/data-models/lib-data-models';
import { PreviousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { BalanceCardType } from '../components/add-event/financial-card/balance-card/balance-card';
import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';

/**
 * This allows data communication across multiple components within the add-event page.
 *
 * @export
 * @class AddEventFormService
 */
@Injectable({
  providedIn: 'root',
})
export class AddEventFormService {
  openingAssetBalance = 0;
  assetAmortization = 0;
  previousAssetBalance = 0;
  directCostAmount = 0;
  systemAssetAdjustment = 0;
  presentValue = 0;
  openingLiabilityBalance = 0;
  previousLiabilityBalance = 0;
  liabilityAdjustmentAmount = 0;
  levelExpense = 0;
  adjustmentGainLoss = 0;
  terminationFee = 0;
  effectiveRate = 0;
  portfolioSettings: PortfolioSettingsResponse = JSON.parse(
    localStorage.getItem('portfolioSettings') || '{}'
  );

  private financialForm$ = new Subject<any>();
  private scheduleDetailsForm$ = new Subject<any>();
  private paymentAmountsForm$ = new BehaviorSubject<any>({});
  private classificationForm$ = new BehaviorSubject<any>({});
  private RVForm$ = new BehaviorSubject<any>({});
  private commonDropdowns$ = new BehaviorSubject<any>({});

  private calculateValuesResponse$ = new Subject<any>();
  public termValues$ = new Subject<any>();
  public presentValuePayload$ = new BehaviorSubject<any>({});
  public presentValueEnabled$ = new BehaviorSubject<boolean>(false);
  public accountingEventData$ = new BehaviorSubject<any>({});
  private classificationName$ = new BehaviorSubject<string>('');
  private pageMode$ = new BehaviorSubject<string>('');
  public measureEvent$ = new BehaviorSubject<string>('');
  public financeCards$ = new BehaviorSubject<any>({});

  public accountingEventSelector$ = new Subject<any>();
  accountingEventSelectorData$ = this.accountingEventSelector$;

  public openingAssetBalance$ = new BehaviorSubject<number>(0);
  public systemAssetAdjustment$ = new BehaviorSubject<number>(0);
  public manualAssetAdjustment$ = new BehaviorSubject<number>(0);
  public manualAssetAdjustmentWasUpdated = new BehaviorSubject<boolean>(false);
  public compoundFrequency$ = new BehaviorSubject<number>(
    this.portfolioSettings.defaultCompoundFrequencyType
  );
  private compoundFrequencyWasUpdated = false;
  public paymentTiming$ = new BehaviorSubject<number>(
    this.portfolioSettings.defaultPaymentTimingType
  );
  private paymentTimingWasUpdated = false;

  public isCalculateValuesDisabled = new BehaviorSubject<boolean>(false);
  public isSaveDisabled = new BehaviorSubject<boolean>(false);
  public ignoreButtonReset = new BehaviorSubject<boolean>(false);
  public calculateValuesClicked = new BehaviorSubject<boolean>(false);
  public DayOneRemeasure$ = new BehaviorSubject<boolean>(false);

  isCalculateValuesDisabled$ = this.isCalculateValuesDisabled.asObservable();
  isSaveDisabled$ = this.isSaveDisabled.asObservable();

  financialFormData$ = this.financialForm$;
  scheduleDetailsFormData$ = this.scheduleDetailsForm$;
  paymentAmountsData$ = this.paymentAmountsForm$;
  classificationFormData$ = this.classificationForm$;
  RVFormFormData$ = this.RVForm$;
  commonDropdownsData$ = this.commonDropdowns$;
  calculateValuesResponseData$ = this.calculateValuesResponse$;
  decimalPrecision$ = new BehaviorSubject<number>(2);
  private decimalPrecision = 2;
  overrideOpeningBalance = new BehaviorSubject<number>(0);

  constructor(private formatService: FormattingService) {}

  setClassification(classification: string) {
    this.classificationName$.next(classification);
    this.setFinancialBalanceCards();
  }

  setPageMode(page: string, measureEvent: string) {
    this.pageMode$.next(page);
    this.measureEvent$.next(measureEvent);
  }

  setaccountingEventData(data: any) {
    this.accountingEventData$.next(data);
    this.setFinancialBalanceCards();
  }

  setFinancialFormData(data: any) {
    this.financialForm$.next(data);
    this.setFinancialBalanceCards();
  }

  setCalculateValueResponse(data: any) {
    if (data) {
      this.calculateValuesResponse$.next(data);
      this.openingAssetBalance = data.openingAssetBalance;
      this.previousAssetBalance = data.previousAssetBalance;
      this.assetAmortization = data.assetAmortization;
      this.systemAssetAdjustment = data.systemAssetAdjustment;
      this.presentValue = data.presentValue;
      this.openingLiabilityBalance = data.openingLiabilityBalance;
      this.previousLiabilityBalance = data.previousLiabilityBalance;
      this.liabilityAdjustmentAmount = data.liabilityAdjustmentAmount;
      this.levelExpense = data.levelExpense;
      this.adjustmentGainLoss = data.adjustmentGainLoss;
      this.terminationFee = data.terminationFee;

      this.accountingEventData$.value.openingAssetBalance =
        data.openingAssetBalance;
      this.accountingEventData$.value.previousAssetBalance =
        data.previousAssetBalance;
      this.accountingEventData$.value.assetAmortization =
        data.assetAmortization;
      this.accountingEventData$.value.systemAssetAdjustment =
        data.systemAssetAdjustment;
      this.accountingEventData$.value.presentValue = data.presentValue;
      this.accountingEventData$.value.openingLiabilityBalance =
        data.openingLiabilityBalance;
      this.accountingEventData$.value.previousLiabilityBalance =
        data.previousLiabilityBalance;
      this.accountingEventData$.value.liabilityAdjustmentAmount =
        data.liabilityAdjustmentAmount;
      this.accountingEventData$.value.levelExpense = data.levelExpense;
      this.accountingEventData$.value.adjustmentGainLoss =
        data.adjustmentGainLoss;
      this.accountingEventData$.value.terminationFee = data.terminationFee;
      this.calculateValuesClicked.next(true);
      // this.manualAssetAdjustment$ = this.accountingEventData$.value.manualAssetAdjustment;
    } else {
      this.calculateValuesResponse$.next(null);
      this.openingAssetBalance = 0;
      this.previousAssetBalance = 0;
      this.assetAmortization = 0;
      this.systemAssetAdjustment = 0;
      this.presentValue = 0;
      this.openingLiabilityBalance = 0;
      this.previousLiabilityBalance = 0;
      this.liabilityAdjustmentAmount = 0;
      this.levelExpense = 0;
      this.adjustmentGainLoss = 0;
      this.terminationFee = 0;
    }
    this.setFinancialBalanceCards();
    this.openingAssetBalance$.next(this.openingAssetBalance);
    this.systemAssetAdjustment$.next(this.systemAssetAdjustment);
  }

  setCurrency(name?: string, decimalPrecision?: number) {
    if (!this.accountingEventData$.value) {
      this.initializeAccountingEvents(decimalPrecision, name);
    }
    this.accountingEventData$.value.localCurrency = name;
    this.accountingEventData$.value.localCurrencyDecimalPrecision =
      decimalPrecision;
    this.setFinancialBalanceCards();
  }

  setScheduleDetailsFormData(data: any, termBegin: any, termEnd: any) {
    this.scheduleDetailsForm$.next({ ...data, termBegin, termEnd });
    this.setFinancialBalanceCards();
  }

  setRVFormData(data: any) {
    this.RVForm$.next(data);
  }

  setClassificationFormData(data: any) {
    this.classificationFormData$.next(data);
  }

  RVFormData(data: any) {
    this.classificationFormData$.next(data);
  }

  setEffectiveRate(rate: number) {
    this.effectiveRate = rate;
    this.setFinancialBalanceCards();
  }

  setTermValues(ts: string, tp: number, tm: number, td: number, ty: number) {
    if (!this.accountingEventData$.value) {
      this.initializeAccountingEvents();
    }
    this.accountingEventData$.value.termString = ts;
    this.accountingEventData$.value.termInPeriods = tp;
    this.accountingEventData$.value.termInMonths = tm;
    this.accountingEventData$.value.termInDays = td;
    this.accountingEventData$.value.termInYears = ty;
    this.setFinancialBalanceCards();

    const termsValue = {
      termString: ts,
      termInPeriods: tp,
      termInMonths: tm,
      termInDays: td,
      termInYear: ty,
    };
    this.termValues$.next(termsValue);
  }

  setSaveDisabled(isDisabled: boolean) {
    this.isSaveDisabled.next(isDisabled);
  }

  /**
   * Sets the data for Payment Amount Card
   *
   * @param {{[key: string]: any}} data
   * @memberof AddEventFormService
   */
  setPaymentAmountsData(data: { [key: string]: any }) {
    this.paymentAmountsForm$.next(data);
    this.setFinancialBalanceCards();
  }

  setCompoundFrequency(frq: number) {
    this.compoundFrequency$.next(frq);
    this.compoundFrequencyWasUpdated = true;
  }

  setPaymentTiming(timing: number) {
    this.paymentTiming$.next(timing);
    this.paymentTimingWasUpdated = true;
  }

  initializeAccountingEvents(
    decimalPrecision?: number,
    localCurrencyName?: string
  ) {
    this.accountingEventData$.next({
      localCurrencyDecimalPrecision: decimalPrecision ? decimalPrecision : 2,
      localCurrency: localCurrencyName ? localCurrencyName : '',
      previousAssetBalance: 0,
      openingAssetBalance: 0,
      previousLiabilityBalance: 0,
      systemAssetAdjustment: 0,
      levelExpense: 0,
      //ammoritizationType
      termInPeriods: 0,
      termInDays: 0,
      presentValue: 0,
      effectiveRate: 0,
      openingLiabilityBalance: 0,
      openingBalance: 0,
      liabilityAdjustmentAmount: 0,
      adjustmentGainLoss: 0,
      terminationFee: 0,
      assetAdjustmentAmount: 0,
      adjustmentAmount: 0,
      assetAmortization: 0,
      amortizationMethodTypeID: 1,
      straightLineExpense: 0,
      priorROUAssetObtainedAmount: 0,
    });
    this.manualAssetAdjustment$.next(0);
  }

  formatOpeningBalance(opBalance: number) {
    if (this.overrideOpeningBalance.value === 1) {
      return opBalance;
    } else {
      return this.formatService.localFormat(opBalance, this.decimalPrecision);
    }
  }

  /**
   * Set the balance cards configuration per classificationName
   *
   * //param {string} classificationName: The classification name for Financial
   * Events/Schedules according to the ClassificationTypeName
   * @param {*} accountingEventData: Response from the API
   * @return {*}  {BalanceCardType[]}
   * @memberof FinancialCardComponent
   */

  setFinancialBalanceCards() {
    let portfolioSettings = this.portfolioSettings;
    let accountingEventData = this.accountingEventData$
      .value as PreviousAccountingEvent;
    let pageMode = this.pageMode$.value;
    let paymentAmountsData = this.paymentAmountsData$.value;
    const measureEvent = this.measureEvent$.value;
    if (measureEvent === 'Full Termination') {
      this.presentValueEnabled$.next(false);
    }

    this.decimalPrecision =
      accountingEventData.localCurrencyDecimalPrecision ?? 2;
    this.decimalPrecision$.next(this.decimalPrecision);
    let cards: BalanceCardType[] = [];

    if (isClassificationTypeName(this.classificationName$.value)) {
      // todo: Move into an utility class
      // Provision balance cards based on available data
      const balanceCards: { [key: string]: BalanceCardType } = {
        assetBalance: {
          cardTitle: 'Asset Balance',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.openingAssetBalance,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.openingAssetBalance ?? 0,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          precision: this.decimalPrecision,
          className: 'asset-balance',
          elements: [
            {
              label: 'Previous Balance',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.previousAssetBalance,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.previousAssetBalance ?? 0,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Direct Cost',
              value: this.formatService.localFormat(
                paymentAmountsData
                  ? paymentAmountsData.directCostAmount ?? 0
                  : 0,
                this.decimalPrecision
              ),
            },
            {
              label: 'System Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.systemAssetAdjustment,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.systemAssetAdjustment ?? 0,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Manual Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.transformLocalFormatToNumber(
                      this.manualAssetAdjustment$.value
                    )
                  : this.formatService.transformLocalFormatToNumber(
                      this.manualAssetAdjustmentWasUpdated.value
                        ? this.manualAssetAdjustment$.value
                        : accountingEventData.manualAssetAdjustment ?? 0
                    ),
              inputType: 'currency',
              precision: this.decimalPrecision,
              disabled: measureEvent === 'Full Termination',
              formControlName: 'assetBalanceManualAdjustment',
            },
            {
              label: 'Total Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.manualAssetAdjustment$.value +
                        this.systemAssetAdjustment,
                      this.decimalPrecision
                    )
                  : this.manualAssetAdjustmentWasUpdated.value
                  ? this.formatService.localFormat(
                      this.manualAssetAdjustment$.value +
                        this.systemAssetAdjustment,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.manualAssetAdjustment ??
                        0 + accountingEventData.systemAssetAdjustment ??
                        0,
                      this.decimalPrecision
                    ),
            },
          ],
        },
        levelExpense: {
          cardTitle: 'Level Expense',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.levelExpense,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.levelExpense,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          elements: [
            {
              label: 'Undiscounted Amount',
              value: this.formatService.localFormat(
                paymentAmountsData ? paymentAmountsData.undiscountedAmount : 0,
                this.decimalPrecision
              ),
            },
            {
              label: 'Carry Forward',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.previousAssetBalance - this.previousLiabilityBalance,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.previousAssetBalance -
                        accountingEventData.previousLiabilityBalance,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Direct Cost',
              value: this.formatService.localFormat(
                paymentAmountsData ? paymentAmountsData.directCostAmount : 0,
                this.decimalPrecision
              ),
            },
            {
              label:
                accountingEventData.amortizationMethodTypeID === 1
                  ? 'Number of Periods'
                  : 'Number of Days',
              value:
                accountingEventData.amortizationMethodTypeID === 1
                  ? this.formatService.localFormat(
                      accountingEventData.termInPeriods,
                      2
                    ) ?? 0
                  : accountingEventData.termInDays ?? 0,
            },
            {
              label: 'Manual Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.manualAssetAdjustment$.value ?? 0,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      this.manualAssetAdjustmentWasUpdated.value
                        ? this.manualAssetAdjustment$.value
                        : accountingEventData.manualAssetAdjustment ?? 0,
                      this.decimalPrecision
                    ),
            },
          ],
        },
        presentValue: {
          cardTitle: 'Present Value',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.presentValue ?? 0,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.presentValue ?? 0,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          valueLink: !this.presentValueEnabled$.value
            ? undefined
            : 'presentValuePreviewExcel()',
          elements: [
            {
              label: 'Undiscounted Amount',
              value: this.formatService.localFormat(
                paymentAmountsData
                  ? paymentAmountsData.undiscountedAmount ?? 0
                  : 0,
                this.decimalPrecision
              ),
            },
            {
              label: 'Effective Rate',
              value:
                this.formatService.localFormat(this.effectiveRate, 4) + '%',
            },
            {
              label: 'Term',
              value: this.accountingEventData$.value.termString ?? 0,
            },
            {
              label: 'Compound Frequency',
              required: true,
              inputType: 'select-box',
              formControlName: 'presentValueCompoundFrequency',
              disabled:
                measureEvent !== 'Initial' ||
                portfolioSettings.leaseRecognitionCalendarID != 1, // Only enabled when 'Add event' and standard calendar
              initialSelectedValue:
                pageMode === 'Add Event'
                  ? this.compoundFrequencyWasUpdated
                    ? this.compoundFrequency$?.value ?? 1
                    : portfolioSettings?.defaultCompoundFrequencyType ?? 1
                  : this.compoundFrequencyWasUpdated
                  ? this.compoundFrequency$?.value ?? 1
                  : accountingEventData?.compoundFrequencyType ?? 1,
              dataSource: [
                { displayKey: 'Monthly', valueKey: 1 },
                { displayKey: 'Daily', valueKey: 2 },
              ],
            },
            {
              label: 'Payment Timing',
              required: true,
              inputType: 'select-box',
              disabled: measureEvent === 'Full Termination',
              formControlName: 'presentValuePaymentTiming',
              initialSelectedValue:
                pageMode === 'Add Event'
                  ? this.paymentTimingWasUpdated
                    ? this.paymentTiming$?.value ?? 1
                    : portfolioSettings?.defaultPaymentTimingType ?? 1
                  : this.paymentTimingWasUpdated
                  ? this.paymentTiming$?.value ?? 1
                  : accountingEventData?.paymentInArrears === false
                  ? 1
                  : 2,
              dataSource: [
                { displayKey: 'Beginning of Period', valueKey: 1 },
                { displayKey: 'End of Period', valueKey: 2 },
              ],
            },
          ],
        },
        liabilityBalance: {
          cardTitle: 'Liability Balance',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.openingLiabilityBalance ?? 0,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.openingLiabilityBalance ?? 0,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          elements: [
            {
              label: 'Previous Liability',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.previousLiabilityBalance ?? 0,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.previousLiabilityBalance ?? 0,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Liability Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.liabilityAdjustmentAmount ?? 0,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.liabilityAdjustmentAmount ?? 0,
                      this.decimalPrecision
                    ),
            },
          ],
        },
        gainLoss: {
          cardTitle: 'Gain / Loss',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.manualAssetAdjustment$.value +
                    this.systemAssetAdjustment -
                    this.liabilityAdjustmentAmount -
                    this.terminationFee,
                  this.decimalPrecision
                )
              : this.manualAssetAdjustmentWasUpdated.value
              ? this.formatService.localFormat(
                  this.manualAssetAdjustment$.value +
                    this.systemAssetAdjustment -
                    this.liabilityAdjustmentAmount -
                    this.terminationFee,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.manualAssetAdjustment +
                    accountingEventData.systemAssetAdjustment -
                    accountingEventData.liabilityAdjustmentAmount -
                    accountingEventData.terminationFee,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          elements: [
            {
              label: 'Termination Fee',
              value: this.formatService.localFormat(
                paymentAmountsData ? paymentAmountsData.terminationFee : 0,
                this.decimalPrecision
              ),
            },
            {
              label: 'Liability Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.liabilityAdjustmentAmount,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.liabilityAdjustmentAmount,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Total Asset Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.manualAssetAdjustment$.value +
                        this.systemAssetAdjustment,
                      this.decimalPrecision
                    )
                  : this.manualAssetAdjustmentWasUpdated.value
                  ? this.formatService.localFormat(
                      this.manualAssetAdjustment$.value +
                        this.systemAssetAdjustment,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.manualAssetAdjustment ??
                        0 + accountingEventData.systemAssetAdjustment,
                      this.decimalPrecision
                    ),
            },
          ],
        },
        adjustments: {
          cardTitle: 'Adjustments',
          value:
            pageMode === 'Add Event'
              ? this.formatService.localFormat(0, this.decimalPrecision)
              : this.formatService.localFormat(
                  accountingEventData.adjustmentAmount,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          precision: this.decimalPrecision,
          elements: [
            {
              label: 'System Adjustment',
              value:
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(
                      accountingEventData.terminationFee,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Manual Adjustment',
              value: this.formatService.transformLocalFormatToNumber(
                this.formatService.localFormat(
                  this.manualAssetAdjustment$.value,
                  this.decimalPrecision
                )
              ),
              inputType: 'currency',
              formControlName: 'adjustmentManualAdjustment',
            },
            {
              label: 'Total Adjustment',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.manualAssetAdjustment$.value +
                        this.systemAssetAdjustment,
                      this.decimalPrecision
                    )
                  : this.manualAssetAdjustmentWasUpdated.value
                  ? this.formatService.localFormat(
                      this.manualAssetAdjustment$.value +
                        this.systemAssetAdjustment,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.manualAssetAdjustment ??
                        0 + accountingEventData.systemAssetAdjustment,
                      this.decimalPrecision
                    ),
            },
          ],
        },
        assetAmortization: {
          cardTitle: 'Asset Amortization',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.assetAmortization ?? 0,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.assetAmortization ?? 0,
                  this.decimalPrecision
                  // // Decimal Precision: Where amortizationMethodTypeID is 2 (daily), then use 14 decimal places;
                  // // otherwise assetAmortization is rounded to the local precision
                  // accountingEventData.amortizationMethodTypeID === 2
                  //   ? 14
                  //   : this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          className: 'asset-balance',
          elements: [
            {
              label: 'Opening Asset Balance',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.openingAssetBalance,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.openingAssetBalance ?? 0,
                      this.decimalPrecision
                    ),
            },
            {
              label:
                accountingEventData.amortizationMethodTypeID === 1
                  ? 'Number of Periods'
                  : 'Number of Days',
              value:
                accountingEventData.amortizationMethodTypeID === 1
                  ? this.formatService.localFormat(
                      accountingEventData.termInPeriods,
                      2
                    ) ?? 0
                  : accountingEventData.termInDays ?? 0,
            },
          ],
        },
        straightLineExpense: {
          cardTitle: 'Straight Line Expense',
          value:
            pageMode === 'Add Event'
              ? this.formatService.localFormat(0, this.decimalPrecision)
              : this.formatService.localFormat(
                  accountingEventData.straightLineExpense,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          elements: [
            {
              label: 'Undiscounted Amount',
              value: this.formatService.localFormat(
                paymentAmountsData ? paymentAmountsData.undiscountedAmount : 0,
                this.decimalPrecision
              ),
            },
            {
              label: 'Adjustments',
              value:
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(
                      accountingEventData.adjustmentAmount,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Option Charges',
              value:
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(0, this.decimalPrecision), // TODO: Pending for calculation engine
            },
            {
              label:
                accountingEventData.amortizationMethodTypeID === 1
                  ? 'Number of Periods'
                  : 'Number of Days',
              value:
                accountingEventData.amortizationMethodTypeID === 1
                  ? this.formatService.localFormat(
                      accountingEventData.termInPeriods,
                      2
                    ) ?? 0
                  : accountingEventData.termInDays ?? 0,
            },
          ],
        },
        straightLineIncome: {
          cardTitle: 'Straight Line Income',
          value:
            pageMode === 'Add Event'
              ? this.formatService.localFormat(0, this.decimalPrecision)
              : this.formatService.localFormat(
                  accountingEventData.straightLineExpense,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          elements: [
            {
              label: 'Undiscounted Amount',
              value: this.formatService.localFormat(
                paymentAmountsData ? paymentAmountsData.undiscountedAmount : 0,
                this.decimalPrecision
              ),
            },
            {
              label: 'Adjustments',
              value:
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(
                      accountingEventData.adjustmentAmount,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Option Charges',
              value:
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(0, this.decimalPrecision), // TODO: Pending for calculation engine
            },
            {
              label:
                accountingEventData.amortizationMethodTypeID === 1
                  ? 'Number of Periods'
                  : 'Number of Days',
              value:
                accountingEventData.amortizationMethodTypeID === 1
                  ? this.formatService.localFormat(
                      accountingEventData.termInPeriods,
                      2
                    ) ?? 0
                  : accountingEventData.termInDays ?? 0,
            },
          ],
        },
        openingBalanceOverride: {
          cardTitle: 'Opening Balance',
          value:
            pageMode === 'Add Event'
              ? this.formatOpeningBalance(
                  this.openingAssetBalance$.value
                    ? this.openingAssetBalance$.value
                    : +this.openingAssetBalance
                )
              : this.formatOpeningBalance(accountingEventData.openingBalance),
          valueSuffix: accountingEventData.localCurrency,
          valueEdit: this.overrideOpeningBalance.value === 1,
          precision: this.decimalPrecision,
          className: 'opening-balance',
          elements: [
            {
              label: 'Override Opening Balance',
              value: this.overrideOpeningBalance.value,
              inputType: 'check-box',
              formControlName: 'openingBalanceOverrideCheckbox',
            },
          ],
        },
      };

      // Pushing cards according to the classification type
      switch (this.classificationName$.value) {
        case 'Operating 840': {
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['openingBalanceOverride']
          );
          cards = this.upsertBalanceCard(cards, balanceCards['adjustments']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['straightLineExpense']
          );
          cards = this.upsertBalanceCard(cards, balanceCards['presentValue']);
          break;
        }
        case 'Capital (FAS 13)': {
          cards = this.upsertBalanceCard(cards, balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(cards, balanceCards['presentValue']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['liabilityBalance']
          );
          break;
        }
        case 'Finance (ASC 842)': {
          cards = this.upsertBalanceCard(cards, balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['assetAmortization']
          );
          cards = this.upsertBalanceCard(cards, balanceCards['presentValue']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['liabilityBalance']
          );
          if (pageMode === 'Remeasure Event' || pageMode === 'Edit Event')
            cards = this.upsertBalanceCard(cards, balanceCards['gainLoss']);
          break;
        }
        case 'Operating (ASC 842)': {
          cards = this.upsertBalanceCard(cards, balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(cards, balanceCards['levelExpense']);
          cards = this.upsertBalanceCard(cards, balanceCards['presentValue']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['liabilityBalance']
          );
          if (pageMode === 'Remeasure Event' || pageMode === 'Edit Event')
            cards = this.upsertBalanceCard(cards, balanceCards['gainLoss']);
          break;
        }
        case 'IFRS 16': {
          cards = this.upsertBalanceCard(cards, balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['assetAmortization']
          );
          cards = this.upsertBalanceCard(cards, balanceCards['presentValue']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['liabilityBalance']
          );
          if (pageMode === 'Remeasure Event' || pageMode === 'Edit Event')
            cards = this.upsertBalanceCard(cards, balanceCards['gainLoss']);
          break;
        }
        case 'Operating (Lessor)': {
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['openingBalanceOverride']
          );
          cards = this.upsertBalanceCard(cards, balanceCards['adjustments']);
          cards = this.upsertBalanceCard(
            cards,
            balanceCards['straightLineIncome']
          );
          cards = this.upsertBalanceCard(cards, balanceCards['presentValue']);
          break;
        }
        default: {
          console.error('Unknown classification');
          break;
        }
      }
      // End Switch
    }
    this.financeCards$.next(cards);
  }

  /**
   * It makes sure the balance card to push card is not duplicated
   * todo: move into an utility class
   * todo: Remove when the usage of the lifecycle hooks is fixed
   *
   * @param {BalanceCardType[]} cards
   * @param {BalanceCardType} newCard
   * @return {*}  {BalanceCardType}
   * @memberof FinancialCardComponent
   */
  private upsertBalanceCard(
    cards: BalanceCardType[],
    newCard: BalanceCardType
  ): BalanceCardType[] {
    const cardIndex = cards.findIndex(
      (card) => card.cardTitle === newCard.cardTitle
    );
    if (cardIndex !== -1) {
      cards[cardIndex] = newCard;
      console.warn(
        `Card with title "${newCard.cardTitle}" already exists. Updated the existing card.`
      );
    } else {
      cards.push(newCard);
    }
    return cards;
  }

  /**
   * Return a different value depending on the amortizationMethodTypeID
   * todo: move into an utility class
   * @private
   * @param {PreviousAccountingEvent} data
   * @param {number} decimalPrecision
   * @return {*}  {number}
   * @memberof FinancialCardComponent
   */
  private getNumberOfPeriods(
    data: PreviousAccountingEvent,
    decimalPrecision: number
  ): number {
    switch (data.amortizationMethodTypeID) {
      // Periodic
      case 0:
      case 1: {
        return data.termInPeriods;
      }
      // Daily
      case 2: {
        return Number(
          this.formatService.localFormat(data.termInDays, decimalPrecision)
        );
      }
    }
  }

  /**
   * Transform number of days into a formatted string
   * e.g.: Input: 1148 -> 3 years, 1 month, 23 days
   * todo: move into an utility class
   * @private
   * @param {number} numberOfDays
   * @return {*}  {string}
   * @memberof FinancialCardComponent
   */
  private getFormattedTermFromDays(numberOfDays: number): string {
    // Transform days to years/months/days
    const years: number = Math.floor(numberOfDays / 365);
    const months: number = Math.floor((numberOfDays % 365) / 30);
    const days: number = Math.floor((numberOfDays % 365) % 30);

    // Get verbiage
    const year_text: string = years === 1 ? ' year ' : ' years ';
    const mon_text: string = months <= 1 ? ' month ' : ' months ';
    const day_text: string = days <= 1 ? ' day' : ' days';

    return (
      years +
      year_text +
      (months != 0 ? months + mon_text : '') +
      (days != 0 ? days + day_text : '')
    );
  }

  setCommonDropdownsData(data: any) {
    this.commonDropdowns$.next(data);
  }
  /**
   * This method updates value calculation in the cards
   * todo: move into an utility class
   * @param {*} elementValueChange
   * @memberof FinancialCardComponent
   */
  updateFinancialBalanceCards(
    e: any,
    cards: BalanceCardType[]
  ): BalanceCardType[] {
    // Get the Card and Element Index
    const cardIndex = this.findCardIndex(e, cards);
    if (cardIndex === -1) {
      console.warn('Card not found');
      return;
    }
    let decimalPrecision =
      this.accountingEventData$.value.localCurrencyDecimalPrecision ?? 2;
    // Modify the corresponding card element
    switch (cards[cardIndex].cardTitle) {
      case 'Asset Balance': {
        // Total Adjustment Calculation
        // (1) Find element field's index
        const systemAdjustmentIndex = this.findCardElementIndex(
          cardIndex,
          { elementLabel: 'System Adjustment' },
          cards
        );
        // (2) Find the other element to modify
        const totalIndex = this.findCardElementIndex(
          cardIndex,
          { elementLabel: 'Total Adjustment' },
          cards
        );
        const levelExpenseIndex = this.findCardIndexByTitle(
          e,
          cards,
          'Level Expense'
        );
        if (levelExpenseIndex != -1) {
          const manualAdjustmentIndex = this.findCardElementIndex(
            levelExpenseIndex,
            { elementLabel: 'Manual Adjustment' },
            cards
          );
          cards[levelExpenseIndex].elements[manualAdjustmentIndex].value =
            this.formatService.localFormat(
              Number(e.previousValue),
              decimalPrecision
            );
        }
        this.manualAssetAdjustment$.next(Number(e.previousValue));
        this.manualAssetAdjustmentWasUpdated.next(true);
        cards[cardIndex].elements[totalIndex].value =
          this.formatService.localFormat(
            this.manualAssetAdjustment$.value +
              this.formatService.transformLocalFormatToNumber(
                cards[cardIndex].elements[systemAdjustmentIndex].value
              ),
            decimalPrecision
          );
        break;
      }
      case 'Adjustments': {
        // Total Adjustment Calculation
        const systemAdjustmentIndex = this.findCardElementIndex(
          cardIndex,
          { elementLabel: 'System Adjustment' },
          cards
        );
        const totalIndex = this.findCardElementIndex(
          cardIndex,
          { elementLabel: 'Total Adjustment' },
          cards
        );
        const openingBalanceCardIndex = this.findCardIndexByTitle(
          e,
          cards,
          'Opening Balance'
        );
        cards[cardIndex].elements[totalIndex].value =
          this.formatService.localFormat(
            Number(e.previousValue) +
              this.formatService.transformLocalFormatToNumber(
                cards[cardIndex].elements[systemAdjustmentIndex].value
              ),
            decimalPrecision
          );
        if (this.overrideOpeningBalance.value != 1) {
          this.openingAssetBalance = e.previousValue * -1;
          this.manualAssetAdjustment$.next(e.previousValue);
          cards[openingBalanceCardIndex].value = this.formatService.localFormat(
            this.openingAssetBalance,
            this.decimalPrecision
          );
          this.openingAssetBalance$.next(this.openingAssetBalance);
        }
        break;
      }
      case 'Opening Balance': {
        const adjustmentsIndex = this.findCardIndexByTitle(
          e,
          cards,
          'Adjustments'
        );
        const adjustmentsManualAdjustmentIndex = this.findCardElementIndex(
          adjustmentsIndex,
          { elementLabel: 'Manual Adjustment' },
          cards
        );
        const overrideOpeningBalanceIndex = this.findCardElementIndex(
          cardIndex,
          { elementLabel: 'Override Opening Balance' },
          cards
        );
        if (e.elementLabel === 'Override Opening Balance') {
          this.overrideOpeningBalance.next(
            this.overrideOpeningBalance.value === 1 ? 0 : 1
          );
          cards[cardIndex].valueEdit = this.overrideOpeningBalance.value === 1;
          if (
            this.overrideOpeningBalance.value != 1 &&
            adjustmentsIndex != -1
          ) {
            this.openingAssetBalance =
              Number(
                cards[adjustmentsIndex].elements[
                  adjustmentsManualAdjustmentIndex
                ].value
              ) * -1;
            cards[cardIndex].value = this.formatOpeningBalance(
              this.openingAssetBalance
            );
            this.openingAssetBalance$.next(this.openingAssetBalance);
            // cards[cardIndex].value = this.formatService.localFormat(this.openingAssetBalance, this.decimalPrecision);
          } else if (
            this.overrideOpeningBalance.value === 1 &&
            adjustmentsIndex != -1
          ) {
            this.openingAssetBalance =
              this.formatService.transformLocalFormatToNumber(
                cards[cardIndex].value
              );
            cards[cardIndex].value = this.formatOpeningBalance(
              this.openingAssetBalance
            );
            this.openingAssetBalance$.next(this.openingAssetBalance);
          }
        } else {
          this.openingAssetBalance = e.previousValue;
          this.openingAssetBalance$.next(this.openingAssetBalance);
        }
        break;
      }
      case 'Present Value': {
        if (e.elementLabel === 'Compound Frequency') {
          this.setCompoundFrequency(e.value[0].valueKey);
        }
        if (e.elementLabel === 'Payment Timing') {
          this.setPaymentTiming(e.value[0].valueKey);
        }
      }
    }
    return cards;
  }

  /**
   * Finds the index of a card given the card's title
   * todo: move into an utility class
   * @param {*} e
   * @return {*}  {(number | undefined)}
   * @memberof AddEventFormService
   */
  findCardIndex(e: any, cards): number | undefined {
    const cardIndex = cards.findIndex((card) => card.cardTitle === e.cardTitle);
    return cardIndex;
  }

  findCardIndexByTitle(e: any, cards, title: string): number | undefined {
    const cardIndex = cards.findIndex((card) => card.cardTitle === title);
    return cardIndex;
  }

  /**
   * Get the element object of the given card index (cardIndex) and all the cards
   * todo: move into an utility class
   * @param {number} cardIndex
   * @param {*} e
   * @param {BalanceCardType[]} cards
   * @return {*}  {number}
   * @memberof AddEventFormService
   */
  findCardElementIndex(
    cardIndex: number,
    e: any,
    cards: BalanceCardType[]
  ): number {
    const elementIndex = cards[cardIndex]?.elements.findIndex(
      (element) => element.label === e.elementLabel
    );
    return elementIndex;
  }
}
