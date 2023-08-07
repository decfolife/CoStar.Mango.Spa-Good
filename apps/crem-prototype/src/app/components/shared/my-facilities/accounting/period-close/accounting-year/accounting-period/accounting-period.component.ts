import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Service, AccountingMonth } from '../../../../../../../app.service';

@Component({
  selector: 'app-accounting-period',
  templateUrl: './accounting-period.component.html',
  styleUrls: ['./accounting-period.component.scss']
})
export class AccountingPeriodComponent implements OnInit {
	
	periodId : Number;
	period : AccountingMonth;
	status : string;

	portfolio : String;
	accountingStandard : String;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { 	

	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.periodId = params['accounting_period_id']; 
			this.period = this.service.getAccountingMonth(this.periodId);

			this.status = "Status: " + this.period.status
		}); 

		this.route.parent.params.subscribe(params => { 
			this.portfolio = params['portfolio']; 
			this.accountingStandard = params['accounting_standard']; 			
		}); 
	}		

}
