export { strategies } from './data/strategies';

export class Strategy {
  constructor(
    public strategyId: number,
    public buildingName: string,
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public currentStrategy: string,
    public strategyComments: string,
    public strategyYear: number,
    public budgetedCapital?: number,
    public currentRentCurrency?: number,
    public currentRentSF?: number,
    public currentVsMarketRentSF?: number,
    public currentVsMarketRent?: number,
    public remainingLeaseObligation?: number,
    public currentExpiration?: string,
    public rentableSF?: number,
    public leaseFlexibilityScore?: number,
    public activeLeaseOptions?: number,
    public currentHeadCount?: number,
    public currentCapacity?: number,
    public currentSeatsAvailable?: number,
    public currentUtilization?: number,
    public systemLeaseId?: number,
    public marketRentProperty?: number,
    public marketRentSubMarketRating?: number,
    public marketRentSubMarket?: number,
    public vacantSFProperty?: number,
    public vacantSFSubMarketRating?: number,
    public vacantSFSubMarket?: number,
    public vacancyRateProperty?: number,
    public vacancyRateSubMarketRating?: number,
    public vacancyRateSubMarket?: number,
    public availableSFProperty?: number,
    public availableSFSubMarketPeerGroup?: number,
    public availableSFSubMarket?: number,
    public availabilityRateProperty?: number,
    public availabilityRateSubMarketRating?: number,
    public availabilityRateSubMarket?: number,
    public subletSFProperty?: number,
    public subletSFSubMarketRating?: number,
    public subletSFSubMarket?: number,
    public twelveMoNetAbsorptionSFProperty?: number,
    public twelveMoNetAbsorptionSFSubMarketRating?: number,
    public twelveMoNetAbsorptionSFSubMarket?: number,
    public sixMoLeasingProbabilitySubMarketRating?: number,
    public sixMoLeasingProbabilitySubMarket?: number,
    public lastUpdated?: string,
    public lastUpdatedBy?: string,
    public location?: string,
  ) {
    this.strategyId = strategyId;
    this.buildingName = buildingName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.currentStrategy = currentStrategy;
    this.strategyComments = strategyComments;
    this.strategyYear = strategyYear;
    this.budgetedCapital = budgetedCapital;
    this.currentRentCurrency = currentRentCurrency;
    this.currentRentSF = currentRentSF;
    this.currentVsMarketRentSF = currentVsMarketRentSF;
    this.currentVsMarketRent = currentVsMarketRent;
    this.remainingLeaseObligation = remainingLeaseObligation;
    this.currentExpiration = currentExpiration;
    this.rentableSF = rentableSF;
    this.leaseFlexibilityScore = leaseFlexibilityScore;
    this.activeLeaseOptions = activeLeaseOptions;
    this.currentHeadCount = currentHeadCount;
    this.currentCapacity = currentCapacity;
    this.currentSeatsAvailable = currentSeatsAvailable;
    this.currentUtilization = currentUtilization;
    this.systemLeaseId = systemLeaseId;
    this.marketRentProperty = marketRentProperty;
    this.marketRentSubMarketRating = marketRentSubMarketRating;
    this.marketRentSubMarket = marketRentSubMarket;
    this.vacantSFProperty = vacantSFProperty;
    this.vacantSFSubMarketRating = vacantSFSubMarketRating;
    this.vacantSFSubMarket = vacantSFSubMarket;
    this.vacancyRateProperty = vacancyRateProperty;
    this.vacancyRateSubMarketRating = vacancyRateSubMarketRating;
    this.vacancyRateSubMarket = vacancyRateSubMarket;
    this.availableSFProperty = availableSFProperty;
    this.availableSFSubMarketPeerGroup = availableSFSubMarketPeerGroup;
    this.availableSFSubMarket = availableSFSubMarket;
    this.availabilityRateProperty = availabilityRateProperty;
    this.availabilityRateSubMarketRating = availabilityRateSubMarketRating;
    this.availabilityRateSubMarket = availabilityRateSubMarket;
    this.subletSFProperty = subletSFProperty;
    this.subletSFSubMarketRating = subletSFSubMarketRating;
    this.subletSFSubMarket = subletSFSubMarket;
    this.twelveMoNetAbsorptionSFProperty = twelveMoNetAbsorptionSFProperty;
    this.twelveMoNetAbsorptionSFSubMarketRating = twelveMoNetAbsorptionSFSubMarketRating;
    this.twelveMoNetAbsorptionSFSubMarket = twelveMoNetAbsorptionSFSubMarket;
    this.sixMoLeasingProbabilitySubMarketRating = sixMoLeasingProbabilitySubMarketRating;
    this.sixMoLeasingProbabilitySubMarket = sixMoLeasingProbabilitySubMarket;
    this.lastUpdated = lastUpdated;
    this.lastUpdatedBy = lastUpdatedBy;
    this.location = [buildingName, address].join(' ') +'. ' + [city, state, country].join(', ');
;
  }
}

export interface Markers {
  id: number;
  location: string;
}