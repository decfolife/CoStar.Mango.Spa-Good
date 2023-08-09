import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DxPopupComponent } from 'devextreme-angular';

import { Service, AccountingSchedule } from '../../../../../../../app.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-lease-accounting',
  templateUrl: './lease-accounting.component.html',
  styleUrls: [ './lease-accounting.component.scss' ],
  providers: [ Service ]
})
export class LeaseAccountingComponent {
  @ViewChild('leaseAlertsModal')
  leaseAlertsModal: DxPopupComponent;

  leaseId: number;
  scheduleId: number;
  scheduleName: string;

  selectedSchedule: AccountingSchedule;
  schedules: AccountingSchedule[];

  workflowStatusHistory = [{
    Date: new Date(),
    User: 'Webinar, CoStar',
    Status: 'Needs Review',
    Description: 'Manually Changed',
    Comment: ''
  }];

  showLeaseAlerts = false;

  constructor(service: Service, private router: Router, private route: ActivatedRoute) {
    // Get Lease ID
    route.parent.parent.params.subscribe(params => {
      this.leaseId = params[ 'lease_id' ];
    });

    this.scheduleId = null;

    // Get the Schedule ID if there is one set
    if (route.firstChild !== null) {
      route.firstChild.params.subscribe(params => {
        this.scheduleId = params[ 'schedule_id' ];
      });
    }

    // Get Schedules for this lease
    this.schedules = service.getAccountingSchedulesByLease(this.leaseId);

    if (this.scheduleId !== null) {
      this.selectedSchedule = this.schedules.find((itm) => itm.id == this.scheduleId);
    }

    this.setScheduleName();
  }

  showLeaseAlertsModal() {
    this.showLeaseAlerts = true;
  }

  setScheduleName() {
    this.scheduleName = this.selectedSchedule == null
      ? 'Please choose a schedule'
      : this.selectedSchedule.classification + ' - ' + this.selectedSchedule.amortizationProfile;
  }

  toggleSchedule(schedule) {
    // Update the Selected Schedule
    this.selectedSchedule = schedule;
    this.setScheduleName();

    // Navigate
    this.router.navigate(
      [ 'schedule/', this.selectedSchedule.id.toString() ],
      { relativeTo: this.route }
    );
  }
}
