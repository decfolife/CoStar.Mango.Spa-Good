import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import notify from 'devextreme/ui/notify';
import { PortfolioSettings } from '../../models/portfolio-settings.model';
import { AccountingSettingsService } from '../../services/accounting-settings.service';
import { BaseService } from '../../services/base.service';
import { DropdownsService } from '../../services/dropdowns.service';
import { PortfolioDropdownService } from '../../services/portfolio-dropdown.service';
import { MeasureEventSettingsComponent } from '../measure-event-settings/measure-event-settings.component';

@Component({
  selector: 'app-accounting-settings',
  templateUrl: './accounting-settings.component.html',
  styleUrls: ['./accounting-settings.component.scss'],
})
export class AccountingSettingsComponent implements OnInit {
  @ViewChildren(MeasureEventSettingsComponent)
  private measureEventSettings: QueryList<MeasureEventSettingsComponent>;

  accountingCalendars = [];
  amortizationMethodTypes = [
    { Id: 1, Name: 'Periodic' },
    { Id: 2, Name: 'Daily' },
  ];
  defaultPaymentTimingTypes = [
    { Id: 1, Name: 'Beginning of Period' },
    { Id: 2, Name: 'End of Period' },
  ];
  defaultCompoundFrequencyTypes = [
    { Id: 1, Name: 'Monthly' },
    { Id: 2, Name: 'Daily' },
  ];
  minMonthsOperators = [
    { Id: 0, Name: 'Greater than' },
    { Id: 1, Name: 'Greater than or equal to' },
  ];
  maxMonthsOperators = [
    { Id: 0, Name: 'Less than' },
    { Id: 1, Name: 'Less than or equal to' },
  ];
  defaultAnnualRateTypes = [
    { Id: 1, Name: 'APR' },
    { Id: 2, Name: 'APY' },
  ];
  functionalCurrencyRatesets = [
    { Id: 1, Name: 'Direct Entry', visible: false },
    { Id: 2, Name: 'Average Rateset', visible: true },
    { Id: 3, Name: 'Spot Rateset', visible: true },
  ];
  functionalCurrencyPeriods = [
    { Id: 1, Name: 'Current Period' },
    { Id: 2, Name: 'Prior Period' },
  ];
  dropDownValues: any;
  classificationTypes: any;
  isFrameless = true;
  userRightsLoaded = false;
  // loading: boolean = true;
  loading = false;
  disableToggleAnimation = false;
  PortfolioClassificationConfigurationLoaded = false;
  portfolioSettingsSave = false;
  classificationConfigurationSave = false;
  hasModuleRights = true;

  tooltipEnv: string;
  constructor(
    public service: AccountingSettingsService,
    public dropDownService: DropdownsService,
    public baseService: BaseService,
    public portfolioDropdownService: PortfolioDropdownService
  ) {}
  ngOnInit(): void {
    this.baseService.HasUserModuleRight().subscribe((response) => {
      this.hasModuleRights = response;
      if (this.hasModuleRights) {
        this.service.portfolioSettings = new PortfolioSettings(
          0,
          1,
          1,
          1,
          1,
          1,
          0,
          1,
          1,
          1,
          1,
          1,
          'Direct Entry',
          '',
          1
        );
        this.isFrameless =
          document.getElementById('IsFrameless')?.innerText !==
          'NonFramelessUser';
        this.populateAccountingCalendars();
        this.populateUserRights();
      }
    });
  }

  populateUserRights() {
    this.baseService.getUserRights().subscribe((result) => {
      this.baseService.userRights = Number(result.data);
      this.userRightsLoaded = true;
      this.checkloading();
    });
  }

  populateAccountingCalendars(): void {
    this.service.getAccountingCalendars().subscribe((result: any) => {
      this.accountingCalendars = result.data;
    });
  }

  checkloading() {
    if (
      this.userRightsLoaded &&
      this.PortfolioClassificationConfigurationLoaded
    ) {
      this.disableToggleAnimation = true;
      this.loading = false;
      setTimeout(() => {
        this.disableToggleAnimation = false;
      }, 2000);
    }
  }

  getPortfolioClassificationConfiguration(masterGroupId: number): void {
    this.dropDownService
      .getPortfolioClassificationConfiguration(masterGroupId)
      .subscribe((result) => {
        this.dropDownService.classificationConfiguration = result.data;
        this.PortfolioClassificationConfigurationLoaded = true;
        this.checkloading();
      });
  }

  getPortfolioSettings(masterGroupId: number): void {
    this.dropDownService.classificationConfiguration = [];
    this.service.getPortfolioSettings(masterGroupId).subscribe((result) => {
      const settings = result.data.item1;
      this.service.isCalendarInUse = result.data.item2;
      this.service.portfolioSettings = new PortfolioSettings(
        settings.masterGroupID,
        settings.leaseRecognitionCalendarID,
        settings.amortizationMethodType,
        settings.defaultPaymentTimingType,
        settings.journalEntryProfileRequired,
        settings.defaultCompoundFrequencyType,
        settings.functionalCurrencyEnabled,
        settings.discountRateMatching,
        settings.directEntryDiscountRateEnabled,
        settings.defaultAnnualRateType,
        settings.minMonthsOperator,
        settings.maxMonthsOperator,
        settings.functionalCurrencyRateset,
        settings.functionalCurrencyPeriod,
        settings.directEntryFunctionalCurrencyRateEnabled
      );

      this.service.originalSettings = { ...this.service.portfolioSettings }; //for change tracking

      //remove daily option from Amortization Method Types if no active schedules and default calendar initially
      if (this.service.isCalendarInUse === false) {
        if (+settings.leaseRecognitionCalendarID === 1) {
          this.amortizationMethodTypes = this.amortizationMethodTypes.filter(
            (item) => item.Name === 'Periodic'
          );
        }
      }

      //show direct entry option, if direct entry is allowed
      if (settings.directEntryFunctionalCurrencyRateEnabled) {
        this.functionalCurrencyRatesets.filter((f) => f.Id === 1)[0].visible =
          true;
      }
    });

    this.dropDownService
      .getPortfolioClassificationConfigurationOptions(masterGroupId)
      .subscribe((result) => {
        this.dropDownValues = result.data;

        //Add static values to journal entry profile options.
        this.dropDownValues.journalEntryProfiles.unshift({
          profileID: 'Direct Entry',
          profileName: 'Direct Entry',
        });
        this.dropDownValues.journalEntryProfiles.unshift({
          profileID: 'Prior Value',
          profileName: 'Prior Value',
        });

        this.service.getClassificationTypes().subscribe((result) => {
          this.classificationTypes = result.data;
        });

        this.getPortfolioClassificationConfiguration(masterGroupId);
      });
  }

