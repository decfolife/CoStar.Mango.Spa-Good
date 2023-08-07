export class LeaseEscalation {
    id : Number;
    leaseId : Number;
    escalationDate : String;
	escalationNote : String;
	
	constructor(id,leaseId,escalationDate,escalationNote) {
		this.id = id;
		this.leaseId = leaseId;
		this.escalationDate = escalationDate;
		this.escalationNote = escalationNote;
	}
}

export let leaseEscalations : LeaseEscalation[] = [	
	new LeaseEscalation(1, 143, "02/01/2018", "For 2/1/17 - 1/31/18, T pays $10,303.25/month, increased (not decreased) on 2/1/18 by the increase in CPI. Ltr Agmt 9/25/17; Lease - Sec. Option Adden-55, pg. Adden-1"),
];



