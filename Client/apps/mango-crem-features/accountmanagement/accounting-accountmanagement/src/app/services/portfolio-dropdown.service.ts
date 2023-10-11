import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDropdownService extends EndpointService {
  public selectedPortfolioId: number;
  public selectedPortfolio: Portfolio;
  public portfolios: Portfolio[];

  getPortfolios() {
    const url = `${environment.appUrls.accounting}/Base/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolios')
  }
}
