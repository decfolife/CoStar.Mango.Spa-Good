import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Observable } from 'rxjs';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class RemindersService extends EndpointService {
  objectActionsUrl: string = UtilitiesService.getBaseApiUrl(Api.objectActions);

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getRemindersList(oID: number, oTID: number): Observable<any> {
    let url = `${this.objectActionsUrl}Reminders/GetReminders`;
    const request = {
      objectid: oID,
      objectTypeId: oTID,
    };
    return this.callHttpGet(url, 'GetReminders', request);
  }

  getReminderEvents(oID: number, oTID: number): Observable<any> {
    let url = `${this.objectActionsUrl}Reminders/GetReminderEvents`;
    const request = {
      objectid: oID,
      objectTypeId: oTID,
    };
    return this.callHttpGet(url, 'GetReminderEvents', request);
  }

  getReminderById(ticklerId: number): Observable<any> {
    let url = `${this.objectActionsUrl}Reminders/GetReminderById`;
    const request = {
      ticklerId: ticklerId,
    };
    return this.callHttpGet(url, 'GetReminderById', request);
  }

  getRecipientsContactsList(oID: number, oTID: number): Observable<any> {
    let url = `${this.objectActionsUrl}Reminders/GetAvailableContacts`;
    const request = {
      objectid: oID,
      objectTypeId: oTID,
    };
    return this.callHttpGet(url, 'GetAvailableContacts', request);
  }

  saveReminder(request: any): Observable<any> {
    let url = `${this.objectActionsUrl}Reminders/SaveReminder`;
    return this.callHttpPost(url, 'SaveReminder', request);
  }

  deleteReminder(RID: number, oID: number, oTID: number): Observable<any> {
    return this.callHttpDelete(
      `${this.objectActionsUrl}Reminders/DeleteReminder/${RID}/${oID}/${oTID}`,
      'DeleteReminder'
    );
  }

  getObjectName(OID: number, OTID: number) {
    return this.callHttpGet(
      `${this.objectActionsUrl}objecthistory/getObjectName?OID=${OID}&OTID=${OTID}`,
      'GetObjectName'
    );
  }
}
