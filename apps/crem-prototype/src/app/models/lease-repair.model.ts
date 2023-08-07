export class LeaseRepair {
    id : Number;
    leaseId : Number;
    item : String;
	responsibleParty : String;
	reimbursableBy : boolean;
	comments : string;
	
	constructor(id,leaseId,item,responsibleParty,reimbursableBy,comments) {
		this.id = id;
		this.leaseId = leaseId;
		this.item = item;
		this.responsibleParty = responsibleParty;
		this.reimbursableBy = reimbursableBy;
		this.comments = comments;
	}
}

export let leaseRepairs : LeaseRepair[] = [	
	new LeaseRepair(1, 143, "Roof/Structure", "Landlord", "Landlord", "Lease - Sec. Adden-57d"),
	new LeaseRepair(1, 143, "Parking Lot", "Tenant", "Tenant", "Lease - Sec. Adden-57a"),
	new LeaseRepair(1, 143, "Landscaping and Irrigation", "Tenant", "Tenant", "Lease - Sec. Adden-57a"),
	new LeaseRepair(1, 143, "In Ground Plumbing", "Landlord", "Landlord", "Lease - Sec. Adden-57d"),
	new LeaseRepair(1, 143, "Fire Extinguisher Systems, Alarm, Smoke Detection", "Landlord", "Landlord", "Lease - Sec. Adden-57d"),
	new LeaseRepair(1, 143, "Drains and Clarifiers", "Landlord", "Landlord", "Lease - Sec. Adden-57d"),
	new LeaseRepair(1, 143, "Building Systems - HVAC", "Landlord", "Landlord", "Lease - Sec. Adden-57d"),
	new LeaseRepair(1, 143, "Building Systems - Foundation", "Landlord", "Landlord", "Lease - Sec. Adden-57d"),
	new LeaseRepair(1, 143, "Boiler and Pressure Vessels", "Landlord", "Landlord", "Lease - Sec. Adden-57d"),
];
