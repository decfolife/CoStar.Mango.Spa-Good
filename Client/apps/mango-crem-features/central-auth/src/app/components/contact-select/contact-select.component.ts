import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { CentralAuthError, ContactRecord, ContactRecordSelection, GetContactRecordHTTPResponse, MangoErrorTypes, MultiClientLoginHttpRequest, MultiContactRecordQueryParams, UserSite } from '@mango/data-models/lib-data-models';
import { DxLoadPanelComponent } from 'devextreme-angular';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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
  isLoading: boolean = false
  openCremInNewTab: boolean = true
  queryParams: MultiContactRecordQueryParams

  contactRecords$: Observable<ContactRecord[]>
  defaultContactRecordID$: Observable<number>
  selectedClientKey$: Observable<string>

  constructor(private userService: UserService, private router: Router, private centralAuthFacade: CentralAuthFacade) {
    this.contactRecords$ = this.centralAuthFacade.userContactRecords$
    this.selectedClientKey$ = this.centralAuthFacade.client$.pipe(filter(client => !!client), map(client => client.clientKey))
    this.defaultContactRecordID$ = this.contactRecords$.pipe(
      filter(contactRecords => !!contactRecords),
      map(contactRecords => (contactRecords.find(c => (c.isDefaultLoginContact === true)) || { contactID: null } as ContactRecord).contactID)
    )
  }

  ngOnInit() {
    this.centralAuthFacade.client$.pipe(
      filter(client => !!client),
      map(client => this.centralAuthFacade.getContactRecords(client.clientKey))
    ).subscribe()
  }

  loginToClientSite(payload: MultiClientLoginHttpRequest): Observable<boolean> {
    this.isLoading = true
    return this.centralAuthFacade.userContactRecords$.pipe(
      filter(contactRecords => !!contactRecords),
      map(contactRecords => contactRecords.find(c => c.contactID === payload.contactID) || {contactID: 0, }),
      filter(selectedContactRecord => !!selectedContactRecord),
      tap(selectedContactRecord => {
        this.contactRecord.emit(selectedContactRecord)
        this.centralAuthFacade.setContactId(selectedContactRecord.contactID)
      }),
      switchMap(_ => combineLatest([this.centralAuthFacade.redirectionUri$, this.userService.loginToClientSite(payload)])),
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

  loadClientContactRecords(openCremInNewTab: boolean = true, openDefaultSelection: boolean = true): Observable<any> {
    this.isLoading = true
    this.openCremInNewTab = openCremInNewTab;
    return combineLatest([this.centralAuthFacade.user$, this.centralAuthFacade.client$, this.centralAuthFacade.userContactRecords$, this.defaultContactRecordID$]).pipe(
      filter(([user, client, contactRecords]) => !!user && !!client && !!contactRecords),
      switchMap(([user, client, contactRecords, defaultContactRecordID]) => {
        if ((!defaultContactRecordID && contactRecords.length > 1) || !openDefaultSelection) {
          return this.initializeContactRecordsPopup()
        }
        if (contactRecords.length === 0 && !user.isAutoProvisioned) {
          throw new CentralAuthError(
            {
              message: `Access was not granted for ${client.clientKey}.`,
              title: 'Error',
              errorType: MangoErrorTypes.FATAL,
              errorCode: ''
            })
        }
        const firstContactRecord = contactRecords[0]
        if (firstContactRecord && firstContactRecord.requireSSO && client.isSSOEnabled) {
          return of(window.open(client.ssoUri, "_blank"))
        }
        const payload: MultiClientLoginHttpRequest = {
          clientKey: client.clientKey,
          contactID: defaultContactRecordID || (firstContactRecord || { contactID: 0 }).contactID,
          contactRole: firstContactRecord?.userRoleName
        }
        return this.loginToClientSite(payload)
      })
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

  initializeContactRecordsPopup(): Observable<any> {
    return combineLatest([this.centralAuthFacade.userContactRecords$, this.defaultContactRecordID$]).pipe(
      filter(([contactRecords]) => !!contactRecords),
      map(([contactRecords, defaultContactRecordID]) => contactRecords.find(c => c.contactID === defaultContactRecordID)),
      tap(defaultContactRecord => {
        this.userRecordsPopupComponent.selectedContactRecord = defaultContactRecord
        this.userRecordsPopupComponent.showPopup()
      })
    )
  }

  onContactRecordSubmit(selectedContactRecord: ContactRecordSelection) {
    this.centralAuthFacade.client$.pipe(
      filter(client => !!client),
      switchMap(client => {
        this.centralAuthFacade.setClient(client)
        if (client.isSSOEnabled && selectedContactRecord.contactRecord.requireSSO) {
          return this.openClientSSOUri()
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


  openClientSSOUri(): Observable<any> {
    return this.centralAuthFacade.client$.pipe(
      filter(client => !!client),
      tap(client => window.location.href = client.ssoUri)
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
