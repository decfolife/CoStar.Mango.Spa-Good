import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@mango/core-shared';
import { Subscription } from 'rxjs';

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

  toggleSite(e: any, index: number) {
    console.log(e.checked);
    console.log(index);
  }

  private getSites() {
    this.subs.push(
      this.userService.getServiceAccountSites(this.userEmail)
      // this.userService.getClientSitesByUser(this.userEmail)
      .subscribe(result => {        
        if(result){          
            this.sites =  result;      
        }
      })
    )
  }
}
