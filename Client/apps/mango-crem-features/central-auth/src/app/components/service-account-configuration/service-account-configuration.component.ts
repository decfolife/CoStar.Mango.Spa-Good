import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { ServiceAccountInfo } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { ServiceAccountChangeHistory } from '@mango/data-models/lib-data-models';

@Component({
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
