import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { TaskApprovalDto } from '../models/task-approval';
import { UserSelectedFilters } from '../models';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class DashboardService  extends EndpointService{
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getDashboardByIdWithChildrenQuery(dashboardId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/${dashboardId}`;
      return this.callHttpGet(url, 'getDashboardByIdWithChildrenQuery')
    }

    const url = `${environment.appUrls.dashboards}GetDashboardByIdWithChildrenQuery`;
    return this.callHttpPost(url, 'getDashboardByIdWithChildrenQuery', { dashboardId })
  }

  getCardDataByElementType(dashboardId: number, elementTypeName: string, keyDate: string, selectedFilters: string): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}ProjectsCards/GetCardDataByElementType`;
      return this.callHttpPost(url, 'getCardDataByElementType', { dashboardId, elementTypeName, keyDate, selectedFilters })
    }
    const url = environment.appUrls.dashboards + 'GetCardDataByElementType';
    return this.callHttpPost(url, 'getCardDataByElementType', { dashboardId, elementTypeName, keyDate, selectedFilters })
  }

  getAllProjectFilters(elementTypeNames: any[]): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}ProjectsFilters/GetAllProjectFilters`;
      return this.callHttpPost(url, 'GetAllProjectFilters',  elementTypeNames )
    }

    const url = environment.appUrls.dashboards + 'GetAllProjectFilters';
    return this.callHttpPost(url, 'getAllProjectFilters', { elementTypeNames })
  }

  getFilterDataByElementType(dashboardId: number, elementTypeName: string): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}ProjectsFilters/GetProjectsFilterDataByElementType/${dashboardId}/${elementTypeName}`;
      return this.callHttpGet(url, 'getFilterDataByElementType')
    }

    const url = environment.appUrls.dashboards + 'GetProjectsFilterDataByElementType';
    return this.callHttpPost(url, 'getFilterDataByElementType', { dashboardId, elementTypeName })
  }

  getUserFilters(dashboardId): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetUserFilters/${dashboardId}`;
      return this.callHttpGet(url, 'getUserFilters')
    }

    const url = `${environment.appUrls.dashboards}GetUserFilters`;
    return this.callHttpPost(url, 'getUserFilters', { dashboardId })
  }

  postCacheSettings(dashboardId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/ClearDashboardCache`;
      return this.callHttpPost(url, 'updateCacheSettings', dashboardId)
    }

    const url = environment.appUrls.dashboards + 'ClearDashboardCache';
    return this.callHttpPost(url, 'updateCacheSettings', {dashboardId})
  }
  
  saveUserFilters(userSelectedFilters: UserSelectedFilters): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/SaveUserFilters`;
      return this.callHttpPost(url, 'saveUserFilters',  userSelectedFilters)
    }

    const url = environment.appUrls.dashboards + 'SaveUserFilters';
    return this.callHttpPost(url, 'saveUserFilters', { userSelectedFilters })
  }

  postUserSettings(dashboardUserSettings: any[]): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/SaveUserSettings`;
      return this.callHttpPost(url, 'updateUserSettings',  dashboardUserSettings)
    }

    const url = environment.appUrls.dashboards + 'SaveUserSettings';
    return this.callHttpPost(url, 'updateUserSettings', { dashboardUserSettings })
  }
  
  // This method calls dashboard api to approve or reject task. If service is not restful, it will call
  // CREM app web method which will call Mango Dashboard service api
  // We are not calling Mango service at this time so we don't need to check for isRestful.
  UpdateTaskApproval(taskData: TaskApprovalDto): Observable<any> {
    if (environment.isRestful) {
      // Currently we are not supporting REST API for this feature.
    }
    else {
    const btnAction = taskData.isApproval ? "Approve" : "Reject"; 
    const url = environment.appUrls.taskApproval + `?OID=${taskData.transactionId}` + `&ShowPage=1&PMMID=${taskData.taskId}` + `&cmdSubmit=${btnAction}`;

    return this.http.post(url, taskData, { observe: 'response', responseType: 'text'})
     .pipe(map(data => {
      return data;
    }), catchError(this.handleTaskApprovalError('UpdateTaskApproval')));
  }
  }

  getCardFilters(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}ProjectsFilters/GetProjectsCardFilters`;
      return this.callHttpGet(url, 'getCardFilters')
    }

    const url = `${environment.appUrls.dashboards}GetProjectsCardFilters`;
    return this.callHttpPost(url, 'getCardFilters', null)
  }

  // This method will call CREM app web method to request file
  getActivityFeedFile(urlPath: string): Observable<any> {
    const url = `${environment.appUrls.dashboards}GetActivityFeedCardFile`;
    return this.callHttpPostByteArray(url, 'getActivityFeedFile', { urlPath });
  }

  DoesUserHaveProjectAddRights(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/DoesUserHaveProjectAddRights`;
      return this.callHttpGet(url, 'DoesUserHaveProjectAddRights')
    }

    const url = `${environment.appUrls.dashboards}DoesUserHaveProjectAddRights`;
    return this.callHttpPost(url, 'DoesUserHaveProjectAddRights', null)
  }

  GetUserPreferences(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
      return this.callHttpGet(url, 'GetUserPreferences')
    }
    const url = `${environment.appUrls.dashboards}GetUserPreferences`;
    return this.callHttpPost(url, 'GetUserPreferences', null)
  }
  
  getObjectTypeNames(objectTypeIds: number[]): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Dashboards/GetObjectTypeNames`;
      return this.callHttpPost(url, 'getObjectTypeNames',  { objectTypeIds })
    }

    const url = environment.appUrls.dashboards + 'GetObjectTypeNames';
    return this.callHttpPost(url, 'getObjectTypeNames', { objectTypeIds })
  }

  getRecentActivities(durationInDays: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Projects/GetRecentActivities`;
      return this.callHttpPost(url, 'getRecentActivities', durationInDays);
    }

    const url = environment.appUrls.dashboards + 'GetRecentActivities';
    return this.callHttpPost(url, 'getRecentActivities', {durationInDays});
  }
  
}

