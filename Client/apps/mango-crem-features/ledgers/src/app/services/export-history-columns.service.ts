import { Injectable } from '@angular/core';

export type Condition = Condition[] | string | number;

@Injectable({
  providedIn: 'root',
})
export class ExportHistoryColumnsService {
  constructor() {}

  getExportHistoryColumns(dateFormat: string) {
    const columns = [
      {
        caption: 'ID',
        name: 'Id',
        dataField: 'id',
        allowFiltering: true,
      },
      {
        caption: 'Type',
        name: 'IntegrationTypeId',
        dataField: 'integrationTypeId',
        allowFiltering: true,
        calculateCellValue: (rowData: any) =>
          this.getIntegrationTypeLabel(rowData.integrationTypeId),
      },
      {
        caption: 'Total Items',
        name: 'ExportedCount',
        dataField: 'exportedCount',
        allowFiltering: true,
      },
      {
        caption: 'Exported Total',
        name: 'Amount',
        dataField: 'amount',
        format: { type: 'fixedPoint', precision: 2 },
        allowFiltering: true,
      },
      {
        caption: 'Exported Date',
        name: 'CreatedDate',
        dataField: 'createdDate',
        dataType: 'date',
        format: dateFormat,
        allowFiltering: true,
        sortIndex: '0',
        sortOrder: 'desc',
      },
      {
        caption: 'Export By',
        name: 'ExportedBy',
        dataField: 'exportedBy',
        headerFilter: { allowSearch: true },
        allowFiltering: true,
      },
      {
        caption: 'File Name',
        name: 'vpDocumentsPath',
        dataField: 'vpDocumentsPath',
        allowFiltering: true,
        cellTemplate: (cellElement: any, cellInfo: any) => {
          const filePath = cellInfo.value;
          const fullFilePath = `/V06/viewfile.aspx?file=${filePath}`;
          const fileName = filePath.split('/').pop();
          cellElement.innerHTML = `<a href="${fullFilePath}" rel="noopener" target="_blank" download="${fileName}">${fileName}</a>`;
        },
      },
      {
        caption: 'Portfolio',
        name: 'Portfolio',
        dataField: 'portfolio',
        headerFilter: { allowSearch: true },
        allowFiltering: true,
      },
      {
        caption: 'Export Parameters',
        name: 'ParsedExportParameters',
        dataField: 'parsedExportParameters',
        allowFiltering: true,
      },
    ];
    return columns;
  }

  getFilter(): Condition {
    return [];
  }

  getIntegrationTypeLabel(integrationTypeId: number): string {
    switch (integrationTypeId) {
      case 1:
        return 'AP Export';
      case 2:
        return 'AR Export';
      case 3:
        return 'JE Export';
      default:
        return 'N/A';
    }
  }
}
