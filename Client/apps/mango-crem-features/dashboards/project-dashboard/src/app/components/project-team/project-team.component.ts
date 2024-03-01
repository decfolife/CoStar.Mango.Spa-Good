import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MemberInfo, ProjectTeamMember, RemoveMember, RemoveTeamMembers } from '@mango/data-models/lib-data-models';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { AddEditMemberComponent } from './add-edit-member/add-edit-member.component';
import { SaveTeamTemplateComponent } from './save-team-template/save-team-template.component';
import dxCheckBox, { InitializedEvent } from 'devextreme/ui/check_box';
import { ToastrService } from 'ngx-toastr';
import { ImportTeamComponent } from './import-team/import-team.component';


@Component({
  selector: 'project-teams',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {

  dataRetrieved: boolean = false;;
  projectTeam: ProjectTeamMember[];
  selectedTeamMembersData: RemoveTeamMembers = <RemoveTeamMembers>{};
  projectId: number;
  managerContactId: number;
  memberInfo: MemberInfo = <MemberInfo>{};
  noDataText: string = "No Data.";
  errorText: string = "Error Occurred while getting Project Team Members.";
  userAccessLevel: number;
  subs: Subscription[] = [];
  projectsPrivateSetting: number;
  contactIds: number[] = [];

  constructor(private dashboardService: DashboardService, 
              private dialog: MatDialog,
              public toastr: ToastrService,
              private route: ActivatedRoute,
              private dialogService: MangoDialogService,
  ) {}

  ngOnInit(): void {
    this.getProjectsPrivateSetting();

    this.subs.push(this.route.queryParams.pipe(
      filter(params => !!params && !!params.oid),
      tap(params => {this.projectId = parseInt(params.oid);
        this.selectedTeamMembersData.projectId = this.projectId;
      }),
      switchMap(params => this.getProjectTeam(this.projectId)),
      tap(_ => {this.getMemberInfo(), this.getProjectContactLevel(this.projectId)}),
    ).subscribe());
  }

  addOrEditMember(operation, member?) {

    let height;
    if(operation == 'AC') {
      height = '500px';
    } else {
      height = '800px';
    }
    let dialogRef = this.dialog.open(AddEditMemberComponent, {
      height: height,
      width: '500px',
      panelClass: 'addEditMemberModal',
      data: { memberInfo: this.memberInfo, projectId: this.projectId, operation:operation, teamMember: member, contactIds: this.contactIds},
      disableClose: true
    });

    this.subs.push(dialogRef.afterClosed().pipe(
      filter(reload => !!reload),
      switchMap(_ => this.getProjectTeam(this.projectId)),
    ).subscribe());
  }

  saveTeamAsTemplate() {
    let dialogRef = this.dialog.open(SaveTeamTemplateComponent, {
      height: '300px',
      width: '600px',
      panelClass: 'saveTeamTemplateModal',
      data: { projectId: this.projectId },
      disableClose: true
    });

    this.subs.push(dialogRef.afterClosed().subscribe());
  }

  onSelectionChanged(e:any){
    if(e.selectedRowKeys.includes(this.managerContactId)) {
      e.selectedRowKeys = e.selectedRowKeys.filter(contactId => contactId != this.managerContactId);
      e.selectedRowsData = e.selectedRowsData.filter(rowData => rowData.contactID != this.managerContactId);
    }
    this.selectedTeamMembersData.teamMembers = [];
    e.selectedRowsData.forEach(rowData => {
      let selectedMemberData = {
        commonTeamId: rowData.teamID,
        contactId: rowData.contactID
      };

      this.selectedTeamMembersData.teamMembers.push(selectedMemberData);
    })
  }

  onCellPrepared(e) {
    if(e.rowType !== 'header' && e.column.command == 'select' && this.userAccessLevel == 1 && e.data.isManager) {
      this.managerContactId = e.data.contactID;
      let htmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];
      var editor = dxCheckBox.getInstance(htmlCellElement.querySelector(".dx-select-checkbox"));
      if(editor) {
        editor.option("visible", false);
      }
      htmlCellElement.style.pointerEvents = 'none';
    }
  }

  importMembers() {
    let dialogRef = this.dialog.open(ImportTeamComponent, {
      height: '600px',
      width: '900px',
      data: { memberInfo: this.memberInfo, projectId: this.projectId, projectsPrivateSetting: this.projectsPrivateSetting},
      disableClose: true
    });

    this.subs.push(dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(_ => this.getProjectTeam(this.projectId))
    ).subscribe());
  }

  removeMembers() {
    this.subs.push(this.dialogService.confirm('Remove Members', `Do you want to delete the selected contacts/members ?`, 'Confirm', 'Cancel').pipe(
      filter(confirmed => !!confirmed),
      switchMap(_ => this.dashboardService.removeTeamMembers(this.selectedTeamMembersData)),
      switchMap(res => !!res && !!res.success ? 
        (this.dashboardService.successNotify("Contact/Team Member(s) removed from this project."), this.getProjectTeam(this.projectId)) 
        : this.dialogService.alert('Team Member Removal', 'There was an issue removing selected Team Member(s). Please review and try again later.', 'OK')
      )
    ).subscribe());
  }

  makeProjectManager(contactId: number) {
    this.subs.push(this.dashboardService.saveProjectManager(this.projectId, contactId).subscribe(
      (res:any) => {
        if(!res || !res.success) {
          this.displayMessage();
        } else {
          this.subs.push(this.getProjectTeam(this.projectId).subscribe());
        }
        this.memberInfo = res.data;
      },
      (error: any) => this.displayMessage(),
      () => {}
    ));

  }

  displayMessage() {
    this.dialogService.alert('Make Team Manager', 'We were not able to update Team Manager, please try again later.', 'OK');
  }

  applyTeamToTasks() {
    this.subs.push(this.dialogService.confirm('Apply Team To Tasks', `Are you sure you want to assign team members to tasks based on their roles ?`, 'Confirm', 'Cancel').pipe(
      filter(confirmed => !!confirmed),
      switchMap(_ => this.dashboardService.addContactsToTasksByRole(this.projectId)),
      switchMap(res => !!res && !!res.success ? 
        (this.toastr.info("Team members have successfully been added to tasks based on their role.", "", { positionClass: 'toast-bottom-right', timeOut: 3000, closeButton: false, progressBar: false }), this.getProjectTeam(this.projectId)) 
        : this.dialogService.alert('Apply Team To Tasks', 'There was an issue adding Team members to Tasks. Please review and try again later.', 'OK')
      )
    ).subscribe());
  }

  public getProjectTeam(projectId): Observable<any> {
    this.dataRetrieved = false;
    this.contactIds = [];
    this.selectedTeamMembersData.teamMembers = [];
    return this.dashboardService.getProjectTeams(projectId).pipe(
      tap(res => {
        if (!res || !res.success) {
          this.noDataText = this.errorText;
          this.dataRetrieved = true;
        }
      }),
      filter(res => !!res && !!res.success),
      tap(res => {
        this.projectTeam = res.data;
        this.dataRetrieved = true;
        if(this.projectTeam.length) {
          this.projectTeam.forEach(member => this.contactIds.push(member.contactID));
        }
      }),
      catchError(error => {this.dataRetrieved = true; 
        return of(false);
      })
    )
  }

  public getMemberInfo() {
    this.subs.push(this.dashboardService.getmemberinfo().subscribe(
      (res:any) => {
        this.memberInfo = res.data;
      },
      (error: any) => console.log("Error occurred getting Member Info Data ", error),
      () => {}
    ));
  }

  public getProjectContactLevel(projectId) {
    this.subs.push(this.dashboardService.getProjectContactLevel(projectId).subscribe(
      (res:any) => {
        this.userAccessLevel = res.data;
      },
      (error: any) => console.log("Error occurred getting User Access Level ", error),
      () => {}
    ));
  }

  toggleExpand() {
    
  }

  clearAllFilters() {

  }

  searchDataGrid(e) {
    
  }

	ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe);
  }

  private getProjectsPrivateSetting() {
    this.subs.push(this.dashboardService.getClientPreference('ClientProjectsPrivate').subscribe(
      (res:any) => {
        if (res === null) {
          this.dashboardService.displayContactSystemAdminMessage();
        }
        else if (res.success) {
          this.projectsPrivateSetting = Number(res.data);
        } else {
          this.dashboardService.errorNotify(res.clientErrorMessage);
        }    
      },
      (error: any) => {
        console.log("Error occurred getting Projects Private Setting", error);
        this.dashboardService.displayContactSystemAdminMessage();
      },
      () => {}
    ));
  }
}