import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AuthHTTPResponse,
  ClientSitesByUser,
  Environment,
  GetContactRecordHTTPResponse,
  MultiClientLoginHttpRequest,
  OAuthAuthorizeHTTPResponse,
  Password,
  RecentUserSites,
  RequestPasswordResetRequest,
  Token,
  UserAuth,
  IS_CA_STANDALONE_APP
} from '@mango/data-models/lib-data-models';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoginResponse } from 'libs/data-models/lib-data-models/src/lib/models/userAuth';
import { DBkeys, StorageService, UtilitiesService, parseBool } from '@mango/core-shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isCaStandAloneApp: boolean = inject(IS_CA_STANDALONE_APP);
  identityUrl: string = UtilitiesService.getCABackendBaseApiUrl()

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
          isAutoProvisioned: parseBool(decodedJwt.isAutoProvisioned),
          isServiceAccount: parseBool(decodedJwt.isServiceAccount)
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

  getCurrentUserAccessToken(): Observable<string> {
    return this.http.get<string>(`${this.identityUrl}auth/user/token`, { withCredentials: true });
  }

  logout() {
    this.purgeAuth();
    this.http.get(`${this.identityUrl}auth/logout`, { withCredentials: true })
      .subscribe();
  }

  requestPasswordReset(request: RequestPasswordResetRequest): Observable<any> {
    return this.http.post<any>(`${this.identityUrl}password/forgot`, request)
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
    const isAutoProvisioned = parseBool(decodedJwt.isAutoProvisioned)
    return isAutoProvisioned
  }
}