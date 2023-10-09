import { Injectable } from '@angular/core';

import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root' })
export class BatchLogsService extends EndpointService {
  userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  getHeartbeat() {
    const url = `${environment.appUrls.batchAccounting}/BatchLogs/Heartbeat`;
    return this.callHttpGet(url, 'getHeartbeat')
  }

  queueForProcessing(batchId: number) {
    const url = `${environment.appUrls.batchAccounting}/BatchConfirmation/QueueProcess/${batchId}`;
    return this.callHttpPost(url, '', {})
  }

  getBatchById(id: number) {
    const url = `${environment.appUrls.batchAccounting}/BatchLogs/GetBatchByID/${id}`;
    return this.callHttpGet(url, 'getBatchById')
  }

  getBatchLogsAndParameters() {
    const url = `${environment.appUrls.batchAccounting}/BatchLogs/GetBatchLogsAndParameters`;
    return this.callHttpGet(url, 'getBatchLogsAndParameters')
  }

  cancelBatch(clientBatchId: number) {
    const cleanUrl = `${environment.appUrls.batchAccounting}/BatchLogs/CancelBatch`;
    const url = cleanUrl + `?clientBatchId=${clientBatchId}`;
    return this.callHttpGet(url, 'cancelBatch')
  }

  reverseBatch(clientBatchId: number) {
    const cleanUrl = `${environment.appUrls.batchAccounting}/BatchLogs/ReverseBatch`;
    const url = cleanUrl + `?clientBatchId=${clientBatchId}`;
    return this.callHttpGet(url, 'reverseBatch')
  }
}
