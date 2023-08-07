import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class UserMaintenanceService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getUserList(filter: string): Observable<any> {
    const request: { UserListFilter: string} = { UserListFilter: filter }
    if (environment.isRestful) {
      const url = `${environment.appUrls.userMaintenance}UserMaintenance/GetUserList`;
      return this.callHttpPost(url, 'GetUserList', request)
    }
    const url = `${environment.appUrls.userMaintenance}GetUserList`;
    return this.callHttpPost(url, 'GetUserList', { request })
  }

  deleteUser(contactID: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.userMaintenance}UserMaintenance/DeleteUser/` + contactID.toString();
      return this.callHttpPost(url, 'DeleteUser', {})
    }
    const url = `${environment.appUrls.userMaintenance}DeleteUser`;
    return this.callHttpPost(url, 'DeleteUser', {contactID})
  }

  getHasAdminLinkRights(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.userMaintenance}UserMaintenance/GetHasAdminLinkRights`;
      return this.callHttpGet(url, 'GetHasAdminLinkRights')
    }
    const url = `${environment.appUrls.userMaintenance}GetHasAdminLinkRights`;
    return this.callHttpGet(url, 'GetHasAdminLinkRights')
  }

  getUserFormId(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.userMaintenance}UserMaintenance/GetUserFormId`;
      return this.callHttpGet(url, 'GetUserFormId')
    }
    const url = `${environment.appUrls.userMaintenance}GetUserFormId`;
    return this.callHttpGet(url, 'GetUserFormId')
  }
}
