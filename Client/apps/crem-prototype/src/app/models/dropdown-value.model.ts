export class DropdownValue {
    id : number;
	dropdownId : Number;
	value : String;	
	display : String;	
	sortOrder : Number;
	isActive : Boolean;
	parentValue : String;

	constructor( id, dropdownId, value, display, sortOrder, isActive, parentValue ) {
		this.id = id;
		this.dropdownId = dropdownId;
		this.value = value;	
		this.display = display;
		this.sortOrder = sortOrder;		
		this.isActive = isActive;
		this.parentValue = parentValue;
	}
}

export let dropdownValues : DropdownValue[] = [
	new DropdownValue(1, 1, null, 'Retail', null, true, null),
	new DropdownValue(2, 1, null, 'Office', null, true, null),
	new DropdownValue(3, 1, null, 'Shopping Mall', null, true, null),
	new DropdownValue(4, 1, null, 'Warehouse', null, true, null),
	new DropdownValue(5, 1, null, 'Repair', null, true, null),
	new DropdownValue(6, 1, null, 'Bank', null, true, null),
	new DropdownValue(7, 1, null, 'ATM', null, true, null),
	new DropdownValue(8, 1, null, 'Hotel', null, true, null),
	new DropdownValue(9, 1, null, 'Industrial', null, true, null),
	new DropdownValue(10, 1, null, 'Manufacturing', null, true, null),
	new DropdownValue(11, 2, null, 'Active', null, true, null),
	new DropdownValue(12, 2, null, 'Expired', null, true, null),
	new DropdownValue(13, 2, null, 'MTM', null, true, null),
	new DropdownValue(14, 2, null, 'Pending', null, true, null),
	new DropdownValue(15, 2, null, 'Subleased', null, true, null),
	new DropdownValue(16, 2, null, 'Terminated', null, true, null),	
	new DropdownValue(17, 3, null, 'Yes', null, true, null),	
	new DropdownValue(18, 3, null, 'No', null, true, null),	
];