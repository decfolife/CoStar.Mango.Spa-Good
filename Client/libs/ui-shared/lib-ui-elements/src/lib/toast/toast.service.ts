import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import {
  CremToastOptions,
  QueuedToasts,
  ToastState,
} from '@mango/data-models/lib-data-models';
import { ToastComponent } from './toast.component';

@Injectable({ providedIn: 'root' })
export class CremToastService {
  private _components: ComponentRef<ToastComponent>[] = [];
  private _queuedToasts: QueuedToasts[] = [];
  private readonly MAX_TOASTS = 3;
  private readonly MARGIN_BETWEEN_TOASTS = 5;
  private readonly BASE_OFFSET = 20;

  constructor(private overlay: Overlay) {}

  /**
   * Provide the following parameters to render the Toast Notification
   *
   * @param {string} content
   * @param {string} [title]
   * @param {ToastState} [state]
   * @param {CremToastOptions} [options]
   * @param {TemplateRef} [contentTemplate]
   * @memberof CremToastService
   */
  show(
    content: string,
    title?: string,
    state?: ToastState,
    options?: CremToastOptions,
    contentTemplate?: string
  ) {
    const maxToasts = options?.maxToasts || this.MAX_TOASTS;

    if (this._components.length >= maxToasts) {
      // Queue the toast if we're at capacity
      this._queuedToasts.push({
        content,
        title,
        state,
        options,
        contentTemplate,
      });
      return;
    }

    const componentRef = this._createToastComponentRef();
    const position = options?.position || 'bottom right';
    componentRef.instance.createdAt = Date.now();

    this._setComponentInputs(
      componentRef,
      content,
      title,
      state,
      {
        ...options,
        position,
      },
      contentTemplate
    );

    componentRef.instance.heightChange.subscribe(() => {
      this._repositionToasts();
    });

    componentRef.instance.onDestroy.subscribe(() => {
      this.removeToast(componentRef);
      this._showNextQueuedToast(maxToasts);
    });

    this._components.push(componentRef);

    // Waiting for DOM to load
    setTimeout(() => {
      this._repositionToasts();
    }, 0);
  }

  private _showNextQueuedToast(maxToasts: number) {
    if (this._queuedToasts.length > 0 && this._components.length < maxToasts) {
      const nextToast = this._queuedToasts.shift();
      if (nextToast) {
        this.show(
          nextToast.content,
          nextToast.title,
          nextToast.state,
          nextToast.options,
          nextToast.contentTemplate
        );
      }
    }
  }

  private _calculateToastPosition(): void {
    const position = this._components[0]?.instance.position || 'bottom right';
    const isTopPosition = position.startsWith('top');
    let currentOffset = this.BASE_OFFSET;

    // Get heights of all toasts
    const toastHeights = this._components.map((comp) => {
      const element = comp.instance.elementRef.nativeElement;
      return element.querySelector('.template-wrapper')?.offsetHeight || 0;
    });

    // Calculate positions based on direction
    if (isTopPosition) {
      // Top position: Calculate from top down
      this._components.forEach((comp, index) => {
        comp.instance.updatePosition(currentOffset);
        currentOffset += toastHeights[index] + this.MARGIN_BETWEEN_TOASTS;
      });
    } else {
      // Bottom position: Calculate from bottom up
      let reversedOffset = this.BASE_OFFSET;
      [...this._components].reverse().forEach((comp, index) => {
        comp.instance.updatePosition(reversedOffset);
        reversedOffset +=
          toastHeights[toastHeights.length - 1 - index] +
          this.MARGIN_BETWEEN_TOASTS;
      });
    }
  }

  private _repositionToasts() {
    if (this._components.length === 0) return;
    this._calculateToastPosition();
  }

  removeToast(componentRef: ComponentRef<ToastComponent>) {
    const index = this._components.indexOf(componentRef);
    if (index > -1) {
      this._components.splice(index, 1);
      componentRef.destroy();
      this._repositionToasts();
    }
  }

  clear() {
    this._components.forEach((c) => c.destroy());
    this._components = [];
    this._queuedToasts = [];
  }
  private _createToastComponentRef(): ComponentRef<ToastComponent> {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global(),
    });
    const portal = new ComponentPortal<ToastComponent>(ToastComponent);
    return overlayRef.attach(portal);
  }

  private _setComponentInputs(
    componentRef: ComponentRef<ToastComponent>,
    content: string,
    title?: string,
    state?: ToastState,
    options?: CremToastOptions & { offset?: number },
    contentTemplate?: string
  ): void {
    options = options || {};
    componentRef.setInput('message', content);
    componentRef.setInput('messageHeader', title);
    componentRef.setInput('state', state);
    componentRef.setInput(
      'duration',
      options.duration || componentRef.instance.duration
    );
    componentRef.setInput(
      'showBody',
      options.showBody || componentRef.instance.showBody
    );
    componentRef.setInput(
      'maxWidth',
      options.maxWidth || componentRef.instance.maxWidth
    );
    componentRef.setInput(
      'position',
      options.position || componentRef.instance.position
    );
    componentRef.setInput(
      'closeOnClick',
      options.closeOnClick || componentRef.instance.closeOnClick
    );
    componentRef.setInput(
      'showCloseButton',
      options.showCloseButton || componentRef.instance.showCloseButton
    );
    componentRef.setInput('contentTemplate', contentTemplate);
  }
}
