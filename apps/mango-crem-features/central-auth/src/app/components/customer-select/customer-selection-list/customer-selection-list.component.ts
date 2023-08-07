import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { fadeInOut } from '@mango/core-shared'
import { UserService } from '@mango/core-shared';
import { UserSite } from '@mango/data-models/lib-data-models';
import { CentralAuthFacade } from '../../../+state/facades';

@Component({
  selector: 'mango-customer-selection',
  templateUrl: './customer-selection-list.component.html',
  styleUrls: ['./customer-selection-list.component.scss'],
  animations: [fadeInOut],
})

// The component contains all the customers that can be selected once a user is logged in (if they have multiple sites)
export class CustomerSelectionListComponent implements OnInit {
  isLoading = false;
  clients: UserSite[];
  clientsDropdown: string[];
  recentClients: UserSite[];
  tooltipState: boolean[] = []
  @Output() onClientSelected: EventEmitter<UserSite> = new EventEmitter<UserSite>()

  constructor(
    private userService: UserService,
    private _toastr: ToastrService,
    private centralAuthFacade: CentralAuthFacade
  ) { }

  ngOnInit() {
    this.getClientSitesForUser();
  }

  getClientSitesForUser() {
    let userEmail = this.userService.currentUserValue.email;
    this.userService.getClientSitesByUser(userEmail).subscribe(
      (result) => {
        this.clients = result.userSites;
        this.recentClients = result.recentUserSites;

        this.clientsDropdown = this.clients.map(item => {
          return item.clientKey.toUpperCase();
        })
      }
    )
  }

  reloadRecentSitesForUser() {
    let userEmail = this.userService.currentUserValue.email;
    this.userService.getRecentSitesForUser(userEmail).subscribe(
      (result) => {
        this.recentClients = result.recentUserSites;
      }
    )
  }

  clientSelected(event) {
    if (event.value === null) {  
      // The clear button was clicked
      return;
    }  

    const clientKey = event.value?.toLowerCase();
    const client = this.clients.find(c => c.clientKey.toLowerCase() === clientKey.toLowerCase())
    this.centralAuthFacade.setClientKey(clientKey)
    this.onClientSelected.emit(client)
  }

  recentClientSelected(client: UserSite): void {
    this._toastr.clear();
    this.centralAuthFacade.setClientKey(client.clientKey)
    this.onClientSelected.emit(client)
  }

  toggleTooltip(siteId: number): void {
    this.tooltipState[siteId] = !this.tooltipState[siteId]
  }
}
