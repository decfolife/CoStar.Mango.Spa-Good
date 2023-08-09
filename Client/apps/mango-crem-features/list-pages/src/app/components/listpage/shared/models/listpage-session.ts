import { ListPageViewMode } from "../enums";

export interface ListPageSession {
  listPageObjectTypeSessions: ListPageObjectTypeSession[];
}

export interface ListPageObjectTypeSession {
  objectTypeId: number;
  currentListView?: string;
  listPageViewMode?: ListPageViewMode;
  portfolio?: string;
  expandCollapse?: string;
  unmodifiedOriginalCurrentListView?: string;
  archiveToggleValue?: number;
  filterFields?: string;
}
