import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { fadeInOut } from '@mango/core-shared';
import { UserSite } from '@mango/data-models/lib-data-models';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../../+state/facades';

@Component({
  selector: 'mango-customer-selection',
  templateUrl: './customer-selection-list.component.html',
  styleUrls: ['./customer-selection-list.component.scss'],
  animations: [fadeInOut],
})

export class CustomerSelectionListComponent implements OnInit, OnDestroy {
  clients$ = this.centralAuthFacade.userClients$;
  isLoading$ = this.clients$.pipe(map(clients => !clients));
  recentClients$ = this.centralAuthFacade.userRecentClients$;
  clientsDropdown$: Observable<string[]> = this.clients$.pipe(filter(clients => !!clients), map(clients => clients.map(client => client.clientKey.toUpperCase())));

  tooltipState: boolean[] = []

  subs: Subscription[] = []
  @Output() onClientSelected: EventEmitter<UserSite> = new EventEmitter<UserSite>()

  constructor(
    private centralAuthFacade: CentralAuthFacade
  ) { }

  ngOnInit(): void {
  }

  clientSelected(event) {
    this.subs.push(
      this.clients$.pipe(
        filter(_ => !!event.value),
        map(clients => clients.find(client => client.clientKey.toLowerCase() === event.value.toLowerCase())),
        filter(selectedClient => !!selectedClient),
        tap(selectedClient => {
          this.onClientSelected.emit(selectedClient)
        })
      ).subscribe()
    )
  }

  recentClientSelected(client: UserSite): void {
    this.onClientSelected.emit(client)
  }

  toggleTooltip(siteId: number): void {
    this.tooltipState[siteId] = !this.tooltipState[siteId]
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
