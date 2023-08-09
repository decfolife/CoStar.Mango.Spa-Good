import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task } from '../../app.service';

export class Assignee {    
	name: string;
	status : string;
	approvedDate : string;
	note : string;

	constructor(name,status,approvedDate,note) {		
		this.name = name;	
		this.status = status;
		this.approvedDate = approvedDate;
		this.note = note;
	}
}

export class Dependency {    
	step: string;
	taskName : string;
	dueDate : string;
	approvals : string;
	color : string;

	constructor(step,taskName,dueDate,approvals,color) {		
		this.step = step;	
		this.taskName = taskName;
		this.dueDate = dueDate;
		this.approvals = approvals;
		this.color = color;
	}
}

@Component({
	selector: 'project-task-popover',
	templateUrl: './project-task-popover.component.html',
	styleUrls: ['./project-task-popover.component.scss']
})
export class ProjectTaskPopoverComponent implements OnInit {

		@Input() task : Task;
		assignees : Assignee[];
		dependencies : Dependency[];
		
		constructor() { }

		ngOnInit() {
			this.assignees = [
				new Assignee("Kent Carpenter", "Approved", "05/28/2020", "Approved"),
				new Assignee("Patrick Griffith", "Pending", null, null),
			];

			this.dependencies = [
				new Dependency("1.4", "Review space analysis", "4/15/2020", "1 of 1", "green"),
				new Dependency("1.5", "Analyze something in order to approve", "4/24/2020", "0 of 1", "red"),
				new Dependency("2.1.2", "Do something specific", "5/20/2020", "2 of 2", "green"),
			]
		}

}
