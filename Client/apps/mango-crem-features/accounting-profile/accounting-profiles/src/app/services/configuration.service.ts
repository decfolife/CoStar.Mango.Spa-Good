import { Injectable } from '@angular/core';

import { environment } from '../../../../../../mango/src/environments/environment.local';

@Injectable()
export class ConfigurationService {
  static baseUrl(): string {
    if (!environment.isRestful) {
      return document.getElementsByTagName('base')[0].href;
    }

    return environment.appUrls.discountRateProfiles;
  }
}
