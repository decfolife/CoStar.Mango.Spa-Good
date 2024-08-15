/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { ContactRecord } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

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
  public userMessage = "Select User to Emulate:"

  public selectedEmulatedUser: ContactRecord;

  constructor(
    public dialogRef: MatDialogRef<EmulateUserPopupComponent>,
    private facade: MangoAppFacade
    ) { }

  ngOnInit(): void {}

  public closeDialog() {
    this.dialogRef.close('');
  }

  setEmulatedUser(event: ContactRecord) {
    this.selectedEmulatedUser = event
  }

  emulateUser() {
    this.facade.setEmulatedUser(this.selectedEmulatedUser.contactID)
    this.dialogRef.close();
  }
}
