import {
  Directive,
  Injectable,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cardContent]',
})
export class CardContentDirective {
  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  @Input() set cardContent(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}
