import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, TaxHistory, Insurance, AppraisalHistory, FormField, Building } from '../../../../../../app.service';

@Component({
  selector: 'app-my-property-details',
  templateUrl: './my-property-details.component.html',
  styleUrls: ['./my-property-details.component.scss'],
  providers: [Service]
})
export class MyPropertyDetailsComponent implements OnInit {

	formFields : Object[];
	propertyId : Number;
	property : Building;
	taxHistoryData : TaxHistory[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
		this.route.parent.params.subscribe(params => {
			this.propertyId = params['property_id'];

			this.property = this.service.getBuilding(this.propertyId);

			this.service.getTaxHistory().subscribe(results => {
				this.taxHistoryData = results;

				this.formFields = [
					{ 	sectionName : "Property Information",
						class : {
							"col-md-6" : true
						},
						fields : [
							new FormField(1, 'System Building ID', "systemBuildingID", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
							new FormField(21, 'Building Portfolio', "portfolio", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"EQ Portfolio", display: "EQ Portfolio"}, {value:"RE Portfolio", display: "RE Portfolio"}], false, null, null),
							new FormField(3, 'Building Name', "buildingName", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(20, 'Building Hierarchy', "buildingHierarchy", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Europe", display: "Europe"}, {value:"North America", display: "North America"}], false, null, null),
							new FormField(4, 'Address 1', "address1", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(19, 'Ownership Type', "ownershipType", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Leased", display: "Leased"}, {value:"Owned", display: "Owned"}], false, null, null),
							new FormField(5, 'Address 2', "address2", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(17, 'Building Type', "buildingType", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Office", display: "Office"}, {value:"Warehouse", display: "Warehouse"}], false, null, null),
							new FormField(7, 'City', "city", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(17, 'HQ Type', null, 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(8, 'State', "state", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"DC", display: "DC"}, {value:"GA", display: "GA"}], false, null, null),
							new FormField(17, 'Workday ID', "parkingRate", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(9, 'Zip Code', "zipCode", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(17, 'Email Address', "parkingRatio_PerK", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
							new FormField(11, 'Country', "country", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"United States", display: "United States"}, {value:"Italy", display: "Italy"}], false, null, null),
							new FormField(9, 'Submarket', null, 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						]
					},
					{	sectionName : "Property Details",
						class : {
							"col-md-6" : true
						},
						fields : [
							new FormField(25, 'Rentable Area', "buildingRentableArea", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(32, 'Purchase Price', "purchasePrice", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(26, 'Usable Area', "buildingUsableArea", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(33, 'Construction Type', "constructionType", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Reinforced Concrete", display: "Reinforced Concrete"}], false, null, null),
							new FormField(28, 'Land Size', "landSize_Acres", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(35, 'Market Rent', "marketRent_PSF_YR", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(29, 'Annual Op Ex', "annualOpEx", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(36, 'Parking Rate', null, 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(30, 'Annual Taxes', "annualTaxes", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(37, 'Parking Ratio', null, 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(31, 'Year Built', "yearBuilt", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(38, 'Latitude', "latitude", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
							new FormField(27, 'Measure Units', "buildingMeasureUnits", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"SF", display: "SF"}], false, null, null),
							new FormField(39, 'Longitude', "longitude", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						]
					},
					{ 	sectionName : "Tax History",
						class : {
							"col-md-12" : true
						},
						isTableData : true,
						allowEditing: true,
						allowAdding: true,
						// data : this.service.getTaxHistory(),
						data : this.taxHistoryData,
						columns : [
							{ dataField : "id",
								alignment : "left",
								visible : false,
								allowEditing : false,
								dataType : "number",
								precision : 0
							},
							{ dataField : "taxYear",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0
							},
							{ dataField : "assessedValue",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0
							},
							{ dataField : "taxAmount",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0
							}
						]
					},
					{	sectionName : "Appraisal History",
						class : {
							"col-md-12" : true
						},
						isTableData : true,
						allowEditing: true,
						allowAdding: true,
						data : this.service.getAppraisalHistory(),
						columns : [
							{ dataField : "id",
								alignment : "left",
								visible : false,
								allowEditing : false,
								dataType : "number",
								precision : 0
							},
							{ dataField : "appraisalDate",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "date",
								precision : 0
							},
							{ dataField : "appraisalValue",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0
							},
							{ dataField : "appraisalFee",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0
							},
							{ dataField : "appraisalCompany",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0,
								caption: "Company"
							},
							{ dataField : "appraisalCurrency",
								alignment : "center",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0,
								caption: "Currency"
							},
							{ dataField : "notes",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0
							}
						]
					},
					{	sectionName : "Insurance",
						class : {
							"col-md-12" : true
						},
						isTableData : true,
						allowEditing: true,
						allowAdding: true,
						data : this.service.getInsurance(),
						columns : [
							{ dataField : "id",
								alignment : "left",
								visible : false,
								allowEditing : false,
								dataType : "number",
								precision : 0
							},
							{ dataField : "date",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "date",
								precision : 0
							},
							{ dataField : "premiumClassification",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0
							},
							{ dataField : "buildingInsurableValue",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0,
								caption: "Building"
							}
							,
							{ dataField : "contentsInsurableValue",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0,
								caption: "Contents"
							},
							{ dataField : "inventoryInsurableValue",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0,
								caption: "Inventory"
							},
							{ dataField : "businessInterruptionValue",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0,
								caption: "Business Interruption"
							},
							{ dataField : "totalInsurableValue",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0,
								caption: "Total"
							},
							{ dataField : "additionalReinsurance",
								alignment : "right",
								visible : true,
								allowEditing : true,
								dataType : "number",
								precision : 0
							},
							{ dataField : "policyExpirationDate",
								alignment : "center",
								visible : true,
								allowEditing : true,
								dataType : "date",
								precision : 0,
								caption: "Expiration"
							},
							{ dataField : "policyNumber",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0
							},
							{ dataField : "insuranceCompany",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0
							},
							{ dataField : "insuranceOccupancy",
								alignment : "left",
								visible : true,
								allowEditing : true,
								dataType : "string",
								precision : 0,
								caption: "Occupancy"
							}
						]
					}
				];
			});
		});
	}
}
