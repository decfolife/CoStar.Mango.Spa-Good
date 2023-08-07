import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Vendor, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'companies-list',
	templateUrl: './companies-list.component.html',
	styleUrls: ['./companies-list.component.scss'],
	providers : [Service]
})
export class CompaniesListComponent implements OnInit {

	companies : Vendor[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.companies = this.service.getVendors();
		this.queries = this.service.getListPageQueriesByObjectType('company');	
		this.rowClickRoute = '../../company';
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Company" },			
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				visible : true,
				dataType : "number"
			},
			{	dataField : "name",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "code",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "addressCode",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "address1",
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
			
			{	dataField : "zip",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "country",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "phone",
				alignment : null,
				visible : true,
				dataType : null
			},			
		];
	}


}
