export interface UpdateServiceAccountApiAccessRequest{
  clientKey: string;
  apiAccess: boolean;
}

export interface UpdateServiceAccountExpiresInDaysRequest{
  serviceAccountExpiresInDays?: number;
}