import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class GroupUserBlockedAdminLinksService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getBlockedAdminLinkData(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetBlockedAdminLinkData`;
      return this.callHttpGet(url, 'getBlockedAdminLinkData')
    }
    const url = `${environment.appUrls.reports}GetBlockedAdminLinkData`;
    return this.callHttpPost(url, 'getBlockedAdminLinkData', {})
  }
}

