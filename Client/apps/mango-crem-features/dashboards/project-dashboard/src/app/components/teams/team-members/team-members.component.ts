import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

	@Input() leaseId : number;
	teamMembers : any[];
	public dataRetrieved: boolean = false;

	@ViewChild("teamMembersGrid") dataGrid: DxDataGridComponent;

	constructor() {}	

	ngOnInit() {
		this.dataRetrieved = false;

	}

	detailRowClick(e: any) {
		e.event.stopPropagation();
	}

}
