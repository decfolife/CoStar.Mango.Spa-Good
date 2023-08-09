export class LeaseAllocation {
    id : Number;
    leaseId : Number;
    segment1 : String;
	segment2 : String;
	segment3 : String;
	segment4 : String;
	costPercent : Number;
	spacePercent : Number;
	headCount : Number;
	useType : String;

	constructor(id,segment1,segment2,segment3,segment4,costPercent,spacePercent,headCount,useType) {
		this.id = id;
		this.segment1 = segment1;
		this.segment2 = segment2;
		this.segment3 = segment3;	
		this.segment4 = segment4;	
		this.costPercent = costPercent;
		this.spacePercent = spacePercent;
		this.headCount = headCount;
		this.useType = useType;
	}
}

export let leaseAllocations : LeaseAllocation[] = [	
];



