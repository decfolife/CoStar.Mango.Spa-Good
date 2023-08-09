export class Blackline {
    id : number;
	period : Number;
	portfolio : String;
	entityUniqueIdentifier : String;
	accountNumber : String;
	key3 : String;
	key4 : String;
	key5 : String;
	key6 : String;
	key7 : String;
	key8 : String;
	key9 : String;
	key10 : String;
	periodEndDate : String;
	subledgerReportingBalance : Number;
	subledgerAlternateBalance : Number;
	subledgerAccountBalance : Number;

	constructor( id, period, portfolio, entityUniqueIdentifier, accountNumber, key3, key4, key5, key6, key7, key8, key9, key10, periodEndDate, subledgerReportingBalance, subledgerAlternateBalance, subledgerAccountBalance ) { 		
		this.id = id;
		this.period = period;
		this.portfolio = portfolio;
		this.entityUniqueIdentifier = entityUniqueIdentifier;
		this.accountNumber = accountNumber;
		this.key3 = key3;
		this.key4 = key4;
		this.key5 = key5;
		this.key6 = key6;
		this.key7 = key7;
		this.key8 = key8;
		this.key9 = key9;
		this.key10 = key10;
		this.periodEndDate = periodEndDate;
		this.subledgerReportingBalance = subledgerReportingBalance;
		this.subledgerAlternateBalance = subledgerAlternateBalance;
		this.subledgerAccountBalance = subledgerAccountBalance;		
	}
}

export let blackline : Blackline[] = [
	new Blackline(1, 201911, 'Acme', '01', '8001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(2, 201911, 'Acme', '02', '8001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(3, 201911, 'Acme', '03', '8001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(4, 201911, 'Acme', '04', '8001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(5, 201911, 'Acme', '05', '8001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(6, 201911, 'Acme', '06', '8001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(7, 201911, 'Acme', '01', '9001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(8, 201911, 'Acme', '02', '9001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(9, 201911, 'Acme', '03', '9001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(10, 201911, 'Acme', '04', '9001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(11, 201911, 'Acme', '05', '9001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(12, 201911, 'Acme', '06', '9001EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(13, 201911, 'Acme', '01', '9002EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(14, 201911, 'Acme', '02', '9002EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(15, 201911, 'Acme', '03', '9002EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(16, 201911, 'Acme', '04', '9002EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(17, 201911, 'Acme', '05', '9002EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
	new Blackline(18, 201911, 'Acme', '06', '9002EX', null, null, null, null, null, null, null, null, '2019-11-30', 8000, null, 8000),
];
