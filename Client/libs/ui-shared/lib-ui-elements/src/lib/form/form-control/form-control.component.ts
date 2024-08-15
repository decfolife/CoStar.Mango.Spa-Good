import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crem-form-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
    <div class="crem-form-item-extra" *ngIf="hint">
      {{ hint }}
    </div>
  `,
  host: {
    class: 'crem-form-item-control'
  }
})
export class FormControlComponent {
  @Input() successMessage?: string
  @Input() warningMessage?: string
  @Input() errorMessage?: string
  @Input() validationMessage?: string
  @Input() hint?: string

}
