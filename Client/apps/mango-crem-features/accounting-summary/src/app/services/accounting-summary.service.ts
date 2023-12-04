import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from '@mangoSpa/src/environments/environment.local';
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
    let filterObject = document.querySelector("[aria-label='Filter options']:not(.dx-state-invisible)");
    if(filterObject !== null){
      let delay = 400
      let start = new Date().getTime();
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
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getleaseinformation/lease/${this.leaseAbstractId}`, 'getLeaseInfo');
  }

  getAccountingEvents() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getaccountingeventsselector/lease/${this.leaseAbstractId}`, 'getAccountingEvents');  
  }

  getUserInformation() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getuserinformation`, 'getUserInformation');
  }

  getUserNavPageRight() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getUserNavPageRight/navPage/${this.navPageId}`, 'getUserNavPageRight');
  }

  getUserNavPageWithLeaseRights() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getUserNavPageWithLeaseRights/navPage/${this.navPageId}/lease/${this.leaseAbstractId}`, 'getUserNavPageWithLeaseRights');
  }

  getWorkflowStatusOptions() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getAccountingWorkflowStatusInformation/lease/${this.leaseAbstractId}`, 'getWorkflowStatusOptions');
  }

  getEventDetails(masterScheduleId: number) {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getaccountingeventssummary/masterschedule/${masterScheduleId}`, 'getEventDetails');
  }

  getPaymentDetails(leaseRecognitionScheduleId: number) {
    return this.callHttpGet(`${this.apiUrl}Payments/gethistoricalpayments/schedule/${leaseRecognitionScheduleId}`, 'getPaymentDetails');
  }

  getPaymentPopupData(leaseRecognitonScheduleEventId: number) {
    return this.callHttpGet(`${this.apiUrl}Payments/gethistoricaltransactions/scheduleevent/${leaseRecognitonScheduleEventId}`, 'getPaymentPopupData');
  }

  getPortfolioSettings() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getportfoliosettings/lease/${this.leaseAbstractId}`, 'getPortfolioSettings');
  }

  getGridPreferences() {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/getgridstates/lease/${this.leaseAbstractId}`, 'getGridStates');
  }

  saveGridPreferences(classificationId: number, gridName: string, columnJson) {
    return this.callHttpPost(`${this.apiUrl}AccountingSummary/savegridstates`, 'saveGridStates',
      JSON.stringify({ leaseAbstractID: this.leaseAbstractId, classificationID: classificationId, gridName: gridName, columnJson: columnJson }));
  }

  getAmortizationDetails(leaseRecognitionScheduleID: number) {
    return this.callHttpGet(`${this.apiUrl}AccountingSummary/GetAmortizationPeriods/Schedule/${leaseRecognitionScheduleID}`, 'getAmortizationDetails');
  }

  getId(componentName: string, uniqueName: string, elementType: string, componentType?: string) {
    if (componentType != undefined)
      return `${componentName}-${componentType}-${uniqueName}-${elementType}`
    else
      return `${componentName}-${uniqueName}-${elementType}`
  }

  displayContactSystemAdminMessage() {
    this.notify("An error occurred please contact the system administrator.");
  }
  
  notify(message: string) {
    notify({
      message: message,
      type: "error",
      displayTime: 5000,
      position: { at: 'center bottom', my: 'center bottom', offset: '0 -16' },
      maxWidth: "400px",
      closeOnClick: true,
    });
  }
}
