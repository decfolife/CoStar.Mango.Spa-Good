import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Supplier, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'portfolio-suppliers',
	templateUrl: './portfolio-suppliers.component.html',
	styleUrls: ['./portfolio-suppliers.component.scss'],
	providers: [Service]
})
export class PortfolioSuppliersComponent implements OnInit {

	suppliers : Supplier[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.suppliers = this.service.getSuppliers();
		this.queries = this.service.getListPageQueriesByObjectType('supplier');	
		this.rowClickRoute = '../../supplier';	
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Equipment Lease" },
			{	name : "Supplier" },
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				visible : true,
				dataType : "number",			
				caption : "Supplier ID"
			},
			{	dataField : "supplierName",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "portfolio",
				alignment : null,
				visible : true,
				dataType : null
			},			
		];
	}

}
