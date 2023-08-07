import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";

import { OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { AccountingSettingsService } from '../../services/accounting-settings.service';
import { DropdownsService } from '../../services/dropdowns.service';
import { PortfolioDropdownService } from '../../services/portfolio-dropdown.service';
import { BaseService } from '../../services/base.service';
import { MeasureEventSetting } from '../../models/measure-event-setting.model';


@Component({
  selector: 'app-measure-event-settings',
  templateUrl: './measure-event-settings.component.html',
  styleUrls: ['./measure-event-settings.component.scss']
})
export class MeasureEventSettingsComponent implements OnInit {

  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;
  @Input() data: any;
  @Input() dropDownValues: any;
  @Input() classificationID: number;

  jeProfileOptions: Array<any>;
  defaultManualAdjustmentOptions: Array<any>;
  commentsOptions: Array<any>;
  changes: any = [];
  portfolioID: number;

  constructor(public service: AccountingSettingsService, public dropDownService: DropdownsService,
    public portfolioService: PortfolioDropdownService, public baseService: BaseService) {
    this.filterBeginDateOptions = this.filterBeginDateOptions.bind(this);
    this.filterEndDateOptions = this.filterEndDateOptions.bind(this);
    this.filterJounalEntryProfiles = this.filterJounalEntryProfiles.bind(this);
    this.filterDefaultManualAdjustmentOptions = this.filterDefaultManualAdjustmentOptions.bind(this);
    this.filterCommentsOptions = this.filterCommentsOptions.bind(this);

  }

  ngOnInit(): void {
    const filteredConfigurations = 
      this.dropDownService.classificationConfiguration.filter(f => f.classificationID === +this.classificationID);

    this.data = [];

    filteredConfigurations.forEach(f => this.data.push(new MeasureEventSetting(
      f.configurationID, f.remeasureTypeID, f.remeasureTypeName, f.classificationID, f.beginValueExpr as string,
      f.endValueExpr as string, f.journalEntryOption, f.manualAdjustmentOption, f.commentsOption)));

    this.defaultManualAdjustmentOptions = [
      { methodID: 'Prior Adjustment Amount', methodDisplay: 'Prior Adjustment Amount' },
      { methodID: 'Direct Entry', methodDisplay: 'Direct Entry' },
    ];

    this.commentsOptions = [
      { methodID: 'Direct Entry', methodDisplay: 'Direct Entry' },
      { methodID: 'Prior Comments', methodDisplay: 'Prior Comments' },
    ];

    this.portfolioID = this.portfolioService.selectedPortfolioId;
  }

  filterBeginDateOptions(options) {
    if (options.data) {
      if (options.data.remeasureTypeName === 'Initial') {
        return {
          store: this.dropDownValues.beginDateOptions.filter(option =>
            option.isInitialExempt === false &&
            (option.beginValueExpr !== options.data.accountingTermEndDate || option.optionName === 'Direct Entry')
          ),
          filter: null
        }
      }
      else if (options.data.remeasureTypeName === 'Full Termination') {
        return {
          store: this.dropDownValues.beginDateOptions.filter(option => option.optionName === 'Direct Entry'),
          filter: null
        }
      } else {
        return {
          store: this.dropDownValues.beginDateOptions.filter(option =>
            option.beginValueExpr !== options.data.accountingTermEndDate || option.optionName === 'Direct Entry'),
          filter: null
        }
      }
    }

    return {
      store: this.dropDownValues.beginDateOptions,
      filter: null
    }
  }

  filterEndDateOptions(options) {
    if (options.data) {
      if (options.data.remeasureTypeName === 'Initial') {
        return {
          store: this.dropDownValues.endDateOptions.filter(option =>
            option.isInitialExempt === false &&
            (option.endValueExpr !== options.data.accountingTermBeginDate || option.optionName === 'Direct Entry')),
          filter: null
        }
      } else {
        return {
          store: this.dropDownValues.endDateOptions.filter(option =>
            option.endValueExpr !== options.data.accountingTermBeginDate || option.optionName === 'Direct Entry'),
          filter: null
        }
      }
    }

    return {
      store: this.dropDownValues.endDateOptions,
      filter: null
    }
  }

  filterJounalEntryProfiles(options) {
    if (options.data) {
      if (options.data.remeasureTypeName === 'Initial') {
        return {
          store: this.dropDownValues.journalEntryProfiles.filter(
            option => option.profileID !== 'Prior Value' &&
            (option.leaseRecognitionType === +this.classificationID || option.leaseRecognitionType == undefined)
          ),
          filter: null
        }
      }
    }

    return {
      store: this.dropDownValues.journalEntryProfiles.filter(
        option => option.leaseRecognitionType === +this.classificationID || option.leaseRecognitionType == undefined),
      filter: null
    }
  }

  filterDefaultManualAdjustmentOptions(options) {
    if (options.data) {
      if (options.data.remeasureTypeName === 'Initial' || options.data.remeasureTypeName === 'Full Termination') {
        return {
          store: this.defaultManualAdjustmentOptions.filter(option => option.methodID !== 'Prior Adjustment Amount'),
          filter: null
        }
      }
    }

    return {
      store: this.defaultManualAdjustmentOptions,
      filter: null
    }
  }

  filterCommentsOptions(options) {
    if (options.data) {
      if (options.data.remeasureTypeName === 'Initial') {
        return {
          store: this.commentsOptions.filter(option => option.methodID !== 'Prior Comments'),
          filter: null
        }
      }
    }

    return {
      store: this.commentsOptions,
      filter: null
    }
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.visible = false;
  }

  filterDropdown(options) {
    const dataStore = this.dropDownValues.beginDateOptions.filter(f => f.isBeginDate === true);
    if (options.data) {
      if (options.data.measureEvent === 'Initial') {
        return {
          store: dataStore.filter(option => option.isInitialExempt === false),
          filter: null
        }
      }
    }

    return {
      store: dataStore,
      filter: null
    }
  }

  onFocusedCellChanged(e) {
    if (this.dataGrid.instance.hasEditData()) {
      this.service.measureEventsChanged = true;
    }
  }

  saveChanges() {
    if (this.dataGrid.instance.hasEditData()) {
      let configurations = [];
      this.changes.forEach((f) => {
        const originalData = this.data.find(d => d.configurationID === f.key)
        let updatedData = Object.assign({}, originalData)
        Object.assign(updatedData, f.data);
        Object.assign(updatedData, { BeginDateDisplayName : this.dropDownValues.beginDateOptions
          .find(d => d.beginValueExpr === updatedData.accountingTermBeginDate)?.methodDisplay });
        Object.assign(updatedData, { EndDateDisplayName : this.dropDownValues.endDateOptions
          .find(d => d.beginValueExpr === updatedData.accountingTermEndDate)?.methodDisplay });

        const beginDateData = this.filterString(updatedData.accountingTermBeginDate);
        Object.assign(updatedData, { BeginDateOptionID : beginDateData[0] });
        Object.assign(updatedData, { BeginDateFormItemID : beginDateData[1] === -1 ? null : beginDateData[1] });

        const endDateData = this.filterString(updatedData.accountingTermEndDate);
        Object.assign(updatedData, { EndDateOptionID : endDateData[0] });
        Object.assign(updatedData, { EndDateFormItemID : endDateData[1] === -1 ? null : endDateData[1] });

        Object.assign(updatedData, { masterGroupID : this.portfolioID });

        if (updatedData.journalEntryOption != 'Direct Entry' && updatedData.journalEntryOption != 'Prior Value') {
          Object.assign(updatedData, { JournalEntryProfileID : this.dropDownValues.journalEntryProfiles
            .find(d => d.profileName === updatedData.journalEntryOption).profileID });
        } else {
          Object.assign(updatedData, { JournalEntryProfileID : null });
        }

        configurations.push(updatedData);
      });
      return configurations;
    }
  }

  filterString(str) {
    const res = str.split(' ').map(Number);
    const filtered = res.filter(function (item) {
      return (parseInt(item) == item);
    });

    return filtered;
  }
}
