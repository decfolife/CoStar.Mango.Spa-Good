import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task } from '../../app.service';
import notify from 'devextreme/ui/notify';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'tasks-due-soon-card',
	templateUrl: './tasks-due-soon-card.component.html',
	styleUrls: ['./tasks-due-soon-card.component.scss'],
	providers: [Service]
})
export class TasksDueSoonCardComponent implements OnInit {

	tasksDueSoon : Task[];
	popoverVisible : Boolean = false;
	popoverTarget : string;
	hoveredRow : Task;

	taskPopupTitle : string = "Approve Task";
	taskPopupVisible : Boolean = false;
	currentTask : Task;
	taskPopupButtonText : string;

	isExpanded : Boolean = true;
	@ViewChild("TasksDueSoonDataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.tasksDueSoon = this.service.getTasksDueSoon();	
	}

	assignRowId(e) {
		// let self = this;
		// let rowId = "taskDueSoonRow" + e.rowIndex.toString();
		// console.log(e.rowElement);
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
		this.popoverTarget = "#taskDueSoonInfo" + e.data.id.toString();
		this.popoverVisible = true;
		this.hoveredRow = e.data;
	}

	hidePopover() {
		this.popoverVisible = false;
	}

	launchTaskPopup(task, type) {
		this.currentTask = this.tasksDueSoon.find(itm => itm.id == task.data.id);
		this.taskPopupTitle = "Approve Task:  " + this.currentTask.taskName + " (" + this.currentTask.projectName + ")";
		
		this.taskPopupVisible = true;
	}

	launchApproveRejectPopup(task, type) {
		console.log(task);
		this.currentTask = this.tasksDueSoon.find(itm => itm.id == task.data.id);
		this.taskPopupTitle = type + " Task:  " + this.currentTask.taskName;
		this.taskPopupButtonText = type;
		
		this.taskPopupVisible = true;
	}

	close(task) {
		this.taskPopupVisible = false;
	}

	taskSaved(task) {
		this.taskPopupVisible = false;

		notify({
			message : "Task saved successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	transitionToTask(task_id) {
		this.currentTask = this.service.getTask(task_id);
		this.taskPopupTitle = "Approve Task:  " + this.currentTask.taskName + " (" + this.currentTask.projectName + ")";
		
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
