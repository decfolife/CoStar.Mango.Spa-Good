import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserSite } from '@mango/data-models/lib-data-models';
import { Subscription, combineLatest, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { CustomerSelectionListComponent } from '../customer-select/customer-selection-list/customer-selection-list.component';

@Component({
  selector: 'mango-customer-select',
  templateUrl: './customer-select.component.html',
  styleUrls: ['./customer-select.component.scss'],
})
export class CustomerSelectComponent implements AfterViewInit {

  @ViewChild(ContactSelectComponent) contactSelectComponent: ContactSelectComponent
  @ViewChild(CustomerSelectionListComponent) customerSelectionListComponent: CustomerSelectionListComponent

  subs: Subscription[] = []

  constructor(private centralAuthFacade: CentralAuthFacade, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.centralAuthFacade.getUserClients()
    combineLatest([this.centralAuthFacade.isClientSpecificLogin$, this.activatedRoute.queryParamMap]).pipe(
      switchMap(([isClientSpecificLogin, queryParamMap]) => combineLatest([of(isClientSpecificLogin), of(queryParamMap.get('clientKey')), of(queryParamMap.get('showMutliContactPopup'))])),
      filter(([isClientSpecificLogin, clientKey, showMultiContactPopup]) => isClientSpecificLogin || (!!clientKey && !!showMultiContactPopup && showMultiContactPopup === 'true')),
      switchMap((_ => this.contactSelectComponent.loadClientContactRecords(false, false)))
    ).subscribe()
  }

  onClientSelected(client: UserSite) {
    this.centralAuthFacade.setClient(client)
    client.isSSOEnabled && client.forceSSO ? window.open(client.ssoUri, "_blank") : this.contactSelectComponent.loadClientContactRecords().subscribe()
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
