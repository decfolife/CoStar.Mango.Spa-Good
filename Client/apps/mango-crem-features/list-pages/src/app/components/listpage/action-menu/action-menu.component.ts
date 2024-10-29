import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent {
  @Input() showHoldPaymentsToggle: boolean;
  @Input() isHoldPayments: boolean;
  @Input() buttonbDisabled: boolean;
  @Input() vendorOrCustomer: string;
  @Input() showExpRevOptions: boolean;
  @Input() numberOfItemsSelectedLessThanTwo: boolean;
  @Input() disableTerminateLeaseCharges: boolean;
  @Input() enableDeleteOption: boolean;
  @Input() chargesOnLease: boolean;

  @Output() toggleHoldPayments = new EventEmitter<boolean>();
  @Output() editSelectedChargesEvent = new EventEmitter(null);
  @Output() deleteSelectedChargesEvent = new EventEmitter(null);
  @Output() terminateLeaseChargesEvent = new EventEmitter(null);
  @Output() changeVendorOrCustomerEvent = new EventEmitter(null);
  @Output() changeDefaultVendorOrCustomerEvent = new EventEmitter(null);

  @ViewChild('actionMenuTrigger') actionMenuTrigger: MatMenuTrigger;

  faCaretDown = faCaretDown;

  constructor() {}

  tempAction() {}

  editSelectedChargesAction() {
    this.editSelectedChargesEvent.emit();
  }

  deleteSelectedChargesAction() {
    this.deleteSelectedChargesEvent.emit();
  }

  terminateLeaseChargesAction() {
    this.terminateLeaseChargesEvent.emit();
  }

  changeDefaultVendorOrCustomerAction() {
    this.changeDefaultVendorOrCustomerEvent.emit();
  }

  ChangeVendorOrCustomer() {
    this.changeVendorOrCustomerEvent.emit();
  }

  toggleIsHoldPayments(isHoldPayments: any) {
    this.toggleHoldPayments.emit(isHoldPayments.checked);
  }
}
