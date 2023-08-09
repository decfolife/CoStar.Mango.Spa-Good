
export class BuildingStrategy {
  leaseCount: number;
  totalLeaseSf: number;
  utilizationRate: string;
  rentSfVsMarket: string;
  totalSeats: number;
  sfSeatVsPortfolio: string;
  totalHeadcount: number;
  estimatedRenewalRent: string;
  totalAvailableSeats: number;
  minSeatCount: number;
  maxSeatCount: number;
  minSfPerSeat: number;
  maxSfPerSeat: number;
  minRentableArea: number;
  maxRentableArea: number;
  minTerm: number;
  maxTerm: number;
  location: string;
  spaceType: string;
  buildingClass: string;
  estCommencementDate: string;
  propertyStrategy: string;
  budgetedCapital: string;
  strategyNotes: string;
  targetedPeriod: string;

  constructor(
    leaseCount: number,
    totalLeaseSf: number,
    utilizationRate: string,
    rentSfVsMarket: string,
    totalSeats: number,
    sfSeatVsPortfolio: string,
    totalHeadcount: number,
    estimatedRenewalRent: string,
    totalAvailableSeats: number,
    minSeatCount: number,
    maxSeatCount: number,
    minSfPerSeat: number,
    maxSfPerSeat: number,
    minRentableArea: number,
    maxRentableArea: number,
    minTerm: number,
    maxTerm: number,
    location: string,
    spaceType: string,
    buildingClass: string,
    estCommencementDate: string,
    propertyStrategy: string,
    budgetedCapital: string,
    strategyNotes: string,
    targetedPeriod?: string,
  ) {
    this.leaseCount = leaseCount;
    this.totalLeaseSf = totalLeaseSf;
    this.utilizationRate = utilizationRate;
    this.rentSfVsMarket = rentSfVsMarket;
    this.totalSeats = totalSeats;
    this.sfSeatVsPortfolio = sfSeatVsPortfolio;
    this.totalHeadcount = totalHeadcount;
    this.estimatedRenewalRent = estimatedRenewalRent;
    this.totalAvailableSeats = totalAvailableSeats;
    this.minSeatCount = minSeatCount;
    this.maxSeatCount = maxSeatCount;
    this.minSfPerSeat = minSfPerSeat;
    this.maxSfPerSeat = maxSfPerSeat;
    this.minRentableArea = minRentableArea;
    this.maxRentableArea = maxRentableArea;
    this.minTerm = minTerm;
    this.maxTerm = maxTerm;
    this.location = location;
    this.spaceType = spaceType;
    this.buildingClass = buildingClass;
    this.estCommencementDate = estCommencementDate;
    this.propertyStrategy = propertyStrategy;
    this.budgetedCapital = budgetedCapital;
    this.strategyNotes = strategyNotes;
    this.targetedPeriod = targetedPeriod;
  }
}
export let buildingStrategies : BuildingStrategy[] = [
  new BuildingStrategy(
    2,
    82005,
    '68.91%',
    '$50.65 (82.95%)',
    505,
    '162 (N/A)',
    348,
    '$55.00',
    157,
    428,
    640,
    140,
    175,
    75000,
    90000,
    5,
    10,
    'Upper Buckhead',
    'Office',
    'A',
    '10/01/2024',
    'Renew',
    '$1,300,000',
    'Research alternatives',
    'September 2022'
  ),
];