import { Component, Input, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ServiceAccountEndpoint } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ServiceAccountService } from '../../../services/service-account.service';
import { UpdateServiceAccountEndPointAccessRequest } from '@mango/data-models/lib-data-models';

@Component({
  standalone: true,
  imports: [MatCardModule, MatSlideToggleModule, CommonModule],
  selector: 'mango-service-account-endpoints',
  templateUrl: './service-account-endpoints.component.html',
  styleUrls: ['./service-account-endpoints.component.scss'],
})
export class ServiceAccountEndpointsComponent implements OnDestroy {
  @Input() endpoints: ServiceAccountEndpoint[];
  @Output() endPointAccessUpdated = new EventEmitter<boolean>();

  subs: Subscription[] = [];

  constructor(private serviceAccountService: ServiceAccountService) {}

  ngOnInit() {
    this.endpoints.forEach(element => {
      if(element.endpoint != 'Projects' && element.endpoint != 'Portfolio'){
        element.isCommingSoon = true;
      }
    });
  }

  updateEndPointAccess(e:any, index: number){
    const request: UpdateServiceAccountEndPointAccessRequest = {
      endPoint : this.endpoints[index].endpoint,
      endPointAccess : e.checked
    };
    this.updateServiceAccountEndPointAccess(request);
  }

  updateEndPointAccessADA(e: any, index: number) {
    const request: UpdateServiceAccountEndPointAccessRequest = {
      endPoint : this.endpoints[index].endpoint,
      endPointAccess : !e.srcElement.checked
    };
    this.updateServiceAccountEndPointAccess(request);
  }

  private updateServiceAccountEndPointAccess(request: UpdateServiceAccountEndPointAccessRequest) {
    this.subs.push(
      this.serviceAccountService.updateServiceAccountEndPointAccess(request)
      .subscribe(result => {
        if(result) {
          this.endPointAccessUpdated.emit(result);
        }
      })
    );
  }

  ngOnDestroy(): void {
      this.subs.forEach(s=>s.unsubscribe())
  }
}

