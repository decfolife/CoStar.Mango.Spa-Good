import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AccountingSummaryService } from '../../services/accounting-summary.service';
import { Router } from '@angular/router';
import { LeaseInfoResponse } from '../../models/lease-info-response.modal';
import { Subscription, combineLatest } from 'rxjs';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';

@Component({
  selector: 'mango-accounts-summary',
  templateUrl: './accounts-summary.component.html',
  styleUrls: ['./accounts-summary.component.scss'],
})
export class AccountsSummaryComponent implements OnInit, OnDestroy {

  componentName = 'accounts-summary';
  readonly allowedPageSizes = ['all'];
  isAddButtonDisabled = true;
  eventSchedule: any;
  leaseInfoResponse: LeaseInfoResponse;
  isLocked = false;
  isArchived = false;
  rightsInfo: any;
  userInfo: UserInfoResponse;
  workflowStatusInfo: any
  workflowStatusHistory: any
  noUserAddRights = false;
  disableBtnReason = "Accounting Event cannot be added when user or lease information is not loaded.";
  isTooltipVisible = false;
  isChangeByTooltipVisible = false;
  private subscription = new Subscription();
  masterScheduleID: number;
  leaseRecognitionScheduleID: number;
  classificationID: number;
  modifiedByID: number;
  modifiedByName: string;
  modifiedDate: any;
  amortizationProfileName: string;
  classificationType: string;
  isAccountingEventEmpty = false;

