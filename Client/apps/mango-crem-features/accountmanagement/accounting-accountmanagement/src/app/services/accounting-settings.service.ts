import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { PortfolioSettings } from '../models/portfolio-settings.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingSettingsService extends EndpointService {

  portfolioSettings: PortfolioSettings;
  originalSettings: PortfolioSettings; // Used for change tracking
  isCalendarInUse: boolean;
  measureEventsChanged: boolean;

  getPortfolioSettings(masterGroupId: number) {
    const url = `${environment.appUrls.accounting}/AccountManagement/GetPortfolioSettings/${masterGroupId}`;
    return this.callHttpGet(url, 'getPortfolioSettings')
  }

  getAccountingCalendars() {
    const url = `${environment.appUrls.accounting}/AccountManagement/GetAccountingCalendars`;
    return this.callHttpGet(url, 'getAccountingCalendars')
  }

  getClassificationTypes() {
    const url = `${environment.appUrls.accounting}/AccountManagement/GetClassificationTypes`;
    return this.callHttpGet(url, 'getClassificationTypes')
  }

  savePortfolioSettingsConfiguration(configurations) {
    const url = `${environment.appUrls.accounting}/AccountManagement/SavePortfolioSettingsConfiguration`;
    return this.callHttpPost(url, 'savePortfolioSettingsConfiguration', configurations)
  }

  savePortfolioSettings(settings) {
    const url = `${environment.appUrls.accounting}/AccountManagement/SavePortfolioSettings`;
    return this.callHttpPost(url, 'savePortfolioSettings', settings)
  }
}
