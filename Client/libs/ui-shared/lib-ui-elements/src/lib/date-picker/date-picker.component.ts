import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxDateBoxComponent, DxValidatorComponent } from 'devextreme-angular';

@Component({
  selector: 'crem-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})

export class DatePickerComponent {
  @Input() value: string;
  @Input() dateFormat: string = 'MM/dd/yyyy';
  @Input() invalidDateMessage: string;
  @Input() useMaskBehavior: boolean = true;
  @Input() showClearButton: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() inputId: string;
  @Input() min: Date;
  @Input() max: Date;
  @Input() disabled: boolean;
  @Output() onChangeEvent = new EventEmitter();

  @ViewChild("DateBoxValidator", { static: false }) dateBoxValidator: DxValidatorComponent
  @ViewChild(DxDateBoxComponent) dateBox: DxDateBoxComponent;

  public ngAfterViewInit(): void {
    this.dateBox.disabled = this.disabled;
  }

  public onValueChanged(event: Event) {
    this.onChangeEvent?.emit(event);
  }

  public validate(): boolean {
    const isValid = this.dateBoxValidator?.instance?.validate()?.isValid;
    return isValid;
  }
}