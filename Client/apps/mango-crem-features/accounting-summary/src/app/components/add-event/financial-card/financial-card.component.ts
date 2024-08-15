import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import { ButtonModule, CardModule, DatePickerModule, DropdownModule, DropdownComponent, InputComponent, InputLabelComponent, ToggleSliderComponent } from '@mango/ui-shared/lib-ui-elements';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CremRadioComponent, CremRadioGroupComponent, } from '@mango/ui-shared/lib-ui-elements';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, skip, } from 'rxjs/operators';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { DatePipe } from '@angular/common';
import { CheckBoxComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/checkbox';
import { CompositeDropdownModule } from 'libs/ui-shared/lib-ui-elements/src/lib/composite-dropdown';
import { LeaseInfoResponse } from '@accounting-summary/models/lease-info-response.modal';
import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';
import { FunctionalCurrencyRateLookupResponse } from '@accounting-summary/models/functional-currency-rate-lookup.model';
import { AmortizationProfile, Currency, DiscountRateProfile } from '@accounting-summary/models/common-dropdowns.model';
import { previousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';

import { BalanceCardComponent } from './balance-card/balance-card.component';
import { BalanceCardType, CardsConfiguration } from './balance-card/balance-card';
import { isClassificationTypeName } from "@mango/data-models/lib-data-models";
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
  @ViewChild('amortizationProfileDropDown') amortizationProfileDropDown: DropdownComponent;
  @Input() pageMode: string;
  @Input() classificationId: number;
  @Input() accountingEventsData: previousAccountingEvent;
  @Input() amortizationProfiles: AmortizationProfile[];
  @Input() portfolioSettings: PortfolioSettingsResponse;
  @Input() scheduleDetailsData: any;
  @Input() measureEvent: string;
  @Input() currencyList: Currency[];
  @Input() userInfo: UserInfoResponse;

  functionalCurrencyRateLookup: FunctionalCurrencyRateLookupResponse;
  leaseInformation: LeaseInfoResponse;
  discountRateOptions: DiscountRateProfile[];
  effectiveRate: number;

  private subscription = new Subscription;
  private profileIDCounter = -2;

  title = "Financials";
  subtitle = "";
  componentName = "financials";
  amortizationProfileList: any;
  amortizationInitialSelected: any
  amortizationSubTitle: string;
  financialForm: FormGroup;
  discountRateSubTitle: string;
  currencySubTitle: string;
  ROUAssetsObtainedSubTitle: string;

  localCurrency: string;
  functionalCurrency: string;
  termBegin: Date;
  termEnd: Date;
  termInMonths: number;
  selectedBeginDateID = 1;
  selectedAnnualRateType: number;
  selectedDiscountRate: number;
  annualRateType: number;
  discountRate: number;
  compoundFrequencyType: number;
  selectedLocalCurrency: number;
  selectedFunctionalCurrency: number;
  currencyRate: number;
  showFunctionalCurrency: boolean;
  isCurrencyDirecEntryDisabled: boolean;
  functionalCurrencyRateLookupResultMessage: string;
  isCurrencyDirecEntryAllowed = false;
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  manualEntryVisible = false;
  amortizationProfileNameRequired = false;
  overrideCheckBoxValue = false;
  overrideCheckBoxDisabled = false;
  functionalCurrencyRateset: string;
  directEntryFunctionalCurrencyRateEnabled: boolean;
  discountRatePlaceHolder = 'Select Discount Rate Profile';
  cards: BalanceCardType[] = [];
  cardsConfiguration: CardsConfiguration;

  constructor(
    private formatService: FormattingService,
    public accountingSummaryService: AccountingSummaryService,
    public addEditScheduleService: AddEditScheduleService,
    private fb: FormBuilder,
    public datePipe: DatePipe,
  ) {
    // Configuring card formatting
    this.cardsConfiguration = {
      gap: 10,
      direction: 'column',
    };
    this.getLeaseInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.accountingEventsData !== undefined || this.pageMode !== undefined || this.classificationId !== undefined || this.scheduleDetailsData !== undefined || this.currencyList !== undefined && this.measureEvent !== undefined) {

      if (changes.classificationId && this.financialForm) {
        this.financialForm.get('ROUMethod').reset();
        this.financialForm.get('ROUAmount').reset();
        this.financialForm.get('ROUActionDate').reset();
        this.setCurrencyDropdownSubTitle();
        this.getLeaseInfo();
      }
      if (changes.scheduleDetailsData) {
        this.termBegin = new Date(this.scheduleDetailsData?.termBegin);
        this.termInMonths = +this.scheduleDetailsData?.termsInMonth;
        this.termEnd = new Date(this.scheduleDetailsData?.termEnd);
      }

      if (changes.portfolioSettings) {
        this.subtitle = `${this.portfolioSettings?.calendarName} | ${this.portfolioSettings?.amortizationMethodType === 1 ? 'Periodic Amortization' : 'Daily Amortization'}`;
        this.showFunctionalCurrency = this.portfolioSettings?.functionalCurrencyEnabled;
        this.directEntryFunctionalCurrencyRateEnabled = this.portfolioSettings?.directEntryFunctionalCurrencyRateEnabled;
        this.functionalCurrencyRateset = this.portfolioSettings?.functionalCurrencyRateset;
        this.compoundFrequencyType = this.portfolioSettings?.defaultCompoundFrequencyType;
      }

      this.amortizationProfileList = this.amortizationProfiles?.filter(ProfileName => ProfileName.isActive);
      this.isEuroDateFormat = this.userInfo?.useDateEU;
      this.dateFormat = this.isEuroDateFormat ? 'dd.MM.yyyy' : 'MM/dd/yyyy';

      if (this.pageMode === 'Add Event' && this.scheduleDetailsData) {
        this.loadDataForAdd()
      }
      else if (this.pageMode === 'Edit Event' || this.pageMode === 'Remeasure Event') {
        this.loadDataForEditRemeasure();
      }

      this.cards = this.setFinancialBalanceCards(
        this.accountingSummaryService.getClassificationName(this.classificationId),
        this.accountingEventsData,
        this.pageMode,
        this.portfolioSettings,
      );

    }

  }

  ngOnInit(): void {
    this.initialFinancialForm();
    this.handleFormValueChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialFinancialForm() {
    this.financialForm = this.fb.group({
      discountRateProfile: new FormControl({ value: '', disabled: false }),
      discountRate: new FormControl({ value: '', disabled: true }),
      annualRateDropdown: new FormControl({ value: '', disabled: false }),
      modificationImpactScope: new FormControl({ value: null, disabled: false }),
      localCurrency: new FormControl({ value: '', disabled: true }),
      functionalCurrency: new FormControl({ value: '', disabled: true }),
      isCurrencyDirecEntry: new FormControl({ value: '', disabled: true }),
      financialCurrencyDirectEntry: new FormControl({ value: false, disabled: true }),
      currencyRate: new FormControl({ value: '', disabled: true }),
      ROUMethod: new FormControl({ value: '', disabled: false }),
      ROUAmount: new FormControl({ value: '', disabled: false }),
      ROUActionDate: new FormControl({ value: '', disabled: false }),
      amortizationProfile: new FormControl({ value: '', disabled: false }),
      chargeType: new FormControl({ value: '', disabled: false }),
      manualAmortizationProfileName: ['', [Validators.required, this.noWhitespaceValidator]],
      assetBalanceManualAdjustment: new FormControl({ value: '', disabled: false }),
      presentValueCompoundFrequency: new FormControl({ value: '', disabled: false }),
      presentValuePaymentTiming: new FormControl({ value: '', disabled: false }),
      adjustmentManualAdjustment: new FormControl({ value: '', disabled: false }),
    });
  }

  handleFormValueChanges() {
    const debounce = 300;
    combineLatest([
      this.financialForm.get('localCurrency')?.valueChanges,
      this.financialForm.get('functionalCurrency')?.valueChanges]).pipe(
        filter(([localCurrency, functionalCurrency]) =>
          localCurrency != null && functionalCurrency != null
        ),
        debounceTime(debounce),
        skip(1),
        distinctUntilChanged(([prevLocal, prevFunctional], [currLocal, currFunctional]) =>
          prevLocal === currLocal && prevFunctional === currFunctional
        )
      ).subscribe(([localCurrencyValue, functionalCurrencyValue]) => {

        const localCurrency = localCurrencyValue[0] ?? localCurrencyValue;
        const functionalCurrency = functionalCurrencyValue[0] ?? functionalCurrencyValue;
        if (this.currencyList) {
          const filteredCurrency = this.currencyList.find(currencyList => currencyList.id === localCurrency);
          this.localCurrency = filteredCurrency?.name;
          const filteredfunctionalCurrency = this.currencyList.find(currencyList => currencyList.id === functionalCurrency);
          this.functionalCurrency = filteredfunctionalCurrency?.name;
        }
        const isSameCurrency = localCurrency === functionalCurrency;
        if (this.measureEvent === 'Initial' && this.pageMode === 'Edit Event') {
          this.financialForm.get('functionalCurrency').enable();
        }

        if (this.functionalCurrencyRateset === 'Direct Entry') {
          if (this.pageMode === 'Add Event') {
            this.financialForm.get('currencyRate').setValue(isSameCurrency ? 1 : 0);
          }
          this.functionalCurrencyRateLookupResultMessage = 'Direct Entry';
          this.financialForm.get('financialCurrencyDirectEntry').disable();
          this.financialForm.get('financialCurrencyDirectEntry').setValue(true);
          isSameCurrency ? this.financialForm.get('currencyRate').disable() : this.financialForm.get('currencyRate').enable();
        }

        else if (this.functionalCurrencyRateset !== 'Direct Entry' && this.directEntryFunctionalCurrencyRateEnabled) {
          this.financialForm.get('currencyRate').disable();
          this.financialForm.get('financialCurrencyDirectEntry').enable();
          this.financialForm.get('financialCurrencyDirectEntry').setValue(false);
          if (this.termBegin instanceof Date && !isNaN(this.termBegin.getTime())) {
            this.getFunctionalCurrencyRateLookup();
          }
          isSameCurrency ? this.isCurrencyDirecEntryDisabled = true : this.isCurrencyDirecEntryDisabled = false;
        }

        else if (this.functionalCurrencyRateset !== 'Direct Entry' && !this.directEntryFunctionalCurrencyRateEnabled) {
          isSameCurrency ? this.financialForm.get('currencyRate').disable() : this.financialForm.get('currencyRate').enable();
          this.financialForm.get('financialCurrencyDirectEntry').disable();
          this.financialForm.get('financialCurrencyDirectEntry').setValue(false);
          if (this.termBegin instanceof Date && !isNaN(this.termBegin.getTime())) {
            this.getFunctionalCurrencyRateLookup();
          }
        }
        this.setCurrencyDropdownSubTitle();
        this.getDiscountRateOptions();
      });

    this.financialForm.get('currencyRate').valueChanges.pipe(
      debounceTime(debounce)
    ).subscribe(() => {
      this.setCurrencyDropdownSubTitle();
    });

    this.financialForm.get('modificationImpactScope').valueChanges.pipe(
      debounceTime(debounce)
    ).subscribe(() => {
      this.getDiscountRateOptions();
    });

    this.financialForm.get('amortizationProfile').valueChanges.pipe(
      debounceTime(debounce)
    ).subscribe(() => {
      this.setAmortizationSubTitle();
    });

    this.financialForm.get('chargeType').valueChanges.pipe(
      debounceTime(debounce)
    ).subscribe(() => {
      this.setAmortizationSubTitle();
    });

    combineLatest([
      this.financialForm.get('discountRate')?.valueChanges,
      this.financialForm.get('annualRateDropdown')?.valueChanges,
      this.financialForm.get('discountRateProfile')?.valueChanges,
    ]).pipe(
      debounceTime(debounce)
    ).subscribe(([discountRate, annualRateDropdown]) => {
      this.discountRate = discountRate || 0;
      this.annualRateType = Array.isArray(annualRateDropdown) ? annualRateDropdown[0] : annualRateDropdown;
      this.getEffectiveRate();
    });

    combineLatest([
      this.financialForm.get('ROUAmount').valueChanges.pipe(debounceTime(debounce)),
      this.financialForm.get('ROUActionDate').valueChanges.pipe(debounceTime(debounce)),
    ]).subscribe(([ROUAmount, ROUActionDate]) => {
      const amount = ROUAmount ?? '';
      const actionDate = ROUActionDate ? this.datePipe.transform(ROUActionDate, this.dateFormat) : '';
      this.ROUAssetsObtainedSubTitle = actionDate ? `${amount} | ${actionDate}` : amount;
    });
  }

  private updateFinancialForm(): void {
    this.financialForm.patchValue({
      localCurrency: this.accountingEventsData?.localCurrencyID || '',
      functionalCurrency: this.accountingEventsData?.functionalCurrencyID || '',
      currencyRate: this.accountingEventsData?.functionalCurrencyRate || '',
      discountRateProfile: this.accountingEventsData?.discountRateProfileID || '',
      discountRate: this.accountingEventsData?.discountRate || '',
      annualRateDropdown: this.accountingEventsData?.discountRateTypeID || '',
      modificationImpactScope: this.accountingEventsData?.modificationImpactsScope || '',
      amortizationProfile: this.accountingEventsData?.amortizationProfileID || '',
      chargeType: this.accountingEventsData?.isIncome ? 'Income' : 'Expense' || '',
    });
  }

  loadDataForEditRemeasure() {
    this.updateFinancialForm();
    this.compoundFrequencyType = this.accountingEventsData?.compoundFrequencyType;
    const manualId = this.accountingEventsData?.amortizationProfileID;
    if (manualId == -1) {
      this.amortizationProfileList.push({ profileID: -2, profileName: this.accountingEventsData.manualProfileName, isActive: true });
      setTimeout(() => {
        this.financialForm.get('amortizationProfile').setValue(-2);
      }, 100);
    } else {
      this.amortizationInitialSelected = this.accountingEventsData?.amortizationProfileID;
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
      this.financialForm.get('annualRateDropdown').setValue(this.accountingEventsData?.discountRateTypeID);
      this.financialForm.get('currencyRate').disable();
      this.overrideCheckBoxDisabled = true;
    } else {
      this.financialForm.get('modificationImpactScope').setValue(true);
      this.financialForm.get('modificationImpactScope').enable();
      this.financialForm.get('discountRateProfile').enable();
    }

    if (this.pageMode === 'Edit Event' && this.measureEvent === 'Initial') {
      this.financialForm.get('modificationImpactScope').disable();
    }
  }

  loadDataForAdd() {
    this.compoundFrequencyType = this.portfolioSettings?.defaultCompoundFrequencyType;
    this.financialForm.get('chargeType').setValue(this.leaseInformation.accountingType === 'AR' ? 'Income' : 'Expense');
    this.selectedAnnualRateType = this.portfolioSettings.defaultAnnualRateType;
    this.financialForm.get('modificationImpactScope').setValue(true);
    this.financialForm.get('modificationImpactScope').disable();
    this.financialForm.get('localCurrency').enable();
    this.financialForm.get('functionalCurrency').enable();
  }

  resetDiscountRate() {
    if (this.measureEvent ==='Full Termination') {
      this.financialForm.get('discountRate').disable();
    }
    else {
      this.financialForm.get('discountRate').enable();
    }
    this.financialForm.get('annualRateDropdown').enable();
    this.financialForm.get('annualRateDropdown').setValue(this.accountingEventsData.annualRateTypeID);
    this.financialForm.get('discountRate').setValue(0);
  }

  onDiscountRateChange(event: any) {
    const hasEvent = event && event.length > 0;
    const isDirectEntry = hasEvent && event[0].profileName === 'Direct Entry';
    const modificationImpactScope = this.financialForm.get('modificationImpactScope').value;
    const rate = hasEvent ? event[0].rate : 0;

    if (this.pageMode === 'Edit Event' && isDirectEntry) {
      if (rate > 0) {
        this.financialForm.get('discountRate').setValue(this.accountingEventsData.discountRate);
        this.financialForm.get('annualRateDropdown').setValue(this.accountingEventsData?.discountRateTypeID);
        this.financialForm.get('discountRate').enable();
        this.financialForm.get('annualRateDropdown').enable();
        return;
      }
      else if (rate === 0) {
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
          this.financialForm.get('annualRateDropdown').setValue(event[0].annualRateTypeID);
          this.effectiveRate = parseFloat('0.000%'.replace('%', ''));
        } else if ((this.measureEvent === 'Full Termination')) {
          this.financialForm.get('discountRate').setValue(0);
          this.financialForm.get('annualRateDropdown').setValue(this.portfolioSettings.defaultAnnualRateType);
          this.financialForm.get('annualRateDropdown').enable();
        }
      } else if (!isDirectEntry) {
        this.discountRate = modificationImpactScope ? event[0].rate : this.accountingEventsData.discountRate;
        this.annualRateType = modificationImpactScope ? event[0].annualRateTypeID : this.accountingEventsData?.discountRateTypeID;
        this.financialForm.get('discountRate').setValue(this.discountRate);
        this.financialForm.get('annualRateDropdown').setValue(this.annualRateType);
      }
    }
  }

  setCurrencyDropdownSubTitle() {
    const localCurrency = this.financialForm.get('localCurrency').value[0] ?? this.financialForm.get('localCurrency').value;
    const matchingLocalCurrency = this.currencyList.find(currency => currency.id === localCurrency);
    const functionalCurrency = this.financialForm.get('functionalCurrency').value[0] ?? this.financialForm.get('functionalCurrency').value;
    const matchingfunctionalCurrency = this.currencyList.find(currency => currency.id === functionalCurrency);
    if (matchingLocalCurrency) {
      if (matchingfunctionalCurrency && this.showFunctionalCurrency && [2, 3, 4].includes(this.classificationId)) {
        this.currencySubTitle = `${matchingLocalCurrency.name} | ${matchingfunctionalCurrency.name} (F) ${this.financialForm.get('currencyRate').value}`;
      } else {
        this.currencySubTitle = matchingLocalCurrency.name;
      }
    }
  }

  onCurrencyDirecEntryChange(event: any) {
    if (event && event.value === true && this.functionalCurrencyRateset !== 'Direct Entry') {
      this.financialForm.get('currencyRate').enable();
      this.functionalCurrencyRateLookupResultMessage = 'Direct Entry';
    }
    else {
      this.financialForm.get('currencyRate').disable();
      this.getFunctionalCurrencyRateLookup();
    }
  }

  onLocalCurrencySelection(event: any) {
    this.localCurrency = event[0].name;
  }

  onFunctionalCurrencySelection(event: any) {
    this.functionalCurrency = event[0].name;
  }

  noDiscounRateMatch() {
    this.financialForm.get('discountRate').setValue(0);
    this.financialForm.get('annualRateDropdown').setValue(this.portfolioSettings?.defaultAnnualRateType);
    this.financialForm.get('annualRateDropdown').disable();
    this.effectiveRate = parseFloat('0.000%'.replace('%', ''));
    this.setDiscountRateSubTitle();
    this.financialForm.get('discountRateProfile').reset();
  }

  getLeaseInfo() {
    this.subscription.add(this.accountingSummaryService.getLeaseInfo().subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      } else if (response.success) {
        this.leaseInformation = response.data;
        if (this.pageMode === 'Add Event') {
          this.financialForm.get('localCurrency').setValue(this.leaseInformation?.exchangeRateID);
          this.financialForm.get('functionalCurrency').setValue(this.leaseInformation?.exchangeRateID);
        }
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }))
  }

  getDiscountRateOptions() {
    const modificationImpactScope = this.financialForm.get('modificationImpactScope').value;
    if ((this.pageMode === 'Remeasure Event' || this.pageMode === 'Edit Event') && !modificationImpactScope && this.measureEvent !== 'Full Termination' && [2, 3, 4].includes(this.classificationId)) {
      this.discountRateOptions = [{
        rate: this.accountingEventsData?.discountRate,
        profileID: this.accountingEventsData?.discountRateProfileID,
        profileName: this.accountingEventsData?.discountRateProfileID === 0 ? 'Direct Entry' : this.accountingEventsData?.discountRateProfileName,
        annualRateTypeID: this.accountingEventsData?.discountRateTypeID,
        isActive: true,
        sortOrder: 1
      }];
      this.selectedDiscountRate = this.discountRateOptions[0].profileID;
      return;
    }

    const accountingTermBegin = this.scheduleDetailsData?.termBegin;
    const accountingTermEnd = this.scheduleDetailsData?.termEnd;

    if ((!accountingTermBegin || !accountingTermEnd || this.termInMonths < 0 ) && (this.measureEvent !== 'Full Termination')) {
      this.discountRatePlaceHolder = 'Input Term';
      this.noDiscounRateMatch();
      this.financialForm.get('annualRateDropdown').disable();
      if (this.portfolioSettings?.directEntryDiscountRateEnabled) {
        this.discountRateOptions = [{
          rate: 0,
          profileID: 0,
          profileName: 'Direct Entry',
          annualRateTypeID: 1,
          isActive: true,
          sortOrder: 1
        }];
        this.discountRatePlaceHolder = 'Input Term Or Choose Direct Entry';
        this.noDiscounRateMatch();
      }
      return;
    }

    if (this.measureEvent === 'Full Termination') {
      this.discountRateOptions = [{
        rate: 0,
        profileID: 0,
        profileName: 'Direct Entry',
        annualRateTypeID: this.accountingEventsData?.discountRateTypeID,
        isActive: true,
        sortOrder: 1
      }];
      this.selectedDiscountRate = this.discountRateOptions[0].profileID;
      return;
    }

    this.discountRateOptions = [];
    this.subscription.add(
      this.addEditScheduleService.getDiscountRateOptions(this.localCurrency, this.termBegin, this.termInMonths)
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.discountRateOptions = response.data.filter(profile => profile.isActive);
            if (this.portfolioSettings.directEntryDiscountRateEnabled) {
              let rate = 0;
              if (this.pageMode === 'Edit Event' && this.accountingEventsData.discountRateProfileName === null) {
                rate = this.accountingEventsData.discountRate;
              }
              this.discountRateOptions.push({
                rate: rate,
                profileID: 0,
                profileName: 'Direct Entry',
                annualRateTypeID: 1,
                isActive: true,
                sortOrder: 1
              });
            }

            if (this.discountRateOptions.length === 0) {
              this.discountRatePlaceHolder = 'No matching discount rate profiles';
              this.noDiscounRateMatch();
            }
            else if (this.pageMode === 'Edit Event') {
              this.selectedDiscountRate = this.accountingEventsData?.discountRateProfileID;
            } else {
              this.selectedDiscountRate = this.discountRateOptions[0].profileID;
            }
          } else {
            this.accountingSummaryService.errorNotify(response.clientErrorMessage);
          }
        })
    );
  }

  getEffectiveRate() {
    this.subscription.add(this.addEditScheduleService.getEffectiveRate(this.annualRateType, this.discountRate, this.compoundFrequencyType).subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      } else if (response.success) {
        this.effectiveRate = response.data.toFixed(4);
        this.setDiscountRateSubTitle();
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }))
  }

  setDiscountRateSubTitle() {
    this.discountRateSubTitle = `${this.discountRate ?? 0}% | ${this.annualRateType === 1 ? 'APR' : 'APY'} | Effective Rate: ${this.effectiveRate || 0.0000}%`;
  }

  getFunctionalCurrencyRateLookup() {
    this.subscription.add(
      this.addEditScheduleService.getFunctionalCurrencyRateLookup(this.termBegin, this.localCurrency, this.functionalCurrency)
        .subscribe((response: any) => {
          if (response && response.success) {
            this.functionalCurrencyRateLookup = response.data;
            this.functionalCurrencyRateLookupResultMessage = response.data.resultMessage;
            let currencyRate: number;
            if (this.functionalCurrencyRateLookup?.functionalRate !== null && this.functionalCurrencyRateLookup?.functionalRate !== 1) {
              currencyRate = this.functionalCurrencyRateLookup.functionalRate;
            } else {
              currencyRate = this.localCurrency === this.functionalCurrency ? 1 : 0;
            }
            this.financialForm.get('currencyRate').setValue(currencyRate);
            this.financialForm.get('currencyRate').disable();
          } else {
            this.accountingSummaryService.errorNotify(response.clientErrorMessage);
          }
        })
    );
  }

  setAmortizationSubTitle() {
    const amortProfile = this.financialForm.get('amortizationProfile').value[0] ?? this.financialForm.get('amortizationProfile').value;
    const chargeType = this.financialForm.get('chargeType').value;
    const matchingAmortProfile = this.amortizationProfileList.find(amortizationProfile => amortizationProfile.profileID === amortProfile);
    if (matchingAmortProfile) {
      if (chargeType) {
        this.amortizationSubTitle = `${matchingAmortProfile.profileName} | ${chargeType}`;
      } else {
        this.amortizationSubTitle = `${matchingAmortProfile.profileName}`;
      }
    }
  }

  onAmortizationValueChanged(e: any) {
    const dropDownValue: string = e[0].profileName;
    if (dropDownValue) {
      if (dropDownValue === 'Manual') {
        this.manualEntryVisible = true;
      } else {
        this.manualEntryVisible = false;
      }
    }
  }

  cancelChanges() {
    this.manualEntryVisible = false;
    this.amortizationProfileDropDown.clearSelectBox();
  }

  noWhitespaceValidator(control) {
    const isValid = (control.value || '').trim().length > 0;
    return isValid ? null : { 'whitespace': true };
  }

  saveAmortizationProfileName() {
    let newPorfileName = '';
    if (this.financialForm.get('manualAmortizationProfileName').valid) {
      newPorfileName = this.financialForm.get('manualAmortizationProfileName').value;
      const newProfileObj = { profileID: this.profileIDCounter, profileName: newPorfileName, isActive: true };
      this.amortizationProfileList.push(newProfileObj);
      this.manualEntryVisible = false;
      this.profileIDCounter--;
      const lastElement = this.amortizationProfileList[this.amortizationProfileList.length - 1];
      this.financialForm.get('manualAmortizationProfileName').reset();
      setTimeout(() => {
        this.financialForm.get('amortizationProfile').setValue(lastElement.profileID);
      }, 100);
    }
    else {
      return;
    }
  }

  /**
   * After Initialization, this method updates value calculation in the cards
   *
   * @param {*} elementValueChange
   * @memberof FinancialCardComponent
   */
  updateFinancialBalanceCards(e: any) {
    // Get the Card and Element Index
    const cardIndex = this.findCardIndex(e);
    if(cardIndex === -1) {
      console.warn('Card not found');
      return;
    }

    // Modify the corresponding card element
    switch(this.cards[cardIndex].cardTitle){
      case "Asset Balance":{
        // Total Adjustment Calculation
        const systemAdjustmentIndex = this.findCardElementIndex(cardIndex, {elementLabel:"System Adjustment"});
        const totalIndex = this.findCardElementIndex(cardIndex, {elementLabel:"Total Adjustment"});
        this.cards[cardIndex].elements[totalIndex].value = this.formatService.localFormat(
                  Number(e.value) +
                  this.formatService.transformLocalFormatToNumber(
                    this.cards[cardIndex].elements[systemAdjustmentIndex].value
                  ), 2);
        break;
      }
      case "Adjustments":{
        // Total Adjustment Calculation
        const systemAdjustmentIndex = this.findCardElementIndex(cardIndex, {elementLabel:"System Adjustment"});
        const totalIndex = this.findCardElementIndex(cardIndex, {elementLabel:"Total Adjustment"});
        this.cards[cardIndex].elements[totalIndex].value = this.formatService.localFormat(
                  Number(e.value) +
                  this.formatService.transformLocalFormatToNumber(
                    this.cards[cardIndex].elements[systemAdjustmentIndex].value
                  ), 2);
        break;
      }
    }
  }

  findCardIndex(e:any): number | undefined{
    const cardIndex = this.cards.findIndex(card => card.cardTitle === e.cardTitle);
    return cardIndex;
  }

  findCardElementIndex(cardIndex: number, e:any): number{
    const elementIndex = this.cards[cardIndex].elements.findIndex(element => element.label === e.elementLabel);
    return elementIndex;
  }

  /**
   * Set the balance cards configuration per classificationName
   *
   * @param {string} classificationName: The classification name for Financial
   * Events/Schedules according to the ClassificationTypeName
   * @param {*} accountingEventsData: Response from the API
   * @return {*}  {BalanceCardType[]}
   * @memberof FinancialCardComponent
   */
  setFinancialBalanceCards(
    classificationName: string,
    accountingEventsData: previousAccountingEvent,
    pageMode: string,
    portfolioSettings?: PortfolioSettingsResponse,
  ) : BalanceCardType[]{
    if(!accountingEventsData) return;
    const decimalPrecision = accountingEventsData.localCurrencyDecimalPrecision ?? 2;
    let cards:BalanceCardType[] = [];

    if(isClassificationTypeName(classificationName)){
      // Provision balance cards based on available data
      const balanceCards: {[key: string]: BalanceCardType} = {
        'assetBalance': {
            cardTitle: 'Asset Balance',
            value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.assetAmortization),
            valueSuffix: accountingEventsData.localCurrency,
            className: 'asset-balance',
            elements: [
              {
                label: 'Previous Balance',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.previousAssetBalance ?? 0,decimalPrecision),
              },
              {
                label: 'Direct Cost',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.directCosts ?? 0,decimalPrecision),
              },
              {
                label: 'System Adjustment',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.systemAssetAdjustment ?? 0,decimalPrecision),
              },
              {
                label: 'Manual Adjustment',
                value: this.formatService.localFormat(0,decimalPrecision),
                inputType: 'number',
                formControlName: 'assetBalanceManualAdjustment',
              },
              {
                label: 'Total Adjustment',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.systemAssetAdjustment ?? 0,decimalPrecision),
              },
            ],
          },
        'levelExpense': {
            cardTitle: 'Level Expense',
            value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.levelExpense, decimalPrecision),
            valueSuffix: accountingEventsData.localCurrency,
            elements:[
              {
                label: 'Undiscounted Amount',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.totalAmount, decimalPrecision),
              },
              {
                label: 'Carry Forward',
                value: this.formatService.localFormat(0, decimalPrecision), // TODO: Depends on Calculation Engine
              },
              {
                label: 'Direct Cost',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.directCosts, decimalPrecision),
              },
              {
                label: 'Number of Periods',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(this.getNumberOfPeriods(accountingEventsData, decimalPrecision)),
              },
              {
                label: 'Manual Adjustment',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.manualAssetAdjustment,decimalPrecision),
              },
            ],
          },
        'presentValue':{
            cardTitle: 'Present Value',
            value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.presentValue, decimalPrecision),
            valueSuffix: accountingEventsData.localCurrency,
            valueLink: pageMode === 'Add Event' ? undefined : '#', // TODO: Waiting for calculation engine
            elements:[
              {
                label: 'Undiscounted Amount',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.totalAmount, decimalPrecision),
              },
              {
                label: 'Annual Rate',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.discountRate, decimalPrecision) + '%',
              },
              {
                label: 'Term',
                value: pageMode === 'Add Event' ? 0 : this.getFormattedTermFromDays(accountingEventsData.termInDays ?? 0)
              },
              {
                label: 'Compound Frequency',
                inputType: 'select-box',
                formControlName: 'presentValueCompoundFrequency',
                disabled: pageMode === 'Add Event' ? false : true, // Only enabled when 'Add event'
                initialSelectedValue: portfolioSettings.defaultCompoundFrequencyType ?? 1,
                dataSource: [
                  { displayKey: 'Monthly', valueKey: 1, },
                  { displayKey: 'Daily', valueKey: 2, },
                ],
              },
              {
                label: 'Payment Timing',
                inputType: 'select-box',
                formControlName: 'presentValuePaymentTiming',
                initialSelectedValue: portfolioSettings.defaultPaymentTimingType ?? 1,
                dataSource: [
                  { displayKey: 'Beginning of Period', valueKey: 1, },
                  { displayKey: 'End of Period', valueKey: 2, },
                ],
              },
            ],
          },
        'liabilityBalance':{
            cardTitle: 'Liability Balance',
            value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.openingLiabilityBalance, decimalPrecision),
            valueSuffix: accountingEventsData.localCurrency,
            elements:[
              {
                label: 'Previous Liability',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.previousLiabilityBalance, decimalPrecision),
              },
              {
                label: 'Liability adjustment',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.liabilityAdjustmentAmount, decimalPrecision),
              },
            ],
          },
        'gainLoss':{
            cardTitle: 'Gain / Loss',
            value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.adjustmentGainLoss, decimalPrecision),
            valueSuffix: accountingEventsData.localCurrency,
            elements:[
              {
                label: 'Termination Fee',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.terminationFee, decimalPrecision),
              },
              {
                label: 'Liability adjustment',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.liabilityAdjustmentAmount, decimalPrecision),
              },
              {
                label: 'Total asset adjustment',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.assetAdjustmentAmount, decimalPrecision),
              },
            ],
          },
        'adjustments': {
          cardTitle: 'Adjustments',
          value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.adjustmentAmount, decimalPrecision),
          valueSuffix: accountingEventsData.localCurrency,
          elements:[
            {
              label: 'System Adjustment',
              value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.terminationFee, decimalPrecision),
            },
            {
              label: 'Manual Adjustment',
              value: this.formatService.localFormat(0,decimalPrecision),
              inputType: 'number',
              formControlName: 'adjustmentManualAdjustment',
            },
            {
              label: 'Total Adjustment',
              value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(0, decimalPrecision),
            },
          ],
        },
        'assetAmortization':{
            cardTitle: 'Asset Amortization',
            value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(
              accountingEventsData.assetAmortization,
              // Decimal Precision: Where amortizationMethodTypeID is 2 (daily), then use 14 decimal places;
              // otherwise assetAmortization is rounded to 0
              accountingEventsData.amortizationMethodTypeID === 2 ? 14 : 0,
            ),
            valueSuffix: accountingEventsData.localCurrency,
            className: 'asset-balance',
            elements: [
              {
                label: 'Opening Asset Balance',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.openingAssetBalance ?? 0,decimalPrecision),
              },
              {
                label: 'Number of periods',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(this.getNumberOfPeriods(accountingEventsData, decimalPrecision)),
              },
            ],
          },
        'straightLineExpense':{
            cardTitle: 'Straight Line Expense',
            value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.straightLineExpense, decimalPrecision),
            valueSuffix: accountingEventsData.localCurrency,
            elements:[
              {
                label: 'Undiscounted Amount',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.totalAmount, decimalPrecision),
              },
              {
                label: 'Adjustments',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.adjustmentAmount, decimalPrecision),
              },
              {
                label: 'Option Charges',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(0, decimalPrecision), // TODO: Pending for calculation engine
              },
              {
                label: 'Number of periods',
                value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(this.getNumberOfPeriods(accountingEventsData, decimalPrecision)),
              },
            ],
          },
          'straightLineIncome':{
              cardTitle: 'Straight Line Income',
              value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.straightLineExpense, decimalPrecision),
              valueSuffix: accountingEventsData.localCurrency,
              elements:[
                {
                  label: 'Undiscounted Amount',
                  value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.totalAmount, decimalPrecision),
                },
                {
                  label: 'Adjustments',
                  value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(accountingEventsData.adjustmentAmount, decimalPrecision),
                },
                {
                  label: 'Option Charges',
                  value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(0, decimalPrecision), // TODO: Pending for calculation engine
                },
                {
                  label: 'Number of periods',
                  value: pageMode === 'Add Event' ? 0 : this.formatService.localFormat(this.getNumberOfPeriods(accountingEventsData, decimalPrecision)),
                },
              ],
            },
      }

      // Pushing cards according to the classification type
      switch (classificationName) {
        case 'Finance (ASC 842)': {
          cards = this.upsertBalanceCard(cards,balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(cards,balanceCards['presentValue']);
          cards = this.upsertBalanceCard(cards,balanceCards['liabilityBalance']);
          cards = this.upsertBalanceCard(cards,balanceCards['assetAmortization']);
          if(pageMode === 'Remeasure Event')
            cards = this.upsertBalanceCard(cards,balanceCards['gainLoss']);
          break;
          }
        case 'Operating (ASC 842)': {
          cards = this.upsertBalanceCard(cards,balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(cards,balanceCards['levelExpense']);
          cards = this.upsertBalanceCard(cards,balanceCards['presentValue']);
          cards = this.upsertBalanceCard(cards,balanceCards['liabilityBalance']);
          if(pageMode === 'Remeasure Event')
            cards = this.upsertBalanceCard(cards,balanceCards['gainLoss']);
          cards = this.upsertBalanceCard(cards,balanceCards['adjustments']);
          break;
        }
        case 'IFRS 16': {
          cards = this.upsertBalanceCard(cards,balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(cards,balanceCards['presentValue']);
          cards = this.upsertBalanceCard(cards,balanceCards['liabilityBalance']);
          cards = this.upsertBalanceCard(cards,balanceCards['assetAmortization']);
          if(pageMode === 'Remeasure Event')
            cards = this.upsertBalanceCard(cards,balanceCards['gainLoss']);
          break;
        }
        case 'Capital 840': {
          cards = this.upsertBalanceCard(cards,balanceCards['assetBalance']);
          cards = this.upsertBalanceCard(cards,balanceCards['presentValue']);
          cards = this.upsertBalanceCard(cards,balanceCards['liabilityBalance']);
          if(pageMode === 'Remeasure Event')
            cards = this.upsertBalanceCard(cards,balanceCards['gainLoss']);
          break;
        }
        case 'Operating (Lessor)': {
          cards = this.upsertBalanceCard(cards,balanceCards['adjustments']);
          cards = this.upsertBalanceCard(cards,balanceCards['straightLineIncome']);
          break;
        }
        case 'Sales Type (Lessor)': {
          break;
        }
        case 'Operating 840': {
          cards = this.upsertBalanceCard(cards,balanceCards['straightLineExpense']);
          break;
        }
        default:{
          console.error('Unknown classification');
          break;
        }
      }
      // End Switch
    }
    return cards;
  }

  /**
   * It makes sure the balance card to push card is not duplicated
   * todo: Remove when the usage of the lifecycle hooks is fixed
   *
   * @param {BalanceCardType[]} cards
   * @param {BalanceCardType} newCard
   * @return {*}  {BalanceCardType}
   * @memberof FinancialCardComponent
   */
  private upsertBalanceCard(cards: BalanceCardType[], newCard: BalanceCardType): BalanceCardType[] {
    const cardIndex = cards.findIndex(card => card.cardTitle === newCard.cardTitle);
    if (cardIndex !== -1) {
      cards[cardIndex] = newCard;
      console.warn(`Card with title "${newCard.cardTitle}" already exists. Updated the existing card.`);
    } else {
      cards.push(newCard);
    }
    return cards;
  }

  /**
   * Return a different value depending on the amortizationMethodTypeID
   *
   * @private
   * @param {previousAccountingEvent} data
   * @param {number} decimalPrecision
   * @return {*}  {number}
   * @memberof FinancialCardComponent
   */
  private getNumberOfPeriods(data: previousAccountingEvent, decimalPrecision: number): number{
    switch(data.amortizationMethodTypeID) {
      // Periodic
      case 0:
      case 1: {
        return data.termInPeriods;
      }
      // Daily
      case 2: {
        return Number(this.formatService.localFormat(data.termInDays, decimalPrecision));
      }
    }
  }

  /**
   * Transform number of days into a formatted string
   * e.g.: Input: 1148 -> 3 years, 1 month, 23 days
   *
   * @private
   * @param {number} numberOfDays
   * @return {*}  {string}
   * @memberof FinancialCardComponent
   */
  private getFormattedTermFromDays(numberOfDays:number): string {
    // Transform days to years/months/days
    const years: number  = Math.floor(numberOfDays / 365);
    const months: number = Math.floor(numberOfDays % 365 / 30);
    const days: number   = Math.floor(numberOfDays % 365 % 30);

    // Get verbiage
    const year_text: string = years === 1 ? ' year ' : ' years ';
    const mon_text: string  = months <= 1 ? ' month ' : ' months ';
    const day_text: string  = days <= 1 ? ' day' : ' days';

    return years + year_text + (months != 0 ? months + mon_text: '') + (days != 0 ? days + day_text : '');
  }

}