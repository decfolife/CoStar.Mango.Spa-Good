import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { deepCopy } from '@mango/core-shared';
import { ApprovalDetail } from '@mango/data-models/lib-data-models';
import { DropdownComponent } from '@mango/ui-shared/lib-ui-elements';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TaskInfoComponent } from '../../task-info.component';

interface AddRemoveContactIdLists {
  addContactIdList: number[];
  removeContactIdList: number[];
}

@Component({
  selector: 'mango-add-edit-task-assignees',
  templateUrl: './add-edit-task-assignees.component.html',
  styleUrls: ['./add-edit-task-assignees.component.scss'],
})
export class AddEditTaskAssigneesComponent implements OnInit, OnDestroy {
  @ViewChild('AssigneesGrid') assigneesGrid: DxDataGridComponent;
  @ViewChild('AssigneesDropdown') assigneesDropdown: DropdownComponent;

  modalTitle = 'Edit Assignees';
  modalId: string = 'addEditTaskAssigneesModal';
  subs: Subscription[] = [];
  userDateFormat: string;
  dragPosition: any;
  assigneesSaved = false;
  saveTaskAssigneesResult: any;
  taskAssignees: ApprovalDetail[];
  initialDropdownSelectedAssignees: number[] = [];
  selectedAssignees: number[] = [];
  removeButtonDisabled: boolean = true;
  faCircleMinus = faCircleMinus;
  assigneesDropdownList: any[] = [];
  private originalTaskAssignees: ApprovalDetail[];
  private projectId: number;
  private taskId: number;
  selectedTaskId: number;
  disableSaveBtn: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    private dialog: MatDialog,

