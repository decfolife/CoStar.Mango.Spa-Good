/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { BaseService } from '../../services/base.service';

import { BatchParametersService } from '../../services/batch-parameters.service';
import {
  ClassificationType,
  MeasureEvent,
  MeasureEventSetting,
  ParameterOverrides,
  ParametersData,
} from '../../shared/models';

interface IDropdownOptions {
  id: string;
}

@Component({
  selector: 'mango-parameters-grid',
  templateUrl: './parameters-grid.component.html',
  styleUrls: ['./parameters-grid.component.scss']
})
export class ParametersGridComponent implements OnInit {
  discountRateOptions: IDropdownOptions[];
  functionalRateOptions: IDropdownOptions[];
  defaultManualAdjustmentOptions: IDropdownOptions[];
  commentsOptions: IDropdownOptions[];

  beginDateReadOnly = false;
  discountRateReadOnly = false;

  private _isValid = false;
  get isValid() {
    return this._isValid;
  }

  portfolioClassificationConfigurationOptions: any;
  portfolioSettings: any;

  portfolioClassificationConfiguration: any = [];

  measureEventType: MeasureEvent;
  parameterOverrides: ParameterOverrides;

  parameterOverrideRequired = {
    accountingTermBeginDateOverride: false,
    accountingTermEndDateOverride: false,
    commentsOverride: false,
    discountRateOverride: false,
    annualRateOverride: false,
    annualRateTypeOverride: false,
    manualAssetAdjustmentOverride: false,
    paymentTimingOverride: false,
  };

  private remeasureParameters: MeasureEventSetting[];

  @Input()
  isReadOnly = false;

  @Input()
  classificationTypes: ClassificationType[] = [];

  @Input()
  masterGroupID: number;

  @Input()
  parametersData: ParametersData;

  @ViewChild('AvailableDataGrid', { static: false })
  availableDataGrid: DxDataGridComponent;

  @ViewChild('DirectEntryForm', { static: false })
  form: DxFormComponent;

  get gridData() {
    return this.remeasureParameters;
  }

  get annualRateText(): string {
    return  `${this.parameterOverrides?.annualRateOverride ?? ''}% ` +
      `${this.parameterOverrides?.annualRateTypeOverride ?? ''}`;
  }

  constructor(
    public batchParametersService: BatchParametersService,
    public baseService: BaseService
  ) {
    this.parameterOverrides = {
      accountingTermBeginDateOverride: null,
      accountingTermEndDateOverride: null,
      annualRateOverride: null,
      annualRateTypeOverride: null,
      commentsOverride: null,
      discountRateOverride: null,
      manualAssetAdjustmentOverride: null,
      paymentTimingOverride: null,
    };
   }

  ngOnInit(): void {
    this.populatePortfolioClassificationConfigurationOptions();
    this.populatePortfolioSettingsAndPortfolioClassificationConfiguration();

    if (this.parametersData?.gridLoaded) {
      this.parameterOverrides = this.parametersData?.gridOverrides;
      this.remeasureParameters = this.parametersData?.gridData;
    }

    this.setDefaultGridEditorOptions();
  }

  getClassificationName(classificationId: number): string {
    const classification = this.classificationTypes
      .find(x => x.classificationID === classificationId);

    return classification?.classificationType;
  }

  onToolbarPreparing(e): void {
    e.toolbarOptions.visible = false;
  }

  setMeasurementSettingsByMeasureEvent(measureEventType: MeasureEvent): void {
    if (this.isReadOnly) {
      this.checkFullTermination(this.parametersData.cardMeasureEvent);
      return;
    }

    this.measureEventType = measureEventType;

    if (!measureEventType) {
      if (!this.remeasureParameters) {
        this.remeasureParameters = [];
      }

      //This is needed when a user clicks the previous button on the confirmation screen so that
      //the correct values are loaded in the Classification Parameters dropdowns
      if(this.parametersData.cardMeasureEvent.remeasureTypeName){
        this.checkFullTermination(this.parametersData.cardMeasureEvent)
      }

      return;
    }

    this.availableDataGrid?.instance.beginCustomLoading('Loading...');

    this.remeasureParameters = this.portfolioClassificationConfiguration
      .filter(itm => {
        return itm.remeasureTypeName === measureEventType.remeasureTypeName &&
          this.classificationTypes?.find(x => x.classificationID === itm.classificationID);
      }).map(item => {
        if (item.journalEntryOption === 'Direct Entry') {
          item.journalEntryProfileID = -1;
        }

        return item;
      });

    this.setDefaultGridEditorOptions();
    this.filterDiscountRateOptions();
    this.checkFullTermination(measureEventType);

    this.availableDataGrid?.instance.endCustomLoading();
    this.availableDataGrid?.instance.repaint();
  }

