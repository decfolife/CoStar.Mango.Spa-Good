import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from '../../shared/services/endpoint.service';
import { Observable } from 'rxjs';
import { environment } from 'apps/mango/src/environments/environment.local';

@Injectable()
export class GroupMaintenanceService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getGroupList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.groupMaintenance}GroupMaintenance/GetGroupList`;
      return this.callHttpGet(url, 'GetGroupList')
    }
    const url = `${environment.appUrls.groupMaintenance}GetGroupList`;
    return this.callHttpGet(url, 'GetGroupList')
  }

  getHasAdminLinkRights(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.groupMaintenance}GroupMaintenance/GetHasAdminLinkRights`;
      return this.callHttpGet(url, 'GetHasAdminLinkRights')
    }
    const url = `${environment.appUrls.groupMaintenance}GetHasAdminLinkRights`;
    return this.callHttpGet(url, 'GetHasAdminLinkRights')
  }

}