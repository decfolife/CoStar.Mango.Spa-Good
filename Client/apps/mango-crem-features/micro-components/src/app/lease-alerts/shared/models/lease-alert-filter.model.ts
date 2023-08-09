import { SelectedColumns } from './selected-columns.model';

export interface LeaseAlertFilter {
    leaseAbstractId?: number,
    masterGroupId?: number,
    alertRuleId?: number,
    isLeaseActive?: boolean,
    selectedColumns: SelectedColumns,
    isDismissed: boolean,
    pageNumber?: number,
    rowsPerPage?: number,
}