    public dialogRef: MatDialogRef<AddEditTaskAssigneesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //do not modify originalTaskAssignees. This will be used to determine which users to add and remove
    this.projectId = data.projectId;
    this.taskId = data.taskId;
    this.originalTaskAssignees = data.taskAssignees;
    //This is here to create a separate taskAssignees object.  We want to keep the original so that we
    //can compare the original to the modified one to add or remove assignees.
    this.taskAssignees = deepCopy(data.taskAssignees); // deep-copy assignees
    this.userDateFormat = data.userDateFormat;
    this.dragPosition = data.dragPosition;
  }

  async ngOnInit() {
    this.updateSaveTaskAssigneesResult();
    this.getListOfAssigneesForDropdown();
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  closeModal() {
    this.dialogRef.close(this.saveTaskAssigneesResult);
  }

  getDragPosition(e) {
    this.dragPosition = e.source.getFreeDragPosition();
    this.updateSaveTaskAssigneesResult();
  }

  gridSelectionChanged(e) {
    this.removeButtonDisabled =
      this.assigneesGrid.instance.getSelectedRowsData().length <= 0;
  }

  selectedAssigneesEvent(e) {
    let idLists = this.returnAddAndRemoveContactIdLists(this.taskAssignees, e);
    this.removeAssigneesFromTaskAssignees(idLists.removeContactIdList);
    this.addAssigneesToTaskAssignees(idLists.addContactIdList);
  }

  removeAssigneeButtonClick(contactID: number) {
    this.removeAssigneesFromTaskAssignees([contactID]);
    this.assigneesDropdown.writeValue(
      this.taskAssignees.map((ea) => ea.contactID)
    );
  }

  removeSelectedAssigneesButtonClick() {
    let removeList = this.assigneesGrid.instance.getSelectedRowsData();
    let removeListContactIds = removeList.map((ele) => ele.contactID);

    if (removeList.length <= 0) {
      this.dialogService.alert(
        'Remove Assignees Error',
        'There was no assignees selected to remove.',
        'OK'
      );
      return;
    }

    this.removeAssigneesFromTaskAssignees(removeListContactIds);
    this.assigneesDropdown.writeValue(
      this.taskAssignees.map((ea) => ea.contactID)
    );
  }

  cancelChanges() {
    const idLists: AddRemoveContactIdLists =
      this.returnAddAndRemoveContactIdLists(
        this.originalTaskAssignees,
        this.taskAssignees
      );
    if (
      idLists.addContactIdList.length > 0 ||
      idLists.removeContactIdList.length > 0
    ) {
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
              this.closeModal();
              this.data.addEditRef?.close(this.data.reloadTasksGrid);
            } else {
              return of();
            }
            return of();
          })
        )
        .subscribe();
    } else {
      this.closeModal();
    }
  }
  saveAssigneesButtonClick() {
    this.disableSaveBtn = true;
    let alertClosedOnSuccess: Observable<boolean> = of(false);
    const idLists: AddRemoveContactIdLists =
      this.returnAddAndRemoveContactIdLists(
        this.originalTaskAssignees,
        this.taskAssignees
      );

    if (
      idLists.addContactIdList.length <= 0 &&
      idLists.removeContactIdList.length <= 0
    ) {
      alertClosedOnSuccess = this.dialogService.alert(
        'Save Assignees',
        'The list of assignees is the same as the one already saved. No changes were made.',
        'OK'
      );

      alertClosedOnSuccess.subscribe((res) => {
        if (!!res && res) {
          this.closeModal();
          this.data.addEditRef.close();
        }
      });
      this.disableSaveBtn = false;
      return;
    }

    this.subs.push(
      this.dashboardService
        .saveAssignees(
          this.taskId,
          idLists.addContactIdList,
          idLists.removeContactIdList
        )
        .pipe(
          switchMap((saveRes) => {
            if (!!saveRes && saveRes.success) {
              this.assigneesSaved = true;
              this.updateSaveTaskAssigneesResult();
              alertClosedOnSuccess = this.dialogService.alert(
                'Save Assignees',
                'The assignees was saved successfully.',
                'OK'
              );
            } else {
              this.dialogService.alert(
                'Save Assignees Error',
                'There was an issue with saving the assignees. Please contact the system administrator.',
                'OK'
              );
            }
            this.disableSaveBtn = false;
            return alertClosedOnSuccess;
          })
        )
        .subscribe((res) => {
          if (!!res && res) {
            this.closeModal();
          }
          this.disableSaveBtn = false;
        })
    );
  }

  private returnAddAndRemoveContactIdLists(
    originalAssigneesList: any[],
    newAssigneesList: any[]
  ): AddRemoveContactIdLists {
    const newContactIdsList = newAssigneesList.map((ta) => ta.contactID);
    const orginalContactIdsList = originalAssigneesList.map(
      (ta) => ta.contactID
    );
    const addContactIdList = newContactIdsList.filter(
      (conId) => orginalContactIdsList.indexOf(conId) < 0
    );
    const removeContactIdList = orginalContactIdsList.filter(
      (conId) => newContactIdsList.indexOf(conId) < 0
    );

    return { addContactIdList, removeContactIdList };
  }

  private removeAssigneesFromTaskAssignees(contactIdsToRemove: number[]) {
    if (contactIdsToRemove.length <= 0) return;

    //get the ones not found in the contactIdsToRemove array
    let filteredArray = this.taskAssignees.filter(
      (ta) => contactIdsToRemove.indexOf(ta.contactID) < 0
    );
    this.taskAssignees = filteredArray;
  }

  private addAssigneesToTaskAssignees(contactIdsToAdd: number[]) {
    if (contactIdsToAdd.length <= 0) return;

    let filteredArray = this.originalTaskAssignees.filter(
      (ta) => contactIdsToAdd.indexOf(ta.contactID) >= 0
    );
    filteredArray.forEach((ele) => this.taskAssignees.push(ele));

    //if not in the original originalTaskAssignees, add a new object
    let remainingIds = contactIdsToAdd.filter(
      (cid) => filteredArray.map((ele) => ele.contactID).indexOf(cid) < 0
    );
    if (remainingIds.length <= 0) {
      return;
    }

    let newAssigneesToAdd = this.assigneesDropdownList.filter(
      (ele) => remainingIds.indexOf(ele.contactID) >= 0
    );

    this.taskAssignees.push(
      ...newAssigneesToAdd.map<ApprovalDetail>((ele) => ({
        contactID: ele.contactID,
        contactName: ele.fullName,
        approvalStatus: 'Pending',
        approvalDate: null,
        userApprovalDate: null,
        rejectDate: null,
        projectMilestoneRequired: null,
        contactEMailAddress: null,
        contactConsolidatedEmails: null,
        emailOn: null,
        emailNotifications: null,
        contactActive: null,
        actualStartDate: null,
        hoursToDate: null,
        hoursLastUpdated: null,
        proxyContactID: null,
        proxyContactName: null,
        projectMilestoneApprovalID: null,
        systemDate: null,
      }))
    );

    this.deferredGridRefresh();
  }

  private getListOfAssigneesForDropdown() {
    this.subs.push(
      this.dashboardService
        .getAllApprovers(this.projectId, this.taskId)
        .pipe(
          tap((res) => {
            if (!!res && res.success) {
              const mergedList = res.data.potentialApprovers.concat(
                res.data.existingApprovers
              );
              this.assigneesDropdownList = mergedList.sort((a, b) =>
                a.fullName > b.fullName ? 1 : b.fullName > a.fullName ? -1 : 0
              );
              this.initialDropdownSelectedAssignees =
                res.data.existingApprovers.map((ea) => ea.contactID);
            } else {
              this.dialogService.alert(
                'Get Assignees To Add Error',
                'There was an issue with getting the list of assignees to add. Please contact the system administrator.',
                'OK'
              );
            }
            this.deferredGridRefresh();
          })
        )
        .subscribe()
    );
  }

  private deferredGridRefresh() {
    setTimeout(() => {
      this.assigneesGrid.instance.refresh();
    }, 0);
  }

  private updateSaveTaskAssigneesResult() {
    this.saveTaskAssigneesResult = {
      saveSuccessful: this.assigneesSaved,
      newDragPosition: this.dragPosition,
    };
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
}
