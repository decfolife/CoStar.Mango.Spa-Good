import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Environment,
  OAuthTokenHTTPResponse,
  RequestPasswordResetRequest,
  Token,
  UserAuth,
  Api,
} from '@mango/data-models/lib-data-models';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { DBkeys, UtilitiesService, parseBool } from '@mango/core-shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  spaServer: string = `${window.location.origin}/api`
  authenticationUrl: string = UtilitiesService.getBaseApiUrl(Api.authentication)
  userMaintenanceUrl: string = UtilitiesService.getBaseApiUrl(Api.userMaintenance)

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

  retrieveJwt(authCode: string, source: string): Observable<OAuthTokenHTTPResponse> {
    let baseUrl = UtilitiesService.isLocalEnvironment() ? UtilitiesService.getCABackendBaseApiUrl() : this.spaServer;

    const request = {
      grantType: "authorization_code",
      code: authCode,
      redirectUri: "",
      codeVerifier: "",
      source: source
    }
    return this.http.post<OAuthTokenHTTPResponse>(`${baseUrl}/oauth/token`, request, { withCredentials: true })
  }

  getCurrentUserAccessToken(): Observable<string> {
    return this.http.get<string>(`${this.spaServer}/auth/user/token`, { withCredentials: true });
  }

  logout() {
    this.purgeAuth();
    this.http.post(`${this.spaServer}/auth/logout`, { withCredentials: true })
      .subscribe();
  }

  forceExpirePassword(request: RequestPasswordResetRequest): Observable<any> {
    return this.http.post<any>(`${this.authenticationUrl}password/forceexpire`, request)
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