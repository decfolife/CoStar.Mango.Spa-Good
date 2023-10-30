import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../../../../../libs/core-shared/src/lib/services/endpoint.service';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';



@Injectable()

export class InAppDisclosureService extends EndpointService{

  public dateFormat: string;
  private httpOptionsWithParams;
  private httpOptions;

  constructor(
     protected http: HttpClient, @Optional() facade: MangoAppFacade
    ) {
    super(http, facade);
    this.getHttpHeaders().subscribe((result) => {
      this.httpOptions = result;
      this.httpOptionsWithParams = result;
    })
  }

  public getSegments(criteriaSetID?, includeArchived: boolean = false) {
    let param;
    if (environment.isRestful) {
      if (criteriaSetID) {
        param = { CriteriaSetID: criteriaSetID, includeArchived: includeArchived };
      } else {
        param = { includeArchived: includeArchived };
      }
      const url = `${environment.appUrls.reports}ReportsSegments/Segments`;
      return this.callHttpGet(url, 'getSegments',  param)
    }
    if (criteriaSetID) {
      param = {criteriaSetID, includeArchived};
    } else {
      param = {criteriaSetID: 0, includeArchived: includeArchived};
    }
    const url = environment.appUrls.reports + 'GetSegments';
    return this.callHttpPost(url, 'getSegments', param)
  }

  public getIADCardData(segmentID, reportingYear) {
    let param;
    if (environment.isRestful) {
      param = { segmentID : segmentID, reportingYear: reportingYear };
      const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardData`;
      return this.callHttpGet(url, 'getIADCardData',  param)
    }

  }

  public getIADCardConfigs(dashboardId) {
    let param;
    if (environment.isRestful) {
      param = { dashboardId: dashboardId };
      const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardConfigs`;
      return this.callHttpGet(url, 'getIADCardData',  param)
    }
  }

  public getAccountingCriteriaSets() {
    const url = `${environment.appUrls.accountingService}/criteriasets`
    return this.callHttpGet(url, 'getAccountingCriteriaSets');
  }

  public exportIADData(segmentID, reportingYear) {
    let param;
    if (environment.isRestful) {
      param = { segmentID: segmentID, reportingYear: reportingYear };
      const url = `${environment.appUrls.inAppDisclosure}IAD/Export`;
      return this.callHttpGet(url, 'Export',  param)
    }
  }


  public callHttpGet(url: string, functionName: string, httpOptionsParams?: any): Observable<any> {
    if (httpOptionsParams) {
      this.httpOptionsWithParams.params = httpOptionsParams
      return this.http.get(url, this.httpOptionsWithParams)
      .pipe(
        map(x => this.toObject(x) as any),
        catchError(this.handleError(functionName))
      );
    } else {
      return this.http.get(url, this.httpOptions)
    .pipe(
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    );
    }
    
  }

  public callHttpPost(url: string, functionName: string, postBody: any): Observable<any> {
    return this.http.post(url, postBody, this.httpOptions)
    .pipe(
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    );
  }
}
