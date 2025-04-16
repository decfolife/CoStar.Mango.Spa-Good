import {
  ListView,
  MeasureEvent,
  Portfolio,
  WorkflowSettings,
  WorkflowStatus,
} from '.';

import { ParametersGridComponent } from '../../batch-event-list/parameters-grid/parameters-grid.component';

export interface ScheduleObject {
  SelectedWorkflowStatus: WorkflowStatus;
  SelectedPortfolio: Portfolio;
  SelectedView: ListView;
  ClassificationTypes: ClassificationType[];
  LeaseAbstractIDs: number[];
  LeaseRecognitionScheduleIDs: number[];
}

export interface ClassificationType {
  classificationID: number;
  classificationType: string;
}

export interface ParametersData {
  workflowStatuses: WorkflowStatus[] | null;
  workflowSettings: WorkflowSettings | null;
  measureEvents: MeasureEvent[] | null;

  cardMeasureEvent: MeasureEvent | null;
  cardNextWorkflowStatus: WorkflowStatus | null;
  cardWorkflowComment: string;

  grid: ParametersGridComponent | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gridData: any;
  gridOverrides: ParameterOverrides | null;
  gridLoaded: boolean;
}

export interface ParameterOverrides {
  accountingTermBeginDateOverride: Date | null;
  accountingTermEndDateOverride: Date | null;
  commentsOverride: string | null;
  discountRateOverride: string | null;
  annualRateOverride: string | null;
  annualRateTypeOverride: string | null;
  manualAssetAdjustmentOverride: string | null;
  paymentTimingOverride: string | null;
  rouAssetObtainedMethodOverride: number | null;
  rouAssetObtainedDateOverride: Date | null;
}
