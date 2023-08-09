import { Component, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { CostarAlertComponent } from "../../../../costar-alert/costar-alert.component";
@Component({
	selector: 'misc',
	templateUrl: './misc.component.html',
	styleUrls: ['./misc.component.scss']
})
export class MiscComponent implements OnInit {

	toastTypes : Array<any>;
	toastVisible : Boolean = false;
	toastType : String;
	toastMessage : String;

	alertTypes : Array<any>;
	alertVisible : Boolean = false;
	alertTitle : String = "This alert worked";
	alertMessage : String = "Bacon ipsum";

	@ViewChild("BasicAlert") basicAlert: CostarAlertComponent;

	constructor() { }

	ngOnInit() {
		this.toastTypes = [
			{ text: 'success', message: 'Record saved successfully.' },
			{ text: 'info', message: 'Changes to expeneses may impact accounting schedules.  Please review.' },
			{ text: 'warning', message: 'You must select at least one transaction to process.' },
			{ text: 'error', message: 'Please complete all required fields.' },			
		]

		this.alertTypes = [
			{ text: 'Lose Changes', title: "Unsaved Changes", message: 'You have unsaved changes.  Are you sure you want to leave this page and abandon changes?' },
			{ text: 'Updates', title: "Bulk Action Confirm", message: 'You are about to remeasure 32 accounting schedules.  Click OK to continue.', okButtonText: "OK", cancelButtonText: "Cancel" },
			{ text: 'Delete', title: "Delete", message: 'Are you sure you want to delete the database?', okButtonText: "Delete", cancelButtonText: "Cancel" },
			{ text: 'Surprise', title: "Chaos Mode", message: 'Are you sure you want to trigger CHAOS MODE?  Click any button to proceed.', okButtonText: "Proceed", cancelButtonText: "Any Button" },
		]
	}

	showToast(e) {

		notify({
			message : e.itemData.message, 
			type : e.itemData.text, 
			displayTime : 60000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	showAlert(e) {
		this.basicAlert.open({
			visible : true,
			message : e.itemData.message,
			title : e.itemData.title,
			okButtonText : e.itemData.okButtonText,
			cancelButtonText : e.itemData.cancelButtonText
		});
	}
}
