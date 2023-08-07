import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'non-real-estate-finance-ap-card',
	templateUrl: './non-real-estate-finance-ap-card.component.html',
	styleUrls: ['./non-real-estate-finance-ap-card.component.scss'],
	providers: [Service]
})
export class NonRealEstateFinanceApCardComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Remaining Obligation', "$256 MM", null, "USD", "The total remaining obligation for non real estate leases is USD $256,872,456.15.", true),
			new DashboardHero('Payments Exported', "$3.2 MM", "+0.5%", "216 charges", "In 2021 - Q1, USD $3,226,487.50 AP payments were exported for non real estate leases which is an increase of 0.5% from the USD $3,147,371.67 exported in 2020 - Q4.", true),
			new DashboardHero('New AP Events', "42", "+1%", null, "176 new 42 events were created on non real estate leases in 2021 - Q1, a decrease of 1% over the number of new AP events created in 2020 - Q4.", true),			
		];
	}

}
