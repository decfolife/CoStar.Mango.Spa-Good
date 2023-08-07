import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';
import { ExchangeRateSetDataRequest } from './exchange-rate-sets.model';

@Injectable()
export class ExchangeRateSetsService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getPeriodList(masterGroupId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetPeriodList/${masterGroupId}`;
      return this.callHttpGet(url, 'getPeriodList')
    }
    const url = `${environment.appUrls.reports}GetPeriodList`;
    return this.callHttpPost(url, 'getPeriodList', { masterGroupId })
  }

  getExchangeRateSetData(masterGroupId: number, selectedPeriods: number[]): Observable<any> {
    const request: ExchangeRateSetDataRequest = { portfolioId: masterGroupId, periods: selectedPeriods.toString() }
    if (environment.isRestful) {
      const url = `${environment.appUrls.reports}Reports/GetExchangeRateSetData`;
      return this.callHttpPost(url, 'getExchangeRateSetData', request);
    }
    const url = `${environment.appUrls.reports}GetExchangeRateSetData`;
    return this.callHttpPost(url, 'getExchangeRateSetData', { request });
  }

}

