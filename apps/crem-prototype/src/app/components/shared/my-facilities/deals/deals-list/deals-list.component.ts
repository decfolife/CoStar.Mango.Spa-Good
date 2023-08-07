import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Deal, ListPageQuery } from '../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

let getOrderDay = function (rowData: any): number {
    return (new Date(rowData.LeaseExpiration)).getDay();
};

@Component({
	selector: 'deals-list',
	templateUrl: './deals-list.component.html',
	styleUrls: ['./deals-list.component.scss'],
	providers: [Service]
})
export class DealsListComponent implements OnInit {

  	deals : Deal[];
 	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];

 	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.deals = this.service.getDeals();	
		this.queries = this.service.getListPageQueriesByObjectType('deal');	
		this.rowClickRoute = '../../deal';	
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Deal" },			
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				visible : true,
				dataType : "number",
				caption : "System Deal ID"
			},
			{	dataField : "dealName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "dealType",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "dealStage",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "brokerage",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "tenantBroker",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "totalLeaseValue",
				alignment : "right",
				visible : true,
				dataType : "currency",
				precision : 0
			},
			{	dataField : "targetCommencementDate",
				alignment : "center",
				visible : true,
				dataType : "date"
			},
			{	dataField : "targetMaxSF",
				alignment : "right",
				visible : true,
				dataType : "number",
				precision : 0,
				caption : "Total RSF"
			},
			
		];
	}

}