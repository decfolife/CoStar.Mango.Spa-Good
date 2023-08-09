import { MilestonesData } from '@mango/data-models/lib-data-models';

export interface MilestoneCardDetails {
  title: string;
  subtitle: string;
  id: string;
  counter?: number;
  showCustomHeader?: boolean;
  filterData?: Dropdown[];
  filterInitialValue?: Dropdown;
  contentType: 'table' | 'chart';
  width?: '49' | '100';
  gridData: {
    dataSource: MilestonesData[];
  };
}
