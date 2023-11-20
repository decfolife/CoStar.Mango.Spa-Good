import { Injectable } from '@angular/core';
import { FormattingService } from './formatting.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsGridColumnsService {

  constructor(private formattingService: FormattingService) { }

  getPaymentGridColumns(currencyInfo, dateFormat: string) {
    const columns = [];

    columns.push(
      {
        caption: 'Account Name', name: 'AccountName', dataField: 'glAccountName',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Event Name', name: 'EventName', dataField: 'glEventName',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Payment Event Source', name: 'PaymentEventSource', dataField: 'paymentEventSource',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Payment Frequency', name: 'PaymentFrequency', dataField: 'paymentFrequency',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Start Date', name: 'StartDate', dataField: 'eventBeginDate', dataType:'date' ,format: dateFormat,
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'End Date', name: 'EndDate', dataField: 'eventEndDate', dataType:'date', format: dateFormat,
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Recurring Amount',
        name: 'RecurringAmount', 
        dataField: 'recurringAmount',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        calculateCellValue: rowData => this.formattingService.localFormat(+rowData.recurringAmount, rowData.baseCurrencyDecimalPrecision) + ' ' + rowData.baseCurrency
      },
      {
        caption: 'Target Amount In Period',
        name: 'TargetAmountInPeriod', 
        dataField: 'targetAmountInPeriod',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        calculateCellValue: rowData => this.formattingService.localFormat(+rowData.targetAmountInPeriod, rowData.targetCurrencyDecimalPrecision) + ' ' + rowData.targetCurrency
      }
    );

    return columns;
  }
}
