import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class SharedService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getReportUserList(): Observable<any> {
    const url = `${environment.appUrls.reports}Reports/GetReportUserList`;
    return this.callHttpGet(url, 'getReportUserList')
  }

  getReportGroupList(): Observable<any> {
    const url = `${environment.appUrls.reports}Reports/GetReportGroupList`;
    return this.callHttpGet(url, 'getReportGroupList')
  }

  getPortfolioList(): Observable<any> {
    const url = `${environment.appUrls.reports}Reports/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolioList')
  }

  getUserPreferences(): Observable<any> {
    const url = `${environment.appUrls.reports}Reports/GetUserPreferences`;
    return this.callHttpGet(url, 'getUserPreferences')
  }
}

