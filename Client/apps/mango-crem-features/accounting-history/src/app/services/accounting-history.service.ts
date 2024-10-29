import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '../../../../../../libs/core-shared/src';
import { Api } from '../../../../../../libs/data-models/lib-data-models/src';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
  providedIn: 'root',
})
export class AccountingHistoryService extends EndpointService {
  private apiUrl: string;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.history);
  }

  getUserPreferences() {
    return this.callHttpGet(
      `${this.apiUrl}History/GetUserPreferences`,
      'getUserPreferences'
    );
  }

  getUserPortfolios() {
    return this.callHttpGet(
      `${this.apiUrl}AccountingHistory/GetUserPortfolios`,
      'getUserPortfolios'
    );
  }

  getAccountingHistory(PortfolioId: number) {
    return this.callHttpGet(
      `${this.apiUrl}AccountingHistory/GetAccountingHistory/Portfolio/${PortfolioId}`,
      'getAccountingHistory'
    );
  }
}
