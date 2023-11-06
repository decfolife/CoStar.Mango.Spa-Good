export interface ServiceAccountInfo {
  apiKeyExpiresOn?: Date;
  serviceAccountSites : ServiceAccountSite[];
  serviceAccountEndpoints: ServiceAccountEndpoint[];
}

export interface ServiceAccountSite{
  clientKey: string;
  isActive: boolean;
  apiAccess: boolean;
}

export interface ServiceAccountEndpoint{
  endpoint: string;
  isActive: boolean;
}