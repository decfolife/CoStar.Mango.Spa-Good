import { Component, OnInit } from '@angular/core';

import { Service } from '../../../../../../app.service';

@Component({
  selector: 'accounting-workflow-status-card',
  templateUrl: './workflow-status.component.html',
  styleUrls: ['./workflow-status.component.scss'],
  providers : [Service]
})
export class AccountingWorkflowStatusComponent implements OnInit {
  lockedCount: number;
  readyCount: number;

  statuses: any[];

  ngOnInit(): void {
    this.lockedCount = this.getRandomIntLessThan(3000);
    this.readyCount = this.getRandomIntLessThan(100);

    this.statuses = [
      {
        name: 'Draft',
        count: this.getRandomIntLessThan(5000)
      },
      {
        name: 'Needs Review',
        count: this.getRandomIntLessThan(5000)
      },
      {
        name: 'Pending Approval',
        count: this.getRandomIntLessThan(5000)
      },
      {
        name: 'Approved',
        count: this.getRandomIntLessThan(5000)
      },
      {
        name: 'Not Applicable',
        count: this.getRandomIntLessThan(5000)
      },
    ]
  }

  private getRandomIntLessThan(num: number): number {
    return Math.floor(Math.random() * num);
  }
}
