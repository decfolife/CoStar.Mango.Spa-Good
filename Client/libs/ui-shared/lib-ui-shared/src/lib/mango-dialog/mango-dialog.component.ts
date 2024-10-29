/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mango-dialog',
  templateUrl: './mango-dialog.component.html',
  styleUrls: ['./mango-dialog.component.scss']
})

export class MangoDialogComponent implements OnInit {

  title: string;
  message: string;
  dialogType: string;
  secondaryBtnText: string;
  primaryBtnText: string;
  public modalId = "sharedMangoDialog";

  constructor(
    public dialogRef: MatDialogRef<MangoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.dialogType = this.data.dialogType;
    this.secondaryBtnText = this.data.secondaryBtnText;
    this.primaryBtnText = this.data.primaryBtnText;
  }

  secondaryButtonClicked() {
    this.dialogRef.close(false);
  }

  primaryButtonClicked() {
    this.dialogRef.close(true);
  }
  
}

