/* eslint-disable rxjs-angular/prefer-composition */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import notify from 'devextreme/ui/notify';

import { FinancialReportingSettingsService } from '../../services/financial-reporting-settings.service';

@Component({
  selector: 'mango-enable-financial-reporting-card',
  templateUrl: './enable-financial-reporting-card.component.html',
  styleUrls: ['./enable-financial-reporting-card.component.scss']
})
export class EnableFinancialReportingCardComponent {
  @Input()
  isViewOnly = true;

  @Output()
  enabledChanged = new EventEmitter<boolean>();

  showConfirm = false;
  buttonDisabled = false;

  constructor(private service: FinancialReportingSettingsService) { }

  onConfirmClick = () => { // Must be => function for proper `this` context
    this.buttonDisabled = true;

    this.service.enableFinancialReporting().subscribe(res => {
      if (!res.succeeded) {
        this.showNotify(res.message, true);

        return;
      }

      this.enabledChanged.emit(true);
      this.showNotify(res.message);
    });
  }

  private showNotify(message: string, isError = false) {
    notify({
      message,
      type: isError ? 'error' : 'success',
      displayTime: 3000,
      position: { at: 'bottom right', my: 'bottom right', offset: '-16 -16' },
      maxWidth: '400px',
      closeOnClick: true,
    });
  }
}
