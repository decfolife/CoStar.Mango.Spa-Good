import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '@mango/core-shared';
import { Subscription } from 'rxjs';
import {UpdateServiceAccountApiAccessRequest} from '@mango/data-models/lib-data-models';
import { ServiceAccountSite } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';

@Component({
  selector: 'mango-service-account-sites',
  templateUrl: './service-account-sites.component.html',
  styleUrls: ['./service-account-sites.component.scss'],
})
export class ServiceAccountSitesComponent {
  @Input() userEmail: string;
  @Input() sites: ServiceAccountSite[];
  @Output() apiAccessUpdated = new EventEmitter<boolean>();

  subs: Subscription[] = []

  constructor(
    private userService: UserService,
  ) { }

  updateApiAccess(e: any, index: number) {
    const request: UpdateServiceAccountApiAccessRequest = {
      email: this.userEmail,
      clientKey: this.sites[index].clientKey,
      apiAccess: e.checked
    };

    this.subs.push(
      this.userService.updateServiceAccountApiAccess(request)
      .subscribe(result => {    
          if(result){        
            this.apiAccessUpdated.emit(result);
        }
      })
    )
  }

}
