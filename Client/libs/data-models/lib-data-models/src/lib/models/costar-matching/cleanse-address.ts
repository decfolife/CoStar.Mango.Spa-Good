export interface CleanseAddress {
  streetAddress?: string;
  streetNumber?: string;
  streetNumberEndRange?: string;
  streetDirection?: string;
  streetName?: string;
  streetType?: string;
  streetSuffix?: string;
  suite?: string;
  buildingName?: string;
  buildingNumber?: string;
  postalBox?: string;
  city?: string;
  countyName?: string;
  state?: string;
  postcode?: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
}
