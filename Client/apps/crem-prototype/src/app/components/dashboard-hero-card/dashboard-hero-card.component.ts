import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'dashboard-hero-card',
	templateUrl: './dashboard-hero-card.component.html',
	styleUrls: ['./dashboard-hero-card.component.scss']
})
export class DashboardHeroCardComponent implements OnInit {

	@Input() title : String;
	@Input() subtitle : String;
	@Input() heroMetric : String;
	@Input() sidekickMetricA : String;
	@Input() sidekickMetricAStyle : String;
	@Input() sidekickMetricB : String;
	@Input() sidekickMetricBStyle : String;
	@Input() tooltip : String = null;
	@Input() hasLeftBorder : Boolean = false;
	@Input() hasRightBorder : Boolean = true;

	id : string;
	popoverVisible : Boolean = false;
	popoverTarget : string;

	constructor() { }

	ngOnInit() {
		this.id = "hero" + this.title.replace(/\s/g, '').replace(/\//g, '');
		this.popoverTarget = "#" + this.id;

	}

	toggleTooltip() {
        this.popoverVisible = !this.popoverVisible;
    }

}
