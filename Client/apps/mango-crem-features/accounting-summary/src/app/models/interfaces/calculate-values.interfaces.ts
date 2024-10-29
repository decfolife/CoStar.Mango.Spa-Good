export interface CalculateValues {
  leaseRecognitionScheduleId?: number | null;
  copiedFromScheduleId?: number | null;
  leaseAbstractId: number;
  classificationId: number;
  remeasureTypeId?: number;
  calendarId: number;
  termBegin: string;
  termEnd: string;
  includeFromFirst?: boolean;
  termInPeriods: number;
  termInDays?: number;
  isIncome: boolean;
  scheduleCurrency: CurrencyDetails;
  functionalCurrency?: CurrencyDetails;
  functionalCurrencyRate?: number;
  manualAssetAdjustment?: number;
  compoundFrequencyTypeId?: number;
  paymentInArrears?: boolean;
  discountRate?: number;
  annualRateTypeId?: number;
  effectiveRate?: number;
  amortizationMethodTypeId?: number;
  isImpaired?: boolean;
  totalAmount?: number;
  directCosts?: number;
  terminationFee?: number;
  FMV?: number;
  rouAssetObtainedAmount?: number;
  residualValues: ResidualValues;
  selectedPayments?: any[];
}

interface CurrencyDetails {
  exchangeRateID: number;
  targetCurrency: string;
  decimalPrecision: number;
}

interface ResidualValues {
  doesLessorExplicitlyExemptLessee: boolean;
  residualValueGuaranteedBy3rdParty?: number;
  residualValue?: number;
  estimatedResidualValue?: number;
  guaranteedAmtReflectedInPayments?: number;
}

interface CurrencyDetails {
  exchangeRateID: number;
  targetCurrency: string;
  decimalPrecision: number;
}
