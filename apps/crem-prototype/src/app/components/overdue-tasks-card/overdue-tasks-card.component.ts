import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";


@Component({
	selector: 'overdue-tasks-card',
	templateUrl: './overdue-tasks-card.component.html',
	styleUrls: ['./overdue-tasks-card.component.scss'],
	providers: [Service]
})
export class OverdueTasksCardComponent implements OnInit {

	overdueTasks : Task[];
	popoverVisible : Boolean = false;
	popoverTarget : string;
	hoveredRow : Task;
	isExpanded : Boolean = true;
	showUnapproved : Boolean = true;
	showApproved : Boolean = false;

	@ViewChild("OverdueTasksDataGrid") dataGrid: DxDataGridComponent;


	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.overdueTasks = this.service.getOverdueTasks();	
	}

	assignRowId(e) {
		// let self = this;
		// let rowId = "overdueTaskRow" + e.rowIndex.toString();
		// if( e.rowType == "data") {
		// 	e.rowElement.id = rowId;
		// 	e.rowElement.addEventListener("mouseover", function() {
		// 		self.popoverTarget = "#" + rowId
		// 		self.popoverVisible = true;
		// 		self.hoveredRow = e.data;
		// 	} , false);
		// 	e.rowElement.addEventListener("mouseout", function() {
		// 		self.popoverVisible = false;
		// 	}, false);
		// }		
	}

	showPopover(e) {
		this.popoverTarget = "#OverdueTaskInfo" + e.data.id.toString();
		this.popoverVisible = true;
		this.hoveredRow = e.data;
	}

	hidePopover() {
		this.popoverVisible = false;
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	updateRecordDisplayStatus(e) {
		
		this[e.source.name] = e.checked;
		
	}
}
