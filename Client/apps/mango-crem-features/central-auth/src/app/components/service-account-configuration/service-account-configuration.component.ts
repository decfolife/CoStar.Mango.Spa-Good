import { Component, OnInit } from '@angular/core';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { ServiceAccountInfo } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { Subscription } from 'rxjs';
import { ServiceAccountChangeHistory } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-service-account-configuration',
  templateUrl: './service-account-configuration.component.html',
  styleUrls: ['./service-account-configuration.component.scss'],
})
export class ServiceAccountConfigurationComponent implements OnInit{
  subs: Subscription[] = []
  public serviceAccountInfo: ServiceAccountInfo;
  public serviceAccountChangeHistories: ServiceAccountChangeHistory[];

  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
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
      this.userService.getServiceAccountInfo()
      .subscribe(result => {        
        if(result){       
            this.serviceAccountInfo = result;   
        }
      })
    )

    this.subs.push(
      this.userService.getServiceAccountChangeHistory()
      .subscribe(result => {        
        if(result){          
            this.serviceAccountChangeHistories = result;      
        }
      })
    )
  }
}
