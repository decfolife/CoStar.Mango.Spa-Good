import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { fadeInOut } from '@mango/core-shared'
import { UserService } from '@mango/core-shared';
import { ClientSitesByUser, UserSite } from '@mango/data-models/lib-data-models';
import { CentralAuthFacade } from '../../../+state/facades';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'mango-customer-selection',
  templateUrl: './customer-selection-list.component.html',
  styleUrls: ['./customer-selection-list.component.scss'],
  animations: [fadeInOut],
})

export class CustomerSelectionListComponent implements OnInit {
  isLoading = true;
  clients: UserSite[];
  clientsDropdown: string[];
  recentClients: UserSite[];
  tooltipState: boolean[] = []
  @Output() onClientSelected: EventEmitter<UserSite> = new EventEmitter<UserSite>()

  subs: Subscription[] = []
  constructor(
    private userService: UserService,
    private _toastr: ToastrService,
    private centralAuthFacade: CentralAuthFacade
  ) { }

  ngOnInit() {
    this.subs.push(
      this.getClientSitesForUser().pipe(
        tap((response: ClientSitesByUser) => {
          this.isLoading = false
          this.clients = response.userSites;
          this.recentClients = response.recentUserSites;
          this.clientsDropdown = this.clients.map(item => item.clientKey.toUpperCase())
        })).subscribe())
  }

  getClientSitesForUser(): Observable<ClientSitesByUser> {
    return this.centralAuthFacade.user$.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.getClientSitesByUser(user.email))
    )
  }

  reloadRecentSitesForUser() {
    this.centralAuthFacade.user$.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.getRecentSitesForUser(user.email)),
    ).subscribe(result => this.recentClients = result.recentUserSites)
  }

  clientSelected(event) {
    if (event.value !== null) {
      const clientKey = event.value.toLowerCase();
      const client = this.clients.find(c => c.clientKey.toLowerCase() === clientKey.toLowerCase())
      this.centralAuthFacade.setClient(client)
      this.onClientSelected.emit(client)
    }
  }

  recentClientSelected(client: UserSite): void {
    this._toastr.clear();
    this.centralAuthFacade.setClient(client)
    this.onClientSelected.emit(client)
  }

  toggleTooltip(siteId: number): void {
    this.tooltipState[siteId] = !this.tooltipState[siteId]
  }
}
