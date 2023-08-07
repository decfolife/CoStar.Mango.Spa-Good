
export class JournalEntryProfile {
	id : number;
	portfolio : string;
	name : string;
	classificationType : string;
	exportDebitCode : string;
	exportCreditCode : string;
	useAbsoluteValues : boolean;
	comments : string;
	isActive : boolean;

	constructor( id,portfolio,name,classificationType,exportDebitCode,exportCreditCode,useAbsoluteValues,comments,isActive ) {
		this.id = id;
		this.portfolio = portfolio;
		this.name = name;
		this.classificationType = classificationType;
		this.exportDebitCode = exportDebitCode;
		this.exportCreditCode = exportCreditCode;
		this.useAbsoluteValues = useAbsoluteValues;
		this.comments = comments;
		this.isActive = isActive;
	}
}

export let journalEntryProfiles : JournalEntryProfile[] = [
	new JournalEntryProfile(1, 'RE Portfolio', 'Default 842 Finance', 'Finance (ASC 842)', 'D', 'C', true, '', true),	
	new JournalEntryProfile(2, 'RE Portfolio', 'Default 842 Operating', 'Operating (ASC 842)', 'D', 'C', true, '', true),	
	new JournalEntryProfile(3, 'RE Portfolio', 'Default IFRS 16', 'IFRS 16', 'D', 'C', true, '', true),	
	new JournalEntryProfile(4, 'RE Portfolio', 'Default 842 Finance [F]', 'Finance (ASC 842)', 'D', 'C', true, '', true),	
	new JournalEntryProfile(5, 'RE Portfolio', 'Default 842 Operating [F]', 'Operating (ASC 842)', 'D', 'C', true, '', true),	
	new JournalEntryProfile(6, 'RE Portfolio', 'Default Operating Lessor', 'Operating (Lessor)', 'D', 'C', true, '', true),	
	new JournalEntryProfile(7, 'RE Portfolio', 'Default Capital Income Lessor', 'Capital Income (Lessor)', 'D', 'C', true, '', true)
];



