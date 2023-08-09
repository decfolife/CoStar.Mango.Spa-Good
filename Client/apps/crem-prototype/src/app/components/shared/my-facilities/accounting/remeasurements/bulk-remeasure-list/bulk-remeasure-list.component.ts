import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Remeasure, MeasureEventSetting } from '../../../../../../app.service';
import { DxDataGridComponent, DxPopupComponent, DxDropDownButtonComponent } from "devextreme-angular";

@Component({
  selector: 'bulk-remeasure-list',
  templateUrl: './bulk-remeasure-list.component.html',
  styleUrls: ['./bulk-remeasure-list.component.scss'],
  providers: [Service]
})
export class BulkRemeasureListComponent implements OnInit {

	@ViewChild("DataGrid") dataGrid: DxDataGridComponent;

	isExpanded : Boolean = true;
	remeasures : Remeasure[];
	columns : Array<any>;
	// rowClickRoute : String;
	// addWizards : Array<any>;
	// keyFields : String[];
	remeasureParameters: MeasureEventSetting[];
	beginDateOptions: Array<any>;
	endDateOptions: Array<any>;
	discountRateOptions: Array<any>;
	jeProfileOptions: Array<any>;
	functionalRateOptions: Array<any>;
	defaultManualAdjustmentOptions: Array<any>;
	commentsOptions: Array<any>;

	filterBuilderVisible : Boolean = false;
	appliedFilterCount : Number = 0;
	showClearFilters : Boolean = false;
	searchText : string = null;
	cancelModalVisible : Boolean = false;
 
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.remeasures = this.service.getBatchRemeasures();
		// console.log("remeasures", this.remeasures);
		this.remeasureParameters = this.service.getMeasurementSettingsByMeasureEvent("Renewal");
		// this.rowClickRoute = '../../remeasures';
		// this.keyFields = ["id"];
		// this.addWizards = [
		// 	{	name : "Remeasure",
		// 		route : "../../remeasures/new"
		// 	},			
		// ];
		this.columns = [
			{	dataField : "accountingBatchID",
				alignment : "left",
				caption : "ID",
				visible : true,
				dataType : "number"
			},
			{	dataField : "portfolio",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{
				dataField : "user",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "batchStatus",
				alignment : null,
				visible : true,
				dataType : "string",
				cellTemplate : "remeasureStatusTemplate"
			},			
			{	dataField : "validationStart",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "validationEnd",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "processingStart",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "processingEnd",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "valid",
				alignment : "right",
				visible : true,
				dataType : "number"
			},
			{	dataField : "invalid",	
				alignment : "right",
				visible : true,
				dataType : "number"
			},
			{	dataField : "success",
				alignment : "right",
				visible : true,
				dataType : "number"
			},
			{	dataField : "error",
				alignment : "right",
				visible : true,
				dataType : "number"
			}		,
			{	dataField : "total",
				alignment : "right",
				visible : true,
				dataType : "number"
			}						
		];

		this.beginDateOptions = [
			{ id: "Current Period Begin Date" },
			{ id: "Next Period Begin Date" },
			{ id: "Prior Term Begin Date" },
			{ id: "Today" },
			{ id: "Earliest Payment Begin Date" },
			{ id: "List of Option Begin Date" },
			{ id: "Current Lease Expiration Date" },
			{ id: "Possession Date" },
			{ id: "Original Lease Commencement Date" },
			{ id: "Lease Agreement Date" },
			{ id: "Lease Execution Date" },
			{ id: "Direct Entry" },
		];

		this.endDateOptions = [
			{ id: "Current Lease Expiration Date" },
			{ id: "Current Period End Date" },
			{ id: "Prior Term End Date" },
			{ id: "Last Payment End Date" },
			{ id: "Today" },
			{ id: "Direct Entry" },
		];

		this.discountRateOptions = [
			{ id: "Use Best Match" },
			{ id: "Prior Discount Rate" },
			{ id: "Direct Entry" },
			{ id: "If matching disabled show list of profiles" },
		];

		this.jeProfileOptions = [
			{ id: "Prior Value" },
			{ id: "Direct Entry" },
			{ id: "JE Profile 1" },
			{ id: "JE Profile 2" },
			{ id: "JE Profile 3" },
			{ id: "JE Profile 4" },
			{ id: "and etc.." },
		];

		this.functionalRateOptions = [
			{ id: "Prior Discount Rate" },
			{ id: "Current Period Spot" },
			{ id: "Current Period Average" },
			{ id: "Prior Period Start" },
		];

		this.defaultManualAdjustmentOptions = [
			{ id: "Prior Adjustment Amount" },
			{ id: "No Adjustment" },
		];

		this.commentsOptions = [
			{ id: "Prior Comments" },
			{ id: "Measured Batch [#] by [User] on [Date]" },
		];
	}

	actionMenuCallback(item) {
		console.log("item", item);
		if (item === "download") {
			this.onExporting();
		}
	}

	download() {
		console.log("do stuff")
	}

	onExporting() {
		let element: HTMLElement = document.getElementsByClassName('dx-datagrid-export-button')[0] as HTMLElement;
        element.click();
    }

	searchDataGrid(data) {
		this.dataGrid.instance.searchByText(data);
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	showFilterBuilder() {
		this.filterBuilderVisible = true;
	}

	calculateAppliedFilterCount(event) {
		let filters = this.dataGrid.instance.getCombinedFilter(true);
		let filterArrays = [];
		let filterProperties = [];
		if( filters ){	
			if( this.searchText != null && this.searchText != "" ){
				filterArrays = filters[2].filter(itm => typeof itm === 'object' && itm.constructor === Array);
			} else {
				filterArrays = filters.filter(itm => typeof itm === 'object' && itm.constructor === Array);
			}

			if( filterArrays.length == 0 ) {
				filterProperties.push(filters[0]);
			} else {
				filterArrays.forEach(function(itm) {
					if( !filterProperties.includes(itm[0][0])) {
						filterProperties.push(itm[0][0]);
					}
				});		
			}			

			this.appliedFilterCount = filterProperties.length;
		} else {
			this.appliedFilterCount = 0;
		}		
	}

	toggleClearFilters() {
		this.showClearFilters = !this.showClearFilters;
	}

	clearGridFilters(e) {
		e.stopPropagation();
		this.dataGrid.instance.clearFilter();
		this.showClearFilters = false;
		this.searchText = null;
		// this.searchDataGrid(null)
	}

	navigateToAddRoute() {
		this.router.navigate(["../../remeasures/new"], {relativeTo: this.route } );	
	}

	navigateToObject(event) {
		this.router.navigate(['../../remeasures', event.data.id], {relativeTo: this.route } );			
	} 

	cancelModalToggle() {
		this.cancelModalVisible = !this.cancelModalVisible;
	}
}