
export class AmortizationProfile {
	id : number;
	portfolio : string;
	name : string;
	comments : string;
	reasonablyCertainOptions : boolean;
	isActive : boolean;
	inUse : boolean;
	activeScheduleCount : boolean;

	constructor( id,portfolio,name,comments,reasonablyCertainOptions,isActive,inUse,activeScheduleCount ) {
		this.id = id;
		this.portfolio = portfolio;
		this.name = name;
		this.comments = comments;
		this.reasonablyCertainOptions = reasonablyCertainOptions;
		this.isActive = isActive;
		this.inUse = inUse;
		this.activeScheduleCount = activeScheduleCount;
	}
}

export let amortizationProfiles : AmortizationProfile[] = [
	new AmortizationProfile(1, 'RE Portfolio', 'Base Rent', 'Only base rent', true, true, true, 216),	
	new AmortizationProfile(2, 'RE Portfolio', 'Tenant Improvements', 'TI accounts only for current operating leases', true, true, true, 45),	
	new AmortizationProfile(3, 'RE Portfolio', 'Parking Rent', 'Costs associated with parking', true, true, true, 5),	
	new AmortizationProfile(4, 'RE Portfolio', 'Storage', '', true, true, true, 12),	
	new AmortizationProfile(5, 'RE Portfolio', 'Land', 'Right of use asset is land, such as ground lease', false, true, true, 52),	
];


