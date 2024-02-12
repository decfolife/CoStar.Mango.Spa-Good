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

  getRemindersList(oID: number, oTID: number): Observable<any> {
    let url = `${environment.appUrls.objectActions}Reminders/GetReminders`;
    const request = {
      objectid: oID,
      objectTypeId: oTID
    };
    return this.callHttpGet(url, 'GetReminders', request);
  }

  getReminderEvents(oID: number, oTID: number): Observable<any> {
    let url = `${environment.appUrls.objectActions}Reminders/GetReminderEvents`;
    const request = {
      objectid: oID,
      objectTypeId: oTID
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

  getRecipientsContactsList(oID: number, oTID: number): Observable<any> {
    let url = `${environment.appUrls.objectActions}Reminders/GetAvailableContacts`;
    const request = {
      objectid: oID,
      objectTypeId: oTID
    };
    return this.callHttpGet(url, 'GetAvailableContacts', request);
  }

  saveReminder(request: any): Observable<any> {
    console.log(request)
    let url = `${environment.appUrls.objectActions}Reminders/SaveReminder`;
    return this.callHttpPost(url, 'SaveReminder', request);
  }
}