import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class GroupUserBlockedAdminLinksService extends EndpointService {
  reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports);

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getBlockedAdminLinkData(): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetBlockedAdminLinkData`;
    return this.callHttpGet(url, 'getBlockedAdminLinkData');
  }
}
