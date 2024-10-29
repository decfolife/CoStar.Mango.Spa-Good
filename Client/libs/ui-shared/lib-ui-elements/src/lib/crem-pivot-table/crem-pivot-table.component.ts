import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DxChartComponent,
  DxDataGridComponent,
  DxPivotGridComponent,
} from 'devextreme-angular';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import 'regenerator-runtime/runtime';
import { Workbook } from 'exceljs';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { saveAs } from 'file-saver-es';
import DataSource from 'devextreme/data/data_source';
import * as ExcelJS from 'exceljs';

interface ISummationTypeConfig {
  showSummationTypeConfig: boolean;
  showColumnFields: boolean;
  showRowFields: boolean;
  showDataFields: boolean;
  showFilterFields: boolean;
}

@Component({
  selector: 'crem-pivot-table',
  templateUrl: './crem-pivot-table.component.html',
  styleUrls: ['./crem-pivot-table.component.scss'],
})
export class CremPivotTableComponent implements OnInit, AfterViewInit {
  @Input() config: any;
  @Input() dataGridKeyExpr: string;
  @Input() id: string;
  @Input() showRowGrandTotals = false;
  @Input() showColumnGrandTotals = false;
  @Input() allowDrillDown = false;
  @Input() exportFileName = 'Grid_Export';
  @Input() showColumnChooser = false;
  @Input() chartVisible = true;
  @Input() applyChangesMode = 'instantly';
  @Input() summationTypeConfig: Partial<ISummationTypeConfig> = {};
  @Input() fieldModal: any;
  @Output() changeCallback: EventEmitter<any> = new EventEmitter();
  @ViewChild('PivotGrid') pivotGrid: DxPivotGridComponent;
  @ViewChild('PivotChart', { static: false }) pivotChart: DxChartComponent;
  @ViewChild('drillDownDataGrid') drillDownDataGrid: DxDataGridComponent;

  pivotGridDataSource: PivotGridDataSource;
  drillDownDataSource: any;
  popupVisible = false;
  drilldownColumns: string[];

  ngOnInit() {
    this.exportFileName = this.exportFileName || 'Grid_Export';
    this.showRowGrandTotals = this.showRowGrandTotals || false;
    this.showColumnGrandTotals = this.showColumnGrandTotals || false;
    this.allowDrillDown = this.allowDrillDown || false;
    this.applyChangesMode = this.applyChangesMode || 'instantly';

    if (this.config && !this.config.onChanged) {
      this.config.onChanged = () => {
        setTimeout(() => {
          this.onChanged();
        });
      };
    }
    this.pivotGridDataSource = new PivotGridDataSource(this.config);
  }

  ngAfterViewInit() {
    this.refreshPivotChartData();
  }

  public refreshData() {
    this.config.onChanged = () => {
      setTimeout(() => {
        this.onChanged();
      });
    };
    this.pivotGridDataSource = new PivotGridDataSource(this.config);
  }

  public getAreaFields(area) {
    return this.pivotGridDataSource.getAreaFields(area, false);
  }

  public getPivotDataSource() {
    return this.pivotGridDataSource.state();
  }

  public getPivotTableById() {
    return this.pivotGrid.instance;
  }

  public showFieldChooser(): void {
    this.pivotGrid.instance.getFieldChooserPopup().show();
  }

  public exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pivot');
    exportPivotGrid({
      component: this.pivotGrid.instance,
      worksheet: worksheet,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          this.exportFileName + '.xlsx'
        );
      });
    });
  }

  public onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Pivot');

    exportPivotGrid({
      component: e.component,
      worksheet,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          this.exportFileName + '.xlsx'
        );
      });
    });
    e.cancel = true;
  }

  public onPivotCellClick(e) {
    if (e.area == 'data') {
      if (this.allowDrillDown) {
        const columnAreaFields = this.pivotGridDataSource.getAreaFields(
          'column',
          false
        );
        const rowAreaFields = this.pivotGridDataSource.getAreaFields(
          'row',
          false
        );
        const dataAreaFields = this.pivotGridDataSource.getAreaFields(
          'data',
          false
        );
        const fields = [];
        columnAreaFields.forEach((column) => {
          if (!fields.includes(column.dataField)) {
            fields.push(column.dataField);
          }
        });

        rowAreaFields.forEach((row) => {
          if (!fields.includes(row.dataField)) {
            fields.push(row.dataField);
          }
        });

        dataAreaFields.forEach((data) => {
          if (!fields.includes(data.dataField)) {
            fields.push(data.dataField);
          }
        });
        this.drilldownColumns = fields;
        this.drillDownDataSource = new DataSource({
          key: this.dataGridKeyExpr,
          load: () =>
            this.pivotGridDataSource.createDrillDownDataSource(e.cell).load(),
        });
        this.popupVisible = true;
      }
    }
  }

  public onPopupShown() {
    this.drillDownDataGrid.instance.updateDimensions();
  }

  public updateDimension() {
    this.pivotGrid?.instance.updateDimensions();
    setTimeout(() => {
      this.pivotChart?.instance.render();
      this.pivotGrid?.instance.updateDimensions();
    });
  }

  public refreshPivotChartData() {
    setTimeout(() => {
      this.pivotGrid?.instance.bindChart(this.pivotChart?.instance, {
        dataFieldsDisplayMode: 'splitPanes',
        alternateDataFields: false,
      });
    });
  }

  public onChanged() {
    this.changeCallback?.emit(this.pivotGridDataSource);
  }

  public contextMenuPreparing(e) {
    const dataSource = e.component.getDataSource();
    const sourceField = e.field;

    if (sourceField) {
      if (sourceField.dataType === 'number') {
        let numberType = 'number';
        const fieldModal = this.fieldModal;
        const setSummaryType = function (args) {
          if (fieldModal) {
            numberType = fieldModal[sourceField.dataField];
          }
          let format;
          if (numberType === 'currency') {
            if (args.itemData.value === 'total') {
              format = ',###';
            } else if (args.itemData.value === 'sum') {
              format = ',##0.00';
            }
          } else {
            if (args.itemData.value === 'total') {
              format = ',###';
            } else if (args.itemData.value === 'sum') {
              format = ',###.##';
            }
          }

          if (format) {
            dataSource.field(sourceField.index, {
              summaryType: args.itemData.value,
              format: format,
            });
          } else {
            dataSource.field(sourceField.index, {
              summaryType: args.itemData.value,
            });
          }

          dataSource.load();
        };
        const menuItems = [];

        e.items.push({ text: 'Summary Type', items: menuItems });

        for (const summaryType of ['Sum', 'Total']) {
          const summaryTypeValue = summaryType.toLowerCase();

          menuItems.push({
            text: summaryType,
            value: summaryType.toLowerCase(),
            onItemClick: setSummaryType,
            selected: e.field.summaryType === summaryTypeValue,
          });
        }
      }
    }
  }

  // This function populates aria-label in pivot grid horizontal headers and checkboxes
  public adaAttributes(e) {
    setTimeout(() => {
      e.element
        .querySelector('.dx-treeview-node-container')
        ?.setAttribute('aria-label', 'Pivot Grid Headers');
      const gridCheckBox = document.getElementsByClassName(
        'dx-widget dx-checkbox'
      );
      const arr = Array.from(gridCheckBox);
      if (arr?.length) {
        arr.forEach((el) => {
          const checkBoxArr = [el];
          if (checkBoxArr.length) {
            checkBoxArr.forEach((childEl) => {
              childEl.setAttribute('aria-label', 'checkbox');
            });
          }
        });
      }
    });
  }
}
