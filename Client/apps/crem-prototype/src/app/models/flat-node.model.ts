export class FlatNode {
	expandable: boolean;
	name: string;
	level: number;	

	constructor( expandable, name, level ) {
		this.expandable = expandable;
		this.name = name;
		this.level = level;			
	}
}
