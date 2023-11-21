import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'mango-service-account-history',
  templateUrl: './service-account-history.component.html',
  styleUrls: ['./service-account-history.component.scss'],
})
export class ServiceAccountHistoryComponent {
  @Input() histories:any;
}
