import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AccountingMonth, JournalEntry, ClassificationType, AmortizationProfile, JournalEntryProfile, Country, Currency, Hierarchy, AmortizationPeriodApproval } from '../../../../../app.service';
import { MatDrawer } from '@angular/material/sidenav';
import { DxDataGridComponent } from "devextreme-angular";
import notify from 'devextreme/ui/notify';

@Component({
	selector: 'app-journal-entry-reverse',
	templateUrl: './journal-entry-reverse.component.html',
	styleUrls: ['./journal-entry-reverse.component.scss'],
	providers : [Service]
})
export class JournalEntryReverseComponent implements OnInit {

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
	jeStatusFilter : any;

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

		this.jeStatusFilter = {
			data : [{ status: "Approved"}, { status: "Exported"}],
			valueExpr : "status",
			displayExpr : "status",
			placeholder : "JE Status",	
			controlType : "single-select",
			selected : [],		
		};

		this.periodFilter = {
			data : this.periods,
			valueExpr : "period",
			displayExpr : "periodName",
			placeholder : "Period",	
			controlType : "multi-select",
			selected : [],		
		};

		this.classificationTypeFilter = {
			data : this.classificationTypes,
			valueExpr : "id",
			displayExpr : "classificationType",
			placeholder : "Classification Type",	
			controlType : "multi-select",
			selected : [],				
		};

		this.amortizationProfileFilter = {
			data : this.amortizationProfiles,
			valueExpr : "id",
			displayExpr : "name",
			placeholder : "Amortization Profile",	
			controlType : "multi-select",
			selected : [],				
		};

		this.jeProfileFilter = {
			data : this.journalEntryProfiles,
			valueExpr : "id",
			displayExpr : "name",
			placeholder : "Journal Entry Profile",	
			controlType : "multi-select",
			selected : [],				
		};

		this.countryFilter = {
			data : this.countries,
			valueExpr : "id",
			displayExpr : "name",
			placeholder : "Country",	
			controlType : "multi-select",
			selected : [],				
		};

		this.currencyFilter = {
			data : this.currencies,
			valueExpr : "id",
			displayExpr : "currency",
			placeholder : "Currency",	
			controlType : "multi-select",
			selected : [],				
		};

		this.hierarchyFilter = {
			data : this.hierarchies,
			valueExpr : "id",
			displayExpr : "name",
			placeholder : "Hierarchy",	
			controlType : "hierarchy",
			selected : [],					
		}

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

	reverse() {
		notify({
			message : this.selectedPeriods.length.toString() + " journal entries reversed successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}

}
