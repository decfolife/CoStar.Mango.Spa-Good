import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { DxPivotGridComponent } from 'devextreme-angular';

import { Service } from '../../../../../../app.service';
import { AccountingDashboardService, PeriodEvent } from '../accounting-dashboard.service';

@Component({
  selector: 'period-event-count-card',
  templateUrl: './period-event-count.component.html',
  styleUrls: ['./period-event-count.component.scss'],
  providers : [Service]
})
export class PeriodEventCountComponent implements OnInit {
  gridDataSource: any;

  @ViewChild('countGrid')
  countGrid: DxPivotGridComponent

  @Output()
  cardResize = new EventEmitter();

  constructor(private adService: AccountingDashboardService) { }

  ngOnInit(): void {
    const gridItems = this.adService.getCountsGridData();

    this.gridDataSource = {
      fields: [ {
        dataField: 'Portfolio',
        area: 'row',
      }, {
        dataField: 'PeriodEventSortOrder',
        area: 'row',
      }, {
        dataField: 'PeriodEvent',
        area: 'row',
      }, {
        dataField: 'PeriodDate',
        area: 'column',
      }, {
        dataField: 'SystemPeriodID',
        area: 'data',
        format: {
          type: "fixedPoint",
          precision: 0
        }
      }, ],

      store: gridItems
    }
  }

  showFieldChooser(): void {
    this.countGrid.instance.getFieldChooserPopup().show();
  }

  resizeCard(): void {
    this.cardResize.emit(null);
    this.countGrid.instance.getDataSource().reload();
  }
}
