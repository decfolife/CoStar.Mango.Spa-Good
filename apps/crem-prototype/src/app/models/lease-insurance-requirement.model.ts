export class LeaseInsuranceRequirement {
    id : Number;
    leaseId : Number;
    number : String;
	insuranceType : String;
	coverageRequired : boolean;
	coverageLimits : string;
	perOccurence : number;
	aggregate : number;
	sourceOfData : string;
	policyExpirationDate : string;
	notes : string;
	
	constructor(id,leaseId,number,insuranceType,coverageRequired,coverageLimits,perOccurence,aggregate,sourceOfData,policyExpirationDate,notes) {
		this.id = id;
		this.leaseId = leaseId;
		this.number = number;
		this.insuranceType = insuranceType;
		this.coverageRequired = coverageRequired;
		this.coverageLimits = coverageLimits;
		this.perOccurence = perOccurence;
		this.aggregate = aggregate;
		this.sourceOfData = sourceOfData;
		this.policyExpirationDate = policyExpirationDate;
		this.notes = notes;
	}
}

export let leaseInsuranceRequirements : LeaseInsuranceRequirement[] = [	
	new LeaseInsuranceRequirement(1, 143, "1", "Building Insurance", "No", null, null, null, null, null, "No Lease provision"),
	new LeaseInsuranceRequirement(2, 143, "2", "Personal Property Insurance", "Yes", null, null, null, "Lease - Sec. 8.4a, pg. 7", null, "Full replacement cost. Deductible not to exceed $1,000 per occurrence."),
	new LeaseInsuranceRequirement(3, 143, "3", "Commercial General Liability", "Yes", null, 1000000, 2000000, "Lease - Sec. 8.2a, pg. 6", null, "To include 'Additional Insured-Managers or Lessors of Premises' Endorsement."),
	new LeaseInsuranceRequirement(4, 143, "4", "Umbrella", "No", null, null, null, null, null, "No Lease provision"),
	new LeaseInsuranceRequirement(5, 143, "5", "Business Interruption", "Yes", null, null, null, "Lease - Sec. 8.4b pg. 7", null, "Loss of income and extra expense insurance in amounts as will reimburse T for loss."),
	new LeaseInsuranceRequirement(6, 143, "6", "Rental", "No", null, null, null, null, null, "No Lease provision"),
	new LeaseInsuranceRequirement(7, 143, "7", "Flood", "No", null, null, null, null, null, "No Lease provision"),
];



