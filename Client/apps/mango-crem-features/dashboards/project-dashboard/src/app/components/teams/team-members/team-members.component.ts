import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TeamMember } from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

	@Input() teamMembers : TeamMember[];
	@Input() searchText: string;
	@Input() rights: string;
	public dataRetrieved: boolean = false;

	@ViewChild("TeamMembersGrid") teamMembersGrid: DxDataGridComponent;

	constructor() {}	

	ngOnInit() {
	}

	ngAfterViewInit() {
    if(this.searchText) this.searchDataGrid();
  }

	searchDataGrid() {
		this.teamMembersGrid.instance.searchByText(this.searchText);
	}

	doSomethingForNow(data) {}

}
