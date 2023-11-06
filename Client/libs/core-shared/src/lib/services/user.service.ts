import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthHTTPResponse,
  ClientSitesByUser,
  ContactRecord,
  ContactRecordHTTPObject,
  Environment,
  GetContactRecordHTTPResponse,
  MultiClientLoginHttpRequest,
  OAuthAuthorizeHTTPResponse,
  OAuthTokenHTTPResponse,
  Password,
  RecentUserSites,
  RequestPasswordResetRequest,
  ServiceAccountApiKeyInfo,
  ServiceAccountEndpoints,
  ServiceAccountSites,
  Token,
  UpdateServiceAccountApiAccessRequest,
  UserAuth
} from '@mango/data-models/lib-data-models';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DBkeys } from '../utilities/db-keys';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
    private env: Environment
  ) {}

  setAuth(user: UserAuth, accessToken: string) {
    this._storageService.savePermanentData(user, DBkeys.USER_AUTH);
  }

  purgeAuth() {
    this._storageService.clearAll()
  }

  retrieveAuthorizationCode(redirectUri: string): Observable<OAuthAuthorizeHTTPResponse> {
    return this.http.get<OAuthAuthorizeHTTPResponse>(`${this.env.appUrls.identity}/oauth/authorize?clientId=mango-spa&responseType=code&redirectUri=${redirectUri}`, { withCredentials: true })
  }

  retrieveJwt(authCode: string): Observable<OAuthTokenHTTPResponse> {
    const request = {
      grantType: "authorization_code",
      code: authCode,
      redirectUrl: "",
      codeVerifier: ""
    }
    return this.http.post<OAuthTokenHTTPResponse>(`${this.env.appUrls.identity}/oauth/token`, request)
  }

  login(credentials): Observable<UserAuth> {
    this.purgeAuth();

    return this.http.post(`${this.env.appUrls.identity}/auth/login`, credentials, { withCredentials: true }).pipe<AuthHTTPResponse>(
      tap((response: any) => {
        const decodedJwt = this.getDecodedAuthToken(response.authToken);

        const user: UserAuth = {
          email: response.email,
          hasMultipleSites: response.hasMultipleSites,
          clientKey: response.clientKey,
          isAutoProvisioned: this.parseBool(decodedJwt.isAutoProvisioned),
          isServiceAccount: this.parseBool(decodedJwt.isServiceAccount)
        };
        this.setAuth(user, response.authToken);
      })
    );
  }

  loginToClientSite(payload: MultiClientLoginHttpRequest): Observable<AuthHTTPResponse> {
    return this.http.post<AuthHTTPResponse>(`${this.env.appUrls.identity}/auth/login/client`, payload);
  }

  getCurrentUserAccessToken(): Observable<string> {
    return this.http.get<string>(`${this.env.appUrls.identity}/auth/user/token`, { withCredentials: true });
  }

  logout() {
    this.purgeAuth();
    this.http.get(`${this.env.appUrls.identity}/auth/logout`, { withCredentials: true })
      .subscribe();
  }

  requestPasswordReset(request: RequestPasswordResetRequest): Observable<any> {
    return this.http.post<any>(`${this.env.appUrls.identity}/password/forgot`, request)
  }

  forceExpirePassword(request: RequestPasswordResetRequest): Observable<any> {
    return this.http.post<any>(`${this.env.appUrls.authentication}password/forceexpire`, request)
  }

  resetPassword(credentials): Observable<boolean> {
    let url = `${this.env.appUrls.identity}/password/reset`;
    return this.http.post<boolean>(url, credentials)
  }

  validateTokenAndGetPasswordRequirements(resetToken: string): Observable<Password> {
    return this.http.get<Password>(`${this.env.appUrls.identity}/password/requirements/${resetToken}`)
  }

  getClientSitesByUser(userEmail: string): Observable<ClientSitesByUser> {
    return this.http.get<ClientSitesByUser>(`${this.env.appUrls.identity}/user/clientsites/${userEmail}`, { withCredentials: true });
  }

  getRecentSitesForUser(userEmail: string): Observable<RecentUserSites> {
    return this.http.get<RecentUserSites>(`${this.env.appUrls.identity}/user/recentsites/${userEmail}`, { withCredentials: true })
  }

  getContactRecords(userEmail: string, clientKey: string): Observable<GetContactRecordHTTPResponse> {
    return this.http.get<GetContactRecordHTTPResponse>(`${this.env.appUrls.identity}/user/contactrecords/${userEmail}/${clientKey}`, { withCredentials: true });
  }

  getContactRecord(email, contactId, clientKey): Observable<ContactRecordHTTPObject> {
    return this.http.get<ContactRecordHTTPObject>(`${this.env.appUrls.identity}/user/contactrecord/${email}?contactId=${contactId}&clientKey=${clientKey}`, { withCredentials: true })
  }

  parseContactRecordHttpObject(contactRecordHttpObject: ContactRecordHTTPObject): ContactRecord {
    const { contactID, requireSSO, userRoleName } = contactRecordHttpObject
    const contactRecord: ContactRecord = {
      contactID,
      firstName: contactRecordHttpObject.contactFirstName,
      lastName: contactRecordHttpObject.contactLastName,
      requireSSO,
      userName: contactRecordHttpObject.contactUserID,
      userRoleName
    }
    return contactRecord
  }

  getDecodedAuthToken(token: string): Token {
    return jwt_decode<Token>(token);
  }

  getAuthTokenExpireDate(token: string): Date {
    var decoded = jwt_decode<JwtPayload>(token);

    if (!decoded.exp) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  parseBool(value: string): boolean {
    if (!value) return false;
    return value.toLowerCase() === 'true';
  }

  getServiceAccountApiKeyInfo(userEmail: string): Observable<ServiceAccountApiKeyInfo> {
    const url = `${this.env.appUrls.identity}/getServiceAccountApiKeyInfo/{userEmail}`;

    // return this.http.get(url).pipe<ServiceAccountApiKeyInfo>(
    // );

    //To be deleted after API integration
    let date = new Date();
    const testData: ServiceAccountApiKeyInfo = {
      userEmail: userEmail,
      dateGenerated: date,
      expirationDate: date,
    }
    return of(testData);
  }

  generateApiKey(): Observable<any> {
    return this.http.post<any>(`${this.env.appUrls.authentication}/serviceaccount/createapikey`, {})
  }

  getServiceAccountSites(userEmail: string): Observable<ServiceAccountSites> {
    return this.http.get<ServiceAccountSites>(`${this.env.appUrls.authentication}/serviceaccount/sites/${userEmail}`)
  }

  updateServiceAccountApiAccess(request: UpdateServiceAccountApiAccessRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.env.appUrls.authentication}/serviceaccount/updateapiaccess`, request)
  }

  getServiceAccountChangeHistory(userEmail: string): Observable<any> {
    // const url = `${this.env.appUrls.identity}/getServiceAccountChangeHistory/{userEmail}`;

    // return this.http.get(url).pipe<any>(
    //   tap((response: any) => {
    //     return response;
    //   })
    // );

    //To be deleted after API integration
    let date = new Date();
    const testData: any = [
      { lastModified: date, modifiedBy: 'Li Liu 1', description: 'Create Account 1', beforeChange: 'Old value 1', afterChange: 'New value 1' },
      { lastModified: date, modifiedBy: 'Li Liu 2', description: 'Create Account 2', beforeChange: 'Old value 2', afterChange: 'New value 2' },
      { lastModified: date, modifiedBy: 'Li Liu 3', description: 'Create Account 3', beforeChange: 'Old value 3', afterChange: 'New value 3' },
      { lastModified: date, modifiedBy: 'Li Liu 4', description: 'Create Account 4', beforeChange: 'Old value 4', afterChange: 'New value 4' },
      { lastModified: date, modifiedBy: 'Li Liu 5', description: 'Create Account 5', beforeChange: 'Old value 5', afterChange: 'New value 5' }];

    return of(testData);
  }

  getServiceAccountEndpoints(): Observable<ServiceAccountEndpoints> {
    return this.http.get<ServiceAccountEndpoints>(`${this.env.appUrls.authentication}/serviceaccount/endpoints`)
  }
}