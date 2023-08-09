/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputState } from '../../definitions';

/**
 * Input Base: All the inputs inherits from this component
 */
@Component({
  selector: 'crem-input-base',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: ``,
  styleUrls: ['./base-input.component.scss'],
})
export class InputBaseComponent implements OnChanges {

  @Input() state?: InputState;

  // HTML Attributes
  @Input() value?: string | number;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() id?: string;
  @Input() required?: boolean;
  @Input() disabled?: boolean;
  @Input() readOnly?: boolean;
  @Input() minLengthField?: number;
  @Input() maxLengthField?: number;

  // Styling
  @Input() className?: string;

  // Internal
  classes: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']?.currentValue === undefined) {
      this.state = 'active';
    }
    if (changes['value']?.currentValue === undefined) {
      this.value = '';
    }
    if (changes['id']?.currentValue === undefined) {
      this.id = '';
    }
    if (changes['name']?.currentValue === undefined) {
      this.name = '';
    }
    if (changes['className']?.currentValue === undefined) {
      this.className = '';
    }
    switch(this.state){
      case 'disabled':
        this.disabled = true;
        this.readOnly = false;
        break;
      case 'read-only':
        this.disabled = false;
        this.readOnly = true;
        break;
      default:
        this.disabled = false;
        this.readOnly = false;
        break;
    }
  }

  getCssClasses(){
    return {
      'read-only': this.state === 'read-only' || this.readOnly,
      'disabled': this.state === 'disabled' || this.disabled,
      'warning': this.state === 'warning',
      'error': this.state === 'error',
      'success': this.state === 'success',
    };
  }

}
