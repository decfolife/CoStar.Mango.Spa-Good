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
import { previousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';
import {
  AmortizationProfile,
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
import { CalculateValuesResponse } from '@accounting-summary/models/interfaces/calculate-values-response.interfaces';

@Component({
  selector: 'mango-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnDestroy, OnInit {
  classificationId: any;

  componentName = 'add-edit';
  isSaveDisabled = true;
  isCalculateValuesDisabled = false;
  pageMode = '';
  eventsGridData: previousAccountingEvent;
  measureEvent: string;
  queryParams: any;
  commonDropdowns: any;
  amortizationProfiles: AmortizationProfile[];
  currencyList: Currency[];
  rouAssetMethodsList: LookupOption[];
  scheduleId: number;
  classificationSettings: classificationSettingResponse;
  portfolioSettings: PortfolioSettingsResponse;
  accountingEventsData: previousAccountingEvent;
  eventDateOptions: EventDateOptions[];
  userInfo: UserInfoResponse;
  scheduleDetailsData: any;
  private mySubscriptions$ = new Subject<void>();
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
  residualValues: any;
  scheduleCurrency: any;
  functionalCurrency: any;
  calculateValuesResponseData: CalculateValuesResponse;
  isSaveAndCloseClicked: boolean;
  isApplyClicked: boolean;
  isApplyDisabled = true;
  debounceTime = 300;
  private subscription$ = new Subscription();

  @ViewChild('accordion') accordion: any;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    public location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private addEventFormService: AddEventFormService,
    public addEditScheduleService: AddEditScheduleService,
    public cdRef: ChangeDetectorRef,
    private toastService: CremToastService
  ) {
    this.getCommonDropDowns();
    this.getClassificationSettings();
    this.getPortfolioSetting();
    this.getEventDateOptions();
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.addEventFormService.setCalculateValueResponse(null);
  }

  ngOnInit() {
    this.getFormsData();
    this.getCalculateValueData();
    this.populateChargeDateRangeOptions();
    this.initializeRouteData();
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
      this.addEventFormService.setaccountingEventData(
        this.accountingEventsData
      );
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
    this.addEventFormService.calculateValuesResponseData$
      .pipe(takeUntil(this.mySubscriptions$), debounceTime(this.debounceTime))
      .subscribe((calculateValuesResponseData) => {
        this.calculateValuesResponseData = calculateValuesResponseData;
        this.calculationSupport =
          calculateValuesResponseData?.calculationSupports;
        this.residualValues = calculateValuesResponseData?.residualValues;
        this.scheduleCurrency =
          calculateValuesResponseData?.calculationSupports?.scheduleCurrency;
        this.functionalCurrency =
          calculateValuesResponseData?.calculationSupports?.functionalCurrency;
      });
  }

  getFormsData() {
    combineLatest([
      this.addEventFormService.scheduleDetailsFormData$,
      this.addEventFormService.classificationFormData$,
      this.addEventFormService.RVFormFormData$,
      this.addEventFormService.financialFormData$,
      this.addEventFormService.paymentAmountsData$,
      this.addEventFormService.termValues$,
      this.addEventFormService.compoundFrequency,
      this.addEventFormService.paymentTiming,
      this.addEventFormService.manualAssetAdjustment,
    ])
      .pipe(takeUntil(this.mySubscriptions$), debounceTime(this.debounceTime))
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
          this.isCalculateValuesDisabled = false;
          this.isSaveDisabled = true;
          this.isApplyDisabled = true;
        }
      );
  }

  calculateValues() {
    if (!this.calculateAndSaveValidation()) {
      return;
    } else {
      const addEditSchedulePayload = this.buildCalculateValuePayload();
      this.subscription$.add(
        this.addEditScheduleService
          .calculateValues(addEditSchedulePayload)
          .subscribe((response) => {
            if (response === null) {
              this.accountingSummaryService.displayContactSystemAdminMessage();
            } else if (response.success) {
              this.addEventFormService.setCalculateValueResponse(response.data);
              this.isCalculateValuesDisabled = true;
              this.isSaveDisabled = false;
              this.isApplyDisabled = false;
            } else {
              this.accountingSummaryService.errorNotify(
                response.clientErrorMessage
              );
            }
          })
      );
    }
  }

  saveSchedule() {
    const saveAccountingEventPayload = this.buildSaveAccountingEventPayload();
    return this.addEditScheduleService.saveAccountingEvent(
      saveAccountingEventPayload
    );
  }

  saveAndClose() {
    if (!this.calculateAndSaveValidation()) {
      return;
    } else {
      this.isSaveAndCloseClicked = true;
      this.isSaveDisabled = true;
      this.isApplyDisabled = true;
      this.saveSchedule().subscribe((response) => {
        if (response === null) {
          this.accountingSummaryService.displayContactSystemAdminMessage();
          this.isSaveAndCloseClicked = false;
        } else if (response.success) {
          this.createdScheduleID = response.data;
          this.accountingSummaryService.selectNewSchedule(
            this.createdScheduleID
          );
          this.isSaveAndCloseClicked = false;
          this.isSaveDisabled = false;
          this.isApplyDisabled = false;
          this.navigateToAccountingSummaryPage();
        } else {
          this.accountingSummaryService.errorNotify(
            response.clientErrorMessage
          );
          this.isApplyClicked = false;
        }
      });
    }
  }

  applyChanges() {
    if (!this.calculateAndSaveValidation()) {
      return;
    } else {
      this.isApplyClicked = true;
      this.isSaveDisabled = true;
      this.isApplyDisabled = true;
      this.saveSchedule().subscribe((response) => {
        if (response === null) {
          this.accountingSummaryService.displayContactSystemAdminMessage();
          this.isApplyClicked = false;
        } else if (response.success) {
          this.createdScheduleID = response.data;
          this.accountingSummaryService.selectNewSchedule(
            this.createdScheduleID
          );
          this.isApplyClicked = false;
          this.isSaveDisabled = false;
          this.isApplyDisabled = false;
          if (this.createdScheduleID) {
            const queryParams = {
              eventId: this.createdScheduleID,
            };
            this.router.navigate(['/crem/accounting/summary/editEvent'], {
              state: { data: 'Initial' },
              relativeTo: this.activatedRoute,
              queryParams: queryParams,
            });
          }
        } else {
          this.accountingSummaryService.errorNotify(
            response.clientErrorMessage
          );
          this.isApplyClicked = false;
        }
      });
    }
  }

  calculateAndSaveValidation() {
    if (
      !this.accountingEventSelector ||
      this.accountingEventSelector.length === 0
    ) {
      return true;
    }
    this.addEditScheduleService.clearMessages();
    const classificationID = this.scheduleDetails.classificationId[0];
    const amortizationProfileID =
      this.financialData.financialFormData.amortizationProfile?.[0];

    const isScheduleDuplicate = this.accountingEventSelector.some(
      (item) =>
        item.classificationID === classificationID &&
        item.amortizationProfileID === amortizationProfileID
    );

    if (isScheduleDuplicate && this.pageMode === 'Add Event') {
      this.addEditScheduleService.showError(
        'Validation Error',
        'A schedule with this classification and amortization profile already exists.'
      );
      return false;
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
    const RVData = this.RVData;

    return {
      accountingEvent: {
        leaseRecognitionScheduleID: null,
        leaseRecognitionID: +this.financialData.leaseRecognitionID,
        masterScheduleID: this.eventsGridData?.masterScheduleID ?? null,
        measureEvent: this.measureEvent,
        remeasureTypeID: +this.queryParams.remeasureTypeId || 0,
        copiedFromScheduleID: +this.queryParams.eventId || null,
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
        test1: classificationData?.classificationTest1?.[0] === 1 || false,
        test2: classificationData?.classificationTest2?.[0] === 1 || false,
        test3: classificationData?.test3 || 0.0,
        test4: classificationData?.test4 || 0.0,
        test5: classificationData?.classificationTest5?.[0] === 1 || false,
        classificationTestResult:
          this.classificationData?.classificationTestResult ?? null,
        classificationTestResultReason:
          this.classificationData?.classificationTestResultReason ?? null,
        isClassificationTestResultMatched:
          this.classificationData.isClassificationTestResultMatched ?? null,
        economicLifeYears: classificationData?.remainingEconomicLife || null,
        fmv: classificationData?.fairMarketValue || null,
        implicitRate: +classificationData?.implicitRate || null,

        residualValues: {
          estimatedResidualValue: +RVData.estimatedResidualValue || 0.0,
          guaranteedResidualValue: +RVData.rvGuaranteed || 0.0,
          guaranteedAmtReflectedInPayments:
            +RVData.guaranteedAmountReflected || 0.0,
          rvGuaranteedBy3rdParty: +RVData.rvGuaranteedBy3rdParty || 0.0,
          doesLessorExplicitylyExemptLessee:
            RVData.lessorExplicitlyExemptsLessee || false,
          rvGuaranteedByLessee: +RVData.rvGuaranteedByLessee || 0.0,
          amountProbableOfBeingOwedByLessee:
            +RVData.amountProbableBeingOwedByLessee || 0.0,
          unguaranteedResidualValue: +RVData.unguaranteedResidualValue || 0.0,
          amtNotReflectedInPVofPayments:
            +RVData.amountNotReflectedPVPayments || 0.0,
          pVofAmtNotReflectedInPayments:
            +RVData.pvAmountNotReflectedInPayments || 0.0,
        },

        amortizationMethodTypeID:
          this.portfolioSettings?.amortizationMethodType,
        amortizationProfileID:
          financialData?.amortizationProfile?.[0] < 0
            ? -1
            : financialData?.amortizationProfile?.[0] ?? 0,
        manualProfileName: financialData?.manualAmortizationProfileName ?? '',
        isIncome: financialData?.chargeType !== 'Expense',
        overrideProfile: financialData?.overrideAmortizationProfile || false,
        discountRateProfileID: financialData?.discountRateProfile[0] ?? -1,
        discountRate: Number(financialData?.discountRate) ?? 0,
        discountRateTypeID: 2,
        annualRateTypeID: financialData?.annualRateDropdown[0],
        effectiveRate: Number(this.financialData.effectiveRate) ?? 0,
        modificationImpactsScope: financialData?.modificationImpactScope,
        localCurrencyID: this.scheduleCurrency.exchangeRateID,
        localCurrency: this.scheduleCurrency.targetCurrency,
        localCurrencyDecimalPrecision: this.scheduleCurrency.decimalPrecision,
        functionalCurrencyID: this.portfolioSettings?.functionalCurrencyEnabled
          ? this.functionalCurrency.exchangeRateID
          : -1,
        functionalCurrency: this.portfolioSettings?.functionalCurrencyEnabled
          ? this.functionalCurrency.targetCurrency
          : 'BlankCurrency',
        functionalCurrencyDecimalPrecision: this.portfolioSettings
          ?.functionalCurrencyEnabled
          ? this.functionalCurrency.decimalPrecision
          : 0,
        functionalCurrencyRate: financialData?.currencyRate,
        rouAssetMethodID: financialData?.ROUMethod[0],
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
        terminationFee: this.calculateValuesResponseData.terminationFee ?? 0.0,
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
    return {
      leaseRecognitionScheduleId: null,
      copiedFromScheduleId: +this.queryParams.eventId || null,
      leaseAbstractId: +localStorage.getItem('accSumLeaseAbstractId'),
      classificationId: this.scheduleDetails.classificationId[0],
      remeasureTypeId: +this.queryParams.remeasureTypeId || 0,
      calendarId: this.portfolioSettings.leaseRecognitionCalendarID ?? 1,
      termBegin: this.addEditScheduleService.toShortDateString(
        this.scheduleDetails.accountingEventBeginDate
      ),
      termEnd: this.addEditScheduleService.toShortDateString(
        this.scheduleDetails.accountingEventEndDate
      ),
      includeFromFirst: this.scheduleDetails.notFirstDayOfTheMonth ?? false,
      termInPeriods: this.termsValue.termInPeriods || 0,
      termInDays: this.termsValue.termInDays || 0,
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
      annualRateTypeId:
        this.financialData.financialFormData.annualRateDropdown[0],
      effectiveRate: +this.financialData.effectiveRate,
      amortizationMethodTypeId: this.portfolioSettings.amortizationMethodType,
      isImpaired: this.scheduleDetails?.isImpaired || false,
      totalAmount: +this.paymentsData?.adjustmentAmount || 0,
      directCosts: this.paymentsData?.directCostAmount ?? 0,
      terminationFee: this.paymentsData?.terminationFee ?? 0,
      FMV:
        +this.classificationData?.classificationFormData?.fairMarketValue || 0,
      rouAssetObtainedAmount:
        +this.financialData.financialFormData.ROUAmount || 0,
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
    };
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
            this.addEventFormService.manualAssetAdjustment.next(0);
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

  private getPortfolioSetting() {
    this.subscription$.add(
      this.accountingSummaryService
        .getPortfolioSettings()
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.portfolioSettings = response.data;
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
  }

  getUserInfo() {
    this.subscription$.add(
      this.accountingSummaryService.getUserInformation().subscribe((res) => {
        if (res === null) {
          this.accountingSummaryService.displayContactSystemAdminMessage();
        } else if (res.success) {
          this.userInfo = res.data;
        } else {
          this.accountingSummaryService.errorNotify(res.clientErrorMessage);
        }
      })
    );
  }
}
