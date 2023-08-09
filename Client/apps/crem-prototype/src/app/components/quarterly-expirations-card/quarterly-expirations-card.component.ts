import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../app.service';
import { DxChartComponent } from "devextreme-angular";

export class ExpirationData {
    quarter: string;
    sf : number;
    totalAnnualRent: number;  
	expCount : number;  

    constructor(quarter,sf,totalAnnualRent,expCount) {
		this.quarter = quarter;
		this.sf = sf;
		this.totalAnnualRent = totalAnnualRent;			
		this.expCount = expCount;
	}
}

@Component({
	selector: 'quarterly-expirations-card',
	templateUrl: './quarterly-expirations-card.component.html',
	styleUrls: ['./quarterly-expirations-card.component.scss'],
	providers: [ Service ]
})
export class QuarterlyExpirationsCardComponent implements OnInit {

	leaseExpirations : ExpirationData[];
	@ViewChild("ExpirationsHistogram") chart: DxChartComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.leaseExpirations = [
			new ExpirationData("Q3 21", 50673, 1250743, 8),
			new ExpirationData("Q4 21", 45770, 1440009, 8),
			new ExpirationData("Q1 22", 25984, 1196149, 9),
			new ExpirationData("Q2 22", 54640, 623186, 5),
			new ExpirationData("Q3 22", 5680, 152852, 2),
			new ExpirationData("Q4 22", 4362, 157691, 2),
			new ExpirationData("Q1 23", 34354, 1030380, 4),
			new ExpirationData("Q2 23", 55774, 2169725, 4),
			new ExpirationData("Q3 23", 27329, 359016, 3),
			new ExpirationData("Q4 23", 3104, 46537, 1),			
			new ExpirationData("Q1 24", 24610, 986237, 2),
			new ExpirationData("Q2 24", 9746, 184625, 1),			
		];
	}

	standardTooltip(arg: any) {	
		console.log(arg);
        var items = arg.valueText.split("\n"),
            color = arg.point.getColor();
			console.log(items);
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

	exportChart() {
		this.chart.instance.exportTo('chart', 'png');
	}

}