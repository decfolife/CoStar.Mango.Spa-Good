import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import notify from 'devextreme/ui/notify';
import { exportDataGrid } from 'devextreme/excel_exporter';
import 'regenerator-runtime/runtime';
import { Buffer, Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import {
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

import { AlertsService } from '../shared/service/alerts.service';
import { AlertsGridComponent } from '../alerts-grid/alerts-grid.component';
import { ModuleRight, Portfolio, ApiResponse } from '../shared/models';

const LEASE_ALERTS_MODULE_ID = 186;

@Component({
  selector: 'mango-alerts-lease-alerts-controls',
  templateUrl: './lease-alerts-controls.component.html',
  styleUrls: ['./lease-alerts-controls.component.scss']
})
export class LeaseAlertsControlsComponent implements OnInit {
  @Input()
  isPopupView = false;

  @Input()
  leaseAbstractID: number;

  @Output()
  refreshCachedDate = new EventEmitter();

  @ViewChild('alertsGrid')
  alertsGrid: AlertsGridComponent;

  userHasAddRights = false;

  showClearFilters = false;
  leaseStatusTooltipVisible = false;
  isExporting = false;
  isArchived = false;
  showDismissed = false;

  showActiveLeases: boolean;
  showArchivedLeases: boolean;
  showAllLeases: boolean;
  currentLeaseStatusFilter: string;

  toggleButtonDisabled = true;
  refreshingAlerts = false;

  searchText: string;
  appliedFilterCount = 0;

  portfolios: Portfolio[] = [];
  currentPortfolio: Portfolio;

  sessionState = null;
  isLoadingData = false;
  isCollapseExpandAllEnabled = false;
  isAllExpanded = false;

  faCaretDown = faCaretDown;

  constructor(private service: AlertsService) { }

  ngOnInit() {
    this.showActiveLeases = !this.isPopupView;
    this.showArchivedLeases = false;
    this.showAllLeases = this.isPopupView;
    this.currentLeaseStatusFilter = this.isPopupView ? 'all' : 'active';

    this.service.getUserModuleRights().subscribe(res => {
      const rights = (res.data as ModuleRight[]).find(
        (x: ModuleRight) => x.moduleId === LEASE_ALERTS_MODULE_ID
      );

      if (!rights) {
        return;
      }

      this.userHasAddRights = rights.hasAddRights;
    });

    const dateFormatElement = document.getElementById('isEuropeanDateFormat');
    this.service.isEuroDateFormat = (dateFormatElement?.innerText === 'true');

    if (this.isPopupView) {
      return;
    }

    this.service.getPortfolios().subscribe(res => {
      this.portfolios = res.data.portfolios as Portfolio[];
    });

    this.sessionState = this.loadSessionState();

    if (this.sessionState !== null && !this.isPopupView) {
      this.currentLeaseStatusFilter = this.sessionState.currentLeaseStatusFilter;
      this.showActiveLeases = this.sessionState.currentLeaseStatusFilter === 'active';
      this.showArchivedLeases = this.sessionState.currentLeaseStatusFilter === 'archived';
      this.showAllLeases = this.sessionState.currentLeaseStatusFilter === 'all';

      this.searchText = this.sessionState.currentSearch;
      this.currentPortfolio = this.sessionState.currentPortfolio;
      this.showDismissed = this.sessionState.showDismissed;
      this.isAllExpanded = this.sessionState.isAllExpanded;
    }
  }

  getLeaseText() {
    if (this.showAllLeases) {
      return 'both active and archived';
    }

    return `only ${this.showActiveLeases ? 'active' : 'archived'}`;
  }

  leaseToggleChanged(evt) {
    this.showActiveLeases = evt.value === 'active';
    this.showArchivedLeases = evt.value === 'archived';
    this.showAllLeases = evt.value === 'all';

    this.currentLeaseStatusFilter = evt.value;

    this.leaseStatusTooltipVisible = false;
    setTimeout(() => this.leaseStatusTooltipVisible = true, 10);

    this.alertsGrid.filterLeases(this.currentPortfolio, this.currentLeaseStatusFilter);
  }

  gridSelectionChanged(numberSelected: number) {
    this.toggleButtonDisabled = !(numberSelected > 0);
  }

  searchDataGrid() {
    this.alertsGrid.searchGrid(this.searchText);
  }

  portfolioChanged(portfolio: Portfolio) {
    this.currentPortfolio = portfolio;

    this.alertsGrid.filterLeases(this.currentPortfolio, this.currentLeaseStatusFilter);
  }

  showFilterBuilder() {
    this.alertsGrid.filterBuilderVisible = true;
  }

  clearGridFilters(evt: MouseEvent) {
    evt.stopPropagation();
    this.alertsGrid.leaseAlertsGrid.instance.clearFilter();

    this.appliedFilterCount = 0;
    this.showClearFilters = false;
  }

  showColumnChooser() {
    this.alertsGrid.showColumnChooser();
  }

  toggleClearFilters() {
    this.showClearFilters = !this.showClearFilters;
  }

  exportDataGrid() {
    this.isExporting = true;

    const workbook = new Workbook();
    const leaseAlertWorksheet = workbook.addWorksheet('Lease Alerts');

    exportDataGrid({
      component: this.alertsGrid.leaseAlertsGrid.instance,
      worksheet: leaseAlertWorksheet,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: Buffer) => {
        saveAs(new Blob([ buffer ], { type: 'application/octet-stream' }),
          'Lease Alerts.xlsx');
      });

      this.isExporting = false;
    }).catch(() => { this.isExporting = false; });
  }

  toggleSelected() {
    this.alertsGrid.toggleSelectedAlerts();
  }

  updateFilterCount(newCount: number) {
    this.appliedFilterCount = newCount;
  }

  refreshAlerts() {
    this.refreshingAlerts = true;
    this.service.runLeaseAlertRulesByLeaseAbstractID(this.leaseAbstractID).subscribe((res: ApiResponse) => {
      if (res.success) {
        this.alertsGrid.filterLeases(this.alertsGrid.currentPortfolio, this.currentLeaseStatusFilter);
      }

      notify({
        message: res.success ? 'Alerts successfully refreshed' : 'There was an issue while refreshing alerts',
        type: res.success ? 'success' : 'error',
        displayTime: 3000,
        position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
        maxWidth: '400px',
        closeOnClick: true,
      });

      this.refreshCachedDate.emit();

      this.refreshingAlerts = false;
    }, () => {
      notify({
        message: 'There was an issue while refreshing alerts',
        type: 'error',
        displayTime: 3000,
        position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
        maxWidth: '400px',
        closeOnClick: true,
      });

      this.refreshingAlerts = false;
    });
  }

  getRefreshButtonText(): string {
    return this.refreshingAlerts ? 'Refreshing...' : 'Refresh Alerts';
  }

  setIsDismissedFilter(isDismissed: boolean) {
    this.alertsGrid.isDismissed = isDismissed;
    this.alertsGrid.filterLeases(this.currentPortfolio, this.currentLeaseStatusFilter);
  }

  collapseExpandAll() {
    this.isAllExpanded
      ? this.alertsGrid.leaseAlertsGrid.instance.collapseAll()
      : this.alertsGrid.leaseAlertsGrid.instance.expandAll();

    this.isAllExpanded = !this.isAllExpanded;
    this.alertsGrid.isAllExpanded = this.isAllExpanded;
  }

  getCollapseExpandAllText(): string {
    return this.isAllExpanded ? 'Collapse All' : 'Expand All';
  }

  private loadSessionState() {
    return JSON.parse(sessionStorage.getItem('leaseAlertsListPageSessionState'));
  }
}
