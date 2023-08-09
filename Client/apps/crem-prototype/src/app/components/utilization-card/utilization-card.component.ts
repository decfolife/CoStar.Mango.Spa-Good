import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../app.service';

export class Utilization {
    year: string;
    utilization: number;

    constructor(year,utilization) {
		this.year = year;
		this.utilization = utilization;	
	}
}

@Component({
	selector: 'utilization-card',
	templateUrl: './utilization-card.component.html',
	styleUrls: ['./utilization-card.component.scss'],
	providers: [ Service ]
})
export class UtilizationCardComponent implements OnInit {

	utilizations : Utilization[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.utilizations = [
			new Utilization("2015", 70.8),
			new Utilization("2016", 75.6),
			new Utilization("2017", 72.4),
			new Utilization("2018", 76.4),
			new Utilization("2019", 74.2),
			new Utilization("2020", 79.1),
		];
	}

	standardTooltip(arg: any) {		
        var items = arg.valueText.split("\n"),
            color = arg.point.getColor();
        items.forEach(function(item, index) {
            if(item.indexOf(arg.seriesName) === 0) {
                var element = document.createElement("span");

                element.textContent = item + '%';
                element.style.color = color;
                element.className = "active";

                items[index] = element.outerHTML;
            }
        });

        return { text: items.join("\n") };
    }

    customizePoint(arg: any) {
        if(arg.argument == "2020") {
            return { color: "#225BAD", hoverStyle: { color: "#225BAD" } };
        } else {
        	return { color: "#F68338", hoverStyle: { color: "#F68338" } };
        }
    }

}
