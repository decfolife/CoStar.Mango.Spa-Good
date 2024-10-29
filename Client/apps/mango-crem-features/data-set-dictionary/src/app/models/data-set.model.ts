export interface DataSet {
  id: number;
  name: string;
  objectTypeID: number | null;
  description: string;
  dataGroupID: number | null;
  assignFinancialFields: boolean | null;
  isFinancialFieldsAssignable: boolean;
  adHocReportCount: number | null;
  listPageCount: number | null;
}

export interface DataSetRequest {
  id: number;
  description: string;
  assignFinancialFields: boolean | null;
}
