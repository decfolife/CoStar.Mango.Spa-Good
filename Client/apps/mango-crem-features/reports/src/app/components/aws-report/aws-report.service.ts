import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { ReportRequest } from '../../shared/models/report-request';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class AWSReportService extends EndpointService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAWSReportData(reportName: string): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetAWSReportData/` + reportName;
      return this.callHttpGet(url, 'GetAWSReportData');
    }
    const request: ReportRequest ={ ReportName: reportName };
    const url = `${environment.appUrls.reports}GetAWSReportData`;
    console.log(url);
    console.log(request);
    return this.callHttpPost(url, 'GetAWSReportData', { request });
  }
}