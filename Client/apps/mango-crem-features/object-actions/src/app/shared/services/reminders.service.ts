import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Observable } from 'rxjs';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';


@Injectable()
export class RemindersService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getRemindersList(OID: number, OTID: number): Observable<any> {
    let url = `${environment.appUrls.objectActions}Reminders/GetReminders`;
    const request = {
      ObjectId: OID,
      ObjectTypeId: OTID
    };
    return this.callHttpGet(url, 'GetReminders', request);
  }

  getReminderEvents(OID: number, OTID: number): Observable<any> {
    let url = `${environment.appUrls.objectActions}Reminders/GetReminderEvents`;
    const request = {
      objectid: OID,
      objectTypeId: OTID
    };
    return this.callHttpGet(url, 'GetReminderEvents', request);
  }

  getReminderById(ticklerId: number): Observable<any> {
    let url = `${environment.appUrls.objectActions}Reminders/GetReminderById`;
    const request = {
      ticklerId: ticklerId
    };
    return this.callHttpGet(url, 'GetReminderById', request);
  }

  getRecipientsContactsList(OID: number, OTID: number): Observable<any> {
    let url = `${environment.appUrls.objectActions}Reminders/GetAvailableContacts`;
    const request = {
      objectid: OID,
      objectTypeId: OTID
    };
    return this.callHttpGet(url, 'GetAvailableContacts', request);
  }

  SaveReminder(request: any): Observable<any> {
    let url = 'https://localhost:60100/api/Reminders/SaveReminder';
    return this.callHttpPost(url, 'SaveReminder', request);
  }

  deleteReminder(RID: number): Observable<any>{
    return this.callHttpDelete(`${environment.appUrls.objectActions}Reminders/DeleteReminder/${RID}`, 'DeleteReminder');
  }
}