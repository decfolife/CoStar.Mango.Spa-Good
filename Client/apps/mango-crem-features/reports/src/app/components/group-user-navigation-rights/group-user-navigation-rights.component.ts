import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdNamePair, ResolvedData } from '../../shared/models/index';
import { NavigationRightDataGrid } from './group-user-navigation-rights.model';
import { GroupUserNavigationRightsService } from './group-user-navigation-rights.service';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../shared/services/shared.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'mango-group-user-navigation-rights',
  templateUrl: './group-user-navigation-rights.component.html',
  styleUrls: ['./group-user-navigation-rights.component.scss'],
})
export class GroupUserNavigationRightsComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];

  public userListResolved: ResolvedData = this.route.snapshot.data['userList'];
  public groupListResolved: ResolvedData =
    this.route.snapshot.data['groupList'];
  public moduleListResolved: ResolvedData =
    this.route.snapshot.data['moduleList'];

  public selectedUserId: any =
    +this.route.snapshot.paramMap.get('userId') || undefined;
  public selectedGroupId: any =
    +this.route.snapshot.paramMap.get('groupId') || undefined;
  public selectedModuleId: any =
    +this.route.snapshot.paramMap.get('moduleId') || undefined;

  userList: IdNamePair[];
  groupList: IdNamePair[];
  moduleList: IdNamePair[];
  dateFormat: string = 'MM/dd/yyyy';
  errorMessageList: any[];
  columnsObject: any;
  selectedUsers: any = [];
  selectedGroups: any = [];
  selectedModules: any = [];
  initialUser: IdNamePair | null;
  initialGroup: IdNamePair | null;
  initialModule: IdNamePair | null;

  dataGridList: NavigationRightDataGrid[];
  navigationRightsDataLoading = false;

  @ViewChildren('ReportDataGrid')
  reportDataGrid: QueryList<DxDataGridComponent>;
  @ViewChild('FilterDataGrid') filterDataGrid: DxDataGridComponent;

  constructor(
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private service: GroupUserNavigationRightsService
  ) {}

  ngOnInit(): void {
    this.userList = this.userListResolved.data;
    this.groupList = this.groupListResolved.data;
    this.moduleList = this.moduleListResolved.data;

    this.sharedService.getUserPreferences().subscribe((result) => {
      const userPreferences = result.data || {};
      this.dateFormat = userPreferences?.dateFormat || 'MM/dd/yyyy';
    });

    this.initialUser = this.selectedUserId
      ? this.userList.find((x) => x.id === this.selectedUserId)
      : null;
    this.initialGroup = this.selectedGroupId
      ? this.groupList.find((x) => x.id === this.selectedGroupId)
      : null;
    this.initialModule = this.selectedModuleId
      ? this.moduleList.find((x) => x.id === this.selectedModuleId)
      : null;
    if (this.initialUser) {
      this.selectedUsers.push(this.initialUser);
    }
    if (this.initialGroup) {
      this.selectedGroups.push(this.initialGroup);
    }
    if (this.initialModule) {
      this.selectedModules.push(this.initialModule);
    }

    if (
      this.userListResolved.error ||
      this.groupListResolved.error ||
      this.moduleListResolved.error
    ) {
      this.getErrorMessageList();
      return;
    }
  }

  public userDropdownChange(e) {
    if (e !== this.selectedUsers) {
      this.selectedUsers = e;
      this.dataGridList = [];
    }
  }

  public groupDropdownChange(e) {
    if (e !== this.selectedGroups) {
      this.selectedGroups = e;
      this.dataGridList = [];
    }
  }

  public moduleDropdownChange(e) {
    if (e !== this.selectedModules) {
      this.selectedModules = e;
      this.dataGridList = [];
    }
  }

  public apply() {
    this.navigationRightsDataLoading = true;
    const selectedUserIds = this.selectedUsers.map((user) => {
      return user.id;
    });
    const selectedGroupIds = this.selectedGroups.map((group) => {
      return group.id;
    });
    const selectedModuleIds = this.selectedModules.map((module) => {
      return module.id;
    });

    this.getNavigationRightsData(
      selectedUserIds,
      selectedGroupIds,
      selectedModuleIds
    );
  }

  private getNavigationRightsData(
    selectedUserIds: any,
    selectedGroupIds: any,
    selectedModuleIds: any
  ): void {
    this.service
      .getNavigationRightData(
        selectedUserIds,
        selectedGroupIds,
        selectedModuleIds
      )
      .subscribe((result) => {
        if (result.success) {
          this.dataGridList = [];
          this.selectedModules.forEach((moduleItem) => {
            const module = result.data.find((item) => {
              return item.moduleId === moduleItem.id;
            });
            if (module) {
              module.moduleDisplayName = moduleItem.name;
              this.dataGridList.push(module);
            } else {
              this.dataGridList.push({
                dataSource: [],
                dynamicColumnList: [],
                moduleId: moduleItem.id,
                moduleName: moduleItem.name,
                moduleDisplayName: moduleItem.name,
              });
            }
          });
          this.dataGridList.sort((a, b) => {
            if (
              a.moduleDisplayName?.toLowerCase() <
              b.moduleDisplayName?.toLowerCase()
            ) {
              return -1;
            }
            if (
              a.moduleDisplayName?.toLowerCase() >
              b.moduleDisplayName?.toLowerCase()
            ) {
              return 1;
            }
            return 0;
          });
          this.buildGridColumns();
        } else {
          if (result.clientErrorMessage) {
            notify({
              message: result.clientErrorMessage,
              type: 'error',
              displayTime: 600000,
              position: {
                at: 'bottom right',
                my: 'bottom right',
                offset: '-16 -16',
              },
              maxWidth: '450px',
              closeOnClick: true,
            });
          }
          this.navigationRightsDataLoading = false;
        }
      });
  }

  public onCellPrepared(e) {
    if (e.rowType === 'data') {
      if (
        e.data[e.column.dataField] &&
        e.data[e.column.dataField].toString().toLowerCase().startsWith('view -')
      ) {
        // e.cellElement.style.backgroundColor = "#dff0d8"
        e.cellElement.classList.add('bg-success-lightest');
      }

      if (
        e.data[e.column.dataField] &&
        e.data[e.column.dataField].toString().toLowerCase().startsWith('edit -')
      ) {
        // e.cellElement.style.backgroundColor = "#fcf8e3"
        e.cellElement.classList.add('bg-warning-lightest');
      }

      if (
        e.data[e.column.dataField] &&
        e.data[e.column.dataField]
          .toString()
          .toLowerCase()
          .startsWith('delete -')
      ) {
        // e.cellElement.style.backgroundColor = "#f2dede"
        e.cellElement.classList.add('bg-danger-lightest');
      }

      if (
        e.data[e.column.dataField] &&
        e.data[e.column.dataField]
          .toString()
          .toLowerCase()
          .startsWith('block -')
      ) {
        // e.cellElement.style.backgroundColor = "#d9edf7"
        e.cellElement.classList.add('bg-info-lightest');
      }

      if (
        e.data[e.column.dataField] &&
        e.data[e.column.dataField]
          .toString()
          .toLowerCase()
          .includes('inherited')
      ) {
        // e.cellElement.style.fontStyle="italic";
        e.cellElement.classList.add('font-style-italic');
      }
    }
  }

  public searchDataGrid(data) {
    const dataGridArray = this.reportDataGrid.toArray();
    dataGridArray.forEach((grid) => {
      grid.instance.searchByText(data);
    });
  }

  // TODO: Hard coded hex values need to be changed to class names to avoid CSP issues
  public exportDynamicGrids(e) {
    const workbook = new ExcelJS.Workbook();
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
      if (gridCell.rowType === 'data') {
        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField]
            ?.toString()
            .toLowerCase()
            .startsWith('view -')
        ) {
          excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'dff0d8' },
            bgColor: { argb: 'dff0d8' },
          };
        }

        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField]
            ?.toString()
            .toLowerCase()
            .startsWith('block -')
        ) {
          excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'd9edf7' },
            bgColor: { argb: 'd9edf7' },
          };
        }

        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField]
            ?.toString()
            .toLowerCase()
            .startsWith('delete -')
        ) {
          excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'f2dede' },
            bgColor: { argb: 'f2dede' },
          };
        }

        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField]
            ?.toString()
            .toLowerCase()
            .startsWith('edit -')
        ) {
          excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'fcf8e3' },
            bgColor: { argb: 'fcf8e3' },
          };
        }

        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField]
            ?.toString()
            .toLowerCase()
            .includes('inherited')
        ) {
          if (excelCell.font) {
            excelCell.font.italic = true;
          } else {
            excelCell.font = {};
            excelCell.font.italic = true;
          }
        }
      }
    };
    const navigationRightsSheet = workbook.addWorksheet('Navigation Rights');
    let filterSheet = workbook.addWorksheet('Filters');

    navigationRightsSheet.getRow(2).getCell(2).value = 'Navigation Rights';
    navigationRightsSheet.getRow(2).getCell(2).font = {
      bold: true,
      size: 16,
      underline: 'double',
    };

    const dataGridArray = this.reportDataGrid.toArray();
    const exportDataGridCallback = (iteration, row) => {
      if (iteration < this.dataGridList.length) {
        navigationRightsSheet.getRow(row).getCell(2).value =
          this.dataGridList[iteration]?.moduleDisplayName;
        navigationRightsSheet.getRow(row).getCell(2).font = {
          bold: true,
          size: 16,
        };
        exportDataGrid({
          worksheet: navigationRightsSheet,
          component: dataGridArray[iteration].instance,
          topLeftCell: { row: row + 1, column: 2 },
          customizeCell: ({ gridCell, excelCell }) => {
            setBackground(gridCell, excelCell);
          },
        }).then(() => {
          const lastRow = navigationRightsSheet.rowCount;
          row = lastRow + 2;
          exportDataGridCallback(iteration + 1, row);
        });
      } else {
        filterSheet.getRow(2).getCell(2).value = 'Filters';
        filterSheet.getRow(2).getCell(2).font = {
          bold: true,
          size: 16,
          underline: 'double',
        };
        filterSheet = this.buildFilterSheet(
          filterSheet,
          2,
          'Users',
          this.selectedUsers,
          'name'
        );
        filterSheet = this.buildFilterSheet(
          filterSheet,
          3,
          'Groups',
          this.selectedGroups,
          'name'
        );
        filterSheet = this.buildFilterSheet(
          filterSheet,
          4,
          'Modules',
          this.selectedModules,
          'name'
        );

        exportDataGrid({
          worksheet: filterSheet,
          component: this.filterDataGrid?.instance,
          topLeftCell: { row: 4, column: 2 },
        }).then(() => {
          const date = this.getCurrentDate();
          navigationRightsSheet.views = [{ state: 'normal' }];
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], { type: 'application/octet-stream' }),
              'Navigation Rights Report - ' + date + '.xlsx'
            );
          });
        });
      }
    };
    exportDataGridCallback(0, 4);
  }

  private buildFilterSheet(sheet, column, displayName, selectedItems, key) {
    sheet.getRow(4).getCell(column).value = displayName;
    sheet.getRow(4).getCell(column).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd2d2d2' },
      bgColor: { argb: 'd2d2d2' },
    };
    sheet.getRow(4).getCell(column).font = {
      bold: true,
      color: { argb: '00558E' },
    };
    let rowPosition = 0;
    let rowWidth = 10;
    selectedItems?.forEach((item) => {
      rowPosition++;
      sheet.getRow(4 + rowPosition).getCell(column).value = item?.[key];
      if (rowWidth < item?.[key].length) {
        rowWidth = item?.[key].length;
      }
    });
    sheet.columns[column - 1].width = rowWidth + 2;
    return sheet;
  }

  private buildGridColumns() {
    const gridObject = {};
    this.dataGridList.forEach((list) => {
      if (list.dynamicColumnList.length) {
        const defaultColumn = [
          {
            dataField: 'EntityId',
            caption: 'Id',
            alignment: null,
            visible: true,
            dataType: 'number',
          },
          {
            dataField: 'EntityName',
            caption: 'Name',
            alignment: null,
            visible: true,
            dataType: 'string',
          },
          {
            dataField: 'EntityType',
            caption: 'Type',
            alignment: null,
            visible: true,
            dataType: 'string',
          },
        ];

        gridObject[list.moduleId] = defaultColumn;

        list.dynamicColumnList.forEach((column) => {
          const dynamicColumn = {
            dataField: column,
            caption: column,
            alignment: null,
            visible: true,
            dataType: 'string',
          };
          gridObject[list.moduleId].push(dynamicColumn);
        });
      } else {
        gridObject[list.moduleId] = [];
      }

      this.columnsObject = gridObject;
    });
    this.navigationRightsDataLoading = false;
  }

  private getErrorMessageList(): void {
    if (this.userListResolved.error) {
      this.errorMessageList.push(
        'UserListError: ' + this.userListResolved.error
      );
    }
    if (this.groupListResolved.error) {
      this.errorMessageList.push(
        'GroupListError: ' + this.groupListResolved.error
      );
    }
    if (this.moduleListResolved.error) {
      this.errorMessageList.push(
        'ModuleListError: ' + this.moduleListResolved.error
      );
    }
  }

  private getCurrentDate(): string {
    const date = new Date();
    return this.datepipe.transform(date, this.dateFormat);
  }
}
