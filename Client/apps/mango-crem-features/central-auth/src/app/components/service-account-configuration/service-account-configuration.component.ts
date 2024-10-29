import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceAccountInfo } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { ServiceAccountChangeHistory } from '@mango/data-models/lib-data-models';
import { NavbarModule } from '../navbar/navbar.module';
import { CommonModule } from '@angular/common';
import { ServiceAccountApiKeysComponent } from './service-account-api-keys/service-account-api-keys.component';
import { ServiceAccountApiKeyDurationComponent } from './service-account-api-key-duration/service-account-api-key-duration.component';
import { ServiceAccountSitesComponent } from './service-account-sites/service-account-sites.component';
import { ServiceAccountEndpointsComponent } from './service-account-endpoints/service-account-endpoints.component';
import { ServiceAccountHistoryComponent } from './service-account-history/service-account-history.component';
import { ServiceAccountService } from '../../services/service-account.service';

@Component({
  standalone: true,
  imports: [
    NavbarModule,
    CommonModule,
    ServiceAccountApiKeysComponent,
    ServiceAccountApiKeyDurationComponent,
    ServiceAccountSitesComponent,
    ServiceAccountEndpointsComponent,
    ServiceAccountHistoryComponent,
  ],
  selector: 'mango-service-account-configuration',
  templateUrl: './service-account-configuration.component.html',
  styleUrls: ['./service-account-configuration.component.scss'],
})
export class ServiceAccountConfigurationComponent {
  public serviceAccountInfo$: Observable<ServiceAccountInfo>;
  public serviceAccountChangeHistories$: Observable<
    ServiceAccountChangeHistory[]
  >;

  constructor(private serviceAccountService: ServiceAccountService) {
    this.getServiceAccountData();
  }

  serviceAccountUpdated() {
    this.getServiceAccountData();
  }

  private getServiceAccountData() {
    this.serviceAccountInfo$ =
      this.serviceAccountService.getServiceAccountInfo();
    this.serviceAccountChangeHistories$ =
      this.serviceAccountService.getServiceAccountChangeHistory();
  }
}
