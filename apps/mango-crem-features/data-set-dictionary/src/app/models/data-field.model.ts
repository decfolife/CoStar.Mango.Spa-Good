export interface DataField {
  dataFieldID: number,
  dataFieldName: string,
  categoryID: number | null,
  categoryName: string,
  dataFieldDataType: number | null,
  dataTypeLabel: string,
  columnWidth: number | null,
  defaultFormatForReports: string,
  dataFieldAlignment: string,
  dataFieldDescription: string,
  columnGroupID: number | null,
  columnFieldID: number | null,
  columnReportLabel: string,
  updateAllDataSets: boolean,
  formItemID: number | null,
  formItemLabel: string,
};

export interface DataFieldRequest {
  dataFieldID: number,
  dataFieldName: string,
  columnWidth: number | null,
  dataTypeFormatString: string,
  dataFieldAlignment: ColumnAlignment,
  dataFieldDescription: string,
};

export enum ColumnAlignment {
  None,
  Left,
  Center,
  Right,
};
