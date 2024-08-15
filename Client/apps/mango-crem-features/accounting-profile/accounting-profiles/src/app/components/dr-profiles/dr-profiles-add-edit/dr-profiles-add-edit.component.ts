/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';

import notify from 'devextreme/ui/notify';

import { DiscountRateProfile } from '../../../models/discount-rate-profile.model';
import { PortfolioSettings } from '../../../models/portfolio-settings.model';
import { DiscountRateAssociatedSchedules } from '../../../models/discount-rate-schedules.model';
import { BaseService } from '../../../services/base.service';
import { PortfolioDropdownService } from '../../../services/portfolio-dropdown.service';
import { DiscountRateService } from '../../../services/discount-rate.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-discount-rate-profiles-add-edit',
  templateUrl: './dr-profiles-add-edit.component.html',
  styleUrls: ['./dr-profiles-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DiscountRateProfilesAddEditComponent implements OnInit, AfterViewInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  minCompare = '<=';
  maxCompare = '>=';
  minDate = new Date(1900, 12, 31);
  isAdd = false;
  isActive = false;
  userHasEditRights = false;
  colonSetting = false;
  masterGroupID: number;
  policyId: number;
  formData: DiscountRateProfile;
  portfolioSettings: PortfolioSettings;
  initialRateType = 0;
  profileName = '';
  annualRateTypes = [{ Id: 1, Name: 'APR' }, { Id: 2, Name: 'APY' }];
  countriesList = [];
  currenciesList = [];
  minMonthOp = '';
  maxMonthOp = '';
  lblMinMaxFormula = '';
  discountRateAssociatedSchedules: DiscountRateAssociatedSchedules;
  associatedSchedulesPopupVisible = false;
  isFirstLoad = false;
  formDataOriginal: DiscountRateProfile;
  loading = true;
  disableToggleAnimation = true;

  dateFormat = 'MM/dd/yyyy';
  dateTimeFormat = 'MM/dd/yyyy HH:mm'

  dateFormatterNoTime = {
    type: 'MM/dd/yyyy',
    parser(dateString) {
      if (dateString.includes('.')) {
        const dateArray = dateString.split('.', 3);
        dateString = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
      }
      return new Date(dateString);
    },
  };

  dateFormatterWithTime = {
    type: 'MM/dd/yyyy HH:mm',
    parser(dateString) {
      if (dateString.includes('.')) {
        const dateArray = dateString.split('.', 3);
        dateString = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
      }
      return new Date(dateString);
    },
  };

  constructor(public service: DiscountRateService,
    public baseService: BaseService,
    public portfolioService: PortfolioDropdownService,
    public activeRoute: ActivatedRoute,
    public router: Router) {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const discountRateAmount = document.getElementById('discount-rate__amount')?.firstChild?.firstChild?.firstChild as HTMLElement;
      discountRateAmount?.focus();
    }, 500)

  }

  ngOnInit(): void {
    this.isFirstLoad = true;
    if (this.service.userRights === 2) {
      this.userHasEditRights = true;
    }
    this.activeRoute.paramMap.subscribe((params) => {
      this.masterGroupID = +params.get('masterGroupId');
      this.portfolioService.selectedPortfolioId = this.masterGroupID;

      this.formData = new DiscountRateProfile(0, this.masterGroupID, null, '', null, null, null, '', '',
        '', 1, 0, '', '', '', '', false, false, 0, null, null, -1, -1, false);

      this.discountRateAssociatedSchedules = new DiscountRateAssociatedSchedules(0, 0, 0, 0);

      if (this.portfolioService.portfolios === undefined
          || this.portfolioService.portfolios.length === 0) {
        this.portfolioService.getPortfolios().subscribe((result) => {
          this.portfolioService.portfolios = result.data;
          if (this.portfolioService.selectedPortfolio === undefined
              || this.portfolioService.selectedPortfolio === null) {
            const filter = this.portfolioService.portfolios.filter(
              (obj) => obj.masterGroupID === this.portfolioService.selectedPortfolioId,
            );

            this.portfolioService.selectedPortfolio = filter[0];
          }
        });
      }

      // populate dropdowns and settings

      this.populateCountriesList();
      this.populateCurrenciesList();
      this.populatePortfolioSettings();

      if (+params.get('policyId') !== 0) {
        this.isAdd = false;
        this.policyId = +params.get('policyId');

        this.service.getDiscountRateProfile(this.masterGroupID, this.policyId)
          .subscribe((result) => {
            this.formData = result.data;
            this.formData.portfolio = this.portfolioService.selectedPortfolio;
            this.formData.annualRateType = Number(result.annualRateType);
            this.initialRateType = this.formData.annualRateType;
            this.formData.effectiveDate = new Date(result.effectiveDate);
            this.formData.termRangeMinMonths = Number(result.termRangeMinMonths);
            this.formData.termRangeMaxMonths = Number(result.termRangeMaxMonths);
            this.formData.triggerRecalculation = false;
            this.isActive = result.active;
            this.formDataOriginal = { ...this.formData };
            this.setContentVisible();
          });

        this.populateAssociatedSchedules();
      } else {
        this.isAdd = true;
        this.isActive = true;
        this.formData.masterGroupId = this.portfolioService.selectedPortfolioId;
      }
    });

    if (this.service.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
      this.dateTimeFormat = 'dd.MM.yyyy HH:mm';
      this.dateFormatterNoTime.type = 'dd.MM.yyyy';
      this.dateFormatterWithTime.type = 'dd.MM.yyyy HH:mm';
    }
  }

  populateCountriesList(): void {
    this.service.getCountries()
      .subscribe(result => {
        this.countriesList = result.data;
      });
  }

  populateCurrenciesList(): void {
    this.service.getCurrencies()
      .subscribe(result => {
        this.currenciesList = result.data;
      });
  }

  populatePortfolioSettings(): void {
    this.baseService.getPortfolioSettings(this.masterGroupID).subscribe((result) => {
      this.portfolioSettings = result.data;
      if (this.isAdd) {
        this.initialRateType = this.portfolioSettings.defaultAnnualRateType;
        this.setContentVisible();
      }
      this.minMonthOp = this.portfolioSettings.minMonthsOperator === 0 ? ' < ' : ' \u2264 ';
      this.maxMonthOp = this.portfolioSettings.maxMonthsOperator === 0 ? ' < ' : ' \u2264 ';

      // if (this.minMonthOp !== null && this.maxMonthOp !== null) {
      //   this.lblMinMaxFormula = `${this.formData.termRangeMinMonths?.toString() + this.minMonthOp}(Number of Months)${
      //     this.maxMonthOp}${this.formData.termRangeMaxMonths?.toString()}`;
      // }
    });
  }

  cancelAddEditAction() {
    this.navigateToDiscountRateProfiles();
  }

  btnSaveProfile() {
    const result = this.form.instance.validate();
    if (!result.isValid) {
      console.log('Invalid!');
      return;
    }

    if (this.discountRateAssociatedSchedules.total() > 0 && this.formChanged()) {
      this.associatedSchedulesPopupVisible = true;
      this.formData.triggerRecalculation = true;
      return;
    }

    this.saveProfile();
  }

  saveProfile() {
    this.formData.masterGroupId = this.portfolioService.selectedPortfolioId;
    this.formData.amount = Number(this.formData.amount);
    this.formData.termRangeMinMonths = Number(this.formData.termRangeMinMonths);
    this.formData.termRangeMaxMonths = Number(this.formData.termRangeMaxMonths);
    this.formData.effectiveDateString = new Date(
      this.formData.effectiveDate.getFullYear(),
      this.formData.effectiveDate.getMonth(),
      this.formData.effectiveDate.getDate()
    ).toDateString();

    this.formData.annualRateType = this.initialRateType;

    this.service.saveDiscountRateProfile(this.formData).subscribe((saveResult) => {
      if (saveResult > 0) {
        notify({
          message : 'Record saved successfully.',
          type : 'success',
          displayTime : 2000,
          position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
          maxWidth : '400px',
          closeOnClick : true,
        });

        this.navigateToDiscountRateProfiles();
      } else {
        notify({
          message : 'Record save failed.',
          type : 'error',
          displayTime : 2000,
          position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
          maxWidth : '400px',
          closeOnClick : true,
        });
      }
    });
  }

  formChanged(): boolean {
    return Number(this.formData.amount) !== this.formDataOriginal.amount ||
      this.formData.annualRateType !== this.formDataOriginal.annualRateType;
  }

  navigateToDiscountRateProfiles() {
    this.router.navigate(['discountrateprofiles', this.masterGroupID], { relativeTo: this.activeRoute.parent, queryParamsHandling: 'merge' });
  }

  deleteProfile() {
    // console.log(this.formData.policyId);
    return
  }

  validateDiscountRate(): boolean {
    const number = Number((this as any).value).toString();

    if (number.indexOf('.') === -1) { // whole number, must be less than 18 total digits.
      return (number.length <= 18);
    }
    const splitRate = number.split('.');

    if (splitRate.length > 2) { // multiple decimal places entered
      return false;
    }

    if ((splitRate[0].length + splitRate[1].length) > 18) {
      return false;
    }

    if (splitRate[1].length > 14) { // since its a decimal, precision cant exceed 14
      return false;
    }

    return true;
  }

  validateTerm(): boolean {
    const number = Number((this as any).value).toString();

    if (number.indexOf('.') === -1) { // whole number, must be less than 20 total digits.
      return (number.length <= 20);
    }
    const splitRate = number.split('.');

    if (splitRate.length > 2) { // multiple decimal places entered
      return false;
    }

    if ((splitRate[0].length + splitRate[1].length) > 20) {
      return false;
    }

    if (splitRate[1].length > 14) { // since its a decimal, precision cant exceed 14
      return false;
    }

    return true;
  }

  compareMinToMax = () => Number(this.form.instance.option('formData').termRangeMaxMonths)

  compareMaxToMin = () => Number(this.form.instance.option('formData').termRangeMinMonths)

  formMinMonthsChange() {
    if (this.form === null || this.form === undefined) {
      return;
    }

    if (this.form.instance.option('formData').termRangeMinMonths === null
        || this.form.instance.option('formData').termRangeMinMonths === undefined) {
      return;
    }

    this.form.instance.validate();
  }

  onFormChange(column: string, event: any) {
    this.formData[column] = event.value;

    if (column === 'termRangeMinMonths') {
      this.formMinMonthsChange();
    }

    this.updateName();
    this.setupMinMaxFormula();
  }

  formMaxMonthsChange() {
    if (this.form === null || this.form === undefined) {
      return;
    }

    if (this.form.instance.option('formData').termRangeMinMonths === null
        || this.form.instance.option('formData').termRangeMinMonths === undefined) {
      return;
    }

    this.form.instance.validate();
  }

  updateName() {
    this.clearAsterisks();
    const minMonth = (this.formData.termRangeMinMonths ?? 0)*1;
    const maxMonth = (this.formData.termRangeMaxMonths ?? 0)*1;

    const effectiveDateArray = this.formData.effectiveDate?.toDateString().split(' ');
    let effectiveDateString = '';
    
    if (effectiveDateArray !== null 
      && effectiveDateArray !== undefined 
      && effectiveDateArray.length == 4)
    {
      effectiveDateString = `${effectiveDateArray[2]} ${effectiveDateArray[1]} ${effectiveDateArray[3]}`;
    }

    this.formData.policyName = `${this.formData.amount?.toString() ?? '0'}% | ${
                                minMonth.toString()} - ${
                                maxMonth.toString()} Months | ${
                                effectiveDateString} | ${
                                this.formData.currency.toString() === '' ? 'No Currency' : this.formData.currency.toString()} | ${
                                this.formData.country.toString() === '' ? 'No Country' : this.formData.country.toString()}`;
  }

  setupMinMaxFormula(): void {
    if (this.form.instance.option('formData').termRangeMinMonths === null
        || this.form.instance.option('formData').termRangeMinMonths === undefined
        || this.form.instance.option('formData').termRangeMaxMonths === null
        || this.form.instance.option('formData').termRangeMaxMonths === undefined
        || this.minMonthOp === ''
        || this.maxMonthOp === '') {
      return;
    }

    if (this.isFirstLoad) {
      if (this.minMonthOp !== null && this.maxMonthOp !== null) {
        this.lblMinMaxFormula = `${this.formData.termRangeMinMonths.toString() + this.minMonthOp}(Number of Months)${
          this.maxMonthOp}${this.formData.termRangeMaxMonths.toString()}`;
      }
    } else {
      this.lblMinMaxFormula = `${this.form.instance.option('formData').termRangeMinMonths.toString() + this.minMonthOp}(Number of Months)${
        this.maxMonthOp}${this.form.instance.option('formData').termRangeMaxMonths.toString()}`;
    }

  }

  getFormula() {
    return this.lblMinMaxFormula;
  }

  populateAssociatedSchedules() {
    this.service.getAssociatedAmortizationSchedules(this.policyId)
      .subscribe((result) => {
        this.discountRateAssociatedSchedules = new DiscountRateAssociatedSchedules(
          result.scheduled, result.historical, result.inProcess, result.remeasures,
        );
      });
  }

  onContentReady() {
    this.clearAsterisks();
  }

  clearAsterisks() {
    const els = Array.from(document.getElementsByClassName('dx-field-item-required-mark'));

    els.forEach(el => {
      el.innerHTML = '';
    });
  }

  associatedPopupOk() {
    this.associatedSchedulesPopupVisible = false;
    this.saveProfile();
  }

  associatedPopupCancel() {
    this.associatedSchedulesPopupVisible = false;
  }

  setContentVisible(): void {
    this.disableToggleAnimation = true;
    this.loading = false;
    setTimeout(() => {
      this.disableToggleAnimation = false;
      const discountRateAmount = document.getElementById('discount-rate__amount')?.firstChild?.firstChild?.firstChild as HTMLElement;
      discountRateAmount?.focus();
    }, 2000)
  }
}
