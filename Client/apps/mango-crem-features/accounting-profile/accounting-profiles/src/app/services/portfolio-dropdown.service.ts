import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Portfolio } from '../models/portfolio.model';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({ providedIn: 'root', })
export class PortfolioDropdownService extends EndpointService {
  discountRateProfiles: string = UtilitiesService.getBaseApiUrl(Api.discountRateProfiles)
  selectedPortfolioId: number;
  selectedPortfolio: Portfolio;
  portfolios: Portfolio[];

  getPortfolios() {
    let url = `${this.discountRateProfiles}/Base/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolios')
  }
}
