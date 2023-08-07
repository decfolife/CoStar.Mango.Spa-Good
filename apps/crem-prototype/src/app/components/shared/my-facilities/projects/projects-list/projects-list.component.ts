import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Project, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'projects-list',
	templateUrl: './projects-list.component.html',
	styleUrls: ['./projects-list.component.scss'],
	providers: [Service]
})
export class ProjectsListComponent implements OnInit {

	projects : Project[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.projects = this.service.getProjects();
		this.queries = this.service.getListPageQueriesByObjectType('project');	
		this.rowClickRoute = '../../project';	
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Project", route : "../add" },			
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				visible : true,
				dataType : "number",
				caption : "ID"
			},
			{	dataField : "name",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "type",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "projectManager",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "status",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "targetCompletionDate",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "city",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "state",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "country",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "portfolio",
				alignment : null,
				visible : true,
				dataType : null
			},	
			{	dataField : "lastStatusNote",
				alignment : null,
				visible : true,
				dataType : null,
				cellTemplate : "noteTemplate"
			},			
			{	dataField : "activeTask",
				alignment : null,
				visible : false,
				dataType : null
			},			
		];
	}

	
}