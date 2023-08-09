/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { Portfolio } from '../models/portfolio.model';
import { EndpointService } from '../services/endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioDropdownService extends EndpointService {
  public selectedPortfolioId: number;
  public selectedPortfolio: Portfolio;
  public portfolios: Portfolio[];

  private getPortfolioDropdownUrl(): string {
    if (environment.isRestful) {
      return environment.appUrls.accounting + 'Base';
    }
    return `${this.rootUrl}`;
  }

  getPortfolios() {
    const url = `${this.getPortfolioDropdownUrl()}/GetPortfolios`;
    if (environment.isRestful) {
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getPortfolios')),
        );
    }
    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getPortfolios')),
      );
  }
}
