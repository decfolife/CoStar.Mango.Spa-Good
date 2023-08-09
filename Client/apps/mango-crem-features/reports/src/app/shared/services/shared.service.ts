import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';

@Injectable()
export class SharedService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getReportUserList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetReportUserList`;
      return this.callHttpGet(url, 'getReportUserList')
    }
    const url = `${environment.appUrls.reports}GetReportUserList`;
    return this.callHttpPost(url, 'getReportUserList', {})
  }

  getReportGroupList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetReportGroupList`;
      return this.callHttpGet(url, 'getReportGroupList')
    }
    const url = `${environment.appUrls.reports}GetReportGroupList`;
    return this.callHttpPost(url, 'getReportGroupList', {})
  }

  getPortfolioList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetPortfolios`;
      return this.callHttpGet(url, 'getPortfolioList')
    }
    const url = `${environment.appUrls.reports}GetPortfolioList`;
    return this.callHttpPost(url, 'getPortfolioList', {})
  }

  getUserPreferences(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetUserPreferences`;
      return this.callHttpGet(url, 'getUserPreferences')
    }
    const url = `${environment.appUrls.reports}GetUserPreferences`;
    return this.callHttpPost(url, 'getUserPreferences', {})
  }

}

