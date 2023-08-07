export class StrategyLease {
  id: number;
  expirationDate: string;
  leasedSf: number;
  rentPsf: number;
  totalSeats: number;
  headcount: number;
  availableSeats: number;
  utilization: string;
  sfPerSeat: number;

  constructor(
    id: number,
    expirationDate: string,
    leasedSf: number,
    rentPsf: number,
    totalSeats: number,
    headcount: number,
    availableSeats: number,
    utilization: string,
    sfPerSeat: number
  ) {
    this.id = id;
    this.expirationDate = expirationDate;
    this.leasedSf = leasedSf;
    this.rentPsf = rentPsf;
    this.totalSeats = totalSeats;
    this.headcount = headcount;
    this.availableSeats = availableSeats;
    this.utilization = utilization;
    this.sfPerSeat = sfPerSeat;
  }
}
export let strategyLeases : StrategyLease[] = [
  new StrategyLease(
    167,
    '09/30/2024',
    56121,
    40.88,
    300,
    206,
    94,
    '68.66%',
    160
  ),
  new StrategyLease(
    377,
    '03/30/2023',
    25884,
    40.13,
    205,
    142,
    63,
    '69.27%',
    126
  ),
];