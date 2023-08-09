import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task, ListPageQuery } from '../../../../../app.service';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

	tasks : Task[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.tasks = this.service.getTasks();
		this.queries = this.service.getListPageQueriesByObjectType('task');	
		this.rowClickRoute = '../../project';	
		this.keyFields = ["projectId"];
		this.addWizards = [];
		this.columns = [
			{	dataField : "projectId",
				alignment : "left",
				visible : true,
				dataType : "number",
				caption : "Project ID"
			},
			{	dataField : "projectName",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "taskName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "dueDate",
				alignment : null,
				visible : true,
				dataType : null
			},			
		];
	}

	
}