export interface PortfolioSettingsResponse {
  masterGroupID: number;
  leaseRecognitionCalendarID: number;
  calendarName: string;
  calendarMinDate: Date;
  calendarMaxDate: Date;
  maxCalendarPeriod: number;
  IisLessor: boolean;
  directEntryDiscountRateEnabled: boolean;
  functionalCurrencyEnabled: boolean;
  journalEntryProfileRequired: boolean;
  amortizationMethodType: number;
  defaultAnnualRateType: number;
  defaultCompoundFrequencyType: number;
  defaultPaymentTimingType: number;
  discountRateMatching: boolean;
  minMonthsOperator: string;
  maxMonthsOperator: string;
  functionalCurrencyRateset: string;
  functionalCurrencyPeriod: string;
  directEntryFunctionalCurrencyRateEnabled: boolean;
}
