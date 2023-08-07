export class ClassificationType {
    id : number;
	classificationType : string;
	
	constructor( id, classificationType ) {
		this.id = id;
		this.classificationType = classificationType;		
	}
}

export let classificationTypes : ClassificationType[] = [
	new ClassificationType(1, 'Finance ASC 842'),
	new ClassificationType(2, 'Operating ASC 842'),
	new ClassificationType(3, 'Capital ASC 840'),
	new ClassificationType(4, 'Operating ASC 840'),
	new ClassificationType(5, 'IFRS 16'),
	new ClassificationType(6, 'Operating Lessor'),
	
];	