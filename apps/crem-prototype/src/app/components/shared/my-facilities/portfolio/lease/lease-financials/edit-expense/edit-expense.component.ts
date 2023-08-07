import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, GLAccount, Vendor, GLEvent, FormField, Lease } from '../../../../../../../app.service';
import { DxFormComponent, DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import * as dayjs from 'dayjs'

export class Charge {    
    account: GLAccount;
    vendor : Vendor;
    chargeName : string;
    invoiceNumber : string;
    invoiceDate : string;
    entryMethod : string;
    increaseBy : number;
    increaseByType : string;
    increaseEvery : number;
    increaseEveryType : string;
    amount : number;
    amountType : string;
    indexAdjRule : string;
    frequency : string;
    chargeGroupName : string;
    units : number;
    unitOfMeasure : string;
    isEstimated : boolean;
    isProrated : boolean;
    isTaxable : boolean;
    currency : string;
    notes : string;
    nCharges : number;
    startDate : string;
    endDate : string;

    constructor(account,vendor,chargeName,invoiceNumber,invoiceDate,entryMethod,increaseBy,increaseByType,increaseEvery,increaseEveryType,amount,amountType,indexAdjRule,frequency,chargeGroupName,units,unitOfMeasure,isEstimated,isProrated,isTaxable,currency,notes,nCharges,startDate,endDate) {		
		this.account = account;	
		this.vendor = vendor;
		this.chargeName = chargeName;
		this.invoiceNumber = invoiceNumber;
		this.invoiceDate = invoiceDate;
		this.entryMethod = entryMethod;
		this.increaseBy = increaseBy;
		this.increaseByType = increaseByType;
		this.increaseEvery = increaseEvery;
		this.increaseEveryType = increaseEveryType;
		this.amount = amount;
		this.amountType = amountType;
		this.indexAdjRule = indexAdjRule;
		this.frequency = frequency;
		this.chargeGroupName = chargeGroupName;
		this.units = units;
		this.unitOfMeasure = unitOfMeasure;
		this.isEstimated = isEstimated;
		this.isProrated = isProrated;
		this.isTaxable = isTaxable;
		this.currency = currency;
		this.notes = notes;
		this.nCharges = nCharges;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
  providers : [Service]
})
export class EditExpenseComponent implements OnInit {

	@ViewChild("DataGrid") dataGrid: DxDataGridComponent;
	@Input() isPopup : Boolean = false;
	@Output() closed = new EventEmitter<String>();

	leases : Lease[];
	selectedPortfolio : string;
	selectedLease : string[];
	leaseString : string;

	charge : Charge;
	glAccounts : GLAccount[];
	selectedAccount : string[];
	selectedGlEventAccount : string[];
	glAccountString : string;
	vendors : Vendor[];
	selectedVendor : string[];
	selectedGlEventVendor : string[];
	vendorString : string;
	formFields : Object[];
	generatedExpenses : GLEvent[] = [];
	amountHint : string = "Please enter an amount";
	startEditAction: string = "click";

	entryMethods : string[] = ['Starting Amount w/ Periodic Increases', 'Single Amount (Quick Add)'];
	increaseByTypes : string[] = ["Amount", "Percent"];
	increaseEveryTypes : string[] = ["Month", "Year"];
	amountTypes : string[] = ["Per Month", "Per Quarter", "Per 6 Months", "Per Year", "Per Unit Per Month", "Per Unit Per Quarter", "Per Unit Per 6 Months", "Per Unit Per Year"];
	indexAdjRules : any = [{ value : "My New Rule", display : "My New Rule"}];
	unitsOfMeasure : any = ["Acres", "Hectare", "Ping", "SF", "SM", "Tsubo", "Units"];
	frequencies : any = [
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
	currencies : any = [
		{ value : "CAD", display: "CAD" },
		{ value : "EUR", display: "EUR" },
		{ value : "GBP", display: "GBP" },
		{ value : "HKD", display: "HKD" },
		{ value : "USD", display: "USD" },
	];

	prorationTypes : any = [
		{ value : "Actual Days in Period", display: "Actual Days in Period" },
		{ value : "30 day month", display: "30 day month" },
		{ value : "365 day year", display: "365 day year" },
		{ value : "360 day year", display: "360 day year" },
		{ value : "Manual", display: "Manual" },
	];


	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { 
		
	}

	ngOnInit() {
		this.glAccounts = this.service.getGLAccounts();
		this.vendors = this.service.getVendors();
		if(this.isPopup) {
			this.leases = this.service.getLeases();
		}

		this.charge = new Charge(null, null, null, null, null, "Starting Amount w/ Periodic Increases", null, "Amount", null, "Year", null, "Per Month", null, "Monthly", null, 1, "SF", false, false, false, "USD", null, 1, null, null);		
	}

	accountChanged(e) {
		// console.log(e);
		let account = e.selectedRowsData[0];
		this.charge.account = account;
		this.glAccountString = account.accountCategory + ":  " + account.accountName + " - " + account.accountCode;
		this.generateExpenses();
	}

	vendorChanged(e) {
		// console.log(e);
		let vendor = e.selectedRowsData[0];
		this.charge.vendor = vendor;
		this.vendorString = vendor.name + " - " + vendor.address1 + ", " + vendor.city + ", " + vendor.state + "  " + vendor.zip;
		this.generateExpenses();
	}

	checkDuplicates() {
		notify({
			message : "No duplicates found.", 
			type : "info", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	saveSettings() {
		this.dataGrid.instance.saveEditData();
	}

	revertSettings() {
		this.dataGrid.instance.cancelEditData();
	}

	onToolbarPreparing(e){  
        e.toolbarOptions.visible = false;  
    } 

    addRow() {
		this.dataGrid.instance.addRow();
	}

	generateExpenses() {
		// console.log("generating...");
		// console.log(this.charge);		
		this.updateAmountHint();
		this.generatedExpenses = [];
		let c = this.charge;
		let firstStartDate = dayjs(c.startDate);
		let startDate, endDate;
		let amount = c.amount*1;
		let glEventAmount;

		if( c.frequency == "Monthly" ) {
			if( c.amountType == "Per Month") {
				amount = c.amount;
			} else if(c.amountType == "Per Quarter") {
				amount = c.amount / 3;				
			} else if(c.amountType == "Per 6 Months") {
				amount = c.amount / 6;
			} else if(c.amountType == "Per Year") {
				amount = c.amount / 12;
			} else if(c.amountType == "Per Unit Per Month") {
				amount = c.amount * c.units;
			} else if(c.amountType == "Per Unit Per Quarter") {
				amount = c.amount * c.units / 3;
			} else if(c.amountType == "Per Unit Per 6 Months") {
				amount = c.amount * c.units / 6;
			} else if(c.amountType == "Per Unit Per Year") {
				amount = c.amount * c.units / 12;
			} else {
				amount = c.amount;
			}		
		} else if( c.frequency == "Quarterly" ) {
			if( c.amountType == "Per Month") {
				amount = c.amount * 3;
			} else if(c.amountType == "Per Quarter") {
				amount = c.amount;
			} else if(c.amountType == "Per 6 Months") {
				amount = c.amount / 2;
			} else if(c.amountType == "Per Year") {
				amount = c.amount / 4;
			} else if(c.amountType == "Per Unit Per Month") {
				amount = c.amount * c.units * 3;
			} else if(c.amountType == "Per Unit Per Quarter") {
				amount = c.amount * c.units;
			} else if(c.amountType == "Per Unit Per 6 Months") {
				amount = c.amount * c.units / 2;
			} else if(c.amountType == "Per Unit Per Year") {
				amount = c.amount * c.units / 4;
			} else {
				amount = c.amount;
			}
		} else if( c.frequency == "Semi-anually" ) {
			if( c.amountType == "Per Month") {
				amount = c.amount * 6;
			} else if(c.amountType == "Per Quarter") {
				amount = c.amount * 2;
			} else if(c.amountType == "Per 6 Months") {
				amount = c.amount;
			} else if(c.amountType == "Per Year") {
				amount = c.amount / 2;
			} else if(c.amountType == "Per Unit Per Month") {
				amount = c.amount * c.units * 6;
			} else if(c.amountType == "Per Unit Per Quarter") {
				amount = c.amount * c.units * 2;
			} else if(c.amountType == "Per Unit Per 6 Months") {
				amount = c.amount * c.units;
			} else if(c.amountType == "Per Unit Per Year") {
				amount = c.amount * c.units / 2;
			} else {
				amount = c.amount;
			}
		} else if( c.frequency == "Annually" ) {
			if( c.amountType == "Per Month") {
				amount = c.amount * 12;
			} else if(c.amountType == "Per Quarter") {
				amount = c.amount * 4;
			} else if(c.amountType == "Per 6 Months") {
				amount = c.amount * 2;
			} else if(c.amountType == "Per Year") {
				amount = c.amount;
			} else if(c.amountType == "Per Unit Per Month") {
				amount = c.amount * c.units * 12;
			} else if(c.amountType == "Per Unit Per Quarter") {
				amount = c.amount * c.units * 4;
			} else if(c.amountType == "Per Unit Per 6 Months") {
				amount = c.amount * c.units * 2;
			} else if(c.amountType == "Per Unit Per Year") {
				amount = c.amount * c.units;
			} else {
				amount = c.amount;
			}
		} else if( c.frequency == "One-time" ) {	
			amount = c.amount;		
		}

		if( c.startDate != null && c.amount != null && (c.entryMethod == "Single Amount (Quick Add)" ? c.endDate != null : true )) {			
			for( let i = 0; i < c.nCharges; i++ ){							
				// Calculate the Start Date
				startDate = firstStartDate.add(i, 'year');
				// Calculate the End Date				
				if( c.entryMethod == "Starting Amount w/ Periodic Increases" ) {
					endDate = startDate.add(1, 'year').subtract(1, 'day');	
				} else {
					endDate = dayjs(c.endDate);
				}
				
				// Amount = this.startAmountControl.value * Math.pow((1+(this.increaseByControl.value/100)), i);
				if( c.increaseBy != null && c.increaseBy != 0 ) {
					if( c.increaseByType == "Amount" ) {
						glEventAmount = (amount*1) + (c.increaseBy*1*i);
					} else {
						glEventAmount = amount * Math.pow((1+(c.increaseBy/100)), i);
					}
				} else {
					glEventAmount = amount * 1;
				}	
				// Create the GL Event and push it into the array
				this.generatedExpenses.push(new GLEvent(0, 0, startDate.format("MM/DD/YYYY"), endDate.format("MM/DD/YYYY"), c.frequency, glEventAmount, c.currency, c.vendor ? c.vendor.id : '', c.vendor ? c.vendor.name : '', 'Scheduled', c.account ? c.account.accountCategory : '', c.account ? c.account.accountName : '', c.account ? c.account.accountCode : '', c.chargeName, 'AP', null, null, null, null, null, null, null, null));				
			}	
		}

		// console.log(this.generatedExpenses);
	}

	updateAmountHint() {
		let c = this.charge;
		if( c.frequency == "Monthly" ) {
			if( c.amountType == "Per Month") {
				this.amountHint = "$" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType ;
			} else if(c.amountType == "Per Quarter") {
				this.amountHint = "$" + (c.amount / 3).toString() + " Per Month, $" + (c.amount / 3 / c.units).toString() + " / " + c.unitOfMeasure + " Per Month, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;	
			} else if(c.amountType == "Per 6 Months") {
				this.amountHint = "$" + (c.amount / 6).toString() + " Per Month, $" + (c.amount / 6 / c.units).toString() + " / " + c.unitOfMeasure + " Per Month, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;	
			} else if(c.amountType == "Per Year") {
				this.amountHint = "$" + (c.amount / 12).toString() + " Per Month, $" + (c.amount / 12 / c.units).toString() + " / " + c.unitOfMeasure + " Per Month, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;	
			} else if(c.amountType == "Per Unit Per Month") {
				this.amountHint = "$" + (c.amount * c.units).toString() + " Per Month, $" + (c.amount * 12).toString() + " / " + c.unitOfMeasure + " Per Year";
			} else if(c.amountType == "Per Unit Per Quarter") {
				this.amountHint = "$" + (c.amount * c.units / 3).toString() + " Per Month, $" + (c.amount * c.units).toString() + " Per Quarter, $" + (c.amount * 4).toString() + " / " + c.unitOfMeasure + " Per Year";
			} else if(c.amountType == "Per Unit Per 6 Months") {
				this.amountHint = "$" + (c.amount * c.units / 6).toString() + " Per Month, $" + (c.amount * c.units).toString() + " Per 6 Months, $" + (c.amount * 2).toString() + " / " + c.unitOfMeasure + " Per Year";
			} else if(c.amountType == "Per Unit Per Year") {
				this.amountHint = "$" + (c.amount * c.units / 12).toString() + " Per Month, $" + (c.amount * c.units).toString() + " Per Year";
			} else {
				this.amountHint = "Does Not Compute.";	
			}		
		} else if( c.frequency == "Quarterly" ) {
			if( c.amountType == "Per Month") {
				this.amountHint = "$" + (c.amount * 3).toString() + " Per Quarter, $" + (c.amount * 3 / c.units).toString() + " / " + c.unitOfMeasure + " Per Quarter, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Quarter") {
				this.amountHint = "$" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per 6 Months") {
				this.amountHint = "$" + (c.amount / 2).toString() + " Per Quarter, $" + (c.amount / 2 / c.units).toString() + " / " + c.unitOfMeasure + " Per Quarter, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Year") {
				this.amountHint = "$" + (c.amount / 4).toString() + " Per Quarter, $" + (c.amount / 4 / c.units).toString() + " / " + c.unitOfMeasure + " Per Quarter, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Unit Per Month") {
				this.amountHint = "$" + (c.amount * c.units * 3).toString() + " Per Quarter, $" + (c.amount * 3).toString() + " / " + c.unitOfMeasure + " Per Quarter, $" + (c.amount * c.units).toString() + " Per Month";
			} else if(c.amountType == "Per Unit Per Quarter") {
				this.amountHint = "$" + (c.amount * c.units).toString() + " Per Quarter";
			} else if(c.amountType == "Per Unit Per 6 Months") {
				this.amountHint = "$" + (c.amount * c.units / 2).toString() + " Per Quarter, $" + (c.amount / 2).toString() + " / " + c.unitOfMeasure + " Per Quarter, $" + (c.amount * c.units).toString() + " Per 6 Months";
			} else if(c.amountType == "Per Unit Per Year") {
				this.amountHint = "$" + (c.amount * c.units / 4).toString() + " Per Quarter, $" + (c.amount / 4).toString() + " / " + c.unitOfMeasure + " Per Quarter, $" + (c.amount * c.units).toString() + " Per Year";
			} else {
				this.amountHint = "Does Not Compute.";	
			}
		} else if( c.frequency == "Semi-anually" ) {
			if( c.amountType == "Per Month") {
				this.amountHint = "$" + (c.amount * 6).toString() + " Per 6 Months, $" + (c.amount * 6 / c.units).toString() + " / " + c.unitOfMeasure + " Per 6 Months, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Quarter") {
				this.amountHint = "$" + (c.amount * 2).toString() + " Per 6 Months, $" + (c.amount * 2 / c.units).toString() + " / " + c.unitOfMeasure + " Per 6 Months, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per 6 Months") {
				this.amountHint = "$" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Year") {
				this.amountHint = "$" + (c.amount / 2).toString() + " Per 6 Months, $" + (c.amount / 2 / c.units).toString() + " / " + c.unitOfMeasure + " Per 6 Months, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Unit Per Month") {
				this.amountHint = "$" + (c.amount * c.units * 6).toString() + " Per 6 Months, $" + (c.amount * 6).toString() + " / " + c.unitOfMeasure + " Per 6 Months, $" + (c.amount * c.units).toString() + " Per Month";
			} else if(c.amountType == "Per Unit Per Quarter") {
				this.amountHint = "$" + (c.amount * c.units * 2).toString() + " Per 6 Months, $" + (c.amount * 2).toString() + " / " + c.unitOfMeasure + " Per 6 Months, $" + (c.amount * c.units).toString() + " Per Quarter";
			} else if(c.amountType == "Per Unit Per 6 Months") {
				this.amountHint = "$" + (c.amount * c.units).toString() + " Per 6 Months";
			} else if(c.amountType == "Per Unit Per Year") {
				this.amountHint = "$" + (c.amount * c.units / 2).toString() + " Per 6 Months, $" + (c.amount / 2).toString() + " / " + c.unitOfMeasure + " Per 6 Months, $" + (c.amount * c.units).toString() + " Per Year";
			} else {
				this.amountHint = "Does Not Compute.";	
			}
		} else if( c.frequency == "Annually" ) {
			if( c.amountType == "Per Month") {
				this.amountHint = "$" + (c.amount * 12).toString() + " Per Year, $" + (c.amount * 12 / c.units).toString() + " / " + c.unitOfMeasure + " Per Year, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Quarter") {
				this.amountHint = "$" + (c.amount * 4).toString() + " Per Year, $" + (c.amount * 4 / c.units).toString() + " / " + c.unitOfMeasure + " Per Year, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per 6 Months") {
				this.amountHint = "$" + (c.amount * 2).toString() + " Per Year, $" + (c.amount * 2 / c.units).toString() + " / " + c.unitOfMeasure + " Per Year, $" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Year") {
				this.amountHint = "$" + (c.amount / c.units).toString() + " / " + c.unitOfMeasure + " " + c.amountType;
			} else if(c.amountType == "Per Unit Per Month") {
				this.amountHint = "$" + (c.amount * c.units * 12).toString() + " Per Year, $" + (c.amount * 12).toString() + " / " + c.unitOfMeasure + " Per Year, $" + (c.amount * c.units).toString() + " Per Month";
			} else if(c.amountType == "Per Unit Per Quarter") {
				this.amountHint = "$" + (c.amount * c.units * 4).toString() + " Per Year, $" + (c.amount * 4).toString() + " / " + c.unitOfMeasure + " Per Year, $" + (c.amount * c.units).toString() + " Per Quarter";
			} else if(c.amountType == "Per Unit Per 6 Months") {
				this.amountHint = "$" + (c.amount * c.units * 2).toString() + " Per Year, $" + (c.amount * 2).toString() + " / " + c.unitOfMeasure + " Per Year, $" + (c.amount * c.units).toString() + " Per 6 Months";
			} else if(c.amountType == "Per Unit Per Year") {
				this.amountHint = "$" + (c.amount * c.units).toString() + " Per Year";
			} else {
				this.amountHint = "Does Not Compute.";	
			}
		} else if( c.frequency == "One-time" ) {			
		} else {
			this.amountHint = "Does Not Compute.";	
		}		
	}

	onPortfolioChanged(e) {

	}

	onLeaseChanged(e) {
		// console.log(e);
		let lease = e.selectedRowsData[0];
		this.leaseString = lease.ClientLeaseID + " - " + lease.PropertyName + " - " + lease.Address1 + ", " + lease.City + ", " + lease.Country + " - " + lease.LeaseExpiration;
	}	

	onCalculateValues() {

	}

	onApply() {

	}

	onSaveAndClose() {
		this.closed.emit("save");
	}

	onCancel() {
		this.closed.emit("cancel");
	}

}
