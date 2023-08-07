import { Component, Input } from '@angular/core';

@Component({
  selector: 'mango-alerts-root',
  templateUrl: './lease-alerts.component.html',
  styleUrls: ['./lease-alerts.component.scss'],
})
export class LeaseAlertsComponent {
  @Input()
  leaseAbstractId: number;
}
