export interface ServiceAccountSites{
  userSites: ServiceAccountSite[];
}

export interface ServiceAccountSite{
  clientKey: string;
  isActive: boolean;
}
