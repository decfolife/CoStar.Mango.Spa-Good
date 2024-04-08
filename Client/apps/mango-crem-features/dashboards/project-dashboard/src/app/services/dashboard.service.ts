import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { TaskApprovalDto } from '../models/task-approval';
import { UserSelectedFilters } from '../models';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { AssignTasks, Team, TeamMemUpdate, UpdateContact, UpdateProjectTeamMember, UpdateTemporaryUser } from '@mango/data-models/lib-data-models';
import notify from 'devextreme/ui/notify';
import { DxoHeaderFilterComponent } from 'devextreme-angular/ui/nested/header-filter';

@Injectable()
export class DashboardService  extends EndpointService{
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getDashboardByIdWithChildrenQuery(dashboardId: number): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/${dashboardId}`;
    return this.callHttpGet(url, 'getDashboardByIdWithChildrenQuery')
  }

  getCardDataByElementType(dashboardId: number, elementTypeName: string, keyDate: string, selectedFilters: string): Observable<any> {
    const url = `${environment.appUrls.dashboards}ProjectsCards/GetCardDataByElementType`;
    return this.callHttpPost(url, 'getCardDataByElementType', { dashboardId, elementTypeName, keyDate, selectedFilters })
  }

  getAllProjectFilters(elementTypeNames: any[]): Observable<any> {
    const url = `${environment.appUrls.dashboards}ProjectsFilters/GetAllProjectFilters`;
    return this.callHttpPost(url, 'GetAllProjectFilters',  elementTypeNames )
  }

  getFilterDataByElementType(dashboardId: number, elementTypeName: string): Observable<any> {
    const url = `${environment.appUrls.dashboards}ProjectsFilters/GetProjectsFilterDataByElementType/${dashboardId}/${elementTypeName}`;
    return this.callHttpGet(url, 'getFilterDataByElementType')
  }

  getUserFilters(dashboardId): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetUserFilters/${dashboardId}`;
    return this.callHttpGet(url, 'getUserFilters')
  }

  postCacheSettings(dashboardId: number): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/ClearDashboardCache`;
    return this.callHttpPost(url, 'updateCacheSettings', dashboardId)
  }
  
  saveUserFilters(userSelectedFilters: UserSelectedFilters): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/SaveUserFilters`;
    return this.callHttpPost(url, 'saveUserFilters',  userSelectedFilters)
  }

  postUserSettings(dashboardUserSettings: any[]): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/SaveUserSettings`;
    return this.callHttpPost(url, 'updateUserSettings',  dashboardUserSettings)
  }
  
  // This method calls dashboard api to approve or reject task. If service is not restful, it will call
  // CREM app web method which will call Mango Dashboard service api
  // We are not calling Mango service at this time so we don't need to check for isRestful.
  UpdateTaskApproval(taskData: TaskApprovalDto): Observable<any> {
    const btnAction = taskData.isApproval ? "Approve" : "Reject"; 
    const url = `${environment.appUrls.taskApproval}?OID=${taskData.transactionId}&ShowPage=1&PMMID=${taskData.taskId}&cmdSubmit=${btnAction}`;

    return this.http.post(url, taskData, { observe: 'response', responseType: 'text'})
      .pipe(map(data => {
        return data;
      }), catchError(this.handleTaskApprovalError('UpdateTaskApproval')));
  }

  getCardFilters(): Observable<any> {
    const url = `${environment.appUrls.dashboards}ProjectsFilters/GetProjectsCardFilters`;
    return this.callHttpGet(url, 'getCardFilters')
  }

  // This method will call CREM app web method to request file
  getActivityFeedFile(urlPath: string): Observable<any> {
    const url = `${environment.appUrls.dashboards}GetActivityFeedCardFile`;
    return this.callHttpPostByteArray(url, 'getActivityFeedFile', { urlPath });
  }

  DoesUserHaveProjectAddRights(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/DoesUserHaveProjectAddRights`;
    return this.callHttpGet(url, 'DoesUserHaveProjectAddRights')
  }

  GetUserPreferences(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'GetUserPreferences')
  }
  
  getObjectTypeNames(objectTypeIds: number[]): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/GetObjectTypeNames`;
    return this.callHttpPost(url, 'getObjectTypeNames',  { objectTypeIds })
  }

  getRecentActivities(durationInDays: number): Observable<any> {
    const url = `${environment.appUrls.dashboards}Projects/GetRecentActivities`;
    return this.callHttpPost(url, 'getRecentActivities', durationInDays);
  }
  
  getTeams(): Observable<any>  {
    const url = `${environment.appUrls.projects}getteams`;
    return this.callHttpGet(url,'getteams')
  }

  deleteTeamMembers(memberIds: number[]): Observable<any>  {
    const url = `${environment.appUrls.projects}deleteteammembers`;
    return this.callHttpPost(url,'deleteteammembers', memberIds)
  }

  getMembersList(search: string, all:boolean, pageSize: number, pageNumber: number) : Observable<any> {
    const url = `${environment.appUrls.projects}getmemberslist`;
    return this.callHttpPost(url, 'getmemberslist', { search, all, pageSize, pageNumber })
  }

  getmemberinfo(): Observable<any> {
    const url = `${environment.appUrls.projects}getmemberinfo`;
    return this.callHttpGet(url, 'getmemberinfo')
  }

  updateTeamMember(memberupdate: TeamMemUpdate): Observable<any> {
    const url = `${environment.appUrls.projects}updateteammember`;
    return this.callHttpPost(url, 'updateteammember', memberupdate);
  }

  addTeam(team:Team): Observable<any> {
    const url = `${environment.appUrls.projects}addteam`;
    return this.callHttpPost(url, 'addteam', team);
  }

  importTeam(projectID: number, teamID: number, projectManagerSharedValue: boolean): Observable<any> {
    const url = `${environment.appUrls.projects}importteam`;
    return this.callHttpPost(url, 'importteam', { projectID, teamID, projectManagerSharedValue });
  }

  getModuleRights(objectType: number, securityType: number) {
    const url = `${environment.appUrls.projects}getmodulerights`;
    return this.callHttpPost(url, 'getmodulerights', { objectType, securityType })
  }

  deleteTeams(teamIds: number[]) {
    const url = `${environment.appUrls.projects}deleteteams`;
    return this.callHttpPost(url, 'deleteteams',  teamIds)
  }

  getProjectTeams(projectId): Observable<any> {
    const url = `${environment.appUrls.projects}getprojectteams/${projectId}`;
    return this.callHttpGet(url, 'getProjectTeams')
  }

  getClientPreference(clientPreferenceSetting): Observable<any> {
    const url = `${environment.appUrls.projects}GetClientPreference/${clientPreferenceSetting}`;
    return this.callHttpGet(url, 'getClientPreference')
  }

  getProjectTaskList(projectId): Observable<any> {
    const url = `${environment.appUrls.tasks}getprojecttasklist/${projectId}`;
    return this.callHttpGet(url, 'projectId')
  }

  getOutstandingRolesforTask(projectId): Observable<any> {
    const url = `${environment.appUrls.tasks}getoutstandingrolesfortask/${projectId}`;
    return this.callHttpGet(url, 'projectId')
  }

  getProjectContactLevel(projectId): Observable<any> {
    const url = `${environment.appUrls.projects}getprojectcontactlevel/${projectId}`;
    return this.callHttpGet(url, 'projectId')
  }

  saveTeamAsTemplate(teamTemplateName: string, projectId: number) {
    const url = `${environment.appUrls.projects}createteamtemplate`;
    return this.callHttpPostApprovalError(url, 'createteamtemplate',  { teamTemplateName, projectId })
  }

  saveProjectManager(projectId: number, contactId: number) {
    const url = `${environment.appUrls.projects}saveprojectmanager`;
    return this.callHttpPost(url,  'saveprojectmanager', { projectId, contactId });
  }

  removeTeamMembers(projMemberData ) {
    const url = `${environment.appUrls.projects}removeteammembers`;
    return this.callHttpPost(url,  'removeteammembers',  projMemberData );
  }

  addContactsToTasksByRole(projectID: number) {
    const url = `${environment.appUrls.tasks}addcontactstotasksbyrole`;
    return this.callHttpPost(url, 'addcontactstotasksbyrole', { projectID } );
  }

  updateProjectTeamMember(projectTeamMember: UpdateProjectTeamMember) {
    const url = `${environment.appUrls.projects}updateprojectteammember`;
    return this.callHttpPost(url, 'updateprojectteammember', projectTeamMember);
  }

  addTemporaryUser(temporaryUser: UpdateTemporaryUser) {
    const url = `${environment.appUrls.projects}addtemporaryuser`;
    return this.callHttpPost(url, 'addtemporaryuser', temporaryUser);
  }

  updateProjectContact(projectContact: UpdateContact) {
    const url = `${environment.appUrls.projects}updateprojectcontact`;
    return this.callHttpPost(url, 'updateprojectcontact', projectContact);
  }

  assignTasks(memberTasks: AssignTasks) {
    const url = `${environment.appUrls.tasks}assigntasks`;
    return this.callHttpPost(url, 'assigntasks', memberTasks);
  }

  displayContactSystemAdminMessage(){
    this.errorNotify("An error occurred please contact the system administrator.");
  }
  
  getComposeEmailInfo(projectId): Observable<any> {
    const url = `${environment.appUrls.projects}getcomposeemailinfo/${projectId}`;
    return this.callHttpGet(url, 'projectId');
  }

  errorNotify(message: string) {
    this.notifyPopup(message, "error")
  }

  successNotify(message: string) {
    this.notifyPopup(message, "success")
  }

  private notifyPopup(message: string, messageType: string){
    notify({
      message: message,
      type: messageType,
      displayTime: 5000,
      position: { at: 'right bottom', my: 'right bottom', offset: '-16 -16' },
      maxWidth: "400px",
      closeOnClick: true,
    });
  }
}

