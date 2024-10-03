import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { GetViewDropdownDataRequest, HideListViewRequest, ListView, SetDefaultListViewRequest } from '@list-pages/components/listpage/shared/models';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Api, AssignTasks, Team, TeamMemUpdate, UpdateContact, UpdateProjectTeamMember, UpdateTemporaryUser } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import notify from 'devextreme/ui/notify';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserSelectedFilters } from '../models';
import { TaskApprovalDto } from '../models/task-approval';


@Injectable()
export class DashboardService  extends EndpointService {
  dashboards: string = UtilitiesService.getBaseApiUrl(Api.dashboards)
  projects: string = UtilitiesService.getBaseApiUrl(Api.projects)
  taskApproval: string = UtilitiesService.getBaseApiUrl(Api.taskApproval)
  listpages: string = UtilitiesService.getBaseApiUrl(Api.listpages)
  
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getDashboardByIdWithChildrenQuery(dashboardId: number): Observable<any> {
    const url = `${this.dashboards}Dashboards/${dashboardId}`;
    return this.callHttpGet(url, 'getDashboardByIdWithChildrenQuery')
  }

  getCardDataByElementType(dashboardId: number, elementTypeName: string, keyDate: string, selectedFilters: string): Observable<any> {
    const url = `${this.dashboards}ProjectsCards/GetCardDataByElementType`;
    return this.callHttpPost(url, 'getCardDataByElementType', { dashboardId, elementTypeName, keyDate, selectedFilters })
  }

  getAllProjectFilters(elementTypeNames: any[]): Observable<any> {
    const url = `${this.dashboards}ProjectsFilters/GetAllProjectFilters`;
    return this.callHttpPost(url, 'GetAllProjectFilters',  elementTypeNames )
  }

  getFilterDataByElementType(dashboardId: number, elementTypeName: string): Observable<any> {
    const url = `${this.dashboards}ProjectsFilters/GetProjectsFilterDataByElementType/${dashboardId}/${elementTypeName}`;
    return this.callHttpGet(url, 'getFilterDataByElementType')
  }

  getUserFilters(dashboardId): Observable<any> {
    const url = `${this.dashboards}Dashboards/GetUserFilters/${dashboardId}`;
    return this.callHttpGet(url, 'getUserFilters')
  }

  postCacheSettings(dashboardId: number): Observable<any> {
    const url = `${this.dashboards}Dashboards/ClearDashboardCache`;
    return this.callHttpPost(url, 'postCacheSettings', dashboardId)
  }
  
  saveUserFilters(userSelectedFilters: UserSelectedFilters): Observable<any> {
    const url = `${this.dashboards}Dashboards/SaveUserFilters`;
    return this.callHttpPost(url, 'saveUserFilters',  userSelectedFilters)
  }

  postUserSettings(dashboardUserSettings: any[]): Observable<any> {
    const url = `${this.dashboards}Dashboards/SaveUserSettings`;
    return this.callHttpPost(url, 'postUserSettings',  dashboardUserSettings)
  }

  // This method calls dashboard api to approve or reject task. If service is not restful, it will call
  // CREM app web method which will call Mango Dashboard service api
  // We are not calling Mango service at this time so we don't need to check for isRestful.
  UpdateTaskApproval(taskData: TaskApprovalDto): Observable<any> {
    const btnAction = taskData.isApproval ? "Approve" : "Reject";
    const url = `${this.taskApproval}?OID=${taskData.transactionId}&ShowPage=1&PMMID=${taskData.taskId}&cmdSubmit=${btnAction}`;

    return this.http.post(url, taskData, { observe: 'response', responseType: 'text' })
      .pipe(map(data => {
        return data;
      }), catchError(this.handleErrorReturnMessage('UpdateTaskApproval')));
  }

  getCardFilters(): Observable<any> {
    const url = `${this.dashboards}ProjectsFilters/GetProjectsCardFilters`;
    return this.callHttpGet(url, 'getCardFilters')
  }

