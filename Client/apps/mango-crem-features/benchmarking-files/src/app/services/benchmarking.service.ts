import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { UtilitiesService } from '@mango/core-shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';
import { LogFileDownloadRequest } from '@benchmarking-files/model/log-file-download-request';
import { DownloadBenchmarkingFileRequest } from '@benchmarking-files/model/download-benchmarking-file-request';

@Injectable({
  providedIn: 'root',
})
export class BenchmarkingService extends EndpointService {
  benchmarkingServiceUrl: string =
    UtilitiesService.getBaseApiUrl(Api.fileManager) + 'BenchmarkingFiles/'; //'https://localhost:5801/api/benchmarkingfiles/';
  dashboardsUrl: string = UtilitiesService.getBaseApiUrl(Api.dashboards);

  public dateFormat: string = '';

  constructor(
    protected override http: HttpClient,
    @Optional() facade: MangoAppFacade
  ) {
    super(http, facade);
  }

  lookupLease(objectId: number): any {
    const url = `${this.benchmarkingServiceUrl}lookuplease/${objectId}`;
    return this.callHttpGetWithErrorMessage(url, 'LookupLease');
  }

  logFileDownload(
    logFileDownloadRequest: LogFileDownloadRequest
  ): Observable<any> {
    const url = `${this.benchmarkingServiceUrl}logFileDownload`;
    return this.callHttpPostWithErrorMessage(
      url,
      'LogFileDownload',
      logFileDownloadRequest
    );
  }

  downloadBenchmarkingFile(data: DownloadBenchmarkingFileRequest) {
    const params = new HttpParams({ fromObject: data as any });

    const url = `${this.benchmarkingServiceUrl}DownloadBenchmarkingFile`;
    return this.http.get(url, {
      params,
      responseType: 'blob',
      observe: 'response',
    });
  }

  getObjectTypeAndName(
    objectId: number,
    objectTypeId: number
  ): Observable<any> {
    let url = `${this.benchmarkingServiceUrl}ObjectTypeAndName/${objectId}/${objectTypeId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetUserPreferences');
  }
}
