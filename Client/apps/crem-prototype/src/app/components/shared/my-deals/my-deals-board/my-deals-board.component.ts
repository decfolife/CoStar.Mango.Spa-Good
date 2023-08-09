import { Component, OnInit } from '@angular/core';
import { Service, DropdownField } from '../../../../app.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
	selector: 'my-deals-board',
	templateUrl: './my-deals-board.component.html',
	styleUrls: ['./my-deals-board.component.scss'],
	providers: [Service]
})
export class MyDealsBoardComponent implements OnInit {

	dealStages : Array<any>;
	filters : DropdownField[];
	addDealPopupVisible : Boolean = false;

	constructor() { }

	ngOnInit() {
		this.dealStages = [
			{ stageName: "RFI", deals: [
				{ dealName : "Deal A"},
				{ dealName : "Deal B"},
				{ dealName : "Deal C"},
				{ dealName : "Deal D"},
				{ dealName : "Deal E"},
				{ dealName : "Deal F"},
				{ dealName : "Deal G"},
				{ dealName : "Deal H"},
				{ dealName : "Deal I"},
			] },
			{ stageName: "Tour", deals: [
				{ dealName : "Deal J"},
				{ dealName : "Deal K"},
				{ dealName : "Deal L"},
				{ dealName : "Deal M"},
				{ dealName : "Deal N"},
			] },
			{ stageName: "RFP", deals: [
				{ dealName : "Deal O"},
				{ dealName : "Deal P"},
				{ dealName : "Deal Q"},
				{ dealName : "Deal R"},
				{ dealName : "Deal S"},
			] },
			{ stageName: "Proposal", deals: [
				{ dealName : "Deal T"},
				{ dealName : "Deal U"},
				{ dealName : "Deal V"},
				{ dealName : "Deal W"},
				{ dealName : "Deal X"},
			] },
			{ stageName: "LOI", deals: [
				{ dealName : "Deal Y"},
				{ dealName : "Deal Z"},
				{ dealName : "Deal 1"},
				{ dealName : "Deal 2"},
				{ dealName : "Deal 3"},
			] },
		];

		this.filters = [				
			new DropdownField([{ id : 1, value : "Verizon" }, { id : 2, value : "Salesforce" }, { id : 3, value : "Oracle" }, { id : 4, value : "Apple" }, { id : 5, value : "Torchy's Tacos" }, { id : 6, value : "Bank of America" }, { id : 7, value : "Truist" }], "id", "value", "Client", "dropdown", [3], true, "single", true, true, false),			
			new DropdownField([{ value : "Jim Halpert" }, { value : "Dwight Schrute" }, { value : "Michael Scott" }, { value : "Pam Beesly" }], "value", "value", "Broker", "dropdown", [], true, "multiple", true, true, true),			
			new DropdownField([{ value : "Office" }, { value : "Land" }, { value : "Retail" }, { value : "Warehouse" }], "value", "value", "Property Type", "dropdown", [], true, "multiple", true, true, true),				
			new DropdownField([{ value : "New" }, { value : "Tour" }, { value : "Proposal" }, { value : "LOI" }], "value", "value", "Deal Status", "dropdown", [], true, "multiple", true, true, true),				
			new DropdownField([{ value : "Atlanta" }, { value : "Boston" }, { value : "DC" }, { value : "San Francisco" }], "value", "value", "Market", "dropdown", [], true, "multiple", true, true, true),			
			new DropdownField([{ value : "Buckhead" }, { value : "CBD" }, { value : "Midtown" }, { value : "Financial District" }], "value", "value", "Sub Market", "dropdown", [], true, "multiple", true, true, true),			
		];
	}

	drop(event: CdkDragDrop<string[]>) {
	    if (event.previousContainer === event.container) {
	      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	    } else {
	      transferArrayItem(event.previousContainer.data,
	                        event.container.data,
	                        event.previousIndex,
	                        event.currentIndex);
		}
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



