export interface ChargeDetails {
  paymentName: string;
  paymentFrequency: string;
  amount: string;
  currency: string;
  startDate: string;
  endDate: string;
  area: number; //double on the backend;
  isProrated: boolean;
  prorationType: string;
  firstPaymentDate: string;
  glAccountName: string;
  glAccountCode: string;
  glCategory: string;
  vendorDisplay: string;
  recognitionCategoryGAAP: string;
  recognitionCategoryIFRS: string;
  processingStatus: string;
  createdDate: string;
  createdByID: number; //int on the backend
  createdBy: string;
  modifiedDate: string;
  modifiedByID: number;
  modifiedBy: string;
  glEventID: number;
  glEventSourceImportID: string;
  glEventNotes: string;
}
