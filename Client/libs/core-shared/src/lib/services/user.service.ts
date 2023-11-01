import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { DBkeys } from '../utilities/db-keys';
import {
  Password,
  RequestPasswordResetRequest,
  UserSite,
  ClientSitesByUser,
  UserAuth,
  Token,
  RecentUserSites,
  MultiClientLoginHttpRequest,
  GetContactRecordHTTPResponse,
  ContactRecord,
  ContactRecordHTTPObject,
  OAuthAuthorizeHTTPResponse,
  OAuthTokenHTTPResponse,
  ServiceAccountApiKeyInfo,
  ServiceAccountSites,
  ServiceAccountEndpoints,
  UpdateServiceAccountApiAccessRequest,
  AuthHTTPResponse,
} from '@mango/data-models/lib-data-models';
import { Environment } from '@mango/data-models/lib-data-models';
import jwt_decode from "jwt-decode";
import { JwtPayload } from "jwt-decode"

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<UserAuth>
  public currentUser: Observable<UserAuth>;

  private accessTokenSubject = new BehaviorSubject<string>(null);
  public accessToken = this.accessTokenSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private currentSelectedCustomer = new BehaviorSubject<UserSite>(null);
  public selectedCustomer = this.currentSelectedCustomer.asObservable();

  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
    private env: Environment
  ) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(
      this._storageService.getDataObject(DBkeys.USER_AUTH));

    this.currentUser = this.currentUserSubject
      .asObservable()
      .pipe(distinctUntilChanged());

    this.currentSelectedCustomer = new BehaviorSubject<UserSite>(
      this._storageService.getDataObject(DBkeys.SELECTED_CUSTOMER));
  }

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  public get accessTokenValue(): string {
    return this.accessTokenSubject.value;
  }

  public get selectedSiteValue(): UserSite {
    return this.currentSelectedCustomer.value;
  }

  setAccessToken(accessToken: string) {
    this.accessTokenSubject.next(accessToken);
  }

  setAuth(user: UserAuth, accessToken: string) {
    this._storageService.savePermanentData(user, DBkeys.USER_AUTH);
    this.accessTokenSubject.next(accessToken);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this._storageService.clearAll()
    this.accessTokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.currentSelectedCustomer.next(null);
  }

  retrieveAuthorizationCode(redirectUri: string): Observable<OAuthAuthorizeHTTPResponse> {
    return this.http.get<OAuthAuthorizeHTTPResponse>(`${this.env.appUrls.identity}/oauth/authorize?clientId=mango-spa&responseType=code&redirectUri=${redirectUri}`)
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
    let url = `${this.env.appUrls.identity}/auth/login`;

    this.purgeAuth();

    return this.http.post(url, credentials, { withCredentials: true }).pipe<AuthHTTPResponse>(
      tap((response: any) => {
        var decoded = this.getDecodedAuthToken(response.authToken);

        const user: UserAuth = {
          email: response.email,
          hasMultipleSites: response.hasMultipleSites,
          clientKey: response.clientKey,
          isAutoProvisioned: this.parseBool(decoded.isAutoProvisioned),
          isServiceAccount: this.parseBool(decoded.isServiceAccount)
        };

        this.setAuth(user, response.authToken);
        return this.currentUserValue;
      })
    );
  }

  async loginToClientSite(payload: MultiClientLoginHttpRequest): Promise<string> {
    const user = await this.http.post<AuthHTTPResponse>(`${this.env.appUrls.identity}/auth/login/client`, payload).toPromise();

    this.accessTokenSubject.next(user.authToken);

    return user.authToken;
  }

  // Get access token from memory or from the backend API using the session cookie
  getCurrentUserAccessToken(): Observable<string> {
    if (this.accessTokenValue) return of(this.accessTokenValue);
    return this.http.get<string>(`${this.env.appUrls.identity}/auth/user/token`, { withCredentials: true });
  }

  logout() {
    this.purgeAuth();
    this.http.get(`${this.env.appUrls.identity}/auth/logout`, { withCredentials: true })
      .subscribe();
  }

  requestPasswordReset(request: RequestPasswordResetRequest): Observable<any> {
    let url = `${this.env.appUrls.identity}/password/forgot`;

    return this.http.post(url, request).pipe(
      tap(result => {
        return result;
      })
    );
  }

  forceExpirePassword(request: RequestPasswordResetRequest): Observable<any> {
    let url = `${this.env.appUrls.authentication}password/forceexpire`;

    return this.http.post(url, request).pipe(
      tap(result => {
        return result;
      })
    );
  }

  resetPassword(credentials): Observable<boolean> {
    let url = `${this.env.appUrls.identity}/password/reset`;

    return this.http.post(url, credentials).pipe<boolean>(
      tap((response: any) => {
        return response;
      })
    );
  }

  validateTokenAndGetPasswordRequirements(resetToken: string): Observable<Password> {
    let url = `${this.env.appUrls.identity}/password/requirements/${resetToken}`;

    return this.http.get(url).pipe<Password>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getClientSitesByUser(userEmail: string): Observable<ClientSitesByUser> {
    const url = `${this.env.appUrls.identity}/user/clientsites/${userEmail}`;

    return this.http.get(url).pipe<ClientSitesByUser>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getRecentSitesForUser(userEmail: string): Observable<RecentUserSites> {
    const url = `${this.env.appUrls.identity}/user/recentsites/${userEmail}`;

    return this.http.get(url).pipe<RecentUserSites>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getContactRecords(userEmail: string, clientKey: string): Promise<GetContactRecordHTTPResponse> {
    return this.http.get<GetContactRecordHTTPResponse>(`${this.env.appUrls.identity}/user/contactrecords/${userEmail}/${clientKey}`).toPromise();
  }

  getContactRecord(email, contactId, clientKey): Observable<ContactRecordHTTPObject> {
    return this.http.get<ContactRecordHTTPObject>(`${this.env.appUrls.identity}/user/contactrecord/${email}?contactId=${contactId}&clientKey=${clientKey}`)
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

  setSelectedSite(selectedCustomer: UserSite) {
    this._storageService.saveSyncedSessionData(
      selectedCustomer,
      DBkeys.SELECTED_CUSTOMER
    );
    this.currentSelectedCustomer.next(selectedCustomer);
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
    const testData : ServiceAccountApiKeyInfo = {
      userEmail: userEmail,
      dateGenerated: date,
      expirationDate: date,
    }
    return of(testData);
  }

  generateApiKey(): Observable<any> {    
    const url = `${this.env.appUrls.authentication}/serviceaccount/createclientapikey`;
    const body = { }
     return this.http.post(url, body).pipe<string>(
      tap( (response: any) => {
        return response.data;
      })
    );
  }

  getServiceAccountSites(userEmail: string): Observable<ServiceAccountSites> {
    const url = `${this.env.appUrls.authentication}/serviceaccount/sites/${userEmail}`;

    return this.http.get(url).pipe<ServiceAccountSites>(
      tap((response: any) => {
        return response;
      })
    );
  }

  updateServiceAccountApiAccess(request: UpdateServiceAccountApiAccessRequest): Observable<any> {
    const url = `${this.env.appUrls.authentication}/serviceaccount/updateapiaccess`;

    return this.http.put(url, request).pipe<boolean>(
      tap((response: any) => {
        return response;
      })
    );
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
    const testData : any = [
          {lastModified: date, modifiedBy: 'Li Liu 1', description: 'Create Account 1', beforeChange: 'Old value 1', afterChange: 'New value 1'},
          {lastModified: date, modifiedBy: 'Li Liu 2', description: 'Create Account 2', beforeChange: 'Old value 2', afterChange: 'New value 2'},
          {lastModified: date, modifiedBy: 'Li Liu 3', description: 'Create Account 3', beforeChange: 'Old value 3', afterChange: 'New value 3'},
          {lastModified: date, modifiedBy: 'Li Liu 4', description: 'Create Account 4', beforeChange: 'Old value 4', afterChange: 'New value 4'},
          {lastModified: date, modifiedBy: 'Li Liu 5', description: 'Create Account 5', beforeChange: 'Old value 5', afterChange: 'New value 5'}];

    return of(testData);
  }

  getServiceAccountEndpoints(): Observable<ServiceAccountEndpoints> {    
    const url = `${this.env.appUrls.authentication}/serviceaccount/endpoints`;

    return this.http.get(url).pipe<ServiceAccountEndpoints>(
      tap((response: any) => {
        return response;
      })
    );
  }
}