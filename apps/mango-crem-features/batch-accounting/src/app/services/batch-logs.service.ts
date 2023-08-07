import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';

import { environment } from '@mangoSpa/src/environments/environment.local';
import { EndpointService } from '../services/endpoint.service';

@Injectable({ providedIn: 'root' })
export class BatchLogsService extends EndpointService  {
  userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  private getBatchLogsUrl(): string {
    const url = this.rootUrl;

    if (environment.name.toString() !== 'LOCAL') {
      if (!environment.isRestful) {
          return url.toLocaleLowerCase().replace('/api', '');
      }
    }

    return `${url}/BatchLogs`;
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

  getHeartbeat() {
    const url = `${this.getBatchLogsUrl()}/Heartbeat`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('getHeartbeat')),
      );
    }

    return this.http.post(url, {}, this.httpOptions).pipe(
      map(this.responseToObject),
      catchError(this.handleError('getHeartbeat')),
    );
  }

  queueForProcessing(batchId: number) {
    const url = `${this.getBatchConfirmationUrl()}/QueueProcess`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.post(`${url}/${batchId}`, {}, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('queueProcess')),
      );
    }

    return this.http.post(url, { batchId }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('queueProcess')),
    );
  }

  getBatchById(id: number) {
    if (environment.name === 'LOCAL' || environment.isRestful) {
      const url = `${this.getBatchLogsUrl()}/GetBatchByID/${id}`;

      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('getBatchById')),
      );
    }

    const url = `${this.getBatchLogsUrl()}/GetBatchById`;

    return this.http.post(url, { id }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('getBatchById')),
    );
  }

  getBatchLogsAndParameters() {
    if (environment.name === 'LOCAL' || environment.isRestful) {
      const url = `${this.getBatchLogsUrl()}/GetBatchLogsAndParameters`;

      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('getBatchLogsAndParameters')),
      );
    }

    const url = `${this.getBatchLogsUrl()}/GetBatchLogsAndParameters`;

    return this.http.post(url, {}).pipe(
      map(this.responseToObject),
      catchError(this.handleError('getBatchLogsAndParameters')),
    );
  }

  cancelBatch(clientBatchId: number) {
    const cleanUrl = `${this.getBatchLogsUrl()}/CancelBatch`;
    const url = cleanUrl + `?clientBatchId=${clientBatchId}`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('CancelBatch')),
      );
    }

    return this.http.post(cleanUrl, { clientBatchId }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('CancelBatch')),
    );
  }

  reverseBatch(clientBatchId: number) {
    const cleanUrl = `${this.getBatchLogsUrl()}/ReverseBatch`;
    const url = cleanUrl + `?clientBatchId=${clientBatchId}`;

    if (environment.name === 'LOCAL' || environment.isRestful) {
      return this.http.get(url, this.httpOptions).pipe(
        map(this.responseToObject),
        catchError(this.handleError('ReverseBatch')),
      );
    }

    return this.http.post(cleanUrl, { clientBatchId }).pipe(
      map(this.responseToObject),
      catchError(this.handleError('ReverseBatch')),
    );
  }
}
