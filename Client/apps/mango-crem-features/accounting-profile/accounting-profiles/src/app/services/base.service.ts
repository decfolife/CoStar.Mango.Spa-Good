import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root', })
export class BaseService extends EndpointService {
  discountRateProfilesUrl: string = UtilitiesService.getBaseApiUrl(Api.discountRateProfiles)
  
  getUserRights() {
    const url = `${this.discountRateProfilesUrl}/Base/GetUserRights`;

    return this.callHttpGet(url, 'getUserRights')
  }

  getPortfolioSettings(masterGroupID: number){
    const url = `${this.discountRateProfilesUrl}/Base/GetPortfolioSettings/${masterGroupID}`;

    return this.callHttpGet(url, 'getPortfolioSettings')
  }
}
