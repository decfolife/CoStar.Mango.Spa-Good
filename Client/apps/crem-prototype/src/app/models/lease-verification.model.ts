export class LeaseVerification {
    id : Number;
    leaseId : Number;
    event : String;
	user : String;
	changeDate : string;
	fieldName : string;
	oldValue : string;
	newValue : string;
	screen : string;
	comments : string;
	
	constructor(id,leaseId,event,user,changeDate,fieldName, oldValue, newValue, screen, comments) {
		this.id = id;
		this.leaseId = leaseId;
		this.event = event;
		this.user = user;
		this.changeDate = changeDate;
		this.fieldName = fieldName;
		this.oldValue = oldValue;
		this.newValue = newValue;
		this.screen = screen;
		this.comments = comments;
	}
}

export let leaseVerifications : LeaseVerification[] = [	
	new LeaseVerification(1, 111, "Status Update", "Jake Aragetti", "04/07/2021", "Verification Status", "Verified", "Unverified", "Status Change", null),
	new LeaseVerification(2, 111, "Lease Option Updated", "Jake Aragetti", "04/07/2021", "Option Type", "Renewal", "Purchase", "Lease Options", null),
	
];
