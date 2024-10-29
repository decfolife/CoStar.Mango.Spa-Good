export class MeasureEventSetting {
  configurationID: number;
  remeasureTypeID: number;
  remeasureTypeName: string;
  classificationID: string;
  accountingTermBeginDate: string;
  accountingTermEndDate: string;
  journalEntryOption: string;
  manualAdjustmentOption: string;
  commentsOption: string;
  rouAssetMethodID: string;

  constructor(
    configurationID,
    remeasureTypeID,
    remeasureTypeName,
    classificationID,
    accountingTermBeginDate,
    accountingTermEndDate,
    journalEntryOption,
    manualAdjustmentOption,
    commentsOption,
    rouAssetMethodID
  ) {
    this.configurationID = configurationID;
    this.remeasureTypeID = remeasureTypeID;
    this.remeasureTypeName = remeasureTypeName;
    this.classificationID = classificationID;
    this.accountingTermBeginDate = accountingTermBeginDate;
    this.accountingTermEndDate = accountingTermEndDate;
    this.journalEntryOption = journalEntryOption;
    this.manualAdjustmentOption = manualAdjustmentOption;
    this.commentsOption = commentsOption;
    this.rouAssetMethodID = rouAssetMethodID;
  }
}
