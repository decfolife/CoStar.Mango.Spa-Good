import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Hierarchy } from '../../../../../../app.service';
import { DxTreeListComponent } from "devextreme-angular";

@Component({
	selector: 'hierarchy-maintenance',
	templateUrl: './hierarchy-maintenance.component.html',
	styleUrls: ['./hierarchy-maintenance.component.scss'],
	providers: [Service]
})
export class HierarchyMaintenanceComponent implements OnInit {

	hierarchies : Hierarchy[];
	isExpanded : Boolean = true;

	@ViewChild("TreeList") treeList: DxTreeListComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
		this.hierarchies = this.service.getPortfolioHierarchies();
	}

	ngOnInit() {
		
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;

		if( this.isExpanded ) {
			this.hierarchies.forEach( row => {
				this.treeList.instance.expandRow(row.id)
			});
		} else {
			this.hierarchies.forEach( row => {
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

	editHierarchy(row_index) {
		// console.log(row_index)
		// edit the hierarchy level in-line
		this.treeList.instance.editRow(row_index);
	}

	editPortfolio(id) {
		// transition to the edit portfolio page
	}

}
