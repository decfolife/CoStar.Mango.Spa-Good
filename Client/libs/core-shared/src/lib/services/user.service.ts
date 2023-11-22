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
  Token,
  ServiceAccountInfo,
  ServiceAccountChangeHistory,
  UpdateServiceAccountApiAccessRequest,
  UserAuth,
} from '@mango/data-models/lib-data-models';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DBkeys } from '../utilities/db-keys';
import { StorageService } from './storage.service';
import { LoginResponse } from 'libs/data-models/lib-data-models/src/lib/models/userAuth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
    private env: Environment
  ) { }

  setAuth(user: UserAuth) {
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

  login(credentials): Observable<LoginResponse> {
    this.purgeAuth();
    return this.http.post(`${this.env.appUrls.identity}/auth/login`, credentials, { withCredentials: true }).pipe<any>(
      switchMap((response: any) => {
        const decodedJwt = this.getDecodedAuthToken(response.authToken);
        const user: UserAuth = {
          email: response.email,
          hasMultipleSites: response.hasMultipleSites,
          clientKey: response.clientKey,
          isAutoProvisioned: this.parseBool(decodedJwt.isAutoProvisioned),
          isServiceAccount: this.parseBool(decodedJwt.isServiceAccount)
        };
        this.setAuth(user);

        const res: LoginResponse = {
          user: user,
          authToken: response.authToken,
        };

        return of(res)
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
    const { contactID, requireSSO, userRoleName, isDefaultLoginContact } = contactRecordHttpObject
    const contactRecord: ContactRecord = {
      contactID,
      firstName: contactRecordHttpObject.contactFirstName,
      lastName: contactRecordHttpObject.contactLastName,
      requireSSO,
      userName: contactRecordHttpObject.contactUserID,
      userRoleName,
      isDefaultLoginContact
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

  generateApiKey(): Observable<any> {
    const url = `${this.env.appUrls.authentication}/serviceaccount/createapikey`;
    const body = {}
    return this.http.post(url, body).pipe<string>(
      tap((response: any) => {
        return response.data;
      })
    );
  }

  getServiceAccountInfo(userEmail: string): Observable<ServiceAccountInfo> {
    return this.http.get<ServiceAccountInfo>(`${this.env.appUrls.authentication}/serviceaccount/accountinfo/${userEmail}`)
  }

  updateServiceAccountApiAccess(request: UpdateServiceAccountApiAccessRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.env.appUrls.authentication}/serviceaccount/updateapiaccess`, request)
  }

  getServiceAccountChangeHistory(userEmail: string): Observable<ServiceAccountChangeHistory[]> {
    return this.http.get<ServiceAccountChangeHistory[]>(`${this.env.appUrls.authentication}/serviceaccount/accounthistory/${userEmail}`)
  }
}