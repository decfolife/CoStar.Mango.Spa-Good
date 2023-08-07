import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, MeasureEventSetting, FormField, AccountingSettings } from '../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'accounting-settings',
	templateUrl: './accounting-settings.component.html',
	styleUrls: ['./accounting-settings.component.scss'],
	providers: [Service]
})
export class AccountingSettingsComponent implements OnInit {

	classifications : Object[];
	formFields : Object[];
	settings : AccountingSettings;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {

	}

	ngOnInit() {

		this.settings = this.service.getAccountingSettings("RE Portfolio");

		this.classifications = [
			{ 	name : "Finance (US GAAP ASC 842)",
				data : this.service.getMeasureEventSettings("Finance ASC 842")
			},
			{ 	name : "Operating (US GAAP ASC 842)",
				data : this.service.getMeasureEventSettings("Operating ASC 842")
			},
			{ 	name : "Capital (US GAAP ASC 840)",
				data : this.service.getMeasureEventSettings("Capital ASC 840")
			},
			{ 	name : "Operating (US GAAP ASC 840)",
				data : this.service.getMeasureEventSettings("Operating ASC 840")
			},
			{ 	name : "IFRS 16",
				data : this.service.getMeasureEventSettings("IFRS 16")
			},
			{ 	name : "Operating (Lessor)",
				data : this.service.getMeasureEventSettings("Operating Lessor")
			},

		];

		this.formFields = [
			{ 	sectionName : "Accounting Settings",
				class : {
					"col-md-12" : true
				},
				fields : [
					new FormField(1, 'Accounting Calendar', "accountingCalendar", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "Gregorian Calendar", display: "Gregorian Calendar"}, {value: "Acme 4-4-5", display: "Acme 4-4-5"}], false, null, null),
					new FormField(2, 'Amortization Method', "amortizationMethod", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "Daily", display: "Daily"}, {value: "Periodic", display: "Periodic"}], false, null, null),
					new FormField(3, 'Default Payment Timing', "defaultPaymentTiming", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "Beginning of Period", display: "Beginning of Period"}, {value: "End of Period", display: "End of Period"}], false, null, null),
					new FormField(4, 'Require Journal Entry Profile', "isJournalEntryProfileRequired", 'dxSwitch', '', '', '', '', '', null, '', '', '', '', '', '', null, 'switchTemplate', [], false, null, null),
					new FormField(5, 'Default Compound Frequency', "defaultCompoundFrequency", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "Daily", display: "Daily"}, {value: "Monthly", display: "Monthly"}], false, null, null),
					new FormField(6, 'Functional Currency', "isFunctionalCurrencyEnabled", 'dxSwitch', '', '', '', '', '', null, '', '', '', '', '', '', null, 'switchTemplate', [], false, null, null),
				]
			},
			{ 	sectionName : "Discount Rates",
				class : {
					"col-md-12" : true
				},
				fields : [
					new FormField(7, 'Discount Rate Matching', "isDiscountRateMatchingEnabled", 'dxSwitch', '', '', '', '', '', null, '', '', '', '', '', '', null, 'switchTemplate', [], false, null, null),
					new FormField(8, 'Allow Direct Entry Discount Rate', "isDirectEntryAllowed", 'dxSwitch', '', '', '', '', '', null, '', '', '', '', '', '', null, 'switchTemplate', [], false, null, null),
					new FormField(9, 'Min Months Operator', "minMonthsOperator", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "Greater Than", display: "Greater Than"}, {value: "Greater Than or Equal To", display: "Greater Than or Equal To"}], false, null, null),
					new FormField(10, 'Default Annual Rate Type', "defaultAnnualRateType", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "APR", display: "APR"}, {value: "APY", display: "APY"}], false, null, null),
					new FormField(11, 'Max Months Operator', "maxMonthsOperator", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: "Less Than", display: "Less Than"}, {value: "Less Than or Equal To", display: "Less Than or Equal To"}], false, null, null),
				]
			}
		];
	}

	onTabDragStart(e) {
		e.itemData = e.fromData[e.fromIndex];
	}

	onTabDrop(e) {
		e.fromData.splice(e.fromIndex, 1);
		e.toData.splice(e.toIndex, 0, e.itemData);
	}
}
