import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Service, AccountingMonth, DropdownField } from '../../../../../app.service';

@Component({
  selector: 'app-accounting-dashboard',
  templateUrl: './period-close.component.html',
  styleUrls: ['./period-close.component.scss'],
  providers : [Service]
})
export class PeriodCloseComponent implements OnInit {

	calendar : string;
	portfolio : string;
	year : string;
	accountingStandard : string;
	filters : DropdownField[];
	addSchedulePopupVisible : Boolean = false;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute) {

		this.filters = [
			new DropdownField([{ value : "Standard Calendar" }, { value : "Custom Calendar" }], "value", "value", "Calendar", "dropdown", ["Standard Calendar"], true, "single", true, false, true),
			new DropdownField([], null, null, "Portfolio", "portfolio", [], true, null, true, false, true),
			new DropdownField([{ value : "FASB ASC 840" }, { value : "FASB ASC 842" }, { value : "IFRS 16" }], "value", "value", "Accounting Standard", "dropdown", [], true, "single", true, false, true),
			new DropdownField([{ value : "2021" }, { value : "2020" }, { value : "2019" }, { value : "2018" }, { value : "2017" }], "value", "value", "Year", "dropdown", [], true, "single", true, false, true),
		];
	}

	ngOnInit() {
		this.portfolio = "RE Portfolio";
		this.calendar = "Standard Calendar";
		this.accountingStandard = "FASB ASC 842";
		this.year = "2020";
		this.getPeriods();
	}

  	getPeriods() {
  		let routeString = '../period-close/' + this.portfolio + '/' + this.year.toString() + '/' + this.accountingStandard;
		this.router.navigate([routeString], { relativeTo: this.route });
  	}

  	launchAddSchedulePopup() {
  		this.addSchedulePopupVisible = true;
  	}

  	closeAddSchedulePopup() {
  		this.addSchedulePopupVisible = false;
  	}

}
