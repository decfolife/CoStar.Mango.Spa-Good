import { Component, ViewChild } from '@angular/core';
import { CentralAuthError, CentralAuthErrorCodes, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE, UserSite } from '@mango/data-models/lib-data-models';
import { Subscription } from 'rxjs';
import { CentralAuthFacade } from '../../+state/facades';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { CustomerSelectionListComponent } from '../customer-select/customer-selection-list/customer-selection-list.component';

@Component({
  selector: 'mango-customer-select',
  templateUrl: './customer-select.component.html',
  styleUrls: ['./customer-select.component.scss']
})
export class CustomerSelectComponent {

  @ViewChild(ContactSelectComponent) contactSelectComponent: ContactSelectComponent
  @ViewChild(CustomerSelectionListComponent) customerSelectionListComponent: CustomerSelectionListComponent
  
  subs: Subscription[] = []

  constructor(
    private centralAuthFacade: CentralAuthFacade) { }

  onClientSelected(client: UserSite){
    if (!client) {
      throw new CentralAuthError({
        message: UNEXPECTED_ERROR_MESSAGE,
        title: 'Error',
        errorType: MangoErrorTypes.FATAL,
        errorCode: CentralAuthErrorCodes.InternalError
      })
    }

    this.centralAuthFacade.setClient(client)
    client.isSSOEnabled && client.forceSSO ? window.open(client.ssoUri, "_blank") : this.contactSelectComponent.loadClientContactRecords(client.clientKey).subscribe()
    //this.customerSelectionListComponent.reloadRecentSitesForUser();
  }
}
