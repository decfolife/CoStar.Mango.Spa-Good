import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'portfolio-leases',
	templateUrl: './portfolio-leases.component.html',
	styleUrls: ['./portfolio-leases.component.scss'],
	providers: [Service]
})
export class PortfolioLeasesComponent implements OnInit {

	leases : Lease[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.leases = this.service.getLeases();	
		this.queries = this.service.getListPageQueriesByObjectType('lease');	
		this.rowClickRoute = '../../lease';	
		this.keyFields = ["SystemLeaseID"];
		this.addWizards = [
			{	name : "Building" },
			{	name : "Equipment Lease" },
			{	name : "Lease" },			
			{	name : "Supplier" },
		];
		this.columns = [
			{	dataField : "SystemLeaseID",
				alignment : "left",
				visible : true,
				dataType : "number"
			},
			{	dataField : "ClientLeaseId",
				alignment : null,
				visible : false,
				dataType : null
			},
			{	dataField : "PropertyName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "Address1",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "City",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "State",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "ZipCode",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "LeaseCommencement",
				alignment : "center",
				visible : true,
				dataType : "date"
			},
			{	dataField : "LeaseExpiration",
				alignment : "center",
				visible : true,
				dataType : "date"
			},
			{	dataField : "RentableArea",
				alignment : "right",
				visible : true,
				dataType : "number",
				precision: 0
			},
			{	dataField : "AccountType",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "TenantLegalName",
				alignment : null,
				visible : false,
				dataType : null
			},
			{	dataField : "CurrentTerm",
				alignment : null,
				visible : false,
				dataType : null
			},
			{	dataField : "LeaseStatus",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "LeaseType",
				alignment : null,
				visible : false,
				dataType : null
			},
			{	dataField : "Currency",
				alignment : null,
				visible : false,
				dataType : null
			},
		];
	}
}