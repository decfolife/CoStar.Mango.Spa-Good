import { Component, OnInit } from '@angular/core';

export class DashboardHero {    
    title: string;
    hero : string;
    sidekick : string;
    subtitle : string;
    helpText : string;
    visible : boolean;

    constructor(title,hero,sidekick,subtitle,helpText,visible) {		
		this.title = title;	
		this.hero = hero;
		this.sidekick = sidekick;
		this.subtitle = subtitle;
		this.helpText = helpText;
		this.visible = visible;
	}
}

@Component({
	selector: 'real-estate-counts-insights',
	templateUrl: './real-estate-counts-insights.component.html',
	styleUrls: ['./real-estate-counts-insights.component.scss']
})
export class RealEstateCountsInsightsComponent implements OnInit {

	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Buildings', "1,595", "+1", "0% (1)", "The portfolio contains 1,595 active building records.  1 new building was created this quarter, a 0% increase over the 1 building created the prior quarter.", true),
			new DashboardHero('AP Leases', "1,142", "+6", "50% (4)", "The portfolio contains 1,142 active AP real estate lease records.  6 new AP leases were created this quarter, a 50% increase over the 4 AP leases created the prior quarter.", true),
			new DashboardHero('AR Leases', "223", "+4", "100% (2)", "The portfolio contains 223 active AR real estate lease records.  4 new AR leases were created this quarter, a 100% increase over the 2 AR leases created the prior quarter.", true),			
		];
	}

}
