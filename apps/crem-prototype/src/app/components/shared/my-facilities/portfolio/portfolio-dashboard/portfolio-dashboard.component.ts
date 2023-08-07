import { OnInit, Component, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField, DashboardHero, DashboardCard  } from '../../../../../app.service';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'portfolio-dashboard',
	templateUrl: './portfolio-dashboard.component.html',
	styleUrls: ['./portfolio-dashboard.component.scss'],
	providers: [Service]

})
export class PortfolioDashboardComponent implements OnInit {

	cards : DashboardCard[];
	filters : DropdownField[];
	heros : DashboardHero[];
	settingsModalVisible : Boolean = false;
	settingsTabs : Object[];
	addWizards : Array<any>;

	selectedCurrency : string = 'USD';
	currencies : DropdownField;
	selectedUnitOfMeasure : string = 'SF';
	unitsOfMeasure : DropdownField;

  // Add Building
  addBuildingModalVisible: Boolean = false;
  countries : Array<string>;
  pdsProperties : Array<any>;
  lookupDisabled : boolean = true;
  saveDisabled : boolean = true;
  showResultsVisible : boolean = false;
  selectedBuilding : number;
  namePattern: any = /^[^0-9]+$/;
  zipPattern: any = /^\d{5}(?:[-\s]\d{4})?$/;
  addBuildingData: Object = {
    portfolioTemplate: String,
    BuildingName : String,
    Address : String,
    Country : String,
    City : String,
    State : String,
    ZipCode : Number,
  };

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
		this.currencies = new DropdownField([{ value : "EUR" }, { value : "GBP" }, { value : "HKD" }, { value : "USD" }], "value", "value", "Currency", "dropdown", [this.selectedCurrency], true, "single", false, false, false),
		this.unitsOfMeasure = new DropdownField([{ value : "SF" }, { value : "SM" }], "value", "value", "Currency", "dropdown", [this.selectedUnitOfMeasure], true, "single", false, false, false),

