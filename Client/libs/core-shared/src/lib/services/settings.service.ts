import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Api,
  ApiResult,
  ClientSettings,
  ClientSSOSettings,
  CremHttpResponse,
  CremHTTPResult,
  AdminFlags,
  Client,
  RedirectorLink,
  PendoClientInfo,
} from '@mango/data-models/lib-data-models';
import { UtilitiesService } from '@mango/core-shared';
import { RedirectorMapping } from 'libs/data-models/lib-data-models/src/lib/models/redirector-links.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  identityUrl: string = UtilitiesService.getCABackendBaseApiUrl();
  authenticationUrl: string = UtilitiesService.getBaseApiUrl(Api.authentication);
  settingsUrl: string = UtilitiesService.getBaseApiUrl(Api.settings);

  constructor(private _http: HttpClient) {}

  getClientSsoSettings(clientKey: string): Observable<ClientSSOSettings> {
    return this._http
      .get<ApiResult<ClientSSOSettings>>(
        `${this.identityUrl}/settings/clientsso/${clientKey}`
      )
      .pipe(map((x) => x.data));
  }

  getClientSettings(clientKey: string): Observable<ClientSettings> {
    // This function to be refactored when Client Settings page is added to MangoSPA
    // return this._http.get<ApiResult<ClientSettings>>(`${this.identityUrl}/settings/${clientKey}`)
    //   .pipe(
    //     map(x => x.data)
    //   );
    return of();
  }

  getClientPendoSettings(): Observable<PendoClientInfo> {
    return this._http.get<PendoClientInfo>(
      `${this.settingsUrl}settings/pendouser`
    );
  }

  saveClientSettings(
    clientSettings: ClientSettings
  ): Observable<CremHTTPResult> {
    const { headers } = this.httpOptions;
    return this._http
      .post<CremHttpResponse>(
        `${this.authenticationUrl}UpdateSettings`,
        { settings: clientSettings },
        { headers }
      )
      .pipe(map((response) => (response.d || {}).Result));
  }

  getAdminFlags(): Observable<AdminFlags> {
    return this._http.get<AdminFlags>(
      `${this.settingsUrl}settings/client`
    );
  }

  getRedirectorLinks(): Observable<RedirectorLink[]> {
    return this._http.get<RedirectorLink[]>(
      `${this.settingsUrl}settings/redirectorLinks`
    );
  }

  getRedirectorMappings(): Observable<RedirectorMapping[]> {
    return this._http.get<RedirectorMapping[]>(
      `${this.settingsUrl}settings/redirectorMappings`
    );
  }

  getClientSettingsForUser(): Observable<Client> {
    return this._http.get<Client>(
      `${this.settingsUrl}settings/user`
    );
  }
}
