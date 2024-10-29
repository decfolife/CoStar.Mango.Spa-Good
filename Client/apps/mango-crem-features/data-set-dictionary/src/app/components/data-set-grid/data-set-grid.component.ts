/* eslint-disable rxjs-angular/prefer-composition */
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import { DataField, DataSet, DataSetRequest } from '../../models';
import { DataSetDictionaryService } from '../../services/data-set-dictionary.service';

@Component({
  selector: 'mango-data-set-grid',
  templateUrl: './data-set-grid.component.html',
  styleUrls: ['./data-set-grid.component.scss'],
})
export class DataSetGridComponent implements OnInit {
  @Input()
  hasAddRights = false;

  @Output()
  filterCountChanged = new EventEmitter<number>();

  @ViewChild('dataSetGrid')
  dataSetGrid: DxDataGridComponent;

  gridData: DataSet[] = [];

  filterBuilderVisible = false;
  isFinReportingEnabled = false;
  showLoading = false;

  editRowKey: number | null = null;

  private assignFinancialFieldCheckboxCounter = 0;

  constructor(private service: DataSetDictionaryService) {}

  ngOnInit(): void {
    this.service.getReportingIntervalSettings().subscribe((res) => {
      if (!res.succeeded) {
        return;
      }

      this.isFinReportingEnabled = res.data.financialReportingEnabled;
    });

    this.service.getDataSets().subscribe((res) => {
      if (!res.succeeded) {
        notify({
          type: 'error',
          message: res.message,
          displayTime: 3000,
          position: {
            my: 'bottom right',
            at: 'bottom right',
            offset: '-16 -16',
          },
          maxWidth: '400px',
          closeOnClick: true,
        });

        return;
      }

      this.gridData = res.data.map((ds: DataSet) => {
        ds.listPageCount = ds.listPageCount ?? 0;
        ds.adHocReportCount = ds.adHocReportCount ?? 0;

        return ds;
      });
    });
  }

  // DevExtreme doesn't provide types for event objects, so the linter is disabled
  // for those event handlers.

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exportToExcel = (e: any) => {
    // This needs to be a => function for proper `this` context (thanks DevExtreme)
    const rowData: DataSet = e.row.data;

    const workbook = new Workbook();
    const dataFieldWorksheet = workbook.addWorksheet('Data Fields');

    this.service.getDataFieldsByDataSet(rowData.id).subscribe((res) => {
      if (!res.succeeded) {
        notify({
          type: 'error',
          message: 'There was an error sending to Excel.',
          displayTime: 3000,
          position: {
            my: 'bottom right',
            at: 'bottom right',
            offset: '-16 -16',
          },
          maxWidth: '400px',
          closeOnClick: true,
        });

        return;
      }

      dataFieldWorksheet.columns = [
        { header: 'Field ID' },
        { header: 'Field Name' },
        { header: 'Category' },
        { header: 'Data Type' },
        { header: 'Field Width' },
        { header: 'Data Field Format' },
        { header: 'Data Field Description' },
        { header: 'Alignment' },
        { header: 'Linked Form Item ID' },
        { header: 'Linked Form Item Name' },
      ];

      res.data.forEach((df: DataField) => {
        dataFieldWorksheet.addRow([
          df.dataFieldID,
          df.dataFieldName,
          df.categoryName,
          df.dataTypeLabel,
          df.columnWidth,
          df.defaultFormatForReports,
          df.dataFieldDescription,
          df.dataFieldAlignment,
          df.formItemID,
          df.formItemLabel,
        ]);
      });

      dataFieldWorksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });

      dataFieldWorksheet.columns.forEach((col) => {
        col.width = col.header.length < 12 ? 12 : col.header.length;
      });

      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          `${rowData.name} Data Fields.xlsx`
        );
      });
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEditorPreparing(e: any) {
    if (
      e.dataField === 'assignFinancialFields' &&
      (!e.row.data.isFinancialFieldsAssignable || !this.hasAddRights)
    ) {
      e.cancel = true;
    }

    return e;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDataSetSaving(e: any) {
    if (!e.changes.length) {
      return;
    }

    this.dataSetGrid.instance.beginCustomLoading('Saving');

    const key = e.changes[0].key;
    const data: DataSet = this.gridData.find((x) => x.id === key);

    let description = data.description;
    let assignFinancialFields = data.assignFinancialFields;

    if (JSON.stringify(e.changes[0].data).includes('description')) {
      description = e.changes[0].data.description;
    }

    if (JSON.stringify(e.changes[0].data).includes('assignFinancialFields')) {
      assignFinancialFields = e.changes[0].data.assignFinancialFields;
    }

    const request: DataSetRequest = {
      id: data.id,
      description: description,
      assignFinancialFields: assignFinancialFields,
    };

    e.cancel = true;

    this.service.updateDataSet(request).subscribe((res) => {
      if (res.succeeded) {
        data.description = description;
        data.assignFinancialFields = assignFinancialFields;

        this.editRowKey = null;
      }

      this.dataSetGrid.instance.endCustomLoading();

      notify({
        message: res.message,
        type: res.succeeded ? 'success' : 'error',
        displayTime: 3000,
        position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
        maxWidth: '400px',
        closeOnClick: true,
      });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFilterCount(filters: any[]) {
    const numberOfFilters = this.getFilterCount(filters);

    this.filterCountChanged.emit(numberOfFilters);
  }

  onCellPrepared(e: any) {
    if (
      e.rowType === 'data' &&
      e.column.caption === 'Assign Financial Fields'
    ) {
      const commandCell = e.cellElement;
      const checkboxArray = commandCell.querySelectorAll('.dx-checkbox');
      if (checkboxArray.length > 0) {
        const checkboxElement = checkboxArray[0];
        this.assignFinancialFieldCheckboxCounter++;
        checkboxElement.setAttribute(
          'id',
          'assignFinancialFieldCheckbox' +
            this.assignFinancialFieldCheckboxCounter
        );
        checkboxElement.setAttribute(
          'aria-label',
          'assignFinancialFieldCheckbox' +
            this.assignFinancialFieldCheckboxCounter
        );
      }
    }
  }

  // This recursively counts the applied filters taking into account the unusual
  // structure of filters in a DataGrid. DevExtreme doesn't even bother providing
  // a type for the filters, hence the linting disable below.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getFilterCount(filter: any[]): number {
    if (!filter || filter.length === 0) {
      return 0;
    }

    const hasArrays = filter.find((x) => Array.isArray(x));
    let filterCount = 0;

    if (!hasArrays) {
      return 1;
    }

    for (let i = 0; i < filter.length; ++i) {
      if (Array.isArray(filter[i])) {
        filterCount += this.getFilterCount(filter[i]);
      }
    }

    return filterCount;
  }
}
