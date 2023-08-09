/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';
import { GetGridDataRequest } from '../shared/models/get-grid-data-request';
import { AccountingBatch } from '../shared/models/accounting-batch.model';

@Injectable({ providedIn: 'root' })
export class BatchEventListService extends EndpointService {
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  private listPageUrl = 'http://service2.dev.corp.virtualpremise.com:8090/ListPages/api/ListPage/';

  private getBatchEventListUrl(): string {
    const url = this.rootUrl;

    if (environment.name.toString() !== 'LOCAL') {
      if (!environment.isRestful) {
          return url.toLocaleLowerCase().replace('/api', '');
      }
    }

    return `${url}/BatchEventList`;
  }

  private getBatchConfirmationUrl(): string {
    const url = this.rootUrl;

    if (environment.name.toString() !== 'LOCAL') {
      if (!environment.isRestful) {
          return url.toLocaleLowerCase().replace('/api', '');
      }
    }

    return `${url}/BatchConfirmation`;
  }

  getWorkflowStatuses() {
    const url = `${this.getBatchEventListUrl()}/GetWorkflowStatuses`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('GetWorkflowStatuses')),
      );
    }

    return this.http.post(url, {}).pipe(
      map(this.responseToObject),
      catchError(this.handleError('GetWorkflowStatuses')),
    );
  }

  getListViews() {
    const url = `${this.getBatchEventListUrl()}/GetListViews`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(`${this.listPageUrl}DataSetSelectorItems`, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('GetListViews')),
      );
    }

    return this.http.post(url, {}).pipe(
      map(this.responseToObject),
      catchError(this.handleError('GetListViews')),
    );
  }

  getDynamicSQL(request: GetGridDataRequest) {
    const url = `${this.getBatchEventListUrl()}/GetDynamicSQL`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.post(`${this.listPageUrl}dynamicSQL`, request, this.httpOptions).pipe(
        map(x => ({ success: true, data: x } as any)),
        catchError(this.handleError('GetDynamicSQL')),
      );
    }

    return this.http.post(url, `{ "request": ${JSON.stringify(request)} }`, this.httpOptions).pipe(
      map(x => ({ success: true, data: (x as any).d } as any)),
      catchError(this.handleError('GetDynamicSQL')),
    );
  }

  getColumnDefinitionList(listPageId: number) {
    const url = `${this.getBatchEventListUrl()}/GetColumnDefinitionList`;
    const listPageUrl = `${this.listPageUrl}${listPageId.toString()}/ColumnDefinitionList`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(listPageUrl, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('GetColumnDefinitionList')),
      );
    }

    return this.http.post(url, { listPageId }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('GetColumnDefinitionList')),
    );
  }

  getGridData(gridDataRequest: GetGridDataRequest) {
    const url = `${this.getBatchEventListUrl()}/GetGridData`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.post(`${this.listPageUrl}GridData`, gridDataRequest, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('GetGridData')),
      );
    }

    return this.http.post(url, { gridDataRequest }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('GetGridData')),
    );
  }

  queueBatch(clientBatch: AccountingBatch) {
    const url = `${this.getBatchConfirmationUrl()}/QueueBatch`;

      if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.post(url, clientBatch, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('QueueBatch')),
      );
    }

    return this.http.post(url, { clientBatch }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('QueueBatch')),
    );
  }
}
