import { Injectable } from '@angular/core';
import { FormattingService } from './formatting.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentsGridColumnsService {
  constructor(private formattingService: FormattingService) {}

  getPaymentGridColumns(currencyInfo, dateFormat: string) {
    const columns = [];

    columns.push(
      {
        caption: 'Account Name',
        name: 'AccountName',
        dataField: 'glAccountName',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Event Name',
        name: 'EventName',
        dataField: 'glEventName',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Payment Event Source',
        name: 'PaymentEventSource',
        dataField: 'paymentEventSource',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Payment Frequency',
        name: 'PaymentFrequency',
        dataField: 'paymentFrequency',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Start Date',
        name: 'StartDate',
        dataField: 'eventBeginDate',
        dataType: 'date',
        format: dateFormat,
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'End Date',
        name: 'EndDate',
        dataField: 'eventEndDate',
        dataType: 'date',
        format: dateFormat,
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Payment Amount',
        name: 'RecurringAmount',
        dataField: 'recurringAmount',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        dataType: 'number',
        appendsCurrency: 'false',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        calculateCellValue: (rowData) =>
          this.formattingService.localFormat(
            +rowData.recurringAmount,
            rowData.chargeCurrencyDecimalPrecision
          ),
      },
      {
        caption: 'Payment Currency',
        name: 'ChargeCurrency',
        dataField: 'chargeCurrency',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: `Accounting Event Amount (${currencyInfo})`,
        name: 'TargetAmountInPeriod',
        dataField: 'targetAmountInPeriod',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        dataType: 'number',
        appendsCurrency: 'true',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        calculateCellValue: (rowData) =>
          this.formattingService.localFormat(
            +rowData.targetAmountInPeriod,
            rowData.scheduleCurrencyDecimalPrecision
          ),
      },
      {
        caption: 'Is Direct Cost',
        name: 'IsDirectCost',
        dataField: 'isDirectCost',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        calculateCellValue: (rowData) => (rowData.isDirectCost ? 'Yes' : 'No'),
      },
      {
        caption: '# of Payments',
        name: 'NumberOfPayments',
        dataField: 'numberOfPayments',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Is Prorated',
        name: 'IsProrated',
        dataField: 'isProrated',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        calculateCellValue: (rowData) => (rowData.isProrated ? 'Yes' : 'No'),
      },
      {
        caption: 'Is Reasonably Certain',
        name: 'ReasonablyCertain',
        dataField: 'isReasonablyCertain',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        calculateCellValue: (rowData) =>
          rowData.isReasonablyCertain ? 'Yes' : 'No',
      },
      {
        caption: 'Recognition Category (GAAP)',
        name: 'RecognitionCategoryGAAP',
        dataField: 'recognitionCategoryGAAP',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Recognition Category (IFRS)',
        name: 'RecognitionCategoryIFRS',
        dataField: 'recognitionCategoryIFRS',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      },
      {
        caption: 'Payment Notes',
        name: 'PaymentNotes',
        dataField: 'glEventNotes',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
      }
    );

    return columns;
  }
}
