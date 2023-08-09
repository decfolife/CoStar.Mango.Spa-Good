/* eslint-disable @angular-eslint/component-selector */
import { Component, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[type]',
})
export class ButtonDirective implements OnInit {
  @Input() type: string;
  constructor(private hostElement: ElementRef) {}

  ngOnInit() {
    switch (this.type) {
      case 'primary':
        this.hostElement.nativeElement.classList.add('button-primary');

        break;
      case 'secondary':
        this.hostElement.nativeElement.classList.add('button-secondary');

        break;
      case 'text':
        this.hostElement.nativeElement.classList.add('button-text');

        break;
      case 'view':
        this.hostElement.nativeElement.classList.add('view-button');

        break;
      default:
        this.hostElement.nativeElement.classList.add('button-primary');
    }
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[size]',
})
export class ButtonSizeDirective implements OnInit {
  @Input() size: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    switch (this.size) {
      case 'medium':
        this.el.nativeElement.classList.add('button-size-medium');
        break;
      case 'small':
        this.el.nativeElement.classList.add('button-size-small');
        break;
      default:
        this.el.nativeElement.classList.add('button-size-medium');
    }
  }
}

@Component({
  selector: 'cs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  providers: [ButtonDirective, ButtonSizeDirective]
})
export class ButtonComponent implements OnInit {

  @Input() size;
  @Input() type;
  @Input() content: string;
  @Input() disabled?: boolean = false;
  buttonClasses: string;
  @Input() icon?: string;
  @Input() badge?: string;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types

  iconColor: '#0559b3' | '#fff' | '#000';
  iconClass: string;
  @Input() iconPosition?: 'left' | 'right' | 'top';

  constructor(public el: ElementRef, public sizeDir: ButtonSizeDirective, public typeDir: ButtonDirective) {
    if (this.iconPosition === 'left') {
      this.iconClass === `button-icon-position-left`;
    } else if (this.iconPosition === 'right') {
      this.iconClass === `button-icon-position-right`;
    } else {
      this.iconClass === 'button-icon-position-top';
    }
    this.sizeDir.size = this.size;
    this.typeDir.type = this.type;
  }
  ngOnInit() {
    if (
      this.iconClass === 'button-icon-position-right' &&
      (this.type.type === 'secondary' || 'text')
    ) {
      this.iconColor = '#0559b3';
    } else if (
      (this.type.type === 'secondary' || 'text') &&
      this.iconClass === 'button-icon-position-left'
    ) {
      this.iconColor = '#000';
    } else if (this.type.type === 'primary') {
      this.iconColor = '#fff';
    }
    this.buttonClasses =
      this.disabled === true ? `${this.iconClass} disabled` : this.iconClass;
  }
}
