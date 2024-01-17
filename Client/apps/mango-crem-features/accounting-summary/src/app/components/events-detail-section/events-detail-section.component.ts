import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { EventsGridColumnsService } from '@accounting-summary/services/events-grid-columns.service';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { trigger } from 'devextreme/events';
import { RowPreparedEvent, CellPreparedEvent } from 'devextreme/ui/data_grid';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'mango-events-detail-section',
  templateUrl: './events-detail-section.component.html',
  styleUrls: ['./events-detail-section.component.scss'],
})
export class EventsDetailSectionComponent implements OnChanges, OnDestroy {

  @ViewChild("EventsDataGrid") eventsDataGrid: DxDataGridComponent;
  @Input() masterScheduleID: number;
  @Input() leaseIsLocked: boolean;
  @Input() leaseIsArchived: boolean;
  @Input() rightsInfo: any;
  @Input() userInfo: UserInfoResponse;
  @Input() classificationType: string;
  @Input() amortizationProfileName: string;
  @Output() eventScheduleData = new EventEmitter<number>();
  detailsGridData;
  detailColumns = [];
  gridName = 'Events';
  componentName = "events-grid"
  classificationId: number;
  isLoading = false;
  selectedRowKeys: number[];
  customGridClass = 'custom-grid';
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

