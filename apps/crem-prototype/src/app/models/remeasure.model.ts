export class Remeasure {
    accountingBatchID : Number;
	portfolio : String;
	user : String;
	batchStatus : String;
	validationStart : String;
	validationEnd : String;
	processingStart : String;
	processingEnd : String;
	valid : String;
	invalid : String;
	success : String;
	error : String;
	total : Number;

	constructor(accountingBatchID, portfolio, user, batchStatus, validationStart, validationEnd, processingStart, processingEnd, valid, invalid, success, error, total) {
		this.accountingBatchID = accountingBatchID;
		this.portfolio = portfolio;
		this.user = user;
		this.batchStatus = batchStatus;
		this.validationStart = validationStart;
		this.validationEnd = validationEnd;
		this.processingStart = processingStart;
		this.processingEnd = processingEnd;
		this.valid = valid;
		this.invalid = invalid;
		this.success = success;
		this.error = error;
		this.total = total;
		
	}
}

export let remeasures : Remeasure[] = [
	// accountingBatchID, portfolio, user, batchStatus, validationStart, validationEnd, processingStart, processingEnd, valid, invalid, success, error, total
	new Remeasure(1, "Acme", "Patrick", "Queued for Validation", "", "", "", "","","","","",100),
	new Remeasure(2, "Acme", "Derick", "Validating", "2020-05-05 09:00.00","","","","","","","",100),
	new Remeasure(3, "Acme", "Jon", "Validation Complete", "2020-05-05 09:00.00","2020-05-05 09:30.00","","",90,10,"","",100),
	new Remeasure(4, "Acme", "Patrick", "Queued for Processing","2020-05-05 09:00.00","2020-05-05 09:30.00","","",90,10,"","",100),
	new Remeasure(5, "Acme", "Derick", "Processing", "2020-05-05 09:00.00", "2020-05-05 9:30.00","2020-05-05 10:00.00","",90,10,"","",100),
	new Remeasure(6, "Acme", "Jon", "Complete", "2020-05-05 09:00.00", "2020-05-05 9:30.00","2020-05-05 10:00.00","2020-05-05 10:30.00",90,10,90,0,100),
	new Remeasure(7, "Acme", "Patrick", "Complete with Error", "2020-05-05 09:00.00", "2020-05-05 9:30.00","2020-05-05 10:00.00","2020-05-05 10:30.00",90,10,89,1,100), 
	new Remeasure(8, "Acme", "Derick", "Canceled", "2020-05-05 09:00.00", "2020-05-05 9:30.00","2020-05-05 10:00.00","",90,10,"","",100),
	new Remeasure(9, "Acme", "Jon", "System Error", "2020-05-05 09:00.00", "2020-05-05 9:30.00","2020-05-05 10:00.00","",90,10,25,75,100)
];



