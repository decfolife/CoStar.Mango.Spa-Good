export class TemplateTypes {
  private constructor() {}

  static Forms: number = 0;
  static Financials: number = 1;
  static Options: number = 2;
  static Notes: number = 3;
  static Accounting: number = 4;
  static OptionCharges: number = 5;
  static OptionIncome: number = 6;
  static AccountingCalendar: number = 7;
  static ExchangeRates: number = 8;
  static PortfolioAllocations: number = 9;
  static LeaseAllocations: number = 10;
  static APHistory: number = 11;
  static DiscountRates: number = 12;

  static getAll(): { id: number; name: string }[] {
    return [
      { id: TemplateTypes.Forms, name: 'Forms' },
      { id: TemplateTypes.Accounting, name: 'Accounting' },
      { id: TemplateTypes.AccountingCalendar, name: 'Accounting Calendar' },
      { id: TemplateTypes.APHistory, name: 'AP History' },
      { id: TemplateTypes.ExchangeRates, name: 'Exchange Rates' },
      { id: TemplateTypes.Financials, name: 'Financials' },
      { id: TemplateTypes.LeaseAllocations, name: 'Lease Allocations' },
      { id: TemplateTypes.Notes, name: 'Notes' },
      { id: TemplateTypes.Options, name: 'Options' },
      { id: TemplateTypes.OptionCharges, name: 'Option Charges' },
      // { id: TemplateTypes.OptionIncome, name: 'Option Income' },
      { id: TemplateTypes.PortfolioAllocations, name: 'Portfolio Allocations' },
      { id: TemplateTypes.DiscountRates, name: 'Discount Rates' },
    ];
  }
}
