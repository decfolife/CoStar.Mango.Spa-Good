import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastState } from '@mango/data-models/lib-data-models';
import { DxToastModule } from 'devextreme-angular';
import { IconModule } from '../icon';
import { CremToastService } from './toast.service';
import {
  BORDER_COLOR_MAP,
  ICON_BG_COLOR_MAP,
  POSITION_MAP,
} from './toast.maps';

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
  providers: [CremToastService],
})
export class ToastComponent implements OnDestroy, OnInit, AfterViewInit {
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
  @Input() duration = 6000 as number;

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
  @Input() position?:
    | 'top left'
    | 'top center'
    | 'top right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right' = 'bottom right';

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

  /**
   * Remove toast
   *
   * @memberof ToastComponent
   */
  @Output() onDestroy = new EventEmitter<void>();

  /**
   * Listen to change in the height of toast based on content inside
   *
   * @memberof ToastComponent
   */

  @Output() heightChange = new EventEmitter<void>();

  createdAt: number = Date.now();
  offset = 0;
  private resizeObserver: ResizeObserver;
  private destroyTimer: any;

  constructor(public elementRef: ElementRef) {
    this.resizeObserver = new ResizeObserver(() => {
      this.heightChange.emit();
    });
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.setupAutoHide();
  }

  ngAfterViewInit() {
    // Start observing the wrapper element for size changes
    const wrapper =
      this.elementRef.nativeElement.querySelector('.template-wrapper');
    if (wrapper) {
      this.resizeObserver.observe(wrapper);
    }
  }

  /**
   * @ignore
   */
  setupAutoHide() {
    if (this.duration !== -1) {
      this.destroyTimer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  updatePosition(newOffset: number) {
    this.offset = newOffset;
  }

  /**
   * @ignore
   */
  close() {
    if (this.destroyTimer) {
      clearTimeout(this.destroyTimer);
    }
    this.onDestroy.emit();
    this.ngOnDestroy();
  }

  /**
   * @ignore
   */
  getToastBorderColor() {
    return BORDER_COLOR_MAP[this.state];
  }

  /**
   * @ignore
   */
  getIconBgColorClasses() {
    return ICON_BG_COLOR_MAP[this.state];
  }

  /**
   * @ignore
   */
  getWrapperCSS() {
    const basePosition = POSITION_MAP[this.position];
    let positionStyle: any = { ...basePosition };

    if (this.position.startsWith('bottom')) {
      positionStyle.bottom = `${
        parseInt(positionStyle.bottom) + this.offset
      }px`;
    } else {
      positionStyle.top = `${parseInt(positionStyle.top) + this.offset}px`;
    }

    return {
      maxWidth: this.maxWidth,
      ...positionStyle,
      transition: 'all 0.3s ease',
    };
  }

  getOptions() {
    return {
      duration: this.duration,
      showBody: this.showBody,
      maxWidth: this.maxWidth,
      position: this.position,
      closeOnClick: this.closeOnClick,
      showCloseButton: this.showCloseButton,
      offset: this.offset,
    };
  }

  /**
   * @ignore
   */
  ngOnDestroy(): void {
    if (this.destroyTimer) {
      clearTimeout(this.destroyTimer);
    }
    this.resizeObserver.disconnect();
    this.elementRef.nativeElement.remove();
  }
}
