import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../../../../../app.service';

export class QuarterlyData {
	quarter : String;
	fileCount : Number;
	fileSize : Number;

	constructor(quarter, fileCount, fileSize) {
		this.quarter = quarter;
		this.fileCount = fileCount;
		this.fileSize = fileSize;
	}
}

@Component({
	selector: 'file-usage-chart-card',
	templateUrl: './file-usage-chart-card.component.html',
	styleUrls: ['./file-usage-chart-card.component.scss'],
	providers: [Service]
})
export class FileUsageChartCardComponent implements OnInit {

	quarterlyPayments : QuarterlyData[];	

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.quarterlyPayments = [
			new QuarterlyData("Q1 19", 8336, 10.4),
			new QuarterlyData("Q2 19", 8971, 12.5),
			new QuarterlyData("Q3 19", 10567, 16.8),
			new QuarterlyData("Q4 19", 11870, 24.0),
			new QuarterlyData("Q1 20", 14378, 36.6),
			new QuarterlyData("Q2 20", 15983, 39.9),
			new QuarterlyData("Q3 20", 18767, 44.1),
			new QuarterlyData("Q4 20", 19672, 48.9),
			new QuarterlyData("Q1 21", 20672, 59.8),			
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

