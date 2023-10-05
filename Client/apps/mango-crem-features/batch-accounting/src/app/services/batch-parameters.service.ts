import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root' })
export class BatchParametersService extends EndpointService {

  getRemeasureTypes() {
    const url = `${environment.appUrls.batchAccounting}/BatchParameters/GetRemeasureTypes`;
    return this.callHttpGet(url, 'getRemeasureTypes')
  }

  getPortfolioClassificationConfiguration(masterGroupId: number) {
    const url = `${environment.appUrls.batchAccounting}/GetPortfolioClassificationConfiguration/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioClassificationConfiguration')
  }

  getPortfolioClassificationConfigurationOptions(masterGroupId: number) {
    const url = `${environment.appUrls.batchAccounting}/GetPortfolioClassificationConfigurationOptions/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioClassificationConfigurationOptions')
  }

  getPortfolioSettings(masterGroupId: number) {
    const url = `${environment.appUrls.batchAccounting}/GetPortfolioSettings/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioSettings')
  }
}
