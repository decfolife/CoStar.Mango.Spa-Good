export interface ExportHistory {
  id?: number;
  integrationTypeId?: number;
  exportedCount?: number;
  amount?: number;
  createdDate?: Date;
  fileName?: string;
  vpDocumentsPath?: string;
  exportParameters?: string;
  exportedBy?: string;
}
