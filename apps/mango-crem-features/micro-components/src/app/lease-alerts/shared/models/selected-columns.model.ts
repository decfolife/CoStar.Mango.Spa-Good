import { SelectedLeaseAlertColumns } from './selected-lease-alert-columns.model';
import { SelectedReportingLeasesColumns } from './selected-reporting-leases-columns.model';
import { SelectedAlertRuleColumns } from './selected-alert-rule-columns.model';
import { SelectedReportingAccountingEventsColumns } from './selected-reporting-accounting-events-columns.model';

export interface SelectedColumns {
  selectedLeaseAlertColumns: SelectedLeaseAlertColumns;
  selectedReportingLeasesColumns: SelectedReportingLeasesColumns;
  selectedAlertRuleColumns: SelectedAlertRuleColumns;
  selectedReportingAccountingEventsColumns: SelectedReportingAccountingEventsColumns;
}
