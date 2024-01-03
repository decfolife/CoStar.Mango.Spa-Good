/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChild, ElementRef, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

/**
 * Simple button, check Storybook for additional options
 * @class ButtonComponent
 * @param {string} [textContent]: The button text
 * @param {string} [color]: 'primary', 'secondary', 'warning', 'danger'
 * @param {string} [size]: Besides the normal sizing, 'big' and 'small' are available.
 * @param {string} [ariaLabel]: For accessibility
 * @param {boolean} [disabled]: disables button
 * @param {string} [styles]: CSS styles
 * @param {string} [className]: CSS classes
 * @param {string} [icon]: By default uses FontAwesome, refer to the official docs E.g. 'faUser'
 * @param {string} [iconPosition]: Icon alignment, left or right.
 * @param {string} [iconClass]: Apply a class to the icon for further customization, check crem-icon available params
 * @param {string} [type]: Deprecated, use the color parameter instead
 */
@Component({
  selector: 'crem-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnChanges {

  @Input() text?: string;
  @Input() btnStyle?: 'flat' | 'basic' | 'stroked';
  @Input() color?: 'primary' | 'secondary' | 'warning' | 'danger';
  @Input() size?: 'small' | 'medium' | 'big';
  @Input() ariaLabel?: string;
  @Input() disabled?: boolean | null = null;
  @Input() className?: string | null = null;
  @Input() styles?: string;
  @ContentChild('childContent') childContentRef: ElementRef;

  // Icon Configuration
  @Input() icon?: string;
  @Input() iconPack?: string;
  @Input() iconClass?: string | null = null;
  @Input() iconPosition?: 'left' | 'right';
  @Input() iconColor?: string;
  @Input() iconRotate?: string;
  @Input() iconFlip?: string;
  @Input() iconAnimation?: string;
  @Input() iconSize?: string;
  @Input() iconPull?: string;
  @Input() iconFill?: string;
  @Input() iconTransform?: string;
  @Input() ariaHasPopUp?: boolean;
  @Input() ariaExpanded?: boolean;

  // Backward compatibility, @deprecated
  @Input() type?: 'primary' | 'secondary' | 'text';

  // Output
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges){
    if (changes['btnStyle']?.currentValue === undefined) {
      this.btnStyle = 'flat';
    }
    if (changes['size']?.currentValue === undefined) {
      this.size = 'medium';
    }
    if (changes['iconPosition']?.currentValue === undefined) {
      this.iconPosition = 'left';
    }
  }

  public getCssClasses() {
    return {
      // Btn Style Type
      'btn-flat': this.btnStyle === 'flat',
      'btn-basic': this.btnStyle === 'basic' || this.type === 'text', // @deprecated type input
      'btn-stroked': this.btnStyle === 'stroked',
      // Btn Color
      'btn-primary': this.color === 'primary' || this.type === 'primary', // @deprecated type input
      'btn-secondary': this.color === 'secondary' || this.type === 'secondary', // @deprecated type input
      'btn-warning': this.color === 'warning',
      'btn-danger': this.color === 'danger',
      // Btn Size
      'btn-small': this.size === 'small',
      'btn-big': this.size === 'big',
      // Btn Icon Position
      'btn-icon-left': this.iconPosition === 'left',
      'btn-icon-right': this.iconPosition === 'right',
      // Text
      'no-text': this.text === undefined || this.text === '',
    };
  }

  handleClick(){
    this.buttonClick.emit();
  }

}
