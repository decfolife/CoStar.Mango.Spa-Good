export class Supplier {
	id : number;
	supplierName : string;
	portfolio : string;

	constructor(id, supplierName, portfolio) {
		this.id = id;
		this.supplierName = supplierName;
		this.portfolio = portfolio;
	}

}

export let suppliers : Supplier[] = [
	new Supplier(1, "Coresite", "EQ Portfolio"),
	new Supplier(2, "Equinix", "EQ Portfolio"),
	new Supplier(3, "Sungard", "EQ Portfolio"),
	new Supplier(4, "Internap Network Services", "EQ Portfolio"),
	new Supplier(5, "Advanced Office Equipment", "EQ Portfolio"),
	new Supplier(6, "Tesla", "EQ Portfolio"),
];


	