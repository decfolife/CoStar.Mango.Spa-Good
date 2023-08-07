import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DxDataGridComponent } from "devextreme-angular";
import { Service, Transaction, TransactionActivity, Task, User } from '../../app.service';

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
	selector: 'project-kanban-card',
	templateUrl: './project-kanban-card.component.html',
	styleUrls: ['./project-kanban-card.component.scss'],
	providers: [Service]
})
export class ProjectKanbanCardComponent implements OnInit {

	@Input() project : Transaction;
	filesId : string;
	filesTarget : string;
	filesPopoverVisible : Boolean = false;
	activityId : string;
	activityTarget : string;
	activityPopoverVisible : Boolean = false;
	mentions : Mention[] = [];
	activities : TransactionActivity[] = [];
	filteredActivities : TransactionActivity[] = [];
	tasks : Task[] = [];
	users : User[] = [];
	tasksVisible : boolean = false;
	stageTasks : Task[] = [];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.filesId = "files_ppover_" + this.project.id.toString();
		this.filesTarget = "#" + this.filesId;

		this.activityId = "activity_ppover_" + this.project.id.toString();
		this.activityTarget = "#" + this.activityId;

		this.users = this.service.getUsers();
		this.tasks = this.service.getTasksByProject(13);
		this.stageTasks = this.tasks.filter(task => task.parentTaskId == 547175);

		this.mentions = [
			new Mention("id", "fullName", "fullName", "@", this.users),
			new Mention("id", "taskName", "taskName", "#", this.tasks),
		];

		this.activities = this.service.getTransactionActivities(13, 0);	
		this.filteredActivities = this.activities;
	}

	toggleFilePopover(e) {
		e.stopPropagation();
		this.filesPopoverVisible = !this.filesPopoverVisible;
	}

	toggleActivityPopover(e) {
		e.stopPropagation();
		this.activityPopoverVisible = !this.activityPopoverVisible;
	}

	toggleTasks(e) {
		e.stopPropagation();
		this.tasksVisible = !this.tasksVisible;
	}

	navigateToProject() {
		console.log("You clicked project " + this.project.id);
	}

}
