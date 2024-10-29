import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { ObjectMaintenanceService } from './object-maintenance.service';

enum ObjectTypeId {
  Segments = 195,
}

@Component({
  selector: 'object-maintenance',
  templateUrl: './object-maintenance.component.html',
  styleUrls: ['./object-maintenance.component.scss'],
})
export class ObjectMaintenanceComponent implements OnInit, OnDestroy {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public searchText: string;
  public columns: any;
  public filterDropdownField: any[];

  public isLoading: boolean = true;
  public currentObjectTypeId: number =
    +this.route.snapshot.paramMap.get('OTID') || undefined;
  public currentFilterType: string = '1';
  public objectTypeList: any[];
  public gridData: any[];
  public filteredGridData: any[];

  private statusDictionary: any = {
    '1': 'Active',
    '0': 'Archive',
    '-1': 'All',
  };
  private _subs = [];

  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;

  constructor(
    private route: ActivatedRoute,
    private service: ObjectMaintenanceService
  ) {
    const loadingSub = this.service.isLoading$.subscribe((isLoadingVal) => {
      this.isLoading = isLoadingVal;
    });
    const objectTypeSub = this.service.objectTypeDropdownData$.subscribe(
      (objectTypes) => {
        if (objectTypes) {
          this.objectTypeList = objectTypes.data;
          const objectTypeItem = this.objectTypeList?.find((objectType) => {
            return objectType.intValue === this.currentObjectTypeId;
          });

          if (!objectTypeItem) {
            this.currentObjectTypeId = objectTypes.data[0].intValue;
          }
        }
      }
    );
    const pageDataSub = this.service.pageData$.subscribe((data) => {
      if (data) {
        this.gridData = data.data.gridData;
        this.filterGridData();
        if (this.currentObjectTypeId === ObjectTypeId.Segments) {
          data.data.showTemplateColumn = true;
        }
        this.buildGridColumns(
          data.data.showHiddenColumns,
          data.data.showTemplateColumn
        );
        this.setFilterDropdownItems(data.data.showArchiveOption);
      }
    });

    this._subs.push(loadingSub, pageDataSub, objectTypeSub);

    // From now until the onInit() happens the loading will be true and objectMaintenanceData and objectDropdownField will be null
  }

