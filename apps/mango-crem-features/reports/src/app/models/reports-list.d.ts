export interface ReportsList {
  id: number;
  category: string;
  type: string;
  isFavorite: boolean;
  reportName: string;
  description: string;
  shared: string;
  datasetName: string;
  isScheduled: string;
  createdBy: string;
  runCount: number;
  lastRun: string;
  lastRunBy: string;
  tags: Tag[];
  canEdit: boolean;
  canDelete: boolean;
  folderId: number;
  contactReportId: number;
  reportUrl: string;
  sameWindow: boolean;
  rights: string;
}

export interface Tag {
  reportTagID: number;
  reportTag: string;
}