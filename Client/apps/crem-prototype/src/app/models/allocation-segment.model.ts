export class AllocationSegment {
    id : number;
	allocCenter : string;
	allocCode : string;
	allocNumber : string;
	segmentType : number;

	constructor(id,allocCenter,allocCode,allocNumber,segmentType) {		
		this.id = id;	
		this.allocCenter = allocCenter;
		this.allocCode = allocCode;
		this.allocNumber = allocNumber;
		this.segmentType = segmentType
	}
}

export let allocationSegments : AllocationSegment[] = [
	new AllocationSegment(1, "111", "222", "333", 1),
	new AllocationSegment(2, "02636", "02636", "02636", 1),
	new AllocationSegment(3, "1234", "1234", "1234", 1),
	new AllocationSegment(4, "01150", "01150-c", "01150-#", 1),	
	new AllocationSegment(5, "111", "222", "333", 2),
	new AllocationSegment(6, "02636", "02636", "02636", 2),
	new AllocationSegment(7, "1234", "1234", "1234", 2),
	new AllocationSegment(8, "01150", "01150-c", "01150-#", 2),	
	new AllocationSegment(9, "111", "222", "333", 3),
	new AllocationSegment(10, "02636", "02636", "02636", 3),
	new AllocationSegment(11, "1234", "1234", "1234", 3),
	new AllocationSegment(12, "01150", "01150-c", "01150-#", 3),	
	new AllocationSegment(13, "111", "222", "333", 4),
	new AllocationSegment(14, "02636", "02636", "02636", 4),
	new AllocationSegment(15, "1234", "1234", "1234", 4),
	new AllocationSegment(16, "01150", "01150-c", "01150-#", 4),	
];	