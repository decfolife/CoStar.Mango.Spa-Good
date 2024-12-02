/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import {
  AssignTasks,
  MemberInfo,
  ProjectTaskDetails,
  ProjectTeamMember,
  TeamMember,
  UpdateContact,
  UpdateProjectTeamMember,
  UpdateTemporaryUser,
  contactMember,
} from '@mango/data-models/lib-data-models';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { CardsService } from '@project-dashboard/services/cards.service';
import {
  DxDataGridComponent,
  DxValidationGroupComponent,
  DxValidatorComponent,
} from 'devextreme-angular';
import {
  ASSIGN_TASK,
  UNASSIGN_TASK,
} from '@project-dashboard/models/constants/project-tasks-constants';

enum Operations {
  ATM = 'ATM',
  ATU = 'ATU',
  AC = 'AC',
  ETM = 'ETM',
  ETU = 'ETU',
}

@Component({
  selector: 'add-edit-member-popup',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss'],
})
export class AddEditMemberComponent implements OnInit {
  @ViewChild('targetGroup', { static: false })
  validationGroup: DxValidationGroupComponent;
  @ViewChild('emailValidator', { static: false })
  emailValidator: DxValidatorComponent;

  Operations = Operations;
  public modalTitle;
  public modalId: string = 'addEditMemberModal';
  public closeButton = true;
  isMemberDropDownBoxOpened = false;
  outstandingRoles = [];
  expirationTypes = [
    { expType: 'Expiration Date', value: '1' },
    { expType: 'Project Completion', value: '2' },
    { expType: 'Task Completion', value: '3' },
  ];
  outstandingRolesHelpText: string = '';
  buttonType: string = 'secondary';
  teamMembers: TeamMember[] = [];
  teamMember: ProjectTeamMember = <ProjectTeamMember>{};
  filteredMembers: contactMember[] = [];
  projectTaskList: ProjectTaskDetails[] = [];
  clientSettingPreference: string;
  memberInfo: MemberInfo = <MemberInfo>{};
  projectContactIds: number[] = [];
  emailAddressList: string[] = [];
  updateTeamMemberData: UpdateProjectTeamMember = <UpdateProjectTeamMember>{};
  updateTemporaryUserData: UpdateTemporaryUser = <UpdateTemporaryUser>{};
  updateContactData: UpdateContact = <UpdateContact>{};
  memberTasks: AssignTasks = <AssignTasks>{};
  contactId: number;
  projectsPrivateSetting: number;
  expirationType: string;
  expirationDate: Date = null;
  reloadMainGrid: boolean = false;
  assignedTasksChanged: boolean = false;
  applySaveButtonDisabled = false;
  changesMade: boolean = false;
  changesSaved: boolean = false;
  nameFieldInvalid = false;
  firstNameFieldInvalid = false;
  lastNameFieldInvalid = false;
  emailAddressFieldInvalid = false;
  roleFieldInvalid = false;
  levelFieldInvalid = false;
  expirationTypeFieldInvalid = false;
  expirationDateFieldInvalid = false;
  projectId: number;
  operation: Operations;
  selectedMember: string;
  selectedRole: string;
  selectedLevel: string;
  subs: Subscription[] = [];
  isExpirationDateSelected: boolean = false;
  emailNotificationChecked: boolean = false;
  sharedChecked: boolean = false;
  description: string = '';
  firstName: string = '';
  lastName: string = '';
  emailId: string = '';
  dropdownbox;
  sharedToggleText = '';
  projectMemberInfo: string = `This team member is either no longer active or has Allow Log On set to No. 
                              Please consider replacing this team member or updating their User record.`;
  private duplicateEmailMsg = 'This email address is already in use.';
  private tasksLoaded = false;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  taskNamesLookup = [];

  constructor(
    private dashboardService: DashboardService,
    private cardsService: CardsService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddEditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //Custom validators run in their own context.  This line is needed to access variables in this component.
    this.duplicateEmailAddressValidation =
      this.duplicateEmailAddressValidation.bind(this);
  }

