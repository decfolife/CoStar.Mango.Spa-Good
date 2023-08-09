import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../app.service';

@Component({
	selector: 'non-real-estate-finance-insights',
	templateUrl: './non-real-estate-finance-insights.component.html',
	styleUrls: ['./non-real-estate-finance-insights.component.scss'],
	providers: [Service]
})
export class NonRealEstateFinanceInsightsComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Outstanding Revenue', "$43 MM", null, "USD", "The portfolio contains 1,595 active building records.  1 new building was created this quarter, a 0% increase over the 1 building created the prior quarter.", true),
			new DashboardHero('Revenue Received', "$1.2 MM", "+0.8%", "106 charges", "The portfolio contains 1,142 active AP real estate lease records.  6 new AP leases were created this quarter, a 50% increase over the 4 AP leases created the prior quarter.", true),
			new DashboardHero('Revenue Added', "23", "-10%", null, "The portfolio contains 223 active AR real estate lease records.  4 new AR leases were created this quarter, a 100% increase over the 2 AR leases created the prior quarter.", true),			
		];
	}

}
