import { Injectable } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Portfolio } from '../models/portfolio.model';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDropdownService extends EndpointService {
  accounting: string = UtilitiesService.getBaseApiUrl(Api.accounting);
  public selectedPortfolioId: number;
  public selectedPortfolio: Portfolio;
  public portfolios: Portfolio[];

  getPortfolios() {
    const url = `${this.accounting}Base/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolios');
  }
}
