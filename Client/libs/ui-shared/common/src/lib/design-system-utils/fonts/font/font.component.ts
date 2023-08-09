import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontDetails, FontExamples } from '../../definitions';

/**
 * Design System
 * Font Token: Implementation example
 * Use the same name as the common library maps
 */
@Component({
  selector: 'mango-design-system-font-token',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './font.component.html',
  styleUrls: ['./font.component.scss'],
})
export class DesignSystemFontToken {
  @Input() fontDetails: FontDetails;
  @Input() examples: FontExamples;
}