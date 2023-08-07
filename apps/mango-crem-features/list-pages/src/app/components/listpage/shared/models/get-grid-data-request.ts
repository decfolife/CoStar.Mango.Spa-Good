export interface GetGridDataRequest {
  listPageId: number;
  userViewId: number | null;
  masterGroupId: number | null;
  gridStateOverride: string;
  tempArchiveToggleValue?: number;
  oid?: number;
}
