import { Component, Input } from '@angular/core';
import { CremFormControlStatusType } from '@mango/data-models/lib-data-models';
import { CremSharedComponent } from './base-shared-component';

@Component({ template: '' })
export abstract class CremValidatedComponent extends CremSharedComponent {
  @Input() status: CremFormControlStatusType = 'default';
  @Input() statusMessage: string = undefined;
  @Input() isRequired: boolean;
}
