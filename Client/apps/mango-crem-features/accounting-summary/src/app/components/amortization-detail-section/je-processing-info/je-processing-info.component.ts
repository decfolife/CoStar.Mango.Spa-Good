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
  @Output() jeActionTaken: EventEmitter<any> = new EventEmitter<any>();

  jeProcessingGridColumns =[];
  showJournalEntries = false;
  showPreviewButton = true;
  componentName = "je-processing-info"
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

  private jeProcessingInfoGridSetup() {
    this.isEuroDateFormat = this.userInfo.useDateEU;
    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
    }
    this.jeProcessingGridColumns = this.jeProcessingGridColumnsService.getJournalEntryGridColumns();
  }

  previewJournalEntryClick(): void {
    this.toggleCallout(true);
    this.showJournalEntries = true;
    this.showPreviewButton = false;
    this.calloutText = 'Journal Entry Preview:';
  }

  populateFields (){
    this.toggleCallout(false);
    this.displayNoDataText = 'Loading Data...';
    this.showActionButton = false;

    if (!this.eventScheduleData.isPublished) {
        this.showJournalEntries = false;
        this.showPreviewButton = false;
        this.showActionButton = false;
        return;
      }

    switch (this.jeProcessingPopupData.jeStatus) {
      case 'Scheduled':
        this.showPreviewButton = true;
        this.showJournalEntries = false;
        this.changeButtonText = 'Approve';

        if (this.rightsInfo.canApproveJE && this.rightsInfo.allowJEApproval) {
          this.showActionButton = true;
          this.isButtonDisabled = false;
        } else {
          this.showActionButton = true;
          this.isButtonDisabled = true;
          this.disableBtnReason = 'You do not have rights to Approve';
        }

        if (this.jeProcessingPopupData.journalEntries.length == 0) {
          this.showActionButton = false;
        } 
        break;

      case 'Approved':
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

        if (this.jeProcessingPopupData.journalEntries.length == 0) {
          this.showActionButton = false;
        } 
        break;

      case 'Exported':
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

        if (this.jeProcessingPopupData.journalEntries.length == 0) {
          this.showActionButton = false;
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
        if (this.rightsInfo.canApproveJE && this.rightsInfo.allowJEApproval) {
          this.saveJournalEntryProcess (this.jeProcessingPopupData.leaseRecognitionPeriodID, 'Approve')
        }
        break;

        case 'Unapprove':
        if (this.rightsInfo.canUnapproveJE) {
          this.saveJournalEntryProcess (this.jeProcessingPopupData.leaseRecognitionPeriodID, 'Unapprove')
        }
        break;

        case 'Unexport':
        if (this.rightsInfo.canUnexportJE) {
          this.saveJournalEntryProcess (this.jeProcessingPopupData.leaseRecognitionPeriodID, 'Unexport')
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
          this.accountingSummaryService.successNotify("Record saved successfully.");
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

  dateTimeStamp() {
    return new Date();
  }
}
