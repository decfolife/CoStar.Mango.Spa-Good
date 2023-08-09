import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

export class Expiration {
	propertyName : String;
	address : String;
	submarket : String;
	type : String;
	expDate : String;
	rentableArea : String;
	rentPerSf : String;
	avgSubmarketRent : String;
	rentVsMarket : String;
	sfPerSeat : String;
	leaseId : number;
	city : string;
	state : string;
	country : string;
	quarter : string;
	annualRent : number;
	clientLeaseId : string;
	leaseStatus : string;
	accountType : string;

	constructor(propertyName, address, submarket, type, expDate, rentableArea, rentPerSf, avgSubmarketRent, rentVsMarket, sfPerSeat, leaseId, city, state, country, quarter, annualRent, clientLeaseId, leaseStatus, accountType ) {
  		this.propertyName = propertyName;
  		this.address = address;
		this.submarket = submarket;
		this.type = type;
		this.expDate = expDate;
		this.rentableArea = rentableArea;
		this.rentPerSf = rentPerSf;		
		this.avgSubmarketRent = avgSubmarketRent;
		this.rentVsMarket = rentVsMarket;
		this.sfPerSeat = sfPerSeat;
		this.leaseId = leaseId;
		this.city = city;
		this.state = state;
		this.country = country;
		this.quarter = quarter;
		this.annualRent = annualRent;
		this.clientLeaseId = clientLeaseId;
		this.leaseStatus = leaseStatus;
		this.accountType = accountType;
  	}
}

@Component({
	selector: 'upcoming-expirations-card',
	templateUrl: './upcoming-expirations-card.component.html',
	styleUrls: ['./upcoming-expirations-card.component.scss'],
	providers: [ Service ]
})
export class UpcomingExpirationsCardComponent implements OnInit {

