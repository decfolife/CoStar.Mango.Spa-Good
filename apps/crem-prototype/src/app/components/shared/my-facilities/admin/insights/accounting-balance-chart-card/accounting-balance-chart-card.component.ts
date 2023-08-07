import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../../../../../app.service';

export class QuarterlyData {
	quarter : String;
	realEstateAssetBalance : Number;
	nonRealEstateAssetBalance : Number;
	realEstateLiabilityBalance : Number;
	nonRealEstateLiabilityBalance : Number;

	constructor(quarter, realEstateAssetBalance, nonRealEstateAssetBalance, realEstateLiabilityBalance, nonRealEstateLiabilityBalance) {
		this.quarter = quarter;
		this.realEstateAssetBalance = realEstateAssetBalance;
		this.nonRealEstateAssetBalance = nonRealEstateAssetBalance;
		this.realEstateLiabilityBalance = realEstateLiabilityBalance;
		this.nonRealEstateLiabilityBalance = nonRealEstateLiabilityBalance;
	}
}

@Component({
	selector: 'accounting-balance-chart-card',
	templateUrl: './accounting-balance-chart-card.component.html',
	styleUrls: ['./accounting-balance-chart-card.component.scss'],
	providers: [Service]
})
export class AccountingBalanceChartCardComponent implements OnInit {

	quarterlyPayments : QuarterlyData[];	

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.quarterlyPayments = [
			new QuarterlyData("Q1 19", 721231986.61, 281231986.61, 712127985.50, 262127985.50),
			new QuarterlyData("Q2 19", 716231986.61, 271231986.61, 708127985.50, 252127985.50),
			new QuarterlyData("Q3 19", 711231986.61, 261231986.61, 702127985.50, 242127985.50),
			new QuarterlyData("Q4 19", 706231986.61, 251231986.61, 696127985.50, 232127985.50),
			new QuarterlyData("Q1 20", 701231986.61, 241231986.61, 689127985.50, 222127985.50),
			new QuarterlyData("Q2 20", 720231986.61, 291231986.61, 718127985.50, 272127985.50),
			new QuarterlyData("Q3 20", 691231986.61, 271231986.61, 716127985.50, 252127985.50),
			new QuarterlyData("Q4 20", 681231986.61, 251231986.61, 714127985.50, 232127985.50),
			new QuarterlyData("Q1 21", 671231986.61, 231231986.61, 712127985.50, 212127985.50),			
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

