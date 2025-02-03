import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';
import {
  ButtonModule,
  CardModule,
  DatePickerModule,
  DropdownModule,
  InputComponent,
  InputLabelComponent,
  ToggleSliderComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CremRadioComponent,
  CremRadioGroupComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { combineLatest, Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { CheckBoxComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/checkbox';
import { CompositeDropdownModule } from 'libs/ui-shared/lib-ui-elements/src/lib/composite-dropdown';
import { LeaseInfoResponse } from '@accounting-summary/models/lease-info-response.modal';
import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';
import { FunctionalCurrencyRateLookupResponse } from '@accounting-summary/models/functional-currency-rate-lookup.model';
import {
  AmortizationProfile,
  Currency,
  DiscountRateProfile,
  ROUAssetMethod,
} from '@accounting-summary/models/common-dropdowns.model';
import { PreviousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
import { classificationSettingResponse } from '@accounting-summary/models/classification-settings-response.modal';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import {
  DxDropDownBoxModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { BalanceCardsContainerComponent } from './balance-cards-container/balance-cards-container/balance-cards-container.component';

@Component({
  selector: 'mango-financial-card',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    CremRadioComponent,
    CremRadioGroupComponent,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputLabelComponent,
    InputComponent,
    ToggleSliderComponent,
    DatePickerModule,
    CompositeDropdownModule,
    CheckBoxComponent,
    DxSelectBoxModule,
    DxDropDownBoxModule,
    DxNumberBoxModule,
    BalanceCardsContainerComponent,
  ],
  templateUrl: './financial-card.component.html',
  styleUrls: ['./financial-card.component.scss'],
})
export class FinancialCardComponent implements OnChanges, OnInit, OnDestroy {
  @Input() pageMode: string;
  @Input() classificationId: number;
  @Input() accountingEventsData: PreviousAccountingEvent;
  @Input() amortizationProfiles: AmortizationProfile[];
  @Input() classificationSettings: classificationSettingResponse[];
  @Input() scheduleDetailsData: any;
  @Input() measureEvent: string;
  @Input() currencyList: Currency[];
  @Input() rouAssetMethodsList: ROUAssetMethod[];

  functionalCurrencyRateLookup: FunctionalCurrencyRateLookupResponse;
  discountRateOptions: DiscountRateProfile[];
  effectiveRate: number;

  private subscription = new Subscription();
  private formSubscription$ = new Subject<void>();
  private profileIDCounter = -2;
  title = 'Financials';
  componentName = 'financials';
  amortizationProfileList: any;
  amortizationInitialSelected: number;
  rouMethodIDSelected: number;
  amortizationSubTitle: string;
  financialForm: FormGroup;
  discountRateSubTitle: string;
  currencySubTitle: string;
  ROUAssetsObtainedSubTitle: string;
  leaseInformation: LeaseInfoResponse = JSON.parse(
    localStorage.getItem('titleLeaseInfo') || '{}'
  );
  portfolioSettings: PortfolioSettingsResponse = JSON.parse(
    localStorage.getItem('portfolioSettings') || '{}'
  );

  masterGroupID: number;
  localCurrency: string;
  localCurrencyDecimalPrecision: number;
  functionalCurrency: string;
  termBegin: Date;
  termEnd: Date;
  termInMonths: number;
  selectedBeginDateID = 1;
  selectedAnnualRateType: number;
  selectedDiscountRate: number;
  annualRateType: number;
  discountRate: number;
  glAccountIDsCSV: number[];
  firstDirectEntry: boolean;
  compoundFrequencyType: number;
  selectedLocalCurrency: number;
  selectedFunctionalCurrency: number;
  currencyRate: number;
  showFunctionalCurrency: boolean;
  originalRouAssetMethodsList: ROUAssetMethod[];
  functionalCurrencyRateLookupResultMessage: string;
  functionalCurrencyRateLookupResult: string;
  dateFormat = 'MM/dd/yyyy';
  manualEntryVisible = false;
  amortizationProfileNameRequired = false;
  overrideCheckBoxValue = false;
  functionalCurrencyRateset: string;
  directEntryFunctionalCurrencyRateEnabled: boolean;
  discountRatePlaceHolder = 'Select Discount Rate Profile';
  isROUAmountDisabled: boolean;
  ROUAssetAmount: number;
  amortizationCompositeDropdownValidation: string;
  currencyCompositeDropdownValidation: string;
  discountRateCompositeDropdownValidation: string;
  ROUCompositeDropdownValidation: string;
  totalAdjustment: number;
  private nullDateString = new Date(null).toDateString();

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    public addEditScheduleService: AddEditScheduleService,
    public addEventFormService: AddEventFormService,
    private fb: FormBuilder,
    private formatService: FormattingService,
    public datePipe: DatePipe,
    private facade: MangoAppFacade
  ) {
    this.initialFinancialForm();
    this.getUserInfo();
    this.subscription.add(
      this.addEventFormService.DayOneRemeasure$.subscribe((dayOne) => {
        if (dayOne) {
          this.financialForm.get('ROUMethod').setValue(2);
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.accountingEventsData !== undefined ||
      this.pageMode !== undefined ||
      (this.currencyList !== undefined && this.measureEvent !== undefined)
    ) {
      if (changes.classificationId) {
        this.setCurrencyDropdownSubTitle();
        this.updateRouAssetMethodAndAmountForClassificationConfiguration();
      }

      if (changes.scheduleDetailsData) {
        this.termBegin = this.scheduleDetailsData?.termBegin
          ? new Date(this.scheduleDetailsData?.termBegin)
          : null;
        this.termEnd = this.scheduleDetailsData?.termEnd
          ? new Date(this.scheduleDetailsData?.termEnd)
          : null;
        this.termInMonths = +this.scheduleDetailsData?.termsInMonth;

        if (
          this.termBegin &&
          this.functionalCurrencyRateset !== 'Direct Entry' &&
          this.localCurrency !== this.functionalCurrency
        ) {
          this.getFunctionalCurrencyRateLookup();
        }

        this.getDiscountRateOptions();

        this.validateROUActionDate();
        //When editing a schedule the ROUAsset action date has to be set to the value saved in the database.  This if statement keeps
        //the value from being overwritten when the page is loading.
        let prevValueTermBegin =
          changes.scheduleDetailsData.previousValue?.termBegin !== null
            ? changes.scheduleDetailsData.previousValue?.termBegin.toDateString()
            : '';
        let curValueTermBegin =
          changes.scheduleDetailsData.currentValue?.termBegin !== null
            ? changes.scheduleDetailsData.currentValue?.termBegin.toDateString()
            : '';

        if (
          (changes.scheduleDetailsData.previousValue !== undefined &&
            prevValueTermBegin !== curValueTermBegin) ||
          this.pageMode !== 'Edit Event'
        ) {
          if (this.termBegin?.toDateString() !== this.nullDateString) {
            this.financialForm.get('ROUActionDate').setValue(this.termBegin);
          } else {
            this.financialForm.get('ROUActionDate').reset();
          }
        }
      }

      if (
        this.termBegin?.toDateString() === this.nullDateString &&
        this.accountingEventsData?.fromDateOptionID === 9 &&
        this.termEnd?.toDateString() === this.nullDateString &&
        this.accountingEventsData?.toDateOptionID === 13
      ) {
        //The payments grid need to load in order to fill the term begin and end date when "Earliest Payment Begin Date and
        //Max Payment End Date are selected". We have to call this function in order to execute the function to populate the
        //payments grid. The local currency and charge type are not set yet in the form so we will set it here to get the
        //charges in the payments grid.
        this.executeFinancialFormValueChanges();
      }

      if (changes.amortizationProfiles) {
        this.amortizationProfileList = this.amortizationProfiles?.filter(
          (ProfileName) => ProfileName.isActive
        );
      }

      if (changes.rouAssetMethodsList) {
        this.originalRouAssetMethodsList = this.rouAssetMethodsList;

        if (this.originalRouAssetMethodsList) {
          if (this.measureEvent === 'Initial') {
            this.rouAssetMethodsList = this.originalRouAssetMethodsList.filter(
              (ram) => !ram.isInitialExempt
            );
          } else if (this.measureEvent === 'Impairment') {
            let impairmentIds = [1, 7];
            this.rouAssetMethodsList = this.originalRouAssetMethodsList.filter(
              (ram) => impairmentIds.includes(ram.id)
            );
            if (!!this.masterGroupID) {
              this.rouMethodIDSelected =
                this.returnRouAssetMethodFromClassificationConfiguration();
              this.financialForm
                .get('ROUMethod')
                .setValue(this.rouMethodIDSelected);
            }
          } else {
            this.rouAssetMethodsList = JSON.parse(
              JSON.stringify(this.originalRouAssetMethodsList)
            );
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.handleFormValueChanges();
    this.initializePortfolioSettings();

    if (
      this.pageMode === 'Add Event' &&
      this.scheduleDetailsData &&
      !!this.classificationSettings
    ) {
      this.loadDataForAdd();
    } else if (
      this.pageMode === 'Edit Event' ||
      this.pageMode === 'Remeasure Event'
    ) {
      this.loadDataForEditRemeasure();
    }
  }

  initializePortfolioSettings() {
    this.title = `Financials | ${this.portfolioSettings?.calendarName} | ${
      this.portfolioSettings?.amortizationMethodType === 1
        ? 'Periodic Amortization'
        : 'Daily Amortization'
    }`;
    this.showFunctionalCurrency =
      this.portfolioSettings?.functionalCurrencyEnabled;
    this.directEntryFunctionalCurrencyRateEnabled =
      this.portfolioSettings?.directEntryFunctionalCurrencyRateEnabled;
    this.functionalCurrencyRateset =
      this.portfolioSettings?.functionalCurrencyRateset;
    this.compoundFrequencyType =
      this.portfolioSettings?.defaultCompoundFrequencyType;
    this.masterGroupID = this.portfolioSettings.masterGroupID;
    this.selectedAnnualRateType = this.portfolioSettings.defaultAnnualRateType;
  }

  ngOnDestroy(): void {
    this.addEventFormService.manualAssetAdjustment$?.next(0);
    this.addEventFormService.systemAssetAdjustment$.next(0);
    this.addEventFormService.openingAssetBalance$.next(0);
    this.subscription.unsubscribe();
    this.formSubscription$.next();
    this.formSubscription$.complete();
  }

  initialFinancialForm() {
    this.financialForm = this.fb.group({
      discountRateProfile: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      discountRate: new FormControl({ value: null, disabled: false }, [
        Validators.required,
      ]),
      annualRateDropdown: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      modificationImpactScope: new FormControl({
        value: null,
        disabled: false,
      }),
      localCurrency: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      functionalCurrency: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      isCurrencyDirecEntry: new FormControl({ value: '', disabled: true }),
      financialCurrencyDirectEntry: new FormControl({
        value: false,
        disabled: true,
      }),
      currencyRate: new FormControl({ value: '', disabled: true }),
      ROUMethod: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      ROUAmount: new FormControl({ value: '', disabled: true }, []),
      ROUActionDate: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      amortizationProfile: new FormControl({ value: null, disabled: false }, [
        Validators.required,
      ]),
      chargeType: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      overrideAmortizationProfile: new FormControl({
        value: false,
        disabled: false,
      }),
      manualAmortizationProfileName: new FormControl({
        value: '',
        disabled: false,
      }),
      assetBalanceManualAdjustment: new FormControl({
        value: '',
        disabled: false,
      }),
      presentValueCompoundFrequency: new FormControl({
        value: '',
        disabled: false,
      }),
      presentValuePaymentTiming: new FormControl({
        value: '',
        disabled: false,
      }),
      adjustmentManualAdjustment: new FormControl({
        value: '',
        disabled: false,
      }),
    });
  }

  handleFormValueChanges() {
    const debounce = 300;
    combineLatest([
      this.financialForm.get('localCurrency')?.valueChanges,
      this.financialForm.get('functionalCurrency')?.valueChanges,
    ])
      .pipe(
        filter(
          ([localCurrency, functionalCurrency]) =>
            localCurrency != null && functionalCurrency != null
        ),
        debounceTime(debounce),
        distinctUntilChanged(
          ([prevLocal, prevFunctional], [currLocal, currFunctional]) =>
            prevLocal === currLocal && prevFunctional === currFunctional
        ),
        takeUntil(this.formSubscription$)
      )
      .subscribe(([localCurrencyValue, functionalCurrencyValue]) => {
        const localCurrency = localCurrencyValue[0] ?? localCurrencyValue;
        const functionalCurrency =
          functionalCurrencyValue[0] ?? functionalCurrencyValue;
        if (this.currencyList) {
          const filteredCurrency = this.currencyList.find(
            (currencyList) => currencyList.id === localCurrency
          );
          this.localCurrency = filteredCurrency?.name;
          this.localCurrencyDecimalPrecision =
            filteredCurrency?.decimalPrecision;
          this.updateROUAssetsObtainedSubTitle(
            this.financialForm.get('ROUAmount').value,
            this.financialForm.get('ROUActionDate').value
          );
          const filteredfunctionalCurrency = this.currencyList.find(
            (currencyList) => currencyList.id === functionalCurrency
          );
          this.functionalCurrency = filteredfunctionalCurrency?.name;
        }
        const isSameCurrency = localCurrency === functionalCurrency;
        const currencyRate = isSameCurrency ? 1 : 0;
        if (this.pageMode === 'Edit Event' && this.measureEvent === 'Initial') {
          this.financialForm.get('functionalCurrency').enable();
        }

        if (this.functionalCurrencyRateset === 'Direct Entry') {
          if (this.pageMode === 'Add Event') {
            this.financialForm.get('currencyRate').setValue(1);
          }
          this.financialForm.get('financialCurrencyDirectEntry').disable();
          this.financialForm.get('financialCurrencyDirectEntry').setValue(true);
          isSameCurrency
            ? this.financialForm.get('currencyRate').disable()
            : this.financialForm.get('currencyRate').enable();
        } else if (
          this.functionalCurrencyRateset !== 'Direct Entry' &&
          this.directEntryFunctionalCurrencyRateEnabled
        ) {
          this.financialForm.get('currencyRate').setValue(currencyRate);
          this.financialForm.get('currencyRate').disable();
          this.financialForm.get('financialCurrencyDirectEntry').enable();
          this.financialForm
            .get('financialCurrencyDirectEntry')
            .setValue(false);
          if (
            this.termBegin &&
            this.functionalCurrencyRateset !== 'Direct Entry' &&
            this.localCurrency !== this.functionalCurrency
          ) {
            this.getFunctionalCurrencyRateLookup();
          }
          isSameCurrency
            ? this.financialForm.get('financialCurrencyDirectEntry').enable()
            : this.financialForm.get('financialCurrencyDirectEntry').disable();
        } else if (
          this.functionalCurrencyRateset !== 'Direct Entry' &&
          !this.directEntryFunctionalCurrencyRateEnabled
        ) {
          this.financialForm.get('currencyRate').setValue(currencyRate);
          this.financialForm.get('financialCurrencyDirectEntry').disable();
          this.financialForm
            .get('financialCurrencyDirectEntry')
            .setValue(false);
          if (
            this.termBegin &&
            this.functionalCurrencyRateset !== 'Direct Entry' &&
            this.localCurrency !== this.functionalCurrency
          ) {
            this.getFunctionalCurrencyRateLookup();
          }
        }
        this.setCurrencyDropdownSubTitle();
        if (this.termBegin && this.termInMonths && this.localCurrency) {
          this.getDiscountRateOptions();
        }
      });

    this.financialForm
      .get('currencyRate')
      .valueChanges.pipe(
        debounceTime(debounce),
        takeUntil(this.formSubscription$)
      )
      .subscribe((currencyRate) => {
        this.setCurrencyDropdownSubTitle();
        const localCurrency =
          this.financialForm.get('localCurrency')?.value?.[0];
        const functionalCurrency =
          this.financialForm.get('functionalCurrency')?.value?.[0];
        const isSameCurrency = localCurrency === functionalCurrency;

        let functionalCurrencyRate = Number(currencyRate);

        if (functionalCurrencyRate < 0) {
          functionalCurrencyRate = 0;
          this.financialForm
            .get('currencyRate')
            .setValue(functionalCurrencyRate, { emitEvent: false });
        }

        if (
          !isSameCurrency &&
          functionalCurrencyRate === 0 &&
          this.showFunctionalCurrency &&
          (this.classificationId === 2 ||
            this.classificationId === 3 ||
            this.classificationId === 4)
        ) {
          this.addEditScheduleService.showToast(
            'Functional Currency is Required',
            'Functional Currency Rate is required and cannot be zero.'
          );
          this.addEventFormService.isCalculateValuesDisabled$.next(true);
          this.addEventFormService.isSaveDisabled$.next(true);
          return;
        } else {
          this.addEditScheduleService.clearToastBySummary(
            'Functional Currency is Required'
          );
          this.addEventFormService.isCalculateValuesDisabled$.next(false);
          this.addEventFormService.isSaveDisabled$.next(false);
        }

        // Check if currencyRate has more than 10 decimal places
        const isValidDecimal = !(
          currencyRate.toString().split('.')[1]?.length > 10
        );

        if (!isValidDecimal) {
          this.addEditScheduleService.showToast(
            'Functional Currency Rate',
            'The Functional Currency Rate has greater than 10 decimal places and can cause unexpected failure'
          );
          this.addEventFormService.isCalculateValuesDisabled$.next(true);
          this.addEventFormService.isSaveDisabled$.next(true);
          return;
        } else {
          this.addEditScheduleService.clearToastBySummary(
            'Functional Currency Rate'
          );
          this.addEventFormService.isCalculateValuesDisabled$.next(false);
          this.addEventFormService.isSaveDisabled$.next(false);
        }
      });

    this.financialForm
      .get('modificationImpactScope')
      .valueChanges.pipe(
        debounceTime(debounce),
        takeUntil(this.formSubscription$)
      )
      .subscribe(() => {
        if (this.termBegin && this.termInMonths && this.localCurrency) {
          this.getDiscountRateOptions();
        }
      });

    this.financialForm
      .get('amortizationProfile')
      .valueChanges.pipe(
        debounceTime(debounce),
        takeUntil(this.formSubscription$)
      )
      .subscribe(() => {
        this.setAmortizationSubTitle();
      });

    this.financialForm
      .get('chargeType')
      .valueChanges.pipe(
        debounceTime(debounce),
        takeUntil(this.formSubscription$)
      )
      .subscribe(() => {
        this.setAmortizationSubTitle();
      });

    this.addEventFormService.compoundFrequency$
      .pipe(takeUntil(this.formSubscription$))
      .subscribe((compoundFrequency) => {
        this.compoundFrequencyType = compoundFrequency;
        if (this.discountRate && this.annualRateType) {
          this.getEffectiveRate();
        }
      });

    combineLatest([
      this.financialForm.get('discountRate')?.valueChanges,
      this.financialForm.get('annualRateDropdown')?.valueChanges,
      this.financialForm.get('discountRateProfile')?.valueChanges,
    ])
      .pipe(debounceTime(debounce), takeUntil(this.formSubscription$))
      .subscribe(([discountRate, annualRateDropdown]) => {
        this.discountRate = discountRate;
        this.annualRateType = Array.isArray(annualRateDropdown)
          ? annualRateDropdown[0]
          : annualRateDropdown;
        (discountRate || discountRate === 0) && annualRateDropdown
          ? this.getEffectiveRate()
          : this.setDiscountRateSubTitle();
        const annualRate = discountRate === '' ? null : Number(discountRate);
        if (annualRate === null) {
          this.addEventFormService.isCalculateValuesDisabled$.next(true);
          this.addEventFormService.isSaveDisabled$.next(true);
          return;
        } else {
          this.addEventFormService.isCalculateValuesDisabled$.next(false);
          this.addEventFormService.isSaveDisabled$.next(false);
        }
      });

    combineLatest([
      this.financialForm
        .get('ROUAmount')
        .valueChanges.pipe(debounceTime(debounce)),
      this.financialForm
        .get('ROUActionDate')
        .valueChanges.pipe(debounceTime(debounce)),
    ])
      .pipe(takeUntil(this.formSubscription$))
      .subscribe(([ROUAmount, ROUActionDate]) => {
        this.updateROUAssetsObtainedSubTitle(ROUAmount, ROUActionDate);
      });

    this.subscription.add(
      this.addEventFormService.manualAssetAdjustment$
        .pipe(takeUntil(this.formSubscription$))
        .subscribe(() => {
          if (this.rouMethodIDSelected !== null) {
            const rouMethodName = this.rouAssetMethodsList.find(
              (ram) => ram.id === this.rouMethodIDSelected
            ).name;
            if (rouMethodName === 'Manual Asset Adjustment') {
              this.setROUAmountForROUMethod(rouMethodName);
            }
          }
        })
    );

    this.subscription.add(
      this.addEventFormService.openingAssetBalance$
        .pipe(takeUntil(this.formSubscription$))
        .subscribe(() => {
          if (this.rouMethodIDSelected !== null) {
            const rouMethodName = this.rouAssetMethodsList.find(
              (ram) => ram.id === this.rouMethodIDSelected
            ).name;
            if (rouMethodName === 'Opening Asset Balance') {
              this.setROUAmountForROUMethod(rouMethodName);
            }
          }
        })
    );

    this.subscription.add(
      this.addEventFormService.systemAssetAdjustment$
        .pipe(takeUntil(this.formSubscription$))
        .subscribe(() => {
          if (this.rouMethodIDSelected !== null) {
            const rouMethodName = this.rouAssetMethodsList.find(
              (ram) => ram.id === this.rouMethodIDSelected
            ).name;
            if (rouMethodName === 'System Asset Adjustment') {
              this.setROUAmountForROUMethod(rouMethodName);
            }
          }
        })
    );

    this.subscription.add(
      this.addEventFormService.totalAdjustment$
        .pipe(takeUntil(this.formSubscription$))
        .subscribe((total) => {
          this.totalAdjustment = total;
          if (this.rouMethodIDSelected !== null) {
            const rouMethodName = this.rouAssetMethodsList.find(
              (ram) => ram.id === this.rouMethodIDSelected
            ).name;
            if (rouMethodName === 'Total Asset Adjustment') {
              this.setROUAmountForROUMethod(rouMethodName);
            }
          }
        })
    );

    this.financialForm.valueChanges
      .pipe(debounceTime(debounce), takeUntil(this.formSubscription$))
      .subscribe(() => {
        setTimeout(() => {
          this.executeFinancialFormValueChanges();
        });
      });
  }

  private executeFinancialFormValueChanges() {
    const financialFormUpdate = {
      financialFormData: this.financialForm.getRawValue(),
      glAccountIDsCSV: this.amortizationProfileList,
      localCurrencyName: this.localCurrency,
      localCurrencyDecimalPrecision: this.localCurrencyDecimalPrecision,
      pageMode: this.pageMode,
      measureEvent: this.measureEvent,
      leaseRecognitionScheduleID: this.accountingEventsData
        ? this.accountingEventsData.leaseRecognitionScheduleID
        : null,
      copiedFromScheduleID: this.accountingEventsData
        ? this.accountingEventsData.copiedFromScheduleID
        : null,
      useDateEU: this.dateFormat,
      calendarId: this.portfolioSettings?.leaseRecognitionCalendarID,
      leaseRecognitionID: this.leaseInformation.leaseRecognitionID,
    };
    this.addEventFormService.setFinancialFormData(financialFormUpdate);
    this.financialFormValidation();
  }

  getUserInfo() {
    this.facade.contactRecord$.subscribe((contact) => {
      this.dateFormat = contact.preferences.contactDatesEU
        ? 'dd.MM.yyyy'
        : 'MM/dd/yyyy';
    });
  }

  formatCurrencyInput() {
    return this.formatService.buildCurrencyMask(
      this.localCurrencyDecimalPrecision
    );
  }

  private updateFinancialForm(): void {
    this.financialForm.patchValue({
      localCurrency: this.accountingEventsData?.localCurrencyID ?? '',
      functionalCurrency: this.accountingEventsData?.functionalCurrencyID ?? '',
      currencyRate: this.accountingEventsData?.functionalCurrencyRate ?? 0,
      discountRateProfile: this.accountingEventsData?.discountRateProfileID,
      discountRate: this.accountingEventsData?.discountRate,
      annualRateDropdown: this.accountingEventsData?.annualRateTypeID,
      modificationImpactScope:
        this.accountingEventsData?.modificationImpactsScope ?? false,
      amortizationProfile: this.accountingEventsData?.amortizationProfileID,
      manualAmortizationProfileName:
        this.accountingEventsData?.manualProfileName,
      overrideAmortizationProfile: this.accountingEventsData?.overrideProfile,
      chargeType: this.accountingEventsData?.isIncome ? 'Income' : 'Expense',
      ROUMethod: this.accountingEventsData?.rouAssetMethodID,
      ROUAmount: this.accountingEventsData?.rouAssetObtainedAmount,
      ROUActionDate: this.accountingEventsData?.rouAssetObtainedDate,
    });
  }

  private updateRouAssetMethodAndAmountForClassificationConfiguration() {
    this.rouMethodIDSelected =
      this.returnRouAssetMethodFromClassificationConfiguration();
    this.financialForm.get('ROUMethod').setValue(this.rouMethodIDSelected);
    const rouMethodName =
      this.rouMethodIDSelected === null
        ? null
        : this.rouAssetMethodsList.find(
            (ram) => ram.id === this.rouMethodIDSelected
          ).name;
    this.setROUAmountForROUMethod(rouMethodName);
  }

  private returnRouAssetMethodFromClassificationConfiguration(): number {
    let foundROUAssetMethodID = null;
    const defaultClassificationConfigurations: classificationSettingResponse =
      this.classificationSettings.find(
        (item) =>
          item.masterGroupID === this.masterGroupID &&
          item.classificationID === this.classificationId &&
          item.remeasureTypeName === this.measureEvent
      );

    if (!!defaultClassificationConfigurations) {
      foundROUAssetMethodID =
        defaultClassificationConfigurations.rouAssetMethodID;
    }

    return foundROUAssetMethodID;
  }

  private updateROUAssetsObtainedSubTitle(
    rouAmount: string,
    rouActionDate: Date
  ) {
    let amount = '';
    if (rouAmount !== null && rouAmount !== undefined && rouAmount !== '') {
      amount = this.formatService.localFormat(
        this.formatService.transformLocalFormatToNumber(rouAmount),
        this.localCurrencyDecimalPrecision
      );
    }

    const actionDate = rouActionDate
      ? this.datePipe.transform(rouActionDate, this.dateFormat)
      : '';
    this.ROUAssetsObtainedSubTitle = actionDate
      ? `${amount} | ${actionDate}`
      : amount;
  }

  financialFormValidation() {
    let isCalculateValid = true;
    let isSaveValid = true;

    const amortizationProfile = this.financialForm.get(
      'amortizationProfile'
    ).value;

    const chargeType = this.financialForm.get('chargeType').value;

    const localCurrency = Array.isArray(
      this.financialForm.get('localCurrency').value
    )
      ? this.financialForm.get('localCurrency').value[0]
      : this.financialForm.get('localCurrency').value;
    const functionalCurrency = Array.isArray(
      this.financialForm.get('functionalCurrency').value
    )
      ? this.financialForm.get('functionalCurrency').value[0]
      : this.financialForm.get('functionalCurrency').value;
    const currencyRate = this.financialForm.get('currencyRate').value;

    const discountRateProfile = Array.isArray(
      this.financialForm.get('discountRateProfile').value
    )
      ? this.financialForm.get('discountRateProfile').value[0]
      : this.financialForm.get('discountRateProfile').value;
    const annualRate = this.financialForm.get('discountRate').value;
    const annualRateTypeID = Array.isArray(
      this.financialForm.get('annualRateDropdown').value
    )
      ? this.financialForm.get('annualRateDropdown').value[0]
      : this.financialForm.get('annualRateDropdown').value;

    const ROUMethod = Array.isArray(this.financialForm.get('ROUMethod').value)
      ? this.financialForm.get('ROUMethod').value[0]
      : this.financialForm.get('ROUMethod').value;
    const ROUAmount = this.financialForm.get('ROUAmount').value;
    const ROUActionDate = this.financialForm.get('ROUActionDate').value;

    const initCurrency = this.getLocalCurrencyDetails(localCurrency);

    if (initCurrency) {
      this.addEventFormService.localCurrency$.next(initCurrency.name);
      this.addEventFormService.localCurrencyDecimalPrecision$.next(
        initCurrency.decimalPrecision
      );
    }
    if ((!amortizationProfile && amortizationProfile !== 0) || !chargeType) {
      isSaveValid = false;
      this.amortizationCompositeDropdownValidation = 'error';
    } else {
      this.amortizationCompositeDropdownValidation = 'default';
    }

    if (
      (!currencyRate && currencyRate !== 0) ||
      !functionalCurrency ||
      !localCurrency
    ) {
      isCalculateValid = false;
      isSaveValid = false;
      this.currencyCompositeDropdownValidation = 'error';
    } else {
      this.currencyCompositeDropdownValidation = 'default';
    }

    if (
      (!annualRate && annualRate !== 0) ||
      (!discountRateProfile && discountRateProfile !== 0) ||
      !annualRateTypeID
    ) {
      isCalculateValid = false;
      isSaveValid = false;
      this.discountRateCompositeDropdownValidation = 'error';
    } else {
      this.discountRateCompositeDropdownValidation = 'default';
    }

    if ([2, 3, 4].includes(this.classificationId)) {
      if (
        (!ROUMethod && ROUMethod !== 0) ||
        (!ROUAmount && ROUAmount !== 0) ||
        !ROUActionDate
      ) {
        isSaveValid = false;
        this.ROUCompositeDropdownValidation = 'error';
      } else {
        this.ROUCompositeDropdownValidation = 'default';
      }
      this.addEventFormService.isCalculateValuesDisabled$.next(
        !isCalculateValid
      );
      this.addEventFormService.isSaveDisabled$.next(!isSaveValid);
    }
  }

  private validateROUActionDate() {
    let isSaveValid = true;
    const rouActionDate = this.financialForm.get('ROUActionDate').value;
    if (
      this.termEnd &&
      this.termBegin &&
      [2, 3, 4].includes(this.classificationId)
    ) {
      if (!rouActionDate) {
        return;
      } else if (
        this.measureEvent === 'Initial' &&
        rouActionDate > this.termEnd
      ) {
        this.addEditScheduleService.showToast(
          'ROU Asset Obtained Action Date',
          'The action date has to come before the accounting term end date.'
        );
        isSaveValid = false;
      } else if (
        this.measureEvent !== 'Initial' &&
        (rouActionDate < this.termBegin || rouActionDate > this.termEnd)
      ) {
        this.addEditScheduleService.showToast(
          'ROU Asset Obtained Action Date',
          'The action date has to be between the accounting term begin and end dates.'
        );
        isSaveValid = false;
      } else {
        this.addEditScheduleService.clearToastBySummary(
          'ROU Asset Obtained Action Date'
        );
      }
    }
    this.addEventFormService.isSaveDisabled$.next(!isSaveValid);
  }

  getLocalCurrencyDetails(currency: number) {
    return this.currencyList.find(
      (currencyList) => currencyList.id === currency
    );
  }

  onROUActionDateChange(e) {
    this.updateROUAssetsObtainedSubTitle(
      this.financialForm.get('ROUAmount').value,
      this.financialForm.get('ROUActionDate').value
    );
    this.validateROUActionDate();
  }

  loadDataForEditRemeasure() {
    this.updateFinancialForm();
    if (
      this.pageMode === 'Remeasure Event' ||
      !this.accountingEventsData?.rouAssetMethodID
    ) {
      this.updateRouAssetMethodAndAmountForClassificationConfiguration();
      this.financialForm.get('ROUActionDate').setValue(this.termBegin);
    }
    this.rouMethodIDSelected = this.accountingEventsData?.rouAssetMethodID;
    this.updateROUAssetsObtainedSubTitle(
      this.financialForm.get('ROUAmount').value,
      this.financialForm.get('ROUActionDate').value
    );
    this.compoundFrequencyType =
      this.accountingEventsData?.compoundFrequencyType;
    this.financialForm.get('chargeType').disable();
    this.overrideCheckBoxValue = this.accountingEventsData?.overrideProfile;
    this.effectiveRate = this.accountingEventsData?.effectiveRate;

    if (this.measureEvent === 'Impairment') {
      this.financialForm.get('modificationImpactScope').setValue(false);
      this.financialForm.get('modificationImpactScope').enable();
    } else if (this.measureEvent === 'Full Termination') {
      this.financialForm.get('modificationImpactScope').setValue(true);
      this.financialForm.get('modificationImpactScope').disable();
      this.financialForm.get('discountRateProfile').disable();
      this.financialForm.get('discountRate').disable();
      this.financialForm.get('discountRate').setValue(0);
      this.financialForm.get('overrideAmortizationProfile').disable();
    }

    if (this.pageMode === 'Edit Event' && this.measureEvent === 'Initial') {
      this.financialForm.get('modificationImpactScope').disable();
    }
    this.financialForm.get('amortizationProfile').disable();
    const manualId = this.accountingEventsData?.amortizationProfileID;
    if (manualId == -1) {
      this.amortizationProfileList.push({
        profileID: -2,
        profileName: this.accountingEventsData.manualProfileName,
        isActive: true,
      });
      setTimeout(() => {
        this.financialForm.get('amortizationProfile').setValue(-2);
      }, 100);
    } else {
      this.amortizationInitialSelected =
        this.accountingEventsData?.amortizationProfileID;
      this.financialForm
        .get('amortizationProfile')
        .setValue(this.accountingEventsData?.amortizationProfileID);
      return;
    }
  }

  loadDataForAdd() {
    this.financialForm
      .get('chargeType')
      .setValue(
        this.leaseInformation?.accountingType === 'AR' ? 'Income' : 'Expense'
      );
    this.financialForm
      .get('localCurrency')
      .setValue(this.leaseInformation?.exchangeRateID);
    this.financialForm
      .get('functionalCurrency')
      .setValue(this.leaseInformation?.exchangeRateID);
    this.financialForm.get('modificationImpactScope').setValue(true);
    this.financialForm.get('modificationImpactScope').disable();
    this.financialForm.get('localCurrency').enable();
    this.financialForm.get('functionalCurrency').enable();

    this.updateRouAssetMethodAndAmountForClassificationConfiguration();
  }

  resetDiscountRate() {
    if (this.measureEvent === 'Full Termination') {
      this.financialForm.get('discountRate').disable();
    } else {
      this.financialForm.get('discountRate').enable();
    }
    this.financialForm.get('annualRateDropdown').enable();
    this.financialForm
      .get('annualRateDropdown')
      .setValue(this.portfolioSettings.defaultAnnualRateType);
    this.financialForm.get('discountRate').setValue(0);
  }

  onDiscountRateChange(event: any) {
    const hasEvent = event && event.length > 0;
    const isDirectEntry = hasEvent && event[0].profileName === 'Direct Entry';
    const modificationImpactScope = this.financialForm.get(
      'modificationImpactScope'
    ).value;

    if (this.pageMode === 'Edit Event' && isDirectEntry) {
      this.financialForm
        .get('discountRate')
        .setValue(this.accountingEventsData.discountRate);
      this.financialForm
        .get('annualRateDropdown')
        .setValue(this.accountingEventsData?.annualRateTypeID);
      this.financialForm.get('discountRate').enable();
      this.financialForm.get('annualRateDropdown').enable();
      return;
    }

    this.financialForm.get('discountRate').disable();
    this.financialForm.get('annualRateDropdown').disable();

    if (hasEvent) {
      if (isDirectEntry) {
        if (this.measureEvent !== 'Full Termination') {
          this.financialForm.get('discountRate').enable();
          this.financialForm.get('annualRateDropdown').enable();
          this.discountRate = modificationImpactScope
            ? event[0].rate
            : this.accountingEventsData.discountRate;
          this.annualRateType = modificationImpactScope
            ? event[0].annualRateTypeID
            : this.accountingEventsData?.annualRateTypeID;
          this.financialForm.get('discountRate').setValue(this.discountRate);
          this.financialForm
            .get('annualRateDropdown')
            .setValue(this.annualRateType);
          this.effectiveRate = 0;
          this.addEventFormService.effectiveRate$.next(this.effectiveRate);
        } else if (this.measureEvent === 'Full Termination') {
          this.financialForm.get('discountRate').setValue(0);
          this.financialForm
            .get('annualRateDropdown')
            .setValue(this.portfolioSettings.defaultAnnualRateType);
          this.financialForm.get('annualRateDropdown').enable();
        }
      } else if (!isDirectEntry) {
        this.discountRate = modificationImpactScope
          ? event[0].rate
          : this.accountingEventsData.discountRate;
        this.annualRateType = modificationImpactScope
          ? event[0].annualRateTypeID
          : this.accountingEventsData?.annualRateTypeID;
        this.financialForm.get('discountRate').setValue(this.discountRate);
        this.financialForm
          .get('annualRateDropdown')
          .setValue(this.annualRateType);
      }
    }
  }

  setCurrencyDropdownSubTitle() {
    const localCurrency =
      this.financialForm.get('localCurrency').value[0] ??
      this.financialForm.get('localCurrency').value;
    const functionalCurrency =
      this.financialForm.get('functionalCurrency').value[0] ??
      this.financialForm.get('functionalCurrency').value;
    const currencyRate = this.financialForm.get('currencyRate').value;

    const matchingLocalCurrency = this.currencyList.find(
      (currency) => currency.id === localCurrency
    );
    const matchingFunctionalCurrency = this.currencyList.find(
      (currency) => currency.id === functionalCurrency
    );

    const subtitleParts = [];

    if (matchingLocalCurrency) {
      subtitleParts.push(matchingLocalCurrency.name);
    }

    if (
      matchingFunctionalCurrency &&
      this.showFunctionalCurrency &&
      [2, 3, 4].includes(this.classificationId)
    ) {
      subtitleParts.push(
        `${matchingFunctionalCurrency.name} (F) ${currencyRate}`
      );
    }

    this.currencySubTitle = subtitleParts.join(' | ');
  }

  onCurrencyDirectEntryChange(event: any) {
    if (
      event &&
      event.value === true &&
      this.functionalCurrencyRateset !== 'Direct Entry'
    ) {
      this.financialForm.get('currencyRate').enable();
      this.functionalCurrencyRateLookupResultMessage = 'Direct Entry';
    } else {
      if (
        this.termBegin &&
        this.functionalCurrencyRateset !== 'Direct Entry' &&
        this.localCurrency !== this.functionalCurrency
      ) {
        this.getFunctionalCurrencyRateLookup();
      }
    }
  }

  onLocalCurrencySelection(event: any) {
    this.localCurrency = event[0].name;
  }

  onFunctionalCurrencySelection(event: any) {
    this.functionalCurrency = event[0].name;
  }

  noDiscountRateMatch() {
    this.financialForm.get('discountRate').setValue(0);
    this.financialForm
      .get('annualRateDropdown')
      .setValue(this.portfolioSettings?.defaultAnnualRateType);
    this.effectiveRate = 0;
    this.setDiscountRateSubTitle();
    this.financialForm.get('discountRateProfile').reset();
  }

  getDiscountRateOptions() {
    const modificationImpactScope = this.financialForm.get(
      'modificationImpactScope'
    ).value;
    if (
      (this.pageMode === 'Remeasure Event' || this.pageMode === 'Edit Event') &&
      !modificationImpactScope &&
      this.measureEvent !== 'Full Termination' &&
      [2, 3, 4].includes(this.classificationId)
    ) {
      this.discountRateOptions = [
        {
          rate: this.accountingEventsData?.discountRate,
          profileID: this.accountingEventsData?.discountRateProfileID,
          profileName:
            this.accountingEventsData?.discountRateProfileID === 0
              ? 'Direct Entry'
              : this.accountingEventsData?.discountRateProfileName,
          annualRateTypeID: this.accountingEventsData?.annualRateTypeID,
          isActive: true,
          sortOrder: 1,
        },
      ];
      this.selectedDiscountRate = this.discountRateOptions[0].profileID;
      if (this.discountRateOptions[0].profileName === 'Direct Entry') {
        this.financialForm.get('discountRate').enable();
        this.financialForm.get('annualRateDropdown').enable();
      } else {
        this.financialForm.get('discountRate').disable();
        this.financialForm.get('annualRateDropdown').disable();
      }
      return;
    }

    const accountingTermBegin = this.scheduleDetailsData?.termBegin;
    const accountingTermEnd = this.scheduleDetailsData?.termEnd;

    if (
      (!accountingTermBegin || !accountingTermEnd || this.termInMonths < 0) &&
      this.measureEvent !== 'Full Termination'
    ) {
      this.discountRatePlaceHolder = 'Input Term';
      this.noDiscountRateMatch();
      if (this.portfolioSettings?.directEntryDiscountRateEnabled) {
        this.discountRateOptions = [
          {
            rate: 0,
            profileID: 0,
            profileName: 'Direct Entry',
            annualRateTypeID: this.portfolioSettings.defaultAnnualRateType,
            isActive: true,
            sortOrder: 1,
          },
        ];
        this.discountRatePlaceHolder = 'Input Term Or Choose Direct Entry';
        this.noDiscountRateMatch();
      }
      return;
    }

    if (this.measureEvent === 'Full Termination') {
      this.discountRateOptions = [
        {
          rate: 0,
          profileID: 0,
          profileName: 'Direct Entry',
          annualRateTypeID: this.accountingEventsData?.annualRateTypeID,
          isActive: true,
          sortOrder: 1,
        },
      ];
      this.selectedDiscountRate = this.discountRateOptions[0].profileID;
      return;
    }

    this.discountRateOptions = [];
    this.subscription.add(
      this.addEditScheduleService
        .getDiscountRateOptions(
          this.localCurrency,
          this.termBegin,
          this.termInMonths
        )
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.discountRateOptions = response.data.filter(
              (profile) => profile.isActive
            );
            if (this.portfolioSettings.directEntryDiscountRateEnabled) {
              let rate = 0;
              if (
                this.pageMode === 'Edit Event' &&
                this.accountingEventsData.discountRateProfileName === null
              ) {
                rate = this.accountingEventsData.discountRate;
              }
              this.discountRateOptions.push({
                rate: rate,
                profileID: 0,
                profileName: 'Direct Entry',
                annualRateTypeID: this.portfolioSettings.defaultAnnualRateType,
                isActive: true,
                sortOrder: 1,
              });
            }
            this.selectedDiscountRate = this.discountRateOptions[0].profileID;

            if (this.discountRateOptions.length === 0) {
              this.discountRatePlaceHolder =
                'No matching discount rate profiles';
              this.noDiscountRateMatch();
            } else if (this.pageMode === 'Edit Event') {
              if (!isNaN(this.accountingEventsData.discountRateProfileID)) {
                let savedDiscountProfileIds = this.discountRateOptions.filter(
                  (x) =>
                    x.profileID ===
                    this.accountingEventsData?.discountRateProfileID
                );
                if (savedDiscountProfileIds.length > 0) {
                  let savedProfileId = savedDiscountProfileIds[0].profileID;
                  this.selectedDiscountRate = savedProfileId;
                } else {
                  this.selectedDiscountRate =
                    this.discountRateOptions[0].profileID;
                }
              }
            }
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  getEffectiveRate() {
    this.subscription.add(
      this.addEditScheduleService
        .getEffectiveRate(
          this.annualRateType,
          +this.discountRate,
          this.compoundFrequencyType
        )
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.effectiveRate = response.data;
            this.setDiscountRateSubTitle();
            this.addEventFormService.effectiveRate$.next(this.effectiveRate);
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  setDiscountRateSubTitle() {
    this.discountRateSubTitle = `${
      this.discountRate || this.discountRate === 0
        ? `${this.discountRate}% | `
        : ''
    }${this.annualRateType === 1 ? 'APR' : 'APY'} | Effective Rate: ${
      this.formatEffectiveRate() ?? 0.0
    }%`;
  }

  formatEffectiveRate() {
    return this.effectiveRate?.toFixed(4);
  }

  getFunctionalCurrencyRateLookup() {
    this.subscription.add(
      this.addEditScheduleService
        .getFunctionalCurrencyRateLookup(
          this.termBegin,
          this.localCurrency,
          this.functionalCurrency
        )
        .subscribe((response: any) => {
          if (response && response.success) {
            this.functionalCurrencyRateLookup = response.data;
            this.functionalCurrencyRateLookupResult ===
              response.data.resultMessage;
            this.portfolioSettings.functionalCurrencyRateset === 'Direct Entry'
              ? (this.functionalCurrencyRateLookupResultMessage =
                  'Direct Entry')
              : (this.functionalCurrencyRateLookupResultMessage =
                  response.data.resultMessage);
            if (
              this.portfolioSettings.functionalCurrencyRateset !==
              'Direct Entry'
            ) {
              let currencyRate: number;
              if (
                this.functionalCurrencyRateLookup?.functionalRate !== null &&
                this.functionalCurrencyRateLookup?.functionalRate !== 1
              ) {
                currencyRate = this.functionalCurrencyRateLookup.functionalRate;
              } else {
                currencyRate =
                  this.localCurrency === this.functionalCurrency ? 1 : 0;
              }
              this.financialForm.get('currencyRate').setValue(currencyRate);
              this.financialForm.get('currencyRate').disable();
            }
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  setAmortizationSubTitle() {
    const amortProfile = this.financialForm.get('amortizationProfile').value;
    const chargeType = this.financialForm.get('chargeType').value;
    const matchingAmortProfile = this.amortizationProfileList.find(
      (profile) => profile.profileID === amortProfile
    );

    const profileName = matchingAmortProfile
      ? matchingAmortProfile.profileName
      : '';

    if (chargeType) {
      this.amortizationSubTitle = profileName
        ? `${profileName} | ${chargeType}`
        : chargeType;
    } else {
      this.amortizationSubTitle = profileName;
    }
  }

  onAmortizationValueChanged(event: any) {
    this.addEditScheduleService.clearToastBySummary(
      'Amortization Profile and Classification'
    );
    this.addEditScheduleService.clearToastBySummary(
      'Amortization Profile Is Required'
    );
    const profile = event.value;
    if (!profile) {
      return;
    }
    this.manualEntryVisible = profile === -1 ? true : false;
    const control = this.financialForm.get('overrideAmortizationProfile');
    profile < -1
      ? (control.setValue(false), control.disable())
      : control.enable();
  }

  onROUMethodValueChanged(event: any) {
    this.rouMethodIDSelected = event[0].id;
    const rouMethodName = event[0].name;
    this.setROUAmountForROUMethod(rouMethodName);
  }

  private setROUAmountForROUMethod(rouMethodName: string) {
    this.addEventFormService.ignoreButtonReset.next(false);
    switch (rouMethodName) {
      case 'Direct Entry': {
        this.financialForm.get('ROUAmount').setValue(null);
        this.financialForm.get('ROUAmount').enable();
        break;
      }
      case 'Opening Asset Balance': {
        const openingAssetBalValue =
          this.pageMode === 'Add Event' ||
          this.pageMode === 'Remeasure Event' ||
          this.addEventFormService.openingAssetBalance$.value
            ? this.addEventFormService.openingAssetBalance$.value
            : this.accountingEventsData.openingAssetBalance;

        this.financialForm.get('ROUAmount').setValue(openingAssetBalValue);
        this.addEventFormService.ignoreButtonReset.next(true);
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'System Asset Adjustment': {
        const systemAssetAdjValue =
          this.pageMode === 'Add Event' ||
          this.pageMode === 'Remeasure Event' ||
          this.addEventFormService.openingAssetBalance$.value
            ? this.addEventFormService.systemAssetAdjustment$.value
            : this.accountingEventsData.systemAssetAdjustment;

        this.financialForm.get('ROUAmount').setValue(systemAssetAdjValue);
        this.addEventFormService.ignoreButtonReset.next(true);
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'Manual Asset Adjustment': {
        const value =
          this.pageMode !== 'Edit Event' ||
          this.addEventFormService.manualAssetAdjustment$?.value
            ? this.addEventFormService.manualAssetAdjustment$?.value
            : this.accountingEventsData.manualAssetAdjustment;

        this.financialForm.get('ROUAmount').setValue(value);

        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'Total Asset Adjustment': {
        this.financialForm.get('ROUAmount').setValue(this.totalAdjustment);
        this.addEventFormService.ignoreButtonReset.next(true);
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'Prior Value': {
        //When doing a remeasure we get the accounting events data from the previous schedule that we are creating a remeasure on. If we are doing a reasure we will
        //get the rouAssetObtainedAmount, else we are editing a schedule that is not an initial and we will use the priorROUAssetObtainedAmount. Prior Value is hidden
        //on an initial schedule.
        if (this.pageMode === 'Remeasure Event') {
          this.financialForm
            .get('ROUAmount')
            .setValue(this.accountingEventsData?.rouAssetObtainedAmount ?? 0);
        } else {
          this.financialForm
            .get('ROUAmount')
            .setValue(
              this.accountingEventsData?.priorROUAssetObtainedAmount ?? 0
            );
        }
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'Zero': {
        this.financialForm.get('ROUAmount').setValue(0);
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      default: {
        this.financialForm.get('ROUAmount').setValue(null);
        break;
      }
    }
  }

  cancelChanges() {
    this.manualEntryVisible = false;
    this.financialForm.get('amortizationProfile').setValue(null);
  }

  saveAmortizationProfileName() {
    let newProfileName = '';
    if (this.financialForm.get('manualAmortizationProfileName').valid) {
      newProfileName = this.financialForm.get(
        'manualAmortizationProfileName'
      ).value;
      const newProfileObj = {
        profileID: this.profileIDCounter,
        profileName: newProfileName,
        isActive: true,
      };
      this.amortizationProfileList.push(newProfileObj);
      this.manualEntryVisible = false;
      this.profileIDCounter--;
      const lastElement =
        this.amortizationProfileList[this.amortizationProfileList.length - 1];
      setTimeout(() => {
        this.financialForm
          .get('amortizationProfile')
          .setValue(lastElement.profileID);
      }, 100);
    } else {
      this.addEditScheduleService.showToast(
        'Manual Amortization Profile',
        'Amortization Profile Name is required.',
        'error',
        false
      );
    }
  }
}
