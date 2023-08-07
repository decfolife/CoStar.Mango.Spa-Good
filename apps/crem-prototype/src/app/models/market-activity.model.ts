
export class MarketActivity {
  blockSize: string;
  searchCount: number;
  tourCount: number;
  signedLeasesCount: number;
  exitCount: number;
  alternateSpaceCount: number;

  constructor(
    blockSize: string,
    searchCount: number,
    tourCount: number,
    signedLeasesCount: number,
    exitCount: number,
    alternateSpaceCount: number,
  ) {
    this.blockSize = blockSize;
    this.searchCount = searchCount;
    this.tourCount = tourCount;
    this.signedLeasesCount = signedLeasesCount;
    this.exitCount = exitCount;
    this.alternateSpaceCount = alternateSpaceCount;
  }
}

export let marketActivities : MarketActivity[] = [
  new MarketActivity('10,000 to 25,000', 3, 2, 2, 1, 4),
  new MarketActivity('25,000 to 50,000', 45, 3, 1, 0, 1),
  new MarketActivity('50,000+', 39, 5, 13, 3, 3),
];
