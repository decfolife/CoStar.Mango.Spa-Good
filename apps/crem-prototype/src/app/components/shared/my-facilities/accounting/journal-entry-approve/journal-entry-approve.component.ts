import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField, AccountingMonth, JournalEntry, ClassificationType, AmortizationProfile, JournalEntryProfile, Country, Currency, Hierarchy, AmortizationPeriodApproval } from '../../../../../app.service';
import { MatDrawer } from '@angular/material/sidenav';
import { DxDataGridComponent } from "devextreme-angular";
import notify from 'devextreme/ui/notify';

@Component({
	selector: 'app-journal-entry-approve',
	templateUrl: './journal-entry-approve.component.html',
	styleUrls: ['./journal-entry-approve.component.scss'],
	providers : [Service]
})
export class JournalEntryApproveComponent implements OnInit {

	@ViewChild("filterDrawer") filterDrawer: MatDrawer;
	@ViewChild("periodsGrid") dataGrid : DxDataGridComponent;
	selectedString : string;
	selectedPeriods : AmortizationPeriodApproval[] = [];

 	portfolios : String[];
	periods : AccountingMonth[];
	classificationTypes : ClassificationType[];
	amortizationProfiles : AmortizationProfile[];
	journalEntryProfiles : JournalEntryProfile[];
	countries : Country[];
	currencies : Currency[];
	hierarchies : Hierarchy[];
	
	hasCustomHeader : Boolean = true;
	hasCustomFooter : Boolean = true;

	periodFilter : any;
	classificationTypeFilter : any;
	amortizationProfileFilter : any;
	jeProfileFilter : any;
	countryFilter : any;
	currencyFilter : any;
	hierarchyFilter : any;
	workflowFilter : any;
	filters : DropdownField[];

	approvalPeriods : AmortizationPeriodApproval[] = [];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute) { 
	}

	ngOnInit() {
		this.portfolios = ['Acme', 'FASCO'];
		this.periods = this.service.getAllAccountingMonths();
		this.classificationTypes = this.service.getClassificationTypes();
		this.amortizationProfiles = this.service.getAmortizationProfiles();
		this.journalEntryProfiles = this.service.getJournalEntryProfiles();
		this.countries = this.service.getCountries();
		this.currencies = this.service.getCurrencies();
		this.hierarchies = this.service.getPortfolioHierarchy(1);

		this.filters = [
			// items,valueExpr,displayExpr,placeholder,controlType,selected,visible,selectMode,showColumnHeader,showSearchRow
			new DropdownField(this.periods, "period", "periodName", "Period", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField(this.classificationTypes, "id", "classificationType", "Classification Type", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField(this.amortizationProfiles, "id", "name", "Amortization Profile", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField(this.journalEntryProfiles, "id", "name", "Journal Entry Profile", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField(this.countries, "id", "name", "Country", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField(this.currencies, "id", "currency", "Currency", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField(this.hierarchies, "id", "name", "Hierarchy", "hierarchy", [], true, null, null, null, true),
		];

		this.selectedString = "0 records selected";
	}

	periodChange(e) {
		this.periodFilter.selected = e;
	}

	applyFilters() {
		this.approvalPeriods = this.service.getAmortizationPeriodApprovals();
		this.filterDrawer.close();
	}

	selectedPeriodsChanged(e) {
		let selected = this.dataGrid.instance.getSelectedRowKeys();
		if( selected.length == 1 ) {
			this.selectedString = "1 record selected";
		} else {
			this.selectedString = selected.length.toString() + " records selected";
		}

		this.selectedPeriods = selected;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	approve() {
		notify({
			message : this.selectedPeriods.length.toString() + " records approved successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

	preview() {
		
	}

}
