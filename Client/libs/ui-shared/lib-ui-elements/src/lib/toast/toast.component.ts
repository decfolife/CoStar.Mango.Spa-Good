import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastState } from '@mango/data-models/lib-data-models';
import { DxToastModule } from "devextreme-angular";
import { IconModule } from '../icon';
import { CremToastService } from './toast.service';

const BORDER_COLOR_MAP = {
  [ToastState.INFORMATION]: 'info-toast-border-color',
  [ToastState.SUCCESS]: 'success-toast-border-color',
  [ToastState.WARNING]: 'warning-toast-border-color',
  [ToastState.ERROR]: 'error-toast-border-color'
}

const ICON_BG_COLOR_MAP = {
  [ToastState.INFORMATION]: 'info-icon-bgcolor',
  [ToastState.SUCCESS]: 'success-icon-bgcolor',
  [ToastState.WARNING]: 'warning-icon-bgcolor',
  [ToastState.ERROR]: 'error-icon-bgcolor',
}

const POSITION_MAP = {
  'top left': { top: '20px', left: '20px' },
  'top center': { top: '20px', left: '40%' },
  'top right': { top: '20px', right: '20px' },
  'bottom left': { bottom: '20px', left: '20px' },
  'bottom center': { bottom: '20px', left: '40%' },
  'bottom right': { bottom: '20px', right: '20px' }
}

/**
 * The toast component is used through the CremToastService, precisely the `.show()` function described in the section below
 * @class ToastComponent
 */
@Component({
  standalone: true,
  imports: [CommonModule, DxToastModule, IconModule, OverlayModule],
  selector: 'crem-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [CremToastService]
})
export class ToastComponent implements OnDestroy, OnInit {

  /**
   * 
   * @type {ToastState}
   * @memberof ToastComponent
   */
  @Input() state: ToastState;

  /**
   * Simple body message.
   * @type {string}
   * @memberof ToastComponent
   */
  @Input() message?: string = '';

  /**
   * Pass an HTML element to be rendered inside the toast.
   * @type {string}
   * @memberof ToastComponent
   */
  @Input() contentTemplate?: string;

  /**
   * The title or header of the toast.
   * @type {string}
   * @memberof ToastComponent
   */
  @Input() messageHeader?: string = '';

  /**
   * Maximum visibility duration of the toast before it is automatically dismissed, in milliseconds.
   * 
   * @type {number}
   * @memberof ToastComponent
   */
  @Input() duration = 3000 as number;

  /**
   * Show/Hide toast body, it will hide the message or contentTemplate.
   * 
   * @type {boolean}
   * @memberof ToastComponent
   */
  @Input() showBody = true as boolean;

  /**
   * 
   * @type {string}
   * @memberof ToastComponent
   */
  @Input() maxWidth = '320px' as string;

  /**
   * Toast rendering location
   *
   * @type {('top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right')}
   * @memberof ToastComponent
   */
  @Input() position?: 'top left' | 'top center' | 'top right' | 'bottom left' | 'bottom center' | 'bottom right' = 'bottom right';

  /**
   * When true, closes the toast when clicked on any part of its body
   *
   * @memberof ToastComponent
   */
  @Input() closeOnClick = false as boolean;

  /**
   * @ignore
   */
  @Input() showCloseButton = true as boolean;

  /**
   * @ignore
   */
  @Input() visible = true as boolean;

  constructor(private elementRef: ElementRef) { }

  /**
   * @ignore
  */
  ngOnInit(): void {
    this.setupAutoHide()
  }

  /**
   * @ignore
  */
  setupAutoHide() {
    if (this.duration != -1) {
      setTimeout(() => this.ngOnDestroy(), this.duration);
    }
  }

  /**
   * @ignore
   */
  close() {
    this.ngOnDestroy()
  }

  /**
   * @ignore
   */
  getToastBorderColor() {
    return BORDER_COLOR_MAP[this.state]
  }

  /**
   * @ignore
   */
  getIconBgColorClasses() {
    return ICON_BG_COLOR_MAP[this.state]
  }

  /**
   * @ignore
   */
  getWrapperCSS() {
    return {
      maxWidth: this.maxWidth,
      ...POSITION_MAP[this.position]
    }
  }

  /**
    * @ignore
   */
  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove()
  }
}
