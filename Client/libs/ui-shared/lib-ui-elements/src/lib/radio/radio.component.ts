import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CremRadioService } from './radio.service';

@Component({
  selector: 'crem-radio-field',
  standalone: true,
  imports: [CommonModule],
  preserveWhitespaces: false,
  template: `
  <span class="crem-radio">
    <input 
      #inputElement
      class="crem-radio-input"
      type="radio" 
      [attr.role]="'radio'"
      [disabled]="disabled"
      [checked]="checked"
      [attr.aria-checked]="checked"
      [attr.aria-label]="value"
      [value]=[value]
    />
    <label class="crem-radio-label"  [class.disabled]="disabled"><ng-content></ng-content></label>
  </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CremRadioComponent),
      multi: true
    }
  ],
  styleUrls: ['./radio.component.scss'],
  host: {
    '[class.crem-radio-checked]': 'checked',
    '[attr.name]': 'name'
  }
})
export class CremRadioComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @ViewChild('inputElement', { static: true }) inputElement: ElementRef<HTMLInputElement>
  @Input() disabled = false
  @Input() checked = false
  @Input() value: string


  onChange: (value: any) => void = () => { }
  onTouched: () => void = () => { }

  name: string = null
  subs: Subscription[] = []

  constructor(private elementRef: ElementRef, private radioService: CremRadioService) { }

  ngOnInit(): void {
    this.subs.push(
      this.radioService.name$.subscribe(name => {
        this.name = name
      }),
      this.radioService.disabled$.subscribe(disabled => {
        this.disabled = disabled
      }),
      this.radioService.selected$.subscribe(value => {
        this.checked = this.value === value
      })
    )

    this.setupClickListener()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: boolean): void {
    this.checked = value
  }

  setupClickListener(): void {
    this.subs.push(
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click').pipe(
        tap(event => {
          event.stopPropagation()
          event.preventDefault()
          if (this.disabled) {
            return;
          }
          this.checked = !this.checked
          this.radioService.select(this.value)
          this.onChange(this.checked)
          this.onTouched()
        })
      ).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
