import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { EventsGridColumnsService } from '@accounting-summary/services/events-grid-columns.service';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DxDataGridComponent, DxDropDownBoxComponent } from 'devextreme-angular';
import { trigger } from 'devextreme/events';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'mango-events-detail-section',
  templateUrl: './events-detail-section.component.html',
  styleUrls: ['./events-detail-section.component.scss'],
})
export class EventsDetailSectionComponent implements OnChanges, OnDestroy {

  @ViewChild("EventsDataGrid") eventsDataGrid: DxDataGridComponent;
  @ViewChild('EventSelectorDropdown', { static: false }) EventSelectorDropdown: DxDropDownBoxComponent;
  @Input() leaseIsLocked: boolean;
  @Input() leaseIsArchived: boolean;
  @Input() rightsInfo: any;
  @Input() wfStatusRights: any;
  @Input() userInfo: UserInfoResponse;
  @Output() eventScheduleSelectedEvent = new EventEmitter();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter();
  classificationType: string;
  amortizationProfileName: string;
  masterScheduleID: number;
  detailsGridData;
  detailColumns = [];
  gridName = 'Events';
  componentName = "events-grid"
  customGridClass = 'custom-grid';
  classificationId: number;
  isLoading = false;
  selectedRowKeys: number[];
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  expanded = true;
  preferenceSavePendingMessage: string;
  isGridStateChanged = false;
  initialState = {};
  portfolioSettings: PortfolioSettingsResponse;
  showEditIcon: boolean;
  private subscription = new Subscription();
  private masterScheduleIDChanged = false;
  private userInfoLoaded = false;
  private publishedEvent: any;
  private setInitialSelectedRow = false;
  userHasEditLeaseRights = true;
  wfStatusHasEditRights = true;
  userHasLeftNavEditRights = true;
  userHasDeleteAccountingSchedulesModuleRight = true;
  isGridBoxOpened = false;
  originalgridDataSource: any;
  gridDataSource: any;
  gridBoxValue = [];
  pagingEnabled = false;
  leaseRecognitionScheduleID: number;
  classificationID: number;
  isAccountingEventEmpty = true;
  gridsState: any;
  resetBtnHoverText = 'This will delete any saved preferences, taking you back the CoStar default columns';
  clearBtnHoverText = 'This will clear all pending changes in the grid';

  constructor(public accountingSummaryService: AccountingSummaryService, private columnService: EventsGridColumnsService, private formatService: FormattingService, private ref: ChangeDetectorRef) {
    this.preferenceSavePendingMessage = accountingSummaryService.preferenceSavePendingMessage;
  }

