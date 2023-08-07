import { OnInit, Component, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../../../app.service';
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

export class DashboardHero {    
	title: string;
	hero : string;
	sidekick : string;
	subtitle : string;
	helpText : string;
	visible : boolean;

	constructor(title,hero,sidekick,subtitle,helpText,visible) {    
		this.title = title; 
		this.hero = hero;
		this.sidekick = sidekick;
		this.subtitle = subtitle;
		this.helpText = helpText;
		this.visible = visible;
	}
}

@Component({
	selector: 'my-deals-dashboard',
	templateUrl: './my-deals-dashboard.component.html',
	styleUrls: ['./my-deals-dashboard.component.scss'],
	providers: [Service]
})
export class MyDealsDashboardComponent implements OnInit {

	cards : DashboardCard[];	
	filters : DropdownField[];
	heros : DashboardHero[];
	settingsModalVisible : Boolean = false;
	settingsTabs : Object[];
	addDealPopupVisible : Boolean = false;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		
		this.filters = [				
			new DropdownField([{ id : 1, value : "Verizon" }, { id : 2, value : "Salesforce" }, { id : 3, value : "Oracle" }, { id : 4, value : "Apple" }, { id : 5, value : "Torchy's Tacos" }, { id : 6, value : "Bank of America" }, { id : 7, value : "Truist" }], "id", "value", "Client", "dropdown", [3], true, "single", true, true, false),			
			new DropdownField([{ value : "Jim Halpert" }, { value : "Dwight Schrute" }, { value : "Michael Scott" }, { value : "Pam Beesly" }], "value", "value", "Broker", "dropdown", [], true, "multiple", true, true, true),			
			new DropdownField([{ value : "Office" }, { value : "Land" }, { value : "Retail" }, { value : "Warehouse" }], "value", "value", "Property Type", "dropdown", [], true, "multiple", true, true, true),				
			new DropdownField([{ value : "New" }, { value : "Tour" }, { value : "Proposal" }, { value : "LOI" }], "value", "value", "Deal Status", "dropdown", [], true, "multiple", true, true, true),				
			new DropdownField([{ value : "Atlanta" }, { value : "Boston" }, { value : "DC" }, { value : "San Francisco" }], "value", "value", "Market", "dropdown", [], true, "multiple", true, true, true),			
			new DropdownField([{ value : "Buckhead" }, { value : "CBD" }, { value : "Midtown" }, { value : "Financial District" }], "value", "value", "Sub Market", "dropdown", [], true, "multiple", true, true, true),			
		];

		this.heros = [
			new DashboardHero('Active Deals', "80", "+4", "", "There are currently 80 active deals. In the last 30 days, 10 new deals were added and 6 deals were closed.", true),
			new DashboardHero('Net Effective Rent', "$35.49", null, "Average", "The current average net effective rent per SF for active deals is $35.49 USD.", true),
			new DashboardHero('Square Footage', "9K - 38K", null, "Average", "The average target SF per active deal is 9,135 - 37,984.  The min SF is 4,000 and the max SF is 96,000", true),
			new DashboardHero('Commission', "$48.6 MM", "", "Estimated", "The total estimated commission for active deals is $48,592,157.32", true),
			new DashboardHero('Total Lease Value', "$34.2 B", null, "", "The total lease value for active deals is $34,234,986,451.98", true),
			new DashboardHero('Closed Deals', "6", null, "Last 30 days", "6 deals were closed in the last 30 days.", true),
			
		];

		this.cards = [
			new DashboardCard("DealActionRequiredCardComponent", 1, true, "Action Required"),					
			new DashboardCard("RecentDealActivityCardComponent", 1, true, "Recent Deal Activity"),							
			new DashboardCard("DealCountByBrokerCardComponent", 1, true, "Deal Count by Broker"),
			new DashboardCard("DealCountChartCardComponent", 1, true, "Deal Count (by stage and type)"),
			new DashboardCard("DealCountByMarketCardComponent", 2, true, "Deal Count by Market"),
			new DashboardCard("ClosedDealsCardComponent", 2, true, "Recently Closed Deals"),
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

	handleToggleChange(e, elementType) {
		// console.log(e);
		// console.log(elementType);
		// console.log(this[elementType]);
		let element;
		if( elementType == "filters" ){
			element = this[elementType].find(itm => itm.placeholder == e.source.name);	
		} else {
			element = this[elementType].find(itm => itm.title == e.source.name);
		}
		// console.log(element);
		element.visible = e.checked;
	}

	launchAddDealModal() {
		this.addDealPopupVisible = true;
	}

	saveDeal(e) {
		console.log("saving the deal!");
		this.addDealPopupVisible = false;
	}

	cancelAddDeal(e) {
		console.log("cancelling adding the deal!");	
		this.addDealPopupVisible = false;
	}
	
}
