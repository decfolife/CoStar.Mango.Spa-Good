export class ResourceAssignment {
    id: number;
    taskId: number;
    resourceId: number;

	constructor( id, taskId, resourceId ) { 		
		this.id = id;
		this.taskId = taskId;	
		this.resourceId = resourceId;	
	}
}

export let resourceAssignments : ResourceAssignment[] = [
	new ResourceAssignment(0, 3, 1), 
	new ResourceAssignment(1, 4, 1), 
	new ResourceAssignment(2, 5, 2), 
	new ResourceAssignment(3, 6, 2), 
	new ResourceAssignment(4, 9, 3), 
	new ResourceAssignment(5, 10, 3), 
	new ResourceAssignment(6, 11, 2), 
	new ResourceAssignment(7, 12, 2), 
	new ResourceAssignment(8, 12, 3), 
	new ResourceAssignment(9, 13, 3), 
	new ResourceAssignment(10, 14, 2), 
	new ResourceAssignment(11, 15, 1), 
	new ResourceAssignment(12, 15, 2), 
	new ResourceAssignment(13, 16, 2), 
	new ResourceAssignment(14, 19, 3), 
	new ResourceAssignment(15, 20, 3), 
	new ResourceAssignment(16, 21, 3), 
	new ResourceAssignment(17, 22, 1), 
	new ResourceAssignment(18, 23, 1), 
	new ResourceAssignment(19, 24, 1), 
	new ResourceAssignment(20, 24, 2), 
	new ResourceAssignment(21, 27, 4), 
	new ResourceAssignment(22, 28, 4), 
	new ResourceAssignment(23, 29, 4), 
	new ResourceAssignment(24, 30, 4), 
	new ResourceAssignment(25, 31, 4), 
	new ResourceAssignment(26, 34, 5), 
	new ResourceAssignment(27, 35, 5), 
	new ResourceAssignment(28, 37, 5), 
	new ResourceAssignment(29, 38, 5), 
	new ResourceAssignment(30, 39, 5), 
	new ResourceAssignment(31, 40, 5), 
	new ResourceAssignment(32, 41, 5), 
	new ResourceAssignment(33, 44, 5), 
	new ResourceAssignment(34, 45, 5), 
	new ResourceAssignment(35, 46, 5), 
	new ResourceAssignment(36, 47, 5), 
	new ResourceAssignment(37, 50, 6), 
	new ResourceAssignment(38, 51, 6), 
	new ResourceAssignment(39, 52, 6), 
	new ResourceAssignment(40, 53, 6), 
	new ResourceAssignment(41, 54, 6), 
	new ResourceAssignment(42, 55, 6), 
	new ResourceAssignment(43, 56, 6), 
	new ResourceAssignment(44, 59, 7), 
	new ResourceAssignment(45, 60, 7), 
	new ResourceAssignment(46, 61, 7), 
	new ResourceAssignment(47, 62, 7), 
	new ResourceAssignment(48, 63, 7), 
	new ResourceAssignment(49, 64, 7), 
	new ResourceAssignment(50, 65, 7), 
	new ResourceAssignment(51, 66, 7), 
	new ResourceAssignment(52, 69, 2), 
	new ResourceAssignment(53, 71, 8), 
	new ResourceAssignment(54, 72, 8), 
	new ResourceAssignment(55, 73, 8), 
	new ResourceAssignment(56, 76, 8), 
	new ResourceAssignment(57, 77, 8), 
	new ResourceAssignment(58, 78, 8), 
	new ResourceAssignment(59, 79, 8), 
	new ResourceAssignment(60, 80, 8), 
	new ResourceAssignment(61, 83, 2), 
	new ResourceAssignment(62, 84, 2), 
	new ResourceAssignment(63, 85, 2)
];

export let projectTimelineResourceAssignments : ResourceAssignment[] = [
	// new ResourceAssignment(1, 1000, 2),
	// new ResourceAssignment(2, 1001, 2),
	// new ResourceAssignment(3, 1002, 2),
	// new ResourceAssignment(4, 1003, 2),
	// new ResourceAssignment(5, 1004, 2),
	// new ResourceAssignment(6, 1005, 2),
	// new ResourceAssignment(7, 1006, 2),
	// new ResourceAssignment(8, 1007, 2),
	// new ResourceAssignment(9, 1008, 2),
	// new ResourceAssignment(10, 1009, 2),
	// new ResourceAssignment(11, 1010, 2),
	// new ResourceAssignment(12, 1011, 2),
];


