export interface GridData {
  dataSource: any[];
  id: string;
  grouping?: boolean;
  paging?: boolean;
  allowSorting?: boolean;
  headerFilter?: {
    allowSearch?: boolean;
    height?: number;
    searchTimeout?: number;
    texts?: {
      cancel?: string;
      emptyValue?: string;
      ok?: string;
    };
    visible?: boolean;
    width?: number;
  };
  buttonColumn?: ButtonColumn;
}
