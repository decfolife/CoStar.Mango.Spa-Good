import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';

@Component({
  selector: 'mango-service-account-configuration',
  templateUrl: './service-account-configuration.component.html',
  styleUrls: ['./service-account-configuration.component.scss'],
})
export class ServiceAccountConfigurationComponent {
  
  userEmail$ = this.centralAuthFacade.user$.pipe(filter(user => !!user), map(user => user.email))

  constructor(
    private centralAuthFacade: CentralAuthFacade,
  ) { }
}
