import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'hierarchy-deletion',
  templateUrl: './hierarchy-deletion.component.html',
  styleUrls: ['./hierarchy-deletion.component.scss']
})
export class HierarchyDeletionComponent implements OnInit {

  // Assigning info to component variable for display. Can do directly to html, but prefer this way

  public canDelete = true;
  public checkBoxValue = true;

  constructor(
    public dialogRef: MatDialogRef<HierarchyDeletionComponent>,
    @Inject(MAT_DIALOG_DATA) public modalObject: any) {
  }

  ngOnInit() {
    this.canDelete = !(this.modalObject.isPortfolio && 
      (
        this.modalObject.errorObject.hasRightsLinked ||
        this.modalObject.errorObject.isServerError ||
        this.modalObject.errorObject.isNotAuthorized
      )
    );
  }

  deleteConfirmation() {
    if (!this.modalObject.data.companyActive && this.modalObject.isPortfolio) {
      this.modalObject.deleteAllContactsAndGroups = this.checkBoxValue;
    }
    this.dialogRef.close(this.modalObject);
  }
}
