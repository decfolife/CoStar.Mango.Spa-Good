import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { DxPivotGridComponent } from 'devextreme-angular';

import { Service } from '../../../../../../app.service';
import { AccountingDashboardService } from '../accounting-dashboard.service';

@Component({
  selector: 'je-account-by-status-card',
  templateUrl: './je-count-by-status.component.html',
  styleUrls: ['./je-count-by-status.component.scss'],
  providers: [Service]
})
export class JECountByStatusComponent implements OnInit {
  gridDataSource: any;

  @Output()
  cardResize = new EventEmitter();

  @ViewChild('countGrid')
  countGrid: DxPivotGridComponent;

  constructor(private adService: AccountingDashboardService) { }

  ngOnInit(): void {
    const gridItems = this.adService.getCountsGridData();

    this.gridDataSource = {
      fields: [{
        dataField: 'Portfolio',
        area: 'row',
      }, {
        dataField: 'JournalEntryProcessingStatusSortOrder',
        area: 'row',
      }, {
        dataField: 'JournalEntryProcessingStatus',
        area: 'row',
      }, {
        dataField: 'PeriodYear',
        area: 'column',
      }, {
        dataField: 'PeriodQuarter',
        area: 'column',
      }, {
        dataField: 'DisplayPeriod',
        area: 'column',
      }, {
        dataField: 'SystemLeaseID',
        area: 'data',
        format: {
          type: "fixedPoint",
          precision: 0
        }
      }],

      store: gridItems
    };
  }

  showFieldChooser(): void {
    this.countGrid.instance.getFieldChooserPopup().show();
  }

  resizeCard(): void {
    this.cardResize.emit(null);
    this.countGrid.instance.getDataSource().reload();
  }
}
