import { SegmentCriterion } from './segment-criterion.model';

export class SegmentCriteriaBlock {
    id: number;
    segmentId : number;
    sortOrder : number;
    criteria : SegmentCriterion[];

    constructor(id,segmentId,sortOrder,criteria) {		
		this.id = id;	
		this.segmentId = segmentId;
		this.sortOrder = sortOrder;
        this.criteria = criteria;
	}
}

export let segmentCriteriaBlocks : SegmentCriteriaBlock[] = [
    new SegmentCriteriaBlock(1, 2, 1, [
        new SegmentCriterion(1, 1, 2, 'Project Status', '=', 'Active'), 
        new SegmentCriterion(1, 1, 2, 'Project Status', '=', 'In Process'),        
    ]),
    new SegmentCriteriaBlock(2, 2, 2, [
        new SegmentCriterion(2, 2, 2, 'Project Type', '=', 'Renewal'),        
    ]),
];	