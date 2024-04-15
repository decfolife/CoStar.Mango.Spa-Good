import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { ApiResponse, DataFieldRequest, DataSetRequest } from '../models';
import { Api } from '@mango/data-models/lib-data-models';
import { UtilitiesService } from '@mango/core-shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HttpParamsObj = HttpParams | { [param: string]: any };
type HeadersObj = {
  headers: HttpHeaders,
  params?: HttpParamsObj
};

@Injectable({ providedIn: 'root' })
export class DataSetDictionaryService {
  private apiUrl: string;
  private reportsUrl: string;

  private httpOptions: HeadersObj = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'BLANK',
      CAEnabled: 'false'
    })
  };

  constructor(private http: HttpClient) {
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.dataSetDictionary)
    this.reportsUrl = UtilitiesService.getBaseApiUrl(Api.reports)

    if (environment.isRestful) {
      this.apiUrl += 'reports/';
      this.reportsUrl += 'reports/';
    }
  }

  getReportingIntervalSettings() {
    const url = `${this.reportsUrl}GetReportingIntervalSettings`;

    return this.callHttpGet(url, 'getReportingIntervalSettings');
  }

  getUserModuleRights() {
    const url = `${this.apiUrl}GetUserModuleRights`;

    return this.callHttpGet(url, 'getUserModuleRights');
  }

  getDataSets() {
    const url = `${this.apiUrl}GetDataSetList`;

    return this.callHttpGet(url, 'getDataSets');
  }

  getDataFieldsByDataSet(dataSetId: number) {
    const url = `${this.apiUrl}GetDataFieldsByDataSet`;

    if (environment.isRestful) {
      return this.callHttpGet(url + `/${dataSetId}`, 'getDataFieldsByDataSet');
    }

    return this.callHttpGet(url, 'getDataFieldsByDataSet', { dataSetId: dataSetId });
  }

  getDataSetsByDataField(dataFieldId: number) {
    const url = `${this.apiUrl}GetDataSetsByDataField`;

    if (environment.isRestful) {
      return this.callHttpGet(url + `/${dataFieldId}`, 'getDataSetsByDataField');
    }

    return this.callHttpGet(url, 'getDataSetsByDataField', { dataFieldId: dataFieldId });
  }

  getDataTypeFormatList(dataTypeId: number) {
    const url = `${this.apiUrl}GetDataTypeFormatList`;

    if (environment.isRestful) {
      return this.callHttpGet(url + `/${dataTypeId}`, 'getDataTypeFormatList');
    }

    return this.callHttpGet(url, 'getDataTypeFormatList', { dataTypeId: dataTypeId });
  }

  updateDataSet(request: DataSetRequest) {
    const url = `${this.apiUrl}UpdateDataSet`;

    if (environment.isRestful) {
      return this.callHttpPost(url, 'updateDataSet', JSON.stringify(request))
    }

    return this.callHttpPost(
      url, 'updateDataSet', `{ request: ${JSON.stringify(request)} }`
    );
  }

  updateDataField(request: DataFieldRequest) {
    const url = `${this.apiUrl}UpdateDataField`;

    if (environment.isRestful) {
      return this.callHttpPost(url, 'updateDataField', JSON.stringify(request))
    }

    return this.callHttpPost(
      url, 'updateDataField', `{ request: ${JSON.stringify(request)} }`
    );
  }

  protected callHttpGet(url: string, logName: string, httpOptionsParams?: HttpParamsObj) {
    if (httpOptionsParams) {
      this.httpOptions.params = httpOptionsParams;
    }

    return this.http.get(url, this.httpOptions).pipe(
      map(x => this.toApiResponse(x)),
      catchError(this.handleError(logName))
    );
  }

  protected callHttpPost(url: string, logName: string, postBody: string) {
    return this.http.post(url, postBody, this.httpOptions).pipe(
      map(x => this.toApiResponse(x)),
      catchError(this.handleError(logName))
    );
  }

  private handleError(logName: string = 'Operation not provided') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<ApiResponse> => {
      console.error(logName, error);

      return of({
        succeeded: false,
        message: error.statusText,
        data: []
      });
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toApiResponse(value: any): ApiResponse {
    const val = Object.prototype.hasOwnProperty.call(value, 'd')
      ? value.d
      : value;

    const res = Object.prototype.hasOwnProperty.call(val, 'Result')
      ? JSON.parse(val.Result)
      : val;

    const data = Object.prototype.hasOwnProperty.call(res, 'data')
      ? (res.data instanceof String)
        ? JSON.parse(res.data)
        : res.data
      : res;

    return {
      succeeded: res.succeeded ?? true,
      message: res.message ?? '',
      data: Object.prototype.hasOwnProperty.call(data, 'data')
        ? data.data
        : data
    }
  }
}
