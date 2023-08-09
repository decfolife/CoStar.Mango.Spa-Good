export class Group {
    id : Number;
    name : String;
	users : String[];

	constructor(id,name,users) {
		this.id = id;
		this.name = name;
		this.users = users;
	}
}

export let groups : Group[] = [
];



