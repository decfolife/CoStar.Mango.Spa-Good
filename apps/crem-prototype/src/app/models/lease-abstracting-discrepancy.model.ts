export class LeaseAbstractingDiscrepancy {
    id : Number;
    leaseId : Number;
    discrepancyType : String;
	discrepancyComment : String;
	discrepancyStatus : string;
	resolution : string;
	
	constructor(id,leaseId,discrepancyType,discrepancyComment,discrepancyStatus,resolution) {
		this.id = id;
		this.leaseId = leaseId;
		this.discrepancyType = discrepancyType;
		this.discrepancyComment = discrepancyComment;
		this.discrepancyStatus = discrepancyStatus;
		this.resolution = resolution;
	}
}

export let leaseAbstractingDiscrepancies : LeaseAbstractingDiscrepancy[] = [	
	new LeaseAbstractingDiscrepancy(1, 143, "Rent Note", "Per Sec. 2 of the 1st amend, capitalized rent for all three leases stated in recitals is $10,000/month from 7/1/20 to 6/30/21 and $18,000/month from 7/1/21 to 9/30/21, abstract reflects $10,000/month and $18,000/month.", "Open", null),
];



