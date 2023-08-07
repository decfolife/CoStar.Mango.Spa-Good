export interface GetGridDataRequest {
  ListPageId: number;

  UserViewId: number | null;
  MasterGroupId: number | null;

  GridStateOverride: string;
  BatchAccountingWorkflowStatus: string;
}
