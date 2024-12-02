export interface PreviousAccountingEvent {
  directCostAmount: number;
  // Key Fields
  leaseRecognitionScheduleID: number;
  leaseRecognitionID: number;
  masterScheduleID?: number;
  measureEvent?: string;
  remeasureTypeID?: number;
  copiedFromScheduleID?: number;
  scheduleIndex?: number;
  isActive: boolean;
  isPublished: boolean;
  isRetroAdjust: boolean;
  jeStatus?: string;
  totalAmount?: number; // aka lrs.TotalPayments, "Undiscounted Amount"
  retroScheduleID?: number;

  // Details
  classificationID: number;
  journalEntryProfileID?: number; // aka lrs.JEAccountPolicyID
  beginDate?: Date; // aka lrs.FromDate
  endDate?: Date; // aka lrs.ToDate
  fromDateOptionID: number;
  toDateOptionID: number;
  fromDateFormItemID?: number;
  toDateFormItemID?: number;
  includeFromFirst: boolean; // aka lrs.IsFirstMonthOverwrite
  firstMonthOverwriteDate?: Date;
  termInDays?: number; // aka lrs.DaysInTerm
  termInPeriods?: number; // aka lrs.NumberPeriods
  termInMonths?: number;
  termInYears?: number; // aka lrs.TermYears
  termString?: string;
  isReportingException: boolean;
  exceptionReason?: number;
  exceptionOtherReason?: string;
  isImpaired: boolean;
  comments?: string;

  // Classification Tests
  test1: boolean;
  test2: boolean;
  test3?: number;
  test4?: number;
  test5: boolean;
  lessorTest1: boolean;
  lessorTest2: boolean;
  lessorTest3: boolean;
  lessorTest4: boolean;
  lessorTest5: boolean;
  lessorTest6: boolean;
  lessorTest7: boolean;
  classificationTestResult?: string;
  classificationTestResultReason?: string;
  isClassificationTestResultMatched?: boolean;
  economicLifeYears?: number;
  fmv?: number;
  implicitRate?: number;

  // Residual Value
  residualValues: {
    doesLessorExplicitlyExemptLessee: boolean;
    residualValueGuaranteedBy3rdParty: number;
    residualValue: number;
    estimatedResidualValue: number;
    guaranteedAmtReflectedInPayments: number;
    residualValueGuaranteedByLessee: number;
    amountProbableOfBeingOwedByLessee: number;
    unguaranteedResidualValue: number;
    amtNotReflectedInPVofPayments: number;
    presentValueOnAmtNotReflectedInPayments: number;
  };

  // Financials
  amortizationMethodTypeID: number; // lrs.AmortizationMethod, 1: Periodic, 2: Daily
  priorROUAssetObtainedAmount: number;

  // Expand Card - Amortization Profile
  amortizationProfileID?: number;
  manualProfileName?: string;
  isIncome: boolean;
  overrideProfile: boolean;

  // Expand Card - Discount Rate
  discountRateProfileID?: number;
  discountRateProfileName?: string;
  discountRate?: number;
  discountRateTypeID?: number; // DiscountRateProfileId === 0 ? 1 : 2;
  annualRateTypeID: number; // aka lrs.AnnualRateType, 1: APR, 2: APY
  effectiveRate?: number;
  modificationImpactsScope: boolean;

  // Expand Card - Currency
  localCurrencyID?: number; // aka lrs.CurrencyID
  localCurrency?: string;
  localCurrencyDecimalPrecision?: number;
  functionalCurrencyID?: number;
  functionalCurrency?: string;
  functionalCurrencyDecimalPrecision?: number;
  functionalCurrencyRate?: number;

  // Expand Card - ROU Assets Obtained
  rouAssetMethodID?: number; // Default value: "Opening Asset Balance"
  rouAssetMethod: string; // Default value: "Opening Asset Balance"
  rouAssetObtainedAmount?: number;
  rouAssetObtainedDate?: Date;

  // Card - Asset Balance
  openingAssetBalance?: number;
  functionalOpeningAssetBalance?: number; // aka lrs.Functional_OpeningAssetBalance
  openingBalance?: number;
  overrideOpeningBalance: boolean;
  previousAssetBalance?: number;
  systemAssetAdjustment?: number;
  manualAssetAdjustment?: number;
  adjustmentAmount?: number; // aka lrs.Adjustment

  // Card - Level Expense
  // Carry Forward
  levelExpense?: number;
  functionalLevelExpense?: number; // aka lrs.Functional_LevelExpense
  directCosts?: number; // aka lrs.DirectCostsTotal
  functionalDirectCosts?: number; // aka lrs.Functional_DirectCostsTotal

  // Card - Present Value
  presentValue?: number;
  presentValueMethod?: string;
  compoundFrequencyType: number; // 1: Monthly or 2: Daily
  paymentInArrears: boolean; // aka PaymentTiming, if true then "End of the Period" else "Beginning of Period"

  // Card - Liability Balance
  openingLiabilityBalance?: number;
  previousLiabilityBalance?: number;
  liabilityAdjustmentAmount?: number;

  // Card - Gain & Loss
  adjustmentGainLoss?: number;
  functionalAdjustmentGainLoss?: number; // aka lrs.Functional_AdjustmentGainLoss
  terminationFee?: number;
  functionalTerminationFee?: number; // aka lrs.Functional_TerminationFee
  assetAdjustmentAmount?: number;

  // Card - Straight Line Expense
  straightLineExpense?: number;
  straightLineExpenseDaily?: number;

  // Card - Asset Amortization
  assetAmortization?: number;
  functionalAssetAmortization?: number; // aka lrs.Functional_AssetAmortization

  // Misc
  adjustmentPeriodIndex?: number;
  minFutureAdjustDate?: Date;
}
