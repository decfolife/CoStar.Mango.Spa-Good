import {
  Component,
  Input,
  forwardRef,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'cs-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor, OnChanges {
  @Input() label: string;
  @Input() placeholder: string = null;
  @Input('textValue') _textValue = '';
  @Input() hint?: string = null;
  @Input() disabled? = false;
  @Input() required? = false;
  @Input() error? = false;
  @Input() errorMsg?: string = null;
  @Input() optional? = false;
  @Input() type: string;
  @Input() icon?: string = null;
  @Input() clickableIcon? = false;
  @Input() iconAriaLabel: string = null;
  @Output() onChange = new EventEmitter<any>();
  @Output() iconClick = new EventEmitter<any>();

  propagateChange: any = () => {};

  constructor() {}

  get textValue() {
    return this._textValue;
  }

  set textValue(val) {
    this._textValue = val;
    this.propagateChange(val);
  }

  ngOnInit() {}

  textEntered(event) {
    this.textValue = event;
    this.onChange?.emit(event);
  }

  ngOnChanges(changes) {
    this.propagateChange(this.textValue);
  }

  writeValue(value) {
    if (value) {
      this.textValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onIconClick = () => {
    this.iconClick.emit()
  };
}