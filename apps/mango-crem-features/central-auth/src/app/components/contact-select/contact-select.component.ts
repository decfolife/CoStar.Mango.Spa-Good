import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DBkeys, SettingsService, StorageService, UserService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { CentralAuthErrorCodes, CentralAuthError, ContactRecord, ContactRecordSelection, Environment, GetContactRecordHTTPResponse, MultiClientLoginHttpRequest, MultiContactRecordQueryParams, UserSite, MangoErrorTypes, CentralAuthHttpError, IS_CA_STANDALONE_APP, ContactRecordHTTPObject, MANGO_SPA_DEFAULT_PAGE } from '@mango/data-models/lib-data-models';
import { DxLoadPanelComponent } from 'devextreme-angular';
import { UserRecordsPopupComponent } from '../customer-select/user-records-popup/user-records-popup.component';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { CentralAuthURLService } from '../../services/url.service';
import { CentralAuthFacade } from '../../+state/facades';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.dev';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-contact-select',
  templateUrl: './contact-select.component.html',
  styleUrls: ['./contact-select.component.scss'],
  providers: [CentralAuthURLService]
})
export class ContactSelectComponent implements OnInit, OnDestroy {
  @Output() contactRecord: EventEmitter<ContactRecord> = new EventEmitter<ContactRecord>()
  @ViewChild(UserRecordsPopupComponent) userRecordsPopupComponent: UserRecordsPopupComponent
  @ViewChild(DxLoadPanelComponent) dxLoadPanel: DxLoadPanelComponent

  subs: Subscription[] = []
  contactRecords: ContactRecord[] = []
  defaultContactRecordID: number = 0
  isLoading: boolean = false
  clientKey: string = null
  openCremInNewTab: boolean = true
  queryParams: MultiContactRecordQueryParams

  constructor(private userService: UserService, @Inject(IS_CA_STANDALONE_APP) private isCAStandaloneApp: boolean = true, private settingsService: SettingsService, private storageService: StorageService, private env: Environment, private urlService: CentralAuthURLService, private router: Router, private centralAuthFacade: CentralAuthFacade) { }

  async ngOnInit() {
    const currentUser = this.userService.currentUserValue
    if (!currentUser) {
      return this.redirectToLogin()
    }

    this.queryParams = this.urlService.readMutliContactQueryParams()
    if (this.queryParams.showMultiContactPopup) {
      const clientSpecificKeyPresent = !!this.urlService.readClientSiteRouteParam()
      await this.loadClientContactRecords(this.queryParams.clientKey.toLowerCase(), !clientSpecificKeyPresent, false)
    }
  }

  async loginToClientSite(payload: MultiClientLoginHttpRequest): Promise<boolean> {
    this.isLoading = true
    const selectedContactRecord = this.contactRecords.find(c => c.contactID === payload.contactID)
    this.contactRecord.emit(selectedContactRecord)
    this.centralAuthFacade.setContactId(selectedContactRecord.contactID)
    try {
      var token = await this.userService.loginToClientSite(payload);
      this.storageService.savePermanentData(token, DBkeys.JWT_TOKEN)
      this.isLoading = false;
      this.settingsService.clientKey$.next(payload.clientKey)
      this.storageService.savePermanentData(payload.clientKey, DBkeys.CLIENT_KEY)
      let newCremURL = environment.cremBaseUrl.replace('[CLIENT]', payload.clientKey)
      // newCremURL += this.openCremInNewTab ? '&mul=true' : '&mul=false'
      this.centralAuthFacade.setRedirectionUri(newCremURL)
      this.subs.push(this.centralAuthFacade.redirectionUri$.pipe(
        map(redirectionUri => {
          if (!!redirectionUri) {
            this.router.navigate(['/oauth/authorize'], {queryParams: {redirect_uri: redirectionUri}})
          } 
        })
      ).subscribe())
      return true;
    } catch (errorResponse) {
      this.isLoading = false;
      return false;
    }
  }

