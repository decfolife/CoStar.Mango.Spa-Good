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
        fixedPosition: 'right',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: '#',
        dataField: 'scheduleIndex',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        allowHiding: false,
        allowReordering: false,
        allowResizing: false,
        width: 30,
        alignment:'center',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: 'Is Published', 
        dataField: 'isPublished',
        headerCellTemplate: 'amortizationHeader', 
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        calculateCellValue: rowData => rowData.isPublished ? 'Yes' : 'No'
      },
      {
        caption: 'Measure Event',
        name: 'MeasureEvent',
        dataField: 'measureEvent',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: 'Status',
        name: 'JEStatus',
        dataField: 'jeStatus',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: 'JE Profile',
        name: 'JEProfile',
        dataField: 'journalEntryProfileName',
        headerCellTemplate: 'amortizationHeader', 
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: 'Begin Date',
        dataField: 'beginDate',
        dataType:'date',
        format: dateFormat,
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: 'End Date',
        dataField: 'endDate',
        dataType:'date',
        format: dateFormat,
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: 'Term (Years)',
        dataField: 'term',
        alignment: 'right',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        calculateCellValue: rowData => (Math.round(rowData.term * 10000) / 10000).toFixed(2)
      },
      {
        caption: 'Payment Timing',
        dataField: 'paymentTiming',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      },
      {
        caption: 'Compound Frequency',
        dataField: 'compoundFrequencyType',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        visible: false,
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      }
    );


    // leaseRecognitionCalendarID = 1 means that it is a standard calendar
    if (portfolioSettings.leaseRecognitionCalendarID != 1) {
      columns.push({
        caption: 'Days In Term',
        dataField: 'daysInTerm',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        format: value => this.formattingService.formatNumber(+value, 0)
      });
    } else {
      columns.push({
        caption: '# of Periods',
        dataField: 'periods',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false'
      });
    }

    columns.push(
      {
        caption: 'Total Amount (' + currencyInfo.localCurrency + ')',
        dataField: 'totalAmount',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'true',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
      });

    const operatingColumns = [
      {
        caption: 'Adjustment',
        dataField: 'adjustmentAmount',
        headerCellTemplate: 'amortizationHeader',
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)
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
        cellTemplate: 'pointer',
        appendsCurrency: 'false',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false'  
      }
    ],
      capitalColumns = [
        {
          caption: 'Discount Rate',
          dataField: 'discountRateDisplay',
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer',
          appendsCurrency: 'false',
          usesLocalFormat: 'false',
          usesFunctionalFormat: 'false'
        },
        {
          caption: 'Present Value (' + currencyInfo.localCurrency + ')',
          dataField: 'presentValue',
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'clickable',
          appendsCurrency: 'true',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)
        },
        {
          caption: 'FMV',
          dataField: 'fmv',
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer',
          appendsCurrency: 'false',
          usesLocalFormat: 'false',
          usesFunctionalFormat: 'false',
          format: value => this.formattingService.fmvFormat(+value)
        }
      ],

      typeColumns = [// Type A/B and IFRS16
        {
          caption: 'Discount Rate',
          dataField: 'discountRateDisplay',
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer',
          appendsCurrency: 'false',
          usesLocalFormat: 'false',
          usesFunctionalFormat: 'false'
        },
        {
          caption: 'Present Value (' + currencyInfo.localCurrency + ')',
          dataField: 'presentValue',
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'clickable',
          appendsCurrency: 'true',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)
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
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer',
          appendsCurrency: 'false',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)
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
            cellTemplate: 'pointer',
            appendsCurrency: 'true',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false'
          });
        } else {
          columns.push({
            caption: 'Level Expense (' + currencyInfo.localCurrency + ')',
            dataField: 'levelExpense',
            headerCellTemplate: 'amortizationHeader',
            cellTemplate: 'pointer',
            appendsCurrency: 'true',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false'
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
          headerCellTemplate: 'amortizationHeader',
          cellTemplate: 'pointer',
          appendsCurrency: 'false',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)
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
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false'
    });
    columns.push({
      caption: 'Reporting Exception',
      dataField: 'isReportingException',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer', 
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false',
      calculateCellValue: rowData => rowData.isReportingException ? 'Yes' : 'No'
    });
    columns.push({
      caption: 'Charge Type',
      dataField: 'isIncome',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false',
      calculateCellValue: rowData => rowData.isIncome ? 'Income' : 'Expense'
    });
    columns.push({
      caption: 'Impaired',
      dataField: 'isImpaired',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false',
      calculateCellValue: rowData => rowData.isImpaired ? 'Yes' : 'No'
    });
    columns.push({
      caption: 'Comments',
      dataField: 'comments',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false',
    });
    columns.push({
      caption: 'Last Modified By',
      dataField: 'lastModifiedBy',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false',
    });
    columns.push({
      caption: 'Last Modified Date',
      dataField: 'lastModified',
      dataType:'date',
      format: dateFormat +' HH:mm:ss',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false'
    });
    columns.push({
      caption: 'Batch ID',
      dataField: 'batchID',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      visible: false,
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false'
    });
    columns.push({
      caption: 'Source Import ID',
      dataField: 'sourceImportID',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      visible: false,
      appendsCurrency: 'false',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'false'
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
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'true',
      usesLocalFormat: 'true',
      usesFunctionalFormat: 'false',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision),
    });
    columns.push({
      caption: 'Beginning Asset Balance (' + currencyInfo.localCurrency + ')',
      dataField: 'openingAssetBalance',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'true',
      usesLocalFormat: 'true',
      usesFunctionalFormat: 'false',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)
    });
    columns.push({
      caption: 'Beginning Liability Balance (' + currencyInfo.localCurrency + ')',
      dataField: 'openingLiabilityBalance',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'true',
      usesLocalFormat: 'true',
      usesFunctionalFormat: 'false',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)

    });
  }

  private addFunctionalBalanceColumns(columns, currencyInfo) {
    columns.push({
      caption: 'Direct Costs (' + currencyInfo.functionalCurrency + ')',
      dataField: 'functionalDirectCosts',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'true',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'true',
      format: value => this.formattingService.functionalFormat(+value, currencyInfo.functionalCurrencyDecimalPrecision),

    });
    columns.push({
      caption: 'Beginning Asset Balance (' + currencyInfo.functionalCurrency + ')',
      dataField: 'functionalOpeningAssetBalance',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'true',
      usesLocalFormat: 'false',
      usesFunctionalFormat: 'true',
      format: value => this.formattingService.functionalFormat(+value, currencyInfo.functionalCurrencyDecimalPrecision)
    });
    columns.push({
      caption: 'Beginning Liability Balance (' + currencyInfo.localCurrency + ')',
      dataField: 'openingLiabilityBalance',
      headerCellTemplate: 'amortizationHeader',
      cellTemplate: 'pointer',
      appendsCurrency: 'true',
      usesLocalFormat: 'true',
      usesFunctionalFormat: 'false',
      format: value => this.formattingService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision)
    });
  }
}