	upcomingExpirations : Expiration[];
	isExpanded : Boolean = false;
	@ViewChild("UpcomingExpirationsGrid") dataGrid: DxDataGridComponent;
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.upcomingExpirations = [			
			// new Expiration("3000 Town Center", "CBD Submarket", "Office", "5/31/2020", "4815", "20.53", "$35.00fs", "47%", "192"),
			// new Expiration("1215 E. Market Street", "CBD Submarket", "Office", "6/30/2020", "4400", "12.87", "$35.00fs", "47%", "192"),			
			// new Expiration("14205 SE 36th Street", "CBD Submarket", "Office", "7/31/2020", "2951", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("717 Green valley Road", "CBD Submarket", "Office", "8/31/2020", "250", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("3161 Michelson Drive", "CBD Submarket", "Office", "8/31/2020", "16880", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("10200 Forest Green Blvd", "CBD Submarket", "Office", "9/30/2020", "250", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("424 Church Street", "CBD Submarket", "Office", "9/30/2020", "3374", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("885 West Georgia Street", "CBD Submarket", "Office", "9/30/2020", "1", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("3514 Vancouver Ave", "CBD Submarket", "Office", "10/31/2020", "7349", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("411 E Wisconsin Ave", "CBD Submarket", "Office", "11/30/2020", "2471", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("1010 Washington Blvd", "CBD Submarket", "Office", "12/31/2020", "2239", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("101 South Tyron Street", "CBD Submarket", "Office", "1/31/2021", "4114", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("82 Avenue Marceau", "CBD Submarket", "Office", "2/28/2021", "1991", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("Edinburgh", "CBD Submarket", "Office", "2/28/2021", "1", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("Calle De Serrano 47", "CBD Submarket", "Office", "3/31/2021", "4162", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("222 SW Columbia Street", "CBD Submarket", "Office", "4/30/2021", "3340", "35.23", "$35.00fs", "47%", "295"),
			// new Expiration("33 Arch Street", "CBD Submarket", "Office", "5/31/2021", "25200", "35.23", "$35.00fs", "47%", "295"),

			new Expiration("Kansas City", "4801 Main Street", "CoStar", "", "7/31/2021", 5964.00, 17.94, "", "", "", "281", "Kansas City", "MO", "United States", "2021 - Q3", 106979.25, null, "Active", "AP"),
			new Expiration("New York", "1177 Avenue of the Americas", "CoStar", "Office", "7/31/2021", 11644.00, 47.83, "", "", "", "116", "New York", "NY", "United States", "2021 - Q3", 556971.31, null, "Active", "AP"),
			new Expiration("Salt Lake City", "215 South State Street", "CoStar", "", "7/31/2021", 2643.00, 16.09, "", "", "", "279", "Salt Lake City", "UT", "United States", "2021 - Q3", 42521.50, null, "Active", "AP"),
			new Expiration("Indianapolis", "10 West Market Street", "CoStar", "", "8/31/2021", 2499.00, 18.79, "", "", "", "285", "Indianapolis", "IN", "United States", "2021 - Q3", 46960.40, null, "Active", "AP"),
			new Expiration("Orange County", "15295 Alton Parkway", "TenX", "", "8/31/2021", 21429.00, 16.00, "", "", "", "474", "Irvine", "CA", "United States", "2021 - Q3", 342864.00, null, "Active", "AP"),
			new Expiration("Paris", "82 Avenue Marceau", "Grecam", "Office", "8/31/2021", 1991.00, 444.43, "", "", "", "154", "Paris", "France", "France", "2021 - Q3", 82219.85, null, "Active", "AP"),
			new Expiration("Minneapolis", "60 South Sixth Street", "CoStar", "Office", "9/30/2021", 4502.00, 15.73, "", "", "", "263", "Minneapolis", "MN", "United States", "2021 - Q3", 70835.25, null, "Active", "AP"),
			new Expiration("WeWork Commercial Information Consulting (Guangzhou) Co., Ltd", "3/F, 293 Guangzhou Middle Avenue, Yuexiu District, Guangzhou, Guangdong", "", "", "9/30/2021", 1.00, 1391.01, "", "", "", "493", "Guangzhou", "", "China", "2021 - Q3", 1391.01, null, "Active", "AP"),
			new Expiration("Edinburgh", "93 George Street", "Serviced", "", "10/31/2021", 250.00, "", "", "", "", "460", "Edinburgh", "United Kingdom", "United Kingdom", "2021 - Q4", "", null, "Active", "AP"),
			new Expiration("Freiburg im Breisgau", "Ingeborg-Krummer-Schroth-Str 30", "Thomas Daily GmbH", "Office", "10/31/2021", 16264.00, 15.30, "", "", "", "302", "Freiburg im Breisgau", "Germany", "Germany", "2021 - Q4", 248774.50, null, "Active", "AP"),
			new Expiration("New York", "575 Fifth Ave", "TenX", "", "10/31/2021", 8568.00, 62.50, "", "", "", "470", "New York", "NY", "United States", "2021 - Q4", 535500.00, null, "Active", "AP"),
			new Expiration("Norfolk", "150 W Main St", "CoStar", "", "10/31/2021", 13178.00, 24.63, "", "", "", "278", "Norfolk", "VA", "United States", "2021 - Q4", 324581.50, null, "Active", "AP"),
			new Expiration("San Jose", "10 Almaden Boulevard", "CoStar", "", "10/31/2021", 3208.00, 42.72, "", "", "", "270", "San Jose", "CA", "United States", "2021 - Q4", 137045.76, null, "Active", "AP"),
			new Expiration("Las Vegas", "3930 Howard Hughes", "CoStar", "Office", "11/30/2021", 2857.00, 36.39, "", "", "", "280", "Las Vegas", "NV", "United States", "2021 - Q4", 103975.72, null, "Active", "AP"),
			new Expiration("Munich", "Herzogspitalstr 24", "Serviced - STR", "Office", "12/31/2021", 250.00, 28642.65, "", "", "", "467", "München", "Germany", "Germany", "2021 - Q4", 28642.65, null, "Active", "AP"),
			new Expiration("Singapore", "15 Scotts Road", "STR", "", "12/31/2021", 1195.00, 51.46, "", "", "", "459", "Singapore", "Singapore", "Singapore", "2021 - Q4", 61488.83, null, "Active", "AP"),
			new Expiration("Berlin", "Im Römichen Hof, Unter den Linden 10", "Serviced", "", "1/22/2022", 250.00, 19722.21, "", "", "", "468", "Berlin", "Germany", "Germany", "2022 - Q1", 19722.21, null, "Active", "AP"),
			new Expiration("Munich", "Ludwigstrasse 8", "Serviced", "", "1/22/2022", 250.00, 1745.13, "", "", "", "483", "München", "", "Germany", "2022 - Q1", 1745.13, null, "Active", "AP"),
			new Expiration("Long Island", "395 North Service Road", "CoStar", "", "1/31/2022", 4698.00, 30.62, "", "", "", "283", "Melville", "NY", "United States", "2022 - Q1", 143837.04, null, "Active", "AP"),
			new Expiration("Bogota", "Calle 98 # 21-50", "STR", "", "2/28/2022", 968.00, 144.70, "", "", "", "486", "Bogota", "Columbia", "Colombia", "2022 - Q1", 13022.89, null, "Active", "AP"),
			new Expiration("London", "110 Southwark Street", "STR", "", "3/24/2022", 6979.00, 15.57, "", "", "", "456", "London", "United Kingdom", "United Kingdom", "2022 - Q1", 535525.65, null, "Active", "AP"),
			new Expiration("Houston", "1300 Post Oak Blvd", "CoStar", "Office", "3/31/2022", 5820.00, 28.88, "", "", "", "129", "Houston", "TX", "United States", "2022 - Q1", 168052.50, null, "Active", "AP"),
			new Expiration("Miami", "601 Brickell Key Drive", "TenX", "", "3/31/2022", 3666.00, 53.72, "", "", "", "471", "Miami", "FL", "United States", "2022 - Q1", 196919.25, null, "Active", "AP"),
			new Expiration("Orlando", "300 S Orange Avenue", "CoStar", "", "3/31/2022", 3352.00, 32.89, "", "", "", "273", "Orlando", "FL", "United States", "2022 - Q1", 110230.53, null, "Active", "AP"),
			new Expiration("WeWork Landmark Center", "328 Tian Tong Lu", "", "", "3/31/2022", 1.00, 7094.17, "", "", "", "492", "Shanghai", "", "China", "2022 - Q1", 7094.17, null, "Active", "AP"),
			new Expiration("Portland", "222 SW Columbia Street", "CoStar", "Office", "4/30/2022", 3340.00, 40.00, "", "", "", "266", "Portland", "OR", "United States", "2022 - Q2", 133599.96, null, "Active", "AP"),
			new Expiration("Norfolk", "150 Granby St", "Homes", "Commercial", "5/23/2022", 30000.00, "", "", "", "", "490", "Norfolk", "VA", "United States", "2022 - Q2", "", null, "Active", "AP"),
			new Expiration("Dallas", "750 N Saint Paul Street", "CoStar", "", "5/31/2022", 13784.00, 23.69, "", "", "", "378", "Dallas", "TX", "United States", "2022 - Q2", 326508.50, null, "Active", "AP"),
			new Expiration("Detroit", "3000 Town Center", "CoStar", "", "5/31/2022", 4815.00, 14.93, "", "", "", "290", "Detroit", "MI", "United States", "2022 - Q2", 71892.17, null, "Active", "AP"),
			new Expiration("Tampa", "101 E Kennedy Blvd", "CoStar", "", "5/31/2022", 2701.00, 33.76, "", "", "", "276", "Tampa", "FL", "United States", "2022 - Q2", 91185.72, null, "Active", "AP"),
			new Expiration("St. Louis", "101 S Hanley Road", "CoStar", "", "7/31/2022", 3260.00, 30.85, "", "", "", "272", "Clayton", "MO", "United States", "2022 - Q3", 100587.30, null, "Active", "AP"),
			new Expiration("Rochester", "75 South Clinton Avenue", "CoStar", "", "9/30/2022", 2420.00, 21.60, "", "", "", "300", "Rochester", "NY", "United States", "2022 - Q3", 52264.53, null, "Active", "AP"),
			new Expiration("Phoenix", "2325 East Camelback Road", "CoStar", "Office", "11/30/2022", 4112.00, 31.35, "", "", "", "166", "Phoenix", "AZ", "United States", "2022 - Q4", 128919.73, null, "Active", "AP"),
			new Expiration("Tokyo", "16F Link Square Shinjuku 5-27-5 Sendagaya", "STR", "", "12/31/2022", 250.00, 28771.23, "", "", "", "479", "Tokyo", "", "Japan", "2022 - Q4", 28771.23, null, "Active", "AP"),
			new Expiration("Dulles Jet Center", "", "", "", "1/31/2023", 4911.00, 51.72, "", "", "", "494", "Dulles", "VA", "United States", "2023 - Q1", 122970.72, null, "Active", "AP"),
			new Expiration("Santa Monica", "1020 Wilshire Blvd", "WSR", "", "1/31/2023", 2192.00, 97.95, "", "", "", "309", "Santa Monica", "CA", "United States", "2023 - Q1", 214713.32, null, "Active", "AP"),
			new Expiration("Atlanta", "3438 Peachtree Road, NE", "CoStar", "Office", "3/30/2023", 25884.00, 25.75, "", "", "", "377", "Atlanta", "GA", "United States", "2023 - Q1", 666453.88, null, "Active", "AP"),
			new Expiration("Jakarta", "World Trade Centre 1, 17th Floor", "STR", "", "3/31/2023", 1367.00, 207.07, "", "", "", "466", "Jakarta", "Indonesia", "Indonesia", "2023 - Q1", 26242.17, null, "Active", "AP"),
			new Expiration("W2 Office Tower, Oriental Plaza", "No 1 East Chang'an Avenue", "", "", "4/30/2023", 1.00, 151620.53, "", "", "", "491", "Chang'an Aveue, Dongcheng District Beijing", "", "China", "2023 - Q2", 151620.53, null, "Active", "AP"),
			new Expiration("Norcross", "2 Sun Ct", "Apartment Finder", "Office", "5/31/2023", 8165.00, "", "", "", "", "297", "Norcross", "GA", "United States", "2023 - Q2", "", null, "Active", "AP"),
			new Expiration("Norcross", "2 Sun Ct", "Apartment Finder", "Office", "5/31/2023", 8165.00, 20.59, "", "", "", "201", "Norcross", "GA", "United States", "2023 - Q2", 168096.94, null, "Active", "AP"),
			new Expiration("San Diego", "8910 University Center Lane", "CoStar", "Office", "5/31/2023", 39443.00, 102.36, "", "", "", "169", "San Diego", "CA", "United States", "2023 - Q2", 1850007.03, null, "Active", "AP"),
			new Expiration("Cleveland", "600 Superior Avenue East", "CoStar", "", "8/31/2023", 3758.00, 22.87, "", "", "", "294", "Cleveland", "OH", "United States", "2023 - Q3", 85964.22, null, "Active", "AP"),
			new Expiration("Philadelphia", "2005 Market Street", "CoStar", "", "9/30/2023", 6107.00, 21.28, "", "", "", "356", "Philadelphia", "PA", "United States", "2023 - Q3", 129926.46, null, "Active", "AP"),
			new Expiration("Yamato Office Center", "999 Yamato Road", "", "Office", "9/30/2023", 17464.00, 8.20, "", "", "", "489", "Boca Raton", "FL", "United States", "2023 - Q3", 143125.40, null, "Active", "AP"),
			new Expiration("Cincinnati", "221 East Fourth Street", "CoStar", "", "11/30/2023", 3104.00, 14.99, "", "", "", "282", "Cincinnati", "OH", "United States", "2023 - Q4", 46536.69, null, "Active", "AP"),			
		];
	}

	navigateToObject(e) {
		// console.log(e);
		if( e.event.path[0].className != 'dx-datagrid-group-closed' && e.event.path[0].className != 'dx-datagrid-group-opened') {
			this.router.navigate(['../../lease', e.data.leaseId], {relativeTo: this.route } );	
		}		
	} 

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
