import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, User, TransactionActivity, Task, DropdownField } from '../../../../../../app.service';

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
	selector: 'project-activity',
	templateUrl: './project-activity.component.html',
	styleUrls: ['./project-activity.component.scss'],
	providers: [Service]
})
export class ProjectActivityComponent implements OnInit {

	projectId : number;
	users : User[];
	activities : TransactionActivity[];
	filteredActivities : TransactionActivity[];
	tasks : Task[];
	mentions : Mention[];
	isReplying : boolean = false;
	replyToActivityId : number = null;
	newReply : string = null;
	isDraftingNewMessage : boolean = false;
	newMessage : string = null;
	userFilter : DropdownField;
	taskFilter : DropdownField;
	activityTypeFilter : DropdownField;
	

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {		

		this.route.parent.params.subscribe(params => { 
			this.projectId = params['project_id']; 
			this.activities = this.service.getTransactionActivities(this.projectId, 0);	
			this.filteredActivities = this.activities;	
			
			this.tasks = this.service.getTasksByProject(this.projectId);
			this.taskFilter = new DropdownField(this.tasks, "id", "taskName", "Task", "dropdown", [], true, "single", true, true, true);

			this.users = this.service.getUsers();

			this.userFilter = new DropdownField(this.users, "id", "fullName", "User", "dropdown", [], true, "multiple", true, true, true);
			this.activityTypeFilter = new DropdownField([{ type : "Message"}, { type : "File Upload"}, { type : "Task Approval"}, { type : "Milestone Completion"}], "type", "type", "Activity Type", "dropdown", [], true, "multiple", true, true, true);

			this.mentions = [
				new Mention("id", "fullName", "fullName", "@", this.users),
				new Mention("id", "taskName", "taskName", "#", this.tasks),
			]
		});
	}

	searchActivity(data) {
		// console.log(data);
		let filt = data.toUpperCase();
		// console.log(filt);
		this.filteredActivities = this.activities.filter(itm => itm.description.toUpperCase().includes(filt) || itm.replies.filter(rep => rep.description.toUpperCase().includes(filt)).length );
		// console.log(this.filteredActivities);
	}

	

}
