export interface FunctionalCurrencyRateLookupResponse {
  leaseAbstractID: number;
  termBegin: Date;
  localCurrency: string;
  functionalCurrency: string;
  lookupResult: boolean;
  resultMessage?: string;
  functionalRate?: number;
  functionalRatePeriod?: number;
  functionalRateModifiedDate?: Date;
  portfolioID?: number;
  portfolioName?: string;
  calendarID?: number;
  calendarName?: string;
  rateSetID?: number;
  rateSetName?: string;
  portfolioSettingRateSetName?: string;
  portfolioSettingPeriod?: string;
}