		this.filters = [
			new DropdownField([], null, null, "Portfolio", "portfolio", [], true, null, true, false, true),
			new DropdownField([], null, null, "Hierarchy", "hierarchy", [], true, null, null, null, true),
			new DropdownField([{ id : 1, value : "Canada" }, { id : 2, value : "China" }, { id : 3, value : "France" }, { id : 4, value : "Hong Kong" }, { id : 5, value : "Italy" }, { id : 6, value : "Spain" }, { id : 7, value : "United States" }], "id", "value", "Country", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField([{ value : "Real Estate" }, { value : "Equipment" }], "value", "value", "Lease Template", "dropdown", [], true, "multiple", true, true, true),
			new DropdownField([{ value : "Office" }, { value : "Retail" }, { value : "Warehouse" }], "value", "value", "Space Use", "dropdown", [], false, "multiple", true, false, true),
			new DropdownField([{ value : "AP" }, { value : "AR" }], "value", "value", "Account Type", "dropdown", [], true, "multiple", true, false, true),
			new DropdownField([{ value : "Active" }, { value : "Inactive" }, { value : "Pending" }, { value : "Terminated" }], "value", "value", "Lease Status", "dropdown", [], true, "multiple", true, false, true),
		];

		this.heros = [
			new DashboardHero('Active Leases', "80", "+4", "1.03 MM SF", "There are currently 80 active leases in the RE Portfolio. In the last 180 days, 4 new leases were added and 0 leases expired or were terminated.", true),
			new DashboardHero('AP Rent / SF', "$35.49", null, "$36.6 MM / 1.03 MM SF", "The current average rent per SF in the RE Portfolio is $35.49 USD. This is calculated from the current annual total obligation of $36,602,761.84 USD divided by the rentable area of 1,031,280 SF.", true),
			new DashboardHero('AR Rent / SF', "$36.84", null, "$11.4 MM / 311 K SF", "The current average rent per SF in the RE Portfolio is $36.84 USD. This is calculated from the current annual total obligation of $11,443,889.04 USD divided by the rentable area of 310,607 SF.", false),
			// new DashboardHero('Avg SF / Seat', "227", null, null, "The average SF per seat in the RE Portfolio is 227 SF.  This calculated from the 1,031,280 SF divided by the 4,553 total seats.", true),
			// new DashboardHero('Utilization', "83%", "+6%", null, "Utilization is up 6% to 83% over the prior year utilization.", true),
			new DashboardHero('Expirations', "46", null, "Next 24 months", "46 expirations in the next 24 months.", true),
			new DashboardHero('Critical Dates', "13", null, "Next 90 days", "13 critical dates in the next 90 days.", true),
			// new DashboardHero('Unverified Leases', "7", null, "", "7 unverified leases.", true),
			// new DashboardHero('Available Seats', "774", null, "4,553 Total Seats", "774 seats of 4,553 total seats are available across the RE Portfolio.", true),
			new DashboardHero('Avg Rem Term', "2.7", null, "Years", "The average remaining term across the RE Portfolio is 2.7 years.", true),
			new DashboardHero('AP Rem Obligation', "207 MM", null, "USD", "The remaining AP obligation is $207,070,746.96 USD", true),
			new DashboardHero('AR Rem Obligation', "33 MM", null, "USD", "The remaining AR obligation is $33,025,452.60 USD", false),
		];

		this.cards = [
			new DashboardCard("FinancialLinksCardComponent", 1, true, "Financials & Accounting"),
			new DashboardCard("QuarterlyExpirationsCardComponent", 1, true, "Lease Expirations (by quarter, next 12 quarters)"),
			new DashboardCard("UpcomingExpirationsCardComponent", 2, true, "Upcoming Lease Expirations (12 months)"),
			new DashboardCard("BuildingtypeCardComponent", 1, true, "Building Type"),
			new DashboardCard("AnnualExpirationRentCardComponent", 1, true, "Annual Expiration Rent Value"),
			new DashboardCard("CriticalDatesCardComponent", 2, true, "Critical Dates"),
			new DashboardCard("NewLeasesCardComponent", 2, true, "New Leases"),
			new DashboardCard("ArchivedLeasesCardComponent", 2, true, "Recently Archived Leases"),
			new DashboardCard("OwnershipTypeCardComponent", 1, true, "Ownership Type"),
			new DashboardCard("BuildingStateCardComponent", 1, true, "Buildings by State"),
			// new DashboardCard("UnverifiedLeasesCardComponent", 2, true, "Unverified Leases"),
			// new DashboardCard("StoreFormatCardComponent", 1, true, "Store by Format"),
			// new DashboardCard("LeaseCountByHierarchyCardComponent", 1, true, "Lease Count by Hierarchy"),
			// new DashboardCard("UtilizationCardComponent", 1, true, "Utilization (YoY)"),
			// new DashboardCard("RentPsfCardComponent", 1, true, "Rent per SF (YoY)"),
			// new DashboardCard("SfPerSeatCardComponent", 1, true, "SF per Seat (YoY)"),
			new DashboardCard("ActivityFeedCardComponent", 2, true, "Activity Feed"),
		];

    /*
     * Building Popup: Functions
     */
    this.countries = this.service.getCountries().map( c => c.name );
    this.pdsProperties = this.service.getPdsProperties();
		this.addWizards = [
			{	name : "Building", eventName: 'addBuilding' },
			{	name : "Equipment Lease" },
			{	name : "Lease" },
			{	name : "Supplier" },
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

	goToPhipps() {
		this.router.navigate(['../../property', 682], {relativeTo: this.route } );
	}

	handleToggleChange(e, elementType) {
		let element;
		if( elementType == "filters" ){
			element = this[elementType].find(itm => itm.placeholder == e.source.name);
		} else {
			element = this[elementType].find(itm => itm.title == e.source.name);
		}
		element.visible = e.checked;
	}

  /*
   * Modal Management: For opening & different popups
   */
	popupManagement(eventName: String): void {
    if( eventName === 'addBuilding') this.addBuildingModalVisible = !this.addBuildingModalVisible;
	}

  /*
   * Building Popup: Functions
   */
  onFieldDataChanged(e) {
    let result = e.component.validate();
    if (result.brokenRules.length === 0 && result.validators.length >= 1) {
        this.lookupDisabled = false;
    }
  }

  lookupAddress(): void {
    this.showResultsVisible = true;
  }
  selectAddress(e): void {
    this.saveDisabled = false;
  }

	cancelAddBuilding(): void {
    this.addBuildingModalVisible = !this.addBuildingModalVisible;
    // TODO: Clear fields when cancel
	}
  saveBuilding(): void {
    this.addBuildingModalVisible = !this.addBuildingModalVisible;
    this.selectedBuilding = null;
    this.router.navigate(['/costar/facilities/portfolio/property/682/mydetails']);
    // TODO: Clear fields when save
  }

}
