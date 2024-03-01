import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()

export class InAppDisclosureService extends EndpointService{

  public dateFormat: string;
  private httpOptionsWithParams;
  private httpOptions;

  constructor(
     protected http: HttpClient, 
     @Optional() facade: MangoAppFacade
  ) {
    super(http, facade);
    this.getHttpHeaders().subscribe((result) => {
      this.httpOptions = result;
      this.httpOptionsWithParams = result;
    })
  }

  public getSegments(criteriaSetID?, includeArchived: boolean = false): Observable<any> {
    let param;
   
    if (criteriaSetID) {
      param = { CriteriaSetID: criteriaSetID, includeArchived: includeArchived };
    } else {
      param = { includeArchived: includeArchived };
    }

    const url = `${environment.appUrls.reports}ReportsSegments/Segments`;
    return this.callHttpGet(url, 'getSegments',  param);
  }

  public getIADCardData(dashboardID, segmentID, reportingYear, reportingCurrency) {
    let param = { dashboardID: dashboardID, segmentID : segmentID, reportingYear: reportingYear, reportingCurrencyISO: reportingCurrency };
    const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardData`;
    return this.callHttpGet(url, 'getIADCardData',  param)  
  }

  public getIADCardConfigs(dashboardId: number): Observable<any> {
    const param = { dashboardId: dashboardId };
    const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardConfigs`;
    return this.callHttpGet(url, 'getIADCardData',  param);
  }

  public getAccountingCriteriaSets() {
    const url = `${environment.appUrls.accountingService}/criteriasets`
    return this.callHttpGet(url, 'getAccountingCriteriaSets');
  }

  public exportIADData(segmentID: number, reportingYear: number, reportingCurrencyISO: string, dashboardID: number) {
    const param = { segmentID: segmentID, reportingYear: reportingYear, reportingCurrencyISO: reportingCurrencyISO, dashboardID: dashboardID };
    const url = `${environment.appUrls.inAppDisclosure}IAD/Export`;
    let headers: HttpHeaders;
    this.getHttpHeaders().subscribe((result) => {

      headers = new HttpHeaders({
        'Content-Type': 'application/octet-stream',
              'Accept': 'application/octet-stream',
              'UserId': result.headers.get('userid'),
              'ClientKey': result.headers.get('clientkey'),
              UseQueryOptimization: '1'
      })
    }
    );

    return this.callHttpGet(url, 'Export',  param, headers, 'blob');
  }

  getUserPreferences(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'getGetUserPreferences')
  }

  public getCurrencyDecimalPrecision(currencyISO) {
    let param = { currencyISO: currencyISO }
    const url = `${environment.appUrls.inAppDisclosure}IAD/CurrencyPrecision`

    return this.callHttpGet(url, 'getCurrencyPrecision', param)
  }

  public SetDefault(segmentID: number, criteriaSetID: number) {
    const body = { SegmentID: segmentID, CriteriaSetID: criteriaSetID }
    const url = `${environment.appUrls.reports}ReportsSegments/SetDefault`

    return this.callHttpPost(url, 'setDefault', body)
  }

  public callHttpGet(url: string, functionName: string, httpOptionsParams?: any, httpOptionsHeaders?: any, responseType?: any): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpOptions => {
        if(httpOptionsParams) {
          httpOptions.params = httpOptionsParams;
        }
        if(httpOptionsHeaders) {
          httpOptions.headers = httpOptionsHeaders;
        }
        if (responseType) {
          httpOptions.responseType = responseType;
          httpOptions.observe = 'response';
        }
        return this.http.get(url, httpOptions)
      }),
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    )
  }

  public toObject(value: any): any {
    if(value instanceof HttpResponse) {
        let apiSuccess = value.status === 200;
        let cemsg = apiSuccess ? null : value.statusText
        return {
            success: apiSuccess,
            data: { headers: value.headers, body: value.body },
            clientErrorMessage: cemsg
        }
    } else {
        return super.toObject(value);
      }
    }

}