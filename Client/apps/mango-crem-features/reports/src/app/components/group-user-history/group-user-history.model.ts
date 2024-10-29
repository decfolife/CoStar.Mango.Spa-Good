export interface RightHistoryDataRequest {
  fromDate: Date;
  toDate: Date;
  userIds: string;
  groupIds: string;
}

export interface RightHistoryData {
  id: number;
  entityTypeId: number;
  changeType: string;
  displayName: string;
  beforeChange: string;
  afterChange: string;
  description: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
}
