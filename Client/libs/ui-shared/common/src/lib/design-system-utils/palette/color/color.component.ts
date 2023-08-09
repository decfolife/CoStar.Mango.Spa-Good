import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Design System
 * Color Token: Implementation example
 */
@Component({
  selector: 'mango-color-token',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class DesignSystemColorToken {

  // COLOR
  @Input() color: string;

  // WCAG
  @Input() wcagColor?: string;
  @Input() wcagContrast?: string;
  @Input() wcagDescription?: string;

  // BODY
  @Input() name: string;
  @Input() description: string;
  @Input() examples?: string;
}