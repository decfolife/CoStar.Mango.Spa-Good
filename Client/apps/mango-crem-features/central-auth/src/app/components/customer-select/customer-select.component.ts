import { Component, ViewChild } from '@angular/core';
import { DBkeys, SettingsService, StorageService, UserService } from '@mango/core-shared/lib-core-shared';
import { CentralAuthError, CentralAuthErrorCodes, ContactRecord, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE, UserSite } from '@mango/data-models/lib-data-models';
import { CustomerSelectionListComponent } from '../customer-select/customer-selection-list/customer-selection-list.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-customer-select',
  templateUrl: './customer-select.component.html',
  styleUrls: ['./customer-select.component.scss']
})
export class CustomerSelectComponent {

  @ViewChild(ContactSelectComponent) contactSelectComponent: ContactSelectComponent
  @ViewChild(CustomerSelectionListComponent) customerSelectionListComponent: CustomerSelectionListComponent
  
  contactRecords: ContactRecord[] = []
  defaultContactRecordID: number
  isLoading: boolean = false
  subs: Subscription[] = []

  constructor(
    private userService: UserService, 
    private router: Router,
    private settingsService: SettingsService, 
    private storageService: StorageService) { }

  async onClientSelected(client: UserSite): Promise<void> {
    if (!client) {
      throw new CentralAuthError({
        message: UNEXPECTED_ERROR_MESSAGE,
        title: 'Error',
        errorType: MangoErrorTypes.FATAL,
        errorCode: CentralAuthErrorCodes.InternalError
      })
    }

    this.userService.setSelectedSite(client);
    if (client.isSSOEnabled && client.forceSSO) {
      window.open(client.ssoUri, "_blank");
      return;
    }

    var result = await this.contactSelectComponent.loadClientContactRecords(client.clientKey)
    if (result === true) {
      this.customerSelectionListComponent.reloadRecentSitesForUser();
    }
  }

  contactRecordEvent(contactRecord: ContactRecord): void {
    this.storageService.savePermanentData(contactRecord, DBkeys.CONTACT_RECORD)
    this.settingsService.contactRecord$.next(contactRecord)
  }
}
