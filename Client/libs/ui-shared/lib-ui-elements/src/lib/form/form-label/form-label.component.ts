import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crem-form-label',
  standalone: true,
  imports: [CommonModule],
  template: `
  <label [attr.for]="for" [class.crem-form-item-required]="required">
    <ng-content></ng-content>
  </label>
  `,
  styleUrls: ['./form-label.component.scss']
})
export class FormLabelComponent {

  @Input() for?: string
  @Input() required = false

}
