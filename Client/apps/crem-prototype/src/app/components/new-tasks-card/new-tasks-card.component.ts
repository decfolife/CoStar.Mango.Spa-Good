import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task, DropdownField } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'new-tasks-card',
	templateUrl: './new-tasks-card.component.html',
	styleUrls: ['./new-tasks-card.component.scss'],
	providers: [Service]
})
export class NewTasksCardComponent implements OnInit {

	newTasks : Task[];
	popoverVisible : Boolean = false;
	popoverTarget : string;
	hoveredRow : Task;
	
	durations : DropdownField;
	isExpanded : Boolean = true;
	showUnapproved : Boolean = true;
	showApproved : Boolean = false;

	@ViewChild("NewTasksDataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.newTasks = this.service.getNewTasks();	
		this.durations = new DropdownField([{ value : "Since last login" }, { value : "Last 30 days" }, { value : "Last 60 days" }, { value : "Last 90 days" }], "value", "value", "Select", "dropdown", ["Last 30 days"], true, "single", false, false, false);		
	}

	assignRowId(e) {
		// let self = this;
		// let rowId = "newTaskRow" + e.rowIndex.toString();
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
		this.popoverTarget = "#NewTaskInfo" + e.data.id.toString();
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
