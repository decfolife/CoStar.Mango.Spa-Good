import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {
  ApproveRejectTasks,
  PostProjectTaskSettings,
} from '@mango/data-models/lib-data-models';
import { ToastrService } from 'ngx-toastr';
import { of, Subscription } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { DashboardService } from '../../../services/dashboard.service';
import { RequiredNotesFlagService } from '@project-dashboard/services/required-notes-flag.service';

@Component({
  selector: 'task-approval',
  templateUrl: './task-approval.component.html',
  styleUrls: ['./task-approval.component.scss'],
})
export class TaskApprovalComponent implements OnInit {
  // Assigning info to component variable for display. Can do directly to html, but prefer this way
  public taskName: string;
  public taskNote: string;
  clientRequiredNotes = '1';
  projectTaskNotesRequired: boolean = true;
  projectSettingsRetrieved: boolean = false;
  projectId: number;
  postProjectTaskSettings: PostProjectTaskSettings = <
    PostProjectTaskSettings
  >{};

  public closeButton = true;
  public cancel: string = 'Cancel';
  public action: string;

  public footerButtonDisabled: boolean = true;
  subs: Array<Subscription> = [];

  constructor(
    private dashboardservice: DashboardService,
    private toaster: ToastrService,
    private requiredNotesFlagService: RequiredNotesFlagService,
    public dialogRef: MatDialogRef<TaskApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.action = this.data.actionName;
    this.projectId = this.data.selectedTask.transactionID;
    this.taskName =
      this.data.actionName + ' Task: ' + this.data.selectedTask.taskName;
    // this.getProjectTaskSettings();
    this.getNotesRequiredFlag();
  }

  //This method will enabled or disabled the Approve/Reject button when user is required to enter notes.
  onNotesTextChange(value) {
    this.taskNote = value;
    this.footerButtonDisabled =
      this.projectTaskNotesRequired &&
      (!this.taskNote || this.taskNote.trim() == '');
  }

  // Initiates call to CREM app for processing user action with notes. If there is an error, we will display message
  // Currently, We do not have design for displaying Success/Failure message, but when UI desing is available, we will only need to bind
  // following message property to UI property.
  actionButton() {
    const arText = this.data.actionName === 'Approve' ? 'Approved' : 'Rejected';
    const successText = 'Task successfully ' + arText.toLowerCase();
    const failureText =
      'Failed to ' + this.data.actionName.toLowerCase() + ' task.';

    if (this.taskNote === '' || this.taskNote === undefined) {
      this.taskNote = '';
    } else {
      this.taskNote = this.taskNote.trim();
    }

    const resolvedTasknumber = this.getTaskStepNumber();

    this.subs.push(
      of<ApproveRejectTasks>({
        projectId: this.data.selectedTask.transactionID,
        isQuickApproval: false,
        approveRejectTasksRequestList: [
          {
            taskApprovalID: this.data.selectedTask.approvalID,
            isApproval: this.data.actionName === 'Approve',
            isProxyApproval: false,
            notes: `RE: ${resolvedTasknumber}) ${this.data.selectedTask.taskName} ${arText} - ${this.taskNote}`,
            actualStartDate: null,
            newHours: null,
            userDate: new Date(),
          },
        ],
      })
        .pipe(
          concatMap((taskData) =>
            this.dashboardservice.approveOrRejectTask(taskData)
          )
        )
        .subscribe(
          (Response) => {
            if (Response.statusCode === 200) {
              this.toaster.success(successText, null, {
                enableHtml: true,
                positionClass: 'toast-bottom-right',
              });
              this.close(this.data.actionName);
            } else {
              this.toaster.error(failureText, null, {
                enableHtml: true,
                positionClass: 'toast-bottom-right',
              });
              this.close('error');
            }
          },
          (error) => {
            this.toaster.error(failureText, null, {
              enableHtml: true,
              positionClass: 'toast-bottom-right',
            });
            this.close('error');
          }
        )
    );
  }

  private getTaskStepNumber() {
    return [
      this.data.selectedTask.taskNumber,
      this.data.selectedTask.taskSteps,
    ].find((v) => !!v);
  }

  getNotesRequiredFlag() {
    this.subs.push(
      this.requiredNotesFlagService
        .getRequiredNotesFlag(this.projectId)
        .subscribe(
          (notesRequiredFlag) => {
            this.projectTaskNotesRequired = notesRequiredFlag;
            this.projectSettingsRetrieved = true;
            this.footerButtonDisabled =
              this.projectTaskNotesRequired && !this.taskNote;
          },
          (error) => {
            this.projectSettingsRetrieved = true;
          },
          () => {}
        )
    );
  }

  public close(data: any) {
    this.dialogRef.close(data);
  }
}