  ngOnInit(): void {
    this.getEventsDropDownData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //MasterScheduleID and userInfo has to be populated in order to call eventsGridSetup
    if (changes.masterScheduleID !== undefined && changes.masterScheduleID.previousValue != changes.masterScheduleID.currentValue) {
      this.masterScheduleIDChanged = true;
    }

    if (changes.userInfo !== undefined && changes.userInfo.currentValue !== undefined) {
      this.userInfoLoaded = true;
    }

    if (this.masterScheduleIDChanged && this.userInfoLoaded) {
      this.eventsGridSetup(this.masterScheduleID);
      this.masterScheduleIDChanged = false;
    }

    if ((changes.wfStatusRights && changes.wfStatusRights !== undefined && changes.wfStatusRights.currentValue !== undefined) || (changes.rightsInfo && changes.rightsInfo !== undefined && changes.rightsInfo.currentValue !== undefined)) {
      this.setRights();
    }

    this.showEditIcon = this.userHasEditLeaseRights
      && this.wfStatusHasEditRights
      && this.userHasLeftNavEditRights
      && !this.leaseIsLocked
      && !this.leaseIsArchived
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  eventsGridSetup(masterScheduleId: number) {
    this.isGridStateChanged = false;
    const eventDetails = this.accountingSummaryService.getEventDetails(masterScheduleId);
    this.subscription.add(eventDetails.subscribe(eventDetailsResponse => {

      if (eventDetailsResponse === null || eventDetailsResponse.data.length === 0) {
        this.eventsDataGrid.instance.state(null);
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (eventDetailsResponse.data.length != 0 && eventDetailsResponse.success) {
        this.classificationId = eventDetailsResponse.data[0].classificationID;
        this.detailsGridData = eventDetailsResponse.data.sort((a, b) => a.scheduleIndex - b.scheduleIndex);
        this.portfolioSettings = this.accountingSummaryService.getSavedPortfolioSettings();

        // Adding fields to datasource based on classificationId && manipulating fields to display correct text
        if (this.classificationId === 0 || this.classificationId === 5) {
          this.detailsGridData.forEach(element => {
            element.currencyDisplay = this.currencyDisplay(element);
          })
        } else {
          this.detailsGridData.forEach(element => {
            element.discountRateDisplay = this.discountRateDisplay(element);
            element.currencyDisplay = this.currencyDisplay(element);
            element.formatCells = this.formatCells(element);
          });
        }

        this.isEuroDateFormat = this.userInfo?.useDateEU;
        if (this.isEuroDateFormat) {
          this.dateFormat = 'dd.MM.yyyy';
        }
        this.detailColumns = this.columnService.getDetailsColumns(this.classificationId, this.detailsGridData[0], this.portfolioSettings, this.dateFormat);

        this.publishedEvent = this.detailsGridData.filter(d => d.isPublished)[0];
        this.setInitialSelectedRow = true;

        this.getGridPreferences();
      } else if (!eventDetailsResponse.success) {
        this.accountingSummaryService.errorNotify(eventDetailsResponse.clientErrorMessage);
      }
    }));

  }

  onGridContentReady(grid) {
    if (grid.component.totalCount() > 0) {
      if (this.setInitialSelectedRow) {
        this.selectedRowKeys = [this.publishedEvent.leaseRecognitionScheduleID];
        this.setInitialSelectedRow = false;
      }

      const selectedRowIndex = grid.component.getRowIndexByKey(this.selectedRowKeys[0]);
      grid.component.selectRowsByIndexes([selectedRowIndex]);

      const rowHeight = grid.component.getRowElement(0)[0].clientHeight;
      this.eventsDataGrid.instance.getScrollable().scrollTo({ y: selectedRowIndex * rowHeight });
      this.highlightEventDifferencesForGridCell(grid, selectedRowIndex);
    }
  }

  getGridPreferences() {
    this.subscription.add(this.accountingSummaryService.getGridPreferences().subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.gridsState = response.data;
        const state = JSON.parse(sessionStorage.getItem("eventsGridStateKey"))
        // Filter the data
        const filteredData = response.data.filter(item => {
          return item.classificationID === this.classificationId && item.gridName === this.gridName;
        });

        this.selectedRowKeys = [this.publishedEvent?.leaseRecognitionScheduleID];

        if (state !== null) {
          state.columns = [];
          state.selectedRowKeys = [this.publishedEvent?.leaseRecognitionScheduleID];

          filteredData.forEach((item) => {
            const parsedColumns = JSON.parse(item.columnJson);
            state.columns.push(...parsedColumns);
          });
        }

        this.initialState = state;
        this.eventsDataGrid.instance.state(state);
        sessionStorage.setItem("eventsGridStateKey", JSON.stringify(state));
        this.eventScheduleSelectedEvent.emit([this.publishedEvent, this.gridsState]);
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  resetGridPreferences() {
    this.subscription.add(this.accountingSummaryService.resetGridPreferences(this.classificationId, this.gridName).subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.eventsDataGrid.instance.state({});
        this.accountingSummaryService.successNotify(response.clientErrorMessage);
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  clearGridChanges() {
    this.isGridStateChanged = false;
    this.eventsDataGrid.instance.state(this.initialState);
  }

  saveGridPreferences() {
    this.isGridStateChanged = false;
    const newState = this.eventsDataGrid.instance.state();
    sessionStorage.setItem("eventsGridStateKey", JSON.stringify(newState));
    const columnsState = this.eventsDataGrid.instance.state().columns;
    for (let index = 0; index < columnsState.length; index++) {
      columnsState[index].appendsCurrency = this.eventsDataGrid.instance.columnOption(index, 'appendsCurrency');
      columnsState[index].caption = this.eventsDataGrid.instance.columnOption(index, 'caption');
      columnsState[index].usesLocalFormat = this.eventsDataGrid.instance.columnOption(index, 'usesLocalFormat');
      columnsState[index].usesFunctionalFormat = this.eventsDataGrid.instance.columnOption(index, 'usesFunctionalFormat');
      columnsState[index].headerCellTemplate = 'amortizationHeader';
    }
    const columns = JSON.stringify(columnsState);
    this.subscription.add(this.accountingSummaryService.saveGridPreferences(this.classificationId, this.gridName, columns).subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.initialState = newState;
        this.accountingSummaryService.successNotify(response.clientErrorMessage);
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  loadState() {
    return JSON.parse(sessionStorage.getItem("eventsGridStateKey"));
  }

  saveState(state) {
    sessionStorage.setItem("eventsGridStateKey", JSON.stringify(state));
  }

  onGridOptionChanged(event) {
    if (event.fullName != 'columns' && event.name === 'columns') {
      // The grid state has changed
      this.isGridStateChanged = true;
    }
  }

  showColumnChooser() {
    this.eventsDataGrid.instance.showColumnChooser();
  }

  currencyDisplay(gridDataRow) {
    return gridDataRow.functionalCurrency == gridDataRow.localCurrency ?
      gridDataRow.localCurrency : gridDataRow.localCurrency + " | " +
      gridDataRow.functionalCurrency + ": " + (Math.round(gridDataRow.functionalCurrencyRate * 10000) / 10000).toFixed(4);
  }

  discountRateDisplay(gridDataRow) {
    return (!gridDataRow.discountRate ? "0.0000" : (Math.round(gridDataRow.discountRate * 10000) / 10000).toFixed(4)) + "% " + (gridDataRow.annualRateTypeID == 1 ? "APR" : "APY");
  }

  formatCells(gridDataRow) {
    if (this.portfolioSettings.functionalCurrencyEnabled && gridDataRow.functionalLevelExpense < 0) {
      gridDataRow.functionalLevelExpense = 'N/A';
    } else {
      gridDataRow.functionalLevelExpense = this.formatService.functionalFormat(gridDataRow.functionalLevelExpense, gridDataRow.functionalCurrencyDecimalPrecision);
    }
    if (!this.portfolioSettings.functionalCurrencyEnabled && gridDataRow.levelExpense < 0) {
      gridDataRow.levelExpense = 'N/A';
    } else {
      gridDataRow.levelExpense = this.formatService.localFormat(gridDataRow.levelExpense, gridDataRow.localCurrencyDecimalPrecision);
    }
    gridDataRow.periods = gridDataRow.periods.toFixed(2);
  }

  onCellClick(e) {
    /*
    ClassificationID's:
    0 - Operating 840
    1 - Capital 840
    2 - Finance (ASC 842)
    3 - Operating (ASC 842)
    4 - IFRS 16
    5 - Operating (Lessor)
    6 - Sales Type (Lessor) - INACTIVE Currently
    */

    if (e.column.dataField === 'leaseRecognitionScheduleId' && e.rowType === 'data') {
      const newEvent = Object.assign({}, e.event, { type: 'dxcontextmenu' });
      e.event.stopPropagation();
      trigger(e.cellElement, newEvent);
    }
  }

  onRowClick(e) {
    this.eventScheduleSelectedEvent.emit([e.data, this.gridsState]);
    this.eventsDataGrid.instance.repaint();
  }

  highlightEventDifferencesForGridCell(eventsGrid: any, selectedRowIndex: number) {
    const visibleRows = eventsGrid.component.getVisibleRows();
    const visibleColumns = eventsGrid.component.getVisibleColumns();
    visibleRows.forEach(row => {
      visibleColumns.forEach(col => {
        const cElement = eventsGrid.component.getCellElement(row.rowIndex, col.dataField);
        const event = {
          row: row,
          column: col,
          cellElement: cElement,
          data: row.data
        }

        if (event?.row?.rowIndex === selectedRowIndex) {
          if (event.row.data.scheduleIndex == 1 || event.column?.caption === "#") {
            return;
          }

          const previousRow = this.detailsGridData.filter(f => f.scheduleIndex == (event.row.data.scheduleIndex - 1))[0];

          const oldValue = Object(previousRow)[event.column.dataField];
          const newValue = Object(event.data)[event.column.dataField];
          if (oldValue !== newValue) {
            event.cellElement?.classList.add("grid-cell-box-shadow");
          } else {
            event.cellElement?.classList.remove("grid-cell-box-shadow");
          }
        }
      });
    });
  }

  presentValueExcel(event, data) {
    event.preventDefault();
    const filename = this.accountingSummaryService.getFileName('PresentValueTable');
    this.subscription.add(this.accountingSummaryService.exportPresentValueFile(data.leaseRecognitionScheduleID, filename).subscribe(
      (presentValueResponse: any) => {
        if (!presentValueResponse.data) {
          this.accountingSummaryService.errorNotify('Downloading the present value table failed.');
        }
        else {
          this.accountingSummaryService.downloadExcel(presentValueResponse.data, filename);
        }
      })
    );
  }

  onContextMenuPreparing(e) {
    // e.items can be undefined
    if (!e.items) {
      e.items = [];
    }

    const edit = {
      text: 'Edit',
      icon: 'fa fa-pencil fa-fw blueicon',
      visible: e.row.data.isPublished && this.showEditIcon && e.row.data.jeStatus === 'Scheduled',
      value: e.row.data.leaseRecognitionScheduleID,
      onItemClick: () => {
        alert("Edit Clicked");
      }
    };

    const remeasure = {
      text: 'Remeasure',
      icon: 'fa fa-wrench fa-fw blueicon',
      beginGroup: true,
      visible: e.row.data.isPublished && this.showEditIcon,
      items: [
        {
          text: 'Renewal',
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Renewal', e.row.data);
          }
        },
        {
          text: 'Data Correction',
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Data Correction', e.row.data);
          }
        },
        {
          text: 'Rent Review (IFRS)', visible: [4, 7].includes(this.classificationId),
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Rent Review (IFRS)', e.row.data);
          }
        },
        {
          text: 'CPI Cumulative Cap Reached', visible: [2, 3, 4, 7].includes(this.classificationId),
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('CPI Cumulative Cap Reached', e.row.data);
          }
        },
        {
          text: 'Other',
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Other', e.row.data);
          }
        },
        {
          text: 'Impairment', visible: [2, 3, 4, 7].includes(this.classificationId),
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Impairment', e.row.data);
          }
        },
        {
          text: 'Partial Termination', visible: [2, 3, 4, 7].includes(this.classificationId),
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Partial Termination', e.row.data);
          }
        },
        {
          text: 'Termination',
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Termination', e.row.data);
          }
        },
        {
          text: 'Full Termination', visible: [2, 3, 4].includes(this.classificationId),
          value: e.row.data.leaseRecognitionScheduleId,
          onItemClick: () => {
            this.onItemClicked('Full Termination', e.row.data);
          }
        }]
    };

    const view = {
      text: 'View Details', icon: 'fa fa-eye fa-fw blueicon',
      value: e.row.data.leaseRecognitionScheduleID,
      onItemClick: () => {
        alert("View Clicked");
      }
    };

    const deleteSchedule = {
      text: 'Delete', icon: 'fa fa-trash-o fa-fw redicon',
      value: e.row.data.leaseRecognitionScheduleID + '|' + e.row.data.jeStatus,
      beginGroup: true,
      visible: e.row.data.isPublished && this.showEditIcon,
      onItemClick: () => {
        alert("Delete Clicked");
      }
    };

    const scheduleId = {
      text: 'Event ID: ' + e.row.data.leaseRecognitionScheduleID,
      disabled: true, selectable: true, beginGroup: true
    };

    if (!this.showEditIcon) {
      e.items.push(view);
    }

    if (this.showEditIcon) {
      e.items.push(edit);
      if (this.portfolioSettings.leaseRecognitionCalendarID != 1 && this.classificationId === 1) {
        // No Remeasure option for Cap 840 using custom calendar
      } else {
        e.items.push(remeasure);
      }
      e.items.push(view);

      if (this.userHasDeleteAccountingSchedulesModuleRight ||
        (e.row.data.isPublished && e.row.data.jeStatus === 'Scheduled')) {
        e.items.push(deleteSchedule);
      }
    }

    e.items.push(scheduleId);
  }

