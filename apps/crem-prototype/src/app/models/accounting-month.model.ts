export class AccountingMonth {
    id : Number;
    portfolio : String;
	quarter : Number;
	quarterName : String;
	period : Number;
	periodName : String;
	calendar : String;
	isLocked : Boolean;
	isClosed : Boolean;
	periodStart : Date;
	periodEnd : Date;
	year : Number;
	status : String;

	constructor(id,portfolio,quarter,quarterName,period,periodName,calendar,isLocked,isClosed,periodStart,periodEnd,year,status) {
		this.id = id;
		this.portfolio = portfolio;
		this.quarter = quarter;
		this.quarterName = quarterName;
		this.period = period;
		this.periodName = periodName;		
		this.calendar = calendar;
		this.isLocked = isLocked;
		this.isClosed = isClosed;		
		this.periodStart = periodStart;
		this.periodEnd = periodEnd;
		this.year = year;
		this.status = status;
	}
}

export let accountingMonths : AccountingMonth[] = [
	new AccountingMonth(1, 'RE Portfolio', 201901, "2019 Q1", 201901, 'Jan - 2019', 'Standard Calendar', true, true, '2019-01-01', '2019-01-31', 2019, 'Closed'),
	new AccountingMonth(2, 'RE Portfolio', 201901, "2019 Q1", 201902, 'Feb - 2019', 'Standard Calendar', true, true, '2019-02-01', '2019-02-28', 2019, 'Closed'),
	new AccountingMonth(3, 'RE Portfolio', 201901, "2019 Q1", 201903, 'Mar - 2019', 'Standard Calendar', true, true, '2019-03-01', '2019-03-31', 2019, 'Closed'),
	new AccountingMonth(4, 'RE Portfolio', 201902, "2019 Q2", 201904, 'Apr - 2019', 'Standard Calendar', true, true, '2019-04-01', '2019-04-30', 2019, 'Closed'),
	new AccountingMonth(5, 'RE Portfolio', 201902, "2019 Q2", 201905, 'May - 2019', 'Standard Calendar', true, true, '2019-05-01', '2019-05-31', 2019, 'Closed'),
	new AccountingMonth(6, 'RE Portfolio', 201902, "2019 Q2", 201906, 'Jun - 2019', 'Standard Calendar', true, true, '2019-06-01', '2019-06-30', 2019, 'Closed'),
	new AccountingMonth(7, 'RE Portfolio', 201903, "2019 Q3", 201907, 'Jul - 2019', 'Standard Calendar', true, true, '2019-07-01', '2019-07-31', 2019, 'Closed'),
	new AccountingMonth(8, 'RE Portfolio', 201903, "2019 Q3", 201908, 'Aug - 2019', 'Standard Calendar', true, true, '2019-08-01', '2019-08-31', 2019, 'Closed'),
	new AccountingMonth(9, 'RE Portfolio', 201903, "2019 Q3", 201909, 'Sep - 2019', 'Standard Calendar', true, true, '2019-09-01', '2019-09-30', 2019, 'Closed'),
	new AccountingMonth(10, 'RE Portfolio', 201904, "2019 Q4", 201910, 'Oct - 2019', 'Standard Calendar', true, true, '2019-10-01', '2019-10-31', 2019, 'Closed'),
	new AccountingMonth(11, 'RE Portfolio', 201904, "2019 Q4", 201911, 'Nov - 2019', 'Standard Calendar', true, true, '2019-11-01', '2019-11-30', 2019, 'Closed'),
	new AccountingMonth(12, 'RE Portfolio', 201904, "2019 Q4", 201912, 'Dec - 2019', 'Standard Calendar', true, true, '2019-12-01', '2019-12-31', 2019, 'Closed'),

	new AccountingMonth(13, 'RE Portfolio', 202001, "2020 Q1", 202001, 'Jan - 2020', 'Standard Calendar', true, true, '2020-01-01', '2020-01-31', 2020, 'Closed'),
	new AccountingMonth(14, 'RE Portfolio', 202001, "2020 Q1", 202002, 'Feb - 2020', 'Standard Calendar', true, true, '2020-02-01', '2020-02-29', 2020, 'Closed'),
	new AccountingMonth(15, 'RE Portfolio', 202001, "2020 Q1", 202003, 'Mar - 2020', 'Standard Calendar', true, true, '2020-03-01', '2020-03-31', 2020, 'Closed'),
	new AccountingMonth(16, 'RE Portfolio', 202002, "2020 Q2", 202004, 'Apr - 2020', 'Standard Calendar', true, true, '2020-04-01', '2020-04-30', 2020, 'Closed'),
	new AccountingMonth(17, 'RE Portfolio', 202002, "2020 Q2", 202005, 'May - 2020', 'Standard Calendar', true, true, '2020-05-01', '2020-05-31', 2020, 'Closed'),
	new AccountingMonth(18, 'RE Portfolio', 202002, "2020 Q2", 202006, 'Jun - 2020', 'Standard Calendar', true, true, '2020-06-01', '2020-06-30', 2020, 'Closed'),
	new AccountingMonth(19, 'RE Portfolio', 202003, "2020 Q3", 202007, 'Jul - 2020', 'Standard Calendar', true, true, '2020-07-01', '2020-07-31', 2020, 'Closed'),
	new AccountingMonth(20, 'RE Portfolio', 202003, "2020 Q3", 202008, 'Aug - 2020', 'Standard Calendar', true, true, '2020-08-01', '2020-08-31', 2020, 'Closed'),
	new AccountingMonth(21, 'RE Portfolio', 202003, "2020 Q3", 202009, 'Sep - 2020', 'Standard Calendar', true, true, '2020-09-01', '2020-09-30', 2020, 'Closed'),
	new AccountingMonth(22, 'RE Portfolio', 202004, "2020 Q4", 202010, 'Oct - 2020', 'Standard Calendar', true, true, '2020-10-01', '2020-10-31', 2020, 'Closed'),
	new AccountingMonth(23, 'RE Portfolio', 202004, "2020 Q4", 202011, 'Nov - 2020', 'Standard Calendar', false, false, '2020-11-01', '2020-11-30', 2020, 'Open'),
	new AccountingMonth(24, 'RE Portfolio', 202004, "2020 Q4", 202012, 'Dec - 2020', 'Standard Calendar', false, false, '2020-12-01', '2020-12-31', 2020, 'Future'),
];



