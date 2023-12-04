import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { ExchangeRateSetDataRequest } from './exchange-rate-sets.model';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class ExchangeRateSetsService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getPeriodList(masterGroupId: number): Observable<any> {
    const url = `${environment.appUrls.reports}Reports/GetPeriodList/${masterGroupId}`;
    return this.callHttpGet(url, 'getPeriodList')
  }

  getExchangeRateSetData(masterGroupId: number, selectedPeriods: number[]): Observable<any> {
    const request: ExchangeRateSetDataRequest = { portfolioId: masterGroupId, periods: selectedPeriods.toString() }
    const url = `${environment.appUrls.reports}Reports/GetExchangeRateSetData`;
    return this.callHttpPost(url, 'getExchangeRateSetData', request);
  }
}

