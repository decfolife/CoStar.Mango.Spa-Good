import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task, Project, DropdownField } from '../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";
import { formatCurrency, formatNumber } from '@angular/common';

export class DealCount {
    broker: String;
    brokerage: String;
    totalLeaseValue: Number;
    targetSf: Number;
    totalEstCommission: Number;
    dealCount: Number;

    constructor(broker,brokerage,totalLeaseValue,targetSf,totalEstCommission,dealCount) {
		this.broker = broker;
		this.brokerage = brokerage;	
		this.totalLeaseValue = totalLeaseValue;
		this.targetSf = targetSf;
		this.totalEstCommission = totalEstCommission;
		this.dealCount = dealCount;
	}
}

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

export class Activity {
    hierarchy: string;
    remainingObligation: number;

    constructor(hierarchy,remainingObligation) {
		this.hierarchy = hierarchy;
		this.remainingObligation = remainingObligation;	
	}
}

export class ExpirationData {
    quarter: string;
    expirations: number;
    sf : number;

    constructor(quarter,expirations,sf) {
		this.quarter = quarter;
		this.expirations = expirations;	
		this.sf = sf;
	}
}


@Component({
	selector: 'deals-dashboard',
	templateUrl: './deals-dashboard.component.html',
	styleUrls: ['./deals-dashboard.component.scss'],
	providers: [Service]
})
export class DealsDashboardComponent implements OnInit {

	dealsByBroker : DealCount[];
	dealsByBrokerage : DealCount[];
	recentActivity : Activity[];
	actionRequired : Activity[];
	leaseExpirations : ExpirationData[];
	dealCountByStage : DealCountByStage[];
	filters : DropdownField[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	

		this.filters = [
			new DropdownField([], null, null, "Portfolio", "portfolio", [], true, null, true, false, true),
			new DropdownField([], null, null, "Hierarchy", "hierarchy", [], true, null, null, null, true),
			new DropdownField([{ value : "New" }, { value : "Contraction" }, { value : "Expansion" }, { value : "Relocation" }, { value : "Renewal" }], "value", "value", "Deal Type", "dropdown", [], true, "multiple", true, true, true),			
			new DropdownField([{ value : "CBRE" },{ value : "Cresa" },{ value : "Colliers International" },{ value : "Cushman & Wakefield" },{ value : "JLL" },{ value : "Newmark Knight Frank" }], "value", "value", "Brokerage", "dropdown", [], true, "multiple", true, true, true),			
			new DropdownField([{ value : "Evan English" },	{ value : "Kurt Richter" },	{ value : "Rich Rhodes" },	{ value : "Sally Maher" },	{ value : "Tim Marion" },	{ value : "Sean Stanley" }], "value", "value", "Tenant Broker", "dropdown", [], true, "multiple", true, true, true),			
		];

		
		this.dealsByBrokerage = [
			new DealCount(null, "CBRE", 13353037.38, 32500, 894121.5, 2),
			new DealCount(null, "Cresa", 2596153.85, 10000, 103846.15, 1),
			new DealCount(null, "Cushman & Wakefield", 70253306.66, 163000, 5570132.27, 3),
			new DealCount(null, "Colliers International", 9806637.02, 31700, 392265.48, 1),
			new DealCount(null, "Newmark Knight Frank", 9806637.02, 31700, 392265.48, 2),
		];

		this.dealsByBroker = [
			new DealCount("Evan English", "Colliers International", 9806637.02, 31700, 392265.48, 1),
			new DealCount("Kurt Richter", "Cushman & Wakefield", 70253306.66, 163000, 5570132.27, 3),
			new DealCount("Rich Rhodes", "Cresa", 2596153.85, 10000, 103846.15, 1),
			new DealCount("Sally Maher", "CBRE", 9806637.02, 16250, 392265.48, 1),
			new DealCount("Tim Marion", "Newmark Knight Frank", 9806637.02, 31700, 392265.48, 2),
			new DealCount("Sean Stanley", "CBRE", 9806637.02, 16250, 392265.48, 1),
		];	

		this.leaseExpirations = [
			new ExpirationData("Q2 20", 6, 17518),
			new ExpirationData("Q3 20", 6, 23706),
			new ExpirationData("Q4 20", 3, 12059),
			new ExpirationData("Q1 21", 4, 10268),
			new ExpirationData("Q2 21", 2, 28540),
			new ExpirationData("Q3 21", 5, 27252),
			new ExpirationData("Q4 21", 5, 36702),
			new ExpirationData("Q1 22", 4, 48258),
			new ExpirationData("Q2 22", 2, 16485),
			new ExpirationData("Q3 22", 2, 5680),
			new ExpirationData("Q4 22", 1, 4112),
			new ExpirationData("Q1 23", 3, 28203),
			new ExpirationData("Q2 23", 3, 55773),
		];	

		this.dealCountByStage = [
			new DealCountByStage("RFI", 3, 0, 2, 0, 1),
			new DealCountByStage("Tour", 2, 0, 0, 2, 2),
			new DealCountByStage("Proposal", 2, 0, 0, 1, 2),
			new DealCountByStage("LOI", 1, 0, 0, 0, 1),
			new DealCountByStage("Lease", 1, 0, 1, 2, 1),
		];
	}

	ngOnInit() {
		
	}

	customizeSumCurrency(data) {
		return formatCurrency(data.value, 'en-US', '$', '18.0-0');
	}

	customizeSumInteger(data) {
		return formatNumber(data.value, 'en-US', '1.0-0');
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
