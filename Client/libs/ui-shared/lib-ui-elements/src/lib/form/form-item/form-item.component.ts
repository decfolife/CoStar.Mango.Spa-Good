import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crem-form-item',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'crem-form-item'
  }
})
export class FormItemComponent {

}
