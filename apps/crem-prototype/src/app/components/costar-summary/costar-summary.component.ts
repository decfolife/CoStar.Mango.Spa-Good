import { Component, OnInit } from '@angular/core';
import { Service, FormField } from '../../app.service';

@Component({
  selector: 'app-costar-summary',
  templateUrl: './costar-summary.component.html',
  styleUrls: ['./costar-summary.component.scss'],
  providers: [Service]
})
export class CostarSummaryComponent implements OnInit {

	formFields : Object[];

  	constructor( service : Service ) {
		this.formFields = [
			{ 	sectionName : "Building",
				class : {
					"col-md-6" : true
				},
				fields : [
					new FormField(1, 'System Building ID', '881', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(2, 'Client Building ID', 'GA-AT-05', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(3, 'Building Name', 'Phipps Tower', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(4, 'Address 1', '3438 Peachtree Road', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(5, 'Address 2', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(6, 'Address 3', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(7, 'City', 'Atlanta', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(8, 'State', 'GA', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(9, 'Zip Code', '30326', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(10, 'County', 'Fulton', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(11, 'Country', 'United States', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(12, 'Region 1', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(13, 'Region 2', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(14, 'Region 3', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(15, 'Office ID', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(16, 'Region Code', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(17, 'Building Type', 'Office', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(18, 'Building Email', 'b881@blank.costarremail.com', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(19, 'Building Ownership Type', 'Leased', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(20, 'Building Class', 'A', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(21, 'Floorplans', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
				]
			},
			{	sectionName : "Demographics",
				class : {
					"col-md-6" : true
				},
				fields : [
					new FormField(25, 'Rentable Area', '9,875', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(26, 'Usable Area', '9,500', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(27, 'Measure Units', 'SF', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(28, 'Land Size', '1.2', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(29, 'Annual Op Ex', '$125,750.00', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(30, 'Annual Taxes', '$13,250.00', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(31, 'Year Built', '2010', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(32, 'Purchase Price', '$18,600,000.00', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(33, 'Construction Type', 'Concrete', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(34, 'Currency', 'United States Dollar (USD)', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(35, 'Market Rent', '$18.00', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(36, 'Parking Rate', '$35.00', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(37, 'Parking Ratio', '5,200.00', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(38, 'Latitude', '33.849523', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(39, 'Longitude', '-84.364700', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(40, 'Geocode Latitude', '33.865103', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(41, 'Geocode Longitude', '-84.336592', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(42, 'Energy Star Rating', '62', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
					new FormField(43, 'Purchase Date', '', 'input', '', '', '', '', '', null, '', '', '', '', '', '', null, '', [], false, null, null),
				]
			},

		];

	}

	ngOnInit() {
	}

}
