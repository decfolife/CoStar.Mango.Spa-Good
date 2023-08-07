import { Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ModalComponent  {
  @Input() modalTitle: string;
  @Input() modalTitleId: string;
  @Input() closeIconVisible: boolean;
  @Input() primaryFooterButtonText: string;
  @Input() primaryFooterButtonEnabledDisabled: boolean = false;
  @Input() closeOrCancelButtonText: string;
  @Input() modalId: string;
  @Input() customFooter: boolean = false;
  @Output() primaryButtonAction = new EventEmitter<any>();
  @Output() closeButtonAction = new EventEmitter<any>();

  constructor(
    @Optional() public dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  public closeDialog() {
    this.closeButtonAction.emit();
    this.dialogRef.close('');
    //this.dialogRef.close('Closed');
  }

  public primaryEvent() {
    this.primaryButtonAction.emit();
  }

}
