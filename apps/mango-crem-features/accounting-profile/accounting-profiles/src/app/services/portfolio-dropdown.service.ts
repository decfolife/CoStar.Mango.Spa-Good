import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { EndpointService } from '../services/endpoint.service';
import { Portfolio } from '../models/portfolio.model';
import { environment } from '../../../../../../mango/src/environments/environment.local';

@Injectable({ providedIn: 'root', })
export class PortfolioDropdownService extends EndpointService {
  selectedPortfolioId: number;
  selectedPortfolio: Portfolio;
  portfolios: Portfolio[];

  private getPortfolioDropdownUrl(): string {
    return this.rootUrl();
  }

  getPortfolios() {
    let url = `${this.getPortfolioDropdownUrl()}`;
    if (environment.isRestful) {
      url += 'base/GetPortfolios'
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getPortfolios')),
        );
    }
    url += '/GetPortfolios'
    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getPortfolios')),
      );
  }
}
