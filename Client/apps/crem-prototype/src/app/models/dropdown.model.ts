export class Dropdown {
    id : number;
	name : String;
	isUserDefined : Boolean;	
	isShared : Boolean;
	keyEqualsValue : Boolean;
	sortBy : String;
	sortDirection : String;
	sourceTable : string;
	keyField : string;
	valueField : String;
	isActive : Boolean;

	constructor( id, name, isUserDefined, isShared, keyEqualsValue, sortBy, sortDirection, sourceTable, keyField, valueField, isActive ) {
		this.id = id;
		this.name = name;
		this.isUserDefined = isUserDefined;	
		this.isShared = isShared;
		this.keyEqualsValue = keyEqualsValue;
		this.sortBy = sortBy;
		this.sortDirection = sortDirection;
		this.sourceTable = sourceTable;
		this.keyField = keyField;
		this.valueField = valueField;
		this.isActive = isActive;
	}
}

export let dropdowns : Dropdown[] = [
	new Dropdown(1, 'Building Type', true, false, true, 'value', 'ASC', null, null, null, true),
	new Dropdown(2, 'Lease Status', true, false, true, 'value', 'ASC', null, null, null, true),
	new Dropdown(3, 'Yes/No', true, false, true, 'value', 'ASC', null, null, null, true),
];