import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, MeasureEventSetting } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'measure-event-settings',
	templateUrl: './measure-event-settings.component.html',
	styleUrls: ['./measure-event-settings.component.scss'],
	providers: [Service]
})
export class MeasureEventSettingsComponent implements OnInit {

	beginDateOptions : Array<any>;
	endDateOptions : Array<any>;
	discountRateOptions : Array<any>;
	jeProfileOptions : Array<any>;
	functionalRateOptions : Array<any>;
	defaultManualAdjustmentOptions : Array<any>;
	commentsOptions : Array<any>;

	@ViewChild("DataGrid") dataGrid: DxDataGridComponent;

	@Input() data : Array<any>;

	startEditAction: string = "click";

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	 
	}

	ngOnInit() {
		this.beginDateOptions = [
			{ id : "Current Period Begin Date" },
			{ id : "Next Period Begin Date" },
			{ id : "Prior Term Begin Date" },
			{ id : "Today" },
			{ id : "Earliest Payment Begin Date" },
			{ id : "List of Option Begin Date" },
			{ id : "Current Lease Expiration Date" },
			{ id : "Possession Date" },
			{ id : "Original Lease Commencement Date" },
			{ id : "Lease Agreement Date" },
			{ id : "Lease Execution Date" },
			{ id : "Direct Entry" },			
		];

		this.endDateOptions = [
			{ id : "Current Lease Expiration Date" },
			{ id : "Current Period End Date" },
			{ id : "Prior Term End Date" },
			{ id : "Last Payment End Date" },
			{ id : "Today" },
			{ id : "Direct Entry" },						
		];

		this.discountRateOptions = [
			{ id : "Use Best Match" },
			{ id : "Prior Discount Rate" },
			{ id : "Direct Entry" },
			{ id : "If matching disabled show list of profiles" },
		];

		this.jeProfileOptions = [
			{ id : "Prior Value" },
			{ id : "Direct Entry" },
			{ id : "JE Profile 1" },
			{ id : "JE Profile 2" },
			{ id : "JE Profile 3" },
			{ id : "JE Profile 4" },
			{ id : "and etc.." },
		];

		this.functionalRateOptions = [
			{ id : "Prior Discount Rate" },
			{ id : "Current Period Spot" },
			{ id : "Current Period Average" },
			{ id : "Prior Period Start" },
		];

		this.defaultManualAdjustmentOptions = [
			{ id : "Prior Adjustment Amount" },
			{ id : "Direct Entry" },
		];

		this.commentsOptions = [
			{ id : "Direct Entry" },
			{ id : "Prior Comments" },
		];
	}

	saveSettings() {
		console.log(this.dataGrid.instance.hasEditData());
		this.dataGrid.instance.saveEditData();
	}

	revertSettings() {
		this.dataGrid.instance.cancelEditData();
	}

	onToolbarPreparing(e){  
        e.toolbarOptions.visible = false;  
    } 

}
