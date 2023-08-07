import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, EquipmentLease, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'portfolio-equipment',
	templateUrl: './portfolio-equipment.component.html',
	styleUrls: ['./portfolio-equipment.component.scss'],
	providers: [Service]
})
export class PortfolioEquipmentComponent implements OnInit {

	leases : EquipmentLease[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.leases = this.service.getEquipmentLeases();
		this.queries = this.service.getListPageQueriesByObjectType('equipment');	
		this.rowClickRoute = '../../equipment';	
		this.keyFields = ["SystemLeaseID"];
		this.addWizards = [
			{	name : "Equipment Lease" },
			{	name : "Supplier" },
		];
		this.columns = [
			{	dataField : "SystemLeaseID",
				alignment : "left",
				visible : true,
				dataType : "number",			
				caption : "System Lease ID"
			},
			{	dataField : "SupplierName",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "LegalEntity",
				alignment : null,
				visible : true,
				dataType : null
			},		
			{	dataField : "EquipmentLeaseType",
				alignment : null,
				visible : true,
				dataType : null
			},			
		];
	}
}
