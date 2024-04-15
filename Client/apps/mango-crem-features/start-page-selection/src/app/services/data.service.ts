import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { UserSelectedPageData } from '../models/userSelectedPageData';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';


@Injectable()
export class StartPageService extends EndpointService {
  dashboardsUrl: string = UtilitiesService.getBaseApiUrl(Api.dashboards)

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getDefaultStartPagesList(): Observable<any> {
    const url = `${this.dashboardsUrl}Portfolio/GetDefaultStartPageLinks`;
    return this.callHttpGet(url, 'GetDefaultStartPageLinks')
  }

  saveDefaultStartPage(selection: UserSelectedPageData): Observable<any> {
    const url = `${this.dashboardsUrl}Portfolio/SaveDefaultStartPage`;
    return this.callHttpPost(url, 'SaveDefaultStartPage', selection);
  }
}

