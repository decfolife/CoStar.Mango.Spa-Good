export class LeaseAdmin {
    id : Number;
    leaseId : Number;
    category : String;
	status : String;
	dueDate : string;
	receivedDate : string;
	completeDate : string;
	amount : number;
	notes : string;
	
	constructor(id,category,status,dueDate,receivedDate,completeDate,amount,notes) {
		this.id = id;
		this.category = category;
		this.status = status;
		this.dueDate = dueDate;
		this.receivedDate = receivedDate;
		this.completeDate = completeDate;
		this.amount = amount;
		this.notes = notes;
	}
}

export let leaseAdmins : LeaseAdmin[] = [	
];



