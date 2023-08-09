
export class Country {
	id : number;
	name : string;

	constructor( id,name ) {
		this.id = id;
		this.name = name;
	}
}

export let countries : Country[] = [
	new Country(1, 'Canada'),	
	new Country(2, 'France'),	
	new Country(3, 'Italy'),	
	new Country(4, 'Brazil'),	
	new Country(5, 'Portugal'),	
	new Country(6, 'Argentina'),	
	new Country(7, 'United States'),
];



