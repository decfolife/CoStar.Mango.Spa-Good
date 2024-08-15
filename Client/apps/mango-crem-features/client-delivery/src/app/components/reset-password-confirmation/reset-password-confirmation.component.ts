import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';

@Component({
  standalone: true,
  imports: [ModalModule],
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
