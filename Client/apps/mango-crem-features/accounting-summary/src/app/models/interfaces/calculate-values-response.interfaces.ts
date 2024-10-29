interface ResidualValues {
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

interface ControlStatements {
  remeasureTypeID: number;
  isDay1Remeasure: boolean;
  isDayXRemeasure: boolean;
  isGappedRemeasure: boolean;
  isMidPeriodGappedRemeasure: boolean;
  isMidPeriodRemeasure: boolean;
  isRetroAdjustment: boolean;
  originalFromDate: string | null;
  previousEffectiveRate: number;
  previousFunctionalCurrencyRate: number;
  calendarStartDate: string;
  calendarEndDate: string;
  paymentDueOnDayOne: number;
  firstHalfCash: number | null;
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
  leaseRecognitionScheduleId: number | null;
  copiedFromScheduleId: number | null;
  properPreviousScheduleId: number | null;
  properPreviousAmortizationPeriod: number | null;
  controlStatements: ControlStatements;
  scheduleCurrency: Currency;
  functionalCurrency: Currency;
  selectedPayments: SelectedPayment[];
}

export interface CalculateValuesResponse {
  leaseAbstractId: number;
  leaseRecognitionScheduleId: number | null;
  copiedFromScheduleId: number | null;
  effectiveRate: number | null;
  presentValue: number | null;
  implicitRate: number | null;
  openingLiabilityBalance: number | null;
  totalPayments: number | null;
  terminationFee: number | null;
  functional_TerminationFee: number | null;
  directCostsTotal: number | null;
  functional_DirectCostsTotal: number | null;
  previousLiabilityBalance: number | null;
  previousAssetBalance: number | null;
  liabilityAdjustmentAmount: number | null;
  systemAssetAdjustment: number | null;
  adjustment: number | null;
  adjustmentGainLoss: number | null;
  functional_AdjustmentGainLoss: number | null;
  openingAssetBalance: number | null;
  functional_OpeningAssetBalance: number | null;
  levelExpense: number | null;
  functional_LevelExpense: number | null;
  assetAmortization: number | null;
  functional_AssetAmortization: number | null;
  rouAssetObtainedAmount: number | null;
  functionalROUAssetObtainedAmount: number | null;

  residualValues: ResidualValues;
  calculationSupports: CalculationSupports;
}
