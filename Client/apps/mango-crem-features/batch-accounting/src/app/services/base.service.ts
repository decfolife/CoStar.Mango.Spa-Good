import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';


@Injectable({ providedIn: 'root' })
export class BaseService extends EndpointService {
  batchAccountingUrl: string = UtilitiesService.getBaseApiUrl(Api.batchAccounting)
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

  getUserRights() {
    const url = `${this.batchAccountingUrl}/Base/GetUserRights`;
    return this.callHttpGet(url, 'getUserRights')
  }

  getPortfolios() {
    const url = `${this.batchAccountingUrl}/Base/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolios')
  }
}
