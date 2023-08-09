/* eslint-disable rxjs-angular/prefer-composition */
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

import { DataSetDictionaryService } from '../../services/data-set-dictionary.service';
import { ColumnAlignment, DataField, DataFieldRequest, DataSet } from '../../models';

@Component({
  selector: 'mango-data-set-detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.scss']
})
export class DetailGridComponent implements OnInit, AfterViewInit {
  @Input()
  dataSet: DataSet;

  @Input()
  hasAddRights = false;

  @ViewChild('dataFieldGrid')
  dataFieldGrid: DxDataGridComponent;

  gridData: DataField[] = [];
  categories = [];

  alignments = [
    { key: 'Right' },
    { key: 'Left' },
    { key: 'Center' },
  ];

  fieldWidths = [
    { key: 50 },
    { key: 150 },
    { key: 200 },
    { key: 250 },
    { key: 500 },
    { key: 1000 },
  ];

  popupDataSets: Partial<DataSet>[] = [];
  popupVisible = false;
  showLoading = false;

  editRowKey: number | null = null;

  constructor(private service: DataSetDictionaryService) {}

  ngOnInit() {
    this.service.getDataFieldsByDataSet(this.dataSet.id).subscribe(res => {
      if (!res.succeeded) {
        notify({
          type: 'error',
          message: res.message,
          displayTime: 3000,
          position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
          maxWidth: '400px',
          closeOnClick: true,
        });

        return;
      }

      this.gridData = res.data;
      this.dataFieldGrid.instance.endCustomLoading();
    });
  }

  ngAfterViewInit() {
    this.dataFieldGrid?.instance?.beginCustomLoading('Loading...');
  }

  updateDataFieldFormat(dropdownValueChangeEvent, dxTemplate){
    dxTemplate.setValue(dropdownValueChangeEvent.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDataFieldSaving(e: any) {
    if (!e.changes.length) {
      return;
    }

    this.dataFieldGrid.instance.beginCustomLoading("Saving");

    const key = e.changes[0].key;
    const data: DataField = this.gridData.find(x => x.dataFieldID === key);

    let format = data.defaultFormatForReports;
    let columnAlignment = data.dataFieldAlignment;
    let columnWidth = data.columnWidth;
    let fieldName = data.dataFieldName;
    let fieldDescription = data.dataFieldDescription;

    if (JSON.stringify(e.changes[0].data).includes('defaultFormatForReports')) {
      if (e.changes[0].data.defaultFormatForReports === null || typeof e.changes[0].data.defaultFormatForReports !== 'object') {
        format = e.changes[0].data.defaultFormatForReports;
      }
    }

    if (JSON.stringify(e.changes[0].data).includes('dataFieldAlignment')) {
      columnAlignment = e.changes[0].data.dataFieldAlignment;
    }

    if (JSON.stringify(e.changes[0].data).includes('columnWidth')) {
      columnWidth = e.changes[0].data.columnWidth;

      if (JSON.stringify(columnWidth) === '{}')
        columnWidth = null;
    }

    if (JSON.stringify(e.changes[0].data).includes('dataFieldName')) {
      fieldName = e.changes[0].data.dataFieldName;
    }

    if (JSON.stringify(e.changes[0].data).includes('dataFieldDescription')) {
      fieldDescription = e.changes[0].data.dataFieldDescription;
    }

    let alignment: ColumnAlignment;

    switch (columnAlignment) {
      case 'Left':
        alignment = ColumnAlignment.Left;
        break;
      case 'Center':
        alignment = ColumnAlignment.Center;
        break;
      case 'Right':
        alignment = ColumnAlignment.Right;
        break;
      default:
        alignment = ColumnAlignment.None;
    }

    const request: DataFieldRequest = {
      columnWidth: columnWidth,
      dataFieldAlignment: alignment,
      dataFieldDescription: fieldDescription,
      dataFieldID: data.dataFieldID,
      dataFieldName: fieldName,
      dataTypeFormatString: format,
    };

    e.cancel = true;

    this.service.updateDataField(request).subscribe(res => {
      if (res.succeeded) {
        data.defaultFormatForReports = format;
        data.dataFieldAlignment = columnAlignment;
        data.columnWidth = columnWidth;
        data.dataFieldName = fieldName;
        data.dataFieldDescription = fieldDescription;

        this.editRowKey = null;
      }

      this.dataFieldGrid.instance.endCustomLoading();

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

  onInfoButtonClicked(df: DataField) {
    this.popupDataSets = [];

    this.service.getDataSetsByDataField(df.dataFieldID).subscribe(res => {
      if (!res.succeeded) {
        return;
      }

      this.popupDataSets = res.data;
      this.popupVisible = true;
    });
  }
}
