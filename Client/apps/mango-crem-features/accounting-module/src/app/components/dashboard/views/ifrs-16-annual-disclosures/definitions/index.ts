import { SortingOrder } from '@mango/data-models/lib-data-models';

export function rowSort(a?, b?, sortingOrder?: SortingOrder) {
  if (sortingOrder?.[a.value] > sortingOrder?.[b.value])
    return 1;
  if (sortingOrder?.[b.value] > sortingOrder?.[a.value])
    return -1;
  else
    return 0;
}
