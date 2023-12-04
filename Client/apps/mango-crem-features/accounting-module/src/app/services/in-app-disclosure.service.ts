import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

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

  public getSegments(criteriaSetID?, includeArchived: boolean = false) {
    let param;
   
    if (criteriaSetID) {
      param = { CriteriaSetID: criteriaSetID, includeArchived: includeArchived };
    } else {
      param = { includeArchived: includeArchived };
    }

    const url = `${environment.appUrls.reports}ReportsSegments/Segments`;
    return this.callHttpGet(url, 'getSegments',  param)
  }

  public getIADCardData(segmentID, reportingYear) {
    let param = { segmentID : segmentID, reportingYear: reportingYear };
    const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardData`;
    return this.callHttpGet(url, 'getIADCardData',  param)  
  }

  public getIADCardConfigs(dashboardId) {
    let param = { dashboardId: dashboardId };
    const url = `${environment.appUrls.inAppDisclosure}IAD/IADCardConfigs`;
    return this.callHttpGet(url, 'getIADCardData',  param)
  }

  public getAccountingCriteriaSets() {
    const url = `${environment.appUrls.accountingService}/criteriasets`
    return this.callHttpGet(url, 'getAccountingCriteriaSets');
  }

  public exportIADData(segmentID, reportingYear) {
    let param = { segmentID: segmentID, reportingYear: reportingYear };
    const url = `${environment.appUrls.inAppDisclosure}IAD/Export`;

    return this.callHttpGet(url, 'Export',  param)
  }
}
