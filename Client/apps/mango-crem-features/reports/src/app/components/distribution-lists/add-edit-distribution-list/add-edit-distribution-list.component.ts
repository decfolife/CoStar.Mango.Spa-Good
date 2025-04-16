import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, of, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import {
  contactMember,
  DistributionListMember,
  DistributionList,
} from '@mango/data-models/lib-data-models';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { DxDataGridComponent } from 'devextreme-angular';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { InputComponent } from '@mango/ui-shared/lib-ui-elements';
import { DistributionListsService } from '../distribution-lists.service';

@Component({
  selector: 'mango-add-edit-distribution-list',
  templateUrl: './add-edit-distribution-list.component.html',
  styleUrls: ['./add-edit-distribution-list.component.scss'],
})
export class AddEditDistributionListComponent {
  @ViewChild('SelectedMembersGrid') selectedMembersGrid: DxDataGridComponent;
  @ViewChild('DistributionListNameTextBox')
  distributionListNameTextBox: InputComponent;

  public modalTitle: string;
  public modalId: string = 'addEditDistributionListModal';
  public closeButton = true;

  dateFormat: string;
  dateTimeFormat: string;
  filteredMembers: contactMember[];
  distributionListName: string;
  distributionList: DistributionList;
  members: DistributionListMember[];
  selectedMemberIds: number[];
  selectedMembers: DistributionListMember[];
  allDistListNames: string[] = [];
  searchMember: string;
  inputSubscription$;
  isDropDownBoxOpened = false;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  initLoad: boolean = true;
  typeFunction: string;
  noDataText: string = 'No members added yet.  Add members to get started.';
  removeDisabled: boolean = true;
  addDistributionList: boolean = false;
  changesMade: boolean = false;
  saveBtnClicked: boolean = false;
  memberInfoStr: string = `This member is either no longer active or has Allow Log On set to No. 
                            Please consider replacing this distribution list member or updating their User record.`;

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  subs: Subscription[] = [];

  constructor(
    private distributionListsService: DistributionListsService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddEditDistributionListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    let allMembers = false;
    let pageSize = 10;
    let pageNumber = 1;

    this.allDistListNames = this.data.distributionListNames;
    this.distributionList = <DistributionList>{};
    this.distributionList.members = [];
    if (this.data.typeFunction == 'add') {
      this.modalTitle = 'Add Distribution List';
      this.addDistributionList = true;
      this.distributionList.groupName = '';
    } else {
      this.distributionList.groupID = this.data.distributionList.groupID;
      this.distributionList.groupName = this.data.distributionList.groupName;
      this.distributionList.securityLevel =
        this.data.distributionList.securityLevel;
      this.data.distributionList.members.forEach((member) =>
        this.distributionList.members.push(Object.assign({}, member))
      );
      this.modalTitle = 'Edit Distribution List';
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

  searchDistributionListMembers(val: string) {
    this.membersSearchInput$.next(val);
  }

  focusOnDropDownInput(e) {
    this.isDropDownBoxOpened = false;
    setTimeout(function () {
      e.component.focus();
    });
    this.isDropDownBoxOpened = true;
  }

  distributionListNameChange(groupName: string) {
    this.distributionListName = groupName;
    this.distributionList.groupName = groupName;
    this.changesMade = true;
  }

  toggleList() {
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }

  removeMember(contactId) {
    this.distributionList.members = this.distributionList.members.filter(
      (member) => member.contactID !== contactId
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
            removeIndex = this.distributionList.members.findIndex(
              (member) => contactId == member.contactID
            );
            this.distributionList.members.splice(removeIndex, 1);
          });
          this.filteredMembers = [...this.filteredMembers];
          this.changesMade = true;
          return of();
        })
      )
      .subscribe();
  }

  onItemRendered(e) {
    if (this.distributionList.members && this.distributionList.members.length) {
      this.distributionList.members.forEach((member) => {
        if (member.contactID == e.itemData.contactID) {
          this.setListItemAttributes(e);
        }
      });
    }
  }

  onItemClicked(e) {
    let member = <DistributionListMember>{};
    member.company = e.itemData.Company;
    member.email = e.itemData.Email;
    member.name = e.itemData.Name;
    member.contactID = e.itemData.contactID;
    member.memberID = 0;
    member.groupID = 0;

    this.distributionList.members.push(member);
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

  saveDistributionList() {
    this.saveBtnClicked = true;
    this.distributionList.groupName = this.distributionList.groupName.trim();

    if (!this.distributionList.groupName) {
      this.distributionListNameTextBox.focusTextBox();
      this.subs.push(
        this.dialogService
          .alert(
            'Distribution List Name',
            'Distribution List Name is a required field.',
            'OK'
          )
          .subscribe()
      );
      this.saveBtnClicked = false;
      return;
    } else if (
      this.allDistListNames.indexOf(
        this.distributionList.groupName.toLowerCase()
      ) > -1
    ) {
      this.subs.push(
        this.dialogService
          .alert(
            'Distribution List Name Duplicated',
            'There is another distribution list with the same name. Please re-name this distribution list template or edit existing distribution list template as needed.',
            'OK'
          )
          .subscribe()
      );
      this.saveBtnClicked = false;
      return;
    } else if (
      !this.distributionList.members ||
      !this.distributionList.members.length
    ) {
      this.subs.push(
        this.dialogService
          .alert(
            'Distribution List Member',
            'Add at least one member in order to save.',
            'OK'
          )
          .subscribe()
      );
      this.saveBtnClicked = false;
      return;
    } else {
      if (this.addDistributionList) {
        this.distributionList.groupID = 0;
      }

      this.subs.push(
        this.distributionListsService
          .saveDistributionList(this.distributionList)
          .subscribe(
            (res: any) => {
              if (!res || !res.success) {
                this.saveBtnClicked = false;
                if (
                  res.clientErrorMessage != null &&
                  res.clientErrorMessage.startsWith('The distribution list:') &&
                  res.clientErrorMessage.indexOf('already exists') > 0
                ) {
                  this.subs.push(
                    this.dialogService
                      .alert(
                        'Distribution List Name Duplicated',
                        'There is another distribution list with the same name. Please re-name this distribution list template as needed.',
                        'OK'
                      )
                      .subscribe()
                  );
                } else {
                  this.subs.push(
                    this.dialogService
                      .alert(
                        'Save Not Successful!',
                        `There was an issue with saving this distribution list. Please review and try again later`,
                        'OK'
                      )
                      .subscribe()
                  );
                }
              } else {
                this.notifyDistributionListSaveSuccess();
                this.dialogRef.close('true');
              }
            },
            (error: any) =>
              console.log(
                'Error occurred While Saving Distribution List',
                error
              ),
            () => {}
          )
      );
    }
  }

  private notifyDistributionListSaveSuccess() {
    this.distributionListsService.successNotify(
      'Distribution List Saved Successfully'
    );
    return EMPTY;
  }

  public cancelChanges() {
    if (this.changesMade) {
      this.dialogService
        .confirm(
          'Changes Made!',
          'Changes you made have not been saved. Would you like to continue editing or leave?',
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
    listItem.classList.add('aedl-itemDisabled');
  }

  getMembers(
    search: string,
    all: boolean,
    pageSize: number,
    pageNumber: number
  ) {
    return this.distributionListsService
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
      }
    }
  }

  ngOnDestroy() {
    this.membersSearchInput$.unsubscribe();
    this.subs.forEach((s) => s.unsubscribe());
  }
}
