import { Injectable } from '@angular/core';

import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  public baseUrl = environment.appUrls.batchAccounting ||
    document.getElementsByTagName('base')[0].href;
}
