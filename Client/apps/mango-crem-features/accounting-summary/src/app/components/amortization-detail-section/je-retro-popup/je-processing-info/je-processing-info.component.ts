import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { AmortizationGridColumnsService } from '@accounting-summary/services/amortization-grid-columns.service';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-je-processing-info',
  templateUrl: './je-processing-info.component.html',
  styleUrls: ['./je-processing-info.component.scss'],
})
export class JeProcessingInfoComponent {
  @Input() jeProcessingPopupData: any;
  @Input() userInfo: UserInfoResponse;
  @Input() amortizationdetailsGridData: any;
  @Input() eventScheduleData: any;
  @Input() rightsInfo: any;
  @Input() displayPeriodTitle: string;
  @Output() jeActionTaken: EventEmitter<any> = new EventEmitter<any>();
  @Output() setHeight = new EventEmitter<boolean>();

  jeProcessingGridColumns = [];
  showPreviewButton = false
  showJournalEntries = false;
  componentName = "je-processing-info";
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  displayNoDataText = 'Loading Data...';
  showActionButton = false;
  changeButtonText = '';
  calloutText = '';
  calloutClass = '';
  isButtonDisabled = false;
  isTooltipVisible = false;
  disableBtnReason = '';
  private subscription = new Subscription;

  constructor(public accountingSummaryService: AccountingSummaryService, public formattingService: FormattingService, public jeProcessingGridColumnsService: AmortizationGridColumnsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.populateFields();
    this.jeProcessingInfoGridSetup();
    this.getDebitCreditTotal();
  }

  notifyHeight(isMaxHeight: boolean): void {
    this.setHeight.emit(isMaxHeight);
  }

  private jeProcessingInfoGridSetup() {
    this.isEuroDateFormat = this.userInfo.useDateEU;
    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
    }
    this.jeProcessingGridColumns = this.jeProcessingGridColumnsService.getJournalEntryGridColumns();

