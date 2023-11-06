import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ClientSettings, ClientSSOSettings, ContactRecord, CremHttpResponse, CremHTTPResult } from '@mango/data-models/lib-data-models';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';

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

  constructor(
    private _http: HttpClient
  ) { }

  getClientSsoSettings(clientKey: string): Observable<ClientSSOSettings> {
    return this._http.get<ClientSSOSettings>(`${environment.appUrls.identity}/settings/clientsso/${clientKey}`)
  }

  getClientSettings(): Observable<ClientSettings> {
    // This function to be refactored when Client Settings page is added to MangoSPA


    //return this.clientKey$.pipe(switchMap(clientKey => this._http.get<ClientSettings>(`${environment.appUrls.identity}/settings/${clientKey}`)));
    return of()
  }

  saveClientSettings(clientSettings: ClientSettings): Observable<CremHTTPResult> {
    const { headers } = this.httpOptions
    return this._http.post<CremHttpResponse>(`${environment.appUrls.identity}/UpdateSettings`,
      { settings: clientSettings },
      { headers })
      .pipe(map(response => (response.d || {}).Result))
  }
}
