export interface Building {
  buildingID: number;
  building: string;
}

export interface Premise {
  premiseID: number;
  premiseSuite: string;
  buildingName: string;
  premiseTypeTypeID: number;
  premiseName: number;
  securityTypeID: number;
  premiseType: string;
  buildingAddress_1: string;
  buildingAddress_2: string;
  buildingCity: string;
  buildingState: string;
  buildingCountry: string;
  premiseDescText: string;
}

export interface CopyLease {
  buildingId: number;
  premiseId: number;
  hidePremise: boolean;
  leaseAbstractId: number;
}
