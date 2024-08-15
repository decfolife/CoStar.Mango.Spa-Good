import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxTextBoxComponent, DxValidatorComponent } from 'devextreme-angular';

@Component({
  selector: 'crem-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})

export class TextBoxComponent {
  @Input() value: string;
  @Input() invalidDateMessage: string;
  @Input() isRequired: boolean = false;
  @Input() maxLength: number;
  @Input() maxLengthMessage: string;
  @Input() initialFocus: boolean;
  @Input() inputId: string = "defaultTextBoxId";
  @Input() customRequireValidation: boolean = false;
  @Input() showRedBorder: boolean = false;
  @Input() disabled: boolean = false;
  @Input() inputLabel: string = "Enter Value";
  @Input() inputPlaceHolder: string = "";
  @Output() onChangeEvent = new EventEmitter();
  @Output() onEnterKeyEvent = new EventEmitter();
  @Output() onInitalizedEvent = new EventEmitter();
  @ViewChild(DxTextBoxComponent) textBox: DxTextBoxComponent;
  @ViewChild("TextBoxValidator", { static: false }) textBoxValidator: DxValidatorComponent

  public trimming: boolean = false;
  constructor() { }

  public onValueChanged(event) {
    if (this.trimming) {
      setTimeout(() => {
        this.onChangeEvent?.emit(event);
        this.trimming = false;
      })
    } else {
      this.onChangeEvent?.emit(event);
    }
  }

  public onInitialized(event) {
    if(this.initialFocus) {
      setTimeout(() => {
        event.component.focus();
      })
    }
    this.onInitalizedEvent?.emit(event);
  }

  public trim() {
    this.trimming = true;
    const value = this.value;
    if (value?.trim() === value) {
      this.trimming = false;
    } else {
      this.value = this.value?.trim();
    }
  }

  focusTextBox() {
    this.textBox.instance.focus();
  }

  reset() {
    this.textBox.instance.reset();
  }
  
  public onEnterKey(event) {
    if (this.trimming) {
      setTimeout(() => {
        this.onEnterKeyEvent?.emit(event);
        this.trimming = false;
      })
    } else {
      this.onEnterKeyEvent?.emit(event);
    }
  }

  public validate(): boolean {
    const isValid = this.textBoxValidator?.instance?.validate()?.isValid;
    return isValid;
  }
}