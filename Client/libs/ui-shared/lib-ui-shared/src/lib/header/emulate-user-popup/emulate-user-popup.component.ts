/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactRecord } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Component({
  selector: 'mango-emulate-user-popup',
  templateUrl: './emulate-user-popup.component.html',
  styleUrls: ['./emulate-user-popup.component.scss'],
})
export class EmulateUserPopupComponent {
  modalTitle = 'Emulate User';
  closeButton = true;
  closeOrCancelButtonText = 'Cancel';
  primaryFooterButtonText = 'Emulate User';
  modalId = 'emulateUserModal';
  emulateUserText = 'Emulate User';
  userMessage = 'Select User to Emulate:';
  selectedEmulatedUser: ContactRecord;

  constructor(
    public dialogRef: MatDialogRef<EmulateUserPopupComponent>,
    private facade: MangoAppFacade
  ) {}

  public closeDialog() {
    this.dialogRef.close('');
  }

  setEmulatedUser(event: ContactRecord) {
    this.selectedEmulatedUser = event;
  }

  emulateUser() {
    this.facade.setEmulatedUser(this.selectedEmulatedUser.contactID);
    this.dialogRef.close();
  }
}