  ngOnInit(): void {
    let allMembers = false;
    let pageSize = 10;
    let pageNumber = 1;
    this.projectId = this.data.projectId;
    this.operation = this.data.operation;
    this.projectContactIds = this.data.contactIds;
    this.emailAddressList = this.data.emailAddressList;
    this.projectsPrivateSetting = this.data.projectsPrivateSetting;
    this.memberInfo.roles = [];
    this.memberInfo.levels = [];
    this.memberTasks.contactID = 0;
    this.memberTasks.assignTasks = [];

    this.sharedChecked =
      this.data.projectsPrivateSetting === 1 ||
      this.data.projectsPrivateSetting === 3;
    this.determineSharedToggleText();

    this.memberInfo.roles = Object.assign([], this.data.memberInfo.roles);
    this.memberInfo.levels = Object.assign([], this.data.memberInfo.levels);
    if (this.operation == Operations.ATU || this.operation == Operations.ETU) {
      this.memberInfo.levels = this.memberInfo.levels.filter(
        (level) => level.level !== 'L1'
      );
    }

    this.getTitle(this.operation);
    this.getOutstandingRoles(this.projectId);
    this.getProjectAssignedTaskList(this.projectId);
    if (this.operation == Operations.ATU || this.operation == Operations.ETU) {
      this.subs.push(this.getUserPreferences().subscribe());
    }
    if (this.operation == Operations.AC) {
      this.buttonType = 'primary';
    }

    if (this.operation == Operations.ETM || this.operation == Operations.ETU) {
      this.teamMember = this.data.teamMember;
      this.populateTeamMembersData();
    }

    this.subs.push(this.getClientSettingPreferences().subscribe());
    this.subs.push(
      this.membersSearchInput$
        .pipe(
          debounceTime(250),
          switchMap((inputValue) =>
            inputValue.length != 1
              ? this.getMembers(inputValue, allMembers, pageSize, pageNumber)
              : of([])
          )
        )
        .subscribe((filteredMembers) => {
          this.filteredMembers = filteredMembers;
          allMembers = true;
          pageNumber = 0;
          pageSize = 0;
        })
    );
  }

  populateTeamMembersData() {
    this.selectedMember = this.teamMember.teamMember;
    this.emailNotificationChecked = this.teamMember.emailNotifications;
    this.sharedChecked = this.teamMember.shared;
    this.determineSharedToggleText();
    this.selectedRole = this.teamMember.role;
    this.selectedLevel =
      this.teamMember.accessLevel == 1
        ? 'L1'
        : this.teamMember.accessLevel == 2
        ? 'L2'
        : this.teamMember.accessLevel == 3
        ? 'L3'
        : '';
    this.description = this.teamMember.description;
    this.emailId = this.teamMember.email;
    this.contactId = this.teamMember.contactID;
    this.expirationType = this.teamMember.expirationType;
    this.expirationDate = this.teamMember.expirationDate
      ? new Date(this.teamMember.expirationDate)
      : null;
    this.isExpirationDateSelected =
      this.teamMember.expirationType == '1' ? true : false;

    const names = this.selectedMember.trim().split(' ');
    this.firstName = names[0];
    this.lastName = names[1];

    this.memberTasks.contactID = this.teamMember.contactID;
    this.getMemberTasks();
  }

  getMemberTasks() {
    if (this.teamMember.projectTasks.length) {
      this.teamMember.projectTasks.forEach((task) =>
        this.memberTasks.assignTasks.push({ isAdd: 1, taskID: task.taskID })
      );
    }
  }

  searchTeamMembers(val: string) {
    this.membersSearchInput$.next(val);
  }

  onMemberClicked(e) {
    this.selectedMember = e.itemData.Name;
    this.isMemberDropDownBoxOpened = false;
    this.contactId = e.itemData.contactID;
    this.memberTasks.contactID = e.itemData.contactID;
  }

  roleSelected(e) {
    this.selectedRole = e.selectedItem.role;
    this.roleFieldInvalid = false;
    this.changesMade =
      this.selectedRole == e.component._initialValue &&
      !this.changesMade &&
      !this.changesSaved
        ? false
        : true;
  }

  levelSelected(e) {
    this.selectedLevel = e.selectedItem.level;
    this.levelFieldInvalid = false;
    this.changesMade =
      this.selectedLevel == e.component._initialValue &&
      !this.changesMade &&
      !this.changesSaved
        ? false
        : true;
  }

  expirationTypeSelected(e) {
    this.isExpirationDateSelected = e.selectedItem.value == '1' ? true : false;
    if (!this.isExpirationDateSelected) {
      this.expirationDate = null;
    }
    this.expirationType = e.selectedItem.value;
    this.expirationTypeFieldInvalid = false;
    this.changesMade =
      this.expirationType == e.component._initialValue &&
      !this.changesMade &&
      !this.changesSaved
        ? false
        : true;
  }

