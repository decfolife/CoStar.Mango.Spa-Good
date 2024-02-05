import { Injectable } from "@angular/core";import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import dxDataGrid from "devextreme/ui/data_grid";

@Injectable()

export class ExportDevexDatagridService {

  constructor() { }

  exportToExcel(dataGridInstance: dxDataGrid, fileName: string){

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    exportDataGrid({
      component: dataGridInstance,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
      });
    });

  }
}