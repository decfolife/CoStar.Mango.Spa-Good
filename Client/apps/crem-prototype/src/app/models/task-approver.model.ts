export class TaskApprover {
    id : Number;
    taskId : Number;
    approverName : string;
    isApproved : Boolean;
    isRejected : Boolean;
    approvalDate : string;
    actualStartDate : string;
    newHours : number;
    note : string;
    hoursToDate : number;
    hoursLastUpdated : string;
    status : string;
	initials : string;
	
	constructor(id,taskId,approverName,isApproved,isRejected,approvalDate,actualStartDate,newHours,note,hoursToDate,hoursLastUpdated,status,initials) {
		this.id = id;
		this.taskId = taskId;
		this.approverName = approverName;
		this.isApproved = isApproved;
		this.isRejected = isRejected;
		this.approvalDate = approvalDate;	
		this.actualStartDate = actualStartDate;
		this.newHours = newHours;	
		this.note = note;
		this.hoursToDate = hoursToDate;
		this.hoursLastUpdated = hoursLastUpdated;
		this.status = status;
		this.initials = initials;
	}
}

export let taskApprovers : TaskApprover[] = [
	// new TaskApprover(id,taskId,approverName,isApproved,isRejected,approvalDate,actualStartDate,newHours,note),
	new TaskApprover(1, 1, "Jason Trkovsky", false, false, null, null, null, null, null, null, "Pending", "JT"),
	new TaskApprover(2, 1, "Patrick Griffith", true, false, "12/31/2020", null, null, null, null, null, "Complete", "PG"),
	new TaskApprover(3, 1, "Dan Galenkamp", false, false, null, null, null, null, null, null, "Pending", "DG"),
	new TaskApprover(4, 1, "Elyse Jupiter", false, false, null, null, null, null, null, null, "Pending", "EJ"),
	new TaskApprover(5, 1, "Anne Martinez", false, false, null, null, null, null, null, null, "Pending", "AM"),
	
];



