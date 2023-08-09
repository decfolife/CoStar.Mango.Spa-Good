export interface ListView {
  id: number;
  listViewType: number;
  objectTypeId: number;
  listPageId: number;
  name: string;
  view: string;
  isDefault?: boolean;
  isSharedWithOthers?: boolean;
  isSharedWithMe?: boolean;
  archiveToggleValue: number;
  isExpandAllSelected: boolean;
  relationshipDefinitionId?: number;
  masterGroupId: number;
  securityType?: number;
  datasetName?: string;
  createdBy?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}
