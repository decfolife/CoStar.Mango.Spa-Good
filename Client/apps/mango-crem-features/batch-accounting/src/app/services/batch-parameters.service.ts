import { Injectable } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root' })
export class BatchParametersService extends EndpointService {
  batchAccounting: string = UtilitiesService.getBaseApiUrl(Api.batchAccounting);
  accountManagement: string = UtilitiesService.getBaseApiUrl(Api.accounting);
  getRemeasureTypes() {
    const url = `${this.batchAccounting}BatchParameters/GetRemeasureTypes`;
    return this.callHttpGet(url, 'getRemeasureTypes');
  }

  getPortfolioClassificationConfiguration(masterGroupId: number) {
    const url = `${this.accountManagement}AccountManagement/GetPortfolioClassificationConfiguration/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioClassificationConfiguration');
  }

  getPortfolioClassificationConfigurationOptions(masterGroupId: number) {
    const url = `${this.accountManagement}AccountManagement/GetPortfolioClassificationConfigurationOptions/${masterGroupId}`;
    return this.callHttpGet(
      url,
      'getPortfolioClassificationConfigurationOptions'
    );
  }

  getPortfolioSettings(masterGroupId: number) {
    const url = `${this.accountManagement}AccountManagement/GetPortfolioSettings/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioSettings');
  }
}
