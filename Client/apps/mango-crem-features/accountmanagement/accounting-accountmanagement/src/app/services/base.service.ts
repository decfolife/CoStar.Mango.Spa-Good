import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class BaseService extends EndpointService {
  accountingUrl: string = UtilitiesService.getBaseApiUrl(Api.accounting)
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights
  
  getUserRights() {
      const url = `${this.accountingUrl}/Base/GetUserRights`;
      return this.callHttpGet(url, 'getUserRights')
  }
}
