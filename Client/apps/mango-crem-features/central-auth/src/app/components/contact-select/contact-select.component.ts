import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { CentralAuthError, ContactRecord, ContactRecordHTTPObject, ContactRecordSelection, GetContactRecordHTTPResponse, MangoErrorTypes, MultiClientLoginHttpRequest, MultiContactRecordQueryParams, UserSite } from '@mango/data-models/lib-data-models';
import { DxLoadPanelComponent } from 'devextreme-angular';
import { EMPTY, Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { environment } from '../../../environments/environment.dev';
import { CentralAuthURLService } from '../../services/url.service';
import { UserRecordsPopupComponent } from '../customer-select/user-records-popup/user-records-popup.component';

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

  constructor(private userService: UserService, private urlService: CentralAuthURLService, private router: Router, private centralAuthFacade: CentralAuthFacade) { }

  ngOnInit() {
    this.queryParams = this.urlService.readMutliContactQueryParams()
    if (this.queryParams.showMultiContactPopup) {
      const clientSpecificKeyPresent = !!this.urlService.readClientSiteRouteParam()
      this.subs.push(this.loadClientContactRecords(this.queryParams.clientKey?.toLowerCase(), !clientSpecificKeyPresent, false).subscribe())
    }
  }

  loginToClientSite(payload: MultiClientLoginHttpRequest): Observable<boolean> {
    this.isLoading = true
    const selectedContactRecord = this.contactRecords.find(c => c.contactID === payload.contactID)
    this.contactRecord.emit(selectedContactRecord)
    this.centralAuthFacade.setContactId(selectedContactRecord?.contactID)

    return combineLatest([this.centralAuthFacade.redirectionUri$, this.userService.loginToClientSite(payload)]).pipe(
      filter(([redirectionUri, authHttpResponse]) => !!authHttpResponse),
      map(([redirectionUri, authHttpResponse]) => {
        this.centralAuthFacade.setAccessToken(authHttpResponse.authToken)
        let newRedirectionUri = null
        if (!redirectionUri) {
          newRedirectionUri = `${environment.cremBaseUrl.replace('[CLIENT]', payload.clientKey)}/v06/login.aspx`
          // newCremURL += this.openCremInNewTab ? '&mul=true' : '&mul=false'
          this.centralAuthFacade.setRedirectionUri(newRedirectionUri)
        } else {
          newRedirectionUri = decodeURIComponent(redirectionUri)
          this.centralAuthFacade.setRedirectionUri(decodeURIComponent(redirectionUri))
        }
        this.router.navigate(['/oauth/authorize'], { queryParams: { redirect_uri: newRedirectionUri } })
        return true
      })
    )
  }

  loadClientContactRecords(clientKey: string, openCremInNewTab: boolean = true, openDefaultSelection: boolean = true): Observable<any> {
    this.contactRecords = []
    this.isLoading = true
    this.clientKey = clientKey
    this.openCremInNewTab = openCremInNewTab;
    return this.centralAuthFacade.user$.pipe(
      filter(user => !!user),
      switchMap(user => combineLatest([of(user), this.centralAuthFacade.client$, this.userService.getContactRecords(user.email, clientKey)])),
      switchMap(([user, client, response]) => {
        this.contactRecords = response.contactRecords.map(this.contactRecordMapper)
        const defaultContactId = this.getDefaultSelectedContactId(response)
        if (!defaultContactId && response.contactRecords.length > 1 || !openDefaultSelection) {
          this.initializeContactRecordsPopup(response);
          return of(EMPTY);
        }
        const contactRecord = response.contactRecords[0];
        if (!contactRecord && !user.isAutoProvisioned) {
          throw new CentralAuthError(
            {
              message: `Access was not granted for ${clientKey}.`,
              title: 'Error',
              errorType: MangoErrorTypes.FATAL,
              errorCode: ''
            })
        } else if (contactRecord && client.isSSOEnabled && contactRecord.requireSSO) {
          window.open(client.ssoUri, "_blank");
          return of(EMPTY);
        }

        let contactID = defaultContactId || contactRecord ? contactRecord.contactID : 0;

        const payload: MultiClientLoginHttpRequest = { clientKey, contactID, contactRole: contactRecord?.userRoleName }
        this.dxLoadPanel.instance.hide();
        return this.loginToClientSite(payload);
      }),
    )
    /*try {

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
    }*/
  }

  redirectToLogin(): void {
    const loginUrl = this.queryParams?.showMultiContactPopup ? this.queryParams.clientKey : ''
    if (this.queryParams?.showMultiContactPopup) {
      this.router.navigate([`/${loginUrl}`])
    }
  }

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

  onContactRecordSubmit(selectedContactRecord: ContactRecordSelection) {
    this.centralAuthFacade.user$.pipe(
      switchMap(user => this.userService.getClientSitesByUser(user.email)),
      map((response) => response.userSites.find(client => client.clientKey.toLocaleLowerCase() === this.clientKey.toLocaleLowerCase())),
      filter(client => !!client),
      switchMap(client => {
        this.centralAuthFacade.setClient(client)
        if (client.isSSOEnabled && selectedContactRecord.contactRecord.requireSSO) {
          return this.openClientSSOUri(client)
        } else {
          const { contactRecord, defaultSelection, isDefaultChanged } = selectedContactRecord
          const payload: MultiClientLoginHttpRequest = {
            contactID: contactRecord.contactID,
            contactRole: contactRecord.userRoleName,
            defaultLoginContactId: defaultSelection ? defaultSelection.contactID : 0,
            clientKey: client.clientKey,
            isDefaultLoginContact: isDefaultChanged
          }
          return this.loginToClientSite(payload);
        }
      })
    ).subscribe()
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

  openClientSSOUri(selectedSite: UserSite): Observable<boolean> {
    window.location.href = selectedSite.ssoUri
    return of(true)
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
