/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

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
import { Subscription } from 'rxjs';
import { ToastMessageService } from '@batch-accounting/services/toast-message.service';
import { CLIENT_ERROR_MESSAGE } from '@batch-accounting/shared/models/batch-accounting-constants';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
interface IDropdownOptions {
  id: string;
}

@Component({
  selector: 'mango-parameters-grid',
  templateUrl: './parameters-grid.component.html',
  styleUrls: ['./parameters-grid.component.scss'],
})
export class ParametersGridComponent implements OnInit, OnDestroy {
  discountRateOptions: IDropdownOptions[];
  functionalRateOptions: IDropdownOptions[];
  defaultManualAdjustmentOptions: IDropdownOptions[];
  rouAssetObtainedDateOptions: IDropdownOptions[];
  commentsOptions: IDropdownOptions[];
  beginDateReadOnly = false;
  discountRateReadOnly = false;
  showROUAssetObtainedColumns = false;
  private _isValid = false;
  dateFormat = 'MM/dd/yyyy';
  get isValid() {
    return this._isValid;
  }

  portfolioClassificationConfigurationOptions: any;
  portfolioSettings: any;

  portfolioClassificationConfiguration: any = [];

  measureEventType: MeasureEvent;
  parameterOverrides: ParameterOverrides;
  private subscriptions: Subscription[] = [];

  parameterOverrideRequired = {
    accountingTermBeginDateOverride: false,
    accountingTermEndDateOverride: false,
    commentsOverride: false,
    discountRateOverride: false,
    annualRateOverride: false,
    annualRateTypeOverride: false,
    manualAssetAdjustmentOverride: false,
    paymentTimingOverride: false,
    rouAssetObtainedMethodOverride: false,
    rouAssetObtainedDateOverride: false,
  };

