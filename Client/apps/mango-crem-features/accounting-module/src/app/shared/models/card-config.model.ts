import { SortingOrder } from '@mango/data-models/lib-data-models';
export interface CardConfigObject {
  // This is used to standardize the info needed to load an accounting card
  allowDrillDown: boolean;
  apiEndPoint: string;
  cardType: any;
  enableChart: boolean;
  exportFileNameOverride: string;
  fullWidth: boolean;
  id: number;
  pivotDataSource: {
    fields: any;
    store: any;
  };
  showGrandTotal: boolean;
  title: string;
  visible: boolean;
}

export function rowSort(a?, b?, sortingOrder?: SortingOrder) {
  if (sortingOrder?.[a.value] > sortingOrder?.[b.value]) return 1;
  if (sortingOrder?.[b.value] > sortingOrder?.[a.value]) return -1;
  else return 0;
}
