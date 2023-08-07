import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'active-users-card',
	templateUrl: './active-users-card.component.html',
	styleUrls: ['./active-users-card.component.scss'],
	providers: [Service]
})
export class ActiveUsersCardComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Daily Active Users', "56", "-8.1%", null, "The portfolio contains 1,595 active building records.  1 new building was created this quarter, a 0% increase over the 1 building created the prior quarter.", true),
			new DashboardHero('Weekly Active Users', "141", "+1.3%", null, "The portfolio contains 1,142 active AP real estate lease records.  6 new AP leases were created this quarter, a 50% increase over the 4 AP leases created the prior quarter.", true),
			new DashboardHero('Monthly Active Users', "168", "-5%", null, "The portfolio contains 223 active AR real estate lease records.  4 new AR leases were created this quarter, a 100% increase over the 2 AR leases created the prior quarter.", true),						
		];
	}
}
