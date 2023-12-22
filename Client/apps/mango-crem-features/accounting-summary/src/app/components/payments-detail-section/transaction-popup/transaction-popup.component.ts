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
  @Input() eventScheduleData: any;

  componentName = "transaction"
  transactionGridColumns = [];
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  summaryFields: any = {};

  baseAmountFormatter = (value: any) => this.formattingService.localFormat(+value, this.transactionPopupData.chargeCurrencyDecimalPrecision);
  targetAmountFormatter = (value: any) => this.formattingService.localFormat(+value, this.transactionPopupData.scheduleCurrencyDecimalPrecision);
  
  constructor(public accountingSummaryService: AccountingSummaryService, public formattingService: FormattingService, private transactionPopupGridColumnsService: TransactionPopupGridColumnsService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactionPopupData'] && !changes['transactionPopupData'].firstChange) {
      this.transactionPopupGridSetup();
      this.transactionPopupVisible = true;
    }
  }

  private transactionPopupGridSetup() {
    this.isEuroDateFormat = this.userInfo.useDateEU;
    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
    }
    
    const scheduleEventBeginDate = new Date(this.eventScheduleData.beginDate);
    const scheduleEventEndDate = new Date(this.eventScheduleData.endDate);
    const scheduleincludeFromFirst = this.eventScheduleData.includeFromFirst;

    if (scheduleincludeFromFirst) {
      scheduleEventBeginDate.setDate(1); // Set the day of the month to 1
    }
    
      for (const transaction of this.transactionPopupData.transactions) {
        const dueByDate = new Date(transaction.dueBy);
        if (dueByDate < scheduleEventBeginDate || dueByDate > scheduleEventEndDate) {
          transaction.targetAmount = 0;
        }
      }
      this.transactionGridColumns = this.transactionPopupGridColumnsService.getTransactionPopupGridColumns(this.transactionPopupData, this.dateFormat);
  }

  onTransactionPopupHidden() {
    this.transactionPopupVisible = false;
  }

  customSummaryCalculation(options) {
    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {
      switch (options.name) {
        case 'targetAmountCount':
          if (options.value.targetAmount !== 0) {
            options.totalValue += 1;
          }
          break;
        case 'baseAmountCount':
          options.totalValue += 1;
          break;
        case 'baseAmountTotal':
          options.totalValue += options.value.baseAmount;
          break;
        case 'targetAmountTotal':
          options.totalValue += options.value.targetAmount;
          break;
      }
    }
  }
}



