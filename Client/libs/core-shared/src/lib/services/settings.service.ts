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

    clientKey$: BehaviorSubject<string> = new BehaviorSubject<string>(null)
    contactRecord$: BehaviorSubject<ContactRecord> = new BehaviorSubject<ContactRecord>(null)
    
    constructor(
        private _http: HttpClient
    ) { }

    getClientSsoSettings(clientKey: string): Observable<ClientSSOSettings> {
        const url = `${environment.appUrls.identity}/settings/clientsso/${clientKey}`;

        return this._http.get(url).pipe<ClientSSOSettings>(
            tap((response: any) => {
                return response;
            })
        );
    }

    getClientSettings(): Observable<ClientSettings> {
        let url: string;
        const { headers } = this.httpOptions
        if (environment.isRestful) {
            return this.clientKey$.pipe(switchMap(clientKey => this._http.get<ClientSettings>(`${environment.appUrls.identity}/settings/${clientKey}`)));
        }
        else {
            url = `${environment.appUrls.identity}/GetSettings`;
        }

        return this._http.get<any>(url, { headers })
            .pipe(
                map(response => response.d.Result.Data)
            );
    }

    saveClientSettings(clientSettings: ClientSettings): Observable<CremHTTPResult> {
        const { headers } = this.httpOptions
        return this._http.post<CremHttpResponse>(`${environment.appUrls.identity}/UpdateSettings`,
            { settings: clientSettings },
            { headers })
            .pipe(map(response => (response.d || {}).Result))
    }

    protected toObject(value: any): any {
        let res = value.d.hasOwnProperty('Result') ? value.d.Result : value.d;
        let data = JSON.parse(res.Data);

        return data
    }
}
