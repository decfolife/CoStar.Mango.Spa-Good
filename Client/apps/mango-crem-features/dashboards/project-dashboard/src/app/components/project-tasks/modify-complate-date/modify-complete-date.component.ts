import { DatePipe, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import {
  ButtonModule,
  ModalModule,
  DatePickerComponent,
  DatePickerModule,
  TooltipModule,
  InputComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { Subscription } from 'rxjs';
import { TaskCompletionDate } from 'libs/data-models/lib-data-models/src/lib/models/Projects/projectTaskInfo';

const SAVE = 'save';
const RESET = 'reset';

@Component({
  selector: 'mango-modify-complete-date',
  standalone: true,
  imports: [
    MatIconModule,
    ButtonModule,
    ModalModule,
    DatePickerModule,
    TooltipModule,
    InputComponent,
    DatePipe,
    NgIf,
  ],
  templateUrl: './modify-complete-date.component.html',
  styleUrls: ['./modify-complete-date.component.scss'],
})
export class ModifyCompleteDateComponent implements OnInit, OnDestroy {
  @ViewChild('CompleteDatePicker') completeDatePicker: DatePickerComponent;
  @ViewChild('ReasonInput') reasonInput: InputComponent;

  projectId: number;
  taskId: number;
  currentDate: Date = new Date();
  taskCompleteDates: TaskCompletionDate;
  dateFormat: string;
  reloadGridData: boolean = false;
  isProxyUser: boolean = false;
  isDateRequired: boolean = true;
  isReset: number = 0;
  taskUserDate: Date;
  taskSystemDate: Date;
  modifiedDate: Date = null;
  isCompleteDate: number;
  reasonText: string = '';
  modalHeader: string = 'Modify Complete Date';
  errorMsg: string = '';
  helpText: string =
    'Modified Complete Date must be less than or equal to System Date.';
  subs: Subscription[] = [];
  isNotesFieldRequired: boolean;
  quickApprovalFooterText: any;
  tmcdNotesStatus: string = 'initialInputDisplay';

  constructor(
    private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    public dialogRef: MatDialogRef<ModifyCompleteDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.dateFormat = this.data.dateFormat;
    this.projectId = this.data.projectId;
    this.taskId = this.data.taskId;
    this.isCompleteDate = this.data.isCompleteDate;
    this.isProxyUser = this.data.isProxyUser == 1 ? true : false;
    this.isNotesFieldRequired = this.data.notesRequired;
    this.getTaskCompleteDetails();
  }

  onModifyCompleteDate(e) {
    this.modifiedDate = e.value;
  }

  onReasonChanged(e) {
    this.reasonText = e;
    this.tmcdNotesStatus = !this.isNotesFieldRequired
      ? 'inputValueChanged'
      : this.reasonText
      ? 'inputValueChanged'
      : 'noFormErrorStatus';
  }

  resetDate() {
    this.isDateRequired = false;
    this.reasonText = '';
    this.taskUserDate = null;
    this.modifiedDate = null;
    this.isReset = 1;
    this.saveTaskData();
  }

  saveDate() {
    this.isDateRequired = true;
    this.isReset = 0;
    if (!this.completeDatePicker.validate()) {
      this.completeDatePicker.focusDatePicker();
    } else if (this.isNotesFieldRequired && !this.reasonInput.validate()) {
      this.tmcdNotesStatus = 'noFormErrorStatus';
      this.reasonInput.focusTextBox();
    } else {
      this.tmcdNotesStatus = '';
      this.saveTaskData();
    }
  }

  saveTaskData() {
    this.errorMsg = '';

    this.subs.push(
      this.dashboardService
        .setTaskCompletionDates(
          this.projectId,
          this.taskId,
          this.isReset,
          this.isCompleteDate,
          this.modifiedDate,
          this.reasonText
        )
        .subscribe((res: any) => {
          if (res && res.success) {
            this.reloadGridData = true;
            this.isReset == 0
              ? this.closeModal()
              : this.getTaskCompleteDetails();
          } else {
            this.errorMsg =
              'There was an error while Saving or Resetting the complete date. Please try again.';
          }
        })
    );
  }

  getTaskCompleteDetails() {
    this.errorMsg = '';

    this.subs.push(
      this.dashboardService
        .getTaskCompletionDates(
          this.projectId,
          this.taskId,
          this.isCompleteDate
        )
        .subscribe((res: any) => {
          if (res && res.success) {
            this.taskUserDate = res.data.userDate;
            this.taskSystemDate = res.data.systemDate;
          } else {
            this.errorMsg =
              'There was an issue with getting task complete dates. Please try again later';
          }
        })
    );
  }

  closeModal() {
    this.dialogRef.close(this.reloadGridData);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
