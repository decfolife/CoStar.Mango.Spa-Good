export interface GetContactRecordHTTPResponse {
  contactRecords: ContactRecordHTTPObject[];
}

export interface ContactRecordHTTPObject {
  contactID: number;
  contactFirstName: string;
  contactLastName: string;
  contactUserID: string;
  isDefaultLoginContact: boolean;
  requireSSO: boolean;
  userRoleName: string;
}

export interface MultiClientLoginHttpRequest {
  clientKey: string;
  contactID?: number;
  isDefaultLoginContact?: boolean;
  defaultLoginContactId?: number;
  instance?: string;
}

export interface CremHTTPResult {
  Data: string;
  StatusCode: number;
  TrackingId: string;
}

export interface CremHttpData {
  Result: CremHTTPResult;
}

export interface CremHttpResponse {
  d: CremHttpData;
}

export interface AuthHTTPResponse {
  authToken: string;
  email: string;
  hasMultipleSites: boolean;
  clientKey: string;
  isAutoProvisioned: boolean;
  contactId?: number;
  isServiceAccount?: boolean;
}

export interface OAuthAuthorizeHTTPResponse {
  code: string;
  redirectUrl: string;
  state: string;
  issuer: string;
}

export interface OAuthTokenHTTPResponse {
  accessToken: string;
  tokenType: string;
  code: string;
  redirectUri: string;
  state: string;
  issuer: string;
}
