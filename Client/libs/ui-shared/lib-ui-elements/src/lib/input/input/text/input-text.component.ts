/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBaseComponent } from '../base';

/**
 * Input Text: A single-line text field. Line-breaks are automatically removed from the input value
 */
@Component({
  selector: 'crem-input-text',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './input-text.component.html',
  styleUrls: [
    './input-text.component.scss',
    '../base/base-input.component.scss',
  ],
})
export class InputTextComponent extends InputBaseComponent{}