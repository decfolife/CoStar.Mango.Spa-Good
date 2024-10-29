export interface ScheduleTransaction {
  leaseRecognitionScheduleEventID: number;
  glEventID: number;
  glEventName?: string;
  paymentEventSource: string;
  paymentFrequency?: string;
  recurringAmount?: number;
  chargeCurrencyID?: number;
  chargeCurrency?: string;
  chargeCurrencyDecimalPrecision: number;
  conversionRate: number;
  scheduleCurrencyID?: number;
  scheduleCurrency?: string;
  scheduleCurrencyDecimalPrecision: number;
  convertDate?: Date;
  eventBeginDate?: Date;
  eventEndDate?: Date;

  units?: number;
  measureArea?: string;
  vendorName?: string;
  isProrated?: boolean;
  prorationName?: string;
  firstRecurringDate?: Date;

  glAccountID?: number;
  glAccountName?: string;
  glAccountCode?: string;
  glCategoryName?: string;
  glAccountPolicyTypeName?: string;
  ifrsGLAccountPolicyTypeName?: string;
  processingStatus?: string;
  createdDate?: Date;
  createdByName?: string;
  lastModifiedDate?: Date;
  lastModifiedByName?: string;
  glEventNotes?: string;
  transactions?: Transaction[];
}

export interface Transaction {
  transactionID: number;
  dueBy: Date;
  baseAmount: number;
  conversionRate: number;
  targetAmount: number;
  transactionEndDate?: Date;
  processingStatus?: string;
}
