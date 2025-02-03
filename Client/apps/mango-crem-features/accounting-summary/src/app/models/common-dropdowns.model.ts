export interface CommonDropdowns {
  leaseAbstractID: number;
  classificationTypes?: Classification[];
  amortizationProfiles?: AmortizationProfile[];
  journalEntryProfiles?: JournalEntryProfile[];
  currencies?: Currency[];
  reportingExceptions?: LookupOption[];
  prorationFrequencies?: LookupOption[];
  prorationTypes?: LookupOption[];
  rouAssetMethods?: ROUAssetMethod[];
}
export interface Classification {
  classificationID: number;
  classificationType: string;
  isActive: boolean;
  isLessor: boolean;
  sortOrder: number;
  accountingStandard?: string;
  accountingStandardCode?: string;
}

export interface AmortizationProfile {
  profileID: number;
  profileName: string;
  isActive: boolean;
  includeReasonablyCertainOptions: boolean;
  glAccountIDsCSV?: string;
  comments?: string;
}

export interface JournalEntryProfile {
  profileID: number;
  profileName: string;
  classificationID?: number;
  isActive: boolean;
  comments?: string;
}

export interface DiscountRateProfile {
  profileID: number;
  profileName: string;
  isActive: boolean;
  annualRateTypeID: number;
  rate: number;
  sortOrder: number;
}

export interface TermAndPeriods {
  leaseAbstractID: number;
  termBegin: Date;
  termEnd: Date;
  termInDays: number;
  termInPeriods: number;
  termInYears: number; // Term
  termInMonths: number;
  termString?: string;
}

export interface Currency {
  id: number;
  name: string;
  description: string;
  decimalPrecision: number;
}

export interface LookupOption {
  id: number;
  name: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ROUAssetMethod {
  id: number;
  name: string;
  isActive: boolean;
  sortOrder: number;
  isInitialExempt: boolean;
}
