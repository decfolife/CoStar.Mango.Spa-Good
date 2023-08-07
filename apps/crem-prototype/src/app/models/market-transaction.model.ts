export class MarketTransaction {
  blockSize: cellConf;
  classType: string;
  rating: number;
  signDate: string;
  rentPerArea: number;
  term: number;

  constructor(
    blockSize: cellConf,
    classType: string,
    rating: number,
    signDate: string,
    rentPerArea: number,
    term: number,
  ) {
    this.blockSize = blockSize;
    this.classType = classType;
    this.rating = rating;
    this.signDate = signDate;
    this.rentPerArea = rentPerArea;
    this.term = term;
  }
}

export let marketTransactions: MarketTransaction[] = [
  {
    blockSize: {
      text: '5-10,000',
      icon: 'award',
      tooltipMessage: 'Benchmarked Real Estate Manager Record',
      iconClasses: 'rating secondary',
    },
    classType: 'Office',
    rating: 5,
    signDate: 'Q3, 2021',
    rentPerArea: 35.0,
    term: 5,
  },
  {
    blockSize: {
      text: '5-10,000',
      icon: 'award',
      tooltipMessage: 'Benchmarked Real Estate Manager Record',
      iconClasses: 'rating secondary',
    },
    classType: 'Office',
    rating: 3,
    signDate: 'Q1, 2022',
    rentPerArea: 37.50,
    term: 10,
  },
  {
    blockSize: {
      text: '20-25,000',
      icon: 'award',
      tooltipMessage: 'Benchmarked Real Estate Manager Record',
      iconClasses: 'rating secondary',
    },
    classType: 'Office',
    rating: 5,
    signDate: 'Q2, 2022',
    rentPerArea: 43.0,
    term: 5,
  },
  {
    blockSize: {
      text: '20-25,000',
      icon: 'award',
      tooltipMessage: 'Benchmarked Real Estate Manager Record',
      iconClasses: 'rating secondary',
    },
    classType: 'Office',
    rating: 3,
    signDate: 'Q3, 2021',
    rentPerArea: 33.0,
    term: 7,
  },
  {
    blockSize: {
      text: '100-150,000',
      icon: 'award',
      tooltipMessage: 'No Benchmarked',
      iconClasses: 'rating disabled',
    },
    classType: 'Office',
    rating: 5,
    signDate: 'Q3, 2022',
    rentPerArea: 52.0,
    term: 10,
  },
];

export interface cellConf {
  text: string;
  icon?: string;
  tooltipMessage?: string;
  iconDisabled?: boolean;
  iconPosition?: "left" | "right";
  iconClasses?: string;
}