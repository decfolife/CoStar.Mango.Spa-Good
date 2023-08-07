import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

export class CriticalDate {
	propertyName : String;
	address : String;
	city : string;
	spaceType : string;
	criticalDate : String;
	rentableArea : String;
	state : string;
	country : string;
	type : string;	
	leaseId : number;
	clientLeaseId : string;
	leaseStatus : string;
	accountType : string;

	constructor(propertyName, address, city, spaceType, criticalDate, rentableArea, state, country, type, leaseId, clientLeaseId, leaseStatus, accountType ) {
  		this.propertyName = propertyName;
  		this.address = address;	
  		this.city = city;
  		this.spaceType = spaceType;
  		this.criticalDate = criticalDate;
  		this.rentableArea = rentableArea;
  		this.state = state;
  		this.country = country;
  		this.type = type;				
		this.leaseId = leaseId;
		this.clientLeaseId = clientLeaseId;
		this.leaseStatus = leaseStatus;
		this.accountType = accountType;
  	}
}

@Component({
	selector: 'critical-dates-card',
	templateUrl: './critical-dates-card.component.html',
	styleUrls: ['./critical-dates-card.component.scss'],
	providers: [ Service ]
})
export class CriticalDatesCardComponent implements OnInit {

	criticalDates : CriticalDate[];
	isExpanded : Boolean = false;
	durations : DropdownField;
	@ViewChild("CriticalDatesExpirationsGrid") dataGrid: DxDataGridComponent;
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 
		this.durations = new DropdownField([{ value : "Past due 30 days" }, { value : "Next 30 days" }, { value : "Next 90 days" }, { value : "Next 12 months" }], "value", "value", "Select", "dropdown", ["Next 90 days"], true, "single", false, false, false);			
	}

	ngOnInit() {
		this.criticalDates = [			
			new CriticalDate("Charleston", "170 Meeling Street", "Charleston", "Office", "11/30/2020", "250", "SC", "United States", "Renewal Notification End", 100, null, 'Active', 'AP'),
			new CriticalDate("Milwaukee", "411 E Wisconsin Ave", "Milwaukee", "Office", "11/30/2020", "2471", "WI", "United States", "Expiration", 100, null, 'Active', 'AP'),
			new CriticalDate("Adelaide", "70 Light Square", "Adelaide", "Office", "12/31/2020", "250", "South Australia", "Australia", "Purchase Notification Begin", 100, null, 'Active', 'AP'),
			new CriticalDate("Bogata", "11B ## 99-25", "Bogata", "Office", "12/31/2020", "250", "State", "Colombia", "Renewal Notification Begin", 100, null, 'Active', 'AP'),
			new CriticalDate("Charlottesville", "1215 E. Market Street", "Charlottesville", "Office", "12/31/2020", "4400", "VA", "United States", "Renewal Notification Begin", 100, null, 'Active', 'AP'),
			new CriticalDate("Munich", "Herzogspitalstr 24", "Munich", "Office", "12/31/2020", "1", null, "Germany", "Renewal Notification Begin", 100, null, 'Active', 'AP'),
			new CriticalDate("Stamford", "1010 Washington Blvd", "Stamford", "Office", "12/31/2020", "2239", "CT", "United States", "Renewal Notification End", 100, null, 'Active', 'AP'),
			new CriticalDate("Berlin", "Im Römichen Hof, Unter den Linden 10", "Berlin", "Office", "1/22/2021", "1500", null, "Germany", "Renewal Notification End", 100, null, 'Active', 'AP'),
			new CriticalDate("Charlotte", "101 South Tryon Street", "Charlotte", "Office", "1/31/2021", "4114", "NC", "United States", "Security Deposit Return Due", 100, null, 'Active', 'AP'),
			new CriticalDate("Edinburgh", "93 George Street", "Edinburgh", "Office", "2/28/2021", "250", null, "Scotland", "Rent Modification of Account - Base Rent", 100, null, 'Active', 'AP'),
			new CriticalDate("Greensboro", "717 Green Valley Road", "Greensboro", "Office", "2/28/2021", "250", "NC", "United States", "Rent Modification of Account - Base Rent", 100, null, 'Active', 'AP'),
			new CriticalDate("Paris", "82 Avenue Marceau", "Paris", "Office", "2/28/2021", "1991", null, "France", "Rent Modification of Account - Base Rent", 100, null, 'Active', 'AP'),
			new CriticalDate("Madrid", "Calle De Serrano 47", "Madrid", "Office", "3/31/2021", "4162", null, "Spain", "Termination Notification Begin", 100, null, 'Active', 'AP'),
			
		];
	}

	navigateToObject(event) {
		this.router.navigate(['../../lease', event.data.leaseId], {relativeTo: this.route } );			
	} 

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
