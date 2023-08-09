/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-view-button',
  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.scss'],
})
export class ViewButtonComponent {
  @Input() icon: string;
  @Input() iconColor: string;
  isActive = false;

  buttonClicked() {
    this.isActive = !this.isActive;
  }
}
