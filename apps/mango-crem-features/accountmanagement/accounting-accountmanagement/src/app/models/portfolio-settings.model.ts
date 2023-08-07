export class PortfolioSettings {
    masterGroupID: number;
    leaseRecognitionCalendarID: number;
    amortizationMethodType: number;
    defaultPaymentTimingType: number;
    journalEntryProfileRequired: boolean;
    defaultCompoundFrequencyType: number;
    functionalCurrencyEnabled: boolean;
    discountRateMatching: boolean;
    directEntryDiscountRateEnabled: boolean;
    defaultAnnualRateType: number;
    minMonthsOperator: number;
    maxMonthsOperator: number;
    functionalCurrencyRateset: string;
    functionalCurrencyPeriod: string;
    directEntryFunctionalCurrencyRateEnabled: boolean;

    constructor(masterGroupID, leaseRecognitionCalendarID, amortizationMethodType, defaultPaymentTimingType, journalEntryProfileRequired, defaultCompoundFrequencyType, functionalCurrencyEnabled,
                discountRateMatching, directEntryDiscountRateEnabled, defaultAnnualRateType, minMonthsOperator, maxMonthsOperator, functionalCurrencyRateset, functionalCurrencyPeriod, directEntryFunctionalCurrencyRateEnabled) {
        this.masterGroupID = masterGroupID;
        this.leaseRecognitionCalendarID = leaseRecognitionCalendarID;
        this.amortizationMethodType = amortizationMethodType;
        this.defaultPaymentTimingType = defaultPaymentTimingType;
        this.journalEntryProfileRequired = journalEntryProfileRequired;
        this.defaultCompoundFrequencyType = defaultCompoundFrequencyType;
        this.functionalCurrencyEnabled = functionalCurrencyEnabled;
        this.discountRateMatching = discountRateMatching;
        this.directEntryDiscountRateEnabled = directEntryDiscountRateEnabled;
        this.defaultAnnualRateType = defaultAnnualRateType;
        this.minMonthsOperator = minMonthsOperator;
        this.maxMonthsOperator = maxMonthsOperator;
        this.functionalCurrencyRateset = functionalCurrencyRateset;
        this.functionalCurrencyPeriod = functionalCurrencyPeriod;
        this.directEntryFunctionalCurrencyRateEnabled = directEntryFunctionalCurrencyRateEnabled;
    }
}
