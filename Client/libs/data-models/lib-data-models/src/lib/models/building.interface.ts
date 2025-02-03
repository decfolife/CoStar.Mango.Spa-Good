// Converted from \VirtualPremise.Domain.Web.UI\1 - Main\v06\VirtualPremise.Domain.VPObjects\BLL\Building

declare interface Building {
  address: string;
  address2: string;
  building_2: any;
  buildingID: number;
  buildingName: string;
  city: string;
  country: string;
  isActive: boolean;
  lastModifiedBy: number;
  state: string;
  zipCode: string;
}

export interface AddBuildingRequest {
  buildingAddress: string;
  buildingCity: string;
  buildingCountry: string;
  buildingMasterGroupID: number;
  buildingName: string;
  buildingState: string;
  buildingZipCode: string;
  objectTypeTypeID: number;
  portfolioSubGroupID?: number;
  tenantID?: number;
}
