import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Building, Lease, Project } from '../../../app.service';

@Component({
	selector: 'search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

	buildings : Building[];
	buildingColumns : Array<any>;
	buildingRowClickRoute : String;
	buildingKeyField : string;

	leases : Lease[];
	leaseColumns : Array<any>;
	leaseRowClickRoute : String;
	leaseKeyField : string;

	projects : Project[];
	projectColumns : Array<any>;
	projectRowClickRoute : String;
	projectKeyField : string;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {

		this.buildings = this.service.getBuildings();
		this.buildingKeyField = "systemBuildingID";
		this.buildingRowClickRoute = "../portfolio/property";
		this.buildingColumns = [
			{ dataField : "systemBuildingID",
				alignment : "left",
				visible : true,
				dataType : "number"
			},
			{ dataField : "buildingName",
				alignment : null,
				visible : true,
				dataType : null
			},      
			{ dataField : "address1",
				alignment : null,
				visible : true,
				dataType : null
			},
			{ dataField : "city",
				alignment : null,
				visible : true,
				dataType : null
			},
			{ dataField : "state",
				alignment : null,
				visible : true,
				dataType : null
			},
			{ dataField : "zipCode",
				alignment : null,
				visible : true,
				dataType : null
			},
			{ dataField : "country",
				alignment : null,
				visible : true,
				dataType : null
			},
			{ dataField : "buildingRentableArea",
				alignment : "right",
				visible : true,
				dataType : "number",
				precision: 0
			},
			{ dataField : "buildingType",
				alignment : null,
				visible : true,
				dataType : null
			},
			{ dataField : "ownershipType",
				alignment : null,
				visible : true,
				dataType : null
			},      
		];

		this.leases = this.service.getLeases();
		this.leaseKeyField = "SystemLeaseID";
		this.leaseRowClickRoute = "../portfolio/lease";
		this.leaseColumns = [
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

		this.projects = this.service.getProjects();
		this.projectKeyField = "id";
		this.projectRowClickRoute = "../projects/project";
		this.projectColumns = [
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

	navigateToBuilding(event) {
		if (this.buildingRowClickRoute) {
			this.router.navigate([this.buildingRowClickRoute, event.data[this.buildingKeyField]], {relativeTo: this.route } );	
		}
	} 

	navigateToLease(event) {
		if (this.buildingRowClickRoute) {
			this.router.navigate([this.leaseRowClickRoute, event.data[this.leaseKeyField]], {relativeTo: this.route } );	
		}
	} 

	navigateToProject(event) {
		if (this.buildingRowClickRoute) {
			this.router.navigate([this.projectRowClickRoute, event.data[this.projectKeyField]], {relativeTo: this.route } );	
		}
	} 

}
