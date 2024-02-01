import { Injectable } from '@angular/core';
import { FormattingService } from './formatting.service';
import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';

@Injectable({
  providedIn: 'root'
})
export class EventsGridColumnsService {

  constructor(private formattingService: FormattingService) { }


  getDetailsColumns(classificationId: number, currencyInfo, portfolioSettings: PortfolioSettingsResponse, dateFormat: string) {
    let columns = [];

    columns.push(
      {
        caption: 'Actions',
        name: 'actionsColumn',
        dataField: 'leaseRecognitionScheduleId',
        width: 100,
        alignment: 'center',
        cellTemplate: 'actionsTemplate',
        headerCellTemplate: 'amortizationHeader',
        allowHiding: false,
        allowReordering: false,
        allowResizing: false,
        fixed: true,
        fixedPosition: 'right'
      },
      {
        caption: '#', dataField: 'scheduleIndex',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer',
        allowHiding: false, allowReordering: false, allowResizing: false, width: 30, alignment:'center'
      },
      {
        caption: 'Is Published', 
        dataField: 'isPublished',
        headerCellTemplate: 'amortizationHeader', 
        cellTemplate: 'pointer',
        visible: false,
        calculateCellValue: rowData => rowData.isPublished ? 'Yes' : 'No'
      },
      {
        caption: 'Measure Event', name: 'MeasureEvent', dataField: 'measureEvent',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Status', name: 'JEStatus', dataField: 'jeStatus',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'JE Profile', name: 'JEProfile', dataField: 'journalEntryProfileName',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Begin Date', dataField: 'beginDate', dataType:'date' ,format: dateFormat,
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'End Date', dataField: 'endDate', dataType:'date', format: dateFormat,
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
      },
      {
        caption: 'Term (Years)', dataField: 'term',
        alignment: 'right',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer',
        calculateCellValue: rowData => (Math.round(rowData.term * 10000) / 10000).toFixed(2)
      },
      {
        caption: 'Payment Timing', dataField: 'paymentTiming',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer', visible: false
      },
      {
        caption: 'Compound Frequency', dataField: 'compoundFrequencyType',
        headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer', visible: false,

      }
    );


    // leaseRecognitionCalendarID = 1 means that it is a standard calendar
    if (portfolioSettings.leaseRecognitionCalendarID != 1) {
      columns.push({
        caption: 'Days In Term',
        dataField: 'daysInTerm',
        format: value => this.formattingService.formatNumber(+value, 0),
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer'
      });
    } else {
      columns.push({
        caption: '# of Periods',
        dataField: 'periods',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer'
      });
    }

    columns.push(
      {
        caption: 'Total Amount (' + currencyInfo.localCurrency + ')',
        dataField: 'totalAmount',
        format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer'
      });

    const operatingColumns = [
      {
        caption: 'Adjustment',
        dataField: 'adjustmentAmount',
        format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer'
      },
      {
        caption: portfolioSettings.leaseRecognitionCalendarID != 1
          ? 'Straight Line Expense Daily'
          : 'Straight Line Expense',
        dataField: portfolioSettings.leaseRecognitionCalendarID != 1
          ? 'straightLineExpenseDaily'
          : 'straightLineExpense',
        format: value => portfolioSettings.leaseRecognitionCalendarID != 1 ?
          this.formattingService.formatNumber(+value, 14) :
          this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer'
      }
    ],

      capitalColumns = [
        {
          caption: 'Discount Rate',
          dataField: 'discountRateDisplay',
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer'
        },
        {
          caption: 'Present Value (' + currencyInfo.localCurrency + ')',
          dataField: 'presentValue',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'clickable'
        },
        {
          caption: 'FMV',
          dataField: 'fmv',
          format: value => this.formattingService.fmvFormat(+value),
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer'
        }
      ],

      typeColumns = [// Type A/B and IFRS16
        {
          caption: 'Discount Rate',
          dataField: 'discountRateDisplay',
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer'
        },
        {
          caption: 'Present Value (' + currencyInfo.localCurrency + ')',
          dataField: 'presentValue',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'clickable'
        },
      ];


    switch (classificationId) {
      case 0: // Operating 840
        columns = columns.concat(operatingColumns);
        break;
      case 1: // Capital 840
      case 6: // Sales Type (Lessor)
        columns = columns.concat(capitalColumns);
        break;
      case 2: // Finance 842
        columns = columns.concat(typeColumns);

        if (portfolioSettings.functionalCurrencyEnabled) {
          this.addFunctionalBalanceColumns(columns, currencyInfo);
        } else {
          this.addBalanceColumns(columns, currencyInfo);
        }

        columns.push({
          caption: 'Asset Amortization',
          dataField: 'assetAmortization',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer'
        });
        break;
      case 3: // Operating 842
        columns = columns.concat(typeColumns);

        if (portfolioSettings.functionalCurrencyEnabled) {
          this.addFunctionalBalanceColumns(columns, currencyInfo);
        } else {
          this.addBalanceColumns(columns, currencyInfo);
        }

        if (portfolioSettings.functionalCurrencyEnabled) {
          columns.push({
            caption: 'Level Expense (' + currencyInfo.functionalCurrency + ')',
            dataField: 'functionalLevelExpense',
            headerCellTemplate: 'amortizationHeader',
            cellTemplate: 'pointer'
          });
        } else {
          columns.push({
            caption: 'Level Expense (' + currencyInfo.localCurrency + ')',
            dataField: 'levelExpense',
            headerCellTemplate: 'amortizationHeader',
            cellTemplate: 'pointer'
          });
        }
        break;
      case 4: // IFRS 16
        columns = columns.concat(typeColumns);

        if (portfolioSettings.functionalCurrencyEnabled) {
          this.addFunctionalBalanceColumns(columns, currencyInfo);
        } else {
          this.addBalanceColumns(columns, currencyInfo);
        }

        columns.push({
          caption: 'Asset Amortization',
          dataField: 'assetAmortization',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer'
        });
        break;
      case 5: // Operating (Lessor)
        operatingColumns.forEach(column => {
          if (column.caption.indexOf('Straight Line') >= 0) {
            column.caption = column.caption.replace('Expense', 'Income');
          }
        });
        columns = columns.concat(operatingColumns);

    }

    // Every type gets currency, comments, lastmodifiedby, and lastmodified date
    // as the last columns.
    columns.push({
      caption: 'Currency',
      dataField: 'currencyDisplay',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
    });
    columns.push({
      caption: 'Reporting Exception', dataField: 'isReportingException',
      headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer',
      calculateCellValue: rowData => rowData.isReportingException ? 'Yes' : 'No'
    });
    columns.push({
      caption: 'Charge Type', dataField: 'isIncome',
      headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer',
      calculateCellValue: rowData => rowData.isIncome ? 'Income' : 'Expense'
    });
    columns.push({
      caption: 'Impaired', dataField: 'isImpaired',
      headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer',
      calculateCellValue: rowData => rowData.isImpaired ? 'Yes' : 'No'
    });
    columns.push({
      caption: 'Comments', dataField: 'comments',
      headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
    });
    columns.push({
      caption: 'Last Modified By', dataField: 'lastModifiedBy',
      headerCellTemplate: 'amortizationHeader', cellTemplate: 'pointer'
    });
    columns.push({
      caption: 'Last Modified Date',
      dataField: 'lastModified',
      dataType:'date',
      format: dateFormat +' HH:mm:ss',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer'
    });
    columns.push({
      caption: 'Batch ID',
      dataField: 'batchID',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      visible: false
    });
    columns.push({
      caption: 'Source Import ID',
      dataField: 'sourceImportID',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      visible: false
    });

    columns.forEach(c => {
      c.allowSorting = c.dataField == 'scheduleIndex' ? true : false
    });

    return columns;
  }

