/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

export interface Link{
  href: string;
  text: string;
  style?: string;
}

@Component({
  selector: 'dashboards-left-nav',
  templateUrl: 'dashboards-left-nav.component.html',
  styleUrls: ['dashboards-left-nav.component.scss'],
})
export class DashboardsLeftNavComponent implements OnInit {
  @Input() userHasDocumentStoreViewRight;
  @Input() userHasManageTeamListsRight;
  
  constructor() { }
  ngOnInit() { }

}
