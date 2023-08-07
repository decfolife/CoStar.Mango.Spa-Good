import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'customer-support-card',
	templateUrl: './customer-support-card.component.html',
	styleUrls: ['./customer-support-card.component.scss'],
	providers: [Service]
})
export class CustomerSupportCardComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Open Cases', "6", "-10%", null, "The portfolio contains 1,595 active building records.  1 new building was created this quarter, a 0% increase over the 1 building created the prior quarter.", true),
			new DashboardHero('New Cases', "8", "+1.3%", null, "The portfolio contains 1,142 active AP real estate lease records.  6 new AP leases were created this quarter, a 50% increase over the 4 AP leases created the prior quarter.", true),
			new DashboardHero('Cases Closed', "10", "-5%", null, "The portfolio contains 223 active AR real estate lease records.  4 new AR leases were created this quarter, a 100% increase over the 2 AR leases created the prior quarter.", true),						
		];
	}

}
