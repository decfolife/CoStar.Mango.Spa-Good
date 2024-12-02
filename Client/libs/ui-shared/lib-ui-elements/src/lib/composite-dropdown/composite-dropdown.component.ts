/* eslint-disable @angular-eslint/component-selector */
import { Component, HostListener, Input } from '@angular/core';
import { CremFormControlStatusType } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'crem-composite-dropdown',
  templateUrl: './composite-dropdown.component.html',
  styleUrls: ['./composite-dropdown.component.scss'],
})
export class CompositeDropdownComponent {
  @Input() Id: string | number;
  @Input() isOpen?: boolean = false;
  @Input() isFormValid?: boolean = true;
  @Input() closeOnOutsideClick?: boolean = true;
  @Input() showSubtitle?: boolean = false;
  @Input() showFooter?: boolean = false;
  @Input() Title?: string;
  @Input() SubTitle?: string;
  @Input() FooterContent?: string;
  @Input() status: CremFormControlStatusType = 'default';
  @Input() statusMessage: string = 'One or more required fields is not valid.';

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen || !this.closeOnOutsideClick) {
      return;
    }
    const target = event.target as HTMLElement;
    const isInsideDropdown = target.closest(`#${this.Id}`);
    const overlay = target.closest('.dx-overlay-content');
    if (
      !isInsideDropdown &&
      this.isFormValid &&
      this.closeOnOutsideClick &&
      !overlay
    ) {
      this.isOpen = false;
    }
  }
}
