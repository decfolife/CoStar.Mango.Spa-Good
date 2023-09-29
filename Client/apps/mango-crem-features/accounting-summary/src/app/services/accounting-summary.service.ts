import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { map, catchError } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { Observable, of } from 'rxjs';

type HttpParamsObj = HttpParams | { [param: string]: any };
type HeadersObj = {
  headers: HttpHeaders,
  params?: HttpParamsObj
};

@Injectable({
  providedIn: 'root'
})
export class AccountingSummaryService {
  private apiUrl: string;
  private leaseAbstractId: number

  private httpOptions: HeadersObj = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'SUTTERHEALTH',
      CAEnabled: 'false'
    })
  };

  constructor(private http: HttpClient) {
    this.apiUrl = environment.appUrls.accountingSummary;
  }

  setLeaseAbstractId(leaseId:number){
    this.leaseAbstractId=leaseId;
  }

  getLeaseAbstractId(): number{
    return this.leaseAbstractId;
  }

  getLeaseInfo() {
    return this.callHttpGet(`${this.apiUrl}getleaseinformation/lease/${this.leaseAbstractId}`, 'getLeaseInformation');
  }
  
  getAccountingEvents() {
    return this.callHttpGet(`${this.apiUrl}getschedules/lease/${this.leaseAbstractId}`, 'getSchedules');
  }

  getUserInformation(){
    return this.callHttpGet(`${this.apiUrl}getuserinformation/lease/${this.leaseAbstractId}`, 'getUserInformation');
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
}
