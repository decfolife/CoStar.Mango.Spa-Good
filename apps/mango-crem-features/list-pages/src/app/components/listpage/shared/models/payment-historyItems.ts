export interface PaymentHistoryItems {
  fieldName: string;
  changeDate: Date;   //DateTime on the backend
  lastModifiedByID: number;    //int on the backend
  user: string;
  description: string;
  oldValue: string;
  newValue: string;
}
  