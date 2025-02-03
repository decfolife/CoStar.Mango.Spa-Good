import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  CremPopupComponent,
  ButtonModule,
  LibUiElementsModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ModalModule,
    MatDialogModule,
    ButtonModule,
    LibUiElementsModule,
    CommonModule,
    CremPopupComponent,
  ],
  selector: 'mango-delete-historic-schedule',
  templateUrl: './delete-historic-schedule.component.html',
  styleUrls: ['./delete-historic-schedule.component.scss'],
})
export class DeleteHistoricScheduleComponent implements OnInit {
  componentName = 'delete-historic-schedule';
  public msg: string;
  public confirmButtonText: string;
  public title: string;
  public isHistorical: boolean;
  public isInProcess: boolean;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    private dialogRef: MatDialogRef<DeleteHistoricScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.msg = this.data.msg;
    this.confirmButtonText = this.data.confirmButtonText;
    this.title = this.data.title;
    this.isHistorical = this.data.isHistorical;
    this.isInProcess = this.data.isInProcess;
  }

  yes() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
