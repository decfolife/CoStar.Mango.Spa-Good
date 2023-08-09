import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service, Task, TaskApprover } from '../../app.service';
import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";


@Component({
	selector: 'task-dialog',
	templateUrl: './task-dialog.component.html',
	styleUrls: ['./task-dialog.component.scss'],
	providers: [Service]
})
export class TaskDialogComponent implements OnInit {

	@Input() task : Task;
	@Output() saved = new EventEmitter<Task>();
	@Output() closed = new EventEmitter<Task>();
	@Output() transition = new EventEmitter<Number>();
	@ViewChild("ApproverGrid") approverGrid: DxDataGridComponent;

	projectTasks : Task[];
	taskApprovers : TaskApprover[];
	taskAction : string;
	selectedTaskApprover : TaskApprover;
	showMoreNotes : Boolean = false;
	availableApprovers : TaskApprover[];
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 
		
	}

	ngOnInit() {
		this.projectTasks = this.service.getTasksByProject(this.task.projectId);
		this.taskApprovers = this.service.getTaskApprovers(this.task.id);
		this.availableApprovers = [
			new TaskApprover(10, 1, "Taylor Hampton", false, false, null, null, null, null, null, null, "Pending", "TH"),
			new TaskApprover(11, 1, "Kent Carpenter", false, false, null, null, null, null, null, null, "Pending", "KC"),
			new TaskApprover(12, 1, "David Perrins", false, false, null, null, null, null, null, null, "Pending", "DP"),
		];
	}

	close() {
		this.closed.emit(this.task);
	}

	save() {
		this.saved.emit(this.task);
	}

	changeToTask(e) {
		let newTaskId = e.value;
		this.transition.emit(newTaskId);
		this.task = this.service.getTask(newTaskId);
		this.taskApprovers = this.service.getTaskApprovers(newTaskId);

	}

	approveTask(e) {
		console.log(e);
		this.approverGrid.instance.collapseAll(-1);
		this.approverGrid.instance.expandRow(e.key);
		this.taskAction = "Approve";
		this.selectedTaskApprover = e.data;
	}

	rejectTask(e) {
		this.approverGrid.instance.collapseAll(-1);
		this.approverGrid.instance.expandRow(e.key);
		this.taskAction = "Reject";
		this.selectedTaskApprover = e.data;
	}

	saveApproveReject() {
		if( this.taskAction == "Approve" ){
			this.selectedTaskApprover.status = "Complete";
			this.selectedTaskApprover.isApproved = true;
			this.selectedTaskApprover.isRejected = false;
			this.selectedTaskApprover.approvalDate = "2/17/2021";
		} else {
			this.selectedTaskApprover.status = "Pending";
			this.selectedTaskApprover.isApproved = false;
			this.selectedTaskApprover.isRejected = true;
			this.selectedTaskApprover.approvalDate = null;
		}

		this.cancelApproveReject();
	}

	cancelApproveReject() {
		this.approverGrid.instance.collapseAll(-1);
		this.taskAction = null;
		this.selectedTaskApprover = null;
	}

	toggleMoreNotes() {
		this.showMoreNotes = !this.showMoreNotes;
	}

	onDragStart(e) {
		console.log("drag start", e);
        e.itemData = e.fromData[e.fromIndex];
    }

    onAdd(e) {
    	console.log("add", e);
        e.toData.splice(e.toIndex, 0, e.itemData);
    }

    onRemove(e) {
    	console.log("remove", e);
        e.fromData.splice(e.fromIndex, 1);
    }   

	handleToggleChange(e) {
		// console.log(e);
		this.task[e.source.name] = e.checked;
	}
}
