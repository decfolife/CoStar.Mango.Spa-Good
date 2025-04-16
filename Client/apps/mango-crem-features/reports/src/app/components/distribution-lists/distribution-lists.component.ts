import { Component, Inject, LOCALE_ID, numberAttribute, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from "devextreme-angular";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { DistributionListsService } from './distribution-lists.service';
import { SharedService } from '@reports/shared/services/shared.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import dxCheckBox, { InitializedEvent } from 'devextreme/ui/check_box';
import { trigger } from 'devextreme/events';
import DataGrid from "devextreme/ui/data_grid";
import { formatDate } from '@angular/common';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver-es';
import { Buffer } from 'exceljs';
import { DistributionList, DistributionListKeys } from '@mango/data-models/lib-data-models';
import { AddEditDistributionListComponent } from './add-edit-distribution-list/add-edit-distribution-list.component';

@Component({
  selector: 'mango-distribution-lists',
  templateUrl: './distribution-lists.component.html',
  styleUrls: ['./distribution-lists.component.scss']
})
export class DistributionListsComponent {

  @ViewChild("DistributionListDataGrid") distributionListDataGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;

  isExpanded: boolean = false;
  dataRetrieved: boolean = false;
  searchText: string = "";
  selectAllCheckBox: dxCheckBox;
  selectedDistLists: any[] = [];
  selectedDistListIds: number[] = [];
  navigationButtonsObserver: MutationObserver;
  pagingButtonsObserver: MutationObserver;
  distListSelected: boolean = false;
  searchTextSubject = new Subject<string>();
  userModuleAddRights: boolean;
  selectedMemberIds: number[] = [];
  selectedMembersData: DistributionListKeys[] = [];
  expandedRows: number[] = [];
  collapsedRows: number[] = [];
  distributionListTobeRemoved: number[] = [];
  distributionListsData: DistributionList [] = []; 
  private localID: string;
  private subs: Subscription[] = [];
  activeFilterCount$ = new BehaviorSubject<number>(0);


  constructor(private distributionListsService: DistributionListsService,
    private dialogService: MangoDialogService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    @Inject( LOCALE_ID ) localID: string ) {
      this.localID = localID;

      this.subs.push(
        this.searchTextSubject
          .pipe(debounceTime(500), distinctUntilChanged())
          .subscribe((value) => {
            this.searchDataGrid(value);
          })
      );
  }

  ngOnInit() {
    this.getUserPreferences();
    this.getDistributionListsData();
  }

  toggleExpanded () {
		this.isExpanded = !this.isExpanded;
    this.expandedRows = [];
    this.collapsedRows = [];
	}

  searchDataGrid(data) {
    this.searchText = data;
		this.distributionListDataGrid.instance.searchByText(data);
	}

  clearAllFilters(event) {
    this.distributionListDataGrid.instance.clearFilter()
    this.distributionListDataGrid.instance.searchByText(this.searchText);
    this.activeFilterCount$.next(0);
    event.preventDefault();
  }

  onOptionChanged(event: any) {
    this.activeFilterCount$.next(this.getFiltersCount());
  }

  getLatestData() {
    this.getDistributionListsData();
  }

  private getFiltersCount(): number {
    const src = this.distributionListDataGrid?.instance?.state()?.filterValue || [];

    if (src.indexOf('=') === 1) {
      // single filter against a string column
      return 1;
    }

    const o = src.filter((v) => {
      return Array.isArray(v);
    });

    return o.length;
  }


  addEditDistributionList(tFunc: string, editDistributionListData?: DistributionList) {
    let distList = <DistributionList>{};
    let distListNames = [];
    if (tFunc == 'edit') {
      distList = editDistributionListData;
      let tempDistributionLists = this.distributionListsData.filter(
        (tempDistList) => tempDistList.groupID != distList.groupID
      );
        distListNames = tempDistributionLists.map((distList) =>
        distList.groupName.toLowerCase().trim()
      );
    } else {
        distListNames = this.distributionListsData.map((distList) =>
          distList.groupName.toLowerCase().trim()
      );
    }

    let dialogRef = this.dialog.open(AddEditDistributionListComponent, {
      height: '600px',
      width: '2000px',
      panelClass: 'addEditDistributionListModal',
      data: {
        typeFunction: tFunc,
        distributionList: distList,
        distributionListNames: distListNames,
      },
      disableClose: true,
    });

    this.subs.push(
      dialogRef
        .afterClosed()
        .pipe(
          filter((res) => !!res),
        )
        .subscribe(() => this.getDistributionListsData())
    );
  }

  deleteDistributionLists(removeDistributionList?: DistributionList, singleDistributionList?: boolean) {
    this.distributionListTobeRemoved = [];
    let confirmText =
      'You are about to delete the following distribution list(s). Do you want to continue ?\n\n';
    if (singleDistributionList) {
      confirmText += removeDistributionList.groupName + '\n';
      this.distributionListTobeRemoved.push(removeDistributionList.groupID);
    } else {
      this.distributionListTobeRemoved = this.selectedDistListIds;
      this.selectedDistLists.forEach((distList) => {
        confirmText += distList.groupName + '\n';
      });
    }

    this.subs.push(
      this.dialogService
        .confirm('Distribution Lists Deletion', confirmText, 'Confirm', 'Cancel')
        .pipe(
          filter((confirmed) => !!confirmed),
          switchMap((_) => 
            this.distributionListsService.deleteDistributionLists(this.distributionListTobeRemoved)
          ))
        .subscribe((res) => {
          if (res.success && !singleDistributionList) {
            this.selectedDistListIds = [];
            this.selectedDistLists = [];
          }
          return res.success
            ? (this.distributionListsService.successNotify(
                'Selected distribution list(s) successfully removed.'
              ),
              this.getDistributionListsData())
            : of(
                this.distributionListsService.errorNotify(
                  'The distribution lists(s) could not be deleted. Please review and try again.'
                )
              );
        })
    );
  }

  removeMembers() {
    let removingAllDistributionListMembers = false;
    let confirmText = `Do you want to remove the selected members from their distribution list?\n\n`
    this.selectedMembersData.forEach((selectedDistributionList) => {
      const index = this.distributionListsData.findIndex(
        (distList) => distList.groupID == selectedDistributionList.groupID
      );

      if (this.distributionListsData[index].members.length == selectedDistributionList.memberIds.length) {
        removingAllDistributionListMembers = true;
      } else {
        if (selectedDistributionList.memberIds.length > 0) {
          selectedDistributionList.memberIds.forEach(memId => {
            const memberObj = this.distributionListsData[index].members.find(member => member.memberID === memId);
            confirmText += memberObj.name + '\n';
          })
        }
      }
    });

    if (removingAllDistributionListMembers) {
      this.subs.push(
        this.dialogService
          .alert(
            'Remove All Distribution List Members!',
            `Distribution list member removal can not be done. You have selected all members for one or more distribution lists.  At least one member must be assigned to a distribution list.`,
            'OK'
          )
          .subscribe()
      );
    } else {
      this.subs.push(
        this.dialogService
          .confirm(
            'Remove Members',
            confirmText,
            'Confirm',
            'Cancel'
          )
          .pipe(
            filter((confirmed) => !!confirmed),
            switchMap((_) =>
              this.distributionListsService.deleteMembers(this.selectedMemberIds)
            )
          )
          .subscribe((res) =>
            !!res.success
              ? (this.distributionListsService.successNotify(
                  'Selected member(s) successfully removed.'
                ),
                this.getDistributionListsData())
              : this.dialogService.alert(
                  'Distribution List Member Removal',
                  'Selected member(s) could not be deleted. Please review and try again later.',
                  'OK'
                )
          )
      );
    }
  }

  selectedMembers(e) {
    this.selectedMemberIds = this.selectedMemberIds.concat(e);
  }

  unSelectedMembers(e) {
    this.selectedMemberIds = this.selectedMemberIds.filter(
      (item) => !e.includes(item)
    );
  }

  onEditorPreparing(e) {
    if (e.type !== 'selection') return;
    if (e.parentType === 'headerRow') {
      e.editorOptions.onInitialized = (e: InitializedEvent) => {
        if (e.component) this.selectAllCheckBox = e.component;
      };
    }
  }

  exportToFile() {
    let excelFileName =
      'DistributionLists_' +
      formatDate(new Date(), 'yyyy-MM-dd_HHmmss', 'en-US') +
      '.xlsx';
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Distribution Lists');
    worksheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };

    let masterRows = [];
    this.distributionListDataGrid.instance
      .getDataSource()
      .items()
      .forEach((value, index) => {
        masterRows.push({ rowIndex: index, data: value });
      });

    const borderStyle = { style: 'thin', color: { argb: 'FF7E7E7E' } };
    const insertRow = (currentIndex, outlineLevel) => {
      const row = worksheet.insertRow(currentIndex, [], 'n');

      for (var j = worksheet.rowCount + 1; j > currentIndex; j--) {
        worksheet.getRow(j).outlineLevel = worksheet.getRow(j - 1).outlineLevel;
      }
      row.outlineLevel = outlineLevel;
      return row;
    };

    let rowIndex = 1;
    const distributionListCaptions = [
      'Group ID',
      'Name',
      'Members',
      'Modified By',
      'Modified Date',
      'Created By',
      'Created Date',
      'Rights',
    ];
    let row = insertRow(rowIndex, 1);
    distributionListCaptions.forEach((mainCaption, currentColumnIndex) => {
      Object.assign(row.getCell(currentColumnIndex + 1), {
        value: mainCaption,
        font: { bold: true },
      });
    });

    for (var i = 0; i < masterRows.length; i++) {
      rowIndex++;
      let row = insertRow(rowIndex, 1);

      let distListData = this.distributionListsData.find(
        (item) => item.groupID === masterRows[i].data.groupID
      );
      const distributionListColumns = [
        'groupID',
        'groupName',
        'membersCount',
        'modifiedBy',
        'modifiedDate',
        'createdBy',
        'createdDate',
        'securityLevel',
      ];

      distributionListColumns.forEach((columnName, currentColumnIndex) => {
        let distListDataValue = columnName === 'modifiedDate' || columnName === 'createdDate' ? 
          formatDate(distListData[columnName], this.distributionListsService.dateFormat, this.localID) : distListData[columnName]; 
        Object.assign(row.getCell(currentColumnIndex + 1), {
          value: distListDataValue,
        });
      });

      rowIndex++;
      row = insertRow(rowIndex, 2);
      Object.assign(row.getCell(1), {
        value: 'Distribution List Members',
        font: { bold: true },
      });
      let memberCaptions = [];
        memberCaptions = [
          'Name',
          'Company',
          'Email',
        ];
      worksheet.mergeCells(
        row.number,
        1,
        row.number,
        memberCaptions.length + 1
      );
      row.hidden = true;

      rowIndex++;
      row = insertRow(rowIndex, 2);
      memberCaptions.forEach((caption, currentColumnIndex) => {
        Object.assign(row.getCell(currentColumnIndex + 2), {
          value: caption,
          font: { bold: true },
          border: {
            bottom: borderStyle,
            left: borderStyle,
            right: borderStyle,
            top: borderStyle,
          },
        });
      });
      row.hidden = true;

      let memberColumns = [];
        memberColumns = [
          'name',
          'company',
          'email',
        ];
      this.distributionListsData
        .filter((distList) => distList.groupID === distListData.groupID)[0]
        .members.forEach((member, index) => {
          rowIndex++;
          row = insertRow(rowIndex, 2);
          row.hidden = true;
          memberColumns.forEach((columnName, currentColumnIndex) => {
            Object.assign(row.getCell(currentColumnIndex + 2), {
              value: member[columnName],
              border: {
                bottom: borderStyle,
                left: borderStyle,
                right: borderStyle,
                top: borderStyle,
              },
            });
          });
        });
    }

    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column['eachCell']({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    workbook.xlsx.writeBuffer().then((buffer: Buffer) => {
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        excelFileName
      );
    });
  }

  onFocusedCellChanging(e) {
    if (e.newColumnIndex === 0) {
      const previousRow = e.cellElement[0].parentElement.previousSibling;
      if (!previousRow) return;
      if (previousRow.classList.contains('dx-master-detail-row')) {
        e.cancel = true;
        const $detailGrid =
          previousRow.querySelector('.dx-datagrid').parentElement;
        const detailGrid = DataGrid.getInstance($detailGrid) as DataGrid;

        trigger($detailGrid, 'focusout');

        const firstHeaderElement = detailGrid
          .element()
          .querySelector(
            '.dx-header-row td[role="gridcell"] div.dx-widget.dx-checkbox.dx-select-checkbox'
          );
        (firstHeaderElement as HTMLElement).focus();
      }
    }
  }

  onContentReady(e) {
    let rowsToChange: number[] = this.expandedRows;

    if(this.isExpanded) {
      rowsToChange = this.collapsedRows;
    }

    for (var i = 0; i < rowsToChange.length; i++){
      if(this.isExpanded) {
        e.component.collapseRow(rowsToChange[i]);
      } else {
        e.component.expandRow(rowsToChange[i]);
      }
    }  
  }

  onRowExpandAndCollapseClick(e, eventType) {
    let addRow: number[] = this.expandedRows; 
    let deleteRow: number[] = this.collapsedRows;

    if (eventType === 'collapsing') {  
      addRow = this.collapsedRows;
      deleteRow = this.expandedRows;
    }  

    addRow.push(e.key);  
    const foundIndex = deleteRow.findIndex(em => em === e.key);

    if (foundIndex >= 0)
      deleteRow.splice(foundIndex, 1);
  }

  gridOnCellPrepared(e) {
    if (e.column.command == 'select') {
      if (e.rowType !== 'header' && !e.data.canDelete) {
        this.hideCheckBoxes(e);
      }
    }
  }

  hideCheckBoxes(e) {
    let htmlCellElement =
      e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];
    var editor = dxCheckBox.getInstance(
      htmlCellElement.querySelector('.dx-select-checkbox')
    );
    if (editor) {
      editor.option('visible', false);
    }
    htmlCellElement.style.pointerEvents = 'none';
  }

  selectedDistListAndMembers(e) {
    if (this.selectedMembersData.length) {
      const index = this.selectedMembersData.findIndex(
        (distList) => distList.groupID == e.groupID
      );
      if (index > -1) {
        this.selectedMembersData[index].memberIds = e.memberIds;
      } else {
        this.selectedMembersData.push(e);
      }
    } else {
      this.selectedMembersData.push(e);
    }
  }

  onSelectionChanged(e: any) {
    const deselectRowKeys: number[] = [];
    const dataGrid = e.component;
    e.selectedRowsData.forEach((row) => {
      if (!row.canDelete) {
        deselectRowKeys.push(row.groupID);
      }
    });
    if (deselectRowKeys.length) {
      dataGrid.deselectRows(deselectRowKeys);
    }

    this.distListSelected = e.selectedRowsData.length ? true : false;
    this.selectAllCheckBox.option('value', this.distListSelected);

    this.selectedDistLists = e.selectedRowsData;
    this.selectedDistListIds = e.selectedRowKeys;
  }

  searchMembersFilterExpression(filterValue) {
    return [
      function (rowData) {
        let strFound = false;
        //Fields to search in the details datasource in order to keep the master record from disappearing when a match
        //is found in the detail grid but not the master grid
        const propertyNameList = [
          'name',
          'company',
          'email',
        ];

        for (var i = 0; i < rowData.members.length; i++) {
          let tm = rowData.members[i];

          for (var j = 0; j < propertyNameList.length; j++) {
            let propertyName = propertyNameList[j];

            if (
              !!tm[propertyName] &&
              tm[propertyName]
                .toString()
                .toLowerCase()
                .indexOf(filterValue.toLowerCase()) >= 0
            ) {
              strFound = true;
              break;
            }
          }

          if (strFound) {
            break;
          }
        }

        return strFound;
      },
      '=',
      true,
    ];
  }

  private getDistributionListsData() {
    this.dataRetrieved = false;
    this.selectedMembersData = [];
    this.selectedMemberIds = [];

    this.subs.push(this.distributionListsService.getDistributionListWithMembers().subscribe(
      (res: any) => {
        if (res && res.success) {
          this.distributionListsData = res.data;
          this.dataRetrieved = true;
        }
        else {
          console.log("ERROR");
          this.distributionListsService.errorNotify("There was an issue with getting the distribution list. Please contact the system administrator.");
        }
      }
    ));
  }

  private getUserPreferences() {
    this.subs.push(this.sharedService.getUserPreferences().pipe(
      filter((res) => !!res && !!res.success),
      map((res) => this.distributionListsService.setUserDateFormat(res.data.isDatesEU))
    ).subscribe());
  }

  }
