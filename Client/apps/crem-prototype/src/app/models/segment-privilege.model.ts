export class SegmentPrivilege {
    id: number;
    segmentId : number;
    entityType : string;
    entityName : string;
    privilegeType : string;

    constructor(id, segmentId, entityType, entityName, privilegeType) {
    	this.id = id;
    	this.segmentId = segmentId;
    	this.entityType = entityType;
    	this.entityName = entityName;
    	this.privilegeType = privilegeType;    	
    }
}

export let segmentPrivileges : SegmentPrivilege[] = [
	new SegmentPrivilege(1, 2, 'Group', "The Whole Company", "View"),
    new SegmentPrivilege(2, 2, 'User', "Alexander Hamilton", "Delete"),   
    new SegmentPrivilege(3, 2, 'User', "George Washington", "Delete"),   
    new SegmentPrivilege(4, 2, 'User', "Aaron Burr", "Delete"),   
    new SegmentPrivilege(5, 2, 'User', "James Madison", "Delete"),   
    new SegmentPrivilege(6, 2, 'User', "Thomas Jefferson", "Delete"),   
    new SegmentPrivilege(7, 2, 'User', "John Adams", "Delete"),   
    new SegmentPrivilege(8, 2, 'User', "Thomas Lee", "Delete"),   
    new SegmentPrivilege(9, 2, 'User', "John Lawrence", "Delete"),   
    new SegmentPrivilege(10, 2, 'User', "Hercules Mulligan", "Delete"),   
    new SegmentPrivilege(11, 2, 'User', "Elizabeth Scuyler", "Delete"),   
    new SegmentPrivilege(12, 2, 'User', "Mariah Reynolds", "Delete"), 
	

];	