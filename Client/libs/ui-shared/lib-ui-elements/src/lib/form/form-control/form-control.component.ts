import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { CremFormControlStatusType } from '@mango/data-models/lib-data-models';
import { CremValidatedComponent } from '../../base';

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
    ></div>
  `,
  host: {
    class: 'crem-form-item-control',
    '[class.control-status__error]': "status === 'error'",
    '[class.control-status__warning]': "status === 'warning'",
  },
})
export class FormControlComponent implements AfterContentInit {
  @Input() validationMessage?: string;
  @Input() hint?: string;
  @Input() status: CremFormControlStatusType = 'default';
  @Input() statusMessage: string = undefined;

  @ContentChild(CremValidatedComponent)
  validatorComponent: CremValidatedComponent;

  ngAfterContentInit(): void {
    if (this.validatorComponent) {
      this.validatorComponent.status = this.status;
      this.validatorComponent.statusMessage = this.statusMessage;
    }
  }
}
