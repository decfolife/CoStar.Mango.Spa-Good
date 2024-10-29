import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ButtonModule,
  CremFormsModule,
  DatePickerComponent,
  DatePickerModule,
  InputComponent,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';

import {
  ApproveRejectTaskRequest,
  ApproveRejectTasks,
  CLIENT_PREFERENCE,
} from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { REQUIRE_ACTUAL_START_DATE } from '@project-dashboard/models/constants/approve-reject-constants';
import { PROJECT_REQUIRE_TASK_NOTES } from '@project-dashboard/models/constants/project-tasks-constants';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { concatMap, first, map, tap } from 'rxjs/operators';
const APPROVE = 'Approve';
const REJECT = 'Reject';

@Component({
  selector: 'crem-task-approval-popup',
  standalone: true,
  imports: [
    CommonModule,
    CremFormsModule,
    ButtonModule,
    InputComponent,
    ModalModule,
    DatePickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-approve-or-reject.component.html',
  styleUrls: ['./task-approve-or-reject.component.scss'],
  providers: [DatePipe],
})
export class TaskApproveOrRejectComponent implements OnInit, OnDestroy {
  @ViewChild('NotesInput') notesInput: InputComponent;
  @ViewChild('ActualStartDatePicker')
  actualStartDatePicker: DatePickerComponent;
  @ViewChild('ApprovalDatePicker') approvalDatePicker: DatePickerComponent;
  isNotesFieldRequired: boolean = false;
  isActualStarDateRequired: boolean = true;
  taskAction: string = 'Approve';
  headerTaskName: string;
  reloadProjectsTasksGrid: boolean = false;
  taskData: any;
  dateFormat: string;
  taskActualStartDate: Date = null;
  taskApprovalDate: Date = null;
  taskApproveRejectForm: FormGroup;
  currentDate: Date;
  subs: Subscription[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    private datepipe: DatePipe,
    public dialogRef: MatDialogRef<TaskApproveOrRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facade: MangoAppFacade
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.dateFormat = this.data.dateFormat;
    this.taskAction = this.data.action;
    this.taskData = this.data.taskData;
    this.taskActualStartDate = this.data.taskData.ActualStartDate;
    this.isNotesFieldRequired = this.data.notesRequired;
    this.taskApprovalDate = new Date();
    this.headerTaskName = `${this.data.action} Task - ${this.data.taskData.ProjectMilestoneName}`;
    this.getActualDateRequiredFlag();

    this.taskApproveRejectForm = new FormGroup({
      notes: new FormControl('', [Validators.required]),
    });

    if (this.taskAction == APPROVE) {
      this.taskApproveRejectForm.addControl(
        'actualStartDate',
        new FormControl(this.taskActualStartDate, [Validators.required])
      );
      this.taskApproveRejectForm.addControl(
        'approvalDate',
        new FormControl(this.currentDate, [Validators.required])
      );
    }
  }

  onActualStartDateChange(e) {
    this.taskActualStartDate = e.value;
  }

  onApprovalDateChange(e) {
    this.taskApprovalDate = e.value;
  }

  getObjData(): Observable<ApproveRejectTasks> {
    return this.facade.currentProjectId$.pipe(
      first(),
      map((projectId) => {
        const taskData: ApproveRejectTaskRequest = {
          taskApprovalID: this.taskData.ApprovalID,
          actualStartDate:
            this.taskAction == APPROVE
              ? this.taskApproveRejectForm.get('actualStartDate').value
              : null,
          newHours: 0,
          userDate:
            this.taskAction == APPROVE
              ? this.taskApproveRejectForm.get('approvalDate').value
              : this.currentDate,
          isApproval: this.taskAction == APPROVE ? true : false,
          isProxyApproval: this.taskData.IsProxyUser == 1 ? true : false,
          notes: this.createFormattedTaskNote(
            this.taskAction,
            this.taskApproveRejectForm.get('notes').value,
            this.taskData
          ),
        };

        const approveOrRejectTaskData: ApproveRejectTasks = {
          isQuickApproval: false,
          projectId,
          approveRejectTasksRequestList: [taskData],
        };

        return approveOrRejectTaskData;
      })
    );
  }

  private createFormattedTaskNote(
    action: string,
    note: string,
    taskData: { ProjectMilestoneStepFull; ProjectMilestoneName }
  ): string {
    const actionText = action == APPROVE ? 'Approved' : 'Rejected';
    return `RE: ${taskData.ProjectMilestoneStepFull}) ${taskData.ProjectMilestoneName} ${actionText} - ${note}`;
  }

  approveOrRejectTaskValidate() {
    switch (this.taskAction) {
      case APPROVE:
        if (
          this.isActualStarDateRequired &&
          !this.actualStartDatePicker.validate()
        )
          this.actualStartDatePicker.focusDatePicker();
        else if (this.isNotesFieldRequired && !this.notesInput.validate()) {
          this.notesInput.focusTextBox();
        } else {
          this.approveOrRejectTask();
        }
        break;
      case REJECT:
        if (this.isNotesFieldRequired && !this.notesInput.validate()) {
          this.notesInput.focusTextBox();
        } else {
          this.approveOrRejectTask();
        }
        break;
    }
  }

  approveOrRejectTask() {
    this.subs.push(
      this.getObjData()
        .pipe(
          concatMap((approveOrRejectTaskData) =>
            this.dashboardService.approveOrRejectTask(approveOrRejectTaskData)
          )
        )
        .subscribe((res) => {
          if (res && res.success) {
            this.reloadProjectsTasksGrid = true;
            this.closeModal();
          } else {
            this.dialogService.alert(
              'Task Approve/Reject',
              'Cannot complete the Approval/Rejection, please try again later.',
              'Close'
            );
            this.reloadProjectsTasksGrid = false;
            this.closeModal();
          }
        })
    );
  }

  getActualDateRequiredFlag() {
    this.dashboardService
      .getClientPreference(REQUIRE_ACTUAL_START_DATE)
      .pipe(
        tap((date) => {
          if (date.data == CLIENT_PREFERENCE.REQUIRED) {
            this.isActualStarDateRequired = true;
          } else {
            this.isActualStarDateRequired = false;
          }
        })
      )
      .subscribe();
  }

  closeModal() {
    this.dialogRef.close(this.reloadProjectsTasksGrid);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
