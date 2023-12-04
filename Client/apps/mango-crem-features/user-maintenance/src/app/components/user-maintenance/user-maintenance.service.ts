import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class UserMaintenanceService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getUserList(filter: string): Observable<any> {
    const request: { UserListFilter: string} = { UserListFilter: filter }
    const url = `${environment.appUrls.userMaintenance}UserMaintenance/GetUserList`;
    return this.callHttpPost(url, 'GetUserList', request)
  }

  deleteUser(contactID: number): Observable<any> {
    const url = `${environment.appUrls.userMaintenance}UserMaintenance/DeleteUser/` + contactID.toString();
    return this.callHttpPost(url, 'DeleteUser', {})
  }

  getHasAdminLinkRights(): Observable<any> {
    const url = `${environment.appUrls.userMaintenance}UserMaintenance/GetHasAdminLinkRights`;
    return this.callHttpGet(url, 'GetHasAdminLinkRights')
  }

  getUserFormId(): Observable<any> {
    const url = `${environment.appUrls.userMaintenance}UserMaintenance/GetUserFormId`;
    return this.callHttpGet(url, 'GetUserFormId')
  }
}
