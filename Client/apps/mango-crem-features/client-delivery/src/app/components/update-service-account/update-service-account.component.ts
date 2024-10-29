import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';

@Component({
  standalone: true,
  imports: [ModalModule],
  selector: 'mango-update-service-account',
  templateUrl: './update-service-account.component.html',
  styleUrls: ['./update-service-account.component.scss'],
})
export class UpdateServiceAccountComponent implements OnInit {
  public closeButton = true;
  public cancel: string = 'Cancel';
  public action: string;
  public projectRequiredTaskNotes: boolean = false;
  public user: string;
  public editAction: string;
  public editActionTitle: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateServiceAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.action = this.data.contactActive;
    this.user = this.data.contactEmailAddress;
    if (this.action) {
      this.editAction = 'Deactivate';
      this.editActionTitle = 'Deactivation';
    } else {
      this.editAction = 'Reactivate';
      this.editActionTitle = 'Reactivation';
    }
  }

  updateConfirmation() {
    this.dialogRef.close(this.data);
  }
}
