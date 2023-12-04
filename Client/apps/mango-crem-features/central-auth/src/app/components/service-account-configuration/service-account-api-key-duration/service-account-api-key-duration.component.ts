import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { UserService } from '@mango/core-shared';
import { ServiceAccountInfo, UpdateServiceAccountExpiresInDaysRequest } from '@mango/data-models/lib-data-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-service-account-api-key-duration',
  templateUrl: './service-account-api-key-duration.component.html',
  styleUrls: ['./service-account-api-key-duration.component.scss'],
})
export class ServiceAccountApiKeyDurationComponent{
  @Input() serviceAccountInfo: ServiceAccountInfo;
  @Output() apiKeyExpiresInDaysUpdated = new EventEmitter<boolean>();

  subs: Subscription[] = []

  constructor(
    private userService: UserService,
  ) { }

  saveExpiresInDays(days: string){
    const request: UpdateServiceAccountExpiresInDaysRequest = {
      serviceAccountExpiresInDays: Number(days) === 0 ? null : Number(days)
    };

    this.subs.push(
      this.userService.updateServiceAccountExpiresInDays(request)
      .subscribe(result => {    
          if(result){        
            this.apiKeyExpiresInDaysUpdated.emit(result);
        }
      })
    )
  }
}
