import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Service, Deal } from '../../app.service';

@Component({
	selector: 'add-deal-dialog',
	templateUrl: './add-deal-dialog.component.html',
	styleUrls: ['./add-deal-dialog.component.scss']
})
export class AddDealDialogComponent implements OnInit {

	@Output() saved = new EventEmitter();
	@Output() cancelled = new EventEmitter();
	
	deal : Deal;

	dealTypes : any = [
		{ value : "Monthly", display: "Monthly" },
		{ value : "Quarterly", display: "Quarterly" },
		{ value : "Semi-anually", display: "Semi-anually" },
		{ value : "Annually", display: "Annually" },
		{ value : "One-time", display: "One-time" },
		{ value : "Traditional English Quarters", display: "Traditional English Quarters" },
		{ value : "Traditional Scottish Quarters", display: "Traditional Scottish Quarters" },
		{ value : "Modified Scottish Quarters", display: "Modified Scottish Quarters" },
		{ value : "Modern Quarters", display: "Modern Quarters" },		
	];
	dealStages : any = [
		{ value : "CAD", display: "CAD" },
		{ value : "EUR", display: "EUR" },
		{ value : "GBP", display: "GBP" },
		{ value : "HKD", display: "HKD" },
		{ value : "USD", display: "USD" },
	];

	tenants : any = [
		{ value : "Actual Days in Period", display: "Actual Days in Period" },
		{ value : "30 day month", display: "30 day month" },
		{ value : "365 day year", display: "365 day year" },
		{ value : "360 day year", display: "360 day year" },
		{ value : "Manual", display: "Manual" },
	];

	tenantContacts : any = [
		{ value : "Actual Days in Period", display: "Actual Days in Period" },
		{ value : "30 day month", display: "30 day month" },
		{ value : "365 day year", display: "365 day year" },
		{ value : "360 day year", display: "360 day year" },
		{ value : "Manual", display: "Manual" },
	];

	tenantBrokers : any = [
		{ value : "Actual Days in Period", display: "Actual Days in Period" },
		{ value : "30 day month", display: "30 day month" },
		{ value : "365 day year", display: "365 day year" },
		{ value : "360 day year", display: "360 day year" },
		{ value : "Manual", display: "Manual" },
	];

	industries : any = [
		{ value : "Actual Days in Period", display: "Actual Days in Period" },
		{ value : "30 day month", display: "30 day month" },
		{ value : "365 day year", display: "365 day year" },
		{ value : "360 day year", display: "360 day year" },
		{ value : "Manual", display: "Manual" },
	];

	constructor() { }

	ngOnInit() {
		this.deal = new Deal(0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
	}

	cancel() {
		this.cancelled.emit();
	}

	save() {
		this.saved.emit();
	}

}
