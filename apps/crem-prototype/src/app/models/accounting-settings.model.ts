export class AccountingSettings {
	portfolio : String;
	accountingCalendar : String;
	amortizationMethod : String;
	defaultPaymentTiming : String;
	isJournalEntryProfileRequired : Boolean;
	defaultCompoundFrequency : String;
	isFunctionalCurrencyEnabled : Boolean;
	isDiscountRateMatchingEnabled : Boolean;
	isDirectEntryAllowed : Boolean;
	minMonthsOperator : String;
	defaultAnnualRateType : String;
	maxMonthsOperator : String;

	
	constructor( portfolio,accountingCalendar,amortizationMethod,defaultPaymentTiming,isJournalEntryProfileRequired,defaultCompoundFrequency,isFunctionalCurrencyEnabled,isDiscountRateMatchingEnabled,isDirectEntryAllowed,minMonthsOperator,defaultAnnualRateType,maxMonthsOperator) {
		this.portfolio = portfolio;
		this.accountingCalendar = accountingCalendar;
		this.amortizationMethod = amortizationMethod;
		this.defaultPaymentTiming = defaultPaymentTiming;
		this.isJournalEntryProfileRequired = isJournalEntryProfileRequired;
		this.defaultCompoundFrequency = defaultCompoundFrequency;
		this.isFunctionalCurrencyEnabled = isFunctionalCurrencyEnabled;
		this.isDiscountRateMatchingEnabled = isDiscountRateMatchingEnabled;
		this.isDirectEntryAllowed = isDirectEntryAllowed;
		this.minMonthsOperator = minMonthsOperator;
		this.defaultAnnualRateType = defaultAnnualRateType;
		this.maxMonthsOperator = maxMonthsOperator;	
	}
}

export let accountingSettings : AccountingSettings[] = [
	new AccountingSettings("RE Portfolio", "Gregorian Calendar", "Periodic", "Beginning of Period", true, "Monthly", true, true, false, "Greater Than", "APR", "Less Than or Equal To"),
];
