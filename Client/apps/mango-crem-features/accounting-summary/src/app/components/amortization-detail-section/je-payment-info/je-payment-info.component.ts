import { Component, Input, SimpleChanges } from '@angular/core';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { AmortizationGridColumnsService } from '@accounting-summary/services/amortization-grid-columns.service';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';

@Component({
  selector: 'mango-je-payment-info',
  templateUrl: './je-payment-info.component.html',
  styleUrls: ['./je-payment-info.component.scss'],
})

export class JePaymentInfoComponent{
  @Input() jePaymentPopupData: any;
  @Input() userInfo: UserInfoResponse;

  jePaymentGridColumns = [];
  componentName = "je-payment-info";
  isEuroDateFormat: boolean = false;
  dateFormat = 'MM/dd/yyyy';

  chargeAmountFormatter = (value: any) => this.formattingService.localFormat(+value, this.jePaymentPopupData[0].chargeCurrencyDecimalPrecision);
  scheduleAmountFormatter = (value: any) => this.formattingService.localFormat(+value, this.jePaymentPopupData[0].scheduleCurrencyDecimalPrecision);

  constructor(public accountingSummaryService: AccountingSummaryService, public formattingService: FormattingService, public jePaymentGridColumnsService: AmortizationGridColumnsService ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.jePaymentInfoGridSetup();
  }

  dateTimeStamp(){
    return new Date();
  }

  jePaymentInfoGridSetup() {
    this.isEuroDateFormat = this.userInfo.useDateEU;
    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
    }

    this.jePaymentGridColumns = this.jePaymentGridColumnsService.getJePaymentGridColumns(this.dateFormat);

    const showDirectCost = this.jePaymentPopupData.some(item => item.directCosts !== 0);
    const showTerminationFee = this.jePaymentPopupData.some(item => item.terminationFees !== 0);

    this.jePaymentGridColumns.forEach(column => {

      if (column.name === 'DirectCosts') {
        column.visible = showDirectCost;
      } else if (column.name === 'TerminationFees') {
        column.visible = showTerminationFee;
      }

      if (column.name === 'ActualAmountDueInPeriod') {
        column.format = value => this.formattingService.localFormat(+value, this.jePaymentPopupData[0].scheduleCurrencyDecimalPrecision);
        column.caption = this.getFormattedDisplay('columnCaption');     
      }

      if (column.name === 'ChargeAmount' || column.name === 'DirectCosts' || column.name === 'TerminationFees') {
        column.format = value => this.formattingService.localFormat(+value, this.jePaymentPopupData[0].chargeCurrencyDecimalPrecision)
      }
    });

    return this.jePaymentGridColumns;
  }

  customSummaryCalculation(options) {
    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {
      switch (options.name) {
        case 'chargeAmount':
          options.totalValue += options.value.chargeAmount || 0;
          break;
        case 'actualAmountDueInPeriod':
          if (options.value.chargeAmount !== 0) {
            options.totalValue += options.value.actualAmountDueInPeriod || 0;
          }
          break;
      }
    }
  }

  getFormattedDisplay(target: 'summaryRow' | 'columnCaption'): string {
    if (!this.jePaymentPopupData || !this.jePaymentPopupData[0]) {
      return ''; 
    }
  
    const currency = this.jePaymentPopupData[0].currency;
    const delimiter = currency.split('|');
    const getCurrency = delimiter.length > 1 ? delimiter[1]?.trim() : currency.trim();
  
    if (target === 'summaryRow') {
      return `Sum in Event Currency (${getCurrency})`;
    } else if (target === 'columnCaption') {
      return `Amount Due in Period (${getCurrency})`;
    }
  }
}

