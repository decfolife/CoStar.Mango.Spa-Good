
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskApprovalDto } from '../../../models/task-approval';
import { DashboardService } from '../../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'task-approval',
  templateUrl: './task-approval.component.html',
  styleUrls: ['./task-approval.component.scss']
})
export class TaskApprovalComponent implements OnInit {

  // Assigning info to component variable for display. Can do directly to html, but prefer this way
  public taskName: string;
  public taskNote: string;

  public closeButton = true;
  public cancel: string = "Cancel"
  public action: string;

  public footerButtonDisabled: boolean = false;

  constructor(private dashboardserice: DashboardService,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<TaskApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit() {
    this.action = this.data.actionName;
    this.taskName =  this.data.actionName + " Task: " + this.data.selectedTask.taskName;
    this.footerButtonDisabled = this.data.selectedTask.projectRequiredTaskNotes && (!this.taskNote || this.taskNote.trim() == '');
  }
  
  //This method will enabled or disabled the Approve/Reject button when user is required to enter notes.
  onNotesTextChange(value) {
    this.taskNote = value;
    this.footerButtonDisabled = this.data.selectedTask.projectRequiredTaskNotes && (!this.taskNote || this.taskNote.trim() == '');
  }

  // Initiates call to CREM app for processing user action with notes. If there is an error, we will display message
  // Currently, We do not have design for displaying Success/Failure message, but when UI desing is available, we will only need to bind
  // following message property to UI property.
  actionButton() {
    const arText = this.data.actionName  === "Approve" ? "Approved" : "Rejected";
    const successText = "Task successfully " + arText.toLowerCase();
    const failureText = "Failed to " + this.data.actionName.toLowerCase() + " task."

    if (this.taskNote === "" || this.taskNote === undefined) {
      this.taskNote = "";
    } else {
      this.taskNote = this.taskNote.trim();
    }

    let taskData: TaskApprovalDto = {
      taskId: this.data.selectedTask.taskID,
      transactionId: this.data.selectedTask.transactionID,
      taskNumber: this.data.selectedTask.taskNumber,
      isApproval: (this.data.actionName  === "Approve") ? 1 : 0,
      notes: "RE: " + this.data.selectedTask.taskNumber + ") " + this.data.selectedTask.taskName + " " + arText + " - " + this.taskNote
    }
    this.dashboardserice.UpdateTaskApproval(taskData)
    .subscribe(Response => {
      if (Response.status === 200) {
        this.toaster.success(successText, null, { enableHtml: true, positionClass: 'toast-bottom-right' });
        this.close(this.data.actionName);
      } else {
        this.toaster.error(failureText, null, { enableHtml: true, positionClass: 'toast-bottom-right' });
        this.close("error");
      }
    }, error => {  
      this.toaster.error(failureText, null, { enableHtml: true, positionClass: 'toast-bottom-right' }); 
      this.close("error");
    });
  }

  public close(data: any) {
    this.dialogRef.close(data);
  }
}