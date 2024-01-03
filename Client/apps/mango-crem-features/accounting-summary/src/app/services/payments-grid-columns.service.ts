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
        calculateCellValue: rowData => this.formattingService.localFormat(+rowData.recurringAmount, rowData.chargeCurrencyDecimalPrecision) + ' ' + rowData.chargeCurrency
      },
      {
        caption: 'Target Amount In Period',
        name: 'TargetAmountInPeriod', 
        dataField: 'targetAmountInPeriod',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        calculateCellValue: rowData => this.formattingService.localFormat(+rowData.targetAmountInPeriod, rowData.scheduleCurrencyDecimalPrecision) + ' ' + rowData.scheduleCurrency
      },
      {
        caption: 'Is Direct Cost',
        name: 'IsDirectCost', 
        dataField: 'isDirectCost',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        calculateCellValue: rowData => rowData.isDirectCost ? 'Yes' : 'No'
      },
      {
        caption: '# of Payments',
        name: 'NumberOfPayments', 
        dataField: 'numberOfPayments',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
      },
      {
        caption: 'Is Prorated',
        name: 'IsProrated', 
        dataField: 'isProrated',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        calculateCellValue: rowData => rowData.isProrated ? 'Yes' : 'No'
      },
      {
        caption: 'Reasonably Certain',
        name: 'ReasonablyCertain', 
        dataField: 'isReasonablyCertain',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        calculateCellValue: rowData => rowData.isReasonablyCertain ? 'Yes' : 'No'
      },
      {
        caption: 'Recognition Category (GAAP)',
        name: 'RecognitionCategoryGAAP', 
        dataField: 'recognitionCategoryGAAP',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false
      },
      {
        caption: 'Recognition Category (IFRS)',
        name: 'RecognitionCategoryIFRS', 
        dataField: 'recognitionCategoryIFRS',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false
      },
      {
        caption: 'Payment Notes',
        name: 'PaymentNotes', 
        dataField: 'glEventNotes',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false
      }
    );

    return columns;
  }
}
