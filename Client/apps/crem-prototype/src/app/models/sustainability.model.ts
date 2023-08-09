
export class Sustainability {
  constructor(
    public propertyId: number,
    public propertyCertifications?: PropertyCertifications,
    public costarData?: CostarData,
    public buildingPerformanceMetrics? : BuildingPerformanceMetrics[],
    public greenLeaseClause? : GreenLeaseClause[],
  ){
    this.propertyId = propertyId;
    this.propertyCertifications = propertyCertifications;
    this.costarData = costarData;
    this.buildingPerformanceMetrics = buildingPerformanceMetrics;
    this.greenLeaseClause = greenLeaseClause;
  }
}

export let sustainabilities : Sustainability[] = [
  {
    propertyId: 627,
    propertyCertifications: {
      leedStatus: 'Certified - Gold',
      leedScore: 82,
      leedDate: '8/5/2021',
      energyStarStatus: 'Certified',
      energyStarScore: 67,
      energyStarDate: '8/5/2021',
      breeamStatus: 'Not Certified',
      greenGlobesExistingBuildingStatus: 'Four Green Globes',
      wellStatus: 'Gold',
      wellHealthSafetySealStatus: 'Certified',
      fitwellStatus: 'Green Mark',
      energyCertification: 'Green Star',
      energyCertificationValue: 'HQE',
      renewableEnergy: 'LEED',
    },
    costarData: {
      walkabilityScore: 'Very Walkable - 84',
      transitScore: 'Good Transit - 51',
      bomaCertification: 'BOMA 360 Performance Building',
      floodRisk: 'Moderate to Low Risk - Zone B and X',
    },
    buildingPerformanceMetrics: [
      {
        period: '9/1/2022',
        energyUseIntensity: '83 kBtu/sf',
        co2Emissions: '29 lbs/sf',
        waterUse: '2,200 gal',
        energyStarScore: 43,
        occupantSatisfaction: '65%',
      },
      {
        period: '10/1/2022',
        energyUseIntensity: '81 kBtu/sf',
        co2Emissions: '30 lbs/sf',
        waterUse: '2,100 gal',
        energyStarScore: 32,
        occupantSatisfaction: '68%',
      }
    ],
    greenLeaseClause: [
      {
        clause: 'Rooftop Units',
        value: 'Prior to delivery of possession to Tenant, Landlord shall pay for any additional RTUs to cover increased cooling capacity needs. This cost is outside the Tenant Improvement Allowance or Turnkey structure. ANSI/ACCA Standard 5 for HVAC Quality Installation Specification must be followed for installation of any new RTUs'
      },
      {
        clause: 'Submetering',
        value: 'Landlord will install an electric submeter to service the lease premises to measure the consumption of electricity in the lease premises, and Landlord will charge Tenant and Tenant will pay as an additional charge hereunder such amounts as are invoiced by Landlord for Tenant’s electricity usage as measured by such submeter, without markup by Landlord, and Landlord will make appropriate adjustments to the electricity charges included in Operating Expenses so that Tenant’s proportionate share of operating expense increase will not include such amounts with are separately invoiced and paid by Tenant.'
      },
    ]
  }
];

export interface PropertyCertifications {
  leedStatus? : string;
  leedScore? : number;
  leedDate? : string;
  energyStarStatus? : string;
  energyStarScore? : number;
  energyStarDate? : string;
  breeamStatus? : string;
  breeamDate? : string;
  gbiStatus? : string;
  gbiDate? : string;
  greenGlobesExistingBuildingStatus? : string;
  greenGlobesExistingBuildingDate? : string;
  greenGlobesSustainableInterior? : string;
  greenGlobesSustainableInteriorDate? : string;
  greenGlobesNewConstructionStatus? : string;
  greenGlobesNewConstructionDate? : string;
  wellStatus? : string;
  wellScore? : number;
  wellDate? : string;
  wellHealthSafetySealStatus? : string;
  epcRating? : string;
  epcRatingDate? : string;
  boma360Status? : string;
  fitwellStatus? : string;
  fitwellDate? : string;
  energyCertification? : string;
  energyCertificationValue? : string;
  renewableEnergy? : string;
  renewableEnergyType? : string;
  minergieScore? : number;
  snbs? : string;
  nabersScore? : number;
  wiredScore? : number;
}

export interface CostarData {
  propertyId? : number,
  walkabilityScore? : string;
  transitScore? : string;
  bomaCertification? : string;
  floodRisk? : string;
}

export interface BuildingPerformanceMetrics {
  period : string;
  energyUseIntensity? : string;
  co2Emissions? : string;
  waterUse? : string;
  energyStarScore? : number;
  occupantSatisfaction? : string;
}

export interface GreenLeaseClause {
  clause : string;
  value : string;
}