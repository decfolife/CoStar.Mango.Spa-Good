import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { AccountingBatch } from '../shared/models/accounting-batch.model';
import { GetGridDataRequest } from '../shared/models/get-grid-data-request';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({ providedIn: 'root' })
export class BatchEventListService extends EndpointService {
  batchAccountingUrl: string = UtilitiesService.getBaseApiUrl(Api.batchAccounting)
  listpagesUrl: string = UtilitiesService.getBaseApiUrl(Api.listpages)
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  getWorkflowStatuses() {
    const url = `${this.batchAccountingUrl}/BatchEventList/GetWorkflowStatuses`;
    return this.callHttpGet(url, 'getWorkflowStatuses')
  }

  getListViews() {
    const url = `${this.listpagesUrl}listpage/DataSetSelectorItems`
    return this.callHttpGet(url, 'getListViews')
  }

  getDynamicSQL(request: GetGridDataRequest) {
    const url = `${this.listpagesUrl}listpage/dynamicSQL`
    return this.callHttpPost(url, 'getListViews', request)
  }

  getColumnDefinitionList(listPageId: number) {
    const url = `${this.listpagesUrl}listpage/${listPageId}/ColumnDefinitionList`
    return this.callHttpGet(url, 'getColumnDefinitionList')
  }

  getGridData(gridDataRequest: GetGridDataRequest) {
    const url = `${this.listpagesUrl}listpage/GridData`
    return this.callHttpPost(url, 'getGridData', gridDataRequest)
  }

  queueBatch(clientBatch: AccountingBatch) {
    const url = `${this.batchAccountingUrl}/BatchConfirmation/QueueBatch`;
    return this.callHttpPost(url, 'queueBatch', clientBatch)
  }
}
