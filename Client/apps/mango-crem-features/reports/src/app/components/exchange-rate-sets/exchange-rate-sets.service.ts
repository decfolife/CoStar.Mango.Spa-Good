import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { ExchangeRateSetDataRequest } from './exchange-rate-sets.model';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class ExchangeRateSetsService extends EndpointService {
  reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports);

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getPeriodList(masterGroupId: number): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetPeriodList/${masterGroupId}`;
    return this.callHttpGet(url, 'getPeriodList');
  }

  getExchangeRateSetData(
    masterGroupId: number,
    selectedPeriods: number[]
  ): Observable<any> {
    const request: ExchangeRateSetDataRequest = {
      portfolioId: masterGroupId,
      periods: selectedPeriods.toString(),
    };
    const url = `${this.reportsUrl}Reports/GetExchangeRateSetData`;
    return this.callHttpPost(url, 'getExchangeRateSetData', request);
  }
}
