import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { environment } from '@mangoSpa/src/environments/environment.local';
import { EndpointService } from './endpoint.service';

@Injectable({ providedIn: 'root' })
export class BaseService extends EndpointService {
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  public dateFormatWithTime = 'MM/dd/yyyy hh:mm a'
  public dateFormat = 'MM/dd/yyyy';

  public dateFormatter = {
    type: 'MM/dd/yyyy',
    parser: function (dateString: string): Date {
      if (dateString.includes('.')) {
        const dateArray = dateString.split('.', 3);
        dateString = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
      }
      return new Date(dateString);
    },
  };

  public filterFormatter = (date: Date): string => {
    const isoDateParts = date.toISOString().slice(0, 10).split('-');
    const Year = 0;
    const Month = 1;
    const Day = 2;

    if (this.dateFormat.indexOf('/') > -1) {
      return `${isoDateParts[Year]}/${isoDateParts[Month]}/${isoDateParts[Day]}`;
    }

    return `${isoDateParts[Year]}.${isoDateParts[Day]}.${isoDateParts[Month]}`;
  }

  private getBaseUrl(): string {
    const url = this.rootUrl;

    if (environment.name.toString() !== 'LOCAL') {
      if (!environment.isRestful){
        return url.toLocaleLowerCase().replace('/api', '');
      }
    }

    return `${url}/Base`;
  }

  getUserRights() {
    if (environment.name === 'LOCAL' || environment.isRestful) {
      const url = `${this.getBaseUrl()}/GetUserRights`;

      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('getUserRights')),
      );
    }

    const url = `${this.getBaseUrl()}/GetUserRights`;

    return this.http.post(url, {}).pipe(
      map(this.responseToObject),
      catchError(this.handleError('getUserRights')),
    );
  }

  getPortfolios() {
    const url = `${this.getBaseUrl()}/GetPortfolios`;

    if (environment.name.toString() === 'LOCAL') {
      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('getPortfolios')),
      );
    }

    return this.http.post(url, {}).pipe(
      map(this.responseToObject),
      catchError(this.handleError('getPortfolios')),
    );
  }
}
