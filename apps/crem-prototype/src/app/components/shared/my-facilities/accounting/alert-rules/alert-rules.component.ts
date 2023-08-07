import { Component, OnInit } from '@angular/core';

import * as AlertRulesJson from './alert-rules.json';

@Component({
  selector: 'alert-rules',
  templateUrl: './alert-rules.component.html',
  styleUrls: ['./alert-rules.component.scss']
})
export class AlertRulesComponent implements OnInit {
  gridData: any[];
  showInactive = true;

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
    this.gridData = (AlertRulesJson as any).default;

    this.gridData.forEach(r => {
      r.isDismissible = Math.random() < .25 ? false : true;
      r.isActive = Math.random() < .25 ? false : true;
    });
  }

  formatDescription(desc: string): string {
    return desc.replace('\n\n', '<br />');
  }

  searchDataGrid(evt) {
  }

  onPortfolioChange(evt) {
  }

  showColumnChooser() {
  }

  exportDataGrid() {
  }
}
