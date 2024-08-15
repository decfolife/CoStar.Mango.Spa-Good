export interface ServiceAccountInfo {
  email?: string;
  apiKeyExpiresOn?: Date;
  apiKeyGeneratedDate?: Date;
  apiKeyExpiresInDays?: number;
  serviceAccountSites? : ServiceAccountSite[];
  serviceAccountEndpoints?: ServiceAccountEndpoint[];
  apiKeyStatus?: string;
}

export interface ServiceAccountSite{
  clientKey: string;
  apiAccess: boolean;
}

export interface ServiceAccountEndpoint{
  endpoint: string;
  isActive: boolean;
  isCommingSoon: boolean;
}