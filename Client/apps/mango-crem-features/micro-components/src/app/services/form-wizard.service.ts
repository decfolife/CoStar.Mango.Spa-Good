import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class FormWizardService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  public getRenderSelect(lookupId, requestTypeId, lookupSql = "0", p1 = "0", p2 = "0", p3 = "0"): Observable<ApiResponse> {
    let url = `${environment.appUrls.formWizard}RenderSelects/RenderSelects`;
    let param = {
      LookupID: lookupId,
      RequestTypeID: requestTypeId,
      p1: p1,
      p2: p2,
      p3: p3,
      LookupSQL: lookupSql
    }
    
    return this.callHttpGet(url, 'RenderSelects', param);
  }

  public getUserPreferences(): Observable<any> {
    let url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'GetUserPreferences')
  }

  public getRedirectorLink(OTID: number, OTTID: number): Observable<any> {
    let url = `${environment.appUrls.formWizard}Dashboards/GetRedirectorLink`;  
    return this.callHttpGet(url, 'GetRedirectorLink', { OTID: OTID, OTTID: OTTID})
  }

  public getBuildingLeaseDefaultInfo(OID: number, OTID: number): Observable<any> {
    let url = `${environment.appUrls.formWizard}FormWizards/GetBuildingLeaseDefaultInfo`;
    return this.callHttpGet(url, 'GetBuildingLeaseDefaultInfo', { ObjectID: OID, ObjectTypeID: OTID })
  }

  public addTransaction(transaction: any): Observable<any> {
    let url = `${environment.appUrls.formWizard}FormWizards/AddTransaction`;
    let param  = transaction;

    return this.callHttpPost(url, 'AddTransaction', param)
  }

  public addBuilding(building: any): Observable<any> {
    let url = `${environment.appUrls.formWizard}FormWizards/AddBuilding`;
    let param = building;

    return this.callHttpPost(url, 'AddBuilding', param)
  }

  public getManagers(teamId: number): Observable<any> {
    let url = `${environment.appUrls.formWizard}FormWizards/managers`;
    let param = {
      TeamID: teamId
    }
  
    return this.callHttpGet(url, 'GetManagers', param)
  }
  
  public getClientPreferenceByField(Field: string): Observable<any> {
    let url = `${environment.appUrls.formWizard}FormWizards/GetClientPreferenceByField`;
    return this.callHttpGet(url, 'FormWizards/GetClientPreferenceByField', { Pref: Field })
  }

  public getProjectWizardClientPreferences(): Observable<any> {
    let url = `${environment.appUrls.formWizard}FormWizards/GetProjectWizardClientPreferences`;
    return this.callHttpGet(url, 'FormWizards/GetProjectWizardClientPreferences')
  }
}