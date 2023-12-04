import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { EndpointService } from '@mango/core-shared';
import { Observable } from 'rxjs';
import { environment } from 'apps/mango/src/environments/environment.local';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class GroupMaintenanceService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getGroupList(): Observable<any> {
    const url = `${environment.appUrls.groupMaintenance}GroupMaintenance/GetGroupList`;
    return this.callHttpGet(url, 'GetGroupList')
  }

  getHasAdminLinkRights(): Observable<any> {
    const url = `${environment.appUrls.groupMaintenance}GroupMaintenance/GetHasAdminLinkRights`;
    return this.callHttpGet(url, 'GetHasAdminLinkRights') 
  }
}