import { Component, ComponentRef, ContentChild, Directive, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';


@Directive({
  selector: '[customTemplate]'
})
export class CustomTemplateDirective{
}

@Component({
  selector: 'crem-simple-grid',
  templateUrl: './simple-grid.component.html',
  styleUrls: ['./simple-grid.component.scss']
})
export class SimpleGridComponent{
  @Input() id: string;
  @Input() dataSource: any[];
  @Input() paging: boolean = true;
  @Input() allowSorting: boolean = true;
  @Input() grouping: DxDataGridComponent["grouping"];
  @Input() customColumns?: DxDataGridComponent["columns"];
  @Input() headerFilter: DxDataGridComponent["headerFilter"];
  @Input() buttonColumn?: boolean;
  @Input() allowColumnReordering?: boolean;
  @Input() customContentTemplate?: TemplateRef<any>
  @Input() enableMasterDetails?: boolean = false
  @Input() columns: any[];
  @Input() pageSize: number = 50;
  @Input() customPageSize: number[] = [50, 100, 200, 500]
  @Input() exportFileName: string = "Grid_Export"
  @Input() gridHeight: string;
  @Input() autoSetKeyExpr: boolean = false;
  @Input() wordWrapEnabled: boolean = false;
  @Input() filterValue: any = null;
  @Input() noDataText: string = "No data";
  @Input() showColumnLines: boolean = true;
  @Input() showRowLines: boolean = true;;
  @Input() keyExpr?: any = null; //TODO: keyExpr originally an string, needs a better logic implementation when null. Error TS2322: Type 'null' is not assignable to type 'string | undefined'.
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter<any>();
  @ContentChild('masterDetail',{static: false}) bodyTemplateRef: TemplateRef<any>;
  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;

  constructor() {

    // this.buttonColumn ? this.dataSource.array.forEach(element => {
    //   element['Approval']= `${this.buttonColContent.createEmbeddedView(this.buttonTemplate)}`
    //   return this.dataSource;
    // }) : null;



   }

   ngOnInit() {
    if (this.autoSetKeyExpr) {
      this.setKeyExpr();
    }
   }

   public setKeyExpr() {
    this.keyExpr = "randomUniqueId";
    this.dataSource = this.dataSource.map((item, idx) => {
      item.randomUniqueId = idx;
      return item;
    });
   }

   public exportGrid() {
      const workbook = new ExcelJS.Workbook();
      const workSheet = workbook.addWorksheet('Data');

      const setBackground = (gridCell: any, excelCell: any) => {
        if (gridCell.rowType === 'header') {
          excelCell.font.color = { argb: '00558E' }
          excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
        }
      }

      exportDataGrid({
        worksheet: workSheet,
        component: this.dataGrid.instance,
        topLeftCell: { row: 1, column: 1 },
        customizeCell: ({ gridCell, excelCell }) => {
          setBackground(gridCell, excelCell)
        }
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          const fileName = this.exportFileName + '.xlsx'
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
        });
      });
   }

   public onCellClicked(event: Event) {
     if (this.onRowClick) {
      this.onRowClick.emit(event);
     }
   }

   public searchDataGrid(data: string): void {
    this.dataGrid?.instance?.searchByText(data);
  }

  public onSelectionChange(event: Event) {
    this.onSelectionChanged?.emit(event);
  }
}



