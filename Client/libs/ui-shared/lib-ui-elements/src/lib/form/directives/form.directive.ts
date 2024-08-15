import { Directive, Input } from '@angular/core';
import { FormLabelAlignment, RemFormLayout } from '@mango/data-models/lib-data-models';


@Directive({
  selector: '[crem-form]',
  host: {
    class: 'crem-form',
    '[class.crem-form-horizontal]': `layout === 'horizontal'`,
    '[class.crem-form-vertical]': `layout === 'vertical'`,
    '[class.crem-form-inline]': `layout === 'inline'`,
    '[class.crem-form-label-left]': `labelAlignment === 'left'`,
    '[class.crem-form-label-right]': `labelAlignment === 'right'`,
  },
  standalone: true
})
export class CremFormDirective {

  @Input() layout: RemFormLayout = RemFormLayout.HORIZONTAL
  @Input() labelAlignment: FormLabelAlignment = FormLabelAlignment.RIGHT

}
