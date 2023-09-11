import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@mangoSpa/src/environments/environment.local';
import { ApiResponse, IntervalsData, SettingsData } from '../models';
import { FinancialReporting } from '../models/financial-report.modal';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { parseISO, format } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HttpParamsObj = HttpParams | { [param: string]: any };
type HeadersObj = {
  headers: HttpHeaders,
  params?: HttpParamsObj
};

@Injectable({ providedIn: 'root' })
export class FinancialReportingSettingsService {
  private apiUrl: string;

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
    this.apiUrl = environment.appUrls.reports;

    if (environment.isRestful) {
      this.apiUrl += 'reports/';
    }
  }

  enableFinancialReporting() {
    let apiUrl = '/v06/Mango/FinancialReporting/FinancialReportingSettings.aspx/';

    if (environment.isRestful) {
      apiUrl = this.apiUrl;
    }

    return this.callHttpPost(`${apiUrl}EnableFinancialReporting`, 'enableFinancialReporting', JSON.stringify({}));
  }

  getUserRights() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}GetUserModuleRights`, 'getUserRights');
    }

    return this.callHttpGet(`${this.apiUrl}GetFRSUserModuleRights`, 'getUserRights');
  }

  getFinancialReportingSettings() {
    return this.callHttpGet(`${this.apiUrl}GetReportingIntervalSettings`, 'getFinancialReportingSettings');
  }

  saveFinancialReportingSettings(request: IntervalsData & SettingsData) {
    const url = `${this.apiUrl}SaveReportingIntervalSettings`;

    if (environment.isRestful) {
      return this.callHttpPost(
        url, 'saveReportingIntervalSettings', JSON.stringify(request)
      );
    }

    return this.callHttpPost(
      url, 'saveReportingIntervalSettings', `{ request: ${JSON.stringify(request)} }`
    );
  }

  getCurrencyList() {
    return this.callHttpGet(`${this.apiUrl}GetCurrencyList`, 'getCurrencyList');
  }

  refreshFinancialData() {
    return this.callHttpGet(`${this.apiUrl}RefreshFinancialData`, 'refreshFinancialData');
  }

  migrationImpactReport() {
    return this.callHttpGet(`${this.apiUrl}GetFinancialReportingImpactReport`, 'getFinancialReportingImpactReport');
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
      data: Object.prototype.hasOwnProperty.call(data, 'data') ? data.data : data
    }
  }


  generateExcel(data: any[], filename: string, dateFormat: string) {
    // Sort By LastRun column 
    data.sort((a, b) => new Date(b.lastRun).getTime() - new Date(a.lastRun).getTime());

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Impact Report Data');

    // Add headers
    const headers = FinancialReporting;
    worksheet.addRow(headers);

    // Add data rows
    if(data.length !=0 ){
    const tempHeader = Object.keys(data[0]);
    data.forEach((rowData) => {
      const row = [];
      for (const header of tempHeader) {
        const cellValue = rowData[header];

        // Format date cells
        if ((header === 'lastRun' || header === 'migratedDate') && cellValue) {
          const parsedDate = parseISO(cellValue);
          row.push(format(parsedDate, `${dateFormat} HH:mm`));
        } else {
          row.push(cellValue);
        }
      }
      worksheet.addRow(row);
    });
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, filename);
    });
  }

}
