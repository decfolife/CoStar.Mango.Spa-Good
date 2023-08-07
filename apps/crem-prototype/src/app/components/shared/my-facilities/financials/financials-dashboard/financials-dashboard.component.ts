import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../../../../app.service';

export class remainingObligationData {
    hierarchy: string;
    remainingObligation: number;

    constructor(hierarchy,remainingObligation) {
		this.hierarchy = hierarchy;
		this.remainingObligation = remainingObligation;	
	}
}

export class monthlyObligationData {
    month: string;
    lastYear: number;
    currentYear : number;
    nextYear : number;
    lastYearAverage : Number;
    currentYearAverage : Number;
    nextYearAverage : Number;

    constructor(month,lastYear, currentYear, nextYear, lastYearAverage, currentYearAverage, nextYearAverage) {
		this.month = month;
		this.lastYear = lastYear;	
		this.currentYear = currentYear;
		this.nextYear = nextYear;
		this.lastYearAverage = lastYearAverage;
		this.currentYearAverage = currentYearAverage;
		this.nextYearAverage = nextYearAverage;
	}
}

export class AnnualObligation {
	year : String;
	obligation : Number;

	constructor(year, obligation) {
		this.year = year;
		this.obligation = obligation;
	}
}

export class ThirteenMonthExpenses {
	account : String;
	month1 : Number;
	month2 : Number;
	month3 : Number;
	month4 : Number;
	month5 : Number;
	month6 : Number;
	month7 : Number;
	month8 : Number;
	month9 : Number;
	month10 : Number;
	month11 : Number;
	month12 : Number;
	month13 : Number;
	

	constructor(account,month1,month2,month3,month4,month5,month6,month7,month8,month9,month10,month11,month12,month13) {
  		this.account = account;
  		this.month1 = month1;
		this.month2 = month2;
		this.month3 = month3;
		this.month4 = month4;
		this.month5 = month5;
		this.month6 = month6;
		this.month7 = month7;
		this.month8 = month8;
		this.month9 = month9;
		this.month10 = month10;
		this.month11 = month11;
		this.month12 = month12;
		this.month13 = month13;
  	}
}

export class VarianceByAccount {
	account : String;
	month1 : Number;
	month2 : Number;
	variance : Number;
	variancePct : Number;
	
	constructor(account,month1,month2,variance,variancePct) {
  		this.account = account;
  		this.month1 = month1;
		this.month2 = month2;
		this.variance = variance;
		this.variancePct = variancePct;
	
  	}
}

export class LeaseVariance {
	systemLeaseID : Number;
	buildingName : String;
	expirationDate : String;
	month1 : Number;
	month2 : Number;
	variance : Number;
	variancePct : String;
	
	constructor(systemLeaseID,buildingName,expirationDate,month1,month2,variance,variancePct) {
  		this.systemLeaseID = systemLeaseID;
  		this.buildingName = buildingName;
  		this.expirationDate = expirationDate;
  		this.month1 = month1;
		this.month2 = month2;
		this.variance = variance;
		this.variancePct = variancePct;
	
  	}
}

@Component({
	selector: 'app-financials-dashboard',
	templateUrl: './financials-dashboard.component.html',
	styleUrls: ['./financials-dashboard.component.scss'],
	providers: [Service]
})
export class FinancialsDashboardComponent implements OnInit {

	
	remainingObligations : remainingObligationData[];
	monthlyObligations : monthlyObligationData[];
	monthlyExpensesByAccount : ThirteenMonthExpenses[];
	variancebyAccount : VarianceByAccount[];
	leaseVariances : LeaseVariance[];
	annualObligations : AnnualObligation[];
	filters : DropdownField[];

	addChargePopupVisible : Boolean = false;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	

		this.filters = [
			new DropdownField([], null, null, "Portfolio", "portfolio", [], true, null, true, false, true),
			new DropdownField([], null, null, "Hierarchy", "hierarchy", [], true, null, null, null, true),
			new DropdownField([{ value : "Canada" }, { value : "China" }, { value : "France" }, { value : "Hong Kong" }, { value : "Italy" }, { value : "Spain" }, { value : "United States" }], "value", "value", "Country", "dropdown", [], true, "multiple", true, true, true),			
			new DropdownField([{ value : "Real Estate" }, { value : "Equipment" }], "value", "value", "Lease Template", "dropdown", [], true, "multiple", true, true, true),	
			new DropdownField([{ value : "AP" }, { value : "AR" }], "value", "value", "Account Type", "dropdown", [], true, "multiple", true, true, true),	
			new DropdownField([{ value : "EUR" }, { value : "GBP" }, { value : "HKD" }, { value : "USD" }], "value", "value", "Currency", "dropdown", ["USD"], true, "single", true, true, true),			
		];

