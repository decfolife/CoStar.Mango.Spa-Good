export interface NavigationRightDataRequest {
  userIds: string;
  groupIds: string;
  moduleIds: string;
}

export interface NavigationRightDataGrid {
  moduleId: number;
  moduleDisplayName: string;
  moduleName: string;
  dynamicColumnList: string[];
  dataSource: any[];
}
