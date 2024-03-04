/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { AssignTasks, MemberInfo, ProjectTaskDetails, ProjectTeamMember, TeamMember, UpdateContact, UpdateProjectTeamMember, UpdateTemporaryUser, contactMember } from '@mango/data-models/lib-data-models';
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
  expirationTypes = [{expType: 'Expiration Date', value: '1'}, {expType: 'Project Completion', value: '2'}, {expType: 'Task Completion', value: '3'}];
  outstandingRolesHelpText: string;
  buttonType: string = "secondary";
  teamMembers: TeamMember[] = [];
  teamMember: ProjectTeamMember = <ProjectTeamMember>{};
  filteredMembers: contactMember[] = [];
  projectTaskList: ProjectTaskDetails[] = [];
  clientSettingPreference: string;
  memberInfo: MemberInfo = <MemberInfo>{};
  projectContactIds: number[] = [];
  updateTeamMemberData: UpdateProjectTeamMember = <UpdateProjectTeamMember>{};
  updateTemporaryUserData: UpdateTemporaryUser = <UpdateTemporaryUser>{};
  updateContactData: UpdateContact = <UpdateContact>{};
  memberTasks: AssignTasks = <AssignTasks>{};
  contactId: number;
  expirationType: string;
  expirationDate: Date  = null;
  reloadMainGrid: boolean = false;
  assignedTasksChanged: boolean = false;
  applySaveButtonDisabled = false;
  changesMade: boolean = false;
  changesSaved: boolean = false;
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
  dropdownbox;

  
  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(private dashboardService: DashboardService,
    private cardsService: CardsService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddEditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    let allMembers =  false;
    let pageSize = 10;
    let pageNumber = 1;
    this.projectId = this.data.projectId;
    this.operation = this.data.operation;
    this.projectContactIds = this.data.contactIds;
    this.memberInfo.roles = [];
    this.memberInfo.levels = [];
    this.memberTasks.contactID = 0;
    this.memberTasks.assignTasks = [];


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
    this.contactId = this.teamMember.contactID;
    this.expirationType = this.teamMember.expirationType;
    this.expirationDate = this.teamMember.expirationDate? new Date(this.teamMember.expirationDate): null;
    this.isExpirationDateSelected = this.teamMember.expirationType == '1'? true: false;

    const names = this.selectedMember.trim().split(' ');
    this.firstName = names[0];
    this.lastName = names[1];

    this.memberTasks.contactID = this.teamMember.contactID;
    this.getMemberTasks();
  }

  getMemberTasks() {
    if(this.teamMember.projectTasks.length) {
      this.teamMember.projectTasks.forEach(task => this.memberTasks.assignTasks.push({isAdd: 1, taskID: task.taskID}));
    }
  }

  checkTask(task: ProjectTaskDetails) {
    return this.memberTasks.assignTasks?.some(memberTask => memberTask.taskID == task.taskId);
  }

  updateTask(e, task: ProjectTaskDetails) {
    this.assignedTasksChanged = true;
    if(this.memberTasks.assignTasks.some(memberTask => memberTask.taskID == task.taskId)) {
      (this.memberTasks.assignTasks.find(memberTask => memberTask.taskID == task.taskId)).isAdd = e.value == true? 1: 0; 
    } else {
      this.memberTasks.assignTasks.push({isAdd: 1, taskID: task.taskId});
    }
  }

  searchTeamMembers(val: string) {
    this.membersSearchInput$.next(val)
  }

  onMemberClicked(e) {
    this.selectedMember = e.itemData.Name;
    this.isMemberDropDownBoxOpened = false;
    this.contactId = e.itemData.contactID;
    this.memberTasks.contactID = e.itemData.contactID;
  }

  roleSelected(e) {
    this.selectedRole = e.selectedItem.role;
    this.changesMade = (this.selectedRole == e.component._initialValue && !this.changesMade && !this.changesSaved) ? false : true;
  }

  levelSelected(e) {
    this.selectedLevel = e.selectedItem.level;
    this.changesMade = (this.selectedLevel == e.component._initialValue && !this.changesMade && !this.changesSaved) ? false : true;
  }
  
  expirationTypeSelected(e) {
    this.isExpirationDateSelected = (e.selectedItem.value == '1') ? true : false;
    if(!this.isExpirationDateSelected) { 
      this.expirationDate = null;
    }
    this.expirationType = e.selectedItem.value;
    this.changesMade = (this.expirationType == e.component._initialValue && !this.changesMade && !this.changesSaved) ? false : true;
  }

  setExpirationDate(e) {
    this.changesMade = true;
    this.expirationDate = e.value;
  }

  emailtoggle(e) {
    this.changesMade = true;
    this.emailNotificationChecked = e.checked;
  }

  sharedtoggle(e) {
    this.changesMade = true;
    this.sharedChecked = e.checked;
  }

  descriptionValueChanged(e) {
    this.changesMade = true;
    this.description = e.target.value;
  }

  updateFlag() {
    this.changesMade = true;
  }

  focusOnDropDownInput(e) { 
    this.dropdownbox = e.component;
    setTimeout(function() {  
        e.component.focus();  
    });  
  }

  toggleList(){
    this.isMemberDropDownBoxOpened = !this.isMemberDropDownBoxOpened;
  }

  selectionChanged(e) {
    this.changesMade = true;
    this.isMemberDropDownBoxOpened = false;
    this.dropdownbox.focus();
  }

  onItemRendered(e) {
    if(this.projectContactIds && this.projectContactIds.length) {
      this.projectContactIds.forEach(contactId => {
        if(contactId == e.itemData.contactID) {
          this.setListItemAttributes(e);
        }
      })
    }
  }

  setListItemAttributes(e) {
    const listItem = e.itemElement as HTMLElement;
    listItem.style.pointerEvents = 'none';
    listItem.classList.add('aet-itemDisabled');
  }

  saveMember(type: string) {

    if (this.operation == Operations.ATM || this.operation == Operations.ETM || this.operation == Operations.ETU) {
      this.updateTeamMember(type);
    } else 
    if (this.operation == Operations.ATU) {
      this.addTemporaryUser(type);
    } else {
      this.updateContact()
    }

  }

  updateTeamMember(updateType: string) {
    if(this.assignedTasksChanged && !this.changesMade && (this.operation == Operations.ETM || this.operation == Operations.ETU)) {
      this.assignTasks(updateType);
      return;
    }
    this.applySaveButtonDisabled = true;
    this.updateTeamMemberData.projectID = this.projectId;
    this.updateTeamMemberData.contactID = this.contactId;
    this.updateTeamMemberData.contactRole = this.selectedRole;
    this.updateTeamMemberData.email = this.emailNotificationChecked;
    this.updateTeamMemberData.roleLevel = this.selectedLevel == 'L1' ? 1: this.selectedLevel == 'L2'? 2: this.selectedLevel == 'L3'? 3: undefined;
    this.updateTeamMemberData.shareRightsWithGroup = true;
    this.updateTeamMemberData.contactNotes = this.description;
    this.updateTeamMemberData.update = this.operation == 'ATM'? 0 : 1; 
    this.updateTeamMemberData.expirationType = this.expirationType;
    this.updateTeamMemberData.expirationDate = this.expirationDate;

    this.subs.push(this.dashboardService.updateProjectTeamMember(this.updateTeamMemberData).subscribe(
      (res:any) => {
        this.applySaveButtonDisabled = false;
        this.changesSaved = true;
        this.changesMade = false;
        if(!!res && res.success) {
          this.reloadMainGrid = true;
          (this.memberTasks.assignTasks.length && this.assignedTasksChanged)  && this.assignTasks(updateType); //assignTasks() executes only if memberTasks.assignTasks length is > 0
          
          if(updateType == 'save') {
            this.closeModal();
          } else
          if(updateType == 'apply' && this.operation == 'ATM') {
            this.operation = Operations.ETM;
          }
        } else {
          this.dialogService.alert('Add/Update Team Member', `There was an issue Adding or Updating a Team Member, Please try again later.`, 'OK');
          (updateType == 'save') && this.closeModal();
        }
      },
      (error: any) => console.log("Error occurred while Adding or Updating a Team Member.", error),
      () => {}
    ));
  }

  addTemporaryUser(updateType: string) {
    
    this.applySaveButtonDisabled = true;
    this.updateTemporaryUserData.projectId = this.projectId;
    this.updateTemporaryUserData.firstName = this.firstName;
    this.updateTemporaryUserData.lastName = this.lastName;
    this.updateTemporaryUserData.email = this.emailId;
    this.updateTemporaryUserData.role = this.selectedRole
    this.updateTemporaryUserData.description = this.description;
    this.updateTemporaryUserData.expirationType = this.expirationType;
    this.updateTemporaryUserData.expirationDate = this.expirationDate;
    this.updateTemporaryUserData.level = this.selectedLevel == 'L1' ? 1: this.selectedLevel == 'L2'? 2: this.selectedLevel == 'L3'? 3: 99;
    this.updateTemporaryUserData.isEmailOn = this.emailNotificationChecked;
    this.updateTemporaryUserData.projectAdminContactFirstName = "";
    this.updateTemporaryUserData.projectAdminContactLastName = "";
    this.updateTemporaryUserData.projectAdminContactEmail = "";
    this.updateTemporaryUserData.projectName = "";

    this.subs.push(this.dashboardService.addTemporaryUser(this.updateTemporaryUserData).subscribe(
      (res:any) => {
        this.applySaveButtonDisabled = false;
        this.changesMade = false;
        this.changesSaved = true;
        if(!!res && res.success) {
          this.contactId = res.data;
          this.memberTasks.contactID = res.data;
          this.reloadMainGrid = true;
          (this.memberTasks.assignTasks.length && this.assignedTasksChanged) && this.assignTasks(updateType);
          (updateType == 'save') && this.closeModal();
          this.operation = Operations.ETU;
        } else {
          this.dialogService.alert('Add Temporary User', `There was an issue Adding Temporary User, Please try again later.`, 'OK');
          (updateType == 'save') && this.closeModal();
        }
      }  
    ));
  }

  public assignTasks(updateType: string) {
    this.subs.push(this.dashboardService.assignTasks(this.memberTasks).subscribe(
      (res: any) => {
        this.assignedTasksChanged = false;
        if(!res || !res.success) {
          this.dialogService.alert('Add/Update Team Member', `Member updated sucessfully but there was an issue updating Assigned Tasks for the Member, Please try again later.`, 'OK');
        }
        this.reloadMainGrid = true;
        (updateType == 'save') && this.closeModal();
      }
    ))
  }
  
  updateContact() {
    this.updateContactData.projectID = this.projectId;
    this.updateContactData.contactID = this.contactId;
    this.updateContactData.contactRole = this.selectedRole
    this.updateContactData.contactNotes = this.description;
    this.updateContactData.contactFirstName = this.firstName;
    this.updateContactData.contactLastName = this.lastName;
    this.updateContactData.contactEmail = this.emailId;

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
    this.dialogRef.close(this.reloadMainGrid);
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