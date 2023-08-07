/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'mango-emulate-user-popup',
  templateUrl: './emulate-user-popup.component.html',
  styleUrls: ['./emulate-user-popup.component.scss']
})
export class EmulateUserPopupComponent implements OnInit {


  public modalTitle: string = 'Emulate User';
  public closeButton = true;
  public closeOrCancelButtonText = 'Cancel';
  public primaryFooterButtonText = "Emulate User";
  public modalId = 'emulateUserModal';
  public emulateUserText = 'Emulate User';
  public userMessage = "Select User to Emulate and enter the Admin Password:"


  constructor(
    public dialogRef: MatDialogRef<EmulateUserPopupComponent>,
    ) { }

  ngOnInit(): void {}

  public closeDialog() {
    this.dialogRef.close('');
  }

  emulateUserEvent() {

  }

}
