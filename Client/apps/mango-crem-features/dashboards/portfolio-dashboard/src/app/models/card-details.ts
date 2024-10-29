import { Dropdown } from '@mango/data-models/lib-data-models';
import { ChartData } from './chartData';
import { GridData } from './grid-data';

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
  filterInitialValue?: any;
  moreOptions?: any;
  contentType: 'table' | 'chart';
  width?: '49' | '100';
  gridData?: GridData;
  chartData?: ChartData;
  dispCard: boolean;
}
