
export class JournalEntryAccount {
	id : number;
	journalEntryProfileId : number;
	accountName : string;
	description : string;
	accountCode : string;
	accountSubCode : string;
	debitCredit : string;	
	monthEnd : boolean;
	openingBalance : boolean;
	adjustment : boolean;
	retroAdjustment : boolean;
	accountType : string;
	isActive : boolean;

	constructor( id,journalEntryProfileId,accountName,description,accountCode,accountSubCode,debitCredit,monthEnd,openingBalance,adjustment,retroAdjustment,accountType,isActive ) {
		this.id = id;
		this.journalEntryProfileId = journalEntryProfileId;
		this.accountName = accountName;
		this.description = description;
		this.accountCode = accountCode;
		this.debitCredit = debitCredit;
		this.accountSubCode = accountSubCode;
		this.monthEnd = monthEnd;
		this.openingBalance = openingBalance;
		this.adjustment = adjustment;
		this.retroAdjustment = retroAdjustment;
		this.accountType = accountType;
		this.isActive = isActive;
	}
}

export let journalEntryAccounts : JournalEntryAccount[] = [
	new JournalEntryAccount(1, 1, 'Adjustment Gain Loss', 'Adjustment Gain Loss', '2100EX', '', 'C', false, false, true, true, '', true),
	new JournalEntryAccount(2, 1, 'Deferred Rent Balance', 'Deferred Rent Balance', '2001EX', '', 'C', false, true, false, true, '', true),
	new JournalEntryAccount(3, 1, 'Direct Costs', 'Direct Costs', '6001EX', '', 'C', false, true, false, true, '', true),
	new JournalEntryAccount(4, 1, 'L/T Lease Liability', 'L/T Lease Liability', '9002EX', '', 'C', false, true, false, false, '', true),
	new JournalEntryAccount(5, 1, 'L/T Lease Liability', 'L/T Lease Liability', '9002EX', '', 'D', true, false, false, true, '', true),
	new JournalEntryAccount(6, 1, 'L/T Lease Liability Adjust', 'L/T Lease Liability Adjust', '9002EX', '', 'C', false, false, true, true, '', true),
	new JournalEntryAccount(7, 1, 'Level Expense', 'Level Expense', '5001EX', '', 'D', true, false, false, true, '', true),
	new JournalEntryAccount(8, 1, 'Payment/Cash', 'Payment/Cash', '6001EX', '', 'C', true, true, false, true, '', true),
	new JournalEntryAccount(9, 1, 'ROU Asset', 'ROU Asset', '8001EX', '', 'C', true, false, false, true, '', true),
	new JournalEntryAccount(10, 1, 'ROU Asset', 'ROU Asset', '8001EX', '', 'D', false, true, false, false, '', true),
	new JournalEntryAccount(11, 1, 'ROU Asset Adjust', 'ROU Asset Adjust', '8001EX', '', 'D', false, false, true, true, '', true),
	new JournalEntryAccount(12, 1, 'S/T Lease Liability', 'S/T Lease Liability', '9001EX', '', 'C', false, true, false, false, '', true),
	new JournalEntryAccount(13, 1, 'S/T Lease Liability', 'S/T Lease Liability', '9001EX', '', 'D', true, false, false, true, '', true),
	new JournalEntryAccount(14, 1, 'S/T Lease Liability Adjust', 'S/T Lease Liability Adjust', '9001EX', '', 'C', false, false, true, true, '', true),
	new JournalEntryAccount(15, 1, 'Termination Fee', 'Termination Fee', '3001EX', '', 'C', false, false, true, true, '', true)	
];
