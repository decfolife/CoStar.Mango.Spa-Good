import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactRecord, TaskCompletionDate } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'mango-task-modify-complete-date',
  templateUrl: './task-modify-complete-date.component.html',
  styleUrls: ['./task-modify-complete-date.component.scss'],
})

export class TaskModifyCompleteDateComponent implements OnInit {
  modalTitle = "Modify Complete Date";
  isUserDatesEU: boolean = true;
  subs: Subscription[] = [];
  taskCompletionDates?: TaskCompletionDate;
  currentUserInfo$: Observable<ContactRecord>;
  dateFormat: string;
  projectId: number;
  taskId: number;
  modifiedDate?: Date = null;
  reasonText: string = '';
  errorMessage: string = '';
  overrideValue: string = '';

  constructor(
    private dashboardService: DashboardService,
    private facade: MangoAppFacade,
    public dialogRef: MatDialogRef<TaskModifyCompleteDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {    
   }

  ngOnInit(): void {
    this.currentUserInfo$ = this.facade.contactRecord$;
    this.subs.push(this.currentUserInfo$.subscribe(contact => {
      this.isUserDatesEU = contact.preferences.contactDatesEU;
      this.dateFormat = this.isUserDatesEU ? 'dd.MM.yyyy' : 'MM/dd/yyyy' ;
    }));
    this.projectId = this.data.projectId;
    this.taskId = this.data.taskId;
    this.getTaskCompletionDates();
  }

  closeModal() {
    this.dialogRef.close(true);
  }

  onReasonValueChanged(e) {
    this.reasonText = e.target.value;
  }

  onModifyCompleteDateChange(e){
    this.modifiedDate = e.value;
  }

  getTaskCompletionDates() {
    this.subs.push(this.dashboardService.getTaskCompletionDates(this.projectId, this.taskId).subscribe(
      (res:any) => {
        if(res && res.success) {
          this.taskCompletionDates = res.data;
          this.modifiedDate = this.taskCompletionDates.userDate;    
          this.errorMessage = '';
        }
        else {
          console.log("Error occurred getting Task Completion Dates Data");
          this.errorMessage = "We couldn't load your data. Please refresh and try again.";
        }
      }
    )); 
  }

  saveTaskCompletionDates(){
    this.subs.push(this.dashboardService.setTaskCompletionDates(this.projectId, this.taskId, 0, 1, this.modifiedDate, this.reasonText).subscribe(
      (res:any) => {
        if(res && res.success) {
          this.errorMessage = '';
          this.getTaskCompletionDates();
        }
        else {
          console.log("Error occurred setting Task Completion Dates");
          this.errorMessage = 'There was an error while saving. Please try again.';
        }
      }
    )); 
  }

  resetTaskCompletionDates(){
    this.subs.push(this.dashboardService.setTaskCompletionDates(this.projectId, this.taskId, 1, 1, null, this.reasonText).subscribe(
      (res:any) => {
        if(res && res.success) {
          this.modifiedDate = null;
          this.errorMessage = '';
          this.reasonText = '';
          this.getTaskCompletionDates();
        }
        else {
          console.log("Error occurred resetting Task Completion Dates");
          this.errorMessage = 'There was an error while saving. Please try again.';
        }
      }
    )); 
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}


