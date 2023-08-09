import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../app.service';
import { DxChartComponent } from "devextreme-angular";

export class AnnualExpirationValue {
	year : String;
	expirationValue : Number;
	sf : number;
	expCount : number;

	constructor(year, expirationValue, sf, expCount) {
		this.year = year;
		this.expirationValue = expirationValue;
		this.sf = sf;
		this.expCount = expCount;
	}
}

@Component({
	selector: 'annual-expiration-rent-card',
	templateUrl: './annual-expiration-rent-card.component.html',
	styleUrls: ['./annual-expiration-rent-card.component.scss'],
	providers: [ Service ]
})
export class AnnualExpirationRentCardComponent implements OnInit {

	annualExpirationValues : AnnualExpirationValue[];	
	durations : DropdownField;
	@ViewChild("AnnualExpirationRentChart") chart: DxChartComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
		this.durations = new DropdownField([{ value : "2022" }, { value : "2023" }, { value : "2024" }, { value : "2025" }, { value : "2026" }, { value : "2027" }, { value : "2028" }, { value : "2029" }, { value : "2030" }], "value", "value", "Max Year", "dropdown", ["2030"], true, "single", true, false, false);		
	}

	ngOnInit() {
		this.annualExpirationValues = [
			new AnnualExpirationValue("2020", 33600000, 223456, 14),
			new AnnualExpirationValue("2021", 18000000, 123487, 10),
			new AnnualExpirationValue("2022", 12000000, 124596, 8),
			new AnnualExpirationValue("2023", 19200000, 184373, 8),
			new AnnualExpirationValue("2024", 38400000, 432932, 20),
			new AnnualExpirationValue("2025", 9600000, 56976, 4),
			new AnnualExpirationValue("2026", 10800000, 92732, 6),
			new AnnualExpirationValue("2027", 6000000, 12345, 1),
			new AnnualExpirationValue("2028", 33600000, 323947, 16),
			new AnnualExpirationValue("2029", 4800000, 49732, 6),
			new AnnualExpirationValue("2030", 2400000, 29574, 8),
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

	exportChart() {
		this.chart.instance.exportTo('chart', 'png');
	}

}
