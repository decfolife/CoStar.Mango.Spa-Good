import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from '@mangoSpa/src/environments/environment.test';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import notify from 'devextreme/ui/notify';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountingSummaryService extends EndpointService {
  private apiUrl: string;
  private leaseAbstractId: number
  private navPageId: number
  titleLeaseInfoSubject = new Subject<any>();
  preferenceSavePendingMessage = " - You have unsaved preference changes.";

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = environment.appUrls.accountingSummary;
  }

  setLeaseAbstractId(leaseId: number) {
    this.leaseAbstractId = leaseId;

    if (this.leaseAbstractId > 0) {
      localStorage.setItem("accSumLeaseAbstractId", this.leaseAbstractId.toString());
    } else {
      const storedLeaseAbstractId = Number(localStorage.getItem("accSumLeaseAbstractId"));

      //if stored lease abstract id is a number.  It should always be one but extra check will not hurt
      if (!isNaN(storedLeaseAbstractId)) {
        this.leaseAbstractId = storedLeaseAbstractId
      }
    }
  }

  getLeaseAbstractId(): number {
    return this.leaseAbstractId;
  }

  getTitleInfoFromSubject(): Observable<any> {
    return this.titleLeaseInfoSubject.asObservable();
  }

  delayGridPanelCollapseWhenFilterIsVisible() {
    const filterObject = document.querySelector("[aria-label='Filter options']:not(.dx-state-invisible)");
    if(filterObject !== null){
      const delay = 400
      const start = new Date().getTime();
      while (new Date().getTime() < start + delay);
    } 
  }

  setNavPageId(navPageId: number) {
    this.navPageId = navPageId;

    if (this.navPageId > 0) {
      localStorage.setItem("accSumNavPageId", this.navPageId.toString());
    } else {
      const storedNavPageId = Number(localStorage.getItem("accSumNavPageId"));

      //if stored navigation page id is a number.  It should always be one but extra check will not hurt
      if (!isNaN(storedNavPageId)) {
        this.navPageId = storedNavPageId
      }
    }
  }

  getNavPageId(): number {
    return this.navPageId;
  }

  getLeaseInfo() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetLeaseInformation/lease/${this.leaseAbstractId}`, 'getLeaseInfo');
    }

    const url = `${this.apiUrl}GetLeaseInformation`;
    const leaseAbstractId = this.leaseAbstractId;
    return this.callHttpPost(url, 'getLeaseInfo', { leaseAbstractId });
  }

  getAccountingEvents() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetAccountingEventsSelector/lease/${this.leaseAbstractId}`, 'getAccountingEvents');
    }

    const url = `${this.apiUrl}GetAccountingEventsSelector`;
    const leaseAbstractId = this.leaseAbstractId;
    return this.callHttpPost(url, 'getAccountingEvents', { leaseAbstractId });
  }

  getUserInformation() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetUserInformation`, 'getUserInformation');
    }

    const url = `${this.apiUrl}GetUserInformation`;
    return this.callHttpPost(url, 'getUserInformation', { });
  }

  getUserNavPageRight() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetUserNavPageRight/navPage/${this.navPageId}`, 'getUserNavPageRight');
    }

    const url = `${this.apiUrl}GetUserNavPageRight`;
    const navPageId = this.navPageId;
    return this.callHttpPost(url, 'getUserNavPageRight', { navPageId });
  }

  getAccountingSummaryRights() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetAccountingSummaryRights/navPage/${this.navPageId}/lease/${this.leaseAbstractId}`, 'getAccountingSummaryRights');
    }

    const url = `${this.apiUrl}GetAccountingSummaryRights`;
    const leaseAbstractId = this.leaseAbstractId;
    const navPageId = this.navPageId;
    return this.callHttpPost(url, 'getAccountingSummaryRights', { navPageId, leaseAbstractId });
  }

  getWorkflowStatusInformation() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetWorkflowStatusInformation/lease/${this.leaseAbstractId}`, 'getWorkflowStatusInformation');
    }

    const url = `${this.apiUrl}GetWorkflowStatusInformation`;
    const leaseAbstractId = this.leaseAbstractId;
    return this.callHttpPost(url, 'getWorkflowStatusInformation', { leaseAbstractId });
  }

  getWorkflowStatusHistory() {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetWorkflowStatusHistory/lease/${this.leaseAbstractId}`, 'getWorkflowStatusHistory');
  }

  getEventDetails(masterScheduleId: number) {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetAccountingEventsSummary/masterschedule/${masterScheduleId}`, 'getEventDetails');
    }

    const url = `${this.apiUrl}GetAccountingEventsSummary`;
    return this.callHttpPost(url, 'getEventDetails', { masterScheduleId });
  }

  getPaymentDetails(leaseRecognitionScheduleId: number) {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}Payments/GetHistoricalPayments/schedule/${leaseRecognitionScheduleId}`, 'getPaymentDetails');
    }

    const url = `${this.apiUrl}GetHistoricalPayments`;
    return this.callHttpPost(url, 'getPaymentDetails', { leaseRecognitionScheduleId });
  }

  getPaymentPopupData(leaseRecognitonScheduleEventId: number) {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}Payments/GetHistoricalTransactions/scheduleevent/${leaseRecognitonScheduleEventId}`, 'getPaymentPopupData');
    }

    const url = `${this.apiUrl}gethistoricaltransactions`;
    return this.callHttpPost(url, 'getPaymentPopupData', { leaseRecognitonScheduleEventId });
  }

  getPortfolioSettings() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetPortfolioSettings/lease/${this.leaseAbstractId}`, 'getPortfolioSettings');
    }

    const url = `${this.apiUrl}GetPortfolioSettings`;
    const leaseAbstractId = this.leaseAbstractId;
    return this.callHttpPost(url, 'getPortfolioSettings', { leaseAbstractId });
  }

  getGridPreferences() {
    if (environment.isRestful) {
      return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetGridStates/lease/${this.leaseAbstractId}`, 'getGridStates');
    }

    const url = `${this.apiUrl}GetGridStates`;
    const leaseAbstractId = this.leaseAbstractId;
    return this.callHttpPost(url, 'getGridStates', { leaseAbstractId });
  }

  updateWorkflowStatus(workflowStatusId: number, comment: string){
    return this.callHttpPost(`${this.apiUrl}AccountingSummary/UpdateWorkflowStatus`, 'updateWorkflowStatus',
    JSON.stringify({ leaseAbstractID: this.leaseAbstractId, workflowStatusID: workflowStatusId, comment: comment }));
  }

  saveGridPreferences(classificationId: number, gridName: string, columnJson) {
    if (environment.isRestful) {
      return this.callHttpPost(`${this.apiUrl}AccountingSummary/UpdateGridStates`, 'saveGridPreferences',
        JSON.stringify({ leaseAbstractID: this.leaseAbstractId, classificationID: classificationId, gridName: gridName, columnJson: columnJson }));
    }

    const url = `${this.apiUrl}UpdateGridStates`;
    return this.callHttpPost(url, 'saveGridPreferences', { request: { leaseAbstractID: this.leaseAbstractId, classificationID: classificationId, gridName: gridName, columnJson: columnJson } });
  }

  getAmortizationDetails(leaseRecognitionScheduleID: number) {
    if (environment.isRestful) {
        return this.callHttpGet(`${this.apiUrl}AmortizationPeriods/GetAmortizationPeriods/Schedule/${leaseRecognitionScheduleID}`, 'getAmortizationDetails');
    }

    const url = `${this.apiUrl}GetAmortizationPeriods`;
    return this.callHttpPost(url, 'getAmortizationDetails', { leaseRecognitionScheduleID });
  }

  getId(componentName: string, uniqueName: string, elementType: string, componentType?: string) {
    if (componentType != undefined)
      return `${componentName}-${componentType}-${uniqueName}-${elementType}`
    else
      return `${componentName}-${uniqueName}-${elementType}`
  }

  displayContactSystemAdminMessage(){
    this.errorNotify("An error occurred please contact the system administrator.");
  }
  
  errorNotify(message: string) {
    this.notifyPopup(message, "error")
  }

  successNotify(message: string) {
    this.notifyPopup(message, "success")
  }

  private notifyPopup(message: string, messageType: string){
    notify({
      message: message,
      type: messageType,
      displayTime: 5000,
      position: { at: 'center bottom', my: 'center bottom', offset: '0 -16' },
      maxWidth: "400px",
      closeOnClick: true,
    });
  }
}
