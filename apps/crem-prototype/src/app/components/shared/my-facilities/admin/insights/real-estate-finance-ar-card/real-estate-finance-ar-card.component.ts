import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'real-estate-finance-ar-card',
	templateUrl: './real-estate-finance-ar-card.component.html',
	styleUrls: ['./real-estate-finance-ar-card.component.scss'],
	providers: [Service]
})
export class RealEstateFinanceArCardComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Outstanding Revenue', "$21 MM", null, "USD", "The total future revenue to be collected on real estate leases is USD $21,372,456.15.", true),
			new DashboardHero('Revenue Received', "$1.2 MM", "+0.8%", "106 charges", "In 2021 - Q1, USD $1,226,487.50 in AR revenue was received related to real estate leases which is an increase of 0.8% from the USD $1,147,371.67 received in 2020 - Q4.", true),
			new DashboardHero('New AR Events', "23", "-10%", null, "23 new AR events were created on real estate leases in 2021 - Q1, a decrease of 10% over the number of new AR events created in 2020 - Q4.", true),			
		];
	}

}
