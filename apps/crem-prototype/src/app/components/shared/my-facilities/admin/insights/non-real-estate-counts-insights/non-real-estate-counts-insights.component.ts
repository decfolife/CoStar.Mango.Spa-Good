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
  selector: 'non-real-estate-counts-insights',
  templateUrl: './non-real-estate-counts-insights.component.html',
  styleUrls: ['./non-real-estate-counts-insights.component.scss']
})
export class NonRealEstateCountsInsightsComponent implements OnInit {

  	heros : DashboardHero[];

	constructor() { }

	ngOnInit() {
		this.heros = [
			new DashboardHero('Suppliers', "35", "+2", "N/A (0)", "The portfolio contains 35 active supplier records.  2 new suppliers were created this quarter, a N/A% increase over the 0 suppliers created the prior quarter.", true),
			new DashboardHero('Equipment Leases', "12", "+3", "200% (1)", "The portfolio contains 12 active equipment lease records.  3 new equipment leases were created this quarter, a 200% increase over the 1 equipment lease created the prior quarter.", true),			
		];
	}

}
