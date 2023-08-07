import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'real-estate-finance-ap-card',
	templateUrl: './real-estate-finance-ap-card.component.html',
	styleUrls: ['./real-estate-finance-ap-card.component.scss'],
	providers: [Service]
})
export class RealEstateFinanceApCardComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Remaining Obligation', "$856 MM", null, "USD", "The total remaining obligation for real estate leases is USD $855,872,456.15.", true),
			new DashboardHero('Payments Exported', "$22 MM", "+1.3%", "846 charges", "In 2021 - Q1, USD $22,126,487.50 AP payments were exported for real estate leases which is an increase of 1.3% from the USD $21,547,371.67 exported in 2020 - Q4.", true),
			new DashboardHero('New AP Events', "176", "-5%", null, "176 new AP events were created on real estate leases in 2021 - Q1, a decrease of 5% over the number of new AP events created in 2020 - Q4.", true),			
		];
	}
}
