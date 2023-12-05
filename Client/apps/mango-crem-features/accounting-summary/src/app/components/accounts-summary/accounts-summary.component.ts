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
  originalgridDataSource: any;
  gridDataSource: any;
  gridBoxValue = [];
  isGridBoxOpened = false;
  isAccountingEventEmpty = true;
  readonly allowedPageSizes = ['all'];
  isAddButtonDisabled = true;
  eventSchedule: any;
  leaseInfoResponse: LeaseInfoResponse;
  isLocked = false;
  isArchived = false;
  rightsInfo: any;
  userInfo: UserInfoResponse;
  noUserAddRights = false;
  disableBtnReason = "Accounting Event cannot be added when user or lease information is not loaded.";
  isTooltipVisible = false;
  pagingEnabled = false;
  private subscription = new Subscription();
  masterScheduleID: number;
  leaseRecognitionScheduleID: number;
  classificationID: number;

  constructor(private ref: ChangeDetectorRef, public accountingSummaryService: AccountingSummaryService, public router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getEventsDropDownData();
    this.setRightsAndLeaseInfo();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEventsDropDownData() {
    this.subscription.add(this.accountingSummaryService.getAccountingEvents().subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success && response.data.length != 0) {
        this.originalgridDataSource = response.data;
        this.gridDataSource = response.data.filter(eventItem => eventItem.isPublished);
        this.pagingEnabled = this.gridDataSource.length > 5;
        this.gridBoxValue = [this.gridDataSource[0].masterScheduleID];
        this.masterScheduleID = this.gridDataSource[0].masterScheduleID;
        this.leaseRecognitionScheduleID = this.gridDataSource[0].leaseRecognitionScheduleID;
        this.classificationID = this.gridDataSource[0].classificationID;
        this.isAccountingEventEmpty = false;
      }
      else if (!response.success) {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
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

  setLeaseRecognitionScheduleID(eventSchedule: any) {
    this.eventSchedule = eventSchedule;
    this.leaseRecognitionScheduleID = eventSchedule.leaseRecognitionScheduleID;
  }

  gridBox_displayExpr(item) {
    this.gridBoxValue = [item.masterScheduleID];
    return item && `${item.classificationType} (${item.amortizationProfileName})`;
  }

  onGridBoxOptionChanged(e) {
    if (e.name === 'value') {
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    }
  }

  onValueChanged(event: any) {
    this.masterScheduleID = parseInt(event.value);
    const selecetedEvent = this.gridDataSource.find(x => (x.masterScheduleID === this.masterScheduleID && x.isPublished));
    this.classificationID = selecetedEvent.classificationID;
    this.leaseRecognitionScheduleID = selecetedEvent.leaseRecognitionScheduleID;
  }

  AddEvent(event) {
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

  onMouseEnter() {
    if (this.isAddButtonDisabled) {
      this.isTooltipVisible = true;
    }
  }

  onMouseLeave() {
    this.isTooltipVisible = false;
  }

  private setRightsAndLeaseInfo(){
    const userNavPageRight = this.accountingSummaryService.getUserNavPageRight();
    const userNavPageWithLeaseRights = this.accountingSummaryService.getUserNavPageWithLeaseRights();
    const workflowStatusOptions = this.accountingSummaryService.getWorkflowStatusOptions();
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
          userCanDeleteSchedule: userNavPageWithLeaseRightsResponse.data.canDeleteSchedule
        }

        this.getDisabledBtnReason();
      }
    }));
  }
}
