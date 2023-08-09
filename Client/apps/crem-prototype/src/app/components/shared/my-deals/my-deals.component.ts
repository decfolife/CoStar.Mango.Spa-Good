import { Component, OnInit } from '@angular/core';
import { Service, DropdownField } from '../../../app.service';

@Component({
	selector: 'app-my-deals',
	templateUrl: './my-deals.component.html',
	styleUrls: ['./my-deals.component.scss']
})
export class MyDealsComponent implements OnInit {

	isCostarStyle : Boolean = true;
	dashboardViewsDropdown : DropdownField;
	addDealPopupVisible : Boolean = false;

	constructor() { 

	}

	ngOnInit() {
		this.dashboardViewsDropdown = new DropdownField([, { id : 3, value : "Landlord View" }, { id : 4, value : "Landlord Broker View" }, { id : 1, value : "Tenant View" }, { id : 2, value : "Tenant Broker View" }], "id", "value", "View", "dropdown", [2], true, "single", false, false, false);     
	}
	
}
