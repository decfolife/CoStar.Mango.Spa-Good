import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { DropdownField, Service } from '../../../../../app.service';

@Component({
  selector: 'app-accounting-dashboard',
  templateUrl: './accounting-dashboard.component.html',
  styleUrls: ['./accounting-dashboard.component.scss'],
  providers : [Service]
})
export class AccountingDashboardComponent implements OnInit {
  cards: any[];
  calendarDropdown = new DropdownField(
    [{ value : "Standard Calendar" }, { value : "Custom Calendar" }],
    "value",
    "value",
    "Calendar",
    "dropdown",
    [],
    true,
    "single",
    true,
    false,
    true
  );

  ngOnInit(): void {
    this.cards = [
      {
        componentName: 'AccountingWorkflowStatusComponent',
        colSpan: 2,
        visible: true
      },
      {
        componentName: 'JECountByStatusThisQuarter',
        colSpan: 1,
        visible: true
      },
      {
        componentName: 'PeriodEventCountThisQuarter',
        colSpan: 1,
        visible: true
      },
      {
        componentName: 'LeaseAlertsCard',
        colSpan: 2,
        visible: true
      },
      {
        componentName: 'UpcomingExpirationsCardComponent',
        colSpan: 2,
        visible: true
      }
    ];
  }

  resizeCard(card): void {
    if (card.colSpan === 1) {
      card.colSpan = 2;
      return;
    }

    card.colSpan = 1;
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }
}
