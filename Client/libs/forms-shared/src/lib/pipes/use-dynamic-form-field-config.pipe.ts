import { Directive, Input, OnInit, Optional } from '@angular/core';
import {
  CremValidatedComponent,
  InputLabelComponent,
} from '@mango/ui-shared/lib-ui-elements';

@Directive({
  selector: '[use-dynamic-form-field-config]',
  standalone: true,
})
export class UseDynamicFormFieldConfigDirective implements OnInit {
  @Input() useFieldConfig: any;

  constructor(
    @Optional() private componentLabel: InputLabelComponent,
    @Optional() private cremComponent: CremValidatedComponent
  ) {}

  ngOnInit(): void {
    if (this.useFieldConfig) {
      const { isRequired } = this.parseFormFieldConfig();

      if (this.cremComponent) {
        this.cremComponent.isRequired = isRequired;
      }

      if (this.componentLabel) {
        this.componentLabel.required = isRequired;
      }
    }
  }

  private parseFormFieldConfig() {
    const { formItemMandatoryStep } =
      this.useFieldConfig.name.formItemSectionDetail;

    return {
      isRequired: formItemMandatoryStep === 1,
    };
  }
}
