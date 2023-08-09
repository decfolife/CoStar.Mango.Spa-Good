import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Report, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'system-reports',
	templateUrl: './system-reports.component.html',
	styleUrls: ['./system-reports.component.scss'],
	providers: [Service]
})
export class SystemReportsComponent implements OnInit {

	reports : Report[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.reports = this.service.getReportsByType("system");	
		this.queries = this.service.getListPageQueriesByObjectType('report');	
		this.rowClickRoute = '../..';	
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Report" },			
		];
		this.columns = [
			{	dataField : "name",
				alignment : "left",
				visible : true,
				dataType : "string"
			},
			{	dataField : "description",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "type",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "access",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "datasetName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "isScheduled",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "createdBy",
				alignment : null,
				visible : true,
				dataType : null
			},			
		];
	}
}