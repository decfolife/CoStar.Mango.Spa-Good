export class TaxHistory {
    id : number;
	taxYear : String;
	assessedValue : number;
	taxAmount : number;	

	constructor( id, taxYear, assessedValue, taxAmount ) {
		this.id = id;
		this.taxYear = taxYear;
		this.assessedValue = assessedValue;
		this.taxAmount = taxAmount;	
		
	}
}

export let taxHistory : TaxHistory[] = [
	new TaxHistory(1, "2011", 17560000, 385060),
	new TaxHistory(2, "2010", 18800000, 458300)
];