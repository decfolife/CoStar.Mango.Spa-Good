export class Dependency {
    id: number;
    predecessorId: number;
    successorId: number;
    type: number;

	constructor( id, predecessorId, successorId, type ) { 		
		this.id = id;
		this.predecessorId = predecessorId;
		this.successorId = successorId;
		this.type = type;
	}
}

export let dependencies : Dependency[] = [
	new Dependency(1, 3, 4, 0), 
	new Dependency(2, 4, 5, 0), 
	new Dependency(3, 5, 6, 0), 
	new Dependency(4, 6, 7, 0), 
	new Dependency(5, 7, 9, 0), 
	new Dependency(6, 9, 10, 0), 
	new Dependency(7, 10, 11, 0), 
	new Dependency(8, 11, 12, 0), 
	new Dependency(9, 12, 13, 0), 
	new Dependency(10, 13, 14, 0), 
	new Dependency(11, 14, 15, 0), 
	new Dependency(12, 15, 16, 0), 
	new Dependency(13, 16, 17, 0), 
	new Dependency(14, 17, 19, 0), 
	new Dependency(15, 19, 20, 0), 
	new Dependency(16, 20, 21, 0), 
	new Dependency(17, 21, 22, 0), 
	new Dependency(18, 22, 23, 0), 
	new Dependency(19, 23, 24, 0), 
	new Dependency(20, 24, 25, 0), 
	new Dependency(21, 25, 27, 0), 
	new Dependency(22, 27, 28, 0), 
	new Dependency(23, 28, 29, 0), 
	new Dependency(24, 29, 30, 0), 
	new Dependency(25, 31, 32, 0), 
	new Dependency(26, 37, 38, 0), 
	new Dependency(27, 38, 39, 0), 
	new Dependency(28, 39, 40, 0), 
	new Dependency(29, 40, 41, 0), 
	new Dependency(30, 41, 42, 0), 
	new Dependency(31, 42, 44, 0), 
	new Dependency(32, 44, 45, 0), 
	new Dependency(33, 45, 46, 0), 
	new Dependency(34, 46, 47, 0), 
	new Dependency(35, 47, 48, 0), 
	new Dependency(36, 53, 54, 0), 
	new Dependency(37, 54, 55, 0), 
	new Dependency(38, 55, 56, 0), 
	new Dependency(39, 56, 57, 0), 
	new Dependency(40, 59, 60, 0), 
	new Dependency(41, 60, 61, 0), 
	new Dependency(42, 61, 62, 0), 
	new Dependency(43, 63, 64, 0), 
	new Dependency(44, 64, 65, 0), 
	new Dependency(45, 65, 66, 0), 
	new Dependency(46, 66, 67, 0), 
	new Dependency(47, 69, 70, 0), 
	new Dependency(48, 70, 71, 0), 
	new Dependency(49, 71, 72, 0), 
	new Dependency(50, 72, 73, 0), 
	new Dependency(51, 73, 74, 0), 
	new Dependency(52, 74, 76, 0), 
	new Dependency(53, 76, 77, 0), 
	new Dependency(54, 77, 78, 0), 
	new Dependency(55, 78, 79, 0), 
	new Dependency(56, 79, 80, 0), 
	new Dependency(57, 80, 81, 0), 
	new Dependency(58, 81, 83, 0), 
	new Dependency(59, 83, 84, 0), 
	new Dependency(60, 84, 85, 0), 
	new Dependency(61, 85, 86, 0), 
	new Dependency(62, 86, 87, 0)
];

export let projectTimelineDependencies : Dependency[] = [

];


