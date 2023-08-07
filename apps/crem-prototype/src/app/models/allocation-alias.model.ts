export class AllocationAlias {
    id: number;
    alias : string;
    segment1 : string;
    segment2 : string;
    segment3 : string;
    segment4 : string;

    constructor(id,alias,segment1,segment2,segment3,segment4) {		
		this.id = id;	
		this.alias = alias;
		this.segment1 = segment1;
		this.segment2 = segment2;
		this.segment3 = segment3;
		this.segment4 = segment4;				
	}
}

export let allocationAliases : AllocationAlias[] = [
	new AllocationAlias(1, "Alias 1", "03", "CDE", "345", null),
	new AllocationAlias(2, "Alias 2", "01150", "ABC", "123", null),
	new AllocationAlias(3, "Alias 3", "RCN Legal", "DEF", "567", null),
	new AllocationAlias(4, "Becca Webinar Alias", "03", "CDE", "345", "Unit 1"),
];	