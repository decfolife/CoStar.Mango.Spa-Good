import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@mango/core-shared';
import { Subscription } from 'rxjs';
import {UpdateServiceAccountApiAccessRequest} from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-service-account-sites',
  templateUrl: './service-account-sites.component.html',
  styleUrls: ['./service-account-sites.component.scss'],
})
export class ServiceAccountSitesComponent implements OnInit {
  @Input() userEmail: string;
  public sites: any;

  subs: Subscription[] = []

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getSites();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

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
          this.getSites();
        }
      })
    )
  }

  private getSites() {
    this.subs.push(
      this.userService.getServiceAccountSites(this.userEmail)
      .subscribe(result => {        
        if(result){          
            this.sites =  result.serviceAccountSites;      
        }
      })
    )
  }
}
