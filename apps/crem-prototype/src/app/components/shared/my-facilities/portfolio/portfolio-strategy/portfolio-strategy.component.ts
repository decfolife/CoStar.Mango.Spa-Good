import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../../../../app.service';
import { PercentPipe } from '@angular/common';


export class BuildingStrategy {
	id : Number;
	building : String;
	submarket : String;
	type : String;
	expDate : String;
	rentableArea : String;
	rentPerSf : String;
	avgSubmarketRent : String;
	rentVsMarket : String;
	sfPerSeat : String;
	annualRent : Number;
	utilization : String;
	strategy : String;
	budgetedCapital : Number;
	lastUpdated : String;
	dealStatus : String;
	projectStatus : String;
	city : String;
	state : String;

	constructor(id, building, submarket, type, expDate, rentableArea, rentPerSf, avgSubmarketRent, rentVsMarket, sfPerSeat, annualRent, utilization, strategy, budgetedCapital, lastUpdated, dealStatus, projectStatus, city, state) {
  		this.id = id;
  		this.building = building;
		this.submarket = submarket;
		this.type = type;
		this.expDate = expDate;
		this.rentableArea = rentableArea;
		this.rentPerSf = rentPerSf;		
		this.avgSubmarketRent = avgSubmarketRent;
		this.rentVsMarket = rentVsMarket;
		this.sfPerSeat = sfPerSeat;
		this.annualRent = annualRent;
		this.utilization = utilization;
		this.strategy = strategy;
		this.budgetedCapital = budgetedCapital;
		this.lastUpdated = lastUpdated;
		this.dealStatus = dealStatus;
		this.projectStatus = projectStatus;
		this.city = city;
		this.state = state;
  	}
}

export class Strategy {
	strategy : String;
	val : Number;
	sf : Number;
	pctOfTotal : Number;
	annualRent : Number;
	budgetedCapital : Number;

	constructor(strategy, val, sf, pctOfTotal, annualRent, budgetedCapital) {
		this.strategy = strategy;
		this.val = val;
		this.sf = sf;
		this.pctOfTotal = pctOfTotal;
		this.annualRent = annualRent;
		this.budgetedCapital = budgetedCapital;
	}
}

@Component({
	selector: 'portfolio-strategy',
	templateUrl: './portfolio-strategy.component.html',
	styleUrls: ['./portfolio-strategy.component.scss']
})
export class PortfolioStrategyComponent implements OnInit {	

	pipe = new PercentPipe("en-US");

