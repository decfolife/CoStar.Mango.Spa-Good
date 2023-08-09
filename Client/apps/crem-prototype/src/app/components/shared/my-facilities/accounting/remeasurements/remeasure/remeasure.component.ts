import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AccountingSchedule, MeasureEventSetting, DropdownField, AccountingMeasurement } from '../../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
	selector: 'remeasure',
	templateUrl: './remeasure.component.html',
	styleUrls: ['./remeasure.component.scss'],
	providers: [Service, {
		provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
	}]
})
export class RemeasureComponent implements OnInit {

	availableIsExpanded: Boolean = true;
	availableFilterBuilderVisible: Boolean = false;
	availableAppliedFilterCount: Number = 0;
	availableShowClearFilters: Boolean = false;
	availableSearchText: String = null;

	batchIsExpanded: Boolean = true;
	batchFilterBuilderVisible: Boolean = false;
	batchAppliedFilterCount: Number = 0;
	batchShowClearFilters: Boolean = false;
	batchSearchText: String = null;

	validateIsExpanded: Boolean = true;
	validateFilterBuilderVisible: Boolean = false;
	validateAppliedFilterCount: Number = 0;
	validateShowClearFilters: Boolean = false;
	validateSearchText: String = null;

	beginDateOptions : Array<any>;
	endDateOptions: Array<any>;
	discountRateOptions: Array<any>;
	jeProfileOptions: Array<any>;
	functionalRateOptions: Array<any>;
	defaultManualAdjustmentOptions: Array<any>;
	commentsOptions: Array<any>;
	selectedPortfolio: string;
	selectedView: string;
	selectedWorkflowStatus: string;

	confirmModalVisible: boolean = false;

	@ViewChild("AvailableDataGrid") availableDataGrid: DxDataGridComponent;
	@ViewChild("BatchDataGrid") batchDataGrid: DxDataGridComponent;
	@ViewChild("ValidateDataGrid") validateDataGrid: DxDataGridComponent;
	@ViewChild("RemeasureStepper") remeasureStepper: MatStepper;

	availableSchedules: AccountingSchedule[] = [];
	batchSchedules: AccountingSchedule[] = [];
	validateSchedules: AccountingSchedule[] = [];
	invalidRecordCount: number = 0;
	validRecordCount: number = 0;
	invalidString: String;
	validString: String;
	remeasureParameters: MeasureEventSetting[];
	startEditAction: string = "click";	
	viewToggleValue: string = "available";

	// measureEvent: string;
	measureEvent : DropdownField;
	measureEvents : string[] = ["Renewal", "Data Correction", "Rent Review (IFRS)", "CPI Cumulative CAP Reached", 
	"Other", "Impairment", "Partial Termination", "Termination", "Full Termination"];
	// nextWorkflowStatus : string;
	nextWorkflowStatus : DropdownField;
	workflowStatuses : string[] = ["Needs Review", "Pending Approval", "Approved"]
	workflowComment : string;
	viewsDropdown : DropdownField;
	workflowDropdown : DropdownField;

	batchId : number = 9;
	batchStatus : string = "Completed";
	batchCreatedBy : string = "Patrick Griffith";
	batchQueueDate : string = "Nov 23 2020 14:46";
	batchStart : string = "Nov 23 2020 14:56";
	batchEnd : string = "Nov 23 2020 15:07";
	successCount : number = 12;
	errorCount : number = 3;

	directEntryItems = {
		AccountingTermBeginDate : "",
		AccountingTermEndDate : ""
	}

	dateFormat = {
		type: 'MM/dd/yyyy',
		parser: function (dateString) {
		  if (dateString.includes('.')) {
			const dateArray = dateString.split('.', 3);
			dateString = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
		  }
		  return new Date(dateString);
		}
	};

	// Override variables
	overrideParameters : boolean = false;	
	accountingMeasurement : AccountingMeasurement;
	parameterOverride : {
		accountingTermBeginDateOverride: Date;
		accountingTermEndDateOverride: Date;
		commentsOverride: string;
		discountRateOverride: string;
		annualRateOverride: string;
		annualRateTypeOverride: string;
		manualAssetAdjustmentOverride: string;
		paymentTimingOverride: string;
	}	

