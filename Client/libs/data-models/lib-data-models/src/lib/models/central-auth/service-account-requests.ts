export interface UpdateServiceAccountApiAccessRequest{
  clientKey: string;
  apiAccess: boolean;
}

export interface UpdateServiceAccountEndPointAccessRequest{
  endPoint: string;
  endPointAccess: boolean;
}

export interface UpdateServiceAccountExpiresInDaysRequest{
  serviceAccountExpiresInDays?: number;
}