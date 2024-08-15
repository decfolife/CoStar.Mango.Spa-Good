import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxNumberBoxComponent, DxValidatorComponent } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';

@Component({
  selector: 'crem-number-box',
  standalone: true,
  imports: [
    CommonModule,
    DxValidatorModule,
    DxNumberBoxModule
  ],
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss'],
})

export class NumberBoxComponent {
  @Input() value: number;
  @Input() invalidDateMessage: string;
  @Input() isRequired = false;
  @Input() maxLength: number;
  @Input() maxLengthMessage: string;
  @Input() initialFocus: boolean;
  @Input() inputId = "";
  @Input() numberFormat = "";
  @Input() showRedBorder = false;
  @Input() disabled = false;
  @Input() inputLabel = "Enter Value";
  @Input() inputPlaceHolder = "";
  @Output() valueChange = new EventEmitter();
  @Output() initialized = new EventEmitter();
  @ViewChild(DxNumberBoxComponent) numberBox: DxNumberBoxComponent;
  @ViewChild("NumberBoxValidator", { static: false }) numberBoxValidator: DxValidatorComponent;

  public trimming = false;

  public onValueChanged(event) {
    if (this.trimming) {
      setTimeout(() => {
        this.valueChange?.emit(event);
        this.trimming = false;
      })
    } else {
      this.valueChange?.emit(event);
    }
  }

  public onInitialized(event) {
    if(this.initialFocus) {
      setTimeout(() => {
        event.component.focus();
      })
    }
    this.initialized?.emit(event);
  }

  focusNumberBox() {
    this.numberBox.instance.focus();
  }

  public validate(): boolean {
    const isValid = this.numberBoxValidator?.instance?.validate()?.isValid;
    return isValid;
  }
}