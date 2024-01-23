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
}