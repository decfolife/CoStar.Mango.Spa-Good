import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";
import { formatCurrency, formatNumber } from '@angular/common';

export class Deal {
	property: String;
	market: String;
	propertyType: Number;
	client: Number;
	rentableSf: Number;
	netEffectiveRent: Number;
	broker : string;
	commission : Number;
	leaseValue : Number;
	completeDate : string;
	dealType : string;

		constructor(property,market,propertyType,client,rentableSf,netEffectiveRent,broker,commission,leaseValue,completeDate,dealType) {
		this.property = property;
		this.market = market; 
		this.propertyType = propertyType;
		this.client = client;
		this.rentableSf = rentableSf;
		this.netEffectiveRent = netEffectiveRent;
		this.broker = broker;
		this.commission = commission;
		this.leaseValue = leaseValue;
		this.completeDate = completeDate;
		this.dealType = dealType;
	}
}
@Component({
	selector: 'closed-deals-card',
	templateUrl: './closed-deals-card.component.html',
	styleUrls: ['./closed-deals-card.component.scss']
})
export class ClosedDealsCardComponent implements OnInit {

	closedDeals : Deal[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
		this.closedDeals = [
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
			new Deal("Phipps Tower", "Atlanta", "Office", "CoStar Group", 35000, 24.65, "Jason Trkovsky", 120000, 1234567, "5/24/2021", "Renewal"),			
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
