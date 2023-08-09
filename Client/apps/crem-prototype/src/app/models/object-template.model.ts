export class ObjectTemplate {
    id : number;	
	objectType : string;		
	name : string;
	billingType : string;
	addSecurityRightsOnCreation : Boolean;
	isActive : Boolean;
	useInQuickSearch : Boolean;

	constructor( id, objectType, name, billingType, addSecurityRightsOnCreation, isActive, useInQuickSearch ) {
		this.id = id;
		this.objectType = objectType;	
		this.name = name;		
		this.billingType = billingType;
		this.addSecurityRightsOnCreation = addSecurityRightsOnCreation;
		this.isActive = isActive;
		this.useInQuickSearch = useInQuickSearch;
	}
}

export let objectTemplates : ObjectTemplate[] = [
	new ObjectTemplate(1, 'Property', 'Property', 'Building', true, true, true),
	new ObjectTemplate(2, 'Property', 'Building', 'Building', true, true, true),
	new ObjectTemplate(3, 'Property', 'Shopping Center', 'Building', true, true, true),
	new ObjectTemplate(4, 'Property', 'Warehouse', 'Building', true, true, true),
	new ObjectTemplate(5, 'Lease', 'Lease', 'Lease', true, true, true),
	new ObjectTemplate(6, 'Lease', 'Real Estate Lease', 'Lease', true, true, true),
	new ObjectTemplate(7, 'Lease', 'Equipment Lease', 'Lease', true, true, true),
	new ObjectTemplate(8, 'Lease', 'Truck Lease', 'Lease', true, true, true),
];


