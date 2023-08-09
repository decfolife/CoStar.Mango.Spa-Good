import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { environment } from '@mangoSpa/src/environments/environment.local';
import { EndpointService } from '../services/endpoint.service';

@Injectable({ providedIn: 'root' })
export class BatchParametersService extends EndpointService {

  getRemeasureTypes() {
    if (environment.name === 'LOCAL' || environment.isRestful) {
      const url = `${this.getBatchParamsUrl()}/GetRemeasureTypes`;

      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('getRemeasureTypes')),
      );
    }

    const url = `${this.getBatchParamsUrl()}/GetRemeasureTypes`;

    return this.http.post(url, {}).pipe(
      map(this.responseToObject),
      catchError(this.handleError('getRemeasureTypes')),
    );
  }

  getPortfolioClassificationConfiguration(masterGroupId: number) {
    const url = `${this.getBatchParamsUrl()}/GetPortfolioClassificationConfiguration`;
    const AccountManagementUrl = `${this.getAcctMgmtUrl()}/GetPortfolioClassificationConfiguration/${masterGroupId}`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(AccountManagementUrl, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('GetPortfolioClassificationConfiguration')),
      );
    }

    return this.http.post(url, { masterGroupId }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('GetPortfolioClassificationConfiguration')),
    );
  }

  getPortfolioClassificationConfigurationOptions(masterGroupId: number) {
    const url = `${this.getBatchParamsUrl()}/GetPortfolioClassificationConfigurationOptions`;
    const AccountManagementUrl =`${this.getAcctMgmtUrl()}/GetPortfolioClassificationConfigurationOptions/${masterGroupId}`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(AccountManagementUrl, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('GetPortfolioClassificationConfigurationOptions')),
      );
    }

    return this.http.post(url, { masterGroupId }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('GetPortfolioClassificationConfigurationOptions')),
    );
  }

  getPortfolioSettings(masterGroupId: number) {
    const url = `${this.getBatchParamsUrl()}/GetPortfolioSettings`;
    const AccountManagementUrl = `${this.getAcctMgmtUrl()}/GetPortfolioSettings/${masterGroupId}`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(AccountManagementUrl, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('GetPortfolioSettings')),
      );
    }

    return this.http.post(url, { masterGroupId }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('GetPortfolioSettings')),
    );
  }

  private getAcctMgmtUrl(): string {
    if (environment.name.toString() !== 'LOCAL') {
      return this.rootUrl.toLocaleLowerCase().replace('/api', '');
    }

    return `${this.rootUrl.replace('45381', '57541')}/AccountManagement`;
  }

  private getBatchParamsUrl(): string {
    const url = this.rootUrl;

    if (environment.name.toString() !== 'LOCAL') {
      if (!environment.isRestful) {
          return url.toLocaleLowerCase().replace('/api', '');
      }
    }

    return `${url}/BatchParameters`;
  }

}
