import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../../../../../app.service';

export class QuarterlyData {
	quarter : String;
	realEstateNewSchedules : Number;
	nonRealEstateNewSchedules : Number;
	realEstateRemeasures : Number;
	nonRealEstateRemeasures : Number;

	constructor(quarter, realEstateNewSchedules, nonRealEstateNewSchedules, realEstateRemeasures, nonRealEstateRemeasures) {
		this.quarter = quarter;
		this.realEstateNewSchedules = realEstateNewSchedules;
		this.nonRealEstateNewSchedules = nonRealEstateNewSchedules;
		this.realEstateRemeasures = realEstateRemeasures;
		this.nonRealEstateRemeasures = nonRealEstateRemeasures;
	}
}

@Component({
	selector: 'accounting-event-chart-card',
	templateUrl: './accounting-event-chart-card.component.html',
	styleUrls: ['./accounting-event-chart-card.component.scss'],
	providers: [Service]
})
export class AccountingEventChartCardComponent implements OnInit {

	quarterlyPayments : QuarterlyData[];	

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.quarterlyPayments = [
			new QuarterlyData("Q1 19", 28, 33, 16, 75),
			new QuarterlyData("Q2 19", 18, 23, 42, 91),
			new QuarterlyData("Q3 19", 10, 12, 26, 41),
			new QuarterlyData("Q4 19", 6, 18, 14, 81),
			new QuarterlyData("Q1 20", 8, 10, 10, 61),
			new QuarterlyData("Q2 20", 40, 60, 31, 40),
			new QuarterlyData("Q3 20", 4, 10, 27, 50),
			new QuarterlyData("Q4 20", 10, 8, 40, 100),
			new QuarterlyData("Q1 21", 24, 2, 81, 142),			
		];
	}

	standardTooltip(arg: any) {		
        var items = arg.valueText.split("\n"),
            color = arg.point.getColor();            
        items.forEach(function(item, index) {
            if(item.indexOf(arg.seriesName) === 0) {
                var element = document.createElement("span");

                element.textContent = item;
                element.style.color = color;
                element.className = "active";

                items[index] = element.outerHTML;
            }
        });

        return { text: items.join("\n") };
    }

}

