import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AccountingSchedule, ListPageQuery } from '../../../../../app.service';

@Component({
  selector: 'app-accounting-schedules',
  templateUrl: './accounting-schedules.component.html',
  styleUrls: ['./accounting-schedules.component.scss'],
  providers : [Service]
})
export class AccountingSchedulesComponent implements OnInit {

	schedules : AccountingSchedule[];
	columns : Array<any>;
	queries : ListPageQuery[];
	rowClickRoute : String;
	addWizards : Array<any>;
	keyFields : String[];
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.schedules = this.service.getAccountingSchedules();
		this.queries = this.service.getListPageQueriesByObjectType('accounting');	
		this.keyFields = ["leaseID", "id"];
		this.rowClickRoute = '../../portfolio/lease/%%_leaseID_%%/accounting/schedules/schedule/%%_id_%%';
		this.addWizards = [
			{	name : "Accounting Schedule" },			
		];
		this.columns = [
			{	dataField : "leaseID",
				alignment : "left",
				visible : true,
				dataType : "number"
			},
			{	dataField : "clientLeaseID",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "buildingName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "address1",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "measureEvent",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "classification",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "amortizationProfile",
				alignment : null,
				visible : true,
				dataType : null
			},
			
			{	dataField : "periodFrom",
				alignment : "center",
				visible : true,
				dataType : "date"
			},
			{	dataField : "status",
				alignment : null,
				visible : true,
				dataType : null
			},			
			{	dataField : "workflowStatus",
				alignment : null,
				visible : true,
				dataType : null
			},			
		];
	}

	
}