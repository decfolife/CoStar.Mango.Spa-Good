export class ExchangeRate {
  portfolio: string;
  rateSets: string;
  effectiveDate: Date;
  baseCurrency: string;
  targetCurrency: string;
  isCurrent: boolean;
  rate: number;
  period: string;
  lastModified: Date;
  lastModifiedBy: string;

  constructor(portfolio, rateSets, effectiveDate, baseCurrency, targetCurrency, isCurrent, rate, period, lastModified, lastModifiedBy) {
    this.portfolio = portfolio;
    this.rateSets = rateSets;
    this.effectiveDate = effectiveDate;
    this.baseCurrency = baseCurrency;
    this.targetCurrency = targetCurrency;
    this.isCurrent = isCurrent;
    this.rate = rate;
    this.period = period;
    this.lastModified = lastModified;
    this.lastModifiedBy = lastModifiedBy;
  }
}

export interface ExchangeRateSetDataRequest {
  portfolioId: number;
  periods: string;
}

