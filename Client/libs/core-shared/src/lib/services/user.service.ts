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
  LoginResponse,
  RecentUserSites,
  MultiClientLoginHttpRequest,
  GetContactRecordHTTPResponse,
  ContactRecord,
  ContactRecordHTTPObject,
  OAuthAuthorizeHTTPResponse,
  OAuthTokenHTTPResponse,
  ServiceAccountApiKeyInfo,
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

  setAuth(user: UserAuth) {
    this._storageService.savePermanentData(user, DBkeys.USER_AUTH);
    this._storageService.savePermanentData(user.authToken, DBkeys.JWT_TOKEN);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  parseUserJWT(jwt: string): UserAuth {
    const parsedJwt = JSON.parse(window.atob(jwt.split('.')[1]))
    const user: UserAuth = {
      contactId: parsedJwt.contactId,
      authToken: jwt,
      clientKey: parsedJwt.clientKey,
      email: parsedJwt.email,
      hasMultipleSites: parsedJwt.hasMultipleSites, 
      isAutoProvisioned: parsedJwt.isAutoProvisioned
    }
    return user
  }

  retrieveContactRecord(email, contactId, clientKey): Observable<ContactRecordHTTPObject> {
    return this.http.get<ContactRecordHTTPObject>(`${this.env.appUrls.authenticate}/user/contactrecord/${email}?contactId=${contactId}&clientKey=${clientKey}`)
  }

  retrieveAuthorizationCode(redirectUri: string): Observable<OAuthAuthorizeHTTPResponse> {
    return this.http.get<OAuthAuthorizeHTTPResponse>(`${this.env.appUrls.authenticate}/oauth/authorize?clientId=mango-spa&responseType=code&redirectUri=${redirectUri}`)
  }

  retrieveJwt(authCode: string): Observable<OAuthTokenHTTPResponse> {
    const request = {
      grantType: "authorization_code",
      code: authCode,
      redirectUrl: "",
      codeVerifier: ""
    }
    return this.http.post<OAuthTokenHTTPResponse>(`${this.env.appUrls.authenticate}/oauth/token`, request)
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

  purgeAuth() {
    this._storageService.deleteData(DBkeys.USER_AUTH);
    this._storageService.deleteData(DBkeys.JWT_TOKEN);
    this._storageService.deleteData(DBkeys.CLIENT_KEY);
    this._storageService.deleteData(DBkeys.CONTACT_RECORD);
    this._storageService.deleteData(DBkeys.SELECTED_CUSTOMER);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.currentSelectedCustomer.next(null);
    sessionStorage.clear()
  }

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  public get selectedSiteValue(): UserSite {
    return this.currentSelectedCustomer.value;
  }

  login(credentials): Observable<UserAuth> {
    let url = `${this.env.appUrls.authenticate}/login`;

    this.purgeAuth();

    return this.http.post(url, credentials).pipe<UserAuth>(
      tap((response: any) => {
        const user: UserAuth = {
          email: response.email,
          hasMultipleSites: response.hasMultipleSites,
          clientKey: response.clientKey,
          isAutoProvisioned: this.isAutoProvisioned(response.authToken),
          authToken: response.authToken,
          isServiceAccount: this.isServiceAccount(response.authToken)
        };
        this.setAuth(user);
        return this.currentUserValue;
      })
    );
  }

  logout(): void {
    this.purgeAuth();
  }

  async loginToClientSite(payload: MultiClientLoginHttpRequest): Promise<string> {
    const user = await this.http.post<UserAuth>(`${this.env.appUrls.authenticate}/login/client`, payload).toPromise();

    this._storageService.deleteData(DBkeys.JWT_TOKEN);
    this._storageService.savePermanentData(user.authToken, DBkeys.JWT_TOKEN);

    return user.authToken;
  }

  requestPasswordReset(request: RequestPasswordResetRequest): Observable<any> {
    let url = `${this.env.appUrls.authenticate}/password/forgot`;

    return this.http.post(url, request).pipe(
      tap(result => {
        return result;
      })
    );
  }

  resetPassword(credentials): Observable<boolean> {
    let url = `${this.env.appUrls.authenticate}/password/reset`;

    return this.http.post(url, credentials).pipe<boolean>(
      tap((response: any) => {
        return response;
      })
    );
  }

  validateTokenAndGetPasswordRequirements(resetToken: string): Observable<Password> {
    let url = `${this.env.appUrls.authenticate}/password/requirements/${resetToken}`;

    return this.http.get(url).pipe<Password>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getClientSitesByUser(userEmail: string): Observable<ClientSitesByUser> {
    const url = `${this.env.appUrls.authenticate}/user/clientsites/${userEmail}`;

    return this.http.get(url).pipe<ClientSitesByUser>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getRecentSitesForUser(userEmail: string): Observable<RecentUserSites> {
    const url = `${this.env.appUrls.authenticate}/user/recentsites/${userEmail}`;

    return this.http.get(url).pipe<RecentUserSites>(
      tap((response: any) => {
        return response;
      })
    );
  }

  getContactRecords(userEmail: string, clientKey: string): Promise<GetContactRecordHTTPResponse> {
    return this.http.get<GetContactRecordHTTPResponse>(`${this.env.appUrls.authenticate}/user/contactrecords/${userEmail}/${clientKey}`).toPromise();
  }

  setSelectedSite(selectedCustomer: UserSite) {
    this._storageService.saveSyncedSessionData(
      selectedCustomer,
      DBkeys.SELECTED_CUSTOMER
    );
    this.currentSelectedCustomer.next(selectedCustomer);
  }

  getAuthToken(): string {
    return this._storageService.getDataObject(DBkeys.JWT_TOKEN);
  }

  getDecodedAuthToken(token: string): any {
    return jwt_decode(token);
  }

  isUserAuthenticated(): boolean {
    let token = this.getAuthToken();
    if (token) {
      let isExpired = this.isAuthTokenExpired(token);
      
      if (isExpired) {
        this.purgeAuth();
        return false;
      }

      return true;
    }

    return false;
  }

  getAuthTokenExpireDate(token: string): Date {
    var decoded = jwt_decode<JwtPayload>(token);

    if (!decoded.exp) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  isAuthTokenExpired(token?: string) {
    if (!token) return true;

    const expireDate = this.getAuthTokenExpireDate(token);
    if (!expireDate) return false;

    return expireDate.valueOf() < new Date().valueOf();
  }

  isAutoProvisioned(token: string): boolean {
    var decoded = this.getDecodedAuthToken(token);
    if (decoded.isAutoProvisioned.toLowerCase() === "true") {
      return true;
    }

    return false;
  }

  isServiceAccount(token: string): boolean {
    var decoded = this.getDecodedAuthToken(token);
    if (decoded.isServiceAccount.toLowerCase() === "true") {
      return true;
    }

    return false;
  }

  getServiceAccountApiKeyInfo(email: string): Observable<ServiceAccountApiKeyInfo> {
    let url = `${this.env.appUrls.authenticate}/getServiceAccountApiKeyInfo/{email}`;

    // return this.http.get(url).pipe<ServiceAccountApiKeyInfo>(
    // );

    const testData : ServiceAccountApiKeyInfo = {
      userEmail: email,
      dateGenerated: new Date('10/12/2023'),
      expirationDate: new Date('12/12/2023'),
    }

    return of(testData);
  }

  generateApiKey(email: string): Observable<boolean> {
    let url = `${this.env.appUrls.authenticate}/generateApiKey/{email}`;

    // return this.http.post(url)(
    // );

    return of(true);
  }

  getServiceAccountSites(email: string): Observable<any> {
    let url = `${this.env.appUrls.authenticate}/getServiceAccountSites/{email}`;

    // return this.http.post(url)(
    // );

    const testData : any = [ 
      {clientKey: 'BOEING', isActive: true},
      {clientKey: 'PIEDMONTHEALTHCARE', isActive: false},
      {clientKey: 'AMERICANEXPRESS', isActive: true},
      {clientKey: 'FIFTHTHIRD', isActive: false},
      {clientKey: 'CITI', isActive: true},
      {clientKey: 'WHIRLPOOL', isActive: true}
    ];

    return of(testData);
  }

  getServiceAccountChangeHistory(email: string): Observable<any> {
    let url = `${this.env.appUrls.authenticate}/getServiceAccountChangeHistory/{email}`;

    // return this.http.get(url)(
    // );

    const testData : any = [
          {lastModified: 'Date1', modifiedBy: 'Li Liu 1', description: 'Create Account 1', beforeChange: 'Old value', afterChange: 'New value'},
          {lastModified: 'Date1', modifiedBy: 'Li Liu 2', description: 'Create Account 2', beforeChange: 'Old value', afterChange: 'New value'},
          {lastModified: 'Date1', modifiedBy: 'Li Liu 3', description: 'Create Account 3', beforeChange: 'Old value', afterChange: 'New value'},
          {lastModified: 'Date1', modifiedBy: 'Li Liu 4', description: 'Create Account 4', beforeChange: 'Old value', afterChange: 'New value'},
          {lastModified: 'Date1', modifiedBy: 'Li Liu 4', description: 'Create Account 5', beforeChange: 'Old value', afterChange: 'New value'}];

    return of(testData);
  }

}