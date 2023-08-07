/* eslint-disable @angular-eslint/component-selector */
import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../icon';
import { HintType } from '../definitions';

/**
 * Hint Input
 */
@Component({
  selector: 'crem-input-hint',
  standalone: true,
  imports: [
    CommonModule,
    IconModule,
  ],
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class InputHintComponent implements OnChanges {
  @Input() text: string;
  @Input() @HostBinding('class') type: HintType;

  ngOnChanges(changes: SimpleChanges){
    if (changes['type']?.currentValue === undefined) {
      this.type = 'description';
    }
  }

  getCssClasses(){
    return {
      'description':
        this.type === 'active' ||
        this.type === 'description' ||
        this.type === 'read-only' ||
        this.type === 'disabled',
      'read-only': this.type === 'read-only',
      'disabled':  this.type === 'disabled',
      'warning': this.type === 'warning',
      'error': this.type === 'error',
      'success': this.type === 'success',
    }
  }

}