  checkFullTermination(measureEventType: MeasureEvent) {
    const isFullTermination = measureEventType.remeasureTypeName === 'Full Termination';

    this.beginDateReadOnly = isFullTermination;
    this.discountRateReadOnly = isFullTermination;

    if (isFullTermination) {
      this.defaultManualAdjustmentOptions = [{ id: 'No Adjustment' }];
      this.discountRateOptions = [{ id: 'Not Applicable' }];

      this.parameterOverrides.annualRateOverride = '0';

      this.remeasureParameters.forEach(item => {
        const anyItem = (item as any)

        anyItem.manualAdjustmentOption = 'No Adjustment';
        anyItem.discountRateProfile = 'Not Applicable';
      });
    }
  }

  discountRateParameterChange(item, e): void {
    this.parameterOverrides[item] = e.value;
  }

  onEditorPreparing(evt) {
    switch (evt.dataField) {
      case 'beginValueExpr':
        evt.editorOptions.onValueChanged = (event) => {
          const parts = event.value.split(' ');

          evt.row.data.beginDateOptionID = +parts[1];
          evt.row.data.beginDateFormItemID = +parts[3];
          evt.row.data.beginValueExpr = event.value;

          if (+evt.row.data.beginDateFormItemID === -1) {
            evt.row.data.beginDateFormItemID = null;
          }
        }
        break;

      case 'endValueExpr':
        evt.editorOptions.onValueChanged = (event) => {
          const parts = event.value.split(' ');

          evt.row.data.endDateOptionID = +parts[1];
          evt.row.data.endDateFormItemID = +parts[3];
          evt.row.data.endValueExpr = event.value;

          if (+evt.row.data.endDateFormItemID === -1) {
            evt.row.data.endDateFormItemID = null;
          }
        }
        break;

      case 'journalEntryProfileID': {
        const leaseRecType = evt.row.data.classificationID;
        const filtered = this.portfolioClassificationConfigurationOptions
          .journalEntryProfiles
          .filter(x => x.leaseRecognitionType === leaseRecType)

        evt.editorOptions.dataSource = [
          {
            profileName: 'Select a Profile...',
            profileID: -1,
            leaseRecognitionType: null
          }, {
            profileName: 'Prior Value',
            profileID: null,
            leaseRecognitionType: null
          },
          ...filtered
        ];
        break;
      }
    }
  }

  onParameterCellChange(): void {
    if (this.availableDataGrid?.instance.hasEditData()) {
      this.availableDataGrid?.instance.saveEditData();
    }

    // needed timeout so grid can update data
    setTimeout(this.parameterChange, 100);
  }

  updateValidity() {
    if (!this.form) {
      return;
    }

    const result = this.form?.instance.validate();
    const dro = this.validateDiscountRateOverride();
    const profiles = this.validateJEProfiles();

    this._isValid = (result ? result.isValid : false) && dro && profiles;
  }

  // *** Fat-arrow functions for proper 'this' context

  annualRateValueChanged = (evt) => {
    if (evt.value) {
      return;
    }

    this.parameterOverrides.annualRateOverride = null;
    this.parameterOverrides.annualRateTypeOverride = null;
    this.parameterOverrides.paymentTimingOverride = null;
    this.parameterOverrides.discountRateOverride = null;
  }

  updateDiscountRate = (evt) => {
    if (evt.value === null) {
      return;
    }

    this._isValid = this.validateDiscountRateOverride();

    this.parameterOverrides.discountRateOverride = this.isValid
      ? this.annualRateText
      : null;
  }

  validateJEProfiles() {
    let isValid = true;

    this.availableDataGrid?.instance.getDataSource()?.items()
      .forEach(item => {
        item.journalEntryOption = this.portfolioClassificationConfigurationOptions
          ?.journalEntryProfiles
          .find(x => x.profileID === item.journalEntryProfileID)?.profileName;

        if (item.journalEntryProfileID < 0) isValid = false;
    });

    return isValid;
  }

  validateJEProfile = (obj: any) => {
    if (!obj.data) return obj.value >= 0;

    const profile = this.portfolioClassificationConfigurationOptions
      ?.journalEntryProfiles.find(x => x.profileID === obj.value);

    obj.data.journalEntryOption = profile.profileName;

    return profile.profileID === null || profile.profileID >= 0;
  }

  validateRateRange = (obj: any) => {
    if (obj.value === null || obj.value === undefined) return false;

    if (obj.value < -9999 || obj.value > 9999) return false;

    const parts = obj.value.toPrecision().split('.');

    if (parts.length > 1) {
      return parts[0].length <= 4 && parts[1].length <= 14 && obj.value.toPrecision().length <= 18;
    }

    return true;
  }

  validateBeginDate = (obj: any) => {
    if (!obj.value || !this.parameterOverrides.accountingTermEndDateOverride) {
      return true;
    }

    const beginDate = new Date(obj.value);
    const endDate = new Date(this.parameterOverrides.accountingTermEndDateOverride);

    return beginDate <= endDate;
  }

  validateEndDate = (obj: any) => {
    if (!obj.value || !this.parameterOverrides.accountingTermBeginDateOverride) {
      return true;
    }

    const beginDate = new Date(this.parameterOverrides.accountingTermBeginDateOverride);
    const endDate = new Date(obj.value);

    return beginDate <= endDate;
  }

