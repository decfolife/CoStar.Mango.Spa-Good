import { Component, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApprovalDetail } from '@mango/data-models/lib-data-models';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription, of } from 'rxjs';
import { DropdownComponent } from '@mango/ui-shared/lib-ui-elements';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { switchMap } from 'rxjs/operators';

interface  AddRemoveContactIdLists {
  addContactIdList: number[];
  removeContactIdList: number[];
}

@Component({
  selector: 'mango-add-edit-task-assignees',
  templateUrl: './add-edit-task-assignees.component.html',
  styleUrls: ['./add-edit-task-assignees.component.scss']
})

export class AddEditTaskAssigneesComponent {
  @ViewChild("AssigneesGrid") assigneesGrid: DxDataGridComponent;
  @ViewChild("AssigneesDropdown") assigneesDropdown: DropdownComponent;

  modalTitle = "Edit Assignees";
  modalId: string = "addEditTaskAssigneesModal";
  subs: Subscription[] = [];
  userDateFormat : string;
  dragPosition: any;
  assigneesSaved = false;
  saveTaskAssigneesResult: any;
  taskAssignees: ApprovalDetail[];
  initialDropdownSelectedAssignees: number[] =[];
  selectedAssignees: number[] =[];
  removeButtonDisabled: boolean = true;
  faCircleMinus = faCircleMinus;
  assigneesDropdownList: any[] = [];
  private originalTaskAssignees: ApprovalDetail[]
  private projectId: number;
  private taskId: number;

  constructor(private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<AddEditTaskAssigneesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      //do not modify originalTaskAssignees. This will be used to determine which users to add and remove
      this.projectId = data.projectId;
      this.taskId = data.taskId;
      this.originalTaskAssignees = data.taskAssignees;
      this.taskAssignees = JSON.parse(JSON.stringify(data.taskAssignees));
      this.userDateFormat = data.userDateFormat;
      this.dragPosition = data.dragPosition;
  }

