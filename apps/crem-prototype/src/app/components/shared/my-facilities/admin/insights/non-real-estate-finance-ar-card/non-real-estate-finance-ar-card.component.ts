import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'non-real-estate-finance-ar-card',
	templateUrl: './non-real-estate-finance-ar-card.component.html',
	styleUrls: ['./non-real-estate-finance-ar-card.component.scss'],
	providers: [Service]
})
export class NonRealEstateFinanceArCardComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Outstanding Revenue', "$72 K", null, "USD", "The total future revenue to be collected on non real estate leases is USD $72,456.15.", true),
			new DashboardHero('Revenue Received', "$6.5 K", "+0.8%", "3 charges", "In 2021 - Q1, USD $6,487.50 in AR revenue was received related to non real estate leases which is an increase of 0.8% from the USD $6,371.67 received in 2020 - Q4.", true),
			new DashboardHero('New AR Events', "0", "N/A", null, "0 new AR events were created on non real estate leases in 2021 - Q1, a N/A% increase over the number of new AR events created in 2020 - Q4.", true),			
		];
	}
}