	buildingStrategies : BuildingStrategy[];
	outdatedStrategies : BuildingStrategy[];
	strategies : Strategy[];
	strategyList : String[];
	filters : DropdownField[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.filters = [
			new DropdownField([], null, null, "Portfolio", "portfolio", [], true, null, true, false, true),
			new DropdownField([], null, null, "Hierarchy", "hierarchy", [], true, null, null, null, true),
			new DropdownField([{ value : "Office" }, { value : "Retail" }, { value : "Warehouse" }], "value", "value", "Space Type", "dropdown", [], true, "single", true, false, true),	
		];

		this.buildingStrategies = [			
			new BuildingStrategy(2844, "3000 Town Center", "CBD Submarket", "Office", "5/31/2020", "4815", "20.53", "$35.00fs", "47%", "192", 12345, "89%", "No Change", 0, "2020-06-01", "Complete", "Complete", "Southfield", "MI"),
			new BuildingStrategy(2920, "1215 E. Market Street", "CBD Submarket", "Office", "6/30/2020", "4400", "12.87", "$35.00fs", "47%", "192", 12345, "89%", "Renew", 25000, "2020-06-01", "Active", "N/A", "Charlottesville", "VA"),			
			new BuildingStrategy(2907, "14205 SE 36th Street", "CBD Submarket", "Office", "7/31/2020", "2951", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Renew", 10000, "2020-06-01", "Active", "N/A", "Bellevue", "WA"),
			new BuildingStrategy(2817, "717 Green valley Road", "CBD Submarket", "Office", "8/31/2020", "250", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Relocate", 80000, "2020-06-01", "Complete", "Active", "Greensboro", "NC"),
			new BuildingStrategy(686, "3161 Michelson Drive", "CBD Submarket", "Office", "8/31/2020", "16880", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Sublease", 10000, "2020-06-01", "Active", "N/A", "Irvine", "CA"),
			new BuildingStrategy(692, "10200 Forest Green Blvd", "CBD Submarket", "Office", "9/30/2020", "250", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Extend", 0, "2020-06-01", "", "", "Louisville", "KY"),
			new BuildingStrategy(2828, "424 Church Street", "CBD Submarket", "Office", "9/30/2020", "3374", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Renew", 5000, "2020-06-01", "", "", "Nashville", "TN"),
			new BuildingStrategy(2864, "885 West Georgia Street", "CBD Submarket", "Office", "9/30/2020", "1", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Renew", 0, "2020-06-01", "", "", "Vancouver", "BC"),
			new BuildingStrategy(2913, "3514 Vancouver Ave", "CBD Submarket", "Office", "10/31/2020", "7349", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Renew", 0, "2020-06-01", "", "", "Portland", "OR"),
			new BuildingStrategy(2838, "411 E Wisconsin Ave", "CBD Submarket", "Office", "11/30/2020", "2471", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Renew", 10000, "2020-06-01", "", "", "Milwaukee", "WI"),
			new BuildingStrategy(2831, "1010 Washington Blvd", "CBD Submarket", "Office", "12/31/2020", "2239", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Renew", 15000, "2020-06-01", "", "", "Stamford", "CT"),
			new BuildingStrategy(2812, "101 South Tyron Street", "CBD Submarket", "Office", "1/31/2021", "4114", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Extend", 24000, "2020-06-01", "", "", "Charlotte", "NC"),
			new BuildingStrategy(671, "82 Avenue Marceau", "CBD Submarket", "Office", "2/28/2021", "1991", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "Sublease", 1000, "2020-06-01", "", "", "Paris", "France"),
			new BuildingStrategy(2939, "Edinburgh", "CBD Submarket", "Office", "2/28/2021", "1", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "No Change", 0, "2020-06-01", "", "", "Lothian Region", null),
			new BuildingStrategy(2822, "Calle De Serrano 47", "CBD Submarket", "Office", "3/31/2021", "4162", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "No Change", 0, "2020-06-01", "", "", "Madrid", "Spain"),
			new BuildingStrategy(2820, "222 SW Columbia Street", "CBD Submarket", "Office", "4/30/2021", "3340", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "No Change", 0, "2020-06-01", "", "", "Portland", "OR"),
			new BuildingStrategy(628, "33 Arch Street", "CBD Submarket", "Office", "5/31/2021", "25200", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "No Change", 0, "2020-06-01", "", "", "Boston", "MA"),
		];

		this.outdatedStrategies = [			
			new BuildingStrategy(640, "7120 Samuel Morse Drive", "CBD Submarket", "Office", "5/31/2020", "4815", "20.53", "$35.00fs", "47%", "192", 12345, "89%", "No Change", 567, "2018-05-01", "N/A", "N/A", "Columbia", "MD"),
			new BuildingStrategy(646, "1300 Post Oak Blvd", "CBD Submarket", "Office", "6/30/2020", "4400", "12.87", "$35.00fs", "47%", "192", 12345, "89%", "No Change", 567, "2018-05-01", "N/A", "N/A", "Houston", "TX"),			
			new BuildingStrategy(638, "312 Walnut Street", "CBD Submarket", "Office", "7/31/2020", "2951", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "No Change", 567, "2018-05-01", "N/A", "N/A", "Cincinnati", "OH"),
			new BuildingStrategy(674, "7733 Forsyth Blvd", "CBD Submarket", "Office", "9/30/2020", "3374", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "No Change", 567, "2018-05-01", "N/A", "N/A", "St. Louis", "MO"),
			new BuildingStrategy(671, "82 Avenue Marceau", "CBD Submarket", "Office", "9/30/2020", "1", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "No Change", 567, "2018-05-01", "N/A", "N/A", "Paris", "France"),			
			new BuildingStrategy(663, "2530 Meridian Parkway", "CBD Submarket", "Office", "8/31/2020", "250", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "", 567, "", "N/A", "N/A", "Durham", "NC"),
			new BuildingStrategy(678, "529 Bryant Street", "CBD Submarket", "Office", "8/31/2020", "16880", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "", 567, "", "N/A", "N/A", "Palo Alto", "CA"),
			new BuildingStrategy(683, "4115 Broad Street", "CBD Submarket", "Office", "9/30/2020", "250", "35.23", "$35.00fs", "47%", "295", 12345, "89%", "", 567, "", "N/A", "N/A", "San Luis Obispo", "CA"),
			
		];

		this.strategies = [
			new Strategy("Buyout", 0, 0, 0, 0, 0),
			new Strategy("Close Site", 1, 25000, .02, 700000, 50000),
			new Strategy("Extend", 3, 36000, 0, 1500000, 33000),
			new Strategy("No Change", 15, 156812, 0, 13485100, 0),
			new Strategy("Reconfig", 0, 0, 0, 0, 0),
			new Strategy("Relocate", 2, 48000, 0, 2459013, 100000),
			new Strategy("Renew", 24, 275621, 0, 15548902, 800000),
			new Strategy("Sublease", 5, 80000, 0, 1209456, 20000),
		];

		this.strategyList = ["Buyout", "Close Site","Extend", "No Change", "Reconfig", "Relocate", "Renew"];
	}

	navigateToPropertyStrategy(event) {
		this.router.navigate(['../../property/' + event.data.id.toString() + '/mystrategy'], {relativeTo: this.route } );
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
        if(arg.argument == "2020") {
            return { color: "#225BAD", hoverStyle: { color: "#225BAD" } };
        } else {
        	return { color: "#F68338", hoverStyle: { color: "#F68338" } };
        }
    }

    customizeTooltip(arg: any) {

        return {
            text: arg.valueText + " - " + arg.percent
        };
    }
}