  ngOnInit() {
    this.updateSaveTaskAssigneesResult();
    this.getListOfAssigneesForDropdown();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  closeModal() {
    this.dialogRef.close(this.saveTaskAssigneesResult);
  }

  getDragPosition(e) {
    this.dragPosition = e.source.getFreeDragPosition();
    this.updateSaveTaskAssigneesResult();
  }

  gridSelectionChanged(e) {
    this.removeButtonDisabled = this.assigneesGrid.instance.getSelectedRowsData().length <= 0;
  }

  selectedAssigneesEvent(e) {
    let idLists = this.returnAddAndRemoveContactIdLists(this.taskAssignees, e);
    this.removeAssigneesFromTaskAssignees(idLists.removeContactIdList);
    this.addAssigneesToTaskAssignees(idLists.addContactIdList);
  }

  removeAssigneeButtonClick(contactID: number) {
    this.removeAssigneesFromTaskAssignees([contactID]);
    this.assigneesDropdown.writeValue(this.taskAssignees.map(ea => ea.contactID));
  }

  removeSelectedAssigneesButtonClick() {
    let removeList = this.assigneesGrid.instance.getSelectedRowsData();
    let removeListContactIds = removeList.map(ele => ele.contactID);

    if(removeList.length <= 0) {
      this.dialogService.alert('Remove Assignees Error', 'There was no assignees selected to remove.', 'OK');
      return;
    }

    this.removeAssigneesFromTaskAssignees(removeListContactIds);
    this.assigneesDropdown.writeValue(this.taskAssignees.map(ea => ea.contactID));
  }

  saveAssigneesButtonClick() {
    let alertClosedOnSuccess: Observable<boolean> = of(false);
    let idLists: AddRemoveContactIdLists = this.returnAddAndRemoveContactIdLists(this.originalTaskAssignees, this.taskAssignees);

    if(idLists.addContactIdList.length <= 0 && idLists.removeContactIdList.length <= 0){
      alertClosedOnSuccess = this.dialogService.alert('Save Assignees', 'The list of assignees is the same as the one already saved. No changes were made.', 'OK');

      alertClosedOnSuccess.subscribe(res => {
        if(!!res && res) {
          this.closeModal();
        }
      });

      return;
    }

    this.subs.push(this.dashboardService.saveAssignees(this.taskId, idLists.addContactIdList, idLists.removeContactIdList).pipe(
      switchMap(saveRes => {
        if(!!saveRes && saveRes.success) {
          this.assigneesSaved = true;
          this.updateSaveTaskAssigneesResult();
          alertClosedOnSuccess = this.dialogService.alert('Save Assignees', 'The assignees was saved successfully.', 'OK');
        }
        else {
          this.dialogService.alert('Save Assignees Error', 'There was an issue with saving the assignees. Please contact the system administrator.', 'OK');
        }
        return alertClosedOnSuccess;
      })
      ).subscribe(res => {
        if(!!res && res) {
          this.closeModal();
        }
      }));
  }

  private returnAddAndRemoveContactIdLists(originalAssigneesList: any[], newAssigneesList: any[]) : AddRemoveContactIdLists {
    const newContactIdsList = newAssigneesList.map(ta => ta.contactID); 
    const orginalContactIdsList = originalAssigneesList.map(ta => ta.contactID); 
    const addContactIdList = newContactIdsList.filter(conId => orginalContactIdsList.indexOf(conId) < 0);
    const removeContactIdList = orginalContactIdsList.filter(conId => newContactIdsList.indexOf(conId) < 0);

    return { addContactIdList, removeContactIdList}
  }

  private removeAssigneesFromTaskAssignees(contactIdsToRemove: number[]) {
    if(contactIdsToRemove.length <= 0)
      return;

    //get the ones not found in the contactIdsToRemove array
    let filteredArray = this.taskAssignees.filter(ta => contactIdsToRemove.indexOf(ta.contactID) < 0);
    this.taskAssignees = filteredArray;
  }

  private addAssigneesToTaskAssignees(contactIdsToAdd: number[]) {
    if(contactIdsToAdd.length <= 0)
      return;

    let filteredArray = this.originalTaskAssignees.filter(ta => contactIdsToAdd.indexOf(ta.contactID) >= 0);
    filteredArray.forEach(ele =>  this.taskAssignees.push(ele));

    //if not in the original originalTaskAssignees, add a new object
    let remainingIds = contactIdsToAdd.filter(cid => filteredArray.map(ele => ele.contactID).indexOf(cid) < 0);
    if(remainingIds.length <= 0){
      return;
    }

    let newAssigneesToAdd = this.assigneesDropdownList.filter(ele => remainingIds.indexOf(ele.contactID) >= 0);
    newAssigneesToAdd.forEach(ele => {
      let newAssignee: ApprovalDetail = {
        contactID: ele.contactID,
        contactName: ele.fullName,
        approvalStatus: "Pending",
        approvalDate: null,
        userApprovalDate: null,
        rejectDate: null,
        projectMilestoneRequired: null,
        contactEMailAddress: null,
        contactConsolidatedEmails: null,
        emailOn: null,
        contactActive: null,
        actualStartDate: null,
        hoursToDate: null,
        hoursLastUpdated: null,
        proxyContactID: null,
        proxyContactName: null,
        projectMilestoneApprovalID: null,
        systemDate: null
      };

      this.taskAssignees.push(newAssignee);
    });
  }

  private getListOfAssigneesForDropdown() {
    this.subs.push(this.dashboardService.getAllApprovers(this.projectId, this.taskId).subscribe(res => {
      if(!!res && res.success) {
        let mergedList = res.data.potentialApprovers.concat(res.data.existingApprovers);
        this.assigneesDropdownList = mergedList.sort((a,b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0));
        this.initialDropdownSelectedAssignees = res.data.existingApprovers.map(ea => ea.contactID);
      }
      else {
        this.dialogService.alert('Get Assignees To Add Error', 'There was an issue with getting the list of assignees to add. Please contact the system administrator.', 'OK');
      }
    }));
  }

  private  updateSaveTaskAssigneesResult() {
    this.saveTaskAssigneesResult = { saveSuccessful: this.assigneesSaved, newDragPosition: this.dragPosition };
  }   
}
