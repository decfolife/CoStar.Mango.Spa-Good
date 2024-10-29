export interface OtherCharge {
  glEventID: number;
  leaseRecognitionScheduleID: number;
  amount: number;
  frequency: number;
  startDate: Date;
  endDate: Date;
  isProrated: boolean;
  prorationType: number;
  isPartialPeriod: boolean;
  firstRecurringDate: Date;
  firstPaymentAmount: number;
  lastPaymentAmount: number;
  currencyID: number;
  isDirectCost: boolean;
  otherChargeName: string;
}
