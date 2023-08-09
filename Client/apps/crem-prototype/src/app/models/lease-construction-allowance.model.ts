export class LeaseConstructionAllowance {
    id : Number;
    leaseId : Number;
    description : String;
	status : String;
	reimbursementDeadline : string;
	totalAmountOwed : number;
	totalPaidToDate : number;
	remainingBalance : number;
	
	constructor(id,leaseId,description,status,reimbursementDeadline,totalAmountOwed,totalPaidToDate,remainingBalance) {
		this.id = id;
		this.leaseId = leaseId;
		this.description = description;
		this.status = status;
		this.reimbursementDeadline = reimbursementDeadline;
		this.totalAmountOwed = totalAmountOwed;
		this.totalPaidToDate = totalPaidToDate;
		this.remainingBalance = remainingBalance;
	}
}

export let leaseConstructionAllowances : LeaseConstructionAllowance[] = [	
	new LeaseConstructionAllowance(1, 143, "N/A", null, null, 0, null, 0),
];



