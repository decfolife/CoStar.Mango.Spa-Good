import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { ButtonModule } from '../button';
import { InputLabelComponent } from '../input';

@Component({
  selector: 'crem-popup',
  standalone: true,
  imports: [
    CommonModule,
    DxPopupModule,
    ButtonModule,
    InputLabelComponent,
    DxButtonModule,
  ],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class CremPopupComponent {
  @Input() id = `crem-popup-${Math.random() * 100}`;
  @Input() closeButtonId = `crem-popup-close-${Math.random() * 100}`;
  @Input() saveButtonId = `crem-popup-save-${Math.random() * 100}`;
  @Input() applyButtonId = `crem-popup-apply-${Math.random() * 100}`;
  @Input() title: string;
  @Input() draggable = false;
  @Input() saveButtonText: string;
  @Input() closeButtonText: string;
  @Input() applyButtonText: string;
  @Input() visible = false;
  @Input() showInfo = false;
  @Input() height: string;
  @Input() width: string;
  @Input() resizable = false;
  @Input() showCloseButton = true;
  @Input() hideOnOutsideClick = false;
  @Input() customFooter: boolean;
  @Input() disableSaveButton = false;
  @Input() disableSApplyButton = false;
  @Input() disableCloseButton = false;

  @Output() close = new EventEmitter<any>();
  @Output() save = new EventEmitter<boolean>();
  @Output() apply = new EventEmitter<boolean>();

  closePopup(): void {
    this.visible = false;
    this.close.emit('close');
  }

  onCloseClick(): void {
    this.close.emit(this.closeButtonText);
  }

  onSaveClick(): void {
    this.save.emit(true);
  }

  onApplyClick(): void {
    this.apply.emit(true);
  }
}
