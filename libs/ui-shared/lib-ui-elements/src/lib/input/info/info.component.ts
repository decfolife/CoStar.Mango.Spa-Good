/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../icon';
/**
 * Info Input:
 */
@Component({
  selector: 'crem-input-info',
  standalone: true,
  imports: [
    CommonModule,
    IconModule,
  ],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InputInfoComponent {}
