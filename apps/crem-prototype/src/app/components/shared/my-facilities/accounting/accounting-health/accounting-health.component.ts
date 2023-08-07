import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountingHealthGridComponent } from './accounting-health-grid/accounting-health-grid.component';

@Component({
  selector: 'app-accounting-health',
  templateUrl: './accounting-health.component.html',
  styleUrls: [ './accounting-health.component.scss' ]
})
export class AccountingHealthComponent implements OnInit {
  @ViewChild('AlertsGrid')
  alertsGrid: AccountingHealthGridComponent;

  appliedFilterCount = 0;

  showClearFilters = false;
  showDismissed = true;
  toggleButtonDisabled = true;

  gridSelectionChanged(evt) {
    this.toggleButtonDisabled = !this.toggleButtonDisabled;
  }

  searchDataGrid(evt) { }

  onPortfolioChange(evt) { }

  showFilterBuilder() {
    this.alertsGrid.showFilterBuilder();
  }

  toggleClearFilters() { }

  clearGridFilters(evt) { }

  toggleSelected() {
    this.alertsGrid.toggleSelectedAlerts();
  }
  showColumnChooser() {
    this.alertsGrid.showColumnChooser();
  }

  exportDataGrid() { }

  ngOnInit() {
  }
}