  remeasureParameters: MeasureEventSetting[];

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
    return (
      `${this.parameterOverrides?.annualRateOverride ?? ''}% ` +
      `${this.parameterOverrides?.annualRateTypeOverride ?? ''}`
    );
  }

  constructor(
    public batchParametersService: BatchParametersService,
    public baseService: BaseService,
    public toastMessage: ToastMessageService,
    private mangoAppFacade: MangoAppFacade
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
      rouAssetObtainedMethodOverride: null,
      rouAssetObtainedDateOverride: null,
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe);
  }

  ngOnInit(): void {
    this.populatePortfolioClassificationConfigurationOptions();
    this.populatePortfolioSettingsAndPortfolioClassificationConfiguration();

    if (this.parametersData?.gridLoaded) {
      this.parameterOverrides = this.parametersData?.gridOverrides;
      this.remeasureParameters = this.parametersData?.gridData;
    }
    this.setDefaultGridEditorOptions();
    this.showROUAssetColumn();
    this.getUserDatePreferences();
  }

  getUserDatePreferences() {
    this.subscriptions.push(
      this.mangoAppFacade.contactRecord$.subscribe((contact) => {
        this.dateFormat = contact.preferences.contactDatesEU
          ? 'dd.MM.yyyy'
          : 'MM/dd/yyyy';
      })
    );
  }

  getClassificationName(classificationId: number): string {
    const classification = this.classificationTypes.find(
      (x) => x.classificationID === classificationId
    );

    return classification?.classificationType;
  }

  showROUAssetColumn() {
    const filteredClassificationID = this.classificationTypes.map(
      (item) => item.classificationID
    );

    const operating840Classifications = filteredClassificationID.some(
      (id) => id === 0 || id === 1 || id === 5
    );
    const operating842Classifications = filteredClassificationID.some(
      (id) => id === 2 || id === 3 || id === 4
    );

    if (operating840Classifications && operating842Classifications) {
      this.showROUAssetObtainedColumns = true;
      return;
    }

    if (operating842Classifications) {
      this.showROUAssetObtainedColumns = true;
      return;
    }

    if (operating840Classifications) {
      this.showROUAssetObtainedColumns = false;
      return;
    }
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
      if (this.parametersData?.cardMeasureEvent?.remeasureTypeName) {
        this.checkFullTermination(this.parametersData?.cardMeasureEvent);
      }

      return;
    }

    this.availableDataGrid?.instance.beginCustomLoading('Loading...');

    this.remeasureParameters = this.portfolioClassificationConfiguration
      .filter((itm) => {
        return (
          itm.remeasureTypeName === measureEventType.remeasureTypeName &&
          this.classificationTypes?.find(
            (x) => x.classificationID === itm.classificationID
          )
        );
      })
      .map((item) => {
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
    const isFullTermination =
      measureEventType.remeasureTypeName === 'Full Termination';

    this.beginDateReadOnly = isFullTermination;
    this.discountRateReadOnly = isFullTermination;

    if (isFullTermination) {
      this.defaultManualAdjustmentOptions = [{ id: 'No Adjustment' }];
      this.discountRateOptions = [{ id: 'Not Applicable' }];

      this.parameterOverrides.annualRateOverride = '0';

      this.remeasureParameters.forEach((item) => {
        const anyItem = item as any;

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
        };
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
        };
        break;

      case 'journalEntryProfileID': {
        const leaseRecType = evt.row.data.classificationID;
        const filtered =
          this.portfolioClassificationConfigurationOptions.journalEntryProfiles.filter(
            (x) => x.leaseRecognitionType === leaseRecType
          );

        evt.editorOptions.dataSource = [
          {
            profileName: 'Select a Profile...',
            profileID: -1,
            leaseRecognitionType: null,
          },
          {
            profileName: 'Prior Value',
            profileID: null,
            leaseRecognitionType: null,
          },
          ...filtered,
        ];
        break;
      }

      case 'rouAssetObtainedMethodName': {
        let filterRouAssetObtainedMethods;

        evt.row.data.remeasureTypeID === 6
          ? (filterRouAssetObtainedMethods =
              this.portfolioClassificationConfigurationOptions?.rouAssetMethods.filter(
                (rouAssetID) => rouAssetID.id === 1 || rouAssetID.id === 7
              ))
          : (filterRouAssetObtainedMethods =
              this.portfolioClassificationConfigurationOptions
                ?.rouAssetMethods);

        evt.editorOptions.dataSource = filterRouAssetObtainedMethods;
        if ([0, 1, 5].includes(evt.row.data.classificationID)) {
          evt.editorOptions.disabled = true;
          evt.editorOptions.dataSource = [{ id: 'Not Applicable' }];
          evt.editorOptions.value = 'Not Applicable';
          evt.row.data.rouAssetDateOption = 'Not Applicable';
        } else {
          evt.editorOptions.disabled = false;
        }
        break;
      }
      case 'defaultRouAssetObtainedDateOption': {
        if ([0, 1, 5].includes(evt.row.data.classificationID)) {
          evt.editorOptions.disabled = true;
          evt.editorOptions.dataSource = [{ id: 'Not Applicable' }];
          evt.editorOptions.value = 'Not Applicable';
          evt.row.data.rouAssetObtainedMethodName = 'Not Applicable';
        } else {
          evt.editorOptions.dataSource = this.rouAssetObtainedDateOptions;
          evt.editorOptions.disabled = false;
        }
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
  };

  updateDiscountRate = (evt) => {
    if (evt.value === null) {
      return;
    }

    this._isValid = this.validateDiscountRateOverride();

    this.parameterOverrides.discountRateOverride = this.isValid
      ? this.annualRateText
      : null;
  };

  validateJEProfiles() {
    let isValid = true;

    this.availableDataGrid?.instance
      .getDataSource()
      ?.items()
      .forEach((item) => {
        item.journalEntryOption =
          this.portfolioClassificationConfigurationOptions?.journalEntryProfiles.find(
            (x) => x.profileID === item.journalEntryProfileID
          )?.profileName;

        if (item.journalEntryProfileID < 0) isValid = false;
      });

    return isValid;
  }

  validateJEProfile = (obj: any) => {
    if (!obj.data) return obj.value >= 0;

    const profile =
      this.portfolioClassificationConfigurationOptions?.journalEntryProfiles.find(
        (x) => x.profileID === obj.value
      );

    obj.data.journalEntryOption = profile.profileName;

    return profile.profileID === null || profile.profileID >= 0;
  };

  validateRateRange = (obj: any) => {
    if (obj.value === null || obj.value === undefined) return false;

    if (obj.value < -9999 || obj.value > 9999) return false;

    const parts = obj.value.toPrecision().split('.');

    if (parts.length > 1) {
      return (
        parts[0].length <= 4 &&
        parts[1].length <= 14 &&
        obj.value.toPrecision().length <= 18
      );
    }

    return true;
  };

  validateBeginDate = (obj: any) => {
    if (!obj.value || !this.parameterOverrides.accountingTermEndDateOverride) {
      return true;
    }

    const beginDate = new Date(obj.value);
    const endDate = new Date(
      this.parameterOverrides.accountingTermEndDateOverride
    );

    return beginDate <= endDate;
  };

  validateEndDate = (obj: any) => {
    if (
      !obj.value ||
      !this.parameterOverrides.accountingTermBeginDateOverride
    ) {
      return true;
    }

    const beginDate = new Date(
      this.parameterOverrides.accountingTermBeginDateOverride
    );
    const endDate = new Date(obj.value);

    return beginDate <= endDate;
  };

  validateDiscountRateOverride = (): boolean => {
    if (!this.parameterOverrideRequired.discountRateOverride) {
      return true;
    }

    const hasAnnualRate =
      this.parameterOverrides.annualRateOverride !== null &&
      this.parameterOverrides.annualRateOverride !== undefined;

    const isValid =
      hasAnnualRate &&
      this.validateRateRange({
        value: this.parameterOverrides.annualRateOverride,
      }) &&
      !!this.parameterOverrides.annualRateTypeOverride &&
      !!this.parameterOverrides.paymentTimingOverride;

    return isValid;
  };

  private parameterChange = () => {
    const dataItems = this.availableDataGrid?.instance.getDataSource()?.items();

    if (!dataItems) {
      return;
    }

    this.parameterOverrideRequired.accountingTermBeginDateOverride =
      dataItems.some((data) => {
        return data.beginValueExpr === 'OptionID: 2 FormItemID: -1';
      });

    this.parameterOverrideRequired.accountingTermEndDateOverride =
      dataItems.some((data) => {
        return data.endValueExpr === 'OptionID: 2 FormItemID: -1';
      });

    this.parameterOverrideRequired.commentsOverride = dataItems.some((data) => {
      return data.commentsOption === 'Direct Entry';
    });

    this.parameterOverrideRequired.discountRateOverride = dataItems.some(
      (data) => {
        return data.discountRateProfile === 'Direct Entry';
      }
    );

    this.parameterOverrideRequired.manualAssetAdjustmentOverride =
      dataItems.some((data) => {
        return data.manualAdjustmentOption === 'Direct Entry';
      });

    this.parameterOverrideRequired.rouAssetObtainedMethodOverride =
      dataItems.some((data) => {
        return data.rouAssetObtainedMethodName === 'Direct Entry';
      });

    this.parameterOverrideRequired.rouAssetObtainedDateOverride =
      dataItems.some((data) => {
        return data.defaultRouAssetObtainedDateOption === 'Direct Entry';
      });

    this.updateValidity();
  };

  // ***

  setRouAssetMethodName() {
    this.portfolioClassificationConfiguration.forEach((element) => {
      element.defaultRouAssetObtainedDateOption = 'Accounting Event Start Date';

      switch (element.rouAssetMethodID) {
        case 1:
          element.rouAssetObtainedMethodName = 'Direct Entry';
          break;
        case 2:
          element.rouAssetObtainedMethodName = 'Opening Asset Balance';
          break;
        case 3:
          element.rouAssetObtainedMethodName = 'System Asset Adjustment';
          break;
        case 4:
          element.rouAssetObtainedMethodName = 'Manual Asset Adjustment';
          break;
        case 5:
          element.rouAssetObtainedMethodName = 'Total Asset Adjustment';
          break;
        case 6:
          element.rouAssetObtainedMethodName = 'Prior Value';
          break;
        case 7:
          element.rouAssetObtainedMethodName = 'Zero';
          break;

        default:
          element.rouAssetObtainedMethodName = null;
          break;
      }
    });
  }

  private filterDiscountRateOptions() {
    if (!this.portfolioSettings?.discountRateMatching) {
      this.discountRateOptions = this.discountRateOptions.filter(
        (x) => x.id !== 'Use Best Match'
      );
    }

    if (!this.portfolioSettings?.directEntryDiscountRateEnabled) {
      this.discountRateOptions = this.discountRateOptions.filter(
        (x) => x.id !== 'Direct Entry'
      );
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

    this.rouAssetObtainedDateOptions = [
      { id: 'Accounting Event Start Date' },
      { id: 'Direct Entry' },
    ];

    this.commentsOptions = [
      { id: 'Prior Comments' },
      { id: 'Direct Entry' },
      { id: 'Measured Batch [#] by [User] on [Date]' },
    ];
  }

  onCellPrepared(event) {
    if (event.rowType === 'data') {
      switch (event.column.dataField) {
        case 'defaultRouAssetObtainedDateOption': {
          if ([0, 1, 5].includes(event.row.data.classificationID)) {
            event.column.editorOptions.disabled = true;
            event.column.lookup.dataSource = [{ id: 'Not Applicable' }];
            event.text = 'Not Applicable';
            event.value = 'Not Applicable';
            event.data.defaultRouAssetObtainedDateOption = 'Not Applicable';
          } else {
            event.column.lookup.dataSource = this.rouAssetObtainedDateOptions;
          }
          break;
        }
        case 'rouAssetObtainedMethodName': {
          if ([0, 1, 5].includes(event.row.data.classificationID)) {
            event.column.editorOptions.disabled = true;
            event.column.lookup.dataSource = [{ id: 'Not Applicable' }];
            event.text = 'Not Applicable';
            event.value = 'Not Applicable';
            event.data.rouAssetObtainedMethodName = 'Not Applicable';
          } else {
            event.column.lookup.dataSource = [
              ...new Set(
                this.portfolioClassificationConfiguration
                  .filter((con) => {
                    return (
                      con.classificationID === event.row.data.classificationID
                    );
                  })
                  .map((itm) => itm.rouAssetObtainedMethodName)
              ),
            ];
            event.text = event.row.data.rouAssetObtainedMethodName;
            event.data.rouAssetObtainedMethodName =
              event.row.data.rouAssetObtainedMethodName;
          }
          break;
        }
      }
    }
  }

  private populatePortfolioClassificationConfigurationOptions(): void {
    if (!this.masterGroupID) {
      return;
    }

    this.subscriptions.push(
      this.batchParametersService
        .getPortfolioClassificationConfigurationOptions(this.masterGroupID)
        .subscribe((result) => {
          if (result?.success) {
            this.portfolioClassificationConfigurationOptions = result.data;
            this.portfolioClassificationConfigurationOptions?.journalEntryProfiles?.unshift(
              {
                profileName: 'Select a Profile...',
                profileID: -1,
                leaseRecognitionType: null,
              },
              {
                profileName: 'Prior Value',
                profileID: null,
                leaseRecognitionType: null,
              }
            );

            this.setMeasurementSettingsByMeasureEvent(this.measureEventType);
          } else {
            this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
          }
        })
    );
  }

  private populatePortfolioSettingsAndPortfolioClassificationConfiguration(): void {
    if (!this.masterGroupID || this.isReadOnly) {
      return;
    }

    this.subscriptions.push(
      this.batchParametersService
        .getPortfolioSettings(this.masterGroupID)
        .subscribe((result) => {
          if (result?.success) {
            this.portfolioSettings = result?.data?.item1;
            if (this.portfolioSettings?.defaultAnnualRateType) {
              this.parameterOverrides.annualRateTypeOverride = [
                '',
                'APR',
                'APY',
              ][this.portfolioSettings?.defaultAnnualRateType];
            }

            if (this.portfolioSettings?.defaultPaymentTimingType) {
              this.parameterOverrides.paymentTimingOverride = [
                '',
                'End of Period',
                'Beginning of Period',
              ][this.portfolioSettings?.defaultPaymentTimingType];
            }

            this.populatePortfolioClassificationConfiguration();
          } else {
            this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
          }
        })
    );
  }

  private populatePortfolioClassificationConfiguration(): void {
    this.subscriptions.push(
      this.batchParametersService
        .getPortfolioClassificationConfiguration(this.masterGroupID)
        .subscribe((result) => {
          if (result?.success) {
            let discountRateProfile = 'Prior Discount Rate';
            if (this.portfolioSettings?.directEntryDiscountRateEnabled) {
              discountRateProfile = 'Direct Entry';
            }

            if (this.portfolioSettings?.discountRateMatching) {
              discountRateProfile = 'Use Best Match';
            }

            this.portfolioClassificationConfiguration = result?.data.map(
              (item) => {
                item.discountRateProfile = discountRateProfile;
                return item;
              }
            );
            this.setRouAssetMethodName();
            this.setMeasurementSettingsByMeasureEvent(this.measureEventType);
          } else {
            this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
          }
        })
    );
  }

  itemTemplate(data: any) {
    switch (data) {
      case 'APR':
      case 'APY':
        return `<div id="annual-rate-type-${data
          .replace(/\s+/g, '-')
          .toLowerCase()}">${data}</div>`;

      case 'Beginning of Period':
      case 'End of Period':
        return `<div id="payment-timing-${data
          .replace(/\s+/g, '-')
          .toLowerCase()}">${data}</div>`;
    }
  }
}