  onItemClicked(event: string, data) {
    switch (event) {
      case 'Edit': {
        alert("Edit Clicked");
        break;
      }
      case 'Delete': {
        alert("Delete Clicked");
        break;
      }
      case 'View Details': {
        alert("View Details Clicked");
        break;
      }
      case 'Renewal': {
        alert("Renewal Clicked");
        break;
      }
      case 'Data Correction': {
        alert("Data Correction Clicked");
        break;
      }
      case 'Rent Review (IFRS)': {
        alert("Rent Review (IFRS) Clicked");
        break;
      }
      case 'CPI Cumulative Cap Reached': {
        alert("CPI Cumulative Cap Reached Clicked");
        break;
      }
      case 'Other': {
        alert("Other Clicked");
        break;
      }
      case 'Impairment': {
        alert("Impairment Clicked");
        break;
      }
      case 'Partial Termination': {
        alert("Partial Termination Clicked");
        break;
      }
      case 'Termination': {
        alert("Termination Clicked");
        break;
      }
      case 'Full Termination': {
        alert("Full Termination Clicked");
        break;
      }
      case 'Run Report': {
        alert("Run Report Clicked");
        break;
      }
      default: {
        break;
      }
    }
  }

  private setRights() {
    this.userHasEditLeaseRights = this.rightsInfo?.userHasEditLeaseRights;
    this.wfStatusHasEditRights = this.wfStatusRights?.wfStatusUserHasEditRights;
    this.userHasLeftNavEditRights = this.rightsInfo?.userHasLeftNavEditRights;
    this.userHasDeleteAccountingSchedulesModuleRight = this.rightsInfo?.userCanDeleteSchedule;
  }

