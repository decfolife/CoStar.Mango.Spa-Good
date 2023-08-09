import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'real-estate-accounting-card',
	templateUrl: './real-estate-accounting-card.component.html',
	styleUrls: ['./real-estate-accounting-card.component.scss'],
	providers: [Service]
})
export class RealEstateAccountingCardComponent implements OnInit {

  	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('ROU Asset Balance', "$671 MM", null, "USD", "The ROU Asset balance of real estate assets at the close of 2021 - Q1 was USD $671,231,986.61", true),
			new DashboardHero('Liability Balance', "$712 MM", null, "USD", "The total liability balance of real estate assets at the close of 2021 - Q1 was USD $712,127,985.50", true),
			new DashboardHero('JEs Processed', "1,514", null, null, "1,514 JEs were processed related to real estate assets in 2021 - Q1", true),						
			new DashboardHero('Remeasurements', "81", "-5%", null, "81 remeasurement events occurred on real estate assets in 2021 - Q1, a decrease of 5% over the number of remeasurements that occurred 2020 - Q4", true),			
			new DashboardHero('New Schedules', "24", "-5%", null, "24 new accounting events occurred on real estate assets in 2021 - Q1, a decrease of 5% over the number of new accounting events that occurred 2020 - Q4", true),			
			
		];
	}

}
