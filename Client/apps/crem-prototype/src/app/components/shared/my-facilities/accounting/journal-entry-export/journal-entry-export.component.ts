import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField, AccountingMonth, JournalEntry, ClassificationType, AmortizationProfile, JournalEntryProfile, Country, Currency, Hierarchy } from '../../../../../app.service';
import { MatDrawer } from '@angular/material/sidenav';


class ExportFile {
    filename: string;
    data: JournalEntry[];
}

export class HeaderFooter {
    recordCount: number;
    totalDebit : number;
    totalCredit: number;
    
    constructor(recordCount,totalDebit,totalCredit) {
		this.recordCount = recordCount;
		this.totalDebit = totalDebit;
		this.totalCredit = totalCredit;
	}
} 

@Component({
  selector: 'app-journal-entry-export',
  templateUrl: './journal-entry-export.component.html',
  styleUrls: ['./journal-entry-export.component.scss'],
  providers : [Service]
})
export class JournalEntryExportComponent implements OnInit {

	@ViewChild("filterDrawer") filterDrawer: MatDrawer;

 	portfolios : String[];
	periods : AccountingMonth[];
	classificationTypes : ClassificationType[];
	amortizationProfiles : AmortizationProfile[];
	journalEntryProfiles : JournalEntryProfile[];
	countries : Country[];
	currencies : Currency[];
	hierarchies : Hierarchy[];
	files : ExportFile[] = [];
	fileHeader : HeaderFooter[];
	fileFooter : HeaderFooter[];
	filters : DropdownField[];
	
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

	constructor( private service : Service, private router: Router, private route: ActivatedRoute) { 
	}

	ngOnInit() {
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
	
		this.fileHeader = [ new HeaderFooter(156, 10000, 10000) ];
		this.fileFooter = [ new HeaderFooter(156, 10000, 10000) ];
	}

	periodChange(e) {
		this.periodFilter.selected = e;
	}

	applyFilters() {
		this.files = this.service.getJournalEntries( null, null );
		this.filterDrawer.close();
	}

}