  constructor(public accountingSummaryService: AccountingSummaryService, private columnService: EventsGridColumnsService) { 
    this.preferenceSavePendingMessage = accountingSummaryService.preferenceSavePendingMessage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //MasterScheduleID and userInfo has to be populated in order to call eventsGridSetup
    if (changes.masterScheduleID !== undefined && changes.masterScheduleID.previousValue != changes.masterScheduleID.currentValue) {
      this.masterScheduleIDChanged = true;
    }

    if (changes.userInfo !== undefined && changes.userInfo.currentValue !== undefined) {
      this.userInfoLoaded = true;
    }

    if(this.masterScheduleIDChanged && this.userInfoLoaded){
      this.isGridStateChanged = false;
      this.eventsGridSetup(this.masterScheduleID);

      this.masterScheduleIDChanged = false;
    }

    if(changes.rightsInfo !== undefined && changes.rightsInfo.currentValue !== undefined){
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
     const eventDetails = this.accountingSummaryService.getEventDetails(masterScheduleId);
     const portfolioSettings = this.accountingSummaryService.getPortfolioSettings();
     this.subscription.add(combineLatest([eventDetails, portfolioSettings]).subscribe(res => {
      const eventDetailsResponse = res[0];
      const portfolioSettingsResponse = res[1];

      if (eventDetailsResponse === null || eventDetailsResponse.data.length === 0 || portfolioSettingsResponse === null ){
        this.eventsDataGrid.instance.state(null);
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (eventDetailsResponse.data.length != 0 && eventDetailsResponse.success && portfolioSettingsResponse.success) {
        this.classificationId = eventDetailsResponse.data[0].classificationID;
        this.detailsGridData = eventDetailsResponse.data.sort((a, b) => a.scheduleIndex - b.scheduleIndex);
        this.portfolioSettings = portfolioSettingsResponse.data;

        // Adding fields to datasource based on classificationId && manipulating fields to display correct text
        if (this.classificationId === 0 || this.classificationId === 5) {
          this.detailsGridData.forEach(element => {
            element.currencyDisplay = this.currencyDisplay(element);
          })
        } else {
          this.detailsGridData.forEach(element => {
            element.discountRateDisplay = this.discountRateDisplay(element);
            element.currencyDisplay = this.currencyDisplay(element);
          });
        }

        this.isEuroDateFormat = this.userInfo.useDateEU;
        if (this.isEuroDateFormat) {
          this.dateFormat = 'dd.MM.yyyy';
        }
        this.detailColumns = this.columnService.getDetailsColumns(this.classificationId, this.detailsGridData[0], this.portfolioSettings, this.dateFormat);
        this.getGridPreferences();

        this.publishedEvent = this.detailsGridData.filter(d => d.isPublished)[0];
        this.setInitialSelectedRow = true;
        this.eventScheduleData.emit(this.publishedEvent);
      } else if (!eventDetailsResponse.success || !portfolioSettingsResponse.success) {
        this.accountingSummaryService.errorNotify(!eventDetailsResponse.success ? eventDetailsResponse.clientErrorMessage : portfolioSettingsResponse.clientErrorMessage);
      }
    }));

  }

  onGridContentReady(grid) {
    if (grid.component.totalCount() > 0) {
      if(this.setInitialSelectedRow){
        this.selectedRowKeys = [this.publishedEvent.leaseRecognitionScheduleID];
        this.setInitialSelectedRow = false;
      }

      const selectedRowIndex = grid.component.getRowIndexByKey(this.selectedRowKeys[0]);
      grid.component.selectRowsByIndexes([selectedRowIndex]);  

      const rowHeight = grid.component.getRowElement(0)[0].clientHeight;
      this.eventsDataGrid.instance.getScrollable().scrollTo({ y: selectedRowIndex * rowHeight });
    }
  }

  getGridPreferences() {
    this.subscription.add(this.accountingSummaryService.getGridPreferences().subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        const state = JSON.parse(sessionStorage.getItem("eventsGridStateKey"))
        // Filter the data
        const filteredData = response.data.filter(item => {
          return item.classificationID === this.classificationId && item.gridName === this.gridName;
        });

        if(state !== null) {
          state.columns = [];

          filteredData.forEach((item) => {
            const parsedColumns = JSON.parse(item.columnJson);
            state.columns.push(...parsedColumns);
          });
        }

        this.selectedRowKeys = [this.publishedEvent.leaseRecognitionScheduleID];
        state.selectedRowKeys = [this.publishedEvent.leaseRecognitionScheduleID];
        this.initialState = state;
        this.eventsDataGrid.instance.state(state);
        sessionStorage.setItem("eventsGridStateKey", JSON.stringify(state));
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  resetGrid() {
    this.isGridStateChanged = false;
    this.eventsDataGrid.instance.state(this.initialState);
  }

  saveGridPreferences() {
    this.isGridStateChanged = false;
    const newState = this.eventsDataGrid.instance.state();
    sessionStorage.setItem("eventsGridStateKey", JSON.stringify(newState));
    const columns = JSON.stringify(this.eventsDataGrid.instance.state().columns);
    this.subscription.add(this.accountingSummaryService.saveGridPreferences(this.classificationId, this.gridName, columns).subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.initialState = newState;
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
    this.eventScheduleData.emit(e.data);
    this.eventsDataGrid.instance.repaint();
  }  

  onCellPrepared(event: CellPreparedEvent) {
    if (event?.row?.isSelected) {
      if (event.row.data.scheduleIndex == 1) {
        event.cellElement.style.fontWeight = '400';
        return;
      }

      const previousRow = this.detailsGridData.filter(f => f.scheduleIndex == (event.row.data.scheduleIndex - 1))[0];

      const oldValue = Object(previousRow)[event.column.dataField];
      const newValue = Object(event.data)[event.column.dataField];
      if(oldValue !== newValue) {
        event.cellElement.style.fontWeight = '700';
      } else {
        event.cellElement.style.fontWeight = '400';
      }
    }
  }

  presentValueExcel(event, data) {
    event.preventDefault();
    alert('present value clicked');
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
      text: 'Schedule ID: ' + e.row.data.leaseRecognitionScheduleID,
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

  private setRights(){
    this.userHasEditLeaseRights = this.rightsInfo.userHasEditLeaseRights;
    this.wfStatusHasEditRights = this.rightsInfo.wfStatusUserHasEditRights;
    this.userHasLeftNavEditRights = this.rightsInfo.userHasLeftNavEditRights;
    this.userHasDeleteAccountingSchedulesModuleRight = this.rightsInfo.userCanDeleteSchedule;
  }

  exportToExcel() {
    const classificationType = this.classificationType; 
    const amortizationProfileName = this.amortizationProfileName;
    const componentName = 'Accounting Events';
    const sheetname = this.accountingSummaryService.getLeaseAbstractId() + ' - ' + amortizationProfileName;
    const filename = this.accountingSummaryService.generateFileName(classificationType, amortizationProfileName, componentName);
    this.accountingSummaryService.exportToExcel(this.eventsDataGrid.instance, filename, sheetname);
  }
  
}
