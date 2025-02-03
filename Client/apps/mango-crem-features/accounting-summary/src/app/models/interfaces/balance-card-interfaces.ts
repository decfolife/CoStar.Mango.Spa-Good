export interface accountingTerms {
  termInDays: number;
  termInMonths: number;
  termInPeriods: number;
  termInYear: number;
  termString: string;
}

export interface paymentsAmount {
  directCostAmount: number;
  optionAmount: number;
  otherCharges: number;
  selectedPayments: [];
  terminationFee: number;
  transactionAmount: number;
  undiscountedAmount: number;
}
