import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DxDateBoxComponent, DxValidatorComponent } from 'devextreme-angular';
import { CremValidatedComponent } from '../base';

/**
 * Date Picker Input Field: Primarily to be used as part of the DynamicForms component
 * @export
 * @class DatePickerComponent
 * @param {boolean} showDefaultValidationTooltip - Show DevExtreme default tooltip,
 */
@Component({
  selector: 'crem-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatePickerComponent,
    },
    {
      provide: CremValidatedComponent,
      useExisting: DatePickerComponent,
    },
  ],
})
export class DatePickerComponent
  extends CremValidatedComponent
  implements ControlValueAccessor
{
  @Input() value: string;
  @Input() dateFormat = 'MM/dd/yyyy';
  @Input() invalidDateMessage: string;
  @Input() useMaskBehavior = true;
  @Input() showClearButton = false;
  @Input() isRequired = false;
  @Input() inputId: string;
  @Input() min: Date;
  @Input() max: Date;
  @Input() disabled: boolean;
  @Input() placeholderText = '';
  @Input() showDefaultValidationTooltip?: boolean = true;
  @Input() dataKey: string;
  @Output() changeEvent = new EventEmitter();

  @ViewChild('DateBoxValidator', { static: false })
  dateBoxValidator: DxValidatorComponent;
  @ViewChild(DxDateBoxComponent) datePickerComponent: DxDateBoxComponent;

  onChange = (value: string) => {};
  onTouch = () => {};

  public onValueChanged(event: any) {
    this.onChange(event.value);
    this.onTouch();
    this.changeEvent?.emit(event);
  }

  public validate(): boolean {
    const isValid = this.dateBoxValidator?.instance?.validate()?.isValid;
    return isValid;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  focusDatePicker() {
    this.datePickerComponent.instance.focus();
  }

  cremSharedComponentValidator() {
    return this.status === 'error';
  }
}