  constructor(private ref: ChangeDetectorRef, public accountingSummaryService: AccountingSummaryService, public router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.setRightsAndLeaseInfo();
    this.getWorkflowHistoryInfo();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  returnLeaseAbstractId(): number {
    return this.accountingSummaryService.getLeaseAbstractId()
  }

  getUserInfo(){
    this.subscription.add(this.accountingSummaryService.getUserInformation().subscribe(res => {
      if (res === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (res.success) {
        this.userInfo = res.data
      } else{
        this.accountingSummaryService.errorNotify(res.clientErrorMessage);
      }
    }));
  }

  getDisabledBtnReason() {
    this.isAddButtonDisabled = (this.isLocked || this.isArchived || this.noUserAddRights);
    switch (this.isAddButtonDisabled) {
      case this.noUserAddRights:
        this.disableBtnReason = "Accounting Event cannot be added when user does not have Add rights."
        break;
      case this.isLocked:
        this.disableBtnReason = "Accounting Event cannot be added when Lease is Locked."
        break;
      case this.isArchived:
        this.disableBtnReason = "Accounting Event cannot be added when Lease is Archived."
        break;
    }
  }

  onDataChanged(data: any) {
    this.amortizationProfileName = data.amortizationProfileName;
    this.classificationType = data.classificationType;
    this.isAccountingEventEmpty = data.isAccountingEventEmpty;
    this.classificationID = data.classificationID
  }

  addEvent(event) {
    const queryString = window.location.search;
    if (queryString !== "") {
      const queryParamObj = {};
      const queryParamArray = queryString.substring(1).split('&');
      queryParamArray.forEach(qp => {
        const nameValue = qp.split('=')
        queryParamObj[nameValue[0]] = nameValue[1];
      });

      this.router.navigate(['addEvent'], { queryParams: queryParamObj });
    } else {
      this.router.navigate(['addEvent']);
    }
  }

  exportToExcel(event: any): void {
    event.preventDefault();
    //Set masterScheduleID
    const masterScheduleId = this.masterScheduleID

    //Get Portfolio Settings
    this.subscription.add(this.accountingSummaryService.getPortfolioSettings().subscribe());

    //Get Event Details
    this.subscription.add(this.accountingSummaryService.getEventDetails(masterScheduleId).subscribe());

    //Get Payment Details
    this.subscription.add(this.accountingSummaryService.getPaymentDetails(masterScheduleId).subscribe());

    //Get Amortization Details
    this.subscription.add(this.accountingSummaryService.getAmortizationDetails(masterScheduleId).subscribe());

    //Get Lease Info Details
    this.subscription.add(this.accountingSummaryService.getLeaseInfo().subscribe());

    //Get LeaseAbstractID Details
    this.accountingSummaryService.getLeaseAbstractId();
  }

  onChangeByTooltipMouseOver() {
    this.isChangeByTooltipVisible = true;
  }
  
  onChangeByTooltipMouseLeave() {
    this.isChangeByTooltipVisible = false;
  }


  onMouseEnter() {
    if (this.isAddButtonDisabled) {
      this.isTooltipVisible = true;
    }
  }

  onMouseLeave() {
    this.isTooltipVisible = false;
  }

  onWorkflowStatusSaved(workflowStatusSaved: boolean)
  {
    if(workflowStatusSaved){
      this.getWorkflowHistoryInfo();
    }
  }

  private getWorkflowHistoryInfo() {
    this.subscription.add(this.accountingSummaryService.getWorkflowStatusHistory().subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.workflowStatusHistory = response.data;
        if(response.data.length > 0){
          this.modifiedByID = this.workflowStatusHistory[0].modifiedBy;
          this.modifiedByName = this.workflowStatusHistory[0].modifiedByName;
          this.modifiedDate = this.workflowStatusHistory[0].modifiedDate;
  
        }
      }
      else if (!response.success) {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));

  }

  setLeaseRecognitionScheduleID(eventSchedule: any) {
    this.eventSchedule = eventSchedule;
    this.leaseRecognitionScheduleID = eventSchedule.leaseRecognitionScheduleID;
  }

  private setRightsAndLeaseInfo(){
    const userNavPageRight = this.accountingSummaryService.getUserNavPageRight();
    const userNavPageWithLeaseRights = this.accountingSummaryService.getAccountingSummaryRights();
    const workflowStatusOptions = this.accountingSummaryService.getWorkflowStatusInformation();
    const leaseInformation = this.accountingSummaryService.getLeaseInfo();
   this.subscription.add(combineLatest([userNavPageRight, userNavPageWithLeaseRights, workflowStatusOptions, leaseInformation]).subscribe(res => {
      const userNavPageRightResponse = res[0];
      const userNavPageWithLeaseRightsResponse = res[1];
      const workflowStatusOptionsResponse = res[2];
      const leaseInformationResponse = res[3];

      if(userNavPageRightResponse === null || userNavPageWithLeaseRightsResponse === null || workflowStatusOptionsResponse === null || leaseInformationResponse === null ){
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (!userNavPageRightResponse.success) {
        this.accountingSummaryService.errorNotify(userNavPageRightResponse.clientErrorMessage);
      }
      else if (!userNavPageWithLeaseRightsResponse.success) {
        this.accountingSummaryService.errorNotify(userNavPageWithLeaseRightsResponse.clientErrorMessage);
      }
      else if (!workflowStatusOptionsResponse.success) {
        this.accountingSummaryService.errorNotify(workflowStatusOptionsResponse.clientErrorMessage);
      }
      else if (!leaseInformationResponse.success) {
        this.accountingSummaryService.errorNotify(leaseInformationResponse.clientErrorMessage);
      }
      else {
        this.noUserAddRights = !userNavPageWithLeaseRightsResponse.data.canAddSchedule;

        this.workflowStatusInfo = workflowStatusOptionsResponse.data;
        this.leaseInfoResponse = leaseInformationResponse.data;
        this.isLocked = this.leaseInfoResponse.lockedReason != null;
        this.isArchived = !this.leaseInfoResponse.isActive;

        //send data to the title lease info subject so that the title component gets updated. This will save an extra api call to getLeaseInfo.
        const titleLeaseInfo = {
          leaseName: this.leaseInfoResponse.objectName,
          isLocked: this.isLocked,
          isArchived: this.isArchived,
          lockedReason: this.leaseInfoResponse.lockedReason
        }

        this.accountingSummaryService.titleLeaseInfoSubject.next(titleLeaseInfo);

        this.rightsInfo = {
          userHasEditLeaseRights: userNavPageWithLeaseRightsResponse.data.leaseSecurityType >= 4 && userNavPageWithLeaseRightsResponse.data.leaseSecurityType !== 6,
          wfStatusUserHasEditRights: workflowStatusOptionsResponse.data.options.filter(wfso => wfso.workflowStatusId === workflowStatusOptionsResponse.data.workflowStatusID)[0].allowScheduleEdit,
          userHasLeftNavEditRights: userNavPageRightResponse.data >= 4 && userNavPageRightResponse.data !== 6, 
          userCanDeleteSchedule: userNavPageWithLeaseRightsResponse.data.canDeleteSchedule,
          canApproveJE: userNavPageWithLeaseRightsResponse.data.canApproveJE,
          canUnapproveJE: userNavPageWithLeaseRightsResponse.data.canUnapproveJE,
          canUnexportJE: userNavPageWithLeaseRightsResponse.data.canUnexportJE,
          wfStatusallowJEApproval: workflowStatusOptionsResponse.data.options.filter(wfso => wfso.workflowStatusId === workflowStatusOptionsResponse.data.workflowStatusID)[0].allowJEApproval
        }

        this.getDisabledBtnReason();
      }
    }));
  }
}
