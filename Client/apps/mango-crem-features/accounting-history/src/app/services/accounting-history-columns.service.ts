import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountingHistoryColumnsService {
  constructor() {}

  getAccountingHistoryColumns(dateFormat: string) {
    const columns = [
      {
        caption: 'History Type',
        name: 'GroupBy',
        dataField: 'groupBy',
        groupIndex: '0',
      },
      {
        caption: 'Action',
        name: 'Action',
        dataField: 'action',
      },
      {
        caption: 'Display Name',
        name: 'DisplayName',
        dataField: 'displayName',
      },
      {
        caption: 'Before Change',
        name: 'BeforeChange',
        dataField: 'beforeChange',
      },
      {
        caption: 'After Change',
        name: 'AfterChange',
        dataField: 'afterChange',
      },
      {
        caption: 'Description',
        name: 'Description',
        dataField: 'description',
      },
      {
        caption: 'Last Modified',
        name: 'LastModified',
        dataField: 'lastModified',
        dataType: 'date',
        format: dateFormat,
        sortIndex: '0',
        sortOrder: 'desc',
      },
      {
        caption: 'Last Modified By',
        name: 'LastModifiedBy',
        dataField: 'lastModifiedBy',
      },
    ];
    return columns;
  }
}
