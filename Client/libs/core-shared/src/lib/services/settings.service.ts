import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api, ApiResult, ClientSettings, ClientSSOSettings, CremHttpResponse, CremHTTPResult } from '@mango/data-models/lib-data-models';
import { UtilitiesService } from '@mango/core-shared';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  identityUrl: string = UtilitiesService.getCABackendBaseApiUrl()
  authenticationUrl: string = UtilitiesService.getBaseApiUrl(Api.authentication)

  constructor(
    private _http: HttpClient
  ) { }

  getClientSsoSettings(clientKey: string): Observable<ClientSSOSettings> {
    return this._http.get<ClientSSOSettings>(`${this.identityUrl}settings/clientsso/${clientKey}`);
  }

  getClientSettings(): Observable<ClientSettings> {
    // This function to be refactored when Client Settings page is added to MangoSPA
    //return this.clientKey$.pipe(switchMap(clientKey => this._http.get<ClientSettings>(`${environment.appUrls.identity}/settings/${clientKey}`)));
    return of()
  }

  saveClientSettings(clientSettings: ClientSettings): Observable<CremHTTPResult> {
    const { headers } = this.httpOptions
    return this._http.post<CremHttpResponse>(`${this.authenticationUrl}UpdateSettings`,
      { settings: clientSettings },
      { headers })
      .pipe(map(response => (response.d || {}).Result))
  }
}
