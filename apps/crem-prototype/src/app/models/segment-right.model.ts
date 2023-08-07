export class SegmentRight {
    id: number;
    segmentId : number;
    userId : number;
    isShared : boolean;

    constructor(id,segmentId,userId,isShared) {		
		this.id = id;	
		this.segmentId = segmentId;
		this.userId = userId;
		this.isShared = isShared;
	}
}

export let segmentRights : SegmentRight[] = [
	new SegmentRight(1, 1, 1, false),
	new SegmentRight(1, 2, 1, false),
	new SegmentRight(1, 3, 1, true),
	new SegmentRight(1, 4, 1, true),
	new SegmentRight(1, 5, 1, true),
	new SegmentRight(1, 10, 1, false),
	new SegmentRight(1, 11, 1, false),
	new SegmentRight(1, 12, 1, false),
	new SegmentRight(1, 13, 1, true),
	new SegmentRight(1, 14, 1, true),
	

];	