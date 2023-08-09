import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'crem-toggle-slider',
  templateUrl: './toggle-slider.component.html',
  styleUrls: ['./toggle-slider.component.scss'],
})

export class ToggleSliderComponent {
  @Input() value: boolean;
  @Input() disabled: boolean;
  @Input() dataField: string;
  @Output() onChangeEvent = new EventEmitter();
  @ViewChild('ToggleSlider') toggleSlider: MatSlideToggle;

  constructor() { }

  public onValueChanged(event) {
    this.onChangeEvent?.emit(event);
  }

  public focus(dataField) {
    if (dataField) {
      if (dataField === this.dataField) {
        setTimeout(() => {
          this.toggleSlider?.focus();
        })
        
      }
    } else {
      setTimeout(() => {
        this.toggleSlider?.focus();
      })
    }
  }

  public onEnter() {
    this.toggleSlider.toggle();
    this.value = !this.value;
    this.onChangeEvent?.emit({checked: this.value})
  }
}