  private addBalanceColumns(columns, currencyInfo) {
    columns.push({
      caption: 'Direct Costs (' + currencyInfo.localCurrency + ')',
      dataField: 'directCosts',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer'
    });
    columns.push({
      caption: 'Beginning Asset Balance (' + currencyInfo.localCurrency + ')',
      dataField: 'openingAssetBalance',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer'
    });
    columns.push({
      caption: 'Beginning Liability Balance (' + currencyInfo.localCurrency + ')',
      dataField: 'openingLiabilityBalance',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer'
    });
  }

  private addFunctionalBalanceColumns(columns, currencyInfo) {
    columns.push({
      caption: 'Direct Costs (' + currencyInfo.functionalCurrency + ')',
      dataField: 'functionalDirectCosts',
      format: value => this.formattingService.functionalFormat(+value, currencyInfo.functionalCurrencyDecimalPrecision),
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer'
    });
    columns.push({
      caption: 'Beginning Asset Balance (' + currencyInfo.functionalCurrency + ')',
      dataField: 'functionalOpeningAssetBalance',
      format: value => this.formattingService.functionalFormat(+value, currencyInfo.functionalCurrencyDecimalPrecision),
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer'
    });
    columns.push({
      caption: 'Beginning Liability Balance (' + currencyInfo.localCurrency + ')',
      dataField: 'openingLiabilityBalance',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer'
    });
  }
}
