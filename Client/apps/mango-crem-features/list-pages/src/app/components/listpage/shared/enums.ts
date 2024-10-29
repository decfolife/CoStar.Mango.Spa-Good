export enum FieldType {
  None = 0,
  Normal = 1, // If LeftNav ? Custom : Normal (plain text)
  Redirector = 2, // KeyPageUrl + OID + OTID + OTTID (no fallback, no link if missing any ID)
  PopupWindow = 3, // Static Url with OID
  Custom = 4, // LeftNav + NavPageID + OID + OTID + OTTID (fallback, no link if missing any ID)
}

export enum ListViewType {
  CoStar = 1,
  User = 2,
}

export enum ListPageViewMode {
  ListPageGrid = 'list',
  ListPageMap = 'map',
}

export enum SessionVariables {
  OTID = 'ListPage_OTID',
  CurrentListView = 'ListPage_CurrentView',
  ListPageViewMode = 'ListPage_ListPageViewMode',
  Portfolio = 'ListPage_Portfolio',
  ExpandCollapse = 'ListPage_ExpandCollapse',
  // since it's always using variable this.unmodifiedOriginalListView.  It's for the popurses of popup.
  // Now need to be in session
  UnmodifiedOriginalCurrentListView = 'ListPage_OriginalView',
  ArchiveToggleValue = 'ListPage_ArchiveToggleValue',
  FilterFields = 'ListPage_FilterFields',
  DisplayOrderFilterFields = 'FilterFieldsByColumns',
}

export enum SecurityType {
  RestrictedView = 1,
  View = 2,
  Add = 3,
  Edit = 4,
  Delete = 5,
  Block = 6,
}

export enum ArchiveToggleValue {
  None = 0,
  ArchivedOnly = 1,
  ActiveOnly = 2,
  ActiveAndArchived = 3,
}

export enum ObjectTypeIds {
  Tasks = 9,
  Expense = 193,
  Revenue = 194,
}
