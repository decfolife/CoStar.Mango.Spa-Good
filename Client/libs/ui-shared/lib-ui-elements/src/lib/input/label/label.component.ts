/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputInfoComponent } from '../info';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Label Input:
 */
@Component({
  selector: 'crem-input-label',
  standalone: true,
  imports: [CommonModule, InputInfoComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputLabelComponent,
    },
  ],
})
export class InputLabelComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() name: string;
  @Input() required?: boolean;
  @Input() showInfo?: boolean;

  onChange = () => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: any): void {
    this.label = value;
  }
}
