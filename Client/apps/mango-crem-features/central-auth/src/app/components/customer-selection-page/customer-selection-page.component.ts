import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserSite } from '@mango/data-models/lib-data-models';
import { DxSelectBoxModule, DxTooltipModule } from 'devextreme-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { ContactRecordsPopupComponent } from '../contact-records-popup/contact-records-popup.component';
import { NavbarModule } from '../navbar/navbar.module';
import { environment } from '../../../environments/environment.dev';
import { Instance } from '../../models/instance';
import { StorageService, UtilitiesService } from '@mango/core-shared';

@Component({
  selector: 'mango-customer-selection-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarModule,
    DxSelectBoxModule,
    MatCardModule,
    DxTooltipModule,
    ContactRecordsPopupComponent,
  ],
  templateUrl: './customer-selection-page.component.html',
  styleUrls: ['./customer-selection-page.component.scss'],
})
export class CustomerSelectionPageComponent implements OnInit {
  clients$: Observable<UserSite[]>;
  isLoading$: Observable<boolean>;
  recentClients$: Observable<UserSite[]>;
  clientsDropdown$: Observable<string[]>;
  instancesDropdown: string[];
  selectedInstance: string;
  tooltipState: boolean[] = [];

  get isDevEnv(): boolean {
    return environment.name === 'DEV';
  }

  constructor(private centralAuthFacade: CentralAuthFacade, private storageService: StorageService) {
    this.clients$ = this.centralAuthFacade.userClients$;
    this.isLoading$ = this.clients$.pipe(map((clients) => !clients));
    this.recentClients$ = this.centralAuthFacade.userRecentClients$;
    this.clientsDropdown$ = this.clients$.pipe(
      filter((clients) => !!clients),
      map((clients) => clients.map((client) => client.clientKey.toUpperCase()))
    );

    if (this.isDevEnv) {
      this.instancesDropdown = Object.keys(Instance)
      .filter(x => !isNaN(Number(x)))
      .map(key => Instance[key]);

      const instance = this.storageService.getData('instance')
    
      this.selectedInstance = instance ?? Instance[Instance.App];
      this.centralAuthFacade.setSelectedInstance(this.selectedInstance);
    }
  }

  ngOnInit(): void {
    this.centralAuthFacade.getUserClients();
    this.centralAuthFacade.startAuthorizationWhenFullySelected();
  }

  onClientSelected(clientKey: string) {
    this.centralAuthFacade.setSelectedClientKey(clientKey);
  }

  // For DEV env only.
  // Instance will normally be a team name. E.g. ditto
  onInstanceSelected(instance: string) {
    this.selectedInstance = instance;
    this.storageService.savePermanentData(instance, 'instance');
    this.centralAuthFacade.setSelectedInstance(instance);
  }

  toggleTooltip(siteId: number): void {
    this.tooltipState[siteId] = !this.tooltipState[siteId];
  }
}