		this.monthlyObligations = [
			new monthlyObligationData("Jan", 3.911, 4.158, 4.388, 3.62, 3.90, 4.00),
			new monthlyObligationData("Feb", 3.264, 3.591, 3.601, 3.62, 3.90, 4.00),
			new monthlyObligationData("Mar", 3.464, 3.737, 3.907, 3.62, 3.90, 4.00),
			new monthlyObligationData("Apr", 4.123, 4.365, 4.355, 3.62, 3.90, 4.00),
			new monthlyObligationData("May", 3.467, 3.606, 3.591, 3.62, 3.90, 4.00),
			new monthlyObligationData("Jun", 3.489, 3.799, 3.815, 3.62, 3.90, 4.00),
			new monthlyObligationData("Jul", 4.089, 4.323, 4.461, 3.62, 3.90, 4.00),
			new monthlyObligationData("Aug", 3.225, 3.535, 3.689, 3.62, 3.90, 4.00),
			new monthlyObligationData("Sep", 3.509, 3.787, 3.924, 3.62, 3.90, 4.00),
			new monthlyObligationData("Oct", 4.001, 4.380, 4.475, 3.62, 3.90, 4.00),
			new monthlyObligationData("Nov", 3.269, 3.577, 3.875, 3.62, 3.90, 4.00),
			new monthlyObligationData("Dec", 3.664, 3.946, 3.934, 3.62, 3.90, 4.00),
			
		];	

		this.remainingObligations = [
			new remainingObligationData("Europe", 23.9),
			new remainingObligationData("North America", 155.1),			
		];

		this.monthlyExpensesByAccount = [
			new ThirteenMonthExpenses("Base Rent", 2577542.04, 2634386.11, 3404069.06, 2689157.21, 2625915.29, 3432006.13, 2703796.39, 2732144.04, 3442542.48, 2725502.00, 2720031.82, 3419063.40, 2725631.51),
			new ThirteenMonthExpenses("Office Expense", 803.15, 803.15, 803.15, 803.15, 803.15, 803.15, 803.15, 803.15, 803.15, 803.15, 803.15, 803.15, 803.15),
			new ThirteenMonthExpenses("Office Rent", 11080.54, 93061.93, 11080.54, 11080.54, 93061.93, 45224.29, 45224.29, 133152.59, 43596.09, 43596.09, 121221.73, 39240.34, 39240.34),
			new ThirteenMonthExpenses("Operating Expense", 990684.34, 1044262.82, 880381.58, 807374.72, 1040421.48, 875554.73, 801234.54, 1053593.43, 874915.64, 805001.84, 1038509.99, 869368.92, 799455.12),
			new ThirteenMonthExpenses("Parking", 25674.34, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20, 26316.20),
		];

		this.variancebyAccount = [
			new VarianceByAccount("Base Rent", 2583762.39 , 2637391.83 , 53629.44, 0.0208),
			new VarianceByAccount("Office Expense", 566.45 , 566.45 , 0 , 0.0000),
			new VarianceByAccount("Office Rent", 10329.19 , 112354.97 , 102025.78, 9.8774),
			new VarianceByAccount("Operating Expense", 991985.32 , 1102766.38 , 110781.06, .1117),
			new VarianceByAccount("Parking", 25674.34 , 26316.20 , 641.86, .0250),
		];

		this.leaseVariances = [
			new LeaseVariance(318, "The Shard", "8/31/2025", 0, 656668.28, 656668.28, "Charge Beginning"),
			new LeaseVariance(143, "1331 L Street NW", "5/31/2025", 1171673.56, 1017018.79, -154654.77, "-13.2%"),
			new LeaseVariance(456, "110 Southwark Street", "3/24/2022", 0, 82103.29, 82103.29, "Charge Beginning"),
			new LeaseVariance(293, "501 South 5th Street", "6/29/2024", 306535.04, 353435.34, 46900.3, "15.3%"),
			new LeaseVariance(375, "The Shard", "8/31/2025", 0, 33339.86, 33339.86, "Charge Beginning"),
			new LeaseVariance(374, "9 George Square", "9/30/2028", 13167.37, 0, -13167.37, "Charge Ending"),
			new LeaseVariance(290, "3000 Town Center", "5/31/2020", 5250.00, 0, -5250.00, "Charge Ending"),
			new LeaseVariance(184, "1 Marsden Street", "1/8/2025", 0, 4939.28, 4939.28, "Charge Beginning"),
			new LeaseVariance(180, "901 Via Piemonte", "10/31/2024", 54272.20, 58403.80, 4131.60, "7.61%"),
			new LeaseVariance(382, "401 E. Las Olas Blvd", "6/30/2025", 11009.91, 7787.50, -3222.41, "-29.27%"),
		];

		this.annualObligations = [
			new AnnualObligation("2015", 11136983),
			new AnnualObligation("2016", 20742329),
			new AnnualObligation("2017", 29467425),
			new AnnualObligation("2018", 33977366),
			new AnnualObligation("2019", 41389578),
			new AnnualObligation("2020", 46822580),
			new AnnualObligation("2021", 46370284),
			new AnnualObligation("2022", 33916690),
			new AnnualObligation("2023", 32087500),
			new AnnualObligation("2024", 26366384),
			new AnnualObligation("2025", 9214909),
		];
		
	}

	ngOnInit() {
	}

	standardTooltip() {
		
	}

	customizeSum(data) {
		return formatCurrency(data.value, 'en-US', '$', '18.0-0');
	}

	customizePoint(arg: any) {
        if(arg.argument == "2020") {
            return { color: "#225BAD", hoverStyle: { color: "#225BAD" } };
        } else {
        	return { color: "#F68338", hoverStyle: { color: "#F68338" } };
        }
    }

    launchAddChargePopup() {
    	this.addChargePopupVisible = true;	
    }

    closeAddChargePopup() {
  		this.addChargePopupVisible = false;	
  	}

}
