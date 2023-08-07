import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DxDataGridComponent } from "devextreme-angular";
import { Service, Task, TransactionActivity, User } from '../../app.service';

export class Mention {
    valueExpr: string;
    displayExpr: string;
	searchExpr : string;
	marker : string;
	dataSource : [];

    constructor(valueExpr,displayExpr,searchExpr,marker,dataSource) {
		this.valueExpr = valueExpr;
		this.displayExpr = displayExpr;
		this.searchExpr = searchExpr;
		this.marker = marker;	
		this.dataSource = dataSource;
	}
} 

@Component({
  selector: 'task-kanban-card',
  templateUrl: './task-kanban-card.component.html',
  styleUrls: ['./task-kanban-card.component.scss']
})
export class TaskKanbanCardComponent implements OnInit {

	@Input() task : Task;
	@ViewChild("ProjectFilesDataGrid") dataGrid: DxDataGridComponent;
	filesId : string;
	filesTarget : string;
	filesPopoverVisible : Boolean = false;
	activityId : string;
	activityTarget : string;
	activityPopoverVisible : Boolean = false;	
	mentions : Mention[] = [];
	activities : TransactionActivity[] = [];
	tasks : Task[] = [];
	users : User[] = [];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.filesId = "files_ppover_" + this.task.id.toString();
		this.filesTarget = "#" + this.filesId;

		this.activityId = "activity_ppover_" + this.task.id.toString();
		this.activityTarget = "#" + this.activityId;		
	
		this.users = this.service.getUsers();
		this.tasks = this.service.getTasksByProject(13);

		this.mentions = [
			new Mention("id", "fullName", "fullName", "@", this.users),
			new Mention("id", "taskName", "taskName", "#", this.tasks),
		];

		this.activities = this.service.getTransactionActivities(13, 0);	
	}

	launchEditTaskModal() {
		this.router.navigate(["task", this.task.id], {relativeTo: this.route } );
	}

	toggleFilePopover(e) {
		e.stopPropagation();
		this.filesPopoverVisible = !this.filesPopoverVisible;
	}

	toggleActivityPopover(e) {
		e.stopPropagation();
		this.activityPopoverVisible = !this.activityPopoverVisible;
	}	

}
