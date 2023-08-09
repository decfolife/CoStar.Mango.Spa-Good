export class AccountingMeasurement {
    id : Number;
	accountingScheduleId : Number;
	leaseId : Number;
	measureIndex : String;
	measureType : String;
	status : String;
	beginDate : String;
	endDate : String;
	termYears : Number;
	numberPeriods : Number;
	totalAmount : Number;
	discountRate : Number;
	presentValue : Number;
	directCosts : Number;
	beginningAssetBalance : Number;
	beginningLiabilityBalance : Number;
	levelExpense : Number;
	assetAmortization : Number;
	localCurrency : String;
	reportingException : String;
	chargeType : String;
	isImpaired : String;
	lastModifiedBy : String;
	lastModifiedDate : String;

	constructor( id,accountingScheduleId,leaseId,measureIndex,measureType,status,beginDate,endDate,termYears,numberPeriods,totalAmount,discountRate,presentValue,directCosts,beginningAssetBalance,beginningLiabilityBalance,levelExpense,assetAmortization,localCurrency,reportingException,chargeType,isImpaired,lastModifiedBy,lastModifiedDate) {
		this.id = id;
		this.accountingScheduleId = accountingScheduleId;	
		this.leaseId = leaseId;	
		this.measureIndex = measureIndex;
		this.measureType = measureType;
		this.status = status;
		this.beginDate = beginDate;
		this.endDate = endDate;
		this.termYears = termYears;
		this.numberPeriods = numberPeriods;
		this.totalAmount = totalAmount;
		this.discountRate = discountRate;
		this.presentValue = presentValue;
		this.directCosts = directCosts;
		this.beginningAssetBalance = beginningAssetBalance;
		this.beginningLiabilityBalance = beginningLiabilityBalance;
		this.levelExpense = levelExpense;
		this.assetAmortization = assetAmortization;
		this.localCurrency = localCurrency;
		this.reportingException = reportingException; 
		this.chargeType = chargeType;
		this.isImpaired = isImpaired;
		this.lastModifiedBy = lastModifiedBy;
		this.lastModifiedDate = lastModifiedDate;
	}
}

export let accountingMeasurements : AccountingMeasurement[] = [
	new AccountingMeasurement(1, 0, null, 1, "Initial", "Historical", "1/1/2019", "12/31/2021", 3.00, 36.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
	new AccountingMeasurement(2, 0, null, 2, "Data Correction", "Historical", "1/1/2019", "12/31/2021", 3.00, 36.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
	new AccountingMeasurement(3, 0, null, 3, "Data Correction", "Historical", "1/1/2019", "12/31/2021", 3.00, 36.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
	new AccountingMeasurement(4, 0, null, 4, "Impairment", "Historical", "7/1/2017", "12/31/2019", 2.50, 30.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
	new AccountingMeasurement(5, 0, null, 5, "Renewal", "Historical", "1/1/2018", "12/31/2020", 3.00, 36.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
	new AccountingMeasurement(6, 0, null, 6, "Data Correction", "Historical", "1/1/2018", "12/31/2021", 4.00, 48.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
	new AccountingMeasurement(7, 0, null, 7, "Data Correction", "Historical", "1/1/2018", "12/31/2021", 4.00, 48.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
	new AccountingMeasurement(8, 0, null, 8, "Partial Termination", "In Process", "7/1/2018", "12/31/2021", 3.50, 42.00, 401510.40, 0.050000, 370888.48, 0.00, 373888.48, 362888.48, 11236.40, 0.00, "USD", "No", "Expense", "No", "Jason Trkovsky", "4/17/2019"),
];




