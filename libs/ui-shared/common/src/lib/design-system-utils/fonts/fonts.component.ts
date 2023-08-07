import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignSystemFontToken } from './font/font.component';
import { Font } from '../definitions';

/**
 * Design System
 * Fonts Token: Implementation example
 */
@Component({
  selector: 'mango-design-system-fonts-token',
  standalone: true,
  imports: [
    CommonModule,
    DesignSystemFontToken,
  ],
  templateUrl: './fonts.component.html',
  styleUrls: ['./fonts.component.scss'],
})
export class DesignSystemFontsToken {
  @Input() fonts: Array<Font>;
}