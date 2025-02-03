/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, of, Subscription } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import {
  Team,
  TeamMember,
  contactMember,
  MemberInfo,
} from '@mango/data-models/lib-data-models';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import dxSelectBox from 'devextreme/ui/select_box';
import { InputComponent } from '@mango/ui-shared/lib-ui-elements';

@Component({
  selector: 'add-edit-Team-popup',
  templateUrl: './add-edit-team.component.html',
  styleUrls: ['./add-edit-team.component.scss'],
})
export class AddEditTeamComponent implements OnInit {
  @ViewChild('SelectedMembersGrid') selectedMembersGrid: DxDataGridComponent;
  @ViewChild('TeamNameTextBox') teamNameTextBox: InputComponent;

  public modalTitle: string;
  public modalId: string = 'addEditTeamModal';
  public closeButton = true;

  dateFormat: string;
  dateTimeFormat: string;
  filteredMembers: contactMember[];
  teamName: string;
  team: Team;
  teamMembers: TeamMember[];
  memberInfo: MemberInfo;
  selectedMemberIds: number[];
  selectedMembers: TeamMember[];
  allTeamNames: string[] = [];
  searchMember: string;
  inputSubscription$;
  isDropDownBoxOpened = false;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  initLoad: boolean = true;
  teamFunction: string;
  noDataText: string = 'No members added yet.  Add members to get started.';
  removeDisabled: boolean = true;
  addTeam: boolean = false;
  changesMade: boolean = false;
  saveBtnClicked: boolean = false;
  showShareColumn = false;
  teamMemberInfo: string = `This team member is either no longer active or has Allow Log On set to No. 
                            Please consider replacing this team member or updating their User record.`;

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  clientEmailPreference: boolean;
  subs: Subscription[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddEditTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    let allMembers = false;
    let pageSize = 10;
    let pageNumber = 1;

    this.showShareColumn =
      this.data.projectsPrivateSetting > 0 &&
      this.data.projectsPrivateSetting <= 2;
    this.memberInfo = this.data.memberInfo;
    this.clientEmailPreference = this.data.ceConfig.clientEmailPreference; // this should be captured in a "client experience" service that can be shared across all components.

    this.allTeamNames = this.data.teamNames;
    this.team = <Team>{};
    this.team.teamMembers = [];
    if (this.data.teamFunction == 'add') {
      this.modalTitle = 'Add Team';
      this.addTeam = true;
      this.team.teamName = '';
    } else {
      this.team.teamId = this.data.team.teamId;
      this.team.teamName = this.data.team.teamName;
      this.team.securityLevel = this.data.team.securityLevel;
      this.data.team.teamMembers.forEach((member) =>
        this.team.teamMembers.push(Object.assign({}, member))
      );
      this.modalTitle = 'Edit Team';
    }

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
      });
  }

  searchTeamMembers(val: string) {
    this.membersSearchInput$.next(val);
  }

  focusOnDropDownInput(e) {
    this.isDropDownBoxOpened = false;
    setTimeout(function () {
      e.component.focus();
    });
    this.isDropDownBoxOpened = true;
  }

  teamNameChange(teamName: string) {
    this.teamName = teamName;
    this.team.teamName = teamName;
    this.changesMade = true;
  }

  toggleList() {
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }

  removeMember(contactId) {
    this.team.teamMembers = this.team.teamMembers.filter(
      (member) => member.contactId !== contactId
    );
    this.filteredMembers = [...this.filteredMembers]; //to re-render the list and set attributes
    this.changesMade = true;
  }

  removeMembers() {
    let confirmText = 'Do you want to Remove the members ?\n\n';
    this.selectedMembers.forEach((member) => {
      confirmText += member.name + '\n';
    });

    this.dialogService
      .confirm('Remove Members', confirmText, 'Confirm', 'Cancel')
      .pipe(
        filter((confirmed) => !!confirmed),
        switchMap((_) => {
          let removeIndex: number;
          this.selectedMemberIds.forEach((contactId) => {
            removeIndex = this.team.teamMembers.findIndex(
              (member) => contactId == member.contactId
            );
            this.team.teamMembers.splice(removeIndex, 1);
          });
          this.filteredMembers = [...this.filteredMembers];
          this.changesMade = true;
          return of();
        })
      )
      .subscribe();
  }

  setRoleValue(newData, value: string) {
    (this as any).defaultSetCellValue(newData, value);
    this.changesMade = true; //here 'this' refers to the column object
  }

  setLevelValue(newData, value) {
    if (value === 99) return; // 99 == 'N/A'
    newData.level = value;
    this.changesMade = true; //here 'this' refers to the column object
  }

  editorPreparing(e) {
    if (
      e.parentType === 'dataRow' &&
      (e.dataField == 'role' || e.dataField == 'level') &&
      e.changesMade
    ) {
      this.changesMade = true;
    }

    if (e.parentType === 'dataRow' && e.dataField === 'level') {
      e.editorOptions.dataSource = {
        store: {
          type: 'array',
          data: this.memberInfo.levels,
        },
        postProcess: function (data) {
          let newData = data.map((level) => {
            if (level.value == 99) {
              level.visible = false;
            }

            return level;
          });
          return newData;
        },
      };
    }

    if (e.dataField === 'role') {
      e.editorOptions.onOpened = (args: any) => {
        const overlayWrapper = document.querySelector('.dx-overlay-wrapper');
        if (overlayWrapper) {
          overlayWrapper.classList.add('aetRoleCustomClass');
        }
      };
    }
  }

  emailtoggle(member, e) {
    member.emailOn = e.checked;
    this.changesMade = true;
  }

  sharedtoggle(member, e) {
    member.share = e.checked;
    this.changesMade = true;
  }

  onItemRendered(e) {
    if (this.team.teamMembers && this.team.teamMembers.length) {
      this.team.teamMembers.forEach((member) => {
        if (member.contactId == e.itemData.contactID) {
          this.setListItemAttributes(e);
        }
      });
    }
  }

  onItemClicked(e) {
    let teamMember = <TeamMember>{};
    teamMember.company = e.itemData.Company;
    teamMember.email = e.itemData.Email;
    teamMember.name = e.itemData.Name;
    teamMember.companyId = e.itemData.companyID;
    teamMember.contactId = e.itemData.contactID;
    teamMember.phoneNumber = '';
    teamMember.emailOn = this.clientEmailPreference;
    teamMember.role = '';
    teamMember.level = 1;
    teamMember.memberId = 0;
    teamMember.teamId = 0;
    teamMember.allowLogOn = true;
    teamMember.isActive = true;
    teamMember.share =
      this.data.projectsPrivateSetting === 1 ||
      this.data.projectsPrivateSetting === 3;

    this.team.teamMembers.push(teamMember);
    this.changesMade = true;
    this.setListItemAttributes(e);
  }

  onMemberSelectionChanged(e) {
    this.selectedMemberIds = e.selectedRowKeys;
    this.selectedMembers = e.selectedRowsData;
    if (this.selectedMemberIds.length > 1) this.removeDisabled = false;
    else {
      this.removeDisabled = true;
    }
  }

  setAttributes(e) {
    if (this.initLoad) {
      this.selectedMembersGrid.instance.refresh(); //this adjusts the uneven heights of the coloumns
      this.initLoad = false;
    }

    setTimeout(() => {
      const inputElements = Array.from(
        document.getElementsByClassName('dx-texteditor-input')
      );
      inputElements?.forEach((ele) => {
        ele.setAttribute('aria-label', 'select option');
        ele.setAttribute('name', 'selectionOption');
      });
    });
  }

  saveTeam() {
    this.saveBtnClicked = true;
    this.team.teamName = this.team.teamName.trim();
    if (!this.team.teamName) {
      this.teamNameTextBox.focusTextBox();
      this.dialogService
        .alert('Team Name', 'Team Name is a required field.', 'OK')
        .subscribe();
      this.saveBtnClicked = false;
      return;
    } else if (
      this.allTeamNames.indexOf(this.team.teamName.toLowerCase()) > -1
    ) {
      this.dialogService
        .alert(
          'Team Name Duplicated',
          'There is another team with the same name. Please re-name this team template or edit existing team template as needed.',
          'OK'
        )
        .subscribe();
      this.saveBtnClicked = false;
      return;
    } else if (!this.team.teamMembers || !this.team.teamMembers.length) {
      this.dialogService
        .alert(
          'Team Member',
          'Add at least one team member in order to save.',
          'OK'
        )
        .subscribe();
      this.saveBtnClicked = false;
      return;
    } else {
      if (this.addTeam) {
        this.team.teamId = 0;
        this.team.securityLevel = 'Delete';
      }

      this.subs.push(
        this.dashboardService.addTeam(this.team).subscribe(
          (res: any) => {
            if (!res || !res.success) {
              this.saveBtnClicked = false;
              if (
                res.errorMessage != null &&
                res.errorMessage.startsWith('The team:') &&
                res.errorMessage.indexOf('already exists') > 0
              ) {
                this.dialogService.alert(
                  'Team Name Duplicated',
                  'There is another team with the same name. Please re-name this team template as needed.',
                  'OK'
                );
              } else {
                this.dialogService.alert(
                  'Save Not Successful!',
                  `There was an issue with saving this team. Please review and try again later`,
                  'OK'
                );
              }
            } else {
              this.notifyTeamSaveSuccess();
              this.dialogRef.close('true');
            }
          },
          (error: any) =>
            console.log('Error occurred While Saving Team', error),
          () => {}
        )
      );
    }
  }

  private notifyTeamSaveSuccess() {
    this.dashboardService.successNotify('Team Saved Successfully');
    return EMPTY;
  }

  public cancelChanges() {
    if (this.changesMade) {
      this.dialogService
        .confirm(
          'Changes Made!',
          'Changes you made have not been saved. Would you like to continue editing or leave ?',
          'Continue',
          'Leave'
        )
        .pipe(
          switchMap((res) => {
            if (!res) {
              this.dialogRef.close('');
            }
            return of();
          })
        )
        .subscribe();
    } else {
      this.dialogRef.close('');
    }
  }

  setListItemAttributes(e) {
    const listItem = e.itemElement as HTMLElement;
    listItem.style.pointerEvents = 'none';
    listItem.classList.add('aet-itemDisabled');
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

  onKeyDown(event) {
    if (event.event.key === 'Enter' || event.event.key === ' ') {
      const gridInstance = this.selectedMembersGrid.instance;
      const focusedColumn = gridInstance.option('focusedColumnIndex');
      const focusedIndex = gridInstance.option('focusedRowIndex');
      if (focusedColumn !== undefined && focusedIndex !== -1) {
        const datafield =
          gridInstance.getVisibleColumns()[focusedColumn]?.dataField;
        if (datafield === 'role' || datafield === 'level') {
          const srcElement = gridInstance.getCellElement(
            focusedIndex,
            datafield
          );
          if (srcElement) {
            const selectBoxInstance = dxSelectBox.getInstance(
              srcElement.querySelector('.dx-selectbox')
            ) as dxSelectBox;
            if (selectBoxInstance) {
              const isOpened = selectBoxInstance.option('opened');
              isOpened ? selectBoxInstance.close() : selectBoxInstance.open();
              selectBoxInstance.focus();
              event.event.preventDefault();
            }
          }
        }
      }
    }
  }

  adaAttrNoDataGrid(e: any) {
    const dxGridwithTables = e.component
      .$element()
      .find('.dx-datagrid-headers.dx-bordered-top-view');
    if (dxGridwithTables && dxGridwithTables.length > 0) {
      for (let i = 0; i < dxGridwithTables.length; i++) {
        const element = dxGridwithTables[i];
        if (element) {
          element.setAttribute('role', 'grid');
        }
      }
    }
  }

  ngOnDestroy() {
    this.membersSearchInput$.unsubscribe();
    this.subs.forEach((s) => s.unsubscribe());
  }
}