  functionalCurrencyRateDirectEntryChanged() {
    if (
      this.service.portfolioSettings.directEntryFunctionalCurrencyRateEnabled ==
      false
    ) {
      this.functionalCurrencyRatesets.filter((f) => f.Id === 1)[0].visible =
        false;
      if (
        this.service.portfolioSettings.functionalCurrencyRateset ===
        'Direct Entry'
      ) {
        this.service.portfolioSettings.functionalCurrencyRateset =
          'Average Rateset';
      }
    } else {
      this.functionalCurrencyRatesets.filter((f) => f.Id === 1)[0].visible =
        true;
    }
  }

  functionalCurrencyRatesetChanged() {
    if (
      this.service.portfolioSettings.functionalCurrencyRateset == 'Direct Entry'
    ) {
      this.service.portfolioSettings.functionalCurrencyPeriod = null;
    } else if (
      this.service.portfolioSettings.functionalCurrencyRateset !==
        'Direct Entry' &&
      this.service.portfolioSettings.functionalCurrencyPeriod == null
    ) {
      this.service.portfolioSettings.functionalCurrencyPeriod =
        this.functionalCurrencyPeriods[0].Name;
    }
  }

  leaseRecognitionCalendarChanged() {
    if (this.service.portfolioSettings) {
      if (+this.service.portfolioSettings.leaseRecognitionCalendarID !== 1) {
        this.service.portfolioSettings.defaultCompoundFrequencyType = 2;

        if (
          this.amortizationMethodTypes.filter((e) => e.Name === 'Daily')
            .length <= 0
        ) {
          this.amortizationMethodTypes.push({ Id: 2, Name: 'Daily' });
        }
      } else {
        if (
          this.amortizationMethodTypes.filter((e) => e.Name === 'Daily')
            .length > 0
        ) {
          this.amortizationMethodTypes = this.amortizationMethodTypes.filter(
            (item) => item.Name === 'Periodic'
          );
        }
      }
    }
  }

  saveSettings() {
    this.portfolioSettingsSave = true;
    this.classificationConfigurationSave = true;
    let saveShown = false;

    if (
      !this.shallowEqual(
        this.service.originalSettings,
        this.service.portfolioSettings
      )
    ) {
      this.service
        .savePortfolioSettings(this.service.portfolioSettings)
        .subscribe((result) => {
          if (result.success) {
            this.service.originalSettings = {
              ...this.service.portfolioSettings,
            }; // update original for continued tracking if necessary
            if (!saveShown) {
              notify({
                message: 'Record saved successfully.',
                type: 'success',
                displayTime: 2000,
                position: {
                  at: 'bottom right',
                  my: 'bottom right',
                  offset: '-16 -16',
                },
                maxWidth: '400px',
                closeOnClick: true,
              });

              saveShown = true;
            } else {
              // do nothing, already showed a save
            }

            this.portfolioSettingsSave = false;
          } else {
            notify({
              message: 'Settings failed to save.',
              type: 'error',
              displayTime: 2000,
              position: {
                at: 'bottom right',
                my: 'bottom right',
                offset: '-16 -16',
              },
              maxWidth: '400px',
              closeOnClick: true,
            });

            this.portfolioSettingsSave = false;
          }
        });
    } else {
      this.portfolioSettingsSave = false;
    }

    let configurations = [];
    this.measureEventSettings.forEach((f) => {
      const config = f.saveChanges();
      if (config === null || config === undefined) {
        return;
      }
      configurations = [...configurations, ...config];
    });

    if (configurations.length > 0) {
      this.service
        .savePortfolioSettingsConfiguration(configurations)
        .subscribe((result) => {
          if (result.success) {
            this.measureEventSettings.forEach((f) => {
              f.dataGrid.instance.saveEditData();
            });

            if (!saveShown) {
              notify({
                message: 'Record saved successfully.',
                type: 'success',
                displayTime: 2000,
                position: {
                  at: 'bottom right',
                  my: 'bottom right',
                  offset: '-16 -16',
                },
                maxWidth: '400px',
                closeOnClick: true,
              });

              saveShown = true;
            } else {
              // do nothing, already showed a save
            }

            this.classificationConfigurationSave = false;
          } else {
            notify({
              message: 'Classification configurations failed to save.',
              type: 'error',
              displayTime: 2000,
              position: {
                at: 'bottom right',
                my: 'bottom right',
                offset: '-16 -16',
              },
              maxWidth: '400px',
              closeOnClick: true,
            });

            this.classificationConfigurationSave = false;
          }
        });
    } else {
      this.classificationConfigurationSave = false;
    }
  }

  shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  dropDownChange(column, event) {
    this.service.portfolioSettings[column] = event.value;
  }
}
