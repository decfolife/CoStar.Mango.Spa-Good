export interface SchedulePayment {
  leaseRecognitionScheduleEventID?: number;
  leaseRecognitionScheduleID?: number;
  glAccountID: number;
  glAccountName?: string;
  glEventID: number;
  glEventName?: string;
  optionID?: number;
  paymentEventSource?: string;
  eventBeginDate?: Date;
  eventEndDate?: Date;
  processingStatus?: string;
  isDirectCost: boolean;
  isReasonablyCertain: boolean;
  isTerminationFee: boolean;
  isOtherCharge: boolean;
  paymentFrequency?: string;
  numberOfPayments: number;
  isProrated: boolean;
  recurringAmount: number;
  chargeCurrencyID?: number;
  chargeCurrency?: string;
  chargeCurrencyDecimalPrecision?: number;
  conversionRate?: number;
  convertDate?: Date;
  targetAmountInPeriod?: number;
  scheduleCurrencyID?: number;
  scheduleCurrency?: string;
  scheduleCurrencyDecimalPrecision?: number;
}

export interface SchedulePaymentTransaction {
  glEventID: number;
  paymentEventSource: string;
  glAccountID?: number;
  leaseOptionID?: number;
  actualTransactionAmount: number;
  dueBy: Date;
  transactionEndDate: Date;
}