  setExpirationDate(e) {
    this.changesMade = true;
    this.expirationDate = e.value;
    this.expirationDateFieldInvalid = e.value === null;
  }

  emailtoggle(e) {
    this.changesMade = true;
    this.emailNotificationChecked = e.checked;
  }

  sharedtoggle(e) {
    this.changesMade = true;
    this.sharedChecked = e.checked;
    this.determineSharedToggleText();
  }

  descriptionValueChanged(e) {
    this.changesMade = true;
    this.description = e.target.value;
  }

  updateFlag() {
    this.changesMade = true;
  }

  firstNameChanged(e) {
    this.firstNameFieldInvalid = e.component._changedValue.trim() === '';
  }

  lastNameChanged(e) {
    this.lastNameFieldInvalid = e.component._changedValue.trim() === '';
  }

  emailAddressChanged(e) {
    if (e.component._changedValue.trim() !== '') {
      let emailValidationResult = this.emailValidator.instance.validate();
      this.emailAddressFieldInvalid = !emailValidationResult.isValid;
    }
  }

  focusOnDropDownInput(e) {
    this.dropdownbox = e.component;
    this.isMemberDropDownBoxOpened = false;
    setTimeout(function () {
      e.component.focus();
    });
    this.isMemberDropDownBoxOpened = true;
  }

  toggleList() {
    this.isMemberDropDownBoxOpened = !this.isMemberDropDownBoxOpened;
  }

  selectionChanged(e) {
    this.changesMade = true;
    this.nameFieldInvalid = false;
    this.isMemberDropDownBoxOpened = false;
    this.dropdownbox.focus();
  }

  onItemRendered(e) {
    if (this.projectContactIds && this.projectContactIds.length) {
      this.projectContactIds.forEach((contactId) => {
        if (contactId == e.itemData.contactID) {
          this.setListItemAttributes(e);
        }
      });
    }
  }

  onContentReady(e) {
    // when there are project tasks
    if (!this.tasksLoaded) {
      if (this.projectTaskList) {
        // get the list of tasks assigned to the member
        const assignedTasks = this.memberTasks.assignTasks.map(
          ({ taskID }) => taskID
        );
        // Select grid rows for assigned tasks
        this.dataGrid.instance.selectRows(assignedTasks, false);
      }
      this.tasksLoaded = true;
    }
  }

  setListItemAttributes(e) {
    const listItem = e.itemElement as HTMLElement;
    listItem.style.pointerEvents = 'none';
    listItem.classList.add('aet-itemDisabled');
  }

  saveMember(type: string) {
    let validationResult = this.validationGroup.instance.validate();

    if (validationResult.isValid) {
      if (
        this.operation == Operations.ATM ||
        this.operation == Operations.ETM ||
        this.operation == Operations.ETU
      ) {
        this.updateTeamMember(type);
      } else if (this.operation == Operations.ATU) {
        this.addTemporaryUser(type);
      } else {
        this.updateContact();
      }
    } else {
      this.executeFieldValidation(validationResult);
    }
  }

  duplicateEmailAddressValidation(e) {
    if (this.operation == 'ATU' || this.operation == 'ETU') {
      const foundIndex = this.emailAddressList.findIndex(
        (ea) => ea.trim().toLowerCase() == e.value.trim().toLowerCase()
      );
      return foundIndex < 0;
    }

    return true;
  }

