export class MeasureEvent {
  remeasureTypeId: number;
  remeasureTypeName: string;
}

export class MeasureEventSetting {
  id: number;

  portfolio: string;
  measureEvent: MeasureEvent;
  classificationType: string;
  accountingTermBeginDate: string;
  accountingTermEndDate: string;
  discountRateProfile: string;
  journalEntryProfile: string;
  functionalRate: string;
  manualAssetAdjustment: string;
  comments: string;
  nextWorkflowStatus: string;
  rouAssetObtainedMethodName: string;
  rouAssetObtainedDateOptions: string;

  constructor(
    id: number,
    portfolio: string,
    measureEvent: MeasureEvent,
    classificationType: string,
    accountingTermBeginDate: string,
    accountingTermEndDate: string,
    discountRateProfile: string,
    journalEntryProfile: string,
    functionalRate: string,
    manualAssetAdjustment: string,
    comments: string,
    nextWorkflowStatus: string,
    rouAssetObtainedMethodName: string,
    rouAssetObtainedDateOptions: string
  ) {
    this.id = id;

    this.portfolio = portfolio;
    this.measureEvent = measureEvent;
    this.classificationType = classificationType;
    this.accountingTermBeginDate = accountingTermBeginDate;
    this.accountingTermEndDate = accountingTermEndDate;
    this.discountRateProfile = discountRateProfile;
    this.journalEntryProfile = journalEntryProfile;
    this.functionalRate = functionalRate;
    this.manualAssetAdjustment = manualAssetAdjustment;
    this.comments = comments;
    this.nextWorkflowStatus = nextWorkflowStatus;
    this.rouAssetObtainedMethodName = rouAssetObtainedMethodName;
    this.rouAssetObtainedDateOptions = rouAssetObtainedDateOptions;
  }
}
