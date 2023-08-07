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
	selector: 'real-estate-finance-ar-chart-card',
	templateUrl: './real-estate-finance-ar-chart-card.component.html',
	styleUrls: ['./real-estate-finance-ar-chart-card.component.scss'],
	providers: [Service]
})
export class RealEstateFinanceArChartCardComponent implements OnInit {

	quarterlyPayments : QuarterlyData[];	

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.quarterlyPayments = [
			new QuarterlyData("Q1 19", 1134371.67, 2371.67),
			new QuarterlyData("Q2 19", 1147371.67, 2371.67),
			new QuarterlyData("Q3 19", 1187371.67, 3371.67),
			new QuarterlyData("Q4 19", 1207371.67, 5371.67),
			new QuarterlyData("Q1 20", 1197371.67, 5371.67),
			new QuarterlyData("Q2 20", 1177371.67, 4371.67),
			new QuarterlyData("Q3 20", 1142371.67, 5371.67),
			new QuarterlyData("Q4 20", 1147371.67, 6371.67),
			new QuarterlyData("Q1 21", 1226487.50, 6487.50),			
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