import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../../mango/src/environments/environment.local';
import { PortfolioSettings } from '../models/portfolio-settings.model';
import { EndpointService } from '../services/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class AccountingSettingsService extends EndpointService {

  portfolioSettings: PortfolioSettings;
  originalSettings: PortfolioSettings; // Used for change tracking
  isCalendarInUse: boolean;
	measureEventsChanged: boolean;

  private getAccountManagementUrl(): string {
    if (environment.isRestful) {
      return environment.appUrls.accounting + 'AccountManagement';
    }
    return `${this.rootUrl}`;
  }

  getPortfolioSettings(masterGroupId: number) {
    if (environment.isRestful) {
      const url = `${this.getAccountManagementUrl()}/GetPortfolioSettings/${masterGroupId}`;
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getPortfolioSettings')),
        );
    }

    const url = `${this.getAccountManagementUrl()}/GetPortfolioSettings`;
    return this.http.post(url, { masterGroupId })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getPortfolioSettings')),
      );
  }

  getAccountingCalendars() {
    if (environment.isRestful) {
      const url = `${this.getAccountManagementUrl()}/GetAccountingCalendars`;
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getAccountingCalendars')),
        );
    }

    const url = `${this.getAccountManagementUrl()}/GetAccountingCalendars`;
    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getAccountingCalendars')),
      );
  }

  getClassificationTypes() {
    if (environment.isRestful) {
      const url = `${this.getAccountManagementUrl()}/GetClassificationTypes`;
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getClassificationTypes')),
        );
    }

    const url = `${this.getAccountManagementUrl()}/GetClassificationTypes`;
    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getClassificationTypes')),
      );
  }

  savePortfolioSettingsConfiguration(configurations) {
    if (environment.isRestful) {
      const url = `${this.getAccountManagementUrl()}/SavePortfolioSettingsConfiguration`;
      return this.http.post<number>(url, configurations, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('savePortfolioSettingsConfiguration')),
        );
    }

    const url = `${this.getAccountManagementUrl()}/SavePortfolioSettingsConfiguration`;
    return this.http.post(url, { configurations })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('savePortfolioSettingsConfiguration')),
      );
  }

  savePortfolioSettings(settings) {
    if (environment.isRestful) {
      const url = `${this.getAccountManagementUrl()}/SavePortfolioSettings`;
      return this.http.post<number>(url, settings, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('SavePortfolioSettings')),
        );
    }

    const url = `${this.getAccountManagementUrl()}/SavePortfolioSettings`;
    return this.http.post(url, { settings })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('SavePortfolioSettings')),
      );
  }

}
