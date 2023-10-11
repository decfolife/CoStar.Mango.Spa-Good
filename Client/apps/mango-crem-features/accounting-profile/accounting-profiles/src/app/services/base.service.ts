import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root', })
export class BaseService extends EndpointService {

  getUserRights() {
    const url = `${environment.appUrls.discountRateProfiles}/Base/GetUserRights`;

    return this.callHttpGet(url, 'getUserRights')
  }

  getPortfolioSettings(masterGroupID: number){
    const url = `${environment.appUrls.discountRateProfiles}/Base/GetPortfolioSettings/${masterGroupID}`;

    return this.callHttpGet(url, 'getPortfolioSettings')
  }
}
