export interface HistoryEntry {
  id: string;
  lastModified: string;
  lastModifiedBy: string;
  displayName: string;
  afterChange: string;
}

export interface FieldHistoryDataSource {
  helpTextPage: string;
  helpTextSubject: string;
  helpTextName: string;
  helpTextText: string;
  helpTextImage: string;
  helpTextHistory: HistoryEntry[]
}

export interface FieldHistoryInput {
  portfolioId?: string;
  helpTextName?: string;
  fieldHistoryName?: string;
  objectTypeId?: string;
  objectId?: string;
}