import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';



@Injectable()

export class ReportsService extends EndpointService{

  public dateFormat: string;
  
  constructor(
     protected http: HttpClient
    ) {
    super(http);
  }

  favoriteReport(reportBody: any): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsPage/FavoriteReport`;
      return this.callHttpPost(url, 'favoriteReport', reportBody)
    }

    const url = `${environment.appUrls.reports}FavoriteReport`;
    return this.callHttpPost(url, 'favoriteReport', {reportBody});
  }
  
  unFavoriteReport(contactReportId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsPage/DeleteFavoriteReport/${contactReportId}`;
      return this.callHttpPost(url, 'deleteFavoriteReport', null)
    }

    const url = `${environment.appUrls.reports}DeleteFavoriteReport`;
    return this.callHttpPost(url, 'deleteFavoriteReport', {contactReportId});
  }

  getReportsList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsPage/GetUserReports`;
      return this.callHttpGet(url, 'getUserReports')
    }

    const url = `${environment.appUrls.reports}GetUserReports`;
    return this.callHttpPost(url, 'getUserReports', null);
  }

  getUserModuleRights(objectTypeIds: any[]): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsPage/GetUserModuleRights`;
      return this.callHttpPost(url, 'getUserModuleRights',  { objectTypeIds })
    }

    const url = environment.appUrls.reports + 'GetUserModuleRights';
    return this.callHttpPost(url, 'getUserModuleRights', { objectTypeIds })
  }

  getAllReportTags(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsPage/GetAllReportTags`;
      return this.callHttpGet(url, 'getAllReportTags')
    }

    const url = `${environment.appUrls.reports}GetAllReportTags`;
    return this.callHttpPost(url, 'getAllReportTags', null);
  }

  getUpdateRunCount(reportType : string, reportId : number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsPage/GetUpdateRunCount`;
      return this.callHttpPost(url, 'GetUpdateRunCount',  { reportType, reportId })
    }

    const url = environment.appUrls.reports + 'GetUpdateRunCount';
    return this.callHttpPost(url, 'getUpdateRunCount', { reportType, reportId })
  }

  deleteReport(reportId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsPage/DeleteReport/${reportId}`;
      return this.callHttpPost(url, 'deleteReport', null)
    }

    const url = environment.appUrls.reports + 'DeleteReport';
    return this.callHttpPost(url, 'deleteReport', { reportId })
  }

  public getPortfolios() {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/Portfolios`;
      return this.callHttpGet(url, 'getPortfolios')
    }

    const url = `${environment.appUrls.reports}getPortfolios`;
    return this.callHttpPost(url, 'getPortfolios', null);
  }

  public getNonDependentCriteria(criteriaSetId: number, portfolioId: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/NonDependentCriteria`;
      return this.callHttpGet(url, 'getNonDependentCriteria',  { CriteriaSetID: criteriaSetId, PortfolioID: portfolioId })
    }

    const url = environment.appUrls.reports + 'getNonDependentCriteria';
    return this.callHttpPost(url, 'getNonDependentCriteria', { criteriaSetID: criteriaSetId, portfolioId })
  }

  public getCriteria(criteriaSetId: number, portfolioId: number, request, isReportCriteria: boolean = true) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/DependentCriteria`;
      return this.callHttpPost(url, 'getDependentCriteria', {  CriteriaSetID: criteriaSetId, PortfolioID: portfolioId, DefinedCriteria: request, IsReportCriteria: isReportCriteria })
    }

    const url = environment.appUrls.reports + 'getDependentCriteria';
    return this.callHttpPost(url, 'getDependentCriteria', { request: { criteriaSetId, PortfolioID: portfolioId, DefinedCriteria: request, IsReportCriteria: isReportCriteria } })
  }

  public getReport(reportId: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/Report`;
      return this.callHttpGet(url, 'getReport',  { ReportID: reportId})
    }

    const url = environment.appUrls.reports + 'getReport';
    return this.callHttpPost(url, 'getReport', { reportId })
  }
  
  public insertSelectedCriteria(request) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/InsertSelectedCriteria`;
      return this.callHttpPost(url, 'insertSelectedCriteria', { SelectedCriteria: request })
    }

    const url = environment.appUrls.reports + 'InsertSelectedCriteria';
    return this.callHttpPost(url, 'insertSelectedCriteria', { reportBody: {SelectedCriteria: request }})
  }

  public runBatchReport(reportGUID: string, reportId: number) {
    reportGUID = "{" + reportGUID + "}";
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/RunBatchReport`;
      return this.callHttpPost(url, 'runBatchReport', { ReportID: reportId, ReportGUID: reportGUID })
    }

    const url = environment.appUrls.reports + 'RunBatchReport';
    return this.callHttpPost(url, 'runBatchReport', { request: { reportId, reportGUID }})
  }

  public insertReportIssue(ReportString) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/InsertReportIssue`;
      return this.callHttpPost(url, 'insertReportIssue', { ReportString })
    }

    const url = environment.appUrls.reports + 'InsertReportIssue';
    return this.callHttpPost(url, 'insertReportIssue', { reportBody: { ReportString }})
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

  public getSegmentsFields(segmentId) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/SegmentsFields`;
      return this.callHttpGet(url, 'getSegmentsFields',  { SegmentID: segmentId })
    }

    const url = environment.appUrls.reports + 'GetSegmentsFields';
    return this.callHttpPost(url, 'getSegmentsFields', { segmentID: segmentId } )
  }

  public getSegmentsRights(objectId, securityTypeId) {
    //3 is add
    //2 is view
    //4 is delete
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/SegmentsObjectRights`;
      return this.callHttpGet(url, 'getSegmentsObjectrights',  {ObjectID: objectId, SecurityTypeID: securityTypeId})
    }

    const url = environment.appUrls.reports + 'GetSegmentsObjectRights';
    return this.callHttpPost(url, 'getSegmentsObjectrights', {objectId, securityTypeId})
  }
  
  public GetCriteriaSetList(reportCriteria: number = 2) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/CriteriaSetList?reportCriteria=` + reportCriteria;
      return this.callHttpGet(url, 'getCriteriaSetList',  { })
    }
    const url = environment.appUrls.reports + 'GetCriteriaSetList';
    return this.callHttpPost(url, 'getCriteriaSetList', { reportCriteria })
  }

  public getRCSSFeatureFlag() {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/RCSSFeatureFlag`;
      return this.callHttpGet(url, 'getRCSSFeatureFlag',  {})
    }
    const url = environment.appUrls.reports + 'RCSSFeatureFlag';
    return this.callHttpPost(url, 'getRCSSFeatureFlag', {})
  }

  public saveSegments(request) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/SaveSegment`;
      return this.callHttpPost(url, 'saveSegment', request)
    }

    const url = environment.appUrls.reports + 'SaveSegment';
    return this.callHttpPost(url, 'saveSegment', { request })
  }

  public archiveSegment(request) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/ArchiveSegment`;
      return this.callHttpPost(url, 'ArchiveSegment', request)
    }

    const url = environment.appUrls.reports + 'ArchiveSegment';
    return this.callHttpPost(url, 'ArchiveSegment', { request })
  }

  public unarchiveSegment(request) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}ReportsSegments/UnarchiveSegment`;
      return this.callHttpPost(url, 'UnarchiveSegment', request)
    }

    const url = environment.appUrls.reports + 'UnarchiveSegment';
    return this.callHttpPost(url, 'UnarchiveSegment', { request })
  }

  public getUserPreferences(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
      return this.callHttpGet(url, 'GetUserPreferences',  {})
    }
    const url = environment.appUrls.dashboards + 'GetUserPreferences';
    return this.callHttpPost(url, 'GetUserPreferences', {})
  }


  private callHttpGet(url: string, functionName: string, httpOptionsParams?: any): Observable<any> {
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

  private callHttpPost(url: string, functionName: string, postBody: any): Observable<any> {
    return this.http.post(url, postBody, this.httpOptions)
    .pipe(
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    );
  }

  public setUserDateFormat(isDatesEU : boolean) {
    this.dateFormat = 'MM/dd/yyyy';
    if(isDatesEU)
    {
      this.dateFormat = 'dd.MM.yyyy';
    };
  };
}
