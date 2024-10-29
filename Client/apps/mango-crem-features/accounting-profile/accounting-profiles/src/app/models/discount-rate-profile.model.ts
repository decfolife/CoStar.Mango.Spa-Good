/* eslint-disable linebreak-style */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { Portfolio } from './portfolio.model';

export class DiscountRateProfile {
  policyId: number;
  masterGroupId: number;
  amount: number;
  profileAlias: string;
  termRangeMinMonths: number;
  termRangeMaxMonths: number;
  effectiveDate: Date;
  effectiveDateString: string;
  country: string;
  currency: string;
  annualRateType: number;
  portfolio: Portfolio;
  policyName: string;
  sourceImportId: string;
  createdByName: string;
  createdByDate: Date;
  createdBy: number;
  active: boolean;
  inUse: boolean;
  accountingSchedules: number;
  lastModifiedBy: number;
  lastModifiedDate: Date;
  modifiedByName: string;
  triggerRecalculation: boolean;

  constructor(
    policyId,
    masterGroupId,
    amount,
    profileAlias,
    termRangeMinMonths,
    termRangeMaxMonths,
    effectiveDate,
    effectiveDateString,
    country,
    currency,
    annualRateType,
    portfolio,
    profileName,
    sourceImportId,
    modifiedByName,
    createdByName,
    active,
    inUse,
    accountingSchedules,
    createdByDate,
    lastModifiedDate,
    createdBy,
    lastModifiedBy,
    triggerRecalculation
  ) {
    this.policyId = policyId;
    this.masterGroupId = masterGroupId;
    this.amount = amount;
    this.profileAlias = profileAlias;
    this.termRangeMinMonths = termRangeMinMonths;
    this.termRangeMaxMonths = termRangeMaxMonths;
    this.effectiveDate = effectiveDate;
    this.effectiveDateString = effectiveDateString;
    this.country = country;
    this.currency = currency;
    this.annualRateType = annualRateType;
    this.portfolio = portfolio;
    this.policyName = profileName;
    this.sourceImportId = sourceImportId;
    this.modifiedByName = modifiedByName;
    this.createdByName = createdByName;
    this.active = active;
    this.inUse = inUse;
    this.accountingSchedules = accountingSchedules;
    this.createdByDate = createdByDate;
    this.lastModifiedDate = lastModifiedDate;
    this.createdBy = createdBy;
    this.lastModifiedBy = lastModifiedBy;
    this.triggerRecalculation = triggerRecalculation;
  }
}
