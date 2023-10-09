import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService extends EndpointService {

  classificationConfiguration = [];

  getPortfolioClassificationConfigurationOptions(masterGroupId: Number) {
    const url = `${environment.appUrls.accounting}/AccountManagement/GetPortfolioClassificationConfigurationOptions/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioClassificationConfigurationOptions')
  }

  getPortfolioClassificationConfiguration(masterGroupId: Number) {
    const url = `${environment.appUrls.accounting}/AccountManagement/GetPortfolioClassificationConfiguration/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioClassificationConfiguration')
  }
}
