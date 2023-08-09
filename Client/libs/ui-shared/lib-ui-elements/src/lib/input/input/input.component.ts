/* eslint-disable @angular-eslint/component-selector */
import { Component, HostBinding, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputLabelComponent } from '../label';
import { InputHintComponent } from '../hint'
import { InputState, InputType, LabelPosition } from '../definitions';

import { InputTextComponent } from './text';

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
    InputTextComponent,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {

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
  @Input() value?: string;
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() required?: boolean;
  @Input() minLengthField?: number;
  @Input() maxLengthField?: number;
  disabled?: boolean;
  readOnly?: boolean;

  // Hint Component
  @Input() hintText?: string;

  // Internal
  @HostBinding('class') classes = '';

  // Add the Change detector to the component
  constructor(private changeDetector: ChangeDetectorRef){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']?.currentValue === undefined) {
      this.state = 'active';
    }
    if (changes['inputType']?.currentValue === undefined) {
      this.inputType = 'text';
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
    this.getInputField();
    this.getCssClasses();
  }

  getInputField(){
    // TODO: Dynamically load input type, Eg. Calendar, Dropdown, etc.
  }

  private getCssClasses(){
    let classNames = '';
    classNames = this.className + ' '; // Assign @Input class names

    if(this.labelPosition === 'inline'){ // New classes
      classNames += 'inline ';
    }
    if(this.showLabel === false){
      classNames += 'no-label ';
    }

    this.classes = classNames.trim(); // Update className
    this.changeDetector.detectChanges(); // Update DOM
  }

}
