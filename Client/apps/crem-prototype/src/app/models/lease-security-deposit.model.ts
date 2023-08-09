export class LeaseSecurityDeposit {
    id : Number;
    leaseId : Number;
    depositType : String;
	dateDeposited : String;
	amount : number;
	depositHolder : string;
	returnDate : string;
	dateDepositReturned : string;
	comments : string;
	
	constructor(id,leaseId,depositType,dateDeposited,amount,depositHolder,returnDate,dateDepositReturned,comments) {
		this.id = id;
		this.leaseId = leaseId;
		this.depositType = depositType;
		this.dateDeposited = dateDeposited;
		this.amount = amount;
		this.depositHolder = depositHolder;
		this.returnDate = returnDate;
		this.dateDepositReturned = dateDepositReturned;
		this.comments = comments;
	}
}

export let leaseSecurityDeposits : LeaseSecurityDeposit[] = [	
	new LeaseSecurityDeposit(1, 143, "Cash", null, 6000, null, null, null, "Returned without interest within 90 days after expiration. LL may require T to deposit additional monies so that Security Deposit funds are proportional to the increased Base Rent or to account for increased wear and tear to the Premises. Lease - Sec. 1.6b, pg. 2"),
	new LeaseSecurityDeposit(2, 143, "Guarantor", null, null, null, null, null, "N/A"),
];



