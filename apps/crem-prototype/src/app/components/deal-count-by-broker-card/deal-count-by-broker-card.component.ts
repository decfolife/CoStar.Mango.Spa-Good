import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task, Project, DropdownField } from '../../app.service';
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

@Component({
	selector: 'deal-count-by-broker-card',
	templateUrl: './deal-count-by-broker-card.component.html',
	styleUrls: ['./deal-count-by-broker-card.component.scss'],
	providers: [Service]
})
export class DealCountByBrokerCardComponent implements OnInit {

	dealsByBroker : DealCount[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
		this.dealsByBroker = [
			new DealCount("Evan English", "Colliers International", 9806637.02, 31700, 392265.48, 1),
			new DealCount("Kurt Richter", "Cushman & Wakefield", 70253306.66, 163000, 5570132.27, 3),
			new DealCount("Rich Rhodes", "Cresa", 2596153.85, 10000, 103846.15, 1),
			new DealCount("Sally Maher", "CBRE", 9806637.02, 16250, 392265.48, 1),
			new DealCount("Tim Marion", "Newmark Knight Frank", 9806637.02, 31700, 392265.48, 2),
			new DealCount("Sean Stanley", "CBRE", 9806637.02, 16250, 392265.48, 1),
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
}
