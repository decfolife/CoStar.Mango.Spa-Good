/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputInfoComponent } from '../info';

/**
 * Label Input:
 */
@Component({
  selector: 'crem-input-label',
  standalone: true,
  imports: [
    CommonModule,
    InputInfoComponent,
  ],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class InputLabelComponent {
  @Input() label: string;
  @Input() name: string;
  @Input() required?: boolean;
  @Input() showInfo?: boolean;
}