  ngOnInit(): void {
    this.service.onPageLoad(this.currentObjectTypeId);
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  public searchDataGrid(data: string): void {
    this.searchText = data;
    this.dataGrid?.instance?.searchByText(data);
  }

  public onRowClicked(item): void {
    // A hyperlink using this URL is on the template and will need updating if this function changes
    if (item.data.canEdit) {
      const route =
        '/v06/Admin/SecurityMaintenance/SecurityMaintenance.aspx#/assignRights/' +
        this.currentObjectTypeId +
        '/' +
        item.data.objectId +
        '/ObjectMaintenance.aspx';
      window.location.href = route;
    }
  }

  public onCellPrepared(e) {
    if (
      e.rowType == 'data' &&
      (e.column.dataField === 'objectId' ||
        e.column.dataField == 'objectName' ||
        e.column.dataField === 'portfolio' ||
        e.column.dataField === 'country' ||
        e.column.dataField === 'template' ||
        e.column.dataField === 'rights' ||
        e.column.dataField === 'actions')
    ) {
      if (!e.data.canEdit) {
        e.cellElement.className += ' not-clickable';
      }
    }
    if (e.rowType == 'data' && e.column.dataField === 'actions') {
      e.cellElement.className += ' not-clickable';
    }

    if (e.rowType === 'header') {
      const ele = e.cellElement.querySelector('.dx-header-filter');
      if (ele) {
        setTimeout(() => {
          ele.addEventListener('click', () => {
            ele.setAttribute('aria-label', 'Column Expanded');
            ele.setAttribute('aria-expanded', 'true');
          });
        }, 150);
      }
    }
  }

  public onObjectTypeChange(object: any) {
    this.currentFilterType = '1';
    this.currentObjectTypeId = object?.[0]?.intValue;
    this.service.onObjectTypeChange(object?.[0]?.intValue);
  }

  public onFilterChange(status: number) {
    this.currentFilterType = status?.[0]?.intValue;
    this.service.onStatusFilterChangeChange(
      this.currentObjectTypeId,
      status?.[0]?.intValue
    );
  }

  public filterGridData() {
    this.filteredGridData = this.gridData;
  }

  public exportGrids(): void {
    const workbook = new ExcelJS.Workbook();
    const userMaintenanceSheet = workbook.addWorksheet('Objects');

    userMaintenanceSheet.getRow(2).getCell(2).value = 'Objects';
    userMaintenanceSheet.getRow(2).getCell(2).font = {
      bold: true,
      size: 16,
      underline: 'double',
    };
    let row = 2;
    const objectTypeData = this.objectTypeList.find((objectType) => {
      return objectType.intValue === this.currentObjectTypeId;
    });
    const objectTypeValue = 'Object Type: ' + objectTypeData?.displayString;
    const objectStatus =
      'Object Status: ' + this.statusDictionary[this.currentFilterType];
    userMaintenanceSheet.getRow(row).getCell(3).value = objectTypeValue;
    userMaintenanceSheet.getRow(row).getCell(3).font = { bold: true };
    row++;
    userMaintenanceSheet.getRow(row).getCell(3).value = objectStatus;
    userMaintenanceSheet.getRow(row).getCell(3).font = { bold: true };

    const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = { argb: '00558E' };
        excelCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'd2d2d2' },
          bgColor: { argb: 'd2d2d2' },
        };
      }
    };

    exportDataGrid({
      worksheet: userMaintenanceSheet,
      component: this.dataGrid.instance,
      topLeftCell: { row: 5, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setBackground(gridCell, excelCell);
      },
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        const fileName = 'Objects.xlsx';
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          fileName
        );
      });
    });
  }

  private buildGridColumns(
    showPortfolioCountry: boolean = false,
    showTemplatecolumn: boolean = false
  ) {
    this.columns = [
      {
        dataField: 'objectId',
        alignment: 'left',
        visible: true,
        dataType: 'number',
        caption: 'ID',
      },
      {
        dataField: 'objectName',
        caption: 'Name',
        alignment: null,
        visible: true,
        dataType: null,
      },
      {
        dataField: 'template',
        caption:
          this.currentObjectTypeId === ObjectTypeId.Segments
            ? 'Criteria Set Name'
            : 'Template',
        alignment: null,
        visible: showTemplatecolumn,
        dataType: null,
      },
      {
        dataField: 'portfolio',
        caption: 'Portfolio Name',
        alignment: null,
        visible: showPortfolioCountry,
        dataType: null,
      },
      {
        dataField: 'country',
        caption: 'Country',
        alignment: null,
        visible: showPortfolioCountry,
        dataType: null,
      },
      {
        dataField: 'rights',
        caption: 'Rights',
        alignment: 'left',
        visible: true,
        dataType: null,
      },
    ];
  }

  private setFilterDropdownItems(showArchive: boolean = false) {
    this.filterDropdownField = [];
    if (showArchive) {
      this.filterDropdownField.push({
        displayString: 'Archive',
        intValue: '0',
      });
    }
    this.filterDropdownField.push(
      {
        displayString: 'Active',
        intValue: '1',
      },
      {
        displayString: 'All',
        intValue: '-1',
      }
    );
  }

  public addADAAttributes(e) {
    setTimeout(() => {
      const spanElements = e.element.querySelectorAll(
        '.dx-header-filter.dx-header-filter-empty'
      );
      if (spanElements) {
        spanElements.forEach((spanElement, i) => {
          const caption = e.component.columnOption(i, 'caption');
          spanElement.setAttribute(
            'aria-label',
            'Show filter options for column ' + caption + ' button sub menu'
          );
          spanElement.setAttribute('role', 'button');
          spanElement.setAttribute('aria-haspopup', 'dialog');
          spanElement.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  addADAtoIconClear(): void {
    const iconClearElement = document.querySelector(
      '.dx-icon-clear'
    ) as HTMLElement | null;
    if (iconClearElement) {
      iconClearElement.setAttribute('tabindex', '0');
      iconClearElement.setAttribute('role', 'button');
      iconClearElement.setAttribute('aria-label', 'Clear Search Filter');
    }
  }
}
