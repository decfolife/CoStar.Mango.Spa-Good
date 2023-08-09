export class LeaseAdditionalClause {
    id : Number;
    leaseId : Number;
    clauseType : String;
	clause : String;
	doc : string;
	section : string;
	page : string;
	
	constructor(id,clauseType,clause,doc,section,page) {
		this.id = id;
		this.clauseType = clauseType;
		this.clause = clause;
		this.doc = doc;
		this.section = section;
		this.page = page;
	}
}

export let leaseAdditionalClauses : LeaseAdditionalClause[] = [	
];



