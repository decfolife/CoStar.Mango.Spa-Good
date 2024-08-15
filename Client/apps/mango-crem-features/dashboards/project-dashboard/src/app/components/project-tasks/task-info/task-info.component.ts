import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProjectTaskDropdownInfo, ContactRecord } from '@mango/data-models/lib-data-models';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { ApprovalDetail, ProjectTaskInfo, TaskDetails, TaskStatus } from 'libs/data-models/lib-data-models/src/lib/models/Projects/projectTaskInfo';
import { Observable, Subject, Subscription } from 'rxjs';
import { MangoAppFacade } from "@mangoSpa/src/app/+state/app/app.facade";
import { formatDate } from '@angular/common';
import { AddTaskNoteComponent } from './task-notes/add-task-note/add-task-note.component';
import { filter, map } from 'rxjs/operators';
import { AddEditTaskAssigneesComponent } from './task-assignees/add-edit-task-assignees/add-edit-task-assignees.component';

@Component({
  selector: 'mango-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent {

  modalTitle = "Task Info";
  modalId: string = "taskInfoModal";
  primaryButtonCaption: string = "Edit";
  cancelButtonText: string = null;
  taskInfoData: ProjectTaskInfo = <ProjectTaskInfo>{};
  subs: Subscription[] = [];
  notesGridStylesSet = false;
  projectId: number;
  selectedTaskName: string;
  taskId: number;
  taskParentId: number;
  taskStep: number;
  taskIndexOrder: number;
  taskSubTasksCount: number;
  isUserDatesEU: boolean = true;
  dateFormat: string;
  tinStatusBarColor: string;
  taskStatusVal: string = "";
  activeTabIndex = 0;
  taskInfoChanged = false;
  dragPosition: any = { x: 0, y: 0 };
  projectCurrentTasks: ProjectTaskDropdownInfo[];
  taskAssigneesCopy: ApprovalDetail[];
  showEditTask: boolean = false;
  
  //This is used to execute the function that adjusts the height of the textarea boxes
  notesTabClickedSubject: Subject<any> = new Subject();
  private taskInfoOverlayWrapper: any = null;
  private taskInfoClientRect: any = null; 
  private currentUserInfo$: Observable<ContactRecord>;

  constructor(private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskInfoComponent>,
    private facade: MangoAppFacade,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.projectId = data.projectId;
      this.taskId = data.taskId;
      this.projectCurrentTasks = data.projectCurrentTasks;
   }

   ngOnInit() {
    this.dragPosition = { x: 0, y: 0 };
    this.projectId = this.data.projectId;
    this.taskId = this.data.taskId;
    this.taskParentId = this.data.taskParentId;
    this.taskStep = this.data.taskStep;
    this.taskIndexOrder = this.data.taskIndexOrder;
    this.taskSubTasksCount = this.data.taskSubTasksCount;
    this.projectCurrentTasks = this.data.projectCurrentTasks;
    this.taskInfoData.taskInfo = <TaskDetails>{};
    this.taskInfoData.taskInfo.taskStatus = <TaskStatus>{};
    //this.taskInfoData.predecessors = [];
    this.taskInfoOverlayWrapper = this.getTaskInfoPopupOverlayWrapper();

    this.currentUserInfo$ = this.facade.contactRecord$;
    this.subs.push(this.currentUserInfo$.subscribe(contact => {
      this.isUserDatesEU = contact.preferences.contactDatesEU;
      this.dateFormat = this.isUserDatesEU ? 'dd.MM.yyyy' : 'MM/dd/yyyy' ;
    }));

    this.getTaskDetails();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  executeActionForTab() {
    this.taskInfoClientRect = null; 

    switch(this.activeTabIndex){
      case 0:
        let taskDetails = {taskId: this.taskId, taskParentId: this.taskParentId, taskStep: this.taskStep, taskIndexOrder: this.taskIndexOrder, taskSubTasksCount: this.taskSubTasksCount}
        this.dialogRef.close({reload: this.taskInfoChanged, showEditTask: true, taskDetails: taskDetails});
        break;
      case 1:
        //Set task taskInfoClientRect before hiding the task info popup.  All values will be 0 if it is hidden
        this.taskInfoClientRect = this.getTaskInfoPopupClientRect();
        this.hideTaskInfoPopup();
        this.openDialog("AddEditTaskAssigneesDialog");
        break;
      case 2:
        //Set task taskInfoClientRect before hiding the task info popup.  All values will be 0 if it is hidden
        this.taskInfoClientRect = this.getTaskInfoPopupClientRect();
        this.hideTaskInfoPopup();
        this.openDialog("AddNoteDialog");
        break;
      default:
        break;
    }
  }

  onTabChanged(e) {
    this.activeTabIndex = e;
    this.cancelButtonText = null;

    switch(e){
      case 0:
        this.primaryButtonCaption = "Edit";
        break;
      case 1:
        this.primaryButtonCaption = "Edit Assignees";
        break;
      case 2:
        this.primaryButtonCaption = "Add";
        this.notesTabClickedSubject.next();
        break;
      case 3:
        this.primaryButtonCaption = "Upload";
        break;
      default:
        this.primaryButtonCaption = "Save";
        break;
    }
  }

  closeModal() {
    this.dialogRef.close({reload: this.taskInfoChanged, showEditTask: false, taskDetails: null});
  }

  onSelectedTaskChanged(e) {
    this.taskId = e[0].taskId;
    this.taskParentId = e[0].taskParentId;
    this.taskStep = e[0].taskStepNumber;
    this.getTaskDetails();
  }

  formatTheDate(date: Date | null): string | null {
    if (!date) return null;
    return formatDate(date, this.dateFormat, 'en-US' )
  }

  getDragPosition(e) {
    this.dragPosition = e.source.getFreeDragPosition()
  }

  checkTaskStatus() {
      switch (this.taskInfoData.taskInfo.taskStatus.color) {
          case 'Red':
              this.tinStatusBarColor = 'tin-status-bar-red';
              this.taskStatusVal = 'Overdue';
              break;
          case 'Green':
              this.tinStatusBarColor = 'tin-status-bar-green';
              this.taskStatusVal = 'Complete';
              break;
          case 'Yellow':
              this.tinStatusBarColor = 'tin-status-bar-yellow';
              this.taskStatusVal = 'Due within 5 days';
              break;
          case 'Gray':
              this.tinStatusBarColor = 'tin-status-bar-gray';
              this.taskStatusVal = 'Not required';
              break;
          case 'White':
              this.tinStatusBarColor = 'tin-status-bar-white';
              this.taskStatusVal = 'Required';
              break;
          default:
              this.tinStatusBarColor = "tin-status-bar-lightGray";
              this.taskStatusVal = 'Unknown';
              break;
      }
  }

  private getTaskInfoPopupOverlayWrapper(): any {
    let overlayWrapper: any = null;
    let overlayElements = document.querySelectorAll(".cdk-overlay-container .cdk-global-overlay-wrapper");

    if(overlayElements.length > 0){
      overlayWrapper = overlayElements[0];
    }

    return overlayWrapper;
  }

  private hideTaskInfoPopup() {
    if(!!this.taskInfoOverlayWrapper) {
      this.taskInfoOverlayWrapper.style.setProperty('display', 'none');
    }
  }

  private showTaskInfoPopup(currentPopupPosition) {
    if(!!this.taskInfoOverlayWrapper){
      if(!!currentPopupPosition) {
        this.dragPosition = currentPopupPosition;
      }

      this.taskInfoOverlayWrapper.style.setProperty('display', 'flex');
    }
  }

  private getTaskInfoPopupClientRect(): any {
    //dialogPanelClass is the panelClass setting when opening the mat dialog
    let clientRect = null;

    if(!!this.taskInfoOverlayWrapper){
      let overlayPane = document.querySelectorAll(".cdk-overlay-pane.taskInfoModal");
      if(overlayPane.length > 0) {
        clientRect = overlayPane[0].getBoundingClientRect();
      }
    }

    return clientRect;
  }

  private getTaskDetails() {
    this.subs.push(this.dashboardService.getTaskDetails(this.projectId, this.taskId).subscribe(
      (res:any) => {
        if(res && res.success) {
          this.taskInfoData  = res.data;
          this.selectedTaskName = this.taskInfoData.taskInfo.projectMilestoneName;
          this.taskInfoData.taskInfo.projectMilestoneDescription = this.taskInfoData.taskInfo.projectMilestoneDescription 
                                                                  ? this.taskInfoData.taskInfo.projectMilestoneDescription.replace(/<br>/g, '\n') 
                                                                  : this.taskInfoData.taskInfo.projectMilestoneDescription;
          this.checkTaskStatus();
          this.setProgressAndDateUpdatedFields();
        }
        else {
          this.closeModal();
          this.dialogService.alert('Get Task Info Error', 'There was an issue with getting the task info. Please contact the system administrator.', 'OK');
        }
      }
    )); 
  }

  private setProgressAndDateUpdatedFields() {
    this.taskInfoData.approvers.forEach(ta => {
      if(!!ta.approvalDate) {
        ta.systemDate = ta.approvalDate;
      } else if(!!ta.rejectDate) {
        ta.systemDate = ta.rejectDate;
      } else {
        ta.systemDate = null;
      }
    });
  }

  private openDialog(dialogName: string) {
    let dialogHeight = '800px';
    let dialogWidth = '500px';
    const panClass = dialogName === "AddNoteDialog" ? "addTaskNoteModal" : dialogName === "AddEditTaskAssigneesDialog" ? "addEditTaskAssigneesModal" : "";

    if(!!this.taskInfoClientRect){
      dialogHeight = `${this.taskInfoClientRect.height}px`;
      dialogWidth = `${this.taskInfoClientRect.width}px`;
    }

    let openDialogRef: MatDialogRef<any,any>;

    if(dialogName === "AddNoteDialog") {
      openDialogRef = this.dialog.open(AddTaskNoteComponent, {
        height: dialogHeight,
        width: dialogWidth,
        panelClass: panClass,
        data: { taskId: this.taskId, dragPosition: this.dragPosition },
        disableClose: true
      });
    }
    else if(dialogName === "AddEditTaskAssigneesDialog"){
      openDialogRef = this.dialog.open(AddEditTaskAssigneesComponent, {
        height: dialogHeight,
        width: dialogWidth,
        panelClass: panClass,
        data: { projectId: this.projectId, taskId: this.taskId, taskAssignees: this.taskInfoData.approvers, userDateFormat: this.dateFormat, dragPosition: this.dragPosition },
        disableClose: true
      });
    }

    this.subs.push(openDialogRef.afterClosed().pipe(
      map(res => {
        this.showTaskInfoPopup(res.newDragPosition);
        return res.saveSuccessful;
      }),
      filter(reload => !!reload),
    ).subscribe((changesSaved) => {
      if(changesSaved) {
        this.getTaskDetails();
        //when changes are made to task assignees we want to refresh the tasks grid
        if(!this.taskInfoChanged)
        {
          this.taskInfoChanged = dialogName === "AddEditTaskAssigneesDialog";
        } 
      }
    }));
  }
}
