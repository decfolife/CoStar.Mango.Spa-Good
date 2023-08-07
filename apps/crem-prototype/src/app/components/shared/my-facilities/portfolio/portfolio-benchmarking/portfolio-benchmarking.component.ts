import { Component, OnInit } from '@angular/core';
import { Service, DropdownField } from '../../../../../app.service';

export class Benchmark {
    peer: String;
    score: Number;

    constructor(peer,score) {
		this.peer = peer;
		this.score = score;	
	}
}

@Component({
	selector: 'portfolio-benchmarking',
	templateUrl: './portfolio-benchmarking.component.html',
	styleUrls: ['./portfolio-benchmarking.component.scss']
})
export class PortfolioBenchmarkingComponent implements OnInit {

	avgUtilization : Benchmark[];
	avgRentPerSF : Benchmark[];
	avgSFPerSeat : Benchmark[];
	avgRentPerSeat : Benchmark[];
	avgRemainingTerm : Benchmark[];
	avgOriginalTerm : Benchmark[];
	filters : DropdownField[];

	constructor() { }

	ngOnInit() {

		this.filters = [
			new DropdownField([], null, null, "Portfolio", "portfolio", [], null, null, null, null, true),
			new DropdownField([{ value : "Atlanta - GA" }, { value : "Boston - MA" }, { value : "Chicago - IL" }, { value : "Dallas-Fort Worth - TX" }, { value : "Houston - TX" }, { value : "Los Angeles - CA" }, { value : "London - UK" }, { value : "Miami - FL" }, { value : "New York - NY" }], "value", "value", "Market", "dropdown", [], true, "single", true, true, true),	
			new DropdownField([{ value : "Buckhead" }, { value : "Downtown" }, { value : "Midtown" }], "value", "value", "Submarket", "dropdown", [], true, "single", true, true, true),	
			new DropdownField([{ value : "Office" }, { value : "Retail" }, { value : "Warehouse" }], "value", "value", "Property Type", "dropdown", [], true, "single", true, false, true),	
		];

		this.avgUtilization = [
			new Benchmark("CoStar", 62),
			new Benchmark("Peer 1", 82),
			new Benchmark("Peer 2", 96),
			new Benchmark("Peer 3", 78),
			new Benchmark("My Average", 90),
		];

		this.avgRentPerSF = [
			new Benchmark("CoStar", 5),
			new Benchmark("Peer 1", 2),
			new Benchmark("Peer 2", 7),
			new Benchmark("Peer 3", 4),
			new Benchmark("My Average", 12),
		];

		this.avgSFPerSeat = [
			new Benchmark("CoStar", 130),
			new Benchmark("Peer 1", 255),
			new Benchmark("Peer 2", 270),
			new Benchmark("Peer 3", 140),
			new Benchmark("My Average", 250),
		];

		this.avgRentPerSeat = [
			new Benchmark("CoStar", 910),
			new Benchmark("Peer 1", 660),
			new Benchmark("Peer 2", 590),
			new Benchmark("Peer 3", 760),
			new Benchmark("My Average", 500),
		];

		this.avgRemainingTerm = [
			new Benchmark("CoStar", 6),
			new Benchmark("Peer 1", 5),
			new Benchmark("Peer 2", 1),
			new Benchmark("Peer 3", 8),
			new Benchmark("My Average", 7),
		];

		this.avgOriginalTerm = [
			new Benchmark("CoStar", 6),
			new Benchmark("Peer 1", 11),
			new Benchmark("Peer 2", 12),
			new Benchmark("Peer 3", 9),
			new Benchmark("My Average", 15),
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
        console.log(items.join("\n"));
        return { text: items.join("\n") };
    }

    customizePoint(arg: any) {
    	console.log(arg)
        if(arg.argument == "CoStar") {
            return { color: "#13396D", hoverStyle: { color: "#13396D" } };
        } else if(arg.argument == "My Average") {
            return { color: "#225BAD", hoverStyle: { color: "#225BAD" } };
        } else {
        	return { color: "#F68338", hoverStyle: { color: "#F68338" } };
        }
    }

    customizeAxisTextPercentage( info : any ) {
    	return info.valueText + '%';
    }

    customizeAxisTextCurrency( info : any ) {
    	return '$' + info.valueText;
    }

}
