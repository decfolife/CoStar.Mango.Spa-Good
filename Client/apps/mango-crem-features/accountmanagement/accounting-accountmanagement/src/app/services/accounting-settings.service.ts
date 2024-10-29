import { Injectable } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { PortfolioSettings } from '../models/portfolio-settings.model';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root',
})
export class AccountingSettingsService extends EndpointService {
  accountingUrl: string = UtilitiesService.getBaseApiUrl(Api.accounting);
  portfolioSettings: PortfolioSettings;
  originalSettings: PortfolioSettings; // Used for change tracking
  isCalendarInUse: boolean;
  measureEventsChanged: boolean;

  getPortfolioSettings(masterGroupId: number) {
    const url = `${this.accountingUrl}/AccountManagement/GetPortfolioSettings/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioSettings');
  }

  getAccountingCalendars() {
    const url = `${this.accountingUrl}/AccountManagement/GetAccountingCalendars`;
    return this.callHttpGet(url, 'getAccountingCalendars');
  }

  getClassificationTypes() {
    const url = `${this.accountingUrl}/AccountManagement/GetClassificationTypes`;
    return this.callHttpGet(url, 'getClassificationTypes');
  }

  savePortfolioSettingsConfiguration(configurations) {
    const url = `${this.accountingUrl}/AccountManagement/SavePortfolioSettingsConfiguration`;
    return this.callHttpPost(
      url,
      'savePortfolioSettingsConfiguration',
      configurations
    );
  }

  savePortfolioSettings(settings) {
    const url = `${this.accountingUrl}/AccountManagement/SavePortfolioSettings`;
    return this.callHttpPost(url, 'savePortfolioSettings', settings);
  }
}
