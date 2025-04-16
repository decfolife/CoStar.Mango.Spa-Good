export class ClassificationParameters {
  classificationId: number;

  termBeginDateOptionId: number;
  termBeginFormItemId: number | null;
  termBeginDirectEntry: Date | null;

  termEndDateOptionId: number;
  termEndFormItemId: number | null;
  termEndDirectEntry: Date | null;

  discountRateProfileOption: string;
  annualRate: number | null;
  annualRateType: number | null;
  paymentTiming: number | null;

  journalEntryProfileId: number | null;
  journalEntryProfileOption: string;

  manualAdjustmentOption: string;
  manualAdjustmentDirectEntry: number | null;

  rouAssetMethodID: number;
  rouAssetObtainedAmount: number | null;

  rouAssetDateOption: string;
  rouAssetObtainedDate: Date | null;

  commentsOption: string;
  commentsDirectEntry: string;

  constructor(
    classificationId: number,
    termBeginDateOptionId: number,
    termBeginFormItemId: number,
    termBeginDirectEntry: Date,
    termEndDateOptionId: number,
    termEndFormItemId: number,
    termEndDirectEntry: Date,
    discountRateProfileOption: string,
    annualRate: number,
    annualRateType: number,
    paymentTiming: number,
    journalEntryProfileId: number,
    journalEntryProfileOption: string,
    manualAdjustmentOption: string,
    manualAdjustmentDirectEntry: number,
    rouAssetMethodID: number,
    rouAssetObtainedAmount: number,
    rouAssetDateOption: string,
    rouAssetObtainedDate: Date,
    commentsOption: string,
    commentsDirectEntry: string
  ) {
    if (termBeginDirectEntry) {
      this.termBeginDirectEntry = new Date(termBeginDirectEntry);
    }

    if (termEndDirectEntry) {
      this.termEndDirectEntry = new Date(termEndDirectEntry);
    }

    this.counteractTimezoneOffset(this.termBeginDirectEntry);
    this.counteractTimezoneOffset(this.termEndDirectEntry);

    this.classificationId = classificationId;
    this.termBeginDateOptionId = termBeginDateOptionId;
    this.termBeginFormItemId = termBeginFormItemId;
    this.termEndDateOptionId = termEndDateOptionId;
    this.termEndFormItemId = termEndFormItemId;
    this.discountRateProfileOption = discountRateProfileOption;
    this.annualRate = annualRate;
    this.annualRateType = annualRateType;
    this.paymentTiming = paymentTiming;
    this.journalEntryProfileId = journalEntryProfileId;
    this.journalEntryProfileOption = journalEntryProfileOption;
    this.manualAdjustmentOption = manualAdjustmentOption;
    this.manualAdjustmentDirectEntry = manualAdjustmentDirectEntry;
    this.rouAssetMethodID = rouAssetMethodID;
    this.rouAssetObtainedAmount = rouAssetObtainedAmount;
    (this.rouAssetDateOption = rouAssetDateOption),
      (this.rouAssetObtainedDate = rouAssetObtainedDate),
      (this.commentsOption = commentsOption);
    this.commentsDirectEntry = commentsDirectEntry ?? '';
  }

  private counteractTimezoneOffset(date: Date) {
    if (!date) {
      return;
    }

    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() * -1);
  }
}
