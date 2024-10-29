import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { AmortizationGridColumnsService } from '@accounting-summary/services/amortization-grid-columns.service';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { Subscription } from 'rxjs';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'mango-je-processing-info',
  templateUrl: './je-processing-info.component.html',
  styleUrls: ['./je-processing-info.component.scss'],
})
export class JeProcessingInfoComponent {
  @ViewChild('JournalEntryProcessing')
  journalEntryProcessing: DxDataGridComponent;
  @Input() jeProcessingPopupData: any;
  @Input() userInfo: UserInfoResponse;
  @Input() amortizationdetailsGridData: any;
  @Input() eventScheduleData: any;
  @Input() rightsInfo: any;
  @Input() wfStatusRights: any;
  @Input() displayPeriodTitle: string;
  @Input() isPopupForRetroGridClick = false;
  @Output() jeActionTaken: EventEmitter<any> = new EventEmitter<any>();
  @Output() setHeight = new EventEmitter<boolean>();

  jeProcessingGridColumns = [];
  showJournalEntries = false;
  componentName = 'je-processing-info';
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
  showNoJeProfileSelected = false;
  actionsButtonId = '';
  private subscription = new Subscription();
  isLocked = false;
  isArchived = false;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    public formattingService: FormattingService,
    public jeProcessingGridColumnsService: AmortizationGridColumnsService
  ) {}

  ngOnInit() {
    if (this.isPopupForRetroGridClick) {
      this.componentName = this.componentName + '-retro';
    }

    this.actionsButtonId = this.accountingSummaryService.getId(
      this.componentName,
      'ActionsButton',
      'button'
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.populateFields();
    this.jeProcessingInfoGridSetup();
    this.getDebitCreditTotal();
  }

  notifyHeight(isMaxHeight: boolean): void {
    this.setHeight.emit(isMaxHeight);
  }

  onExporting(event) {
    const fileName = this.exportToExcelFileName();
    this.journalEntryProcessing.loadPanel.enabled = false;
    this.accountingSummaryService.exportToExcel(
      this.journalEntryProcessing.instance,
      fileName,
      'Sheet'
    );
  }

  private jeProcessingInfoGridSetup() {
    this.isEuroDateFormat = this.userInfo?.useDateEU;
    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
    }
    this.jeProcessingGridColumns =
      this.jeProcessingGridColumnsService.getJournalEntryGridColumns();

    this.jeProcessingGridColumns.forEach((col) => {
      if (col.usesLocalFormat === 'true') {
        col.format = (value) =>
          this.formattingService.localFormat(
            +value,
            this.eventScheduleData.localCurrencyDecimalPrecision
          );
      }
      if (col.caption === 'Cost %') {
        col.format = (value) => this.formattingService.localFormat(+value, 4);
      }
    });
    return this.jeProcessingGridColumns;
  }

  populateFields() {
    this.toggleCallout(false);
    this.displayNoDataText = 'Loading Data...';

    if (!this.eventScheduleData.isPublished) {
      this.notifyHeight(false);
      this.showJournalEntries = false;
      this.showActionButton = false;

      return;
    }

    this.isLocked = this.accountingSummaryService.getIsLocked();
    if (this.isLocked) {
      this.isButtonDisabled = true;
      this.disableBtnReason =
        'This action cannot take place because the lease is Locked';
    }

    this.isArchived = this.accountingSummaryService.getIsArchived();
    if (this.isArchived) {
      this.isButtonDisabled = true;
      this.disableBtnReason =
        'This action cannot take place because the lease is Archived';
    }

    if (
      (this.jeProcessingPopupData.journalEntryProfileName === null ||
        this.jeProcessingPopupData.journalEntryProfileName === undefined) &&
      this.jeProcessingPopupData.jeStatus === 'Scheduled'
    ) {
      this.showNoJeProfileSelected = true;
      this.showActionButton = false;
      this.showJournalEntries = false;
      this.notifyHeight(false);
      return;
    }

    switch (this.jeProcessingPopupData.jeStatus) {
      case 'Scheduled':
        if (!this.showNoJeProfileSelected) {
          this.toggleCallout(true);
          this.calloutText = 'Journal Entry Preview:';
          this.changeButtonText = 'Approve';
          this.showJournalEntries = true;
          this.showActionButton = true;
          this.notifyHeight(true);

          if (!this.isLocked && !this.isArchived) {
            this.isButtonDisabled = false;

            if (!this.wfStatusRights.wfStatusallowJEApproval) {
              this.isButtonDisabled = true;
              this.disableBtnReason =
                'Workflow status does not allow JE approval';
            } else if (!this.rightsInfo.canApproveJE) {
              this.showActionButton = true;
              this.isButtonDisabled = true;
              this.disableBtnReason = 'You do not have rights to Approve';
            } else if (this.eventScheduleData.isReportingException) {
              this.showActionButton = true;
              this.isButtonDisabled = true;
              this.disableBtnReason =
                'This accounting event is a reporting exception, which is excluded from journal entry processing.';
            }
          }

          if (
            this.jeProcessingPopupData.journalEntries === null ||
            this.jeProcessingPopupData.journalEntries.length === 0
          ) {
            this.notifyHeight(false);
            this.showJournalEntries = false;
          }
        }
        break;

      case 'Approved':
        this.changeButtonText = 'Unapprove';
        this.notifyHeight(true);
        this.showJournalEntries = true;
        this.showActionButton = true;

        if (!this.isLocked && !this.isArchived) {
          this.isButtonDisabled = false;

          if (!this.rightsInfo.canUnapproveJE) {
            this.isButtonDisabled = true;
            this.disableBtnReason = 'You do not have rights to Unapprove';
          }
        }
        if (
          this.jeProcessingPopupData.journalEntries === null ||
          this.jeProcessingPopupData.journalEntries.length === 0
        ) {
          this.notifyHeight(false);
          this.showJournalEntries = false;
        }

        break;

      case 'Exported':
        this.changeButtonText = 'Unexport';
        this.notifyHeight(true);
        this.showJournalEntries = true;
        this.showActionButton = true;

        if (!this.isLocked && !this.isArchived) {
          this.isButtonDisabled = false;

          if (!this.rightsInfo.canUnexportJE) {
            this.isButtonDisabled = true;
            this.disableBtnReason = 'You do not have rights to Unexport';
          }
        }

        if (
          this.jeProcessingPopupData.journalEntries === null ||
          this.jeProcessingPopupData.journalEntries.length === 0
        ) {
          this.notifyHeight(false);
          this.showJournalEntries = false;
        }
        break;
    }
  }

  getDebitCreditTotal(): { debit: number; credit: number } {
    const journalEntries = this.jeProcessingPopupData.journalEntries || [];
    return journalEntries.reduce(
      (accumulator, entry) => {
        if (entry.debitCredit === 'C') {
          accumulator.credit += entry.amount;
        } else if (entry.debitCredit === 'D') {
          accumulator.debit += entry.amount;
        }
        return accumulator;
      },
      { debit: 0, credit: 0 }
    );
  }

  toggleCallout(show: boolean) {
    this.calloutClass = show ? 'calloutPanel' : '';
    this.calloutText = show ? 'Journal Entry Preview' : '';
  }

  actionButton() {
    switch (this.changeButtonText) {
      case 'Approve':
        if (
          this.rightsInfo.canApproveJE &&
          this.wfStatusRights.wfStatusallowJEApproval
        ) {
          this.saveJournalEntryProcess(
            this.jeProcessingPopupData.leaseRecognitionPeriodID,
            this.changeButtonText
          );
        }
        break;

      case 'Unapprove':
        if (this.rightsInfo.canUnapproveJE) {
          this.saveJournalEntryProcess(
            this.jeProcessingPopupData.leaseRecognitionPeriodID,
            this.changeButtonText
          );
        }
        break;

      case 'Unexport':
        if (this.rightsInfo.canUnexportJE) {
          this.saveJournalEntryProcess(
            this.jeProcessingPopupData.leaseRecognitionPeriodID,
            this.changeButtonText
          );
        }
        break;
    }
  }

  saveJournalEntryProcess(periodID: number, actions: string) {
    this.subscription.add(
      this.accountingSummaryService
        .journalEntryProcess(periodID, actions)
        .subscribe((jeProcessResponse: any) => {
          if (jeProcessResponse === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (jeProcessResponse.success) {
            switch (this.changeButtonText) {
              case 'Approve':
                this.accountingSummaryService.successNotify(
                  'Approved Successfully'
                );
                break;

              case 'Unapprove':
                this.accountingSummaryService.successNotify(
                  'Unapproved Successfully'
                );
                break;

              case 'Unexport':
                this.accountingSummaryService.successNotify(
                  'Unexported Successfully'
                );
                break;
            }
            this.jeActionTaken.emit();
          } else {
            this.accountingSummaryService.errorNotify('Process Failed');
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
    const dateTimeStamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const formattedDisplayPeriodTitle = this.displayPeriodTitle.replace(
      /[\s-]/g,
      ''
    );
    const fileName = `Period_${formattedDisplayPeriodTitle}_Journal Entry_${dateTimeStamp}.xlsx`;
    return fileName;
  }
}
