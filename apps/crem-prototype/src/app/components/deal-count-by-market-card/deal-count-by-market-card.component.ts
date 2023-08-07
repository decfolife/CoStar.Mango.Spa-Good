import { Component, OnInit } from '@angular/core';

export class DealCountByMarket {   
	market : String;
	newLease : Number;
	contraction : Number;
	expansion : Number;
	relocation : Number;
	renewal : Number;

		constructor(market, newLease, contraction, expansion, relocation, renewal) {   
		this.market = market;
		this.newLease = newLease;
		this.contraction = contraction;
		this.expansion = expansion;
		this.relocation = relocation;
		this.renewal = renewal;
	}
}

@Component({
	selector: 'deal-count-by-market-card',
	templateUrl: './deal-count-by-market-card.component.html',
	styleUrls: ['./deal-count-by-market-card.component.scss']
})
export class DealCountByMarketCardComponent implements OnInit {

	dealCountByMarket : DealCountByMarket[];

	constructor() { 
		this.dealCountByMarket = [
			new DealCountByMarket("Atlanta", 3, 1, 2, 0, 1),
			new DealCountByMarket("Austin", 3, 0, 2, 0, 1),
			new DealCountByMarket("Boston", 2, 0, 0, 2, 2),
			new DealCountByMarket("Chicago", 2, 0, 0, 1, 2),
			new DealCountByMarket("Dallas", 1, 1, 0, 0, 1),
			new DealCountByMarket("Denver", 1, 0, 0, 0, 1),
			new DealCountByMarket("Houston", 1, 0, 1, 2, 1),
			new DealCountByMarket("Los Angeles", 1, 0, 1, 2, 1),
			new DealCountByMarket("Miami", 1, 0, 1, 2, 1),
			new DealCountByMarket("New York", 1, 0, 1, 2, 1),
			new DealCountByMarket("Pittsburgh", 1, 0, 1, 2, 1),
			new DealCountByMarket("Portland", 1, 1, 1, 2, 1),
			new DealCountByMarket("San Diego", 1, 3, 1, 2, 1),
			new DealCountByMarket("San Francisco", 1, 3, 1, 2, 1),
			new DealCountByMarket("Seattle", 1, 2, 1, 2, 1),
			new DealCountByMarket("Tampa", 1, 0, 1, 2, 1),
			new DealCountByMarket("Washington D.C.", 1, 0, 1, 2, 1),
		];
	}

	ngOnInit() {
	}

	legendClick(e: any) {
        var series = e.target;
        if(series.isVisible()) { 
            series.hide();
        } else {
            series.show();
        }
    }

    standardTooltip(arg: any) {
		// console.log("I should be showing a tooltip!");
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
        console.log(items.join("\n"));
        return { text: items.join("\n") };
    }

}
