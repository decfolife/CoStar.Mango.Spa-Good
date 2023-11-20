import { Component, OnInit } from '@angular/core';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { ServiceAccountInfo, ServiceAccountEndpoint, ServiceAccountSite } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { Subscription } from 'rxjs';
import { CentralAuthFacade } from '../../+state/facades';
import { filter, switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'mango-service-account-configuration',
  templateUrl: './service-account-configuration.component.html',
  styleUrls: ['./service-account-configuration.component.scss'],
})
export class ServiceAccountConfigurationComponent implements OnInit{
  public userEmail: string;
  subs: Subscription[] = []
  public servieAccountInfo: ServiceAccountInfo;
  public apiKeyExpiresOn: Date;
  public apiKeyGeneratedDate: Date;
  public serviceAccountSites : ServiceAccountSite[];
  public serviceAccountEndpoints: ServiceAccountEndpoint[];
  public apiKeyExpired: boolean = false;
  public apiKeyInfo: any;

  constructor(
    private userService: UserService,
    private centralAuthFacade: CentralAuthFacade,
    ) { }


    ngOnInit(): void {
      this.centralAuthFacade.user$.subscribe(user => this.userEmail = user.email);  
      this.getServiceAccountInfo();
    }

    ngOnDestroy(): void {
      this.subs.forEach(s => s.unsubscribe())
    }

    serviceAccountUpdated() {
      this.getServiceAccountInfo();
    }
  
    private getServiceAccountInfo() {
      this.subs.push(
        this.userService.getServiceAccountInfo(this.userEmail)
        .subscribe(result => {        
          if(result){          
              this.serviceAccountEndpoints = result.serviceAccountEndpoints; 
              this.serviceAccountSites = result.serviceAccountSites; 
              this.apiKeyInfo = {
                userEmail: this.userEmail,
                apiKeyExpiresOn: result.apiKeyExpiresOn,
                apiKeyGeneratedDate: result.apiKeyGeneratedDate,
                apiKeyStatus: result.apiKeyExpiresOn === null 
                  ? ''
                  : new Date(result.apiKeyExpiresOn ?? '2099-12-31') <= new Date() ? 'Expired' : 'Active'
              };
          }
        })
      )
    } 
}
