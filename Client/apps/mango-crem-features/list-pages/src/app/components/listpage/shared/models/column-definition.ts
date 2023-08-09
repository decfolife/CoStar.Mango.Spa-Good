export interface ColumnDefinition {
  caption: string;
  dataField: string;
  dataType: string;
  fieldType: number;
  format: string | null;
  urlLink: string;
  visibleIndex: number;
  useDefaultObjectFields: boolean | null;
  displayOrder: number;
}
