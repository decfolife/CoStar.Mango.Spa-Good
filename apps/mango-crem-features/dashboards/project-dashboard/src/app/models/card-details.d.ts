export interface CardDetails {
  title: string;
  subtitle: string;
  id: string;
  elementId: number;
  elementTypeId: number;
  elementOrder: number;
  isActive: boolean;
  counter?: number;
  showCustomHeader?: boolean;
  filterData?: Dropdown[];
  filterInitialValue?: Dropdown;
  contentType: 'table' | 'chart';
  width?: '49' | '100';
  gridData?: GridData;
  chartData?: ChartData;
  moreOptions?: any;
  dispCard: boolean;
}
