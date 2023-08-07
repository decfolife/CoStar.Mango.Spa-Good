/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mango-generic-error',
  templateUrl: './genericError.component.html',
  styleUrls: ['./genericError.component.scss']
})
export class GenericErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<GenericErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }
  
  show() {
    this.dialogRef.close(this.data);
  }
}