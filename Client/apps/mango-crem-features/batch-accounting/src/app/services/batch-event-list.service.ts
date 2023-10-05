import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { AccountingBatch } from '../shared/models/accounting-batch.model';
import { GetGridDataRequest } from '../shared/models/get-grid-data-request';

@Injectable({ providedIn: 'root' })
export class BatchEventListService extends EndpointService {
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  getWorkflowStatuses() {
    const url = `${environment.appUrls.batchAccounting}/BatchEventList/GetWorkflowStatuses`;
    return this.callHttpGet(url, 'getWorkflowStatuses')
  }

  getListViews() {
    const url = `${environment.appUrls.listpages}DataSetSelectorItems`
    return this.callHttpGet(url, 'getListViews')
  }

  getDynamicSQL(request: GetGridDataRequest) {
    const url = `${environment.appUrls.listpages}dynamicSQL`
    return this.callHttpPost(url, 'getListViews', request)
  }

  getColumnDefinitionList(listPageId: number) {
    const url = `${environment.appUrls.listpages}${listPageId.toString()}/ColumnDefinitionList`
    return this.callHttpGet(url, 'getColumnDefinitionList')
  }

  getGridData(gridDataRequest: GetGridDataRequest) {
    const url = `${environment.appUrls.listpages}GridData`
    return this.callHttpPost(url, 'getGridData', gridDataRequest)
  }

  queueBatch(clientBatch: AccountingBatch) {
    const url = `${environment.appUrls.batchAccounting}/BatchConfirmation/QueueBatch`;
    return this.callHttpPost(url, 'queueBatch', clientBatch)
  }
}
