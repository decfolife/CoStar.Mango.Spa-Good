import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AmortizationProfile, ListPageQuery } from '../../../../../../app.service';

@Component({
  selector: 'amortization-profile-list',
  templateUrl: './amortization-profile-list.component.html',
  styleUrls: ['./amortization-profile-list.component.scss'],
  providers: [Service]
})
export class AmortizationProfileListComponent implements OnInit {

	amortizationProfiles : AmortizationProfile[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.amortizationProfiles = this.service.getAmortizationProfiles();
		this.rowClickRoute = '../../amzprofiles';
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Amortization Profile" },			
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
			{	dataField : "portfolio",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "comments",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "reasonablyCertainOptions",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "isActive",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "inUse",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "activeScheduleCount",
				alignment : null,
				visible : true,
				dataType : null
			},		
		];
	}

	
}