export interface ServiceAccountApiKeyInfo {
  userEmail: string;
  apiKey?: string;
  dateGenerated: Date;
  expirationDate: Date;
}