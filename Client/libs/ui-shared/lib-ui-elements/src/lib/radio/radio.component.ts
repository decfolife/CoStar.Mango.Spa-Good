import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CremRadioGroupComponent } from './radio-group.component';
import { CremRadioService } from './radio.service';

@Component({
  selector: 'crem-radio-field',
  standalone: true,
  imports: [CommonModule],
  preserveWhitespaces: false,
  template: `
    <!-- if the component is NOT readonly OR we intend to render the input in a disabled state -->
    <span
      *ngIf="!readOnly || value === this.radioGroup.value"
      class="crem-radio"
    >
      <input
        #inputElement
        *ngIf="canRenderDefaultTemplate()"
        class="crem-radio-input"
        type="radio"
        [attr.role]="'radio'"
        [disabled]="disabled"
        [attr.aria-checked]="checked"
        [attr.aria-label]="value"
        [value]="[value]"
        [checked]="value === this.radioGroup.value"
      />
      <label class="crem-radio-label" [class.disabled]="disabled">
        <ng-content></ng-content>
      </label>
    </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CremRadioComponent),
      multi: true,
    },
  ],
  styleUrls: ['./radio.component.scss'],
  host: {
    '[class.crem-radio-checked]': 'checked',
    '[attr.name]': 'name',
  },
})
export class CremRadioComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @ViewChild('inputElement', { static: true })
  inputElement: ElementRef<HTMLInputElement>;
  @Input() disabled = false;
  @Input() value: string;

  /**
   * controls which style is used when a control is in read-only mode
   *
   * @type {('input' | 'text-only')}
   */
  @Input() readOnlyStyle: 'input' | 'text-only' = 'input';

  /**
   * toggles read only display mode
   *
   * @type {boolean}
   */
  @Input() readOnly = false;

  name: string = null;
  subs: Subscription[] = [];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  checked: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private radioService: CremRadioService,
    public radioGroup: CremRadioGroupComponent
  ) {}

  canRenderDefaultTemplate() {
    return !this.readOnly || this.readOnlyStyle === 'input';
  }

  ngOnInit(): void {
    this.subs.push(
      this.radioService.name$.subscribe((name) => {
        this.name = name;
      }),
      this.radioService.disabled$.subscribe((disabled) => {
        this.disabled = disabled;
      }),
      this.radioService.selected$.subscribe((selectedVal) => {
        this.checked = selectedVal == this.value ? true : false;
      }),
      this.setupClickListener().subscribe()
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    this.radioGroup.writeValue(value);
  }

  private setupClickListener(): Observable<MouseEvent> {
    return fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click').pipe(
      tap((event) => {
        event.stopPropagation();
        event.preventDefault();
        if (this.disabled) {
          return;
        }
        this.radioService.select(this.value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
