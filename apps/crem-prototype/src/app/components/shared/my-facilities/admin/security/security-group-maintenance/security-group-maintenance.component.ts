import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, SecurityGroup } from '../../../../../../app.service';
import { DxTreeListComponent } from "devextreme-angular";

@Component({
	selector: 'app-security-group-maintenance',
	templateUrl: './security-group-maintenance.component.html',
	styleUrls: ['./security-group-maintenance.component.scss'],
	providers: [Service]
})
export class SecurityGroupMaintenanceComponent implements OnInit {

	groups : SecurityGroup[];
	isExpanded : Boolean = true;

	@ViewChild("TreeList") treeList: DxTreeListComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
		this.groups = this.service.getSecurityGroups();
	}

	ngOnInit() {
		
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;

		if( this.isExpanded ) {
			this.groups.forEach( row => {
				this.treeList.instance.expandRow(row.id)
			});
		} else {
			this.groups.forEach( row => {
				this.treeList.instance.collapseRow(row.id)
			});
		}
	}

	searchTreeList(data) {
		this.treeList.instance.searchByText(data);
	}

	exportTreeList() {
		// this.treeList.instance.exportToExcel(false);
	}

	add() {
		this.treeList.instance.addRow();
	}

	addSubGroup(parent_id) {
		// console.log(parent_id);
		this.treeList.instance.addRow(parent_id);
	}

}
