
export class Currency {
	id : number;
	name : string;
	currency : string;

	constructor( id,name,currency ) {
		this.id = id;
		this.name = name;
		this.currency = currency;
	}
}

export let currencies : Currency[] = [
	new Currency(1, 'Canadian Dollars', 'CAD'),	
	new Currency(2, 'Euro', 'EUR'),	
	new Currency(3, 'United State Dollars', 'USD'),	
	new Currency(4, 'Hong Kong Dollars', 'HKD'),	
];



