import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Portfolio, ListPageQuery } from '../../../../../app.service';

@Component({
	selector: 'app-portfolios',
	templateUrl: './portfolios.component.html',
	styleUrls: ['./portfolios.component.scss'],
	providers: [Service]
})
export class PortfoliosComponent implements OnInit {

	portfolios : Portfolio[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.portfolios = this.service.getPortfolios();
		this.rowClickRoute = '../../portfolio';
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Portfolio" },			
		];
		this.columns = [
			{	dataField : "id",
				alignment : "left",
				caption : "ID",
				visible : true,
				dataType : "number"
			},
			{	dataField : "name",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "status",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "propertyCount",
				alignment : null,
				visible : true,
				dataType : "number"
			},
			{	dataField : "leaseCount",
				alignment : null,
				visible : true,
				dataType : "number"
			},
			{	dataField : "projectCount",
				alignment : null,
				visible : true,
				dataType : "number"
			},
			{	dataField : "lastModified",
				alignment : null,
				visible : true,
				dataType : null
			},		
		];
	}

	
}