export interface classificationSettingResponse {
  configurationID: number;
  masterGroupID: number;
  classificationID: number;
  remeasureTypeID: number;
  remeasureTypeName: string;
  beginDateOptionID: number;
  beginDateFormItemID: number;
  beginOptionName: string;
  beginDate: string;
  endDateOptionID: number;
  endDateFormItemID: number;
  endOptionName: string;
  endDate: string;
  journalEntryOption: string;
  journalEntryProfileID: number;
  manualAdjustmentOption: string;
  commentsOption: string;
  rouAssetMethodID: number;
}
