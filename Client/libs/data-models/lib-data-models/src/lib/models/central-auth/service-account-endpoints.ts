export interface ServiceAccountEndpoints{
  endpoints: ServiceAccountEndpoint[];
}

export interface ServiceAccountEndpoint{
  endpoint: string;
  isActive: boolean;
}