  validateDiscountRateOverride = (): boolean => {
    if (!this.parameterOverrideRequired.discountRateOverride) {
      return true;
    }

    const hasAnnualRate = this.parameterOverrides.annualRateOverride !== null &&
      this.parameterOverrides.annualRateOverride !== undefined;

    const isValid = (hasAnnualRate &&
      this.validateRateRange({ value: this.parameterOverrides.annualRateOverride }) &&
      !!this.parameterOverrides.annualRateTypeOverride &&
      !!this.parameterOverrides.paymentTimingOverride);

    return isValid;
  }

  private parameterChange = () => {
    const dataItems = this.availableDataGrid?.instance.getDataSource()?.items();

    if (!dataItems) {
      return;
    }

    this.parameterOverrideRequired.accountingTermBeginDateOverride = dataItems
      .some((data) => {
        return data.beginValueExpr === 'OptionID: 2 FormItemID: -1';
      });

    this.parameterOverrideRequired.accountingTermEndDateOverride = dataItems
      .some((data) => {
        return data.endValueExpr === 'OptionID: 2 FormItemID: -1';
      });

    this.parameterOverrideRequired.commentsOverride = dataItems
      .some((data) => {
        return data.commentsOption === 'Direct Entry';
      });

    this.parameterOverrideRequired.discountRateOverride = dataItems
      .some((data) => {
        return data.discountRateProfile === 'Direct Entry';
      });

    this.parameterOverrideRequired.manualAssetAdjustmentOverride = dataItems
      .some((data) => {
        return data.manualAdjustmentOption === 'Direct Entry';
      });

    this.updateValidity();
  };

  // ***

  private filterDiscountRateOptions() {
    if (!this.portfolioSettings?.discountRateMatching) {
      this.discountRateOptions = this.discountRateOptions
        .filter(x => x.id !== 'Use Best Match');
    }

    if (!this.portfolioSettings?.directEntryDiscountRateEnabled) {
      this.discountRateOptions = this.discountRateOptions
        .filter(x => x.id !== 'Direct Entry');
    }
  }

  private setDefaultGridEditorOptions() {
    this.discountRateOptions = [
      { id: 'Direct Entry' },
      { id: 'Use Best Match' },
      { id: 'Prior Discount Rate' },
    ];

    this.functionalRateOptions = [
      { id: 'Prior Discount Rate' },
      { id: 'Current Period Spot' },
      { id: 'Current Period Average' },
      { id: 'Prior Period Start' },
    ];

    this.defaultManualAdjustmentOptions = [
      { id: 'Direct Entry' },
      { id: 'Prior Adjustment Amount' },
      { id: 'No Adjustment' },
    ];

    this.commentsOptions = [
      { id: 'Direct Entry' },
      { id: 'Prior Comments' },
      { id: 'Measured Batch [#] by [User] on [Date]' },
    ];
  }

  private populatePortfolioClassificationConfigurationOptions(): void {
    if (!this.masterGroupID) {
      return;
    }

    this.batchParametersService
      .getPortfolioClassificationConfigurationOptions(this.masterGroupID)
      .subscribe(result => {
        this.portfolioClassificationConfigurationOptions = result.data;

        this.portfolioClassificationConfigurationOptions
          ?.journalEntryProfiles?.unshift(
          {
            profileName: 'Select a Profile...',
            profileID: -1,
            leaseRecognitionType: null
          }, {
            profileName: 'Prior Value',
            profileID: null,
            leaseRecognitionType: null
          }
          );

        this.setMeasurementSettingsByMeasureEvent(this.measureEventType);
      });
  }

  private populatePortfolioSettingsAndPortfolioClassificationConfiguration(): void {
    if (!this.masterGroupID || this.isReadOnly) {
      return;
    }

    this.batchParametersService.getPortfolioSettings(this.masterGroupID)
      .subscribe(result => {
        this.portfolioSettings = result?.data.item1;

        if (this.portfolioSettings?.defaultAnnualRateType) {
          this.parameterOverrides.annualRateTypeOverride =
            ['', 'APR', 'APY'][this.portfolioSettings.defaultAnnualRateType];
        }

        this.populatePortfolioClassificationConfiguration();
      });
  }

  private populatePortfolioClassificationConfiguration(): void {
    this.batchParametersService
      .getPortfolioClassificationConfiguration(this.masterGroupID)
      .subscribe(result => {
        let discountRateProfile = 'Prior Discount Rate';

        if (this.portfolioSettings?.directEntryDiscountRateEnabled) {
          discountRateProfile = 'Direct Entry';
        }

        if (this.portfolioSettings?.discountRateMatching) {
          discountRateProfile = 'Use Best Match';
        }

        this.portfolioClassificationConfiguration = result?.data.map((item) => {
          item.discountRateProfile = discountRateProfile;

          return item;
        });

        this.setMeasurementSettingsByMeasureEvent(this.measureEventType);
      });
  }

}
