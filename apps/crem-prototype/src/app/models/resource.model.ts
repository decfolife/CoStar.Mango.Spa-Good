export class Resource {
    id: number;
    text: string;

	constructor( id, text ) { 		
		this.id = id;
		this.text = text;		
	}
}

export let resources : Resource[] = [
	new Resource(1, 'Management'), 
	new Resource(2, 'Project Manager'), 
	new Resource(3, 'Analyst'), 
	new Resource(4, 'Developer'), 
	new Resource(5, 'Testers'), 
	new Resource(6, 'Trainers'), 
	new Resource(7, 'Technical Communicators'), 
	new Resource(8, 'Deployment Team')
];


