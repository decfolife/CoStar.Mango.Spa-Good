import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DiscountRateProfile, ListPageQuery } from '../../../../../../app.service';

@Component({
  selector: 'app-discount-rate-profile-list',
  templateUrl: './discount-rate-profile-list.component.html',
  styleUrls: ['./discount-rate-profile-list.component.scss'],
  providers: [Service]
})
export class DiscountRateProfileListComponent implements OnInit {

	profiles : DiscountRateProfile[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.profiles = this.service.getDiscountRateProfiles();
		this.rowClickRoute = '../../discountrate';
		this.keyFields = ["id"];
		this.addWizards = [
			{	name : "Discount Rate Profile" },			
		];
		this.columns = [
			{	dataField : "profileName",
				alignment : null,
				visible : true,
				dataType : null,
				caption: "Name",
				fixed : false,
				allowEditing : false
			},	
			{	dataField : "profileAlias",
				alignment : null,
				visible : true,
				dataType : null,
				caption: "Alias"
			},
			{	dataField : "currency",
				alignment : "center",
				visible : true,
				dataType : null
			},
			{	dataField : "country",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "accountingTermMinMonths",
				alignment : "right",
				visible : true,
				dataType : "Number",
				caption : "Min Months",
			},
			{	dataField : "accountingTermMaxMonths",
				alignment : "right",
				visible : true,
				dataType : null,
				caption : "Max Months",
			},
			{	dataField : "effectiveDate",
				alignment : "center",
				visible : true,
				dataType : "date"
			},	
			{	dataField : "discountRate",
				alignment : "right",
				visible : true,
				dataType : null
			},
			{	dataField : "annualRateType",
				alignment : "center",
				visible : true,
				dataType : null
			},
			{	dataField : "inUse",
				alignment : "center",
				visible : true,
				dataType : "Boolean",
				caption: "In Use"
			},
			{	dataField : "accountingSchedules",
				alignment : "right",
				visible : true,
				dataType : null
			},
			{	dataField : "modifiedBy",
				alignment : null,
				visible : false,
				dataType : null,
			},
			{	dataField : "id",
				alignment : "left",
				caption : "System Profile ID",
				visible : false,
				dataType : "number"
			},				
			{	dataField : "portfolio",
				alignment : null,
				visible : false,
				dataType : null
			},	
			{	dataField : "createdBy",
				alignment : null,
				visible : false,
				dataType : null
			},	
			{	dataField : "isActive",
				alignment : null,
				visible : false,
				dataType : null,
				caption : "Active"
			},	
			{	dataField : "sourceImportId",
				alignment : null,
				visible : false,
				dataType : null,
				caption : "Source Import ID"
			},													
			
		];
	}

	
}