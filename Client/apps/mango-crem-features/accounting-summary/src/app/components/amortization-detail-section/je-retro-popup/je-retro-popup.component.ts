import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { DatePipe } from '@angular/common';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';

@Component({
  selector: 'mango-je-retro-popup',
  templateUrl: './je-retro-popup.component.html',
  styleUrls: ['./je-retro-popup.component.scss'],
})
export class JeRetroPopupComponent {
  @Input() amortizationGridRowClickEvent: any; 
  @Input() eventScheduleData: any;
  @Input() gridColumnsForRetroPopup: any[];
  @Input() rightsInfo: any;
  @Input() userInfo: UserInfoResponse;
  @Input() classificationType: string;
  @Input() amortizationProfileName: string;
  @Input() isPopupForRetroGridClick = false;
  @Input() newRetroEventJeStatus = "";
  @Output() jeRetroPopupClosedEvent: EventEmitter<any> = new EventEmitter();
  @Output() retroAdustmentGridRowClickEvent: EventEmitter<any> = new EventEmitter();

  dateFormat = 'MM/dd/yyyy';
  displayPeriodTitle: string;
  showRetroScheduleTab = false;
  jeRetroPopupVisible = false;
  jeProcessingPopupData: any;
  jePopupTile: string;
  jePaymentPopupData: any;
  maxHeight ='70%';
  minHeight = '50%'
  popupHeight='';
  retrospectiveAdjustmentPopupData: any;
  tabs: any[] = null;
  private subscription = new Subscription();

  constructor(public accountingSummaryService: AccountingSummaryService, private changeDetector: ChangeDetectorRef, private datePipe: DatePipe) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.amortizationGridRowClickEvent && changes.amortizationGridRowClickEvent.currentValue !== undefined) {
      this.setupJeRetroPopup(this.amortizationGridRowClickEvent); 
    }

    if (!!changes.userInfo && changes.userInfo.currentValue !== undefined) {
      if (this.userInfo.useDateEU) {
        this.dateFormat = 'dd.MM.yyyy';
      }
    }

    if (!!changes.newRetroEventJeStatus && changes.newRetroEventJeStatus.currentValue !== undefined && changes.newRetroEventJeStatus.currentValue !== "") {
      const foundEvent = this.retrospectiveAdjustmentPopupData.find(ret => ret.jeStatus !== null);
      foundEvent.jeStatus = changes.newRetroEventJeStatus.currentValue;
    }
  }

  onJeDataSaved() {
    this.getJeProcessingPopupData(this.jeProcessingPopupData.leaseRecognitionPeriodID);
  }

  onRetroAdustmentGridRowClick(event) {
    this.retroAdustmentGridRowClickEvent.emit(event);
  }

  onTabChanged(event: any) {
    if (event.name === 'selectedIndex' && event.value !== undefined) {
      const selectedTab = this.tabs[event.value];
        this.popupHeight = this.maxHeight;
      }
  }

  setPopupHeight(isMaxHeight: boolean): void {
    this.popupHeight = isMaxHeight ? this.maxHeight : this.minHeight;
    this.changeDetector.detectChanges();
  }

  setupJeRetroPopup(event: any) {
    const { leaseRecognitionPeriodID, displayPeriod, periodStart, periodEnd } = event.data;
    this.showRetroScheduleTab = (!!this.eventScheduleData.retroScheduleID) && (event.data.scheduleIndex === this.eventScheduleData.scheduleIndex) && event.data.isImpactedByRetro &&
      ((!!this.eventScheduleData.adjustmentAmount) || (!!this.eventScheduleData.functional_AssetAdjustmentAmount) || (!!this.eventScheduleData.liabilityAdjustmentAmount));

    this.tabs = [{ "title": "Journal Entry", "template":"jeProcessingData" }];
    this.getJeProcessingPopupData(leaseRecognitionPeriodID);

    if(!this.isPopupForRetroGridClick) {
      this.tabs.push({ "title": "Payment Detail", "template":"paymentDetailData" })
      this.getJePaymentPopupData(leaseRecognitionPeriodID);

      if(this.showRetroScheduleTab){
        this.tabs.push({ "title": "Retrospective Adjustment", "template":"retrospectiveAdjustmentData" })
        this.getRetrospectiveAdjustmentPopupData(this.eventScheduleData.retroScheduleID);
      }
    }

    this.jeRetroPopupVisible = true;
    const formattedStart = this.datePipe.transform(displayPeriod === 'Beginning Balance' ? periodStart : new Date(periodStart), this.dateFormat);
    const formattedEnd = displayPeriod === 'Beginning Balance' ? '' : this.datePipe.transform(periodEnd, this.dateFormat);
    this.jePopupTile = `Period: ${displayPeriod} (${formattedStart}${formattedEnd ? ' - ' + formattedEnd : ''})`;

    this.displayPeriodTitle = displayPeriod
  }

  onJeRetroPopupHidden() {
    this.jeRetroPopupVisible = false;
    const copyOfJeProcessingPopupData = JSON.parse(JSON.stringify(this.jeProcessingPopupData)); 
    this.jeRetroPopupClosedEvent.emit(copyOfJeProcessingPopupData);
    this.jeProcessingPopupData = null;
  }

  private getJeProcessingPopupData(leaseRecognitionPeriodID: number) {
    const jeProcessingDetails = this.accountingSummaryService.getJeProcessingPopupData(leaseRecognitionPeriodID);
  
    this.subscription.add(jeProcessingDetails.subscribe(
      (res) => {
        const jeProcessingDetailsResponse = res;
  
        if (jeProcessingDetailsResponse === null) {
          this.accountingSummaryService.displayContactSystemAdminMessage();
        } else if (!jeProcessingDetailsResponse.success) {
          this.accountingSummaryService.errorNotify(jeProcessingDetailsResponse.clientErrorMessage);
        } else {
          this.jeProcessingPopupData = jeProcessingDetailsResponse.data;
        }
      },
    ));
  }

  private getJePaymentPopupData(leaseRecognitionPeriodID: number) {
    const jePaymentDetails = this.accountingSummaryService.getJePaymentPopupData(leaseRecognitionPeriodID);
  
    this.subscription.add(jePaymentDetails.subscribe(
      (res) => {
        const jePaymentDetailsResponse = res;
  
        if (jePaymentDetailsResponse === null) {
          this.accountingSummaryService.displayContactSystemAdminMessage();
        } else if (!jePaymentDetailsResponse.success) {
          this.accountingSummaryService.errorNotify(jePaymentDetailsResponse.clientErrorMessage);
        } else {
          this.jePaymentPopupData = jePaymentDetailsResponse.data;
        }
      },
    ));
  }

  private getRetrospectiveAdjustmentPopupData(leaseRecognitionScheduleID) {
    this.subscription.add(this.accountingSummaryService.getAmortizationDetails(leaseRecognitionScheduleID).subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.retrospectiveAdjustmentPopupData = response.data;
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  } 
}
