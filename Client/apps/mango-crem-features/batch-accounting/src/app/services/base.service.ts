import { Injectable } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({ providedIn: 'root' })
export class BaseService extends EndpointService {
  batchAccountingUrl: string = UtilitiesService.getBaseApiUrl(
    Api.batchAccounting
  );
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights
  public dateFormatWithTime = 'MM/dd/yyyy hh:mm a';
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
  };

  getTimeStamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}${minutes}${seconds}`;
  }

  getUserRights() {
    const url = `${this.batchAccountingUrl}Base/GetUserRights`;
    return this.callHttpGet(url, 'getUserRights');
  }

  getPortfolios() {
    const url = `${this.batchAccountingUrl}Base/GetPortfolios`;
    return this.callHttpGet(url, 'getPortfolios');
  }
}
