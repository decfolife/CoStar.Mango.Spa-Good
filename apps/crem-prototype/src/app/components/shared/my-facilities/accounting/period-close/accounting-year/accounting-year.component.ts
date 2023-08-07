import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AccountingMonth } from '../../../../../../app.service';

@Component({
  selector: 'app-accounting-year',
  templateUrl: './accounting-year.component.html',
  styleUrls: ['./accounting-year.component.scss'],
  providers : [Service]
})
export class AccountingYearComponent implements OnInit {

	periods : AccountingMonth[];
	year : String;
	portfolio : String;
	accountingStandard : String;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { 

	}

	ngOnInit() {
		this.route.params.subscribe(params => { 
			this.year = params['year']; 
			this.portfolio = params['portfolio']; 
			this.accountingStandard = params['accounting_standard']; 

			this.periods = this.service.getAccountingMonths( this.portfolio, this.year ); 
		}); 

		this.router.navigate(["period", 23], { relativeTo: this.route });		
	}

}