    this.jeProcessingGridColumns.forEach(col => {
      if (col.usesLocalFormat === 'true') {
        col.format = value => this.formattingService.localFormat(+value, this.eventScheduleData.localCurrencyDecimalPrecision);
      }
      if (col.caption === 'Cost %') {
        col.format = value => this.formattingService.localFormat(+value, 4);
      }
    });
    return this.jeProcessingGridColumns;
  }

  previewJournalEntryClick(): void {
    this.toggleCallout(true);
    this.showJournalEntries = true;
    if (!this.rightsInfo.canApproveJE) {
      this.showActionButton = true;
      this.isButtonDisabled = true;
      this.disableBtnReason = 'You do not have rights to Approve';
    } else if (!this.rightsInfo.wfStatusallowJEApproval) {
      this.isButtonDisabled = true;
      this.disableBtnReason = 'Workflow status does not allow JE approval'
    }
    else {
      this.isButtonDisabled = false;
    }
    this.showActionButton = true;
    this.showPreviewButton = false;
    this.calloutText = 'Journal Entry Preview:';
    this.notifyHeight(true);
  }

  populateFields() {
    this.toggleCallout(false);
    this.displayNoDataText = 'Loading Data...';
    this.showActionButton = false;

    if (!this.eventScheduleData.isPublished) {
      this.notifyHeight(false);
      this.showJournalEntries = false;
      this.showActionButton = false;
      this.showPreviewButton = false;
      return;
    }

    switch (this.jeProcessingPopupData.jeStatus) {
      case 'Scheduled':
        this.notifyHeight(false);
        this.showJournalEntries = false;
        this.showActionButton = true;
        this.showPreviewButton = true;
        this.changeButtonText = 'Approve';

        if (!this.rightsInfo.wfStatusallowJEApproval) {
          this.isButtonDisabled = true;
        }

        if (this.rightsInfo.canApproveJE) {
          this.showActionButton = true;
          this.isButtonDisabled = false;
        } else {
          this.showActionButton = true;
          this.isButtonDisabled = true;
          this.disableBtnReason = 'You do not have rights to Approve';
        }

        if (this.jeProcessingPopupData.journalEntries === null || this.jeProcessingPopupData.journalEntries.length === 0) {
          this.notifyHeight(false);
          this.showActionButton = false;
          this.showPreviewButton = false;
        }
        break;

      case 'Approved':
        this.notifyHeight(true);
        this.showJournalEntries = true;
        this.showPreviewButton = false;
        this.changeButtonText = 'Unapprove';

        if (this.rightsInfo.canUnapproveJE) {
          this.showActionButton = true;
          this.isButtonDisabled = false;
        } else {
          this.showActionButton = true;
          this.isButtonDisabled = true;
          this.disableBtnReason = 'You do not have rights to Unapprove';
        }

        if (this.jeProcessingPopupData.journalEntries === null || this.jeProcessingPopupData.journalEntries.length === 0) {
          this.notifyHeight(false);
          this.showActionButton = false;
          this.showJournalEntries = false;
        }
        break;

      case 'Exported':
        this.notifyHeight(true);
        this.showJournalEntries = true;
        this.showPreviewButton = false;
        this.changeButtonText = 'Unexport';

        if (this.rightsInfo.canUnexportJE) {
          this.showActionButton = true;
          this.isButtonDisabled = false;
        } else {
          this.showActionButton = true;
          this.isButtonDisabled = true;
          this.disableBtnReason = 'You do not have rights to Unexport';
        }

        if (this.jeProcessingPopupData.journalEntries === null || this.jeProcessingPopupData.journalEntries.length === 0) {
          this.notifyHeight(false);
          this.showActionButton = false;
          this.showJournalEntries = false;
        }
        break;
    }
  }

  getDebitCreditTotal(): { debit: number; credit: number } {
    const journalEntries = this.jeProcessingPopupData.journalEntries || [];
    return journalEntries.reduce((accumulator, entry) => {
      if (entry.debitCredit === 'C') {
        accumulator.credit += entry.amount;
      } else if (entry.debitCredit === 'D') {
        accumulator.debit += entry.amount;
      }
      return accumulator;
    }, { debit: 0, credit: 0 });
  }

  toggleCallout(show: boolean) {
    this.calloutClass = (show) ? 'calloutPanel' : '';
    this.calloutText = (show) ? 'Journal Entry Preview' : '';
  }

  actionButton() {
    switch (this.changeButtonText) {
      case 'Approve':
        if (this.rightsInfo.canApproveJE && this.rightsInfo.wfStatusallowJEApproval) {
          this.saveJournalEntryProcess(this.jeProcessingPopupData.leaseRecognitionPeriodID, this.changeButtonText)
        }
        break;

      case 'Unapprove':
        if (this.rightsInfo.canUnapproveJE) {
          this.saveJournalEntryProcess(this.jeProcessingPopupData.leaseRecognitionPeriodID, this.changeButtonText)
        }
        break;

      case 'Unexport':
        if (this.rightsInfo.canUnexportJE) {
          this.saveJournalEntryProcess(this.jeProcessingPopupData.leaseRecognitionPeriodID, this.changeButtonText)
        }
        break;
    }
  }

  saveJournalEntryProcess(periodID: number, actions: string) {
    this.subscription.add(this.accountingSummaryService.journalEntryProcess(periodID, actions).subscribe(
      (jeProcessResponse: any) => {
        if (jeProcessResponse === null) {
          this.accountingSummaryService.displayContactSystemAdminMessage();
        } else if (jeProcessResponse.success) {
          this.jeActionTaken.emit();
        }
        else {
          this.accountingSummaryService.errorNotify(jeProcessResponse.clientErrorMessage);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onMouseEnter() {
    if (this.isButtonDisabled) {
      this.isTooltipVisible = true;
    }
  }

  onMouseLeave() {
    this.isTooltipVisible = false;
  }

  exportToExcelFileName(): string {
    const dateTimeStamp = new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDisplayPeriodTitle = this.displayPeriodTitle.replace(/[\s-]/g, '');
    const fileName = `Period_${formattedDisplayPeriodTitle}_Journal Entry_${dateTimeStamp}`;
    return fileName;
  }
}