  exportToExcel() {
    const classificationType = this.classificationType;
    const amortizationProfileName = this.amortizationProfileName;
    const componentName = 'Accounting Events';
    const sheetname = this.accountingSummaryService.getLeaseAbstractId() + ' - ' + amortizationProfileName;
    const filename = this.accountingSummaryService.generateFileName(classificationType, amortizationProfileName, componentName);
    this.accountingSummaryService.exportToExcel(this.eventsDataGrid.instance, filename, sheetname);
  }

  onGridBoxOptionChanged(e) {
    if (e.name === 'value') {
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    }
  }

  onValueChanged(event: any) {
    this.masterScheduleID = parseInt(event.value);
    const selecetedEvent = this.gridDataSource.find(x => (x.masterScheduleID === this.masterScheduleID && x.isPublished));
    this.classificationID = selecetedEvent.classificationID;
    this.leaseRecognitionScheduleID = selecetedEvent.leaseRecognitionScheduleID;
    this.amortizationProfileName = selecetedEvent.amortizationProfileName;
    this.classificationType = selecetedEvent.classificationType;
    this.eventsGridSetup(this.masterScheduleID);
    this.emitDataChanged();
  }

  private getEventsDropDownData() {
    this.subscription.add(this.accountingSummaryService.getAccountingEvents().subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success && response.data.length != 0) {
        this.originalgridDataSource = response.data;
        this.gridDataSource = response.data.filter(eventItem => eventItem.isPublished);
        this.pagingEnabled = this.gridDataSource.length > 5;
        this.gridBoxValue = [this.gridDataSource[0].masterScheduleID];
        this.masterScheduleID = this.gridDataSource[0].masterScheduleID;
        this.leaseRecognitionScheduleID = this.gridDataSource[0].leaseRecognitionScheduleID;
        this.classificationID = this.gridDataSource[0].classificationID;
        this.amortizationProfileName = this.gridDataSource[0].amortizationProfileName;
        this.classificationType = this.gridDataSource[0].classificationType;
        this.isAccountingEventEmpty = false;
        this.eventsGridSetup(this.masterScheduleID);
        this.emitDataChanged();
      }
      else if (!response.success) {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  gridBox_displayExpr(item) {
    this.gridBoxValue = [item.masterScheduleID];
    return item && `${item.classificationType} (${item.amortizationProfileName})`;
  }

  private emitDataChanged() {
    this.dataChanged.emit({
      amortizationProfileName: this.amortizationProfileName,
      classificationType: this.classificationType,
      isAccountingEventEmpty: this.isAccountingEventEmpty,
      classificationID: this.classificationID
    });
  }

  // Add keyboard accessibility for Events Selector
  handleDropdownActivationKeys(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.stopPropagation();
      event.preventDefault();
      this.EventSelectorDropdown.instance.open();
    }
  }

  openMoreMenu(event: KeyboardEvent): void {
    event.stopPropagation();
  }
}
