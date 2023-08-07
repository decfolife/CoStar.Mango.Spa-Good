import { Component, OnInit, ViewChild } from '@angular/core';

import { DxPivotGridComponent } from 'devextreme-angular';

import { Service } from '../../../../../../app.service';
import {
  AccountingDashboardService,
  AlertType,
  LeaseAlert,
  SeverityLevel
} from '../accounting-dashboard.service';

@Component({
  selector: 'lease-alerts-card',
  templateUrl: './lease-alerts.component.html',
  styleUrls: [ './lease-alerts.component.scss' ],
  providers: [ Service ]
})
export class LeaseAlertsCardComponent implements OnInit {
  gridData: LeaseAlert[];
  gridDataSource: any;

  showDismissed: boolean;

  constructor(private adService: AccountingDashboardService) { }

  @ViewChild('alertsGrid')
  alertsGrid: DxPivotGridComponent

  ngOnInit(): void {
    this.gridData = this.adService.getAlertsGridData();
    this.mapAlertsToGridDataSource();
  }

  showFieldChooser(): void {
    this.alertsGrid.instance.getFieldChooserPopup().show();
  }

  mapAlertsToGridDataSource() {
    this.gridData.forEach(la => {
      la.severityLevel = this.getSeverity(la.severityLevel as SeverityLevel);
      la.alertType = this.getAlertType(la.alertType as AlertType);
    });

    this.gridDataSource = {
      fields: [ {
        dataField: 'portfolio',
        area: 'row',
      }, {
        dataField: 'alertType',
        area: 'row',
      }, {
        dataField: 'severityLevel',
        area: 'column'
      }, {
        dataField: 'ruleId',
        area: 'data',
        format: {
          type: "fixedPoint",
          precision: 0
        }
      }, ],

      store: this.gridData,
    };
  }

  onCellPrepared(evt) {
    if (evt.area === 'data' && evt.cell.text === '') {
      evt.cellElement.textContent = '0';
    }
  }

  private getAlertType(alertType: AlertType): string {
    const wordRegex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
    let tmp = Object.values(AlertType);
    tmp = tmp.slice(0, tmp.length / 2);

    return tmp[ alertType ].toString().match(wordRegex).join(' ');
  }

  private getSeverity(severity: SeverityLevel): string {
    let tmp = Object.values(SeverityLevel);
    tmp = tmp.slice(0, tmp.length / 2);

    return tmp[ severity - 1 ].toString();
  }
}
