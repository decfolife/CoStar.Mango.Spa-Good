import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'crem-toggle-slider',
  templateUrl: './toggle-slider.component.html',
  styleUrls: ['./toggle-slider.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSliderComponent),
      multi: true,
    },
  ],
})
export class ToggleSliderComponent implements OnInit, ControlValueAccessor {
  @Input() value: boolean;
  @Input() labelPosition: 'inside' | 'right' = 'inside';
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() size: 'regular' | 'wide' | 'extra-wide' | 'ultra-wide' = 'regular';
  @Input() checkedLabel = '';
  @Input() uncheckedLabel = '';
  @Input() ariaLabel: string;
  @Output() selectionChange: EventEmitter<{ checked: boolean }> =
    new EventEmitter<{ checked: boolean }>();

  /**
   * @ignore
   */
  onChange = (value: boolean) => {};

  /**
   * @ignore
   */
  onTouched = () => {};

  /**
   * @ignore
   */
  subs: Subscription[] = [];

  constructor(private host: ElementRef<HTMLElement>) {}

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.subs.push(
      fromEvent(this.host.nativeElement, 'click')
        .pipe(
          tap((event) => event.preventDefault()),
          filter(() => !this.disabled),
          tap(() => {
            this.value = !this.value;
            this.selectionChange.emit({
              checked: this.value,
            });
            this.onChange(this.value);
            this.onTouched();
          })
        )
        .subscribe()
    );

    this.subs.push(
      fromEvent<KeyboardEvent>(this.host.nativeElement, 'keydown')
        .pipe(
          filter(() => !this.disabled),
          filter((event) => event.key === 'Enter'),
          tap(() => {
            this.onEnter();
          })
        )
        .subscribe()
    );
  }

  /**
   * @ignore
   */
  onValueChanged(event) {
    this.selectionChange.emit(event);
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * @ignore
   */
  focus(value) {
    this.host.nativeElement.focus();
  }

  /**
   * @ignore
   */
  onEnter(): void {
    this.value = !this.value;
    this.selectionChange.emit({ checked: this.value });
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * @ignore
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @ignore
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * @ignore
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * @ignore
   */
  writeValue(value: boolean): void {
    this.value = value;
  }
}
