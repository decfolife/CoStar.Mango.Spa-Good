import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, FormField, AccountingMeasurement, Lease } from '../../../../../../../app.service';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
	selector: 'app-edit-schedule',
	templateUrl: './edit-schedule.component.html',
	styleUrls: ['./edit-schedule.component.scss'],
	providers : [Service]
})
export class EditScheduleComponent implements OnInit {

	@Input() isPopup : Boolean = false;
	@Output() closed = new EventEmitter<String>();
	formFields : Object[];
	accountingMeasurementId : Number;
	accountingMeasurement : AccountingMeasurement;
	classificationTestPopupVisible : Boolean = false;
	leases : Lease[];
	selectedPortfolio : string;
	selectedLease : string[];
	leaseString : string;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {

		this.leases = this.service.getLeases();

		this.formFields = [
				{ 	sectionName : "Details",
					class : {
						"col-md-12" : true
					},
					fields : [
						new FormField(1, 'Classification', "SystemLeaseID", 'dxSelectBox', '', '', 'Classification Test Result: Not taken', '', '', null, '', '', '', '', '', '', null, 'classificationTypeTemplate', [
							{value:"Operating (ASC 842)", display: "Operating (ASC 842)"},
							{value:"Finance (ASC 842)", display: "Finance (ASC 842)"}
						], false, null, null),
						new FormField(2, 'Begin Date', "BuildingRentableArea", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'accountingBeginDateTemplate', [
							{value:"Current Period Begin Date", display: "Current Period Begin Date"},
							{value:"Next Period Begin Date", display: "Next Period Begin Date"},
							{value:"Prior Term Begin Date", display: "Prior Term Begin Date"},
							{value:"Today", display: "Today"},
							{value:"Earliest Payment Begin Date", display: "Earliest Payment Begin Date"},
							{value:"Option Begin Date", display: "Option Begin Date"},
							{value:"Possession Date", display: "Possession Date"},
							{value:"Current Lease Commencement Date", display: "Current Lease Commencement Date"},
							{value:"Direct Entry", display: "Direct Entry"},
						], false, null, null),
						new FormField(4, 'Amortization Profile', "ClientLeaseID", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [
							{value:"Include All", display: "Include All"}
						], false, null, null),
						new FormField(20, 'End Date', "BuildingType", 'dxDateBox', '', '', '1 year, 6 months | 18.00 periods | 18.00 months | 548 days', '', '', null, '', '', '', '', '', '', null, 'accountingEndDateTemplate', [
							{value:"Last Payment End Date", display: "Last Payment End Date"},
							{value:"Prior Term End Date", display: "Prior Term End Date"},
							{value:"Today", display: "Today"},
							{value:"Current Lease Expiration Date", display: "Current Lease Expiration Date"},
							{value:"Direct Entry", display: "Direct Entry"},
						], false, null, null),
						new FormField(5, 'Journal Entry Profile', "PropertyName", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Operating (ASC 842)", display: "Operating (ASC 842)"}, {value:"Finance (ASC 842)", display: "Finance (ASC 842)"} ], false, null, null),
						new FormField(20, 'Remaining Economic Life', "ProjectAllocation", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(7, 'Discount Rate Profile', "Address1", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Operating (ASC 842)", display: "Operating (ASC 842)"}, {value:"Finance (ASC 842)", display: "Finance (ASC 842)"} ], false, null, null),
						new FormField(20, 'Fair Market Value', "CoStarLocation", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(8, 'Annual Rate', "Address2", 'dxSelectBox', '', '', 'Monthly Compounding | Beginning of Period | 0.1231%', '', '', null, '', '', '', '', '', '', null, 'annualRateTemplate', [{value:"Operating (ASC 842)", display: "Operating (ASC 842)"}, {value:"Finance (ASC 842)", display: "Finance (ASC 842)"} ], false, null, null),
						new FormField(20, 'Implicit Rate', "AbstractStatus", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(9, 'Charge Type', "City", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"AP", display: "AP"}, {value:"AR", display: "AR"} ], false, null, null),
						new FormField(21, 'ROU Asset Obtained', "AbstractPreparedBy", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'rouAssetsTemplate', [], false, null, null),
						new FormField(10, 'Currency', "State", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'currencyTemplate', [{value:"AP", display: "AP"}, {value:"AR", display: "AR"} ], false, null, null),
						new FormField(22, 'Impaired', "AbstractReviewedBy", 'dxSwitch', '', '', '', '', '', null, '', '', '', '', '', '', null, 'switchTemplate', [], false, null, null),
						new FormField(11, 'Reporting Exception', "ZipCode", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'reportingExceptionTemplate', [
							{value:"12 months or less", display: "12 months or less"}, 
							{value:"Less than $5,000", display: "Less than $5,000"},
							{value:"Other", display: "Other"}  
						], false, null, null),
						new FormField(23, 'Exclude from Batch Remeasure', "EmailAddress", 'dxSwitch', '', '', '', '', '', null, '', '', '', '', '', '', null, 'switchTemplate', [], false, null, null),
						new FormField(19, 'Comments', "Country", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
					]	
				},			
				{	sectionName : "Financials",
					class : {
						"col-md-12" : true
					},
					fields : [
						new FormField(25, 'Total Amount', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Previous Liability Closing Balance', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Present Value', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Previous Asset Closing Balance', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Liability Adjustment', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Beginning Asset Balance', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'System Asset Adjustment', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Beginning Liability Balance', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Manual Asset Adjustment', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(25, 'Level Expense', "LeaseAgreementDate", 'dxTextBox', '', '', 'Periodic Amortization', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Total Asset Adjustment', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Gain (Loss)', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Direct Costs', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						
					]
				},
				{	sectionName : "Residual Value",
					class : {
						"col-md-12" : true
					},
					fields : [
						new FormField(25, 'Estimated Residual Value', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'RV Guaranteed', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'RV Guaranteed by 3rd Party', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Lessor Explicitly Exempts Lessee', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'RV Guaranteed by Lessee', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Guaranteed Amount Reflected in Payments', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Amount Probably of Being Owned by Lessee', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Unguaranteed Residual Value', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'Amount Not Reflected in PV of Payments', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(25, 'PV of Amount Not Reflected in Payments', "LeaseAgreementDate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
					]
				},
				
		];
	}

	openClassificationTest() {		
		this.classificationTestPopupVisible = true;
	}

	classTestSaved(e) {
		this.classificationTestPopupVisible = false;	

		notify({
			message : "Classification test saved successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	classTestCancelled(e) {
		this.classificationTestPopupVisible = false;
		
		notify({
			message : "Classification test cancelled.", 
			type : "info", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});		
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
