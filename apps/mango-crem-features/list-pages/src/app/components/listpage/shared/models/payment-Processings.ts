export interface PaymentProcessings {
  dueByYear: number;
  dueBy: Date;    //DateTime on backend
  gLScheduledTransactionID: number;
  scheduledAmount: string;
  approvedDate: string;
  approvedBy: string;
  submittedDate: string;
  submittedBy: string;
  exportDate: string;
  exportedByID?: number;
  exportedBy: string;
}
  