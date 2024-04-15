import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class SharedService extends EndpointService {
  reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports)
  
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getReportUserList(): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetReportUserList`;
    return this.callHttpGet(url, 'getReportUserList')
  }

  getReportGroupList(): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetReportGroupList`;
    return this.callHttpGet(url, 'getReportGroupList')
  }

  getPortfolioList(): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolioList')
  }

  getUserPreferences(): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetUserPreferences`;
    return this.callHttpGet(url, 'getUserPreferences')
  }
}

