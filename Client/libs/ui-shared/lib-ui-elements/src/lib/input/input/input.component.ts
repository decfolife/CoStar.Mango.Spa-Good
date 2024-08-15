import { AfterViewInit, EventEmitter, HostBinding, Input, OnChanges, Output, ViewChild } from '@angular/core';

/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, ElementRef, SimpleChanges } from '@angular/core';

import { InputHintComponent } from '../hint';
import { InputLabelComponent } from '../label';

import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputState, InputType, LabelPosition } from '../definitions';

/**
 * Input: Defined to hold all the common elements, this is the entry point
 * @param {string} state: Defines the overall state of the input, E.g. active, disable, error.
 * The same 'state' is passing down to input and hint depending on the need
 * It allows to control sub-components like hint and input from a single parameter.
 */
@Component({
  selector: 'crem-input',
  standalone: true,
  imports: [
    CommonModule,
    InputLabelComponent,
    InputHintComponent,
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: InputComponent
  }]
})
export class InputComponent implements OnChanges, AfterViewInit, ControlValueAccessor {


  @Input() state?: InputState;
  @Input() showHint?: boolean;
  @Input() showLabel?: boolean;
  @Input() showInfo?: boolean;

  // Global
  @Input() className?: string;

  // Label Component
  @Input() label?: string;
  @Input() labelPosition?: LabelPosition;

  // Input Component
  @Input() inputType?: InputType;
  @Input() id?: string;
  @Input() value?: string = '';
  @Input() name?: string;
  @Input() placeholder?: string = '';
  @Input() required?: boolean;
  @Input() minLengthField?: number = 0;
  @Input() maxLengthField?: number = 255;
  @Input() allowScrolling?: boolean = false;
  @Input() rows?: number;
  @Input() cols?: number;
  @Input() disabled?: boolean;
  @Input() readOnly?: boolean;
  @Input() minNumber?: number = Number.NEGATIVE_INFINITY
  @Input() maxNumber?: number = Number.POSITIVE_INFINITY
  @Input() disallowNegative?: boolean;

  // Hint Component
  @Input() hintText?: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>()

  touched = false;

  // Internal
  @HostBinding('class') classes = '';

  @ViewChild('textarea') textarea: ElementRef<HTMLTextAreaElement>;

  /**
       * @ignore
       */
  onChange = (value: string) => { }

  /**
   * @ignore
   */
  onTouched = () => { }

  @Output() onEnterKeyEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.adjustTextareaHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']?.currentValue === undefined) {
      this.state = 'active';
    }
    if (changes['className']?.currentValue === undefined) {
      this.className = '';
    }
    if (changes['state']?.currentValue === 'read-only') {
      this.readOnly = true;
      this.required = false; // Hide required symbol when editing disabled
    }
    if (changes['disabled']?.currentValue === 'disabled') {
      this.disabled = true;
      this.required = false; // Hide required symbol when editing disabled
    }
    this.getCssClasses();
  }

  /**
   * @ignore
   */
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  /**
   * @ignore
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  /**
   * @ignore
   */
  writeValue(value: string): void {
    this.value = value
    this.markAsTouched()
    this.valueChange.emit(this.value)
    this.onChange(this.value)
  }

  /**
   * @ignore
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  /**
   * @ignore
   */
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }


  /**
   * @ignore
   */
  getCssClasses() {
    return {
      'read-only': this.state === 'read-only' || this.readOnly,
      'disabled': this.state === 'disabled' || this.disabled,
      'warning': this.state === 'warning',
      'error': this.state === 'error',
      'success': this.state === 'success'
    };
  }

  /**
   * 
   * @ignore
   */
  validate(): boolean {
    if (this.required && (!this.value || this.value == '')) {
      return false
    }
    if (this.maxLengthField && !!this.value && this.value.length > this.maxLengthField) {
      return false
    }
    if (this.minLengthField && !!this.value && this.value.length < this.minLengthField) {
      return false
    }
    return true
  }

  /**
   * 
   * @ignore
   * This method is for backward compatibility support
   */
  reset() {
    this.value = ''
    this.markAsTouched()
    this.valueChange.emit(this.value)
    this.onChange(this.value)
  }

  adjustTextareaHeight() {
    if (this.textarea) {
      const textareaElement = this.textarea.nativeElement;
      if (!this.allowScrolling) {
        textareaElement.style.height = '';
        textareaElement.style.height = `${textareaElement.scrollHeight + 3}px`;
      } else {
        textareaElement.style.overflowY = 'scroll'
      }
    }
  }

  /**
   * @ignore
   */
  onInputChange(event) {
    let value = event.target.value;
    if (this.inputType === 'number' && this.disallowNegative) {
      const regex = /^(?!0\d)\d*\.?\d{0,4}$/;
      const key = event.data;

      if (!regex.test(value) || key == 'e' || key == 'E') {
        value = value.replace(/[^0-9.]/g, '').replace(/[eE]/g, '');
        const parts = value.split('.');
        if (parts.length > 2) {
          value = parts[0] + '.' + parts.slice(1).join('').slice(0, 4);
        } else if (parts.length === 2) {
          value = parts[0] + '.' + parts[1].slice(0, 4);
        }

        if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
          value = value.replace(/^0+/, '');
        }
        event.target.value = value;
      }
    }
    this.markAsTouched()
    this.valueChange.emit(value)
    this.onChange(value)
  }

  /**
   * @ignore
   * This method is defined in subsequent classes
   */
  focusTextBox() {
    const input = this.el.nativeElement.querySelector('input')
    if (input) {
      input.focus()
    }
  }

  onEnter(event) {
    this.onEnterKeyEvent.emit(event)
  }
}
