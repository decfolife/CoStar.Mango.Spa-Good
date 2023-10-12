import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mango-reset-password-confirmation',
  templateUrl: './reset-password-confirmation.component.html',
  styleUrls: ['./reset-password-confirmation.component.scss'],
})
export class ResetPasswordConfirmationComponent {
  public emailAddress: string;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit() {
    this.emailAddress = this.data;
  }

  resetPasswordConfirmation() {
    this.dialogRef.close(this.data);
  }

}
