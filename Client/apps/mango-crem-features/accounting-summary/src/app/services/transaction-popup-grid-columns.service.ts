import { Injectable } from '@angular/core';
import { FormattingService } from './formatting.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionPopupGridColumnsService {

  constructor(private formattingService: FormattingService) { }

  getTransactionPopupGridColumns(currencyInfo, dateFormat: string) {
    
    const columns = [];
    columns.push(
      {
        caption: 'Due By',
        name: 'DueBy',
        dataField: 'dueBy',
        dataType:'date',
        format: dateFormat,
        sortIndex:"0",
        sortOrder:"asc",
        headerCellTemplate: 'amortizationHeader', 
        cellTemplate: 'pointer',
        alignment:'left'
      },
      {
        caption: 'Base (' + currencyInfo.baseCurrency + ')',
        name: 'BaseAmount',
        dataField: 'baseAmount',
        headerCellTemplate:'amortizationHeader',
        cellTemplate: 'pointer',
        format: value => this.formattingService.localFormat(+value, currencyInfo.baseCurrencyDecimalPrecision),
        alignment:'right'
      },
      {
        caption: 'Target (' + currencyInfo.targetCurrency + ': ' + currencyInfo.conversionRate.toFixed(currencyInfo.targetCurrencyDecimalPrecision) + ')',
        name: 'TargetAmount',
        dataField: 'targetAmount',
        headerCellTemplate:'amortizationHeader',
        cellTemplate: 'pointer',
        format: value => this.formattingService.localFormat(+value, currencyInfo.targetCurrencyDecimalPrecision),
        alignment:'right'
      },
      {
        caption: 'End Date',
        name: 'TransactionEndDate',
        dataField: 'transactionEndDate',
        dataType:'date',
        format: dateFormat,
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        alignment:'left'
      },
      {
        caption: 'Processing Status',
        name: 'ProcessingStatus',
        dataField: 'processingStatus',
        headerCellTemplate: 'amortizationHeader', 
        cellTemplate: 'pointer',
        alignment:'left'
      },
      {
        caption: 'System Scheduled Transaction ID',
        name: 'TransactionID', 
        dataField: 'transactionID',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        alignment:'right'
      }
    );
    return columns;
  }
}
