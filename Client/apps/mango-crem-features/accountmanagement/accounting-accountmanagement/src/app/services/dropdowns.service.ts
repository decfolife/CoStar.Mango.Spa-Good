import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService extends EndpointService {
  accountingUrl: string = UtilitiesService.getBaseApiUrl(Api.accounting)
  classificationConfiguration = [];

  getPortfolioClassificationConfigurationOptions(masterGroupId: Number) {
    const url = `${this.accountingUrl}/AccountManagement/GetPortfolioClassificationConfigurationOptions/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioClassificationConfigurationOptions')
  }

  getPortfolioClassificationConfiguration(masterGroupId: Number) {
    const url = `${this.accountingUrl}/AccountManagement/GetPortfolioClassificationConfiguration/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioClassificationConfiguration')
  }
}
