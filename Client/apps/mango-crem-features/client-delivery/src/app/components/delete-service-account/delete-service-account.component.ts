import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mango-delete-service-account',
  templateUrl: './delete-service-account.component.html',
  styleUrls: ['./delete-service-account.component.scss'],
})
export class DeleteServiceAccountComponent implements OnInit {

  // Assigning info to component variable for display. Can do directly to html, but prefer this way

  public closeButton = true;
  public cancel: string = "Cancel"
  public action: string;
  public projectRequiredTaskNotes: boolean = false;
  public user: string;
  public editAction: string;
  public editActionTitle: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteServiceAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit() {
    this.action = (this.data.contactActive);
    this.user = (this.data.contactEmailAddress);
    if(this.action) {
      this.editAction = "Deactivate"; 
      this.editActionTitle = "Deactivation"; 
    } 
    else{
      this.editAction = "Reactivate"; 
      this.editActionTitle = "Reactivation"; 
    }
  }
  
  deleteConfirmation() {
    this.dialogRef.close(this.data);
  }

  // public close(data: any) {
  //   this.dialogRef.close(data);
  // }
}