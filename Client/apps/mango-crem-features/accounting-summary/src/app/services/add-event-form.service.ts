import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { isClassificationTypeName } from '@mango/data-models/lib-data-models';
import { previousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
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
  private accountingEventData = new BehaviorSubject<any>({});
  private classificationName = new BehaviorSubject<string>('');
  private pageMode = new BehaviorSubject<string>('');
  public financeCards = new BehaviorSubject<any>({});

  public accountingEventSelector$ = new Subject<any>();
  accountingEventSelectorData$ = this.accountingEventSelector$;

  public openingAssetBalance$ = new BehaviorSubject<number>(0);
  public systemAssetAdjustment$ = new BehaviorSubject<number>(0);
  public manualAssetAdjustment = new BehaviorSubject<number>(0);
  private manualAssetAdjustmentWasUpdated = false;
  public compoundFrequency = new BehaviorSubject<number>(
    this.portfolioSettings.defaultCompoundFrequencyType
  );
  private compoundFrequencyWasUpdated = false;
  public paymentTiming = new BehaviorSubject<number>(
    this.portfolioSettings.defaultPaymentTimingType
  );
  private paymentTimingWasUpdated = false;

  financialFormData$ = this.financialForm$;
  scheduleDetailsFormData$ = this.scheduleDetailsForm$;
  paymentAmountsData$ = this.paymentAmountsForm$;
  classificationFormData$ = this.classificationForm$;
  RVFormFormData$ = this.RVForm$;
  commonDropdownsData$ = this.commonDropdowns$;
  calculateValuesResponseData$ = this.calculateValuesResponse$;
  private decimalPrecision = 2 as number;

  constructor(private formatService: FormattingService) {}

  setClassification(classification: string) {
    this.classificationName.next(classification);
    this.setFinancialBalanceCards();
  }

  setAccountingEventSelector(data: any) {
    this.accountingEventSelector$.next(data);
  }

  setPageMode(page: string) {
    this.pageMode.next(page);
  }

  setaccountingEventData(data: any) {
    this.accountingEventData.next(data);
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

  setCurrency(name: string, decimalPrecision: number) {
    if (!this.accountingEventData.value) {
      this.initializeAccountingEvents();
    }
    this.accountingEventData.value.localCurrency = name;
    this.accountingEventData.value.localCurrencyDecimalPrecision =
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
    if (!this.accountingEventData.value) {
      this.initializeAccountingEvents();
    }
    this.accountingEventData.value.effectiveRate = rate;
    this.setFinancialBalanceCards();
  }

  setTermValues(ts: string, tp: number, tm: number, td: number, ty: number) {
    if (!this.accountingEventData.value) {
      this.initializeAccountingEvents();
    }
    this.accountingEventData.value.termString = ts;
    this.accountingEventData.value.termInPeriods = tp;
    this.accountingEventData.value.termInMonths = tm;
    this.accountingEventData.value.termInDays = td;
    this.accountingEventData.value.termInYears = ty;
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
    this.compoundFrequency.next(frq);
    this.compoundFrequencyWasUpdated = true;
  }

  setPaymentTiming(timing: number) {
    this.paymentTiming.next(timing);
    this.paymentTimingWasUpdated = true;
  }

  initializeAccountingEvents() {
    this.accountingEventData.next({
      localCurrencyDecimalPrecision: 2,
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
      localCurrency: 'USD',
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
    this.manualAssetAdjustment.next(0);
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
    let accountingEventData = this.accountingEventData.value;
    let pageMode = this.pageMode.value;
    let paymentAmountsData = this.paymentAmountsData$.value;

    if (!accountingEventData) {
      this.financeCards.next([]);
      return;
    }
    this.decimalPrecision =
      accountingEventData.localCurrencyDecimalPrecision ?? 2;
    let cards: BalanceCardType[] = [];

    if (isClassificationTypeName(this.classificationName.value)) {
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
                  accountingEventData.assetAmortization,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
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
                paymentAmountsData ? paymentAmountsData.directCostAmount : 0,
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
              value: this.formatService.transformLocalFormatToNumber(
                this.formatService.localFormat(
                  this.manualAssetAdjustment.value,
                  this.decimalPrecision
                )
              ),
              inputType: 'currency',
              precision: this.decimalPrecision,
              currencyName: accountingEventData.localCurrency,
              formControlName: 'assetBalanceManualAdjustment',
            },
            {
              label: 'Total Adjustment',
              value: this.formatService.localFormat(
                accountingEventData.systemAssetAdjustment +
                  this.manualAssetAdjustment.value,
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
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      paymentAmountsData
                        ? paymentAmountsData.undiscountedAmount
                        : 0,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.totalAmount,
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
                      this.manualAssetAdjustment.value ?? 0,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      this.manualAssetAdjustmentWasUpdated
                        ? this.manualAssetAdjustment.value
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
                  this.presentValue,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.presentValue,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          //valueLink: pageMode === 'Add Event' ? undefined : '#', // TODO: Waiting for calculation engine update and reeenable after calculation engine is finished
          elements: [
            {
              label: 'Undiscounted Amount',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      paymentAmountsData
                        ? paymentAmountsData.undiscountedAmount
                        : 0,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.totalAmount,
                      this.decimalPrecision
                    ),
            },
            {
              label: 'Effective Rate',
              value: accountingEventData.effectiveRate
                ? this.formatService.localFormat(
                    accountingEventData.effectiveRate,
                    4
                  ) + '%'
                : '0%',
            },
            {
              label: 'Term',
              value: this.accountingEventData.value.termString ?? 0,
            },
            {
              label: 'Compound Frequency',
              required: true,
              inputType: 'select-box',
              formControlName: 'presentValueCompoundFrequency',
              disabled:
                pageMode === 'Remeasure Event' ||
                portfolioSettings.leaseRecognitionCalendarID != 1, // Only enabled when 'Add event' and standard calendar
              initialSelectedValue:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.compoundFrequencyWasUpdated
                    ? this.compoundFrequency?.value ?? 1
                    : portfolioSettings?.defaultCompoundFrequencyType ?? 1
                  : this.compoundFrequencyWasUpdated
                  ? this.compoundFrequency?.value ?? 1
                  : accountingEventData?.compoundFrequency ?? 1,
              dataSource: [
                { displayKey: 'Monthly', valueKey: 1 },
                { displayKey: 'Daily', valueKey: 2 },
              ],
            },
            {
              label: 'Payment Timing',
              required: true,
              inputType: 'select-box',
              formControlName: 'presentValuePaymentTiming',
              initialSelectedValue:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.paymentTimingWasUpdated
                    ? this.paymentTiming?.value ?? 1
                    : portfolioSettings?.defaultPaymentTimingType ?? 1
                  : this.paymentTimingWasUpdated
                  ? this.paymentTiming?.value ?? 1
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
                  this.openingLiabilityBalance,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.openingLiabilityBalance,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          elements: [
            {
              label: 'Previous Liability',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.previousLiabilityBalance,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.previousLiabilityBalance,
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
          ],
        },
        gainLoss: {
          cardTitle: 'Gain / Loss',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.adjustmentGainLoss,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.adjustmentGainLoss,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          elements: [
            {
              label: 'Termination Fee',
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      this.terminationFee,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.terminationFee,
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
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(
                      accountingEventData.assetAdjustmentAmount,
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
              value: this.formatService.localFormat(0, this.decimalPrecision),
              inputType: 'number',
              formControlName: 'adjustmentManualAdjustment',
            },
            {
              label: 'Total Adjustment',
              value:
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(0, this.decimalPrecision),
            },
          ],
        },
        assetAmortization: {
          cardTitle: 'Asset Amortization',
          value:
            pageMode === 'Add Event' || pageMode === 'Remeasure Event'
              ? this.formatService.localFormat(
                  this.assetAmortization,
                  this.decimalPrecision
                )
              : this.formatService.localFormat(
                  accountingEventData.assetAmortization,
                  // Decimal Precision: Where amortizationMethodTypeID is 2 (daily), then use 14 decimal places;
                  // otherwise assetAmortization is rounded to 0
                  accountingEventData.amortizationMethodTypeID === 2 ? 14 : 0
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
              value:
                pageMode === 'Add Event' || pageMode === 'Remeasure Event'
                  ? this.formatService.localFormat(
                      paymentAmountsData
                        ? paymentAmountsData.undiscountedAmount
                        : 0,
                      this.decimalPrecision
                    )
                  : this.formatService.localFormat(
                      accountingEventData.totalAmount,
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
              value:
                pageMode === 'Add Event'
                  ? this.formatService.localFormat(0, this.decimalPrecision)
                  : this.formatService.localFormat(
                      paymentAmountsData
                        ? paymentAmountsData.undiscountedAmount
                        : 0,
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
              ? this.formatService.localFormat(0, this.decimalPrecision)
              : this.formatService.localFormat(
                  accountingEventData.openingBalance,
                  this.decimalPrecision
                ),
          valueSuffix: accountingEventData.localCurrency,
          className: 'opening-balance',
          elements: [
            {
              label: 'Override Opening Balance',
              value: '',
              inputType: 'number',
              formControlName: 'openingBalanceOverride',
            },
          ],
        },
      };

      // Pushing cards according to the classification type
      switch (this.classificationName.value) {
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
    this.financeCards.next(cards);
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
   * @param {previousAccountingEvent} data
   * @param {number} decimalPrecision
   * @return {*}  {number}
   * @memberof FinancialCardComponent
   */
  private getNumberOfPeriods(
    data: previousAccountingEvent,
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
      this.accountingEventData.value.localCurrencyDecimalPrecision ?? 2;
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
        this.manualAssetAdjustment.next(Number(e.previousValue));
        this.manualAssetAdjustmentWasUpdated = true;
        cards[cardIndex].elements[totalIndex].value =
          this.formatService.localFormat(
            this.manualAssetAdjustment.value +
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
        cards[cardIndex].elements[totalIndex].value =
          this.formatService.localFormat(
            Number(e.value) +
              this.formatService.transformLocalFormatToNumber(
                cards[cardIndex].elements[systemAdjustmentIndex].value
              ),
            decimalPrecision
          );
        break;
      }
      case 'Opening Balance': {
        const overrideOpeningBalanceIndex = this.findCardElementIndex(
          cardIndex,
          { elementLabel: 'Override Opening Balance' },
          cards
        );
        if (!e.value) {
          // If the selected value undefined don't override
          cards[cardIndex].value = this.formatService.localFormat(0, 2);
        } else {
          // If value is numeric, override
          cards[cardIndex].value = this.formatService.localFormat(
            Number(e.value) +
              this.formatService.transformLocalFormatToNumber(
                Number(
                  cards[cardIndex].elements[overrideOpeningBalanceIndex].value
                )
              ),
            decimalPrecision
          );
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
