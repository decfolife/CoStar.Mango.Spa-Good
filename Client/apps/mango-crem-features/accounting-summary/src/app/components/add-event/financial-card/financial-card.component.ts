import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';
import {
  ButtonModule,
  CardModule,
  DatePickerModule,
  DropdownModule,
  DropdownComponent,
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
import { combineLatest, merge, Observable, Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs/operators';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
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
import { previousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';

import { BalanceCardComponent } from './balance-card/balance-card.component';
import {
  BalanceCardType,
  CardsConfiguration,
} from './balance-card/balance-card';
import { classificationSettingResponse } from '@accounting-summary/models/classification-settings-response.modal';
import { FormattingService } from '@accounting-summary/services/formatting.service';

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
    BalanceCardComponent,
  ],
  templateUrl: './financial-card.component.html',
  styleUrls: ['./financial-card.component.scss'],
})
export class FinancialCardComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild('amortizationProfileDropDown')
  amortizationProfileDropDown: DropdownComponent;
  @Input() pageMode: string;
  @Input() classificationId: number;
  @Input() accountingEventsData: previousAccountingEvent;
  @Input() amortizationProfiles: AmortizationProfile[];
  @Input() classificationSettings: classificationSettingResponse[];
  @Input() portfolioSettings: PortfolioSettingsResponse;
  @Input() scheduleDetailsData: any;
  @Input() measureEvent: string;
  @Input() currencyList: Currency[];
  @Input() rouAssetMethodsList: ROUAssetMethod[];
  @Input() userInfo: UserInfoResponse;

  functionalCurrencyRateLookup: FunctionalCurrencyRateLookupResponse;
  discountRateOptions: DiscountRateProfile[];
  effectiveRate: number;

  private subscription = new Subscription();
  private formSubscription$ = new Subject<void>();
  private subscription$ = new Subject<void>();

  private profileIDCounter = -2;

  title = 'Financials';
  subtitle = '';
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
  isFirstLoad: boolean = true;
  compoundFrequencyType: number;
  selectedLocalCurrency: number;
  selectedFunctionalCurrency: number;
  currencyRate: number;
  rouAmountErrors: string = '';
  rouActionDateErrors: string = '';
  showFunctionalCurrency: boolean;
  isCurrencyDirecEntryDisabled: boolean;
  originalRouAssetMethodsList: ROUAssetMethod[];
  functionalCurrencyRateLookupResultMessage: string;
  isCurrencyDirecEntryAllowed = false;
  dateFormat = 'MM/dd/yyyy';
  manualEntryVisible = false;
  amortizationProfileNameRequired = false;
  overrideCheckBoxValue = false;
  functionalCurrencyRateset: string;
  directEntryFunctionalCurrencyRateEnabled: boolean;
  discountRatePlaceHolder = 'Select Discount Rate Profile';
  cards: BalanceCardType[] = [];
  cardsConfiguration: CardsConfiguration;
  private nullDateString = new Date(null).toDateString();

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    public addEditScheduleService: AddEditScheduleService,
    public addEventFormService: AddEventFormService,
    private fb: FormBuilder,
    private formatService: FormattingService,
    public datePipe: DatePipe
  ) {
    // Configuring card formatting
    this.cardsConfiguration = {
      gap: 10,
      direction: 'column',
    };
    this.initialFinancialForm();
    this.subscription.add(
      this.addEventFormService.financeCards.subscribe(
        (res) => {
          this.cards = res;
        },
        (err) => {
          this.accountingSummaryService.errorNotify(err);
        }
      )
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
        this.addEventFormService.setClassification(
          this.accountingSummaryService.getClassificationName(
            this.classificationId
          )
        );

        this.updateRouAssetMethodAndAmountForClassificationConfiguration();
      }

      if (changes.scheduleDetailsData) {
        this.termBegin = new Date(this.scheduleDetailsData?.termBegin);
        this.termInMonths = +this.scheduleDetailsData?.termsInMonth;
        this.termEnd = new Date(this.scheduleDetailsData?.termEnd);
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
          if (this.termBegin.toDateString() !== this.nullDateString) {
            this.financialForm.get('ROUActionDate').setValue(this.termBegin);
          } else {
            this.financialForm.get('ROUActionDate').reset();
          }
        }
      }

      if (
        this.termBegin.toDateString() === this.nullDateString &&
        this.accountingEventsData?.fromDateOptionID === 9 &&
        this.termEnd.toDateString() === this.nullDateString &&
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

      this.dateFormat = this.userInfo?.useDateEU ? 'dd.MM.yyyy' : 'MM/dd/yyyy';

      if (!!changes.rouAssetMethodsList) {
        this.originalRouAssetMethodsList = this.rouAssetMethodsList;

        if (!!this.originalRouAssetMethodsList) {
          if (this.measureEvent === 'Initial') {
            this.rouAssetMethodsList = this.originalRouAssetMethodsList.filter(
              (ram) => !ram.isInitialExempt
            );
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
    this.subtitle = `${this.portfolioSettings?.calendarName} | ${
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

    this.handleFormValueChanges();

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formSubscription$.next();
    this.formSubscription$.complete();
  }

  initialFinancialForm() {
    this.financialForm = this.fb.group({
      discountRateProfile: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      discountRate: new FormControl({ value: null, disabled: true }, [
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
      ROUAmount: new FormControl({ value: '', disabled: false }, []),
      ROUActionDate: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      amortizationProfile: new FormControl({ value: '', disabled: false }, [
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
        if (this.measureEvent === 'Initial' && this.pageMode === 'Edit Event') {
          this.financialForm.get('functionalCurrency').enable();
        }

        if (this.functionalCurrencyRateset === 'Direct Entry') {
          if (this.pageMode === 'Add Event') {
            this.financialForm
              .get('currencyRate')
              .setValue(isSameCurrency ? 1 : 0);
          }
          this.functionalCurrencyRateLookupResultMessage = 'Direct Entry';
          this.financialForm.get('financialCurrencyDirectEntry').disable();
          this.financialForm.get('financialCurrencyDirectEntry').setValue(true);
          isSameCurrency
            ? this.financialForm.get('currencyRate').disable()
            : this.financialForm.get('currencyRate').enable();
        } else if (
          this.functionalCurrencyRateset !== 'Direct Entry' &&
          this.directEntryFunctionalCurrencyRateEnabled
        ) {
          this.financialForm.get('currencyRate').disable();
          this.financialForm.get('financialCurrencyDirectEntry').enable();
          this.financialForm
            .get('financialCurrencyDirectEntry')
            .setValue(false);
          if (
            this.termBegin instanceof Date &&
            !isNaN(this.termBegin.getTime())
          ) {
            this.getFunctionalCurrencyRateLookup();
          }
          isSameCurrency
            ? (this.isCurrencyDirecEntryDisabled = true)
            : (this.isCurrencyDirecEntryDisabled = false);
        } else if (
          this.functionalCurrencyRateset !== 'Direct Entry' &&
          !this.directEntryFunctionalCurrencyRateEnabled
        ) {
          isSameCurrency
            ? this.financialForm.get('currencyRate').disable()
            : this.financialForm.get('currencyRate').enable();
          this.financialForm.get('financialCurrencyDirectEntry').disable();
          this.financialForm
            .get('financialCurrencyDirectEntry')
            .setValue(false);
          if (
            this.termBegin instanceof Date &&
            !isNaN(this.termBegin.getTime())
          ) {
            this.getFunctionalCurrencyRateLookup();
          }
        }
        this.setCurrencyDropdownSubTitle();
        this.getDiscountRateOptions();
      });

    this.financialForm
      .get('currencyRate')
      .valueChanges.pipe(
        debounceTime(debounce),
        takeUntil(this.formSubscription$)
      )
      .subscribe(() => {
        this.setCurrencyDropdownSubTitle();
      });

    this.financialForm
      .get('modificationImpactScope')
      .valueChanges.pipe(
        debounceTime(debounce),
        takeUntil(this.formSubscription$)
      )
      .subscribe(() => {
        this.getDiscountRateOptions();
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

    this.addEventFormService.compoundFrequency
      .pipe(debounceTime(debounce), takeUntil(this.formSubscription$))
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
        this.resetFinancialBalanceCards();
      });

    combineLatest([
      this.financialForm.get('presentValuePaymentTiming')?.valueChanges,
      this.financialForm.get('presentValueCompundFrequency')?.valueChanges,
    ])
      .pipe(debounceTime(debounce), takeUntil(this.formSubscription$))
      .subscribe(
        ([presentValuePaymentTiming, presentValueCompoundFrequency]) => {
          this.financialForm
            .get('presentValueCompoundFrequency')
            .setValue(presentValueCompoundFrequency);
          this.financialForm
            .get('presentValuePaymentTiming')
            .setValue(presentValuePaymentTiming);
        }
      );

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
      this.addEventFormService.manualAssetAdjustment
        .pipe(takeUntil(this.subscription$), debounceTime(debounce))
        .subscribe(() => {
          if (this.rouMethodIDSelected !== null) {
            const rouMethodName = this.rouAssetMethodsList.find(
              (ram) => ram.id === this.rouMethodIDSelected
            ).name;
            if (
              rouMethodName === 'Manual Asset Adjustment' ||
              rouMethodName === 'Total Asset Adjustment'
            ) {
              this.setROUAmountForROUMethod(rouMethodName);
            }
          }
        })
    );

    this.subscription.add(
      this.addEventFormService.openingAssetBalance$
        .pipe(takeUntil(this.subscription$), debounceTime(debounce))
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
        .pipe(takeUntil(this.subscription$), debounceTime(debounce))
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
      pageMode: this.pageMode,
      measureEvent: this.measureEvent,
      leaseRecognitionScheduleID: this.accountingEventsData
        ? this.accountingEventsData.leaseRecognitionScheduleID
        : null,
      copiedFromScheduleID: this.accountingEventsData
        ? this.accountingEventsData.copiedFromScheduleID
        : null,
      useDateEU: this.userInfo?.useDateEU,
      calendarId: this.portfolioSettings?.leaseRecognitionCalendarID,
      effectiveRate: this.effectiveRate,
      leaseRecognitionID: this.leaseInformation.leaseRecognitionID,
    };
    this.addEventFormService.setFinancialFormData(financialFormUpdate);
  }

  private updateFinancialForm(): void {
    this.financialForm.patchValue({
      localCurrency: this.accountingEventsData?.localCurrencyID || '',
      functionalCurrency: this.accountingEventsData?.functionalCurrencyID || '',
      currencyRate: this.accountingEventsData?.functionalCurrencyRate || '',
      discountRateProfile:
        this.accountingEventsData?.discountRateProfileID || '',
      discountRate: this.accountingEventsData?.discountRate || '',
      annualRateDropdown: this.accountingEventsData?.discountRateTypeID || '',
      modificationImpactScope:
        this.accountingEventsData?.modificationImpactsScope || '',
      amortizationProfile:
        this.accountingEventsData?.amortizationProfileID || '',
      overrideAmortizationProfile:
        this.accountingEventsData?.overrideProfile || '',
      chargeType: this.accountingEventsData
        ? this.accountingEventsData.isIncome
          ? 'Income'
          : 'Expense'
        : '',
      ROUMethod: this.accountingEventsData?.rouAssetMethodID || null,
      ROUAmount: this.accountingEventsData?.rouAssetObtainedAmount || null,
      ROUActionDate: this.accountingEventsData?.rouAssetObtainedDate || null,
    });

    //this has to be set in order to get the dropdown to display the value
    this.rouMethodIDSelected = this.accountingEventsData?.rouAssetMethodID;
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
        Number(rouAmount),
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

  private formatValueToDecimalPrecision(value: number, decimalPrecision) {
    let result: string;

    if (isNaN(value) || value === Infinity) {
      return value;
    }

    result = this.formatService
      .localFormat(value, decimalPrecision)
      .replace(/,/g, '');

    return result;
  }

  private validateROUActionDate(): boolean {
    this.rouActionDateErrors = '';

    let rouActionDate = this.financialForm.get('ROUActionDate').value;

    if (rouActionDate === null) {
      this.rouActionDateErrors = 'The action date is required.';
    } else {
      if (
        this.termBegin.toDateString() === this.nullDateString ||
        this.termEnd.toDateString() === this.nullDateString
      ) {
        this.rouActionDateErrors =
          'The accounting term begin or end date is empty.';
      } else {
        rouActionDate = new Date(rouActionDate);

        if (this.measureEvent === 'Initial' && rouActionDate > this.termEnd) {
          this.rouActionDateErrors =
            'The action date has to come before the accounting term end date.';
        } else if (
          this.measureEvent !== 'Initial' &&
          (rouActionDate < this.termBegin || rouActionDate > this.termEnd)
        ) {
          this.rouActionDateErrors =
            'The action date has to be between the accounting term begin and end dates.';
        }
      }
    }

    return this.rouActionDateErrors.length <= 0;
  }

  private validateROUAmount(): boolean {
    this.rouAmountErrors = '';
    const rouAmount = this.financialForm.get('ROUAmount').value;
    //1 is for Direct Entry
    const isValid =
      this.rouMethodIDSelected == 1 ||
      (this.rouMethodIDSelected !== 1 &&
        rouAmount !== null &&
        rouAmount !== undefined &&
        rouAmount !== '');

    if (!isValid) {
      this.rouAmountErrors = 'The amount field is required';
    }

    return isValid;
  }

  onROUAmountInputBlurChange(e, componentName) {
    if (e !== '') {
      const rouAmount = this.formatValueToDecimalPrecision(
        e,
        this.localCurrencyDecimalPrecision
      );
      this.financialForm.get('ROUAmount').setValue(rouAmount);
    }

    this.validateROUAmount();
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
    if (this.pageMode === 'Remeasure Event') {
      this.updateRouAssetMethodAndAmountForClassificationConfiguration();
    }

    this.updateROUAssetsObtainedSubTitle(
      this.financialForm.get('ROUAmount').value,
      this.financialForm.get('ROUActionDate').value
    );
    this.compoundFrequencyType =
      this.accountingEventsData?.compoundFrequencyType;
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
    }
    this.financialForm.get('amortizationProfile').disable();
    this.financialForm.get('chargeType').disable();
    this.overrideCheckBoxValue = this.accountingEventsData?.overrideProfile;

    if (this.measureEvent === 'Impairment') {
      this.financialForm.get('modificationImpactScope').setValue(false);
      this.financialForm.get('modificationImpactScope').enable();
    } else if (this.measureEvent === 'Full Termination') {
      this.financialForm.get('modificationImpactScope').setValue(true);
      this.financialForm.get('modificationImpactScope').disable();
      this.financialForm.get('discountRateProfile').disable();
      this.financialForm.get('discountRate').disable();
      this.financialForm.get('discountRate').setValue(0);
      this.financialForm
        .get('annualRateDropdown')
        .setValue(this.accountingEventsData?.discountRateTypeID);
      this.financialForm.get('currencyRate').disable();
      this.financialForm.get('overrideAmortizationProfile').disable();
    } else {
      this.financialForm.get('modificationImpactScope').setValue(true);
      this.financialForm.get('modificationImpactScope').enable();
      this.financialForm.get('discountRateProfile').enable();
    }

    if (this.pageMode === 'Edit Event' && this.measureEvent === 'Initial') {
      this.financialForm.get('modificationImpactScope').disable();
    }

    this.setServiceValues();

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
    this.compoundFrequencyType =
      this.portfolioSettings?.defaultCompoundFrequencyType;
    this.financialForm
      .get('chargeType')
      .setValue(
        this.leaseInformation?.accountingType === 'AR' ? 'Income' : 'Expense'
      );
    this.selectedAnnualRateType = this.portfolioSettings.defaultAnnualRateType;
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
    this.setServiceValues();
  }

  setServiceValues() {
    this.addEventFormService.setaccountingEventData(this.accountingEventsData);
    this.addEventFormService.setPageMode(this.pageMode);
    this.addEventFormService.setClassification(
      this.accountingSummaryService.getClassificationName(this.classificationId)
    );
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
      .setValue(this.accountingEventsData.annualRateTypeID);
    this.financialForm.get('discountRate').setValue(0);
  }

  updateFinancialBalanceCards(e: any) {
    this.cards = this.addEventFormService.updateFinancialBalanceCards(
      e,
      this.cards
    );
  }

  onDiscountRateChange(event: any) {
    if (event.length === 0) {
      this.financialForm.get('discountRate').setValue(0);
      this.financialForm
        .get('annualRateDropdown')
        .setValue(this.portfolioSettings.defaultAnnualRateType);
      this.effectiveRate = 0;
    }
    const hasEvent = event && event.length > 0;
    const isDirectEntry = hasEvent && event[0].profileName === 'Direct Entry';
    const modificationImpactScope = this.financialForm.get(
      'modificationImpactScope'
    ).value;
    const rate = hasEvent ? event[0].rate : 0;

    if (this.pageMode === 'Edit Event' && isDirectEntry) {
      if (rate > 0) {
        this.financialForm
          .get('discountRate')
          .setValue(this.accountingEventsData.discountRate);
        this.financialForm
          .get('annualRateDropdown')
          .setValue(this.accountingEventsData?.discountRateTypeID);
        this.financialForm.get('discountRate').enable();
        this.financialForm.get('annualRateDropdown').enable();
        return;
      } else if (rate === 0) {
        this.resetDiscountRate();
        return;
      }
    }

    this.financialForm.get('discountRate').disable();
    this.financialForm.get('annualRateDropdown').disable();

    if (hasEvent) {
      if (isDirectEntry) {
        if (this.measureEvent !== 'Full Termination') {
          this.financialForm.get('discountRate').enable();
          this.financialForm.get('annualRateDropdown').enable();
          this.financialForm.get('discountRate').setValue(event[0].rate);
          this.financialForm
            .get('annualRateDropdown')
            .setValue(event[0].annualRateTypeID);
          this.effectiveRate = 0;
          this.addEventFormService.setEffectiveRate(this.effectiveRate);
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
          : this.accountingEventsData?.discountRateTypeID;
        this.financialForm.get('discountRate').setValue(this.discountRate);
        this.financialForm
          .get('annualRateDropdown')
          .setValue(this.annualRateType);
      }
    }
    this.resetFinancialBalanceCards();
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

  onCurrencyDirecEntryChange(event: any) {
    if (
      event &&
      event.value === true &&
      this.functionalCurrencyRateset !== 'Direct Entry'
    ) {
      this.financialForm.get('currencyRate').enable();
      this.functionalCurrencyRateLookupResultMessage = 'Direct Entry';
    } else {
      this.financialForm.get('currencyRate').disable();
      this.getFunctionalCurrencyRateLookup();
    }
  }

  onLocalCurrencySelection(event: any) {
    this.localCurrency = event[0].name;
    this.addEventFormService.setCurrency(
      event[0].name,
      event[0].decimalPrecision
    );
  }

  onFunctionalCurrencySelection(event: any) {
    this.functionalCurrency = event[0].name;
  }

  noDiscountRateMatch() {
    this.financialForm.get('discountRate').setValue(0);
    this.financialForm
      .get('annualRateDropdown')
      .setValue(this.portfolioSettings?.defaultAnnualRateType);
    this.financialForm.get('annualRateDropdown').disable();
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
          annualRateTypeID: this.accountingEventsData?.discountRateTypeID,
          isActive: true,
          sortOrder: 1,
        },
      ];
      this.selectedDiscountRate = this.discountRateOptions[0].profileID;
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
      this.financialForm.get('annualRateDropdown').disable();
      if (this.portfolioSettings?.directEntryDiscountRateEnabled) {
        this.discountRateOptions = [
          {
            rate: 0,
            profileID: 0,
            profileName: 'Direct Entry',
            annualRateTypeID: 1,
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
          annualRateTypeID: this.accountingEventsData?.discountRateTypeID,
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
                annualRateTypeID: 1,
                isActive: true,
                sortOrder: 1,
              });
            }

            if (this.discountRateOptions.length === 0) {
              this.discountRatePlaceHolder =
                'No matching discount rate profiles';
              this.noDiscountRateMatch();
            } else if (this.pageMode === 'Edit Event') {
              this.selectedDiscountRate =
                this.accountingEventsData?.discountRateProfileID;
            } else {
              this.selectedDiscountRate = this.discountRateOptions[0].profileID;
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
            this.addEventFormService.setEffectiveRate(this.effectiveRate);
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
      this.effectiveRate.toFixed(4) || 0.0
    }%`;
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
            this.functionalCurrencyRateLookupResultMessage =
              response.data.resultMessage;
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
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }

  setAmortizationSubTitle() {
    const amortProfile =
      this.financialForm.get('amortizationProfile').value[0] ??
      this.financialForm.get('amortizationProfile').value;
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
    if (!event || !Array.isArray(event) || !event[0]) {
      return;
    }
    this.financialForm.get('overrideAmortizationProfile').reset();
    const profile = event[0];
    this.manualEntryVisible = profile.profileName === 'Manual' ? true : false;
    const control = this.financialForm.get('overrideAmortizationProfile');
    profile.profileID < -1
      ? (control.setValue(false), control.disable())
      : control.enable();
  }

  onROUMethodValueChanged(event: any) {
    this.rouMethodIDSelected = event[0].id;
    const rouMethodName = event[0].name;
    this.setROUAmountForROUMethod(rouMethodName);
  }

  private setROUAmountForROUMethod(rouMethodName: string) {
    this.financialForm.get('ROUAmount').enable();

    switch (rouMethodName) {
      case 'Direct Entry': {
        this.financialForm.get('ROUAmount').setValue(null);
        break;
      }
      case 'Opening Asset Balance': {
        let openingAssetBalValue =
          this.pageMode === 'Add Event' || this.pageMode === 'Remeasure Event'
            ? this.addEventFormService.openingAssetBalance
            : this.accountingEventsData.assetAmortization;

        this.financialForm
          .get('ROUAmount')
          .setValue(
            this.formatValueToDecimalPrecision(
              openingAssetBalValue,
              this.localCurrencyDecimalPrecision
            )
          );
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'System Asset Adjustment': {
        let systemAssetAdjValue =
          this.pageMode === 'Add Event' || this.pageMode === 'Remeasure Event'
            ? this.addEventFormService.systemAssetAdjustment
            : this.accountingEventsData.systemAssetAdjustment;

        this.financialForm
          .get('ROUAmount')
          .setValue(
            this.formatValueToDecimalPrecision(
              systemAssetAdjValue,
              this.localCurrencyDecimalPrecision
            )
          );
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'Manual Asset Adjustment': {
        this.financialForm
          .get('ROUAmount')
          .setValue(
            this.formatValueToDecimalPrecision(
              this.addEventFormService.manualAssetAdjustment?.value,
              this.localCurrencyDecimalPrecision
            )
          );
        this.financialForm.get('ROUAmount').disable();
        break;
      }
      case 'Total Asset Adjustment': {
        this.financialForm
          .get('ROUAmount')
          .setValue(
            this.formatValueToDecimalPrecision(
              this.accountingEventsData?.systemAssetAdjustment +
                this.addEventFormService.manualAssetAdjustment?.value,
              this.localCurrencyDecimalPrecision
            )
          );
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
            .setValue(
              this.formatValueToDecimalPrecision(
                this.accountingEventsData?.rouAssetObtainedAmount,
                this.localCurrencyDecimalPrecision
              )
            );
        } else {
          this.financialForm
            .get('ROUAmount')
            .setValue(
              this.formatValueToDecimalPrecision(
                this.accountingEventsData?.priorROUAssetObtainedAmount,
                this.localCurrencyDecimalPrecision
              )
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
    this.amortizationProfileDropDown.clearSelectBox();
  }

  saveAmortizationProfileName() {
    let newPorfileName = '';
    if (this.financialForm.get('manualAmortizationProfileName').valid) {
      newPorfileName = this.financialForm.get(
        'manualAmortizationProfileName'
      ).value;
      const newProfileObj = {
        profileID: this.profileIDCounter,
        profileName: newPorfileName,
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
      return;
    }
  }

  resetFinancialBalanceCards() {
    this.addEventFormService.setFinancialBalanceCards();
  }

  runROUAssetValid(): boolean {
    const isValid = this.validateROUAmount() && this.validateROUActionDate();
    return isValid;
  }
}
