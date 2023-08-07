import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-accounting-health-grid',
  templateUrl: './accounting-health-grid.component.html',
  styleUrls: ['./accounting-health-grid.component.scss']
})
export class AccountingHealthGridComponent implements OnInit {
  @Input()
  hideDismissed = false;

  @Output()
  onGridSelectionChanged = new EventEmitter();

  @ViewChild('dataGrid')
  dataGrid: DxDataGridComponent;

  gridData: any[];
  columns: any[];

  filterBuilderVisible = false;

  severityLevels = {
    1: 'critical',
    2: 'high',
    3: 'warning',
  };

  severitySelections = [
    { value: 1, name: 'Critical'},
    { value: 2, name: 'High'},
    { value: 3, name: 'Warning'},
  ];

  ngOnInit() {
    this.gridData = [{
      SystemLeaseID: 1234,
      ClientLeaseID: 'Lease 321',
      RuleID: 23,
      RuleName: 'Editing initial schedule instead of remeasuring from day 1',
      RuleDescription: 'This scenario occurs when the user performs a Day 1 remeasure when the user should have edited the existing schedule. Since the initial Accounting schedule has not processed the Journal Entry for the beginning balance, it was still eligible to be edited. The data correction remeasurement from Day 1 only needs to occur if the Journal Entry for beginning balance has been processed. This can result in an unbalanced Journal entry if the profile does not have liability adjustment accounts defined for opening balance Journal Entries.',
      SeverityLevel: 'Warning',
      AlertType: 'Data Audit',
      IsDismissed: false,
    }, {
      SystemLeaseID: 1245,
      ClientLeaseID: 'Lease 312',
      RuleID: 23,
      RuleName: 'Editing initial schedule instead of remeasuring from day 1',
      RuleDescription: 'This scenario occurs when the user performs a Day 1 remeasure when the user should have edited the existing schedule. Since the initial Accounting schedule has not processed the Journal Entry for the beginning balance, it was still eligible to be edited. The data correction remeasurement from Day 1 only needs to occur if the Journal Entry for beginning balance has been processed. This can result in an unbalanced Journal entry if the profile does not have liability adjustment accounts defined for opening balance Journal Entries.',
      SeverityLevel: 'Warning',
      AlertType: 'Data Audit',
      IsDismissed: true,
    }];

    this.filterDismissedAlerts();

    this.columns = [{
      dataField: 'SystemLeaseID',
    }, {
      dataField: 'ClientLeaseID',
      visible: false,
    }, {
      dataField: 'RuleID',
    }, {
      dataField: 'RuleName',
    }, {
      dataField: 'SeverityLevel',
    }, {
      dataField: 'AlertType',
    }, {
      dataField: 'IsDismissed',
      showInColumnChooser: false,
      visible: false,
    }];
  }

  formatDescription(desc: string): string {
    return desc.replace('\n\n', '<br />');
  }

  gridSelectionChanged(evt) {
    console.log(evt);
    this.onGridSelectionChanged.emit(evt);
  }

  toggleSelectedAlerts() {
    this.dataGrid.instance.getSelectedRowsData().forEach(x => x.IsDismissed = !x.IsDismissed);
  }

  toggleAlert(evt) {
    evt.IsDismissed = !evt.IsDismissed;
    this.filterDismissedAlerts();
  }

  showFilterBuilder() {
    this.filterBuilderVisible = true;
  }

  showColumnChooser() {
    this.dataGrid.instance.showColumnChooser();
  }

  private filterDismissedAlerts() {
    if (this.hideDismissed) {
      this.gridData = this.gridData.filter(x => !x.IsDismissed);
    }
  }
}