  async loadClientContactRecords(clientKey: string, openCremInNewTab: boolean = true, openDefaultSelection: boolean = true): Promise<boolean> {
    this.contactRecords = []
    this.isLoading = true
    const { email } = this.userService.currentUserValue
    this.clientKey = clientKey
    this.openCremInNewTab = openCremInNewTab;

    try {
      const contactRecordsHTTPResponse = await this.userService.getContactRecords(email, clientKey);
      this.contactRecords = contactRecordsHTTPResponse.contactRecords.map(this.contactRecordMapper)
      this.isLoading = false

      const defaultContactId = this.getDefaultSelectedContactId(contactRecordsHTTPResponse)
      if (!defaultContactId && contactRecordsHTTPResponse.contactRecords.length > 1 || !openDefaultSelection) {
        this.initializeContactRecordsPopup(contactRecordsHTTPResponse);
        return true;
      }

      var selectedSite = this.userService.selectedSiteValue

      var contactRecord = contactRecordsHTTPResponse.contactRecords[0];
      if (!contactRecord && !this.userService.currentUserValue.isAutoProvisioned) {
        throw new CentralAuthError(
          {
            message: `Access was not granted for ${clientKey}.`,
            title: 'Error',
            errorType: MangoErrorTypes.FATAL,
            errorCode: ''
          })
      } else if (contactRecord && selectedSite?.isSSOEnabled && contactRecord.requireSSO) {
        window.open(selectedSite.ssoUri, "_blank");
        return true;
      }

      let contactId = 0;
      if (defaultContactId) {
        contactId = defaultContactId;
      } else {
        contactId = contactRecord ? contactRecord.contactID : 0
      }

      const payload: MultiClientLoginHttpRequest = { clientKey: clientKey, contactID: contactId, contactRole: contactRecord?.userRoleName }
      var success: boolean = await this.loginToClientSite(payload);
      this.dxLoadPanel.instance.hide();

      return success;
    } catch (error) {
      this.isLoading = false
      if (error.errorCode === CentralAuthErrorCodes.UserSiteNotActive) {
        const result = await this.loginToClientSite({ clientKey: clientKey, contactID: 0 });
        if (result === true) {
          return true
        }
        return
      }
      if (!CentralAuthErrorHandler.isHttpError(error)) {
        throw new CentralAuthError(error)
      }
    }
  }

  redirectToLogin(): void {
    const loginUrl = this.queryParams?.showMultiContactPopup ? this.queryParams.clientKey : ''
    if (this.queryParams?.showMultiContactPopup) {
      this.router.navigate([`/${loginUrl}`])
    }
  }

  // Check if default contact record is selected and return the contactID
  getDefaultSelectedContactId(contactRecordsHTTPResponse: GetContactRecordHTTPResponse): number | null {
    const defaultContactRecord = contactRecordsHTTPResponse.contactRecords.find(c => c.isDefaultLoginContact === true)
    return defaultContactRecord ? defaultContactRecord.contactID : null
  }

  initializeContactRecordsPopup(contactRecordsHttpResponse: GetContactRecordHTTPResponse) {
    this.contactRecords = contactRecordsHttpResponse.contactRecords.map(this.contactRecordMapper)
    this.defaultContactRecordID = (contactRecordsHttpResponse.contactRecords.find(c => c.isDefaultLoginContact === true) || { contactID: null }).contactID
    this.userRecordsPopupComponent.selectedDefaultContactRecord = this.contactRecords.find(c => c.contactID === this.defaultContactRecordID)
    this.userRecordsPopupComponent.showPopup()
  }

  async onContactRecordSubmit(selectedContactRecord: ContactRecordSelection): Promise<void> {
    const selectedSite = this.userService.selectedSiteValue
    if (selectedSite?.isSSOEnabled && selectedContactRecord.contactRecord.requireSSO) {
      this.openClientSSOUri(selectedSite)
    } else {
      const { contactRecord, defaultSelection, isDefaultChanged } = selectedContactRecord
      const payload: MultiClientLoginHttpRequest = {
        contactID: contactRecord.contactID,
        contactRole: contactRecord.userRoleName,
        defaultLoginContactId: defaultSelection ? defaultSelection.contactID : 0,
        clientKey: selectedSite ? selectedSite.clientKey : this.clientKey,
        isDefaultLoginContact: isDefaultChanged
      }

      await this.loginToClientSite(payload);
    }
  }

  contactRecordMapper(contactRecordHttpObject: ContactRecordHTTPObject): ContactRecord {
    const {
      contactID,
      contactFirstName: firstName,
      contactLastName: lastName,
      contactUserID: userName, userRoleName, requireSSO } = contactRecordHttpObject
    return {
      contactID,
      firstName,
      lastName,
      userName,
      userRoleName,
      requireSSO
    }
  }
  
  openClientSSOUri(selectedSite: UserSite): void {
    window.location.href = selectedSite.ssoUri
  }

  ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe())
  }
}
