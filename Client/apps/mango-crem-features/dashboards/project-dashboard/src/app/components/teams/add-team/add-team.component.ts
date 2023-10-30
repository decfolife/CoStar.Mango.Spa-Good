/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'add-Team-popup',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})

export class AddTeamComponent implements OnInit {
  public modalTitle: string = 'Add Team';
  public closeButton = true;
  public closeOrCancelButtonText = 'Cancel';
  public modalId = 'AddTeamModalId';

  dateFormat: string;
  dateTimeFormat: string;
  vendorOrCustomer: string;
  constructor(
    public dialogRef: MatDialogRef<AddTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {

  }

  public closeDialog() {
    this.dialogRef.close('');
  }

}
