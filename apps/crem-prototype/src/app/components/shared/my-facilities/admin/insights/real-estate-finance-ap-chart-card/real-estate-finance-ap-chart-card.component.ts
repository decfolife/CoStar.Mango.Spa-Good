import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../../../../../app.service';

export class QuarterlyData {
	quarter : String;
	realEstate : Number;
	nonRealEstate : Number;

	constructor(quarter, realEstate, nonRealEstate) {
		this.quarter = quarter;
		this.realEstate = realEstate;
		this.nonRealEstate = nonRealEstate;
	}
}

@Component({
	selector: 'real-estate-finance-ap-chart-card',
	templateUrl: './real-estate-finance-ap-chart-card.component.html',
	styleUrls: ['./real-estate-finance-ap-chart-card.component.scss'],
	providers: [Service]
})
export class RealEstateFinanceApChartCardComponent implements OnInit {

	quarterlyPayments : QuarterlyData[];	

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.quarterlyPayments = [
			new QuarterlyData("Q1 19", 15932432.21, 1894349.51),
			new QuarterlyData("Q2 19", 16937467.50, 2058643.74),
			new QuarterlyData("Q3 19", 18723403.34, 2503945.76),
			new QuarterlyData("Q4 19", 18736432.76, 2503453.84),
			new QuarterlyData("Q1 20", 19923982.46, 2723409.98),
			new QuarterlyData("Q2 20", 19473834.98, 3012344.75),
			new QuarterlyData("Q3 20", 21635230.50, 3184834.82),
			new QuarterlyData("Q4 20", 21547371.67, 3147371.67),
			new QuarterlyData("Q1 21", 22126487.50, 3226487.50),			
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
