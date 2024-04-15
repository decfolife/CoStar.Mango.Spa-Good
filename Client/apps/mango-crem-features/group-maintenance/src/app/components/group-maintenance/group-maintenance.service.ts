import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Observable } from 'rxjs';
import { environment } from 'apps/mango/src/environments/environment.local';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class GroupMaintenanceService extends EndpointService {
  groupMaintenance: string = UtilitiesService.getBaseApiUrl(Api.groupMaintenance)

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getGroupList(): Observable<any> {
    const url = `${this.groupMaintenance}GroupMaintenance/GetGroupList`;
    return this.callHttpGet(url, 'GetGroupList')
  }

  getHasAdminLinkRights(): Observable<any> {
    const url = `${this.groupMaintenance}GroupMaintenance/GetHasAdminLinkRights`;
    return this.callHttpGet(url, 'GetHasAdminLinkRights') 
  }
}