import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UpdateServiceAccountApiAccessRequest} from '@mango/data-models/lib-data-models';
import { ServiceAccountSite } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ServiceAccountService } from '../../../services/service-account.service';

@Component({
  standalone: true,
  imports: [MatCardModule, MatSlideToggleModule, CommonModule],
  selector: 'mango-service-account-sites',
  templateUrl: './service-account-sites.component.html',
  styleUrls: ['./service-account-sites.component.scss'],
})
export class ServiceAccountSitesComponent implements OnDestroy {
  @Input() sites: ServiceAccountSite[];
  @Output() apiAccessUpdated = new EventEmitter<boolean>();

  subs: Subscription[] = [];

  constructor(private serviceAccountService: ServiceAccountService) {}

  updateApiAccess(e: any, index: number) {
    const request: UpdateServiceAccountApiAccessRequest = {
      clientKey: this.sites[index].clientKey,
      apiAccess: e.checked
    };

    this.updateServiceAccountApiAccess(request);
  }

  updateApiAccessADA(e: any, index: number) {
    const request: UpdateServiceAccountApiAccessRequest = {
      clientKey: this.sites[index].clientKey,
      apiAccess: !e.srcElement.checked
    };

    this.updateServiceAccountApiAccess(request);
  }

  private updateServiceAccountApiAccess(request : UpdateServiceAccountApiAccessRequest){
    this.subs.push (
      this.serviceAccountService.updateServiceAccountApiAccess(request)
        .subscribe(result => {    
          if(result){        
            this.apiAccessUpdated.emit(result);
          }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
