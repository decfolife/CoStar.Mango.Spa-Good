import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
  providedIn: 'root',
})
export class ExportHistoryService extends EndpointService {
  private apiUrl: string;

  constructor(protected http: HttpClient, facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.financials);
  }

  getLedgerExportHistoryByType(integrationType: string) {
    return this.callHttpGet(
      `${this.apiUrl}ledgers/exporthistory?integrationType=${integrationType}`,
      'GetLedgerExportHistoryByType'
    );
  }
}
