import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactRecord, Api, CurrencyMapping } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { UtilitiesService } from '@mango/core-shared';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userMaintenanceUrl: string = UtilitiesService.getBaseApiUrl(Api.userMaintenance)

  currencyMappingTable$: Observable<CurrencyMapping[]>;

  constructor(private http: HttpClient) { 
    this.currencyMappingTable$ = this.getCurrencyMappings();
  }

  getContactRecords(email: string, contactId: number, clientKey: string): Observable<ContactRecord[]> {
    let headers = new HttpHeaders({
      'UserId': contactId,
      'ClientKey': clientKey
    })

    return this.http.get<ContactRecord[]>(`${this.userMaintenanceUrl}usermaintenance/getusers/${email}`, { headers: headers })
  }

  getContactRecord(contactId: number, clientKey: string): Observable<ContactRecord> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'UserId': contactId,
      'ClientKey': clientKey
    })

    return this.http.get<ContactRecord>(`${this.userMaintenanceUrl}usermaintenance/getuser/${contactId}`, { headers: headers })
  }

  hasMultipleContactRecords(email: string, contactId: number, clientKey: string): Observable<boolean> {
    let headers = new HttpHeaders({
      'UserId': contactId,
      'ClientKey': clientKey
    })

    return this.http.get<boolean>(`${this.userMaintenanceUrl}usermaintenance/hasmultipleusers/${email}`, { headers: headers })
  }
  
  hasSecurityProfiles(): Observable<boolean> {
    return this.http.get<boolean>(`${this.userMaintenanceUrl}usermaintenance/hassecurityprofiles`)
  }

  getCurrencyMappings() {
    return this.http.get<CurrencyMapping[]>(`${this.userMaintenanceUrl}usermaintenance/getcurrencymappings`)
  }
}