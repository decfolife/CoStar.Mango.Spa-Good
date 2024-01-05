import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { ServiceAccountInfo } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { ServiceAccountChangeHistory } from '@mango/data-models/lib-data-models';
import { NavbarModule } from '../navbar/navbar.module';
import { CommonModule } from '@angular/common';
import { ServiceAccountApiKeysComponent } from './service-account-api-keys/service-account-api-keys.component';
import { ServiceAccountApiKeyDurationComponent } from './service-account-api-key-duration/service-account-api-key-duration.component';
import { ServiceAccountSitesComponent } from './service-account-sites/service-account-sites.component';
import { ServiceAccountEndpointsComponent } from './service-account-endpoints/service-account-endpoints.component';
import { ServiceAccountHistoryComponent } from './service-account-history/service-account-history.component';

@Component({
  standalone: true,
  imports: [NavbarModule, CommonModule, ServiceAccountApiKeysComponent, ServiceAccountApiKeyDurationComponent, ServiceAccountSitesComponent, ServiceAccountEndpointsComponent, ServiceAccountHistoryComponent],
  selector: 'mango-service-account-configuration',
  templateUrl: './service-account-configuration.component.html',
  styleUrls: ['./service-account-configuration.component.scss'],
})
export class ServiceAccountConfigurationComponent {
  public serviceAccountInfo$: Observable<ServiceAccountInfo>;
  public serviceAccountChangeHistories$: Observable<ServiceAccountChangeHistory[]>;

  constructor(private userService: UserService) {     
      this.getServiceAccountData();
    }

  serviceAccountUpdated() {
    this.getServiceAccountData();
  }

  private getServiceAccountData() {
    this.serviceAccountInfo$ = this.userService.getServiceAccountInfo();
    this.serviceAccountChangeHistories$ = this.userService.getServiceAccountChangeHistory();
  }
}
