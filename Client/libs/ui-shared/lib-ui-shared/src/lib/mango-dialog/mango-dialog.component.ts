/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mango-dialog',
  templateUrl: './mango-dialog.component.html',
  styleUrls: ['./mango-dialog.component.scss']
})

export class MangoDialogComponent implements OnInit {

  faExclamationCircle = faExclamationCircle;
  title: string;
  message: string;
  dialogType: string;
  secondaryBtnText: string;
  primaryBtnText: string;
  public modalId: string = "sharedMangoDialog";

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

