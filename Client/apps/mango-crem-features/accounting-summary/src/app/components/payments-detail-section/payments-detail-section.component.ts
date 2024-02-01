import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { PaymentsGridColumnsService } from '@accounting-summary/services/payments-grid-columns.service';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-payments-detail-section',
  templateUrl: './payments-detail-section.component.html',
  styleUrls: ['./payments-detail-section.component.scss'],
})
export class PaymentsDetailSectionComponent implements OnChanges, OnDestroy {
  @ViewChild("PaymentsDataGrid") paymentsDataGrid: DxDataGridComponent;
  @Input() eventScheduleData: any;
  @Input() classificationID: number;
  @Input() userInfo: UserInfoResponse;
  @Input() classificationType: string;
  @Input() amortizationProfileName: string;

  componentName = "payments-grid"
  isGridStateChanged = false;
  paymentsGridData;
  paymentsGridColumns = [];
  paymentsGridClass = 'payments-grid-class';
  gridName = 'Payments';
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  preferenceSavePendingMessage: string;
  transactionPopupVisible = false; 
  transactionPopupData: any;
  historicalTransactionData: any;
  initialState = {};
  private subscription = new Subscription();
  
  constructor(public accountingSummaryService: AccountingSummaryService, private paymentsGridColumnService: PaymentsGridColumnsService) { 
    this.preferenceSavePendingMessage = accountingSummaryService.preferenceSavePendingMessage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.eventScheduleData && this.eventScheduleData.leaseRecognitionScheduleID !== undefined && this.classificationID !== undefined &&
      (
        // The first time loading or the value in the dropdown changed
        !changes.eventScheduleData ||
        !changes.eventScheduleData.previousValue ||
        (changes.eventScheduleData.previousValue.leaseRecognitionScheduleID !== this.eventScheduleData.leaseRecognitionScheduleID)
      )
    ) {
      this.isGridStateChanged = false;
      this.paymentsGridSetup(this.eventScheduleData.leaseRecognitionScheduleID);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRowClick(event: any) {
    this.getTransactionPopupData(event.data.leaseRecognitionScheduleEventID);
  }

  private paymentsGridSetup(scheduleEventId: number) {
    const paymentDetails = this.accountingSummaryService.getPaymentDetails(scheduleEventId);
    this.subscription.add(paymentDetails.subscribe(res => {
     const paymentDetailsResponse = res;

     if(paymentDetailsResponse === null){
       this.paymentsDataGrid.instance.state(null);
       this.accountingSummaryService.displayContactSystemAdminMessage();
     }
     else if (paymentDetailsResponse.success) {
       this.paymentsGridData = paymentDetailsResponse.data;

       this.isEuroDateFormat = this.userInfo.useDateEU;
       if (this.isEuroDateFormat) {
         this.dateFormat = 'dd.MM.yyyy';
       }

       this.paymentsGridColumns = this.paymentsGridColumnService.getPaymentGridColumns(this.paymentsGridData, this.dateFormat);
       this.getGridPreferences();
     } else if (!paymentDetailsResponse.success) {
       this.accountingSummaryService.errorNotify(paymentDetailsResponse.clientErrorMessage);
     }
   }));
 }

 getGridPreferences() {
  this.subscription.add(this.accountingSummaryService.getGridPreferences().subscribe(response => {
    if (response === null) {
      this.accountingSummaryService.displayContactSystemAdminMessage();
    }
    else if (response.success) {
      const state = JSON.parse(sessionStorage.getItem("paymentsGridStateKey"))
      // Filter the data
      const filteredData = response.data.filter(item => {
        return item.classificationID === this.classificationID && item.gridName === this.gridName;
      });

      if(state !== null) {
        state.columns = [];

        filteredData.forEach((item) => {
          const parsedColumns = JSON.parse(item.columnJson);
          state.columns.push(...parsedColumns);
        });
      }

      this.initialState = state;
      this.paymentsDataGrid.instance.state(state);
      sessionStorage.setItem("paymentsGridStateKey", JSON.stringify(state));
    } else {
      this.accountingSummaryService.errorNotify(response.clientErrorMessage);
    }
    }));
  }

  resetGrid() {
    this.isGridStateChanged = false;
    this.paymentsDataGrid.instance.state(this.initialState);
  }

  saveGridPreferences() {
    this.isGridStateChanged = false;
    const newState = this.paymentsDataGrid.instance.state();
    sessionStorage.setItem("paymentsGridStateKey", JSON.stringify(newState));
    const columnsState = this.paymentsDataGrid.instance.state().columns;
    for (let index = 0; index < columnsState.length; index++) {
      columnsState[index].caption = this.paymentsDataGrid.instance.columnOption(index, 'caption');
      columnsState[index].headerCellTemplate = 'amortizationHeader';
    }
    const columns = JSON.stringify(columnsState);
    this.subscription.add(this.accountingSummaryService.saveGridPreferences(this.classificationID, this.gridName, columns).subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.initialState = newState;
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  loadState() {
    return JSON.parse(sessionStorage.getItem("paymentsGridStateKey"));
  }

  saveState(state) {
    sessionStorage.setItem("paymentsGridStateKey", JSON.stringify(state));
  }

  onGridOptionChanged(event) {
    if (event.fullName != 'columns' && event.name === 'columns') {
      // The grid state has changed
      this.isGridStateChanged = true;
    }
  }

  showColumnChooser() {
    this.paymentsDataGrid.instance.showColumnChooser();
  }


  private getTransactionPopupData(scheduleEventId: number) {
    const historicalTransactionDetails = this.accountingSummaryService.getPaymentPopupData(scheduleEventId);
  
    this.subscription.add(historicalTransactionDetails.subscribe(
      (res) => {
        const historicalTransactionDetailsResponse = res;
  
        if (historicalTransactionDetailsResponse === null) {
          this.accountingSummaryService.displayContactSystemAdminMessage();
        } else if (!historicalTransactionDetailsResponse.success) {
          this.accountingSummaryService.errorNotify(historicalTransactionDetailsResponse.clientErrorMessage);
        } else {
          this.transactionPopupData = historicalTransactionDetailsResponse.data;
          this.isEuroDateFormat = this.userInfo.useDateEU;
          if (this.isEuroDateFormat) {
            this.dateFormat = 'dd.MM.yyyy';
          }
        }
      },
    ));
  }

  exportToExcel() {
    const classificationType = this.classificationType;
    const amortizationProfileName = this.amortizationProfileName;
    const componentName = 'Payments';
    const sheetname = this.accountingSummaryService.getLeaseAbstractId() + ' - ' + amortizationProfileName;
    const filename = this.accountingSummaryService.generateFileName(classificationType, amortizationProfileName, componentName);
    this.accountingSummaryService.exportToExcel(this.paymentsDataGrid.instance, filename, sheetname);
  }

  openMoreMenu(event: Event): void {
    event.stopPropagation();
  }
}
