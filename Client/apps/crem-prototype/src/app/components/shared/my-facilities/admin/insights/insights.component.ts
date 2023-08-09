import { OnInit, Component, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../../../../app.service';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { DxPopupComponent } from "devextreme-angular";

export class DashboardCard {    
    componentName: string;
    colSpan : number;
    visible : boolean;
    title : string;

    constructor(componentName,colSpan,visible,title) {		
		this.componentName = componentName;	
		this.colSpan = colSpan;
		this.visible = visible;
		this.title = title;
	}
}

@Component({
	selector: 'insights',
	templateUrl: './insights.component.html',
	styleUrls: ['./insights.component.scss'],
	providers: [Service]
})
export class InsightsComponent implements OnInit {

	filters : DropdownField[];
	cards : DashboardCard[];
	settingsModalVisible : Boolean = false;

	constructor() { }

	ngOnInit() {
		this.filters = [	
			new DropdownField([], null, null, "Portfolio", "portfolio", [], true, null, true, false, true),
			new DropdownField([{ id : 1, value : "2021 - Q1" }, { id : 2, value : "2020 - Q4" }, { id : 3, value : "2020 - Q3" }, { id : 4, value : "2020 - Q2" }, { id : 5, value : "2020 - Q1" }, { id : 6, value : "2019 - Q4" }, { id : 7, value : "2019 - Q3" }], "id", "value", "Quarter", "dropdown", ["2021 - Q1"], true, "single", true, true, true),						
			new DropdownField([{ value : "EUR" }, { value : "GBP" }, { value : "HKD" }, { value : "USD" }], "value", "value", "Currency", "dropdown", ["USD"], true, "single", true, true, true),			
		];

		this.cards = [
			new DashboardCard("RealEstateCountsInsightsComponent", 1, true, "Real Estate Counts"),			
			new DashboardCard("NonRealEstateCountsInsightsComponent", 1, true, "Non Real Estate Counts"),						
			new DashboardCard("RealEstateFinanceApCardComponent", 1, true, "Real Estate Financials - AP"),			
			new DashboardCard("NonRealEstateFinanceApCardComponent", 1, true, "Non Real Estate Financials - AP"),	
			new DashboardCard("RealEstateFinanceApChartCardComponent", 2, true, "Financial Trends - AP"),			
			// new DashboardCard("NonRealEstateFinanceApChartCardComponent", 1, true, "Non Real Estate Financial Trends - AP"),			
			new DashboardCard("RealEstateFinanceArCardComponent", 1, true, "Real Estate Financials - AR"),			
			new DashboardCard("NonRealEstateFinanceArCardComponent", 1, true, "Non Real Estate Financials - AR"),			
			new DashboardCard("RealEstateFinanceArChartCardComponent", 2, true, "Financial Trends - AR"),			
			// new DashboardCard("NonRealEstateFinanceArChartCardComponent", 1, true, "Non Real Estate Financial Trends - AR"),			
			new DashboardCard("RealEstateAccountingCardComponent", 1, true, "Real Estate Accounting"),			
			new DashboardCard("NonRealEstateAccountingCardComponent", 1, true, "Non Real Estate Accounting"),	
			new DashboardCard("AccountingBalanceChartCardComponent", 2, true, "Accounting Balance Trends"),	
			new DashboardCard("AccountingEventChartCardComponent", 2, true, "Accounting Event Trends"),	
			new DashboardCard("ActiveUsersCardComponent", 1, true, "Active Users"),			
			new DashboardCard("CustomerSupportCardComponent", 1, true, "Customer Support"),			
			new DashboardCard("FileUsageChartCardComponent", 2, true, "File Storage Trends"),	
		];	
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
	}	

	launchSettingsModal() {
		this.settingsModalVisible = true;
	}

	settingsModalCancel() {
		this.settingsModalVisible = false;
	}

}
