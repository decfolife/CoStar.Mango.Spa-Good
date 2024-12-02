import { Injectable } from '@angular/core';
import { FormattingService } from './formatting.service';

@Injectable({
  providedIn: 'root',
})
export class SchedulePaymentsGridColumnsService {
  constructor(private formattingService: FormattingService) {}

  getSchedulePaymentColumns(
    schedulePaymentsData,
    dateFormat: string,
    localCurrency: string
  ) {
    const columns = [];

    columns.push(
      {
        caption: 'Account Name',
        name: 'AccountName',
        dataField: 'glAccountName',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
      },
      {
        caption: 'Event Name',
        name: 'EventName',
        dataField: 'glEventName',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
      },
      {
        caption: 'Payment Event Source',
        name: 'PaymentEventSource',
        dataField: 'paymentEventSource',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
      },
      {
        caption: 'Payment Frequency',
        name: 'PaymentFrequency',
        dataField: 'paymentFrequency',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
      },
      {
        caption: 'Is Reasonably Certain',
        name: 'ReasonablyCertain',
        dataField: 'isReasonablyCertain',
        dataType: Boolean,
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        visible: false,
        calculateCellValue: (rowData) =>
          rowData.isReasonablyCertain ? 'Yes' : 'No',
      },
      {
        caption: 'Start Date',
        name: 'StartDate',
        dataField: 'eventBeginDate',
        dataType: 'date',
        format: dateFormat,
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
      },
      {
        caption: 'End Date',
        name: 'EndDate',
        dataField: 'eventEndDate',
        dataType: 'date',
        format: dateFormat,
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
      },
      {
        caption: 'Payment Amount',
        name: 'RecurringAmount',
        dataField: 'recurringAmount',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        dataType: 'number',
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
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
      },
      {
        caption: `Accounting Event Amount (${localCurrency})`,
        name: 'TargetAmountInPeriod',
        dataField: 'targetAmountInPeriod',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        dataType: 'number',
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
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        visible: false,
        calculateCellValue: (rowData) => (rowData.isDirectCost ? 'Yes' : 'No'),
      },
      {
        caption: '# of Payments',
        name: 'NumberOfPayments',
        dataField: 'numberOfPayments',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        visible: false,
      },
      {
        caption: 'Is Prorated',
        name: 'IsProrated',
        dataField: 'isProrated',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        visible: false,
        calculateCellValue: (rowData) => (rowData.isProrated ? 'Yes' : 'No'),
      },
      {
        caption: 'Actions',
        name: 'Actions',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        calculateCellValue: (rowData) => (rowData.isOtherCharge ? 'Edit' : ''),
        onCellClick: 'onEditClick',
      }
    );

    return columns;
  }
}