  updateTeamMember(updateType: string) {
    if (
      this.assignedTasksChanged &&
      !this.changesMade &&
      (this.operation == Operations.ETM || this.operation == Operations.ETU)
    ) {
      this.assignTasks(updateType);
      return;
    }
    this.applySaveButtonDisabled = true;
    this.updateTeamMemberData.projectID = this.projectId;
    this.updateTeamMemberData.contactID = this.contactId;
    this.updateTeamMemberData.contactRole = this.selectedRole;
    this.updateTeamMemberData.email = this.emailNotificationChecked;
    this.updateTeamMemberData.roleLevel =
      this.selectedLevel == 'L1'
        ? 1
        : this.selectedLevel == 'L2'
        ? 2
        : this.selectedLevel == 'L3'
        ? 3
        : undefined;
    this.updateTeamMemberData.shareRightsWithGroup = this.sharedChecked;
    this.updateTeamMemberData.contactNotes = this.description
      ? this.description
      : '';
    this.updateTeamMemberData.update = this.operation == 'ATM' ? 0 : 1;
    this.updateTeamMemberData.expirationType = this.expirationType;
    this.updateTeamMemberData.expirationDate = this.expirationDate;

    this.subs.push(
      this.dashboardService
        .updateProjectTeamMember(this.updateTeamMemberData)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            this.applySaveButtonDisabled = false;
            this.changesSaved = true;
            this.changesMade = false;
            if (!!res && res.success) {
              this.reloadMainGrid = true;
              if (
                this.memberTasks.assignTasks.length &&
                this.assignedTasksChanged
              ) {
                this.assignTasks(updateType); //assignTasks() executes only if memberTasks.assignTasks length is > 0
              } else {
                if (updateType == 'save') {
                  this.closeModal();
                }
              }
              if (updateType == 'apply' && this.operation == 'ATM') {
                this.operation = Operations.ETM;
              }
            } else {
              this.dialogService.alert(
                'Add/Update Team Member',
                `There was an issue Adding or Updating a Team Member, Please try again later.`,
                'OK'
              );
              updateType == 'save' && this.closeModal();
            }
          },
          (error: any) =>
            console.log(
              'Error occurred while Adding or Updating a Team Member.',
              error
            ),
          () => {}
        )
    );
  }

  addTemporaryUser(updateType: string) {
    this.applySaveButtonDisabled = true;
    this.updateTemporaryUserData.projectId = this.projectId;
    this.updateTemporaryUserData.firstName = this.firstName;
    this.updateTemporaryUserData.lastName = this.lastName;
    this.updateTemporaryUserData.email = this.emailId;
    this.updateTemporaryUserData.role = this.selectedRole;
    this.updateTemporaryUserData.description = this.description
      ? this.description
      : '';
    this.updateTemporaryUserData.expirationType = this.expirationType;
    this.updateTemporaryUserData.expirationDate = this.expirationDate;
    this.updateTemporaryUserData.level =
      this.selectedLevel == 'L1'
        ? 1
        : this.selectedLevel == 'L2'
        ? 2
        : this.selectedLevel == 'L3'
        ? 3
        : 99;
    this.updateTemporaryUserData.isEmailOn = this.emailNotificationChecked;
    this.updateTemporaryUserData.projectAdminContactFirstName = '';
    this.updateTemporaryUserData.projectAdminContactLastName = '';
    this.updateTemporaryUserData.projectAdminContactEmail = '';
    this.updateTemporaryUserData.projectName = '';

    this.subs.push(
      this.dashboardService
        .addTemporaryUser(this.updateTemporaryUserData)
        .subscribe((res: any) => {
          this.applySaveButtonDisabled = false;
          this.changesMade = false;
          this.changesSaved = true;
          if (!!res && res.success) {
            this.contactId = res.data;
            this.memberTasks.contactID = res.data;
            this.reloadMainGrid = true;
            if (
              this.memberTasks.assignTasks.length &&
              this.assignedTasksChanged
            ) {
              this.assignTasks(updateType);
            } else {
              updateType == 'save' && this.closeModal();
            }
            this.operation =
              updateType == 'apply' ? Operations.ETU : this.operation;
          } else {
            if (
              res.errorMessage.startsWith(
                'This email address cannot be used for a temporary user.'
              )
            ) {
              this.dialogService.alert(
                'Validation Error(s)',
                this.duplicateEmailMsg,
                'OK'
              );
            } else {
              this.dialogService.alert(
                'Add Temporary User',
                `There was an issue Adding Temporary User, Please try again later.`,
                'OK'
              );
            }
          }
        })
    );
  }

  public assignTasks(updateType: string) {
    this.subs.push(
      this.dashboardService
        .assignTasks(this.memberTasks)
        .pipe(take(1))
        .subscribe((res: any) => {
          this.assignedTasksChanged = false;
          if (!res || !res.success) {
            this.dialogService.alert(
              'Add/Update Team Member',
              `Member updated sucessfully but there was an issue updating Assigned Tasks for the Member, Please try again later.`,
              'OK'
            );
          }
          this.reloadMainGrid = true;
          updateType == 'save' && this.closeModal();
        })
    );
  }

  updateContact() {
    this.applySaveButtonDisabled = true;
    this.updateContactData.projectID = this.projectId;
    this.updateContactData.contactID = this.contactId;
    this.updateContactData.contactRole = this.selectedRole;
    this.updateContactData.contactNotes = this.description;
    this.updateContactData.contactFirstName = this.firstName;
    this.updateContactData.contactLastName = this.lastName;
    this.updateContactData.contactEmail = this.emailId;

    this.subs.push(
      this.dashboardService
        .updateProjectContact(this.updateContactData)
        .subscribe(
          (res: any) => {
            this.applySaveButtonDisabled = false;
            this.changesMade = false;
            if (!!res && res.success) {
              this.reloadMainGrid = true;
            } else {
              this.dialogService.alert(
                'Add Project Contact',
                `There was an issue Adding Project Contact, Please try again later.`,
                'OK'
              );
            }
            this.closeModal();
          },
          (error: any) =>
            console.log('Error occurred while Adding Project Contact.', error),
          () => {}
        )
    );
  }

  getTitle(operation) {
    switch (operation) {
      case 'ATM':
        this.modalTitle = 'Add Team Member';
        break;
      case 'ATU':
        this.modalTitle = 'Add Temporary User';
        break;
      case 'AC':
        this.modalTitle = 'Add Contact';
        break;
      case 'ETM':
        this.modalTitle = 'Edit Team Member';
        break;
      case 'ETU':
        this.modalTitle = 'Edit Temporary User';
        break;
    }
  }

  closeModal() {
    this.dialogRef.close(this.reloadMainGrid);
  }

  getMembers(
    search: string,
    all: boolean,
    pageSize: number,
    pageNumber: number
  ) {
    return this.dashboardService
      .getMembersList(search, all, pageSize, pageNumber)
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          console.log('ERROR occurred while getting Members List: ', error);
          return of(error);
        })
      );
  }

  getUserPreferences(): Observable<any> {
    return this.dashboardService.GetUserPreferences().pipe(
      filter((res) => !!res && !!res.success),
      map((res) => this.cardsService.setUserDateFormat(res.data.isDatesEU))
    );
  }

  getClientSettingPreferences(): Observable<any> {
    return this.dashboardService
      .getClientPreference('ClientProjectsPrivate')
      .pipe(
        filter((res) => !!res && !!res.success),
        tap((res) => (this.clientSettingPreference = res.data)),
        catchError((error) => {
          console.log(
            'ERROR occurred while getting Client Setting Preferences: ',
            error
          );
          return of(error);
        })
      );
  }

  public getProjectAssignedTaskList(projectId) {
    this.subs.push(
      this.dashboardService.getProjectTaskList(projectId).subscribe(
        (res: any) => {
          this.projectTaskList = res.data.map((task) => ({
            ...task,
            formattedTaskName: this.formatStepText(task),
          }));

          this.taskNamesLookup = this.createSortedTaskNameLookup(
            this.projectTaskList
          );
        },
        (error: any) =>
          console.log('Error occurred getting Project Task List ', error),
        () => {}
      )
    );
  }

  onAssignedTaskSelectionChanged(event) {
    this.assignedTasksChanged = true;
    let changeAssignment, tasks;

    if (event.currentDeselectedRowKeys.length) {
      changeAssignment = UNASSIGN_TASK;
      tasks = event.currentDeselectedRowKeys;
    } else {
      changeAssignment = ASSIGN_TASK;
      tasks = event.currentSelectedRowKeys;
    }

    tasks.forEach((taskId) => {
      if (
        this.memberTasks.assignTasks.some(
          (memberTask) => memberTask.taskID == taskId
        )
      ) {
        this.memberTasks.assignTasks.find(
          (memberTask) => memberTask.taskID == taskId
        ).isAdd = changeAssignment;
      } else if (changeAssignment == ASSIGN_TASK) {
        this.memberTasks.assignTasks.push({ isAdd: 1, taskID: taskId });
      }
    });
  }

  async onOptionChanged(event) {
    // when the filter changes, we need to exclude values not within the filter
    if (event.name === 'columns' && event.fullName.includes('filterValues')) {
      var selectedRows = this.dataGrid.instance.getSelectedRowsData();

      // get a list of keys to deselect from the grid
      const keys = selectedRows
        .filter(
          // filter out the rows that match the filter
          ({ formattedTaskName }) => !event.value.includes(formattedTaskName)
        )
        .map(({ taskId }) => taskId);

      await this.dataGrid.instance.deselectRows(keys);
    }
  }

  formatStepText(task) {
    return `${task.step}) ${task.taskName}`;
  }

  public getOutstandingRoles(projectId) {
    this.subs.push(
      this.dashboardService.getOutstandingRolesforTask(projectId).subscribe(
        (res: any) => {
          this.outstandingRoles = res.data;
          if (this.outstandingRoles.length) {
            this.outstandingRolesHelpText = this.outstandingRoles
              .map((role) => role.projectMilestoneRole)
              .join(', \n');
          }
        },
        (error: any) =>
          console.log('Error occurred getting Outstanding Roles ', error),
        () => {}
      )
    );
  }

  ngOnDestroy() {
    this.membersSearchInput$.unsubscribe();
    this.subs.forEach((s) => s.unsubscribe());
  }

  private determineSharedToggleText() {
    this.sharedToggleText = this.sharedChecked
      ? 'If ON, any member of user’s primary group will be able to access this project.'
      : 'If OFF, any member of user’s primary group will NOT be able to access this project.';
  }

  private executeFieldValidation(validationResult: any) {
    this.nameFieldInvalid = !this.determineIsValidFromValidationResult(
      validationResult,
      'nameValidator'
    );
    this.firstNameFieldInvalid = !this.determineIsValidFromValidationResult(
      validationResult,
      'firstNameValidator'
    );
    this.lastNameFieldInvalid = !this.determineIsValidFromValidationResult(
      validationResult,
      'lastNameValidator'
    );
    this.emailAddressFieldInvalid = !this.determineIsValidFromValidationResult(
      validationResult,
      'emailAddressValidator'
    );
    this.roleFieldInvalid = !this.determineIsValidFromValidationResult(
      validationResult,
      'roleValidator'
    );
    this.levelFieldInvalid = !this.determineIsValidFromValidationResult(
      validationResult,
      'levelValidator'
    );
    this.expirationTypeFieldInvalid =
      !this.determineIsValidFromValidationResult(
        validationResult,
        'expirationTypeValidator'
      );
    this.expirationDateFieldInvalid =
      !this.determineIsValidFromValidationResult(
        validationResult,
        'expirationDateValidator'
      );

    let validationStrArray: string[] = [];
    const requiredMsg = 'You have left at least one required field empty.';

    if (
      this.nameFieldInvalid ||
      this.firstNameFieldInvalid ||
      this.lastNameFieldInvalid ||
      this.roleFieldInvalid ||
      this.levelFieldInvalid ||
      this.expirationTypeFieldInvalid ||
      this.expirationDateFieldInvalid
    ) {
      validationStrArray.push(requiredMsg);
    }

    if (this.emailAddressFieldInvalid) {
      const foundValidator = validationResult.validators.find(
        (v) => v._validationInfo.result.name === 'emailAddressValidator'
      );
      const ruleBroken = foundValidator._validationInfo.result.brokenRule.type;

      if (ruleBroken === 'required') {
        if (validationStrArray.length === 0) {
          validationStrArray.push(requiredMsg);
        }
      } else if (ruleBroken === 'email') {
        validationStrArray.push(
          'The email address is not in the correct format required for an email address.'
        );
      } else {
        validationStrArray.push(this.duplicateEmailMsg);
      }
    }

    validationStrArray.push('\r\nPlease update and try again.');

    this.dialogService.alert(
      'Validation Error(s)',
      validationStrArray.join('\r\n'),
      'OK'
    );
  }

  private determineIsValidFromValidationResult(
    validationResult: any,
    validatorName: string
  ) {
    const foundValidator = validationResult.validators.find(
      (v) => v._validationInfo.result.name === validatorName
    );

    if (foundValidator === undefined) {
      return true;
    } else {
      return foundValidator._validationInfo.result.isValid;
    }
  }

  /**
   * Creates a sorted lookup for task names based on their indexOrder.
   *
   * This function takes a data source containing task information,
   * ensures each task has a valid index order, sorts the tasks based
   * on this order, and then maps them to a lookup format.
   *
   * @param {Array<{ indexOrder?: number; formattedTaskName: string }>} dataSource - The array containing task information.
   * @returns {Array<{ value: string; text: string }>} - The sorted task name lookup array.
   */
  createSortedTaskNameLookup(
    dataSource: Array<any>
  ): Array<{ value: string; text: string }> {
    return (
      dataSource
        // Map each item to ensure it has a valid indexOrder. If not provided, set to Number.MAX_VALUE.
        .map((item) => ({
          ...item,
          indexOrder:
            item.indexOrder !== undefined ? item.indexOrder : Number.MAX_VALUE,
        }))
        // Sort items by indexOrder in ascending order.
        .sort((a, b) => a.indexOrder - b.indexOrder)
        // Map the sorted items to a lookup format containing 'value' and 'text' keys.
        .map(({ formattedTaskName }) => ({
          value: formattedTaskName,
          text: formattedTaskName,
        }))
    );
  }

  sortByTaskIndexOrder(row: any): number {
    return row.indexOrder;
  }
}
