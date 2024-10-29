import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CremFormControlStatusType } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'crem-form-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    <div class="crem-form-item-extra" *ngIf="hint">
      {{ hint }}
    </div>
    <div
      class="crem-form-item-status "
      [ngClass]="{
        'crem-form-item-status__error': status === 'error',
        'crem-form-item-status__warning': status === 'warning',
      }"
      [ngStyle]="{
        visibility: !!status
      }"
    >
      {{ status == 'error' ? errorMessage : warningMessage }}
    </div>
  `,
  host: {
    class: 'crem-form-item-control',
    '[class.control-status__error]': "status === 'error'",
    '[class.control-status__warning]': "status === 'warning'",
  },
})
export class FormControlComponent {
  @Input() successMessage?: string;
  @Input() warningMessage?: string;
  @Input() errorMessage?: string;
  @Input() validationMessage?: string;
  @Input() hint?: string;

  // This is a temporary solution for form validation, the full validation will be added in an upcoming story
  @Input() status: CremFormControlStatusType = '';
}
