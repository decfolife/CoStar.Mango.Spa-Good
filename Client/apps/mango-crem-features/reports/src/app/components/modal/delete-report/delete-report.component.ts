import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mango-delete-report',
  templateUrl: './delete-report.component.html',
  styleUrls: ['./delete-report.component.scss'],
})
export class DeleteReportComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  yesDelete() {
    this.close('Yes');
  }

  public close(data: any) {
    this.dialogRef.close(data);
  }
}
