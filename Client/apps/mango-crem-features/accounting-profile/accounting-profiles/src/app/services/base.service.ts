import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { EndpointService } from '../services/endpoint.service';
import { PortfolioSettings } from '../models/portfolio-settings.model';
import { environment } from '../../../../../../mango/src/environments/environment.local';

@Injectable({ providedIn: 'root', })
export class BaseService extends EndpointService {
  private getBaseUrl(): string {
    if (!environment.isRestful) {
      return document.getElementsByTagName('base')[0].href;
    }

    return `${this.rootUrl()}Base`;
  }

  getUserRights() {
    if (environment.isRestful) {
      const url = `${this.getBaseUrl()}/GetUserRights`;

      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getUserRights')),
        );
    }

    const url = `${this.getBaseUrl()}/GetUserRights`;

    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getUserRights')),
      );
  }

  getPortfolioSettings(masterGroupID: number): Observable<PortfolioSettings> {
    if (environment.isRestful) {
      const url = `${this.getBaseUrl()}/GetPortfolioSettings/${masterGroupID}`;

      return this.http.get<PortfolioSettings>(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getPortfolioSettings')),
        );
    }

    const url = `${this.getBaseUrl()}/GetPortfolioSettings`;

    return this.http.post<PortfolioSettings>(url, { masterGroupID })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getPortfolioSettings')),
      );
  }
}
