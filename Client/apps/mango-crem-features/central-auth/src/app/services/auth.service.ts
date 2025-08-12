import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AuthHTTPResponse,
  ClientSitesByUser,
  GetContactRecordHTTPResponse,
  MultiClientLoginHttpRequest,
  OAuthAuthorizeHTTPResponse,
  Password,
  RecentUserSites,
  RequestPasswordResetRequest,
  Token,
  IS_CA_STANDALONE_APP,
  ApiResult,
} from '@mango/data-models/lib-data-models';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoginResponse } from 'libs/data-models/lib-data-models/src/lib/models/user-auth.interface';
import {
  JwtService,
  StorageService,
  UtilitiesService,
  parseBool,
} from '@mango/core-shared';
import { UserAuth } from '../models/userAuth';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isCaStandAloneApp: boolean = inject(IS_CA_STANDALONE_APP);
  identityUrl: string = UtilitiesService.getCABackendBaseApiUrl();

  // AccessToken only needed when used by client specific login since we dont generate an authentication cookie
  private tempAccessToken: string;
  get header() {
    let headers = {};
    this.tempAccessToken
      ? (headers['Authorization'] = `Bearer ${this.tempAccessToken}`)
      : null;
    return headers;
  }

  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
    private jwtService: JwtService
  ) {}

  // setAuth(user: UserAuth) {
  //   this._storageService.savePermanentData(user, DBkeys.USER_AUTH);
  // }

  purgeAuth() {
    let instance = null;
    
    const isDev = environment.name === 'DEV';
    if (isDev) {
      instance = this._storageService.getData('instance')
    }
    
    this.tempAccessToken = '';
    this._storageService.clearAll();

    if (isDev) {
      this._storageService.savePermanentData(instance, 'instance');
    }
  }

  retrieveAuthorizationCode(
    redirectUri: string,
    accessToken: string
  ): Observable<OAuthAuthorizeHTTPResponse> {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return this.http.get<OAuthAuthorizeHTTPResponse>(
      `${this.identityUrl}/oauth/authorize?clientId=mango-spa&responseType=code&redirectUri=${redirectUri}`,
      {
        headers: headers,
        withCredentials: true,
      }
    );
  }

  login(credentials): Observable<LoginResponse> {
    this.purgeAuth();
    let isClientSpecificLogin = credentials.clientKey ? true : false;

    return this.http
      .post(`${this.identityUrl}/auth/login`, credentials, {
        withCredentials: true,
      })
      .pipe<any>(
        switchMap((response: any) => {
          const decodedJwt = this.getDecodedAuthToken(response.authToken);
          const user: UserAuth = {
            userId: parseInt(decodedJwt.userId),
            email: response.email,
            hasMultipleSites: response.hasMultipleSites,
            clientKey: response.clientKey,
            isAutoProvisioned: parseBool(decodedJwt.isAutoProvisioned),
            isServiceAccount: parseBool(decodedJwt.isServiceAccount),
          };

          if (isClientSpecificLogin) this.tempAccessToken = response.authToken;

          // if (UtilitiesService.isLocalEnvironment() && !isClientSpecificLogin) {
          //   this.jwtService.saveToken(response.authToken);
          // }

          const res: LoginResponse = {
            user: user,
            authToken: response.authToken,
          };

          return of(res);
        })
      );
  }

  loginToClientSite(
    payload: MultiClientLoginHttpRequest
  ): Observable<AuthHTTPResponse> {
    return this.http.post<AuthHTTPResponse>(
      `${this.identityUrl}/auth/login/client`,
      payload,
      {
        headers: this.header,
        withCredentials: true,
      }
    );
  }

  getCurrentUser(): Observable<UserAuth> {
    // if (UtilitiesService.isLocalEnvironment()) {
    //   const user: UserAuth = this.buildUser();
    //   if (!user) {
    //     return throwError('No current logged in user exists.');
    //   }

    //   return of(user);
    // }

    return this.http.get<UserAuth>(`${this.identityUrl}/auth/user`, {
      withCredentials: true,
    });
  }

  // Use ONLY when running in LOCAL
  buildUser(): UserAuth {
    let accessToken = this.jwtService.getToken();
    if (!accessToken) return null;

    let decodedToken = this.getDecodedAuthToken(accessToken);

    const user: UserAuth = {
      userId: parseInt(decodedToken.userId),
      email: decodedToken.email,
      clientKey: decodedToken.clientKey,
      isAutoProvisioned: parseBool(decodedToken.isAutoProvisioned),
      isServiceAccount: parseBool(decodedToken.isServiceAccount),
      isRemUser: parseInt(decodedToken.securityLevel) > -1,
      hasMultipleSites: parseBool(decodedToken.hasMultipleSites),
    };

    return user;
  }

  logout() {
    this.purgeAuth();
    this.http
      .get(`${this.identityUrl}/auth/logout`, { withCredentials: true })
      .subscribe();
  }

  requestPasswordReset(request: RequestPasswordResetRequest): Observable<any> {
    return this.http
      .post<ApiResult<any>>(`${this.identityUrl}/password/forgot`, request)
      .pipe(map((x) => x.data));
  }

  resetPassword(credentials): Observable<boolean> {
    let url = `${this.identityUrl}/password/reset`;
    return this.http.post<boolean>(url, credentials);
  }

  validateTokenAndGetPasswordRequirements(
    resetToken: string
  ): Observable<Password> {
    return this.http
      .get<ApiResult<Password>>(
        `${this.identityUrl}/password/requirements?resetToken=${resetToken}`
      )
      .pipe(map((x) => x.data));
  }

  getClientSitesByUser(userEmail: string): Observable<ClientSitesByUser> {
    return this.http
      .get<ApiResult<ClientSitesByUser>>(
        `${this.identityUrl}/user/clientsites/${userEmail}`,
        {
          headers: this.header,
          withCredentials: true,
        }
      )
      .pipe(map((x) => x.data));
  }

  getRecentSitesForUser(userEmail: string): Observable<RecentUserSites> {
    return this.http
      .get<ApiResult<RecentUserSites>>(
        `${this.identityUrl}/user/recentsites/${userEmail}`,
        { withCredentials: true }
      )
      .pipe(map((x) => x.data));
  }

  getContactRecords(
    userEmail: string,
    clientKey: string
  ): Observable<GetContactRecordHTTPResponse> {
    return this.http
      .get<ApiResult<GetContactRecordHTTPResponse>>(
        `${this.identityUrl}/user/contactrecords/${userEmail}/${clientKey}`,
        {
          headers: this.header,
          withCredentials: true,
        }
      )
      .pipe(map((x) => x.data));
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
    const isAutoProvisioned = parseBool(decodedJwt.isAutoProvisioned);
    return isAutoProvisioned;
  }
}
