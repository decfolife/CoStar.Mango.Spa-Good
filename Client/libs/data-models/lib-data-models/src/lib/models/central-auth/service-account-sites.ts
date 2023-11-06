export interface ServiceAccountSites{
  serviceAccountSites: ServiceAccountSite[];
}

export interface ServiceAccountSite{
  clientKey: string;
  isActive: boolean;
  apiAccess: boolean;
}
