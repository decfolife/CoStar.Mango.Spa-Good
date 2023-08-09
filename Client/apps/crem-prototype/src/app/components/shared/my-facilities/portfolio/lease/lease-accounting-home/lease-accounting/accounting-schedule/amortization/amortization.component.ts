import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DxDataGridComponent } from 'devextreme-angular';

import { Service, AccountingMeasurement, AmortizationPeriod } from '../../../../../../../../../app.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'amortization',
  templateUrl: './amortization.component.html',
  styleUrls: ['./amortization.component.scss'],
  providers: [Service]
})
export class AmortizationComponent implements OnInit {

  measurementId: number;
  measurement: AccountingMeasurement;
  amortizationPeriods: AmortizationPeriod[];
  queryName: string;

  @ViewChild('AmortizationDataGrid')
  dataGrid: DxDataGridComponent;

  constructor(private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.measurementId = params['measurement_id'];
      this.amortizationPeriods = this.service.getAmortizationPeriodsByMeasurment(this.measurementId);

      this.measurement = this.service.getMeasurement(this.measurementId);
      this.queryName = this.measurement.measureType +
        ' (' + this.measurement.measureIndex + ') | ' +
        this.measurement.status;
    });
  }

  exportDataGrid() {
    this.dataGrid.instance.exportToExcel(false);
  }

  showColumnChooser() {
    this.dataGrid.instance.showColumnChooser();
  }

  searchDataGrid(searchText) {
    this.dataGrid.instance.searchByText(searchText);
  }
}
