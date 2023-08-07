import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../services/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService extends EndpointService {
  
  classificationConfiguration = [];

  private getDropdownsUrl(): string {
    if (environment.isRestful) {
      return environment.appUrls.accounting + 'AccountManagement';
    }
    return `${this.rootUrl}`;
  }

  getPortfolioClassificationConfigurationOptions(masterGroupId: Number) {
    if (environment.isRestful) {
      const url = `${this.getDropdownsUrl()}/GetPortfolioClassificationConfigurationOptions/${masterGroupId}`;
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getPortfolioClassificationConfigurationOptions')),
        );
    }
    
    const url = `${this.getDropdownsUrl()}/GetPortfolioClassificationConfigurationOptions`;
    return this.http.post(url, { masterGroupId })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getPortfolioClassificationConfigurationOptions')),
      );
  }

  getPortfolioClassificationConfiguration(masterGroupId: Number) {
    if (environment.isRestful) {
      const url = `${this.getDropdownsUrl()}/GetPortfolioClassificationConfiguration/${masterGroupId}`;
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getPortfolioClassificationConfiguration')),
        );
    }

    const url = `${this.getDropdownsUrl()}/GetPortfolioClassificationConfiguration`;
    return this.http.post(url, { masterGroupId })
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getPortfolioClassificationConfiguration')),
      );
  }
}
