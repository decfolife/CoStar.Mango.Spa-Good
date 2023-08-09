import { Component, OnInit } from '@angular/core';
import { Service, DashboardHero } from '../../../../../../app.service';

@Component({
	selector: 'non-real-estate-accounting-card',
	templateUrl: './non-real-estate-accounting-card.component.html',
	styleUrls: ['./non-real-estate-accounting-card.component.scss'],
	providers: [Service]
})
export class NonRealEstateAccountingCardComponent implements OnInit {

  	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('ROU Asset Balance', "$231 MM", null, "USD", "The ROU Asset balance of non real estate assets at the close of 2021 - Q1 was USD $231,231,986.61", true),
			new DashboardHero('Liability Balance', "$212 MM", null, "USD", "The total liability balance of non real estate assets at the close of 2021 - Q1 was USD $212,127,985.50", true),
			new DashboardHero('JEs Processed', "967", null, null, "967 JEs were processed related to non real estate assets in 2021 - Q1", true),						
			new DashboardHero('Remeasurements', "142", "+15%", null, "142 remeasurement events occurred on non real estate assets in 2021 - Q1, an increase of 15% over the number of remeasurements that occurred 2020 - Q4", true),			
			new DashboardHero('New Schedules', "2", "-50%", null, "2 new accounting events occurred on non real estate assets in 2021 - Q1, a decrease of 50% over the number of new accounting events that occurred 2020 - Q4", true),			
		];
	}
}
