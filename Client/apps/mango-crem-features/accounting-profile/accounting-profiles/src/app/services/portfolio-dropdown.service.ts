import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Portfolio } from '../models/portfolio.model';

@Injectable({ providedIn: 'root', })
export class PortfolioDropdownService extends EndpointService {
  selectedPortfolioId: number;
  selectedPortfolio: Portfolio;
  portfolios: Portfolio[];

  getPortfolios() {
    let url = `${environment.appUrls.discountRateProfiles}/Base/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolios')
  }
}
