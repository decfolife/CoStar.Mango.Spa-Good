import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Subscription, forkJoin } from 'rxjs';
import {
  ObjectHistory,
  ObjectName,
} from '../../shared/models/interfaces/object-history.interface';
import { ObjectHistoryService } from '../../shared/services/object-history.service';
import { ActivatedRoute } from '@angular/router';
import {
  DevExtremeModule,
  DxDataGridComponent,
  DxLoadPanelModule,
} from 'devextreme-angular';
import {
  CremToastService,
  ButtonModule,
  PageHeaderComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import { ToastState } from '@mango/data-models/lib-data-models';
import { ContactPreferences } from 'libs/data-models/lib-data-models/src/lib/models/contact.interface';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { saveAs } from 'file-saver-es';
import { getExportHistoryColumns } from '@reminders-list/shared/services/object-history-utilities.service';
import { OBJECT_HISTORY_KEYS } from '@reminders-list/shared/models/enums.model';
import { SearchComponent } from '@mango/ui-shared/lib-ui-elements';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'mango-object-history',
  templateUrl: './object-history.component.html',
  standalone: true,
  imports: [
    CommonModule,
    DevExtremeModule,
    DxLoadPanelModule,
    ButtonModule,
    PageHeaderComponent,
    SearchComponent,
    MatMenuModule,
  ],
  styleUrls: ['./object-history.component.scss'],
})
export class ObjectHistoryComponent implements OnInit, OnDestroy {
  @ViewChild('ObjectHistoryGrid') objectHistoryGrid: DxDataGridComponent;
  @Input() OTID: number;
  @Input() OID: number;
  objectHistory: ObjectHistory[];
  object: ObjectName;
  tabTitle: string;
  pageTitle: string;
  objectHistoryColumns: any[] = [];
  dateFormat = 'MM/dd/yyyy';
  dateOnlyFormat = 'MM/dd/yyyy';
  columnResizingMode = 'widget';
  contactPrefs: ContactPreferences;
  showLoading: boolean = true;
  expandAll = false;
  subs: Subscription = new Subscription();
  sendToExcelClicked = false;
  workSheet: any;
  pageName: string;
  searchText: string = '';

  constructor(
    public objectHistoryService: ObjectHistoryService,
    private toastService: CremToastService,
    private activatedRoute: ActivatedRoute,
    private facade: MangoAppFacade
  ) {
    this.OTID = Number(this.activatedRoute.snapshot.queryParamMap.get('otid'));
    this.OID = Number(this.activatedRoute.snapshot.queryParamMap.get('oid'));
  }

  ngOnInit(): void {
    this.getUserprefs();
    this.getObjectData(this.OID, this.OTID);
    this.objectHistoryColumns = getExportHistoryColumns(
      this.dateFormat,
      this.dateOnlyFormat
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getUserprefs() {
    this.subs.add(
      this.facade.contactRecord$.subscribe(
        (contactRecord) => (this.contactPrefs = contactRecord.preferences)
      )
    );
    this.dateFormat = this.contactPrefs.contactDatesEU
      ? 'dd.MM.yyyy hh:mm:ss a'
      : 'MM/dd/yyyy hh:mm:ss a';

    this.dateOnlyFormat = this.contactPrefs.contactDatesEU
      ? 'dd.MM.yyyy'
      : 'MM/dd/yyyy';
  }

  private showErrorToast() {
    this.toastService.show(
      `An error occurred, please try again.`,
      'Error',
      ToastState.ERROR,
      {
        maxWidth: '360px',
        duration: 180000,
      }
    );
  }

  sendToExcelFileName(): string {
    const fileName = `gvObjectHistoryMaster.xlsx`;
    return fileName;
  }

  sendToExcel(event: any): void {
    this.sendToExcelClicked = true;
    const fileName = this.sendToExcelFileName();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(this.workSheet);

    exportDataGrid({
      component: this.objectHistoryGrid.instance,
      worksheet: worksheet,
    }).then(() => {
      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell.value ? cell.value.toString() : '';
          maxLength = Math.max(maxLength, cellValue.length);
        });
        column.width = maxLength / 2;
      });

      workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          fileName
        );
      });
    });
    setTimeout(() => {
      this.sendToExcelClicked = false;
    }, 100);
  }

  getObjectData(OID: number, OTID: number) {
    this.showLoading = true;

    const history$ = this.objectHistoryService.getAllObjectChangeHistoryReport(
      OID,
      OTID
    );
    const name$ = this.objectHistoryService.getObjectName(OID, OTID);

    this.subs.add(
      forkJoin([history$, name$]).subscribe(
        ([historyResponse, nameResponse]) => {
          if (historyResponse.success) {
            this.objectHistory = historyResponse.data as ObjectHistory[];
            this.objectHistory.forEach((element) => {
              Object.keys(element).forEach((key) => {
                const enumKey = key as keyof typeof OBJECT_HISTORY_KEYS;
                if (
                  (enumKey.includes('DATE') ||
                    key === OBJECT_HISTORY_KEYS.LAST_MODIFIED) &&
                  element[enumKey]
                ) {
                  key === OBJECT_HISTORY_KEYS.GROUP_DATE
                    ? this.dateOnlyFormat
                    : this.dateFormat;
                  element[enumKey] = formatDate(
                    element[enumKey],
                    this.dateFormat,
                    'en-US'
                  );
                }
              });
            });
          } else {
            this.showErrorToast();
          }

          if (nameResponse.success) {
            this.object = nameResponse.data;
            this.tabTitle = `${this.object[0].objectType.trim()}:`;
            if (!this.object[0].displayString) {
              this.pageTitle = this.object[0].objectName;
            } else {
              this.pageTitle = this.object[0].displayString;
            }
          } else {
            this.showErrorToast();
          }

          this.showLoading = false;
        }
      )
    );
  }

  groupBy(column: string) {
    const dataGrid = this.objectHistoryGrid.instance;

    dataGrid.clearFilter();
    dataGrid.clearGrouping();

    dataGrid.columnOption(column, 'groupIndex', 0);

    this.expandAll = false;
    dataGrid.collapseAll();
  }

  toggleExpandAll() {
    this.expandAll = !this.expandAll;
    if (this.expandAll) {
      this.objectHistoryGrid.instance.expandAll();
    } else {
      this.objectHistoryGrid.instance.collapseAll();
    }
  }

  adaAttrNoDataGrid(e: any) {
    const dxGridwithTables = e.component
      .$element()
      .find('.dx-datagrid-headers.dx-bordered-top-view');
    if (dxGridwithTables && dxGridwithTables.length > 0) {
      for (let i = 0; i < dxGridwithTables.length; i++) {
        const element = dxGridwithTables[i];
        if (element) {
          element.setAttribute('role', 'grid');
        }
      }
    }
  }

  changed(data) {
    this.searchText = data;
    this.objectHistoryGrid.instance.searchByText(data);
  }
}