	constructor(private service: Service, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {

		this.viewsDropdown = new DropdownField([{ value: "Leases by Brand" }, { value: "Leases Critical Dates" }, { value: "Equipment Leases" }, { value: "Accounting" }], "value", "value", "View", "dropdown", [], true, "single", true, false, true);
		this.workflowDropdown = new DropdownField([{ value: "Approved" }, { value: "Needs Review" }, { value: "Pending Approval" }], "value", "value", "Workflow Status", "dropdown", [], true, "multiple", true, false, true);

		this.availableSchedules = this.service.getAccountingSchedules();
		this.remeasureParameters = this.service.getMeasurementSettingsByMeasureEvent("Renewal");

		this.measureEvent = new DropdownField([{ value: "Renewal" }, { value: "Data Correction" }, { value: "Rent Review (IFRS)" }, { value: "CPI Cumulative CAP Reached" }, { value: "Other" }, { value: "Impairment" }, { value: "Partial Termination" }, { value: "Termination" }, { value: "Full Termination" }], "value", "value", "Select...", "dropdown", ["Renewal"], true, "single", false, false, true);
		this.nextWorkflowStatus = new DropdownField([{ value: "Approved" }, { value: "Needs Review" }, { value: "Pending Approval" }], "value", "value", "Select...", "dropdown", [], true, "single", false, false, true);
		this.parameterOverride = {
			accountingTermBeginDateOverride: null,
			accountingTermEndDateOverride: null,
			commentsOverride: null,
			discountRateOverride: null,
			annualRateOverride: null,
			annualRateTypeOverride: null,
			paymentTimingOverride: null,
			manualAssetAdjustmentOverride: null,
		}

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

	ngAfterViewInit() {
		this.remeasureStepper.selectionChange.subscribe(selection => {
			this.validateSchedules = this.batchSchedules;

			// this.invalidRecordCount = this.validateSchedules.filter(itm => itm.remeasureValidationStatus == 'Failed').length || 0;
			// this.validRecordCount = this.validateSchedules.length - (+this.invalidRecordCount);

			// this.invalidString = this.invalidRecordCount.toString() + " Invalid Records";
			// const count: number = this.validRecordCount + this.invalidRecordCount;
			this.validString = this.validateSchedules.length + " Selected Records";
		});
	}

	addSchedulesToBatch() {
		this.availableDataGrid.selectedRowKeys.forEach(function (itm) {
			this.batchSchedules.push(itm);
			this.availableSchedules.splice(this.availableSchedules.indexOf(itm), 1);
		}, this);

		this.availableDataGrid.instance.clearSelection();
	}

	removeSchedulesFromBatch() {
		this.batchDataGrid.selectedRowKeys.forEach(function (itm) {
			this.availableSchedules.push(itm);
			this.batchSchedules.splice(this.batchSchedules.indexOf(itm), 1);
		}, this);

		this.batchDataGrid.instance.clearSelection();
	}

	availableToggleExpanded() {
		this.availableIsExpanded = !this.availableIsExpanded;
	}

	availableShowColumnChooser() {
		this.availableDataGrid.instance.showColumnChooser();
	}

	availableSearchDataGrid(searchText) {
		this.availableSearchText = searchText;
		this.availableDataGrid.instance.searchByText(searchText);
	}

	availableShowFilterBuilder() {
		this.availableFilterBuilderVisible = true;
	}

	availableCalculateAppliedFilterCount(event) {
		let filters = this.availableDataGrid.instance.getCombinedFilter(true);
		// console.log(filters);
		let filterArrays = [];
		let filterProperties = [];
		if (filters) {
			if (this.availableSearchText != null && this.availableSearchText != "") {
				filterArrays = filters[2].filter(itm => typeof itm === 'object' && itm.constructor === Array);
			} else {
				filterArrays = filters.filter(itm => typeof itm === 'object' && itm.constructor === Array);
			}

			if (filterArrays.length == 0) {
				filterProperties.push(filters[0]);
			} else {
				filterArrays.forEach(function (itm) {
					if (!filterProperties.includes(itm[0][0])) {
						filterProperties.push(itm[0][0]);
					}
				});
			}

			this.availableAppliedFilterCount = filterProperties.length;
		} else {
			this.availableAppliedFilterCount = 0;
		}
	}

	availableToggleClearFilters() {
		this.availableShowClearFilters = !this.availableShowClearFilters;
	}

	availableClearGridFilters(e) {
		e.stopPropagation();
		this.availableDataGrid.instance.clearFilter();
		this.availableShowClearFilters = false;
	}

	batchToggleExpanded() {
		this.batchIsExpanded = !this.batchIsExpanded;
	}

	batchShowColumnChooser() {
		this.batchDataGrid.instance.showColumnChooser();
	}

	batchSearchDataGrid(searchText) {
		this.batchSearchText = searchText;
		this.batchDataGrid.instance.searchByText(searchText);
	}

	batchShowFilterBuilder() {
		this.batchFilterBuilderVisible = true;
	}

	batchCalculateAppliedFilterCount(event) {
		let filters = this.batchDataGrid.instance.getCombinedFilter(true);
		// console.log(filters);
		let filterArrays = [];
		let filterProperties = [];
		if (filters) {
			if (this.batchSearchText != null && this.batchSearchText != "") {
				filterArrays = filters[2].filter(itm => typeof itm === 'object' && itm.constructor === Array);
			} else {
				filterArrays = filters.filter(itm => typeof itm === 'object' && itm.constructor === Array);
			}

			if (filterArrays.length == 0) {
				filterProperties.push(filters[0]);
			} else {
				filterArrays.forEach(function (itm) {
					if (!filterProperties.includes(itm[0][0])) {
						filterProperties.push(itm[0][0]);
					}
				});
			}

			this.batchAppliedFilterCount = filterProperties.length;
		} else {
			this.batchAppliedFilterCount = 0;
		}
	}

	batchToggleClearFilters() {
		this.batchShowClearFilters = !this.batchShowClearFilters;
	}

	batchClearGridFilters(e) {
		e.stopPropagation();
		this.batchDataGrid.instance.clearFilter();
		this.batchShowClearFilters = false;
	}

	validateToggleExpanded() {
		this.validateIsExpanded = !this.validateIsExpanded;
	}

	validateShowColumnChooser() {
		this.validateDataGrid.instance.showColumnChooser();
	}

	validateSearchDataGrid(searchText) {
		this.validateSearchText = searchText;
		this.validateDataGrid.instance.searchByText(searchText);
	}

	validateShowFilterBuilder() {
		this.validateFilterBuilderVisible = true;
	}

	validateCalculateAppliedFilterCount(event) {
		let filters = this.validateDataGrid.instance.getCombinedFilter(true);
		// console.log(filters);
		let filterArrays = [];
		let filterProperties = [];
		if (filters) {
			if (this.validateSearchText != null && this.validateSearchText != "") {
				filterArrays = filters[2].filter(itm => typeof itm === 'object' && itm.constructor === Array);
			} else {
				filterArrays = filters.filter(itm => typeof itm === 'object' && itm.constructor === Array);
			}

			if (filterArrays.length == 0) {
				filterProperties.push(filters[0]);
			} else {
				filterArrays.forEach(function (itm) {
					if (!filterProperties.includes(itm[0][0])) {
						filterProperties.push(itm[0][0]);
					}
				});
			}

			this.validateAppliedFilterCount = filterProperties.length;
		} else {
			this.validateAppliedFilterCount = 0;
		}
	}

	validateToggleClearFilters() {
		this.validateShowClearFilters = !this.validateShowClearFilters;
	}

	validateClearGridFilters(e) {
		e.stopPropagation();
		this.validateDataGrid.instance.clearFilter();
		this.validateShowClearFilters = false;
	}

	onToolbarPreparing(e){  
        e.toolbarOptions.visible = false;  
	}
	
	onPortfolioChange(e) {
		this.selectedPortfolio = e[0];
	}

	onViewChanged(e) {
		this.selectedView = e[0];
	}

	onWorkflowChanged(e) {
		this.selectedWorkflowStatus = e[0];
	}

	nextStep(stepper: any) {
		if (stepper.selectedIndex === 0) {
			this.batchSchedules = [];
			this.availableDataGrid.selectedRowKeys.forEach(function (itm) {
				if (!this.batchSchedules.includes(itm)) {
					this.batchSchedules.push(itm);
				}
			}, this);
		}
		stepper.next();
	}

	lastStep(stepper: any) {
		stepper.previous();
	}

	queueForMeasurement() {
		this.confirmModalVisible = !this.confirmModalVisible;
		this.router.navigate(['../'], {relativeTo: this.route } );
	}

	confirmModalToggle() {
		this.confirmModalVisible = !this.confirmModalVisible;
	}

	onSelectionChanged(e) {
        e.component.refresh(true);
	}
	
	calculateSelectedRow(options) {
        if (options.name === "SelectedRowsSummary") {
            if (options.summaryProcess === "start") {
                options.totalValue = 0;
            } else if (options.summaryProcess === "calculate") {
				options.totalValue = options.component.getSelectedRowKeys().length;
            }
        }
    }

    handleOverrideToggleChange(e) {
    	this.overrideParameters = e.checked;
    	if( !e.checked ) {
    		this.parameterOverride.accountingTermBeginDateOverride = null;
			this.parameterOverride.accountingTermEndDateOverride = null;
			this.parameterOverride.commentsOverride = null;
			this.parameterOverride.discountRateOverride = null;
			this.parameterOverride.annualRateOverride = null;
			this.parameterOverride.annualRateTypeOverride = null;
			this.parameterOverride.paymentTimingOverride = null;
			this.parameterOverride.manualAssetAdjustmentOverride = null;
		}
	}
	
	discountRateParameterChange(item, e) {
		this.parameterOverride[item] = e.value;
	}

}