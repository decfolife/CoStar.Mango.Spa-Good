import { Component, OnInit } from '@angular/core';

export class DealCountByStage {   
    stage : String;
    newLease : Number;
	contraction : Number;
	expansion : Number;
	relocation : Number;
	renewal : Number;

    constructor(stage, newLease, contraction, expansion, relocation, renewal) {		
		this.stage = stage;
		this.newLease = newLease;
		this.contraction = contraction;
		this.expansion = expansion;
		this.relocation = relocation;
		this.renewal = renewal;
	}
}

@Component({
	selector: 'deal-count-chart-card',
	templateUrl: './deal-count-chart-card.component.html',
	styleUrls: ['./deal-count-chart-card.component.scss']
})
export class DealCountChartCardComponent implements OnInit {

	dealCountByStage : DealCountByStage[];

	constructor() { 
		this.dealCountByStage = [
			new DealCountByStage("RFI", 3, 1, 2, 0, 1),
			new DealCountByStage("Tour", 2, 0, 0, 2, 2),
			new DealCountByStage("Proposal", 2, 2, 0, 1, 2),
			new DealCountByStage("LOI", 1, 2, 0, 0, 1),
			new DealCountByStage("Lease", 1, 3, 1, 2, 1),
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
