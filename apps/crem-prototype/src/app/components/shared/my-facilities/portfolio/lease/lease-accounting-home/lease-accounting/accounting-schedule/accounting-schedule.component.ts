import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Service, AccountingMeasurement } from '../../../../../../../../app.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-accounting-schedule',
  templateUrl: './accounting-schedule.component.html',
  styleUrls: ['./accounting-schedule.component.scss'],
  providers: [Service]
})
export class AccountingScheduleComponent implements OnInit {
  scheduleId: number;
  measurements: AccountingMeasurement[];

  constructor(private service: Service, private router: Router, private route: ActivatedRoute) {
    // Get Schedule ID
    route.params.subscribe(params => {
      this.scheduleId = params['schedule_id'];
    });
  }

  ngOnInit() {
    // Get the measurement events for this schedule
    this.measurements = this.service.getMeasurementsBySchedule(this.scheduleId);

    this.navigateToMeasurement({
      data: {
        id: this.measurements[this.measurements.length - 1].id
      }
    });
  }

  navigateToMeasurement(e) {
    this.router.navigate(['measurement', e.data.id], { relativeTo: this.route });
  }
}
