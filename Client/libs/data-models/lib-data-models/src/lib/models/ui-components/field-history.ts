export interface HistoryEntry {
  id: string;
  date: string;
  user: string;
  field: string;
  value: string;
}

export interface FieldHistoryDataSource {
  helpTextData: string;
  fieldIdData: string;
  fieldTitleData: string;
  historyData: HistoryEntry[]
}

export interface FieldHistoryInput {
  portfolioId?: string;
  OTID?: string;
  objectID?: string;
}