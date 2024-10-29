import { Injectable } from '@angular/core';
import { FormattingService } from './formatting.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionPopupGridColumnsService {
  constructor(private formattingService: FormattingService) {}

  getTransactionPopupGridColumns(currencyInfo, dateFormat: string) {
    const columns = [];
    columns.push(
      {
        caption: 'Due By',
        name: 'DueBy',
        dataField: 'dueBy',
        dataType: 'date',
        format: dateFormat,
        width: 110,
        sortIndex: '0',
        sortOrder: 'asc',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        alignment: 'left',
      },
      {
        caption: 'Payment Amount (' + currencyInfo.chargeCurrency + ')',
        name: 'BaseAmount',
        dataField: 'baseAmount',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        format: (value) =>
          this.formattingService.localFormat(
            +value,
            currencyInfo.chargeCurrencyDecimalPrecision
          ),
        alignment: 'right',
      },
      {
        caption:
          'Accounting Event Amount (' +
          currencyInfo.scheduleCurrency +
          ': ' +
          currencyInfo.conversionRate.toFixed(
            currencyInfo.scheduleCurrencyDecimalPrecision
          ) +
          ')',
        name: 'TargetAmount',
        dataField: 'targetAmount',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        format: (value) =>
          this.formattingService.localFormat(
            +value,
            currencyInfo.scheduleCurrencyDecimalPrecision
          ),
        alignment: 'right',
      },
      {
        caption: 'End Date',
        name: 'TransactionEndDate',
        dataField: 'transactionEndDate',
        dataType: 'date',
        format: dateFormat,
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        alignment: 'left',
      },
      {
        caption: 'Processing Status',
        name: 'ProcessingStatus',
        dataField: 'processingStatus',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        alignment: 'left',
      },
      {
        caption: 'System Scheduled Transaction ID',
        name: 'TransactionID',
        dataField: 'transactionID',
        headerCellTemplate: 'paymentsGridHeader',
        cellTemplate: 'pointer',
        alignment: 'right',
      }
    );
    return columns;
  }
}
