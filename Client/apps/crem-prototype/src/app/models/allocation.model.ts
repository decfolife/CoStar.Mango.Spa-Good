export class Allocation {
    id: number;
    leaseId : number;
    alias : string;
    segment1 : string;
    segment2 : string;
    segment3 : string;
    segment4 : string;
    costPercent : number;
    spacePercent : number;
    headCount : number;
    status : string;
    useType : string;

    constructor(id,leaseId,alias,segment1,segment2,segment3,segment4, costPercent, spacePercent, headCount, status, useType) {		
		this.id = id;
		this.leaseId = leaseId;	
		this.alias = alias;
		this.segment1 = segment1;
		this.segment2 = segment2;
		this.segment3 = segment3;
		this.segment4 = segment4;		
		this.costPercent = costPercent;
		this.spacePercent = spacePercent;
		this.headCount = headCount;
		this.status = status;
		this.useType = useType;
	}
}

export let allocations : Allocation[] = [
	new Allocation(1, 0, null, "02636", "111", "1234", "01150", 50, 50, null, null, null),
	new Allocation(2, 0, null, "01150", "02636", "1234", "111", 50, 50, null, null, null),
];	