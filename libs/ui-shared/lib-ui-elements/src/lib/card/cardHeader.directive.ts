import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cardHeader]',
})
export class CardHeaderDirective {
  constructor(
    public viewContainer: ViewContainerRef,
    public template: TemplateRef<any>
  ) {}
  @Input() set cardHeader(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}
