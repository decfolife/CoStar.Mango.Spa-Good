export class ProspectiveSpace {
  propertyAddress: String;
  propertyName: String;
  buildingStatus: String;
  totalAvailableSf: Number;
  estimatedRent: Number;
  submarketName: String;
  percentLeased: String;
  leasingCompanyContact: String;
  stars: Number;
  link: String;
  target: String;

  constructor(
    propertyAddress: String,
    propertyName: String,
    buildingStatus: String,
    totalAvailableSf: Number,
    estimatedRent: Number,
    submarketName: String,
    percentLeased: String,
    leasingCompanyContact: String,
    stars: Number,
    link: String,
    target: String,
  ) {
    this.propertyAddress = propertyAddress;
    this.propertyName = propertyName;
    this.buildingStatus = buildingStatus;
    this.totalAvailableSf = totalAvailableSf;
    this.estimatedRent = estimatedRent;
    this.submarketName = submarketName;
    this.percentLeased = percentLeased;
    this.leasingCompanyContact = leasingCompanyContact;
    this.stars = stars;
    this.link = link;
    this.target = target;
  }
}

export let prospectiveSpaces : ProspectiveSpace[] = [
  new ProspectiveSpace(
    '1277 Lenox Park Blvd',
    '1277 Lenox Park',
    'Existing',
    149670,
    36.0,
    'Upper Buckhead',
    '0.00%',
    'Bridge Commercial / Jim Caswell',
    5,
    'https://product.costar.com/detail/all-properties/439626/summary',
    '_blank',
  ),
  new ProspectiveSpace(
    '3280 Peachtree Rd NE',
    'Terminus 100',
    'Existing',
    179697,
    30.0,
    'Upper Buckhead',
    '81.80%',
    'Cousins / Bill Hollett',
    5,
    'https://product.costar.com/detail/all-properties/798838/summary',
    '_blank',
  ),
  new ProspectiveSpace(
    '3350 Peachtree Rd NE',
    '3350 Peachtree',
    'Existing',
    236003,
    39.5,
    'Upper Buckhead',
    '94.70%',
    'Cousins / Bill Hollett',
    5,
    'https://product.costar.com/detail/all-properties/441133/summary',
    '_blank',
  ),
  new ProspectiveSpace(
    '3390 Peachtree Rd NE',
    'Lenox Towers South',
    'Existing',
    101633,
    25.0,
    'Upper Buckhead',
    '64.20%',
    'Stream Realty / Kevin Driver',
    5,
    'https://product.costar.com/detail/all-properties/440864/summary',
    '_blank',
  ),
  new ProspectiveSpace(
    '3475 Piedmont Rd NE',
    'Prominence in Buckhead',
    'Existing',
    175457,
    42.0,
    'Upper Buckhead',
    '76.50%',
    'Cushman & Wakefield / Andy Sumlin',
    5,
    'https://product.costar.com/detail/all-properties/444945/summary',
    '_blank',
  ),
  new ProspectiveSpace(
    '3565 Piedmont Rd NE',
    'Piedmont Center 1-4',
    'Existing',
    193896,
    31.0,
    'Upper Buckhead',
    '67.90%',
    'Cushman & Wakefield / Will Porter',
    5,
    'https://product.costar.com/detail/all-properties/440806/summary',
    '_blank',
  ),
  new ProspectiveSpace(
    '3575 Piedmont Rd NE',
    '15 Piedmont Center',
    'Existing',
    143929,
    35.0,
    'Upper Buckhead',
    '84.40%',
    'Cushman & Wakefield / Will Porter',
    5,
    'https://product.costar.com/detail/all-properties/444710/summary',
    '_blank',
  ),
];