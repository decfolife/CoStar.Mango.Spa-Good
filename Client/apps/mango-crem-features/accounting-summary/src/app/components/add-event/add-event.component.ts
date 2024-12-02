import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';
import { classificationSettingResponse } from '@accounting-summary/models/classification-settings-response.modal';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import {
  Component,
  OnDestroy,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { PreviousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
import { debounceTime } from 'rxjs/operators';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';
import {
  AmortizationProfile,
  CommonDropdowns,
  Currency,
  LookupOption,
} from '@accounting-summary/models/common-dropdowns.model';
import { EventDateOptions } from '@accounting-summary/models/interfaces/event-date-options.interfaces';
import { CalculateValues } from '@accounting-summary/models/interfaces/calculate-values.interfaces';
import {
  AccountingEventPayload,
  CalculationSupports,
  ProperPreviousAmortizationPeriod,
} from '@accounting-summary/models/interfaces/save-accounting-event.interfaces';
import { CremToastService } from 'libs/ui-shared/lib-ui-elements/src/lib/toast';
import {
  CalculateValuesResponse,
  ResidualValues,
} from '@accounting-summary/models/interfaces/calculate-values-response.interfaces';
import { environment } from '@mangoSpa/src/environments/environment.local';
@Component({
  selector: 'mango-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnDestroy, OnInit {
  classificationId: any;
  componentName = 'add-edit';
  isSaveDisabled = true;
  isCalculateValuesDisabled = true;
  pageMode = '';
  eventsGridData: any;
  measureEvent: string;
  queryParams: any;
  commonDropdowns: CommonDropdowns;
  amortizationProfiles: AmortizationProfile[];
  currencyList: Currency[];
  rouAssetMethodsList: LookupOption[];
  scheduleId: number;
  classificationSettings: classificationSettingResponse;
  portfolioSettings: PortfolioSettingsResponse;
  accountingEventsData: PreviousAccountingEvent;
  eventDateOptions: EventDateOptions[];
  scheduleDetailsData: any;
  addEditSchedulePayload: CalculateValues;
  scheduleDetails: any;
  classificationData: any;
  RVData: any;
  financialData: any;
  paymentsData: any;
  termsValue: any;
  compoundFrequency: number;
  paymentTiming: number;
  manualAssetAdjustment: number;
  createdScheduleID: number;
  accountingEventSelector: any;
  calculationSupport: CalculationSupports;
  properPreviousAmortizationPeriod: ProperPreviousAmortizationPeriod;
  residualValues: ResidualValues;
  scheduleCurrency: any;
  functionalCurrency: any;
  calculateValuesResponseData: CalculateValuesResponse;
  isSaveAndCloseClicked: boolean;
  isCalculateValuesClicked: boolean;
  isApplyClicked: boolean;
  isApplyDisabled = true;
  debounceTime = 500;
  private subscription$ = new Subscription();
  isSaveButtonEnabled: boolean;
  isFunctionalRate1: boolean;
  calculateWithFunctionalRate1: boolean;
  showPayload: boolean;
  apiValidationErrorMessage: string;
  openDay1DayxRemeasurePopup = false;
  @ViewChild('accordion') accordion: any;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    public location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private addEventFormService: AddEventFormService,
    public addEditScheduleService: AddEditScheduleService,
    public cdRef: ChangeDetectorRef
  ) {
    this.getCommonDropDowns();
    this.getClassificationSettings();
    this.getEventDateOptions();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.addEventFormService.setCalculateValueResponse(null);
    this.addEventFormService.setCompoundFrequency(
      this.portfolioSettings.defaultCompoundFrequencyType
    );
    this.addEventFormService.setPaymentTiming(
      this.portfolioSettings.defaultPaymentTimingType
    );
  }

  ngOnInit() {
    this.showPayload = environment.showPayload;
    this.portfolioSettings = JSON.parse(
      localStorage.getItem('portfolioSettings') || '{}'
    );
    this.getFormsData();
    this.getCalculateValueData();
    this.populateChargeDateRangeOptions();
    this.initializeRouteData();
    this.addEventFormService.overrideOpeningBalance.next(0);
    if (this.pageMode === 'Edit Event') {
      this.addEventFormService.presentValueEnabled$.next(true);
    } else {
      this.addEventFormService.presentValueEnabled$.next(false);
    }
  }

  initializeRouteData() {
    this.subscription$.add(
      this.activatedRoute.data.subscribe((navigatedFrom) => {
        this.pageMode = navigatedFrom.breadCrumb.label;
      })
    );

    this.subscription$.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.queryParams = params;
      })
    );

    if (this.pageMode === 'Edit Event' || this.pageMode === 'Remeasure Event') {
      this.eventsGridData =
        this.router.lastSuccessfulNavigation?.extras.state?.data ||
        +this.queryParams.eventId;
    }

    if (this.pageMode === 'Edit Event') {
      this.measureEvent = this.eventsGridData?.measureEvent ?? 'Initial';
    } else {
      this.measureEvent =
        this.router.lastSuccessfulNavigation?.extras.state?.measureEvent;
      this.accountingEventSelector =
        this.router.lastSuccessfulNavigation?.extras.state.data.accountingEventSelector;
    }

    if (this.eventsGridData) {
      this.scheduleId =
        this.eventsGridData.leaseRecognitionScheduleID ||
        +this.queryParams.eventId;
      if (!!this.scheduleId) {
        this.getAccountingEventsData();
      }
    } else {
      if (!!this.accountingEventsData) {
        this.addEventFormService.setaccountingEventData(
          this.accountingEventsData
        );
      }
    }
  }

  populateChargeDateRangeOptions() {
    this.subscription$.add(
      this.addEditScheduleService.chargeMinAndMaxDateOptionPopulated.subscribe(
        (data) => {
          let dateChanged = false;

          if (
            this.eventDateOptions.filter((f) => f.optionID === 9)[0]
              .optionDate !== data.minDateOption
          ) {
            this.eventDateOptions.filter(
              (f) => f.optionID === 9
            )[0].optionDate = data.minDateOption;
            dateChanged = true;
          }

          if (
            this.eventDateOptions.filter((f) => f.optionID === 13)[0]
              .optionDate !== data.maxDateOption
          ) {
            this.eventDateOptions.filter(
              (f) => f.optionID === 13
            )[0].optionDate = data.maxDateOption;
            dateChanged = true;
          }

          if (dateChanged) {
            //Trigger change detection because cdRef.detectChanges is not working
            this.eventDateOptions = JSON.parse(
              JSON.stringify(this.eventDateOptions)
            );
          }
        }
      )
    );
  }

  getCalculateValueData() {
    this.subscription$.add(
      this.addEventFormService.calculateValuesResponseData$
        .pipe(debounceTime(this.debounceTime))
        .subscribe((calculateValuesResponseData) => {
          this.calculateValuesResponseData = calculateValuesResponseData;
          this.calculationSupport =
            calculateValuesResponseData?.calculationSupports;
          this.residualValues = calculateValuesResponseData?.residualValues;
          this.scheduleCurrency =
            calculateValuesResponseData?.calculationSupports?.scheduleCurrency;
          this.functionalCurrency =
            calculateValuesResponseData?.calculationSupports?.functionalCurrency;
        })
    );
  }

  getFormsData() {
    this.subscription$.add(
      combineLatest([
        this.addEventFormService.scheduleDetailsFormData$,
        this.addEventFormService.classificationFormData$,
        this.addEventFormService.RVFormFormData$,
        this.addEventFormService.financialFormData$,
        this.addEventFormService.paymentAmountsData$,
        this.addEventFormService.termValues$,
        this.addEventFormService.compoundFrequency$,
        this.addEventFormService.paymentTiming$,
        this.addEventFormService.manualAssetAdjustment$,
        this.addEventFormService.isCalculateValuesDisabled$,
        this.addEventFormService.isSaveDisabled$,
      ])
        .pipe(debounceTime(this.debounceTime))
        .subscribe(
          ([
            scheduleDetails,
            classificationData,
            RVData,
            financialData,
            paymentsData,
            termValues,
            compoundFrequency,
            paymentTiming,
            manualAssetAdjustment,
            isCalculateValuesDisabled,
            isSaveDisabled,
          ]) => {
            this.scheduleDetails = scheduleDetails;
            this.classificationData = classificationData;
            this.RVData = RVData;
            this.financialData = financialData;
            this.paymentsData = paymentsData;
            this.termsValue = termValues;
            this.compoundFrequency = compoundFrequency;
            this.paymentTiming = paymentTiming;
            this.manualAssetAdjustment = manualAssetAdjustment;
            if (
              this.addEventFormService.ignoreButtonReset.value &&
              this.addEventFormService.calculateValuesClicked.value
            ) {
              this.isCalculateValuesDisabled = true;
              this.isSaveButtonEnabled = true;
              this.isSaveDisabled = false;
              this.addEventFormService.ignoreButtonReset.next(false);
              this.addEventFormService.calculateValuesClicked.next(false);
            } else {
              this.isCalculateValuesDisabled = isCalculateValuesDisabled;
              this.isSaveButtonEnabled = isSaveDisabled;
              this.isSaveDisabled = true;
              this.isApplyDisabled = true;
              this.addEventFormService.calculateValuesClicked.next(false);
            }
            let initCurrency = this.getCurrencyDetails(
              this.financialData.financialFormData.localCurrency
            );
            if (
              initCurrency &&
              this.addEventFormService.accountingEventData$.value
                .localCurrency != initCurrency.name
            ) {
              this.addEventFormService.setCurrency(
                initCurrency.name,
                initCurrency.decimalPrecision
              );
              if (this.pageMode === 'Edit Event') {
                let initialValues = this.buildCalculateValuePayload();
                this.buildPresentValueExportPayload(initialValues);
              }
            }
          }
        )
    );
  }

  getScheduleIdentifiers() {
    let leaseRecognitionScheduleId = null;
    let copiedFromScheduleId = null;
    if (this.pageMode === 'Add Event') {
      leaseRecognitionScheduleId = null;
      copiedFromScheduleId = null;
    } else if (
      this.pageMode === 'Edit Event' &&
      this.measureEvent === 'Initial'
    ) {
      leaseRecognitionScheduleId = +this.queryParams.eventId;
      copiedFromScheduleId = null;
    } else if (this.pageMode === 'Remeasure Event') {
      copiedFromScheduleId = +this.queryParams.eventId;
      leaseRecognitionScheduleId = null;
    } else if (
      this.pageMode === 'Edit Event' &&
      this.measureEvent !== 'Initial'
    ) {
      copiedFromScheduleId = +this.accountingEventsData.copiedFromScheduleID;
      leaseRecognitionScheduleId = +this.queryParams.eventId;
    }
    return {
      leaseRecognitionScheduleId,
      copiedFromScheduleId,
    };
  }

  calculateValues() {
    if (!this.calculateValidations() && !this.calculateWithFunctionalRate1) {
      return;
    } else {
      const addEditSchedulePayload = this.buildCalculateValuePayload();
      this.buildPresentValueExportPayload(addEditSchedulePayload);
      this.isCalculateValuesClicked = true;
      this.subscription$.add(
        this.addEditScheduleService
          .calculateValues(addEditSchedulePayload)
          .subscribe((response) => {
            if (response === null) {
              this.addEditScheduleService.showToast(
                'Error',
                'An error occurred while calculating. If the problem persists, please contact support.',
                'error',
                false
              );
              this.isCalculateValuesDisabled = true;
              this.isCalculateValuesClicked = false;
            } else if (response.success) {
              this.addEventFormService.setCalculateValueResponse(response.data);
              this.isCalculateValuesDisabled = true;
              this.isCalculateValuesClicked = false;
              if (this.isSaveButtonEnabled) {
                this.isSaveDisabled = true;
                this.isApplyDisabled = true;
              } else if (!this.isSaveButtonEnabled) {
                this.isSaveDisabled = false;
                this.isApplyDisabled = false;
              }
            } else {
              this.apiValidationErrorMessage = response.clientErrorMessage;
              this.showApiValidationErrorMessage();
              this.isCalculateValuesDisabled = false;
              this.isCalculateValuesClicked = false;
            }
          })
      );
    }
  }

  showApiValidationErrorMessage() {
    if (
      this.apiValidationErrorMessage ===
      'MissingHistoricalChargeForMidPeriodRemeasurementError'
    ) {
      this.addEditScheduleService.showToast(
        'Historical Charge Missing',
        'Remeasuring from this date is not allowed because historical charge data is not available. Please try picking a start date that coincides with the start of a period.',
        'error',
        false
      );
    } else if (
      this.apiValidationErrorMessage ===
        'Day1DayXRemeasureOnUnsupportedClassificationsError' ||
      this.apiValidationErrorMessage ===
        'Day1DayXRemeasureWhilePriorOneInScheduleJEStatusError'
    ) {
      this.openDay1DayxRemeasurePopup = true;
    } else if (this.apiValidationErrorMessage === 'Day1FullTerminationError') {
      this.addEditScheduleService.showToast(
        'Day 1 Full Termination',
        'Full termination is not supported on Day 1 of the initial schedule.',
        'error',
        false
      );
    } else if (
      this.apiValidationErrorMessage ===
      'MidPeriodWithPriorAdjustmentRemeasureError'
    ) {
      this.addEditScheduleService.showToast(
        'Remeasuring Mid-Period',
        'Remeasuring mid-period is not allowed when the period has an existing adjustment.',
        'error',
        false
      );
    } else if (
      this.apiValidationErrorMessage ===
      'MissingPreviousPeriodForRemeasureError'
    ) {
      this.addEditScheduleService.showToast(
        'Missing Previous Period',
        'Previous Period was not found.',
        'error',
        false
      );
    } else if (
      this.apiValidationErrorMessage?.includes(
        'Opening Asset Balance cannot be negative.'
      )
    ) {
      this.addEditScheduleService.showToast(
        'Negative Opening Balance',
        'Amortization schedules cannot be created with a negative opening balance. If you are creating a Tenant Improvement Allowance scenario, then input the adjustment as a positive value and change the charge type from expense to income.',
        'error',
        false
      );
    } else {
      this.addEditScheduleService.showToast(
        'Error occurred while calculating',
        'An error occurred while calculating. If the problem persists, please contact support.',
        'error',
        false
      );
    }
  }

  saveSchedule() {
    const saveAccountingEventPayload = this.buildSaveAccountingEventPayload();
    if (this.showPayload) {
      console.log('saveAccountingEventPayload', saveAccountingEventPayload);
    }
    return this.addEditScheduleService.saveAccountingEvent(
      saveAccountingEventPayload
    );
  }

  saveAndClose() {
    if (!this.SaveValidations()) {
      return;
    }

    if (
      (!this.calculateValuesResponseData.adjustment ||
        this.calculateValuesResponseData.adjustment === 0) &&
      this.calculateValuesResponseData.totalPayments === 0 &&
      this.classificationId !== 0 &&
      this.calculateValuesResponseData.openingAssetBalance === 0 &&
      this.calculateValuesResponseData.liabilityAdjustmentAmount === 0
    ) {
      this.addEditScheduleService.showToast(
        'Error occurred while saving',
        'Total Amount, Total Adjustment Amount, Beginning Asset Balance, or Liability Adjustment must have a value before saving a schedule.',
        'error',
        false
      );
      return false;
    } else {
      this.isSaveAndCloseClicked = true;
      this.isSaveDisabled = true;
      this.isApplyDisabled = true;

      this.saveSchedule().subscribe((response) => {
        if (response === null) {
          this.addEditScheduleService.showToast(
            'Error occurred while saving',
            'An error occurred while saving. If the problem persists, please contact support.',
            'error',
            false
          );
          this.isSaveAndCloseClicked = false;
          this.isSaveDisabled = false;
          this.isApplyDisabled = false;
        } else if (response.success) {
          this.createdScheduleID = response.data;
          this.addEventFormService.manualAssetAdjustmentWasUpdated.next(false);
          if (this.pageMode === 'Add Event') {
            this.accountingSummaryService.newCreatedSchedule.next(
              this.createdScheduleID
            );
          }
          this.isSaveAndCloseClicked = false;
          this.isSaveDisabled = false;
          this.isApplyDisabled = false;
          this.navigateToAccountingSummaryPage();
        } else {
          if (
            response.clientErrorMessage ===
            'ClassificationAmortizationComboExists'
          ) {
            this.addEditScheduleService.showToast(
              'Amortization Profile and Classification',
              'A schedule with this classification and amortization profile already exists.',
              'error',
              false
            );
          } else {
            this.addEditScheduleService.showToast(
              'Error occurred while saving',
              response.clientErrorMessage,
              'error',
              false
            );
          }
          this.isSaveAndCloseClicked = false;
          this.isSaveDisabled = false;
          this.isApplyDisabled = false;
        }
      });
    }
  }

  applyChanges() {
    if (!this.SaveValidations()) {
      return;
    } else {
      this.isApplyClicked = true;
      this.isSaveDisabled = false;
      this.isApplyDisabled = false;
      this.saveSchedule().subscribe((response) => {
        if (response === null) {
          this.addEditScheduleService.showToast(
            'Error occurred while saving',
            'An error occurred while saving. If the problem persists, please contact support.',
            'error',
            false
          );
          this.isApplyClicked = false;
          this.isSaveDisabled = true;
          this.isApplyDisabled = true;
        } else if (response.success) {
          this.createdScheduleID = response.data;
          if (this.createdScheduleID && this.pageMode !== 'Edit Event') {
            this.accountingSummaryService.newCreatedSchedule.next(
              this.createdScheduleID
            );
            const queryParams = {
              eventId: this.createdScheduleID,
            };
            this.router.navigate(['/crem/accounting/summary/editEvent'], {
              state: { data: 'Initial' },
              relativeTo: this.activatedRoute,
              queryParams: queryParams,
            });
          } else {
            this.addEditScheduleService.showToast(
              'Record Saved',
              'Schedule saved successfully',
              'success',
              false
            );
            this.isApplyClicked = false;
            this.isSaveDisabled = false;
            this.isApplyDisabled = false;
          }
        } else {
          this.addEditScheduleService.showToast(
            'Error occurred while saving',
            response.clientErrorMessage,
            'error',
            false
          );
          this.isApplyClicked = false;
          this.isSaveDisabled = true;
          this.isApplyDisabled = true;
        }
      });
    }
  }

  SaveValidations() {
    if (
      (!this.accountingEventSelector ||
        this.accountingEventSelector.length === 0) &&
      this.pageMode === 'Add Event'
    ) {
      return true;
    }

    const journalEntryProfile = this.scheduleDetails.journalEntryProfile[0];
    const classificationID = this.scheduleDetails.classificationId[0];
    const amortizationProfileID =
      this.financialData.financialFormData.amortizationProfile;
    const manualAmortizationProfileName =
      this.financialData.financialFormData.manualAmortizationProfileName;

    let isScheduleDuplicate;

    if (amortizationProfileID < 0) {
      // Search by manualAmortizationProfileName if ID is -1
      isScheduleDuplicate = this.accountingEventSelector?.some(
        (item) =>
          item.classificationID === classificationID &&
          item.amortizationProfileName === manualAmortizationProfileName
      );
    } else {
      // Default search by IDs
      isScheduleDuplicate = this.accountingEventSelector?.some(
        (item) =>
          item.classificationID === classificationID &&
          item.amortizationProfileID === amortizationProfileID
      );
    }

    if (!amortizationProfileID && amortizationProfileID !== 0) {
      this.addEditScheduleService.showToast(
        'Amortization Profile',
        'Amortization Profile Profile is required'
      );
      return false;
    } else {
      this.addEditScheduleService.clearToastBySummary('Amortization Profile');
    }

    if (
      !journalEntryProfile &&
      journalEntryProfile !== 0 &&
      this.portfolioSettings.journalEntryProfileRequired
    ) {
      this.addEditScheduleService.showToast(
        'Journal Entry Profile',
        'Journal Entry Profile is required'
      );
      return false;
    } else {
      this.addEditScheduleService.clearToastBySummary('Journal Entry Profile');
    }

    if (isScheduleDuplicate && this.pageMode === 'Add Event') {
      this.addEditScheduleService.showToast(
        'Amortization Profile and Classification',
        'A schedule with this classification and amortization profile already exists.'
      );
      return false;
    } else {
      this.addEditScheduleService.clearToastBySummary(
        'Amortization Profile and Classification'
      );
    }
    return true;
  }

  calculateValidations() {
    const discountRate = +this.financialData.financialFormData.discountRate;
    if (discountRate === 0 && this.measureEvent !== 'Full Termination') {
      this.addEditScheduleService.showToast(
        'Zero Discount Rate',
        'Calculating the present value using a zero discount rate results in the present value equal to the total undiscounted amount with no interest component.',
        'warn',
        false
      );
    }

    const showFunctionalCurrency =
      this.portfolioSettings?.functionalCurrencyEnabled;
    const scheduleCurrency = this.getCurrencyDetails(
      Array.isArray(this.financialData?.financialFormData.localCurrency)
        ? this.financialData?.financialFormData.localCurrency[0]
        : this.financialData?.financialFormData.localCurrency
    );
    const functionalCurrency = this.getCurrencyDetails(
      Array.isArray(this.financialData?.financialFormData?.functionalCurrency)
        ? this.financialData?.financialFormData?.functionalCurrency[0]
        : this.financialData?.financialFormData?.functionalCurrency
    );

    const functionalCurrencyRate =
      +this.financialData?.financialFormData.currencyRate;
    const isSameCurrency = scheduleCurrency === functionalCurrency;

    if (
      !isSameCurrency &&
      functionalCurrencyRate === 1 &&
      ((showFunctionalCurrency && this.classificationId === 2) ||
        this.classificationId === 3 ||
        this.classificationId === 4)
    ) {
      this.isFunctionalRate1 = true;
      return this.calculateWithFunctionalRate1;
    }
    return true;
  }

  getCurrencyDetails(currency: number) {
    return this.currencyList.find(
      (currencyList) => currencyList.id === currency
    );
  }

  buildSaveAccountingEventPayload(): AccountingEventPayload {
    const financialData = this.financialData?.financialFormData;
    const scheduleDetails = this.scheduleDetails;
    const termsValue = this.termsValue;
    const classificationData = this.classificationData?.classificationFormData;
    const { leaseRecognitionScheduleId, copiedFromScheduleId } =
      this.getScheduleIdentifiers();
    return {
      accountingEvent: {
        leaseRecognitionScheduleID: leaseRecognitionScheduleId,
        leaseRecognitionID: +this.financialData.leaseRecognitionID,
        masterScheduleID: this.eventsGridData?.masterScheduleID ?? null,
        measureEvent: this.measureEvent,
        remeasureTypeID:
          this.pageMode === 'Edit Event'
            ? this.accountingEventsData.remeasureTypeID
            : +this.queryParams.remeasureTypeId || 0,
        copiedFromScheduleID: copiedFromScheduleId,
        isActive: true,
        isPublished: true,
        totalAmount: this.paymentsData?.undiscountedAmount,
        classificationID: scheduleDetails.classificationId[0],
        journalEntryProfileID: scheduleDetails.journalEntryProfile[0],
        beginDate: this.addEditScheduleService.toShortDateString(
          scheduleDetails.accountingEventBeginDate
        ),
        endDate: this.addEditScheduleService.toShortDateString(
          scheduleDetails.accountingEventEndDate
        ),
        fromDateOptionID: scheduleDetails.termBegin.isFormItem
          ? 1
          : scheduleDetails.termBegin.optionID,
        toDateOptionID: scheduleDetails.termEnd.isFormItem
          ? 1
          : scheduleDetails.termEnd.optionID,
        fromDateFormItemID: scheduleDetails.termBegin.formItemID,
        toDateFormItemID: scheduleDetails.termEnd.formItemID,
        includeFromFirst: scheduleDetails.notFirstDayOfTheMonth || false,
        firstMonthOverwriteDate: scheduleDetails.notFirstDayOfTheMonth
          ? this.addEditScheduleService.toShortDateString(
              new Date(
                new Date(
                  scheduleDetails.accountingEventBeginDate
                ).getFullYear(),
                new Date(scheduleDetails.accountingEventBeginDate).getMonth(),
                1
              )
            )
          : null,
        termInDays: +termsValue.termInDays || 0,
        termInPeriods: +termsValue.termInPeriods || 0,
        termInMonths: +termsValue.termInMonths || 0,
        termInYears: +termsValue.termInYear || 0,
        termString: termsValue.termString || '',
        isReportingException: scheduleDetails.reportingExceptions[0] !== 0,
        exceptionReason: scheduleDetails.reportingExceptions[0] ?? 0,
        exceptionOtherReason: scheduleDetails.reportingExceptionReason ?? '',
        isImpaired: scheduleDetails.isImpaired || false,
        comments: scheduleDetails.detailsSectionComments || '',
        test1:
          classificationData?.classificationTest1?.[0] === 1
            ? true
            : classificationData?.classificationTest1?.[0] === 0
            ? false
            : null,
        test2:
          classificationData?.classificationTest2?.[0] === 1
            ? true
            : classificationData?.classificationTest2?.[0] === 0
            ? false
            : null,
        test3: classificationData?.classificationTest3?.[0] || 0.0,
        test4: classificationData?.classificationTest4?.[0] || 0.0,
        test5:
          classificationData?.classificationTest5?.[0] === 1
            ? true
            : classificationData?.classificationTest5?.[0] === 0
            ? false
            : null,
        classificationTestResult:
          this.classificationData?.classificationTestResult ?? null,
        classificationTestResultReason:
          this.classificationData?.classificationTestResultReason ?? null,
        isClassificationTestResultMatched:
          this.classificationData.isClassificationTestResultMatched ?? null,
        economicLifeYears: +classificationData?.remainingEconomicLife || null,
        fmv: classificationData?.fairMarketValue || null,
        implicitRate:
          this.calculateValuesResponseData.implicitRate != null
            ? +this.calculateValuesResponseData.implicitRate.toFixed(14)
            : null,
        residualValues: this.residualValues,
        amortizationMethodTypeID:
          this.portfolioSettings?.amortizationMethodType,
        amortizationProfileID:
          financialData?.amortizationProfile < 0
            ? -1
            : financialData?.amortizationProfile ?? 0,
        manualProfileName: financialData?.manualAmortizationProfileName ?? '',
        isIncome: financialData?.chargeType !== 'Expense',
        overrideProfile: financialData?.overrideAmortizationProfile,
        discountRateProfileID: financialData?.discountRateProfile[0] ?? -1,
        discountRate: Number(financialData?.discountRate) ?? 0,
        discountRateTypeID: 2,
        annualRateTypeID: Array.isArray(financialData?.annualRateDropdown)
          ? financialData?.annualRateDropdown[0]
          : financialData?.annualRateDropdown,
        effectiveRate: Number(this.financialData.effectiveRate) ?? 0,
        modificationImpactsScope: financialData?.modificationImpactScope,
        localCurrencyID: this.scheduleCurrency.exchangeRateID,
        localCurrency: this.scheduleCurrency.targetCurrency,
        localCurrencyDecimalPrecision: this.scheduleCurrency.decimalPrecision,
        functionalCurrencyID: this.functionalCurrency.exchangeRateID,
        functionalCurrency: this.functionalCurrency.targetCurrency,
        functionalCurrencyDecimalPrecision:
          this.functionalCurrency.decimalPrecision,
        functionalCurrencyRate: financialData?.currencyRate,

        //   functionalCurrencyID: this.portfolioSettings?.functionalCurrencyEnabled
        //   ? this.functionalCurrency.exchangeRateID
        //   : -1,
        // functionalCurrency: this.portfolioSettings?.functionalCurrencyEnabled
        //   ? this.functionalCurrency.targetCurrency
        //   : 'BlankCurrency',
        // functionalCurrencyDecimalPrecision: this.portfolioSettings
        //   ?.functionalCurrencyEnabled
        //   ? this.functionalCurrency.decimalPrecision
        //   : 0,
        rouAssetMethodID: Array.isArray(financialData?.ROUMethod)
          ? financialData?.ROUMethod[0]
          : financialData?.ROUMethod,
        rouAssetObtainedAmount: +financialData?.ROUAmount,
        rouAssetObtainedDate: this.addEditScheduleService.toShortDateString(
          financialData?.ROUActionDate
        ),
        functionalROUAssetObtainedAmount:
          this.calculateValuesResponseData.functionalROUAssetObtainedAmount,
        openingAssetBalance:
          this.calculateValuesResponseData.openingAssetBalance ?? 0.0,
        functionalOpeningAssetBalance:
          this.calculateValuesResponseData.functional_OpeningAssetBalance ??
          0.0,
        openingBalance:
          this.calculateValuesResponseData.openingAssetBalance ?? 0.0,
        overrideOpeningBalance: false,
        previousAssetBalance:
          this.calculateValuesResponseData.previousAssetBalance ?? 0.0,
        systemAssetAdjustment:
          this.calculateValuesResponseData.systemAssetAdjustment ?? 0.0,
        manualAssetAdjustment: this.manualAssetAdjustment ?? 0.0,
        adjustmentAmount: this.calculateValuesResponseData.adjustment ?? 0.0,
        levelExpense: this.calculateValuesResponseData.levelExpense ?? 0.0,
        functionalLevelExpense:
          this.calculateValuesResponseData.functional_LevelExpense ?? 0.0,
        directCosts: this.calculateValuesResponseData.directCostsTotal ?? 0.0,
        functionalDirectCosts:
          this.calculateValuesResponseData.functional_DirectCostsTotal ?? 0.0,
        presentValue: this.calculateValuesResponseData.presentValue ?? 0.0,
        compoundFrequencyType: this.compoundFrequency,
        paymentInArrears: this.paymentTiming === 2,
        openingLiabilityBalance:
          this.calculateValuesResponseData.openingLiabilityBalance ?? 0.0,
        previousLiabilityBalance:
          this.calculateValuesResponseData.previousLiabilityBalance ?? 0.0,
        liabilityAdjustmentAmount:
          this.calculateValuesResponseData.liabilityAdjustmentAmount ?? 0.0,
        adjustmentGainLoss:
          this.calculateValuesResponseData.adjustmentGainLoss ?? 0.0,
        functionalAdjustmentGainLoss:
          this.calculateValuesResponseData.functional_AdjustmentGainLoss,
        terminationFee: this.paymentsData?.terminationFee ?? 0.0,
        functionalTerminationFee:
          this.calculateValuesResponseData.functional_TerminationFee ?? 0.0,
        // assetAdjustmentAmount:
        // this.calculateValuesResponseData.assetAdjustmentAmount ?? 0.0,
        // straightLineExpense:
        // this.calculateValuesResponseData.straightLineExpense ?? 0.0,
        // straightLineExpenseDaily:
        // this.calculateValuesResponseData.straightLineExpenseDaily ?? 0.0,
        assetAmortization:
          this.calculateValuesResponseData.assetAmortization ?? 0.0,
        functionalAssetAmortization:
          this.calculateValuesResponseData.functional_AssetAmortization ?? 0.0,
      },
      calculationSupports: this.calculationSupport,
    };
  }

  buildCalculateValuePayload(): CalculateValues {
    const scheduleCurrency = this.getCurrencyDetails(
      Array.isArray(this.financialData?.financialFormData.localCurrency)
        ? this.financialData?.financialFormData.localCurrency[0]
        : this.financialData?.financialFormData.localCurrency
    );
    const functionalCurrency = this.getCurrencyDetails(
      Array.isArray(this.financialData?.financialFormData?.functionalCurrency)
        ? this.financialData?.financialFormData?.functionalCurrency[0]
        : this.financialData?.financialFormData?.functionalCurrency
    );
    const { leaseRecognitionScheduleId, copiedFromScheduleId } =
      this.getScheduleIdentifiers();

    return {
      leaseRecognitionScheduleId: leaseRecognitionScheduleId,
      copiedFromScheduleId: copiedFromScheduleId,
      leaseAbstractId: +localStorage.getItem('accSumLeaseAbstractId'),
      classificationId: this.scheduleDetails.classificationId[0],
      remeasureTypeId:
        this.pageMode === 'Edit Event'
          ? this.accountingEventsData.remeasureTypeID
          : +this.queryParams.remeasureTypeId || 0,
      calendarId: this.portfolioSettings.leaseRecognitionCalendarID ?? 1,
      termBegin: this.addEditScheduleService.toShortDateString(
        this.scheduleDetails.accountingEventBeginDate
      ),
      termEnd: this.addEditScheduleService.toShortDateString(
        this.scheduleDetails.accountingEventEndDate
      ),
      includeFromFirst: this.scheduleDetails.notFirstDayOfTheMonth ?? false,
      termInPeriods: this.termsValue.termInPeriods ?? 0,
      termInDays: this.termsValue.termInDays ?? 0,
      termInYears: +this.termsValue.termInYear || 0,
      isIncome: this.financialData.financialFormData.chargeType !== 'Expense',
      scheduleCurrency: {
        exchangeRateID: scheduleCurrency.id,
        targetCurrency: scheduleCurrency.name,
        decimalPrecision: scheduleCurrency.decimalPrecision,
      },

      functionalCurrency: this.portfolioSettings?.functionalCurrencyEnabled
        ? {
            exchangeRateID: functionalCurrency.id ?? 0,
            targetCurrency: functionalCurrency.name ?? 'Currency',
            decimalPrecision: functionalCurrency.decimalPrecision ?? 0,
          }
        : undefined,

      functionalCurrencyRate:
        +this.financialData.financialFormData.currencyRate,
      manualAssetAdjustment: this.manualAssetAdjustment ?? 0,
      discountRate: +this.financialData.financialFormData.discountRate,
      compoundFrequencyTypeId: this.compoundFrequency,
      paymentInArrears: this.paymentTiming === 2,
      annualRateTypeId: Array.isArray(
        this.financialData.financialFormData.annualRateDropdown
      )
        ? this.financialData.financialFormData.annualRateDropdown[0]
        : this.financialData.financialFormData.annualRateDropdown,
      effectiveRate: +this.financialData.effectiveRate,
      amortizationMethodTypeId: this.portfolioSettings.amortizationMethodType,
      isImpaired: this.scheduleDetails?.isImpaired ?? false,
      totalAmount: +this.paymentsData?.undiscountedAmount || 0,
      directCosts: this.paymentsData?.directCostAmount ?? 0,
      terminationFee: this.paymentsData?.terminationFee ?? 0,
      economicLifeYears:
        +this.classificationData?.classificationFormData
          ?.remainingEconomicLife || 0,
      FMV:
        +this.classificationData?.classificationFormData?.fairMarketValue || 0,
      test1:
        this.classificationData?.classificationFormData
          ?.classificationTest1?.[0] === 1
          ? true
          : this.classificationData?.classificationFormData
              ?.classificationTest1?.[0] === 0
          ? false
          : null,
      test2:
        this.classificationData?.classificationFormData
          ?.classificationTest2?.[0] === 1
          ? true
          : this.classificationData?.classificationFormData
              ?.classificationTest2?.[0] === 0
          ? false
          : null,
      test5:
        this.classificationData?.classificationFormData
          ?.classificationTest5?.[0] === 1
          ? true
          : this.classificationData?.classificationFormData
              ?.classificationTest5?.[0] === 0
          ? false
          : null,
      residualValues: {
        doesLessorExplicitlyExemptLessee:
          this.RVData.lessorExplicitlyExemptsLessee || false,
        residualValueGuaranteedBy3rdParty:
          +this.RVData.rvGuaranteedBy3rdParty || 0,
        residualValue: +this.RVData.rvGuaranteed || 0,
        estimatedResidualValue: +this.RVData.estimatedResidualValue || 0,
        guaranteedAmtReflectedInPayments:
          +this.RVData.guaranteedAmountReflected || 0,
      },
      selectedPayments: this.paymentsData?.selectedPayments || [],
      pageMode: this.pageMode,
    };
  }

  buildPresentValueExportPayload(values: any) {
    this.addEventFormService.presentValuePayload$.next({
      leaseAbstractId: values.leaseAbstractId,
      classificationId: values.classificationId,
      isIncome: values.isIncome,
      leaseRecognitionScheduleId: values.leaseRecognitionScheduleId,
      copiedFromScheduleId: values.copiedFromScheduleId,
      remeasureTypeId: values.remeasureTypeId,
      fromDate: values.termBegin,
      toDate: values.termEnd,
      isFirstMonthOverwrite: values.includeFromFirst,
      compoundFrequencyTypeId: values.compoundFrequencyTypeId,
      paymentInArrears: values.paymentInArrears,
      amortizationProfileName:
        this.financialData.financialFormData.manualAmortizationProfileName,
      annualRateTypeId: values.annualRateTypeId,
      discountRate: values.discountRate,
      amountProbableOfBeingOwedByLessee:
        values.residualValues.amountProbableOfBeingOwedByLessee,
      liabilityAdjustmentAmount: values.liabilityAdjustmentAmount,
      scheduleCurrency: values.scheduleCurrency,
      selectedPayments: values.selectedPayments,
    });
    this.addEventFormService.presentValueEnabled$.next(true);
  }

  private getCommonDropDowns() {
    this.subscription$.add(
      this.addEditScheduleService
        .getCommonDropdowns()
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.commonDropdowns = response.data;
            this.addEventFormService.setCommonDropdownsData(response.data);
            this.amortizationProfiles = response.data.amortizationProfiles;
            this.currencyList = response.data.currencies;
            this.rouAssetMethodsList = response.data.rouAssetMethods;
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  /**
   * Goes back to the Accounting Summary Page
   *
   * @memberof AddEventComponent
   */
  navigateToAccountingSummaryPage(): void {
    this.addEditScheduleService.clearAllToastMessages();
    this.subscription$.add(
      this.accountingSummaryService.getLeaseInfo().subscribe(
        (res) => {
          if (res.success) {
            const queryParams: { [key: string]: any } = {};
            queryParams['otid'] = res.data.objectTypeID ?? null;
            queryParams['oid'] = res.data.leaseAbstractID ?? null;
            queryParams['ottid'] = res.data.objectTypeTypeID ?? undefined;
            queryParams['navpageid'] =
              this.accountingSummaryService.getNavPageId();
            this.addEventFormService.manualAssetAdjustment$.next(0);
            this.router.navigate(['/crem/accounting/summary'], {
              relativeTo: this.activatedRoute,
              queryParams: queryParams,
            });
          }
        },
        (error) => {
          console.error('An error occurred: ', error);
        }
      )
    );
  }

  private getClassificationSettings() {
    this.subscription$.add(
      this.addEditScheduleService
        .getClassificationSettings()
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.classificationSettings = response.data;
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  private getAccountingEventsData() {
    this.subscription$.add(
      this.addEditScheduleService
        .getAccountingEventData(this.scheduleId)
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.accountingEventsData = response.data;
            this.accountingEventsData.priorROUAssetObtainedAmount =
              this.eventsGridData.priorROUAssetObtainedAmount ?? 0;
            this.pageMode === 'Add Event'
              ? this.addEventFormService.setCompoundFrequency(
                  this.portfolioSettings.defaultCompoundFrequencyType
                )
              : this.addEventFormService.setCompoundFrequency(
                  this.accountingEventsData.compoundFrequencyType
                );
            this.pageMode === 'Add Event'
              ? this.addEventFormService.setPaymentTiming(
                  this.portfolioSettings.defaultPaymentTimingType
                )
              : this.addEventFormService.setPaymentTiming(
                  this.accountingEventsData.paymentInArrears === true ? 2 : 1
                );
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  private getEventDateOptions() {
    this.subscription$.add(
      this.addEditScheduleService
        .getDateOptions()
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.eventDateOptions = response.data;
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  onClassificationChanged(classificationId: number) {
    this.classificationId = classificationId;
    if (this.accordion) {
      this.accordion.isOpen = false;
    }
  }

  scheduleDetailsDataChanged(data: any) {
    this.scheduleDetailsData = data;
    if (data.isDayOne && this.pageMode == 'Remeasure Event') {
      this.addEventFormService.DayOneRemeasure$.next(true);
    } else {
      this.addEventFormService.DayOneRemeasure$.next(false);
    }
  }

  closeFunctionalRatePopup() {
    this.calculateWithFunctionalRate1 = false;
    this.isFunctionalRate1 = !this.isFunctionalRate1;
  }

  continueToCalculate() {
    this.calculateWithFunctionalRate1 = true;
    this.calculateValues();
    this.isFunctionalRate1 = !this.isFunctionalRate1;
  }

  closeRemeasuringFromDay1Popup() {
    this.openDay1DayxRemeasurePopup = !this.openDay1DayxRemeasurePopup;
  }

  editPreviousSchedule() {
    const queryParams = {
      eventId: this.eventsGridData.leaseRecognitionScheduleID,
    };
    this.router.navigate(['/crem/accounting/summary/editEvent'], {
      queryParams: queryParams,
    });
    this.addEditScheduleService.clearAllToastMessages();
  }
}
