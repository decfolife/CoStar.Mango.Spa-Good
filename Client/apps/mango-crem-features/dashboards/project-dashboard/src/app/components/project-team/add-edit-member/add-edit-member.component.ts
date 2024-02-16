/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MemberInfo, ProjectTaskDetails, ProjectTeamMember, TeamMember, contactMember } from '@mango/data-models/lib-data-models';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';
import { CardsService } from '@project-dashboard/services/cards.service';

enum Operations {
  ATM = "ATM",
  ATU = "ATU",
  AC  = "AC",
  ETM = "ETM",
  ETU = "ETU",
}

@Component({
  selector: 'add-edit-member-popup',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss']
})

export class AddEditMemberComponent implements OnInit {
  Operations = Operations;
  public modalTitle;
  public modalId: string = "addEditMemberModal";
  public closeButton = true;
  isMemberDropDownBoxOpened = false;
  outstandingRoles = [];
  expirationTypes = ['Expiration Date', 'Project Completion', 'Task Completion'];
  outstandingRolesHelpText: string;
  buttonType: string = "secondary";
  teamMembers: TeamMember[] = [];
  teamMember: ProjectTeamMember = <ProjectTeamMember>{};
  filteredMembers: contactMember[] = [];
  projectTaskList: ProjectTaskDetails[] = [];
  clientSettingPreference: string;
  memberInfo: MemberInfo = <MemberInfo>{};
  projectId: number;
  operation: string;
  selectedMember: string;
  selectedRole: string;
  selectedLevel: string;
  labelPosition = 'before';
  subs: Subscription[] = [];
  isExpirationDateSelected: boolean = false;
  emailNotificationChecked: boolean = false;
  sharedChecked: boolean = false;
  description: string = "";
  firstName: string = "";
  lastName: string = "";
  emailId: string = "";

  
  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private dashboardService: DashboardService,
    private cardsService: CardsService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddEditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.selectedRole = "somethingtotest";
    let allMembers =  false;
    let pageSize = 10;
    let pageNumber = 1;
    this.projectId = this.data.projectId;
    this.operation = this.data.operation;
    this.memberInfo.roles = [];
    this.memberInfo.levels = [];


    this.memberInfo.roles = Object.assign([], this.data.memberInfo.roles);
    this.memberInfo.levels = Object.assign([], this.data.memberInfo.levels);
    if(this.operation == Operations.ATU || this.operation == Operations.ETU) {
      this.memberInfo.levels = this.memberInfo.levels.filter(level => level.level !== "L1");
    }

    this.getTitle(this.operation);
    this.getOutstandingRoles(this.projectId);
    this.getProjectAssignedTaskList(this.projectId);
    if (this.operation == Operations.ATU || this.operation == Operations.ETU) {
      this.subs.push(this.getUserPreferences().subscribe());
    }
    if(this.operation == Operations.AC) {
      this.buttonType = "primary";
    }

    if(this.operation == Operations.ETM || this.operation == Operations.ETU) {
      this.teamMember = this.data.teamMember;
      this.populateTeamMembersData();
    }

    this.subs.push(this.getClientSettingPreferences().subscribe());
    this.subs.push(this.membersSearchInput$.pipe(
      debounceTime(250),
      switchMap(inputValue => ((inputValue.length != 1) ? this.getMembers(inputValue, allMembers, pageSize, pageNumber) : of([])))
    ).subscribe(filteredMembers => {
      this.filteredMembers = filteredMembers;
      allMembers = true;
      pageNumber = 0;
      pageSize = 0;
    }));

  }

  populateTeamMembersData() {
    this.selectedMember = this.teamMember.teamMember;
    this.emailNotificationChecked = this.teamMember.emailNotifications;
    this.sharedChecked = this.teamMember.shared;
    this.selectedRole = this.teamMember.role;
    this.selectedLevel = this.teamMember.accessLevel == 1? 'L1': this.teamMember.accessLevel == 2?'L2': this.teamMember.accessLevel == 3? 'L3': 'N/A' ;
    this.description = this.teamMember.description;
    this.emailId = this.teamMember.email;

    const names = this.selectedMember.trim().split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }

  checkTask(task: ProjectTaskDetails) {
    return this.teamMember?.projectTasks?.some(memberTask => memberTask.taskID ==  task.taskId);
  }

  searchTeamMembers(val: string) {
    this.membersSearchInput$.next(val)
  }

  onMemberClicked(e) {
    this.selectedMember = e.itemData.Name;
    this.isMemberDropDownBoxOpened = false;
  }

  roleSelected(e) {
    this.selectedRole = e.selectedItem.role;
  }

  levelSelected(e) {
    this.selectedLevel = e.selectedItem.level;
  }
  
  expirationTypeSelected(e) {
    this.isExpirationDateSelected = false;
    if(e.selectedItem == "Expiration Date") {
      this.isExpirationDateSelected = true;
    }
  }

  setExpirationDate(e) {
    let selectedDate = e.value;
  }

  emailtoggle() {

  }

  sharedtoggle() {

  }

  onCheckboxValueChanged(e) {
  }

  getTitle(operation) {
    switch(operation) {
      case "ATM":
        this.modalTitle = "Add Team Member";
        break;
      case "ATU":
        this.modalTitle = "Add Temporary User";
        break;  
      case "AC":
        this.modalTitle = "Add Contact";
        break; 
      case "ETM":
        this.modalTitle = "Edit Team Member";
        break;
      case "ETU":
        this.modalTitle = "Edit Temporary User";
        break;       
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  getMembers(search: string, all: boolean, pageSize: number, pageNumber: number) {
    return this.dashboardService.getMembersList(search, all, pageSize, pageNumber).pipe(
      map(res => res.data),
      catchError(error => {
        console.log("ERROR occurred while getting Members List: ", error);
        return of(error);
      }
      )
    );
  }

  getUserPreferences(): Observable<any> {
    return this.dashboardService.GetUserPreferences().pipe(
      filter(res => !!res && !!res.success),
      map(res => this.cardsService.setUserDateFormat(res.data.isDatesEU))
    );
  }

  getClientSettingPreferences(): Observable<any> {
    return this.dashboardService.getClientPreference('ClientProjectsPrivate').pipe(
      filter(res => !!res && !!res.success),
      tap(res => this.clientSettingPreference = res.data),
      catchError(error => {
        console.log("ERROR occurred while getting Client Setting Preferences: ", error);
        return of(error);
      })
    );
  }

  public getProjectAssignedTaskList(projectId) {
    this.subs.push(this.dashboardService.getProjectTaskList(projectId).subscribe(
      (res:any) => {
        this.projectTaskList = res.data;
      },
      (error: any) => console.log("Error occurred getting Project Task List ", error),
      () => {}
    ));
  }

  public getOutstandingRoles(projectId) {
    this.subs.push(this.dashboardService.getOutstandingRolesforTask(projectId).subscribe(
      (res:any) => {
        this.outstandingRoles = res.data;
        if(this.outstandingRoles.length) {
          this.outstandingRolesHelpText = `These roles are waiting to be assigned: `;
          this.outstandingRoles.forEach(role => {
            this.outstandingRolesHelpText +=` ${role.projectMilestoneRole},`;
          })
        }
      },
      (error: any) => console.log("Error occurred getting Outstanding Roles ", error),
      () => {}
    ));
  }
  
  ngOnDestroy() {
    this.membersSearchInput$.unsubscribe();
    this.subs.forEach(s => s.unsubscribe);
  }

}