  // This method will call CREM app web method to request file
  getActivityFeedFile(urlPath: string): Observable<any> {
    const url = `${this.dashboards}GetActivityFeedCardFile`;
    return this.callHttpPostByteArray(url, 'getActivityFeedFile', { urlPath });
  }

  DoesUserHaveProjectAddRights(): Observable<any> {
    const url = `${this.dashboards}Dashboards/DoesUserHaveProjectAddRights`;
    return this.callHttpGet(url, 'DoesUserHaveProjectAddRights')
  }

  GetUserPreferences(): Observable<any> {
    const url = `${this.dashboards}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'GetUserPreferences')
  }
  
  getObjectTypeNames(objectTypeIds: number[]): Observable<any> {
    const url = `${this.dashboards}Dashboards/GetObjectTypeNames`;
    return this.callHttpPost(url, 'getObjectTypeNames',  { objectTypeIds })
  }

  getRecentActivities(durationInDays: number): Observable<any> {
    const url = `${this.dashboards}Projects/GetRecentActivities`;
    return this.callHttpPost(url, 'getRecentActivities', durationInDays);
  }
  
  getTeams(): Observable<any>  {
    const url = `${this.projects}projects/getteams`;
    return this.callHttpGet(url,'getTeams')
  }

  deleteTeamMembers(memberIds: number[]): Observable<any>  {
    const url = `${this.projects}projects/deleteteammembers`;
    return this.callHttpPost(url,'deleteTeamMembers', memberIds)
  }

  getMembersList(search: string, all:boolean, pageSize: number, pageNumber: number) : Observable<any> {
    const url = `${this.projects}projects/getmemberslist`;
    return this.callHttpPost(url, 'getMembersList', { search, all, pageSize, pageNumber })
  }

  getmemberinfo(): Observable<any> {
    const url = `${this.projects}projects/getmemberinfo`;
    return this.callHttpGet(url, 'getmemberinfo')
  }

  updateTeamMember(memberupdate: TeamMemUpdate): Observable<any> {
    const url = `${this.projects}projects/updateteammember`;
    return this.callHttpPost(url, 'updateTeamMember', memberupdate);
  }

  addTeam(team:Team): Observable<any> {
    const url = `${this.projects}projects/addteam`;
    return this.callHttpPost(url, 'addTeam', team);
  }

  importTeam(projectID: number, teamID: number, projectManagerSharedValue: boolean): Observable<any> {
    const url = `${this.projects}projects/importteam`;
    return this.callHttpPost(url, 'importTeam', { projectID, teamID, projectManagerSharedValue });
  }

  getModuleRights(objectType: number, securityType: number) {
    const url = `${this.projects}projects/getmodulerights`;
    return this.callHttpPost(url, 'getModuleRights', { objectType, securityType })
  }

  deleteTeams(teamIds: number[]) {
    const url = `${this.projects}projects/deleteteams`;
    return this.callHttpPost(url, 'deleteteams',  teamIds)
  }

  getProjectTeams(projectId): Observable<any> {
    const url = `${this.projects}projects/getprojectteams/${projectId}`;
    return this.callHttpGet(url, 'getProjectTeams')
  }
  
  getProjectTaskSettings(projectId): Observable<any> {
    const url = `${this.projects}projects/projecttaskssettings/${projectId}`;
    return this.callHttpGet(url, 'projecttaskssettings')
  }

  getProjectTemplatePreview(projectId: number, templateId: number): Observable<any> {
    const url = `${this.projects}projects/getProjectTemplatePreview/${projectId}/${templateId}`;
    return this.callHttpGet(url, 'getProjectTemplatePreview')
  }

  getProjectTemplateList(): Observable<any> {
    const url = `${this.projects}projects/getprojecttemplatelist`;
    return this.callHttpGet(url, 'getprojecttemplatelist')
  }

  getProjectTemplateTaskList(templateId): Observable<any> {
    const url = `${this.projects}/projecttemplates/getprojecttemplatetasklist/${templateId}`;
    return this.callHttpGet(url, 'getprojecttemplatetasklist')
  }

  postCopyProject(copyProject): Observable<any> {
    const url = `${this.projects}projects/copyProject`;
    return this.callHttpPost(url, 'copyProject', copyProject);
  }

  appendTemplateToProject(projectId: number, templateId: number, applyTeam: boolean) {
    const url = `${this.projects}projects/appendTemplateToProject`;
    return this.callHttpPost(url, 'appendTemplateToProject', { projectId, templateId, applyTeam });
  }

  getProjectEmailPreferences(projectId): Observable<any> {
    const url = `${this.projects}projects/projectemailpreferences/${projectId}`;
    return this.callHttpGet(url, 'projectemailpreferences')
  }

  postProjectTaskSettings(projectSettings): Observable<any> {
    const url = `${this.projects}projects/projecttaskssettings`;
    return this.callHttpPost(url, 'projecttaskssettings', projectSettings);
  }
  
  postProjectEmailPreferences(projectEmailPreferences): Observable<any> {
    const url = `${this.projects}projects/projectemailpreferences`;
    return this.callHttpPost(url, 'projectemailpreferences', projectEmailPreferences);
  }

  getTaskApprovalDetails(taskId): Observable<any> {
    const url = `${this.projects}projects/gettaskapprovaldetails/${taskId}`;
    return this.callHttpGet(url, 'gettaskapprovaldetails')
  }


  getClientPreference(clientPreferenceSetting): Observable<any> {
    const url = `${this.projects}projects/GetClientPreference/${clientPreferenceSetting}`;
    return this.callHttpGet(url, 'getClientPreference')
  }

  getProjectTaskList(projectId): Observable<any> {
    const url = `${this.projects}tasks/getprojecttasklist/${projectId}`;
    return this.callHttpGet(url, 'getProjectTaskList')
  }

  getOutstandingRolesforTask(projectId): Observable<any> {
    const url = `${this.projects}tasks/getoutstandingrolesfortask/${projectId}`;
    return this.callHttpGet(url, 'getOutstandingRolesforTask')
  }

  getTaskDetails(projectId, taskId): Observable<any> {
    const url = `${this.projects}tasks/getTaskDetails/${projectId}/${taskId}`;
    return this.callHttpGet(url, 'getTaskDetails')
  }

  getTaskCompletionDates(projectId, taskId): Observable<any> {
    const url = `${this.projects}tasks/TaskCompletionDate/${projectId}/${taskId}`;
    return this.callHttpGet(url, 'getTaskCompletionDates')
  }

  setTaskCompletionDates(projectId: number, taskId: number, isReset: number, isCompleteDate: number, userDate: Date, noteText: string) {
    const url = `${this.projects}tasks/TaskCompletionDate`;
    return this.callHttpPost(url,  'setTaskCompletionDates', { projectId, taskId, isReset, isCompleteDate, userDate, noteText });
  }

  getAllApprovers(projectId, taskId): Observable<any> {
    const url = `${this.projects}tasks/getAllApprovers/${projectId}/${taskId}`;
    return this.callHttpGet(url, 'getAllApprovers')
  }

  getWorkflowStatuses(): Observable<any> {
    const url = `${this.projects}tasks/getWorkflows`;
    return this.callHttpGet(url, 'getWorkflowStatuses');
  }

  getCommonNoteTypes(): Observable<any> {
    const url = `${this.projects}tasks/commonNoteTypes`;
    return this.callHttpGet(url, 'getCommonNoteTypes')
  }

  deleteTasks(tasksToDelete) {
    const url = `${this.projects}tasks/deletetasks`;
    return this.callHttpPost(url,  'deletetasks',  tasksToDelete );
  }

  createOrUpdateTask(taskToUpdate) {
    const url = `${this.projects}tasks/createprojecttask`;
    return this.callHttpPost(url,  'createProjectTask',  taskToUpdate );
  }

  getProjectContactLevel(projectId): Observable<any> {
    const url = `${this.projects}projects/getprojectcontactlevel/${projectId}`;
    return this.callHttpGet(url, 'getProjectContactLevel')
  }

  saveTeamAsTemplate(teamTemplateName: string, projectId: number) {
    const url = `${this.projects}projects/createteamtemplate`;
    return this.callHttpPostWithErrorMessage(url, 'saveTeamAsTemplate',  { teamTemplateName, projectId })
  }

  saveProjectManager(projectId: number, contactId: number) {
    const url = `${this.projects}projects/saveprojectmanager`;
    return this.callHttpPost(url,  'saveProjectManager', { projectId, contactId });
  }

  saveNote(objectId: number, objectTypeId: number, commonNoteId: number, commonNoteTypeId: number, commonNote: string) {
    const url = `${this.projects}tasks/saveNotes`;
    return this.callHttpPost(url,  'saveNote', { objectId, objectTypeId, commonNoteId, commonNoteTypeId, commonNote });
  }

  saveAssignees(taskId: number, addAssigneesContactIds: number[], removeAssigneesContactIds: number[]) {
    const url = `${this.projects}tasks/editApprovers`;
    return this.callHttpPost(url,  'saveNote', { taskId, addApprovers: addAssigneesContactIds, removeApprovers: removeAssigneesContactIds });
  }

  removeTeamMembers(projMemberData ) {
    const url = `${this.projects}projects/removeteammembers`;
    return this.callHttpPost(url,  'removeteammembers',  projMemberData );
  }

  addContactsToTasksByRole(projectID: number) {
    const url = `${this.projects}tasks/addcontactstotasksbyrole`;
    return this.callHttpPost(url, 'addContactsToTasksByRole', { projectID } );
  }

  updateProjectTeamMember(projectTeamMember: UpdateProjectTeamMember) {
    const url = `${this.projects}projects/updateprojectteammember`;
    return this.callHttpPost(url, 'updateProjectTeamMember', projectTeamMember);
  }

  addTemporaryUser(temporaryUser: UpdateTemporaryUser) {
    const url = `${this.projects}projects/addtemporaryuser`;
    return this.callHttpPostWithErrorMessage(url, 'addtemporaryuser', temporaryUser);
  }

  updateProjectContact(projectContact: UpdateContact) {
    const url = `${this.projects}projects/updateprojectcontact`;
    return this.callHttpPost(url, 'updateprojectcontact', projectContact);
  }

  assignTasks(memberTasks: AssignTasks) {
    const url = `${this.projects}tasks/assigntasks`;
    return this.callHttpPost(url, 'assigntasks', memberTasks);
  }

  displayContactSystemAdminMessage(){
    this.errorNotify("An error occurred please contact the system administrator.");
  }
  
  getComposeEmailInfo(projectId): Observable<any> {
    const url = `${this.projects}projects/getcomposeemailinfo/${projectId}`;
    return this.callHttpGet(url, 'getComposeEmailInfo');
  }

  getGridData(request: any): Observable<any> {
    return this.callHttpPost(`${this.listpages}listpage/gridData`, 'getGridData', request)
  }

  getListViewSelectorItems(request: GetViewDropdownDataRequest): Observable<any> {
    return this.callHttpGet(`${this.listpages}listpage/ListViewSelectorItems/${request.objectTypeId}`, 'getListViewSelectorItems')
  }

  createUserListView(userView: ListView): Observable<number> {
    return this.callHttpPost(`${this.listpages}listpage/views`, 'createUserListView', userView);
  }

  deleteUserView(userViewId: number): Observable<any> {
    return this.callHttpDelete(`${this.listpages}listpage/views/${userViewId}`, 'deleteUserView')
  }

  setDefaultListView(request: SetDefaultListViewRequest): Observable<any> {
    return this.callHttpPut(`${this.listpages}listpage/SetDefaultListView`, 'setDefaultListView', request)
  }

  updateListView(listView): Observable<any> {
    return this.callHttpPut(`${this.listpages}listpage/ListViewUpdate`, 'updateListView', listView)
  }
  
  hideListView(request: HideListViewRequest): Observable<any> {
    return this.callHttpPost(`${this.listpages}listpage/HideListView`, 'hideListView', request)
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

