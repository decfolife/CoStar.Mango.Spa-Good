import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { TransactionPopupGridColumnsService } from '@accounting-summary/services/transaction-popup-grid-columns.service';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';

@Component({
  selector: 'mango-transaction-popup',
  templateUrl: './transaction-popup.component.html',
  styleUrls: ['./transaction-popup.component.scss']
})
export class TransactionPopupComponent {

  @ViewChild("transactionPopupGrid") transactionPopupGrid: DxDataGridComponent;
  @Input() transactionPopupVisible: boolean;
  @Input() transactionPopupData: any;
  @Input() userInfo: UserInfoResponse;

  componentName = "transaction"
  transactionGridColumns = [];
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  summaryFields: any = {};

  constructor(public accountingSummaryService: AccountingSummaryService, public formattingService: FormattingService, private transactionPopupGridColumnsService: TransactionPopupGridColumnsService) {
    this.summaryFields = this.getSummaryFields();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.transactionPopupData !== undefined) {
      this.transactionPopupGridSetup();
      this.transactionPopupVisible = true;
    }
  }

  private transactionPopupGridSetup() {
    this.isEuroDateFormat = this.userInfo.useDateEU;
    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
    }
    this.transactionGridColumns = this.transactionPopupGridColumnsService.getTransactionPopupGridColumns(this.transactionPopupData, this.dateFormat);
  }
  
  onTransactionPopupHidden() {
    this.transactionPopupVisible = false;
  }

  getSummaryFields() {
    interface SummaryField {
      column?: string;
      summaryType: string;
      displayFormat: string | ((value: any) => string);
      alignment?: string;
      name?: string;
      showInColumn?: string;
    }

    const totalItems: Array<SummaryField> = [],
      columns = [
        'TargetAmount',
        'BaseAmount',
      ];

    totalItems.push({
      summaryType: 'custom',
      displayFormat: `Total Amount:`,
      alignment: 'right',
      showInColumn: 'dueBy',
      name: 'TotalsLabel_TargetAmount'
    });

    totalItems.push({
      column: 'TargetAmount',
      summaryType: 'sum',
      displayFormat: value => this.formattingService.localFormat(+value, this.transactionPopupData.targetCurrencyDecimalPrecision),
      alignment: 'right',
      showInColumn: 'targetAmount'
    });

    totalItems.push({
      column: 'BaseAmount',
      summaryType: 'sum',
      displayFormat: value => this.formattingService.localFormat(+value, this.transactionPopupData.baseCurrencyDecimalPrecision),
      alignment: 'right',
      showInColumn: 'baseAmount'
    });

    totalItems.push({
      summaryType: 'custom',
      displayFormat: `Count:`,
      alignment: 'right',
      showInColumn: 'dueBy',
      name: 'CountLabel_TargetAmount'
    });

    totalItems.push({
      column: 'TargetAmount',
      summaryType: 'count',
      displayFormat: value => String(Number(value).toFixed(0)),
      alignment: 'right',
      showInColumn: 'targetAmount'
    });

    totalItems.push({
      column: 'BaseAmount',
      summaryType: 'count',
      displayFormat: value => String(Number(value).toFixed(0)),
      alignment: 'right',
      showInColumn: 'baseAmount'
    });

    return { totalItems };
  }

}



