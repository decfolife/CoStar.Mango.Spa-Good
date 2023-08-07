import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Palette } from '../definitions';
import { DesignSystemColorToken } from './color/color.component'

/**
 * Design System
 * Color Token: Implementation example
 */
@Component({
  selector: 'mango-design-system-palette',
  standalone: true,
  imports: [
    CommonModule,
    DesignSystemColorToken,
  ],
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
})
export class DesignSystemPalette {
  @Input() palette: Palette;
}