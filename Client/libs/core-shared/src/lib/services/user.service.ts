import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ContactRecord,
  Environment,
  GetContactRecordHTTPResponse,
  Api,
  ApiResult} from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { UtilitiesService } from '@mango/core-shared';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authenticationUrl: string = UtilitiesService.getBaseApiUrl(Api.authentication)
  userMaintenanceUrl: string = UtilitiesService.getBaseApiUrl(Api.userMaintenance)

  constructor(
    private http: HttpClient,
    private env: Environment,
  ) { }

  getContactRecords(userEmail: string, clientKey: string): Observable<GetContactRecordHTTPResponse> {
    return this.http.get<ApiResult<GetContactRecordHTTPResponse>>(`${this.authenticationUrl}user/contactrecords/${userEmail}/${clientKey}`, { withCredentials: true })
      .pipe(map(x => x.data as GetContactRecordHTTPResponse))
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
}