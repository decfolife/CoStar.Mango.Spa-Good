import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AuthHTTPResponse,
  ClientSitesByUser,
  ContactRecord,
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
  UpdateServiceAccountExpiresInDaysRequest,
  Api,
  IS_CA_STANDALONE_APP
} from '@mango/data-models/lib-data-models';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DBkeys } from '../utilities/db-keys';
import { StorageService } from './storage.service';
import { LoginResponse } from 'libs/data-models/lib-data-models/src/lib/models/userAuth';
import { UtilitiesService } from '@mango/core-shared';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isCaStandAloneApp: boolean = inject(IS_CA_STANDALONE_APP);
  spaServer: string = `${window.location.origin}/api`
  identityUrl: string = UtilitiesService.getBaseApiUrl(Api.identity, this.isCaStandAloneApp)
  authenticationUrl: string = UtilitiesService.getBaseApiUrl(Api.authentication, this.isCaStandAloneApp)
  userMaintenanceUrl: string = UtilitiesService.getBaseApiUrl(Api.userMaintenance, this.isCaStandAloneApp)

  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
    private env: Environment,
  ) { }

  setAuth(user: UserAuth) {
    this._storageService.savePermanentData(user, DBkeys.USER_AUTH);
  }

  purgeAuth() {
    this._storageService.clearAll()
  }

  retrieveAuthorizationCode(redirectUri: string): Observable<OAuthAuthorizeHTTPResponse> {
    return this.http.get<OAuthAuthorizeHTTPResponse>(`${this.identityUrl}oauth/authorize?clientId=mango-spa&responseType=code&redirectUri=${redirectUri}`, { withCredentials: true })
  }

  retrieveJwt(authCode: string, source: string): Observable<OAuthTokenHTTPResponse> {
    let baseUrl = UtilitiesService.isLocalEnvironment() ? this.identityUrl : this.spaServer;

    const request = {
      grantType: "authorization_code",
      code: authCode,
      redirectUri: "",
      codeVerifier: "",
      source: source
    }
    return this.http.post<OAuthTokenHTTPResponse>(`${baseUrl}/oauth/token`, request, { withCredentials: true })
  }

  login(credentials): Observable<LoginResponse> {
    this.purgeAuth();
    return this.http.post(`${this.identityUrl}auth/login`, credentials, { withCredentials: true }).pipe<any>(
      switchMap((response: any) => {
        const decodedJwt = this.getDecodedAuthToken(response.authToken);
        const user: UserAuth = {
          userId: parseInt(decodedJwt.userId),
          email: response.email,
          hasMultipleSites: response.hasMultipleSites,
          clientKey: response.clientKey,
          isAutoProvisioned: this.parseBool(decodedJwt.isAutoProvisioned),
          isServiceAccount: this.parseBool(decodedJwt.isServiceAccount)
        };

        const res: LoginResponse = {
          user: user,
          authToken: response.authToken,
        };

        return of(res)
      })
    );
  }

  loginToClientSite(payload: MultiClientLoginHttpRequest): Observable<AuthHTTPResponse> {
    return this.http.post<AuthHTTPResponse>(`${this.identityUrl}auth/login/client`, payload, { withCredentials: true });
  }

  // CA web app specific
  getCurrentUserAccessToken(): Observable<string> {
    return this.http.get<string>(`${this.identityUrl}auth/user/token`, { withCredentials: true });
  }

  getCurrentCREMUserAccessToken(): Observable<string> {
    return this.http.get<string>(`${this.spaServer}/auth/user/token`, { withCredentials: true });
  }

  // CA web app specific
  logout() {
    this.purgeAuth();
    this.http.get(`${this.identityUrl}auth/logout`, { withCredentials: true })
      .subscribe();
  }

  logoutCREM() {
    this.purgeAuth();
    this.http.post(`${this.spaServer}/auth/logout`, { withCredentials: true })
      .subscribe();
  }

  requestPasswordReset(request: RequestPasswordResetRequest): Observable<any> {
    return this.http.post<any>(`${this.identityUrl}password/forgot`, request)
  }

  forceExpirePassword(request: RequestPasswordResetRequest): Observable<any> {
    return this.http.post<any>(`${this.authenticationUrl}password/forceexpire`, request)
  }

  resetPassword(credentials): Observable<boolean> {
    let url = `${this.identityUrl}/password/reset`;
    return this.http.post<boolean>(url, credentials)
  }

  validateTokenAndGetPasswordRequirements(resetToken: string): Observable<Password> {
    return this.http.get<Password>(`${this.identityUrl}password/requirements/${resetToken}`)
  }

  getClientSitesByUser(userEmail: string): Observable<ClientSitesByUser> {
    return this.http.get<ClientSitesByUser>(`${this.identityUrl}user/clientsites/${userEmail}`, { withCredentials: true });
  }

  getRecentSitesForUser(userEmail: string): Observable<RecentUserSites> {
    return this.http.get<RecentUserSites>(`${this.identityUrl}user/recentsites/${userEmail}`, { withCredentials: true })
  }

  getContactRecords(userEmail: string, clientKey: string): Observable<GetContactRecordHTTPResponse> {
    return this.http.get<GetContactRecordHTTPResponse>(`${this.identityUrl}user/contactrecords/${userEmail}/${clientKey}`, { withCredentials: true });
  }

  getContactRecord(email: string, contactId: number, clientKey: string): Observable<ContactRecord> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'UserId': contactId,
      'ClientKey': clientKey
    })

    return this.http.get<ContactRecord>(`${this.userMaintenanceUrl}usermaintenance/getuser/${email}?contactId=${contactId}`, { headers: headers })
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

  isAutoProvisioned(accessToken: string): boolean {
    const decodedJwt = this.getDecodedAuthToken(accessToken);
    const isAutoProvisioned = this.parseBool(decodedJwt.isAutoProvisioned)
    return isAutoProvisioned
  }

  parseBool(value: string): boolean {
    if (!value) return false;
    return value.toLowerCase() === 'true';
  }

  generateApiKey(): Observable<any> {
    const url = `${this.authenticationUrl}/serviceaccount/createapikey`;
    const body = {}
    return this.http.post(url, body).pipe<string>(
      tap((response: any) => {
        return response.data;
      })
    );
  }

  getServiceAccountInfo(): Observable<ServiceAccountInfo> {
    return this.http.get<ServiceAccountInfo>(`${this.authenticationUrl}/serviceaccount/accountinfo`)
  }

  updateServiceAccountApiAccess(request: UpdateServiceAccountApiAccessRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.authenticationUrl}/serviceaccount/updateapiaccess`, request)
  }

  updateServiceAccountExpiresInDays(request: UpdateServiceAccountExpiresInDaysRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.authenticationUrl}/serviceaccount/expiresindays`, request)
  }

  getServiceAccountChangeHistory(): Observable<ServiceAccountChangeHistory[]> {
    return this.http.get<ServiceAccountChangeHistory[]>(`${this.authenticationUrl}/serviceaccount/accounthistory`)
  }
}