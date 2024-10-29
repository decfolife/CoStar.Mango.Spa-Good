import { Injectable } from '@angular/core';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class ConfigurationService {
  static baseUrl(): string {
    return UtilitiesService.getBaseApiUrl(Api.discountRateProfiles);
  }
}
