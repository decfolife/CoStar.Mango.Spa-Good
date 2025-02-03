export interface ResidualValues {
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
}

export interface ClassificationTestResults {
  test1Result: boolean;
  test2Result: boolean;
  test3Result: boolean;
  test4Result: boolean;
  test5Result: boolean;
  testResult: string;
  resultReason: string;
  isResultMatched: boolean;
}

interface ControlStatements {
  remeasureTypeID: number;
  isDay1Remeasure: boolean;
  isDayXRemeasure: boolean;
  isGappedRemeasure: boolean;
  isMidPeriodGappedRemeasure: boolean;
  isMidPeriodRemeasure: boolean;
  isRetroAdjustment: boolean;
  originalFromDate: string | '';
  previousEffectiveRate: number;
  previousFunctionalCurrencyRate: number;
  calendarStartDate: string;
  calendarEndDate: string;
  paymentDueOnDayOne: number;
  firstHalfCash: number | 0;
  frequency: number;
}

interface Currency {
  exchangeRateID: number;
  targetCurrency: string;
  decimalPrecision: number;
}

interface SelectedPayment {
  glEventID: number;
  paymentEventSource: string;
}

interface CalculationSupports {
  leaseAbstractId: number;
  leaseRecognitionScheduleId: number | 0;
  copiedFromScheduleId: number | 0;
  properPreviousScheduleId: number | 0;
  properPreviousAmortizationPeriod: number | 0;
  controlStatements: ControlStatements;
  scheduleCurrency: Currency;
  functionalCurrency: Currency;
  selectedPayments: SelectedPayment[];
  pageMode: string;
}

export interface CalculateValuesResponse {
  leaseAbstractId: number;
  leaseRecognitionScheduleId: number | null;
  copiedFromScheduleId: number | null;
  effectiveRate: number | 0;
  presentValue: number | 0;
  implicitRate: number | 0;
  openingLiabilityBalance: number | 0;
  totalPayments: number | 0;
  terminationFee: number | 0;
  functional_TerminationFee: number | 0;
  directCostsTotal: number | 0;
  functional_DirectCostsTotal: number | 0;
  previousLiabilityBalance: number | 0;
  previousAssetBalance: number | 0;
  liabilityAdjustmentAmount: number | 0;
  systemAssetAdjustment: number | 0;
  adjustment: number | 0;
  adjustmentGainLoss: number | 0;
  functional_AdjustmentGainLoss: number | 0;
  openingAssetBalance: number | 0;
  functional_OpeningAssetBalance: number | 0;
  levelExpense: number | 0;
  functional_LevelExpense: number | 0;
  assetAmortization: number | 0;
  functional_AssetAmortization: number | 0;
  rouAssetObtainedAmount: number | 0;
  functionalROUAssetObtainedAmount: number | 0;
  classificationTestResult: string | '';
  classificationTestResultReason: string | '';
  isClassificationTestResultMatched: boolean | 0;
  assetAdjustmentAmount: number | 0;
  straightLineExpense: number | 0;
  straightLineExpenseDaily: number | 0;
  residualValues: ResidualValues;
  classificationTestResults: ClassificationTestResults;
  calculationSupports: CalculationSupports;
}
