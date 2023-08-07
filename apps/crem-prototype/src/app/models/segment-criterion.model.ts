export class SegmentCriterion {
    id: number;
    segmentCriteriaBlockId : number;
    segmentId : number;
    dataField : string;
    operator : string;
    value : string;

    constructor(id,segmentId,segmentCriteriaBlockId,dataField,operator,value) {		
		this.id = id;	
    this.segmentCriteriaBlockId = segmentCriteriaBlockId;
		this.segmentId = segmentId;
		this.dataField = dataField;
		this.operator = operator;
		this.value = value;
	}
}

export let segmentCriteria : SegmentCriterion[] = [
];	