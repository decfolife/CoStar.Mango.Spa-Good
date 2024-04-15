import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({ providedIn: 'root' })
export class BatchLogsService extends EndpointService {
  batchAccountingUrl: string = UtilitiesService.getBaseApiUrl(Api.batchAccounting)
  userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  getHeartbeat() {
    const url = `${this.batchAccountingUrl}/BatchLogs/Heartbeat`;
    return this.callHttpGet(url, 'getHeartbeat')
  }

  queueForProcessing(batchId: number) {
    const url = `${this.batchAccountingUrl}/BatchConfirmation/QueueProcess/${batchId}`;
    return this.callHttpPost(url, '', {})
  }

  getBatchById(id: number) {
    const url = `${this.batchAccountingUrl}/BatchLogs/GetBatchByID/${id}`;
    return this.callHttpGet(url, 'getBatchById')
  }

  getBatchLogsAndParameters() {
    const url = `${this.batchAccountingUrl}/BatchLogs/GetBatchLogsAndParameters`;
    return this.callHttpGet(url, 'getBatchLogsAndParameters')
  }

  cancelBatch(clientBatchId: number) {
    const cleanUrl = `${this.batchAccountingUrl}/BatchLogs/CancelBatch`;
    const url = `${cleanUrl}?clientBatchId=${clientBatchId}`;
    return this.callHttpGet(url, 'cancelBatch')
  }

  reverseBatch(clientBatchId: number) {
    const cleanUrl = `${this.batchAccountingUrl}/BatchLogs/ReverseBatch`;
    const url = `${cleanUrl}?clientBatchId=${clientBatchId}`;
    return this.callHttpGet(url, 'reverseBatch')
  }
}
