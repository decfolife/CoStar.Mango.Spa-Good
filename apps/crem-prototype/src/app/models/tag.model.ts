export class Tag {
    id: number;
    tagName : string;

    constructor(id,tagName) {		
		this.id = id;
		this.tagName = tagName;	
	}
}

export let tags : Tag[] = [
	new Tag(1, "Accounting"),
	new Tag(2, "Data Validation"),
    new Tag(3, "Lease"),
    new Tag(4, "QA"),
    new Tag(5, "Security Audit"),
];	