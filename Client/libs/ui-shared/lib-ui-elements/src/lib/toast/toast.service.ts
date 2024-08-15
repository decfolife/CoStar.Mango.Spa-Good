import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, Injectable } from "@angular/core";
import { CremToastOptions, ToastState } from "@mango/data-models/lib-data-models";
import { ToastComponent } from "./toast.component";

@Injectable({ providedIn: 'root' })
export class CremToastService {

  private _components: ComponentRef<ToastComponent>[] = []

  constructor(private overlay: Overlay) { }

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
  show(content: string, title?: string, state?: ToastState, options?: CremToastOptions, contentTemplate?: string) {
    this.clear()
    const componentRef = this._createToastComponentRef()
    this._setComponentInputs(
      componentRef,
      content,
      title,
      state,
      options,
      contentTemplate,
    );
    this._components.push(componentRef)
    return componentRef
  }

  clear() {
    this._components.forEach(c => c.destroy())
    this._components = []
  }
  private _createToastComponentRef(): ComponentRef<ToastComponent> {
    const overlayRef = this.overlay.create()
    const portal = new ComponentPortal<ToastComponent>(ToastComponent)
    const componentRef = overlayRef.attach(portal)
    return componentRef
  }

  private _setComponentInputs(
    componentRef: ComponentRef<ToastComponent>,
    content: string,
    title?: string,
    state?: ToastState,
    options?: CremToastOptions,
    contentTemplate?: string,
  ): void {
    options = options || {}
    componentRef.setInput('message', content)
    componentRef.setInput('messageHeader', title)
    componentRef.setInput('state', state)
    componentRef.setInput('duration', options.duration || componentRef.instance.duration)
    componentRef.setInput('showBody', options.showBody || componentRef.instance.showBody)
    componentRef.setInput('maxWidth', options.maxWidth || componentRef.instance.maxWidth)
    componentRef.setInput('position', options.position || componentRef.instance.position)
    componentRef.setInput('closeOnClick', options.closeOnClick || componentRef.instance.closeOnClick)
    componentRef.setInput('showCloseButton', options.showCloseButton || componentRef.instance.showCloseButton)
    componentRef.setInput('contentTemplate', contentTemplate)
  }
}
