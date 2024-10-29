import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'user-deletion',
  templateUrl: './user-deletion.component.html',
  styleUrls: ['./user-deletion.component.scss'],
})
export class UserDeletionComponent implements OnInit {
  // Assigning info to component variable for display. Can do directly to html, but prefer this way

  public closeButton = true;
  public cancel: string = 'Cancel';
  public action: string;
  public projectRequiredTaskNotes: boolean = false;
  public user: string;

  constructor(
    public dialogRef: MatDialogRef<UserDeletionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.user =
      (this.data.contactFirstName || '') +
      ' ' +
      (this.data.contactLastName || '');
  }

  deleteConfirmation() {
    this.dialogRef.close(this.data);
  }
}
