import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioMaintenanceService } from './portfolio-maintenance.service';
import { DxTreeListComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver-es';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  faFolderOpen,
  faExclamationCircle,
  faArrowUp,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import { HierarchyDeletionComponent } from '../index/modal/user-deletion/hierarchy-deletion.component';
import { ViewGroupContactsComponent } from './modals/view-group-contacts/view-group-contacts.component';

@Component({
  selector: 'portfolio-maintenance',
  templateUrl: './portfolio-maintenance.component.html',
  styleUrls: ['./portfolio-maintenance.component.scss'],
})
export class PortfolioMaintenanceComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public portfolioMaintenanceData: any[];
  public isExpanded: Boolean = false;
  public deleting: Boolean = true;
  public columns: any;
  public dropdownField: any;
  public basepageUrl: string =
    '/v06/Admin/SecurityMaintenance/SecurityMaintenance.aspx#/';
  public userHaveAdminRights = false;
  public groupLooksUpTooltipVisible = {};
  public isPortfolioTooltipVisible = {};
  public isWarningVisible = {};
  public hidePremise = false;
  public inlineEditDropdownData = [];
  public showInlineDropdown = false;
  public parentDropdownText: string;
  public companyNameInputText: string;
  public loading = true;
  private subscriptions: Subscription[] = [];

  @ViewChild('TreeList') treeList: DxTreeListComponent;

  faFolderOpen = faFolderOpen;
  faExclamationCircle = faExclamationCircle;
  faArrowUp = faArrowUp;
  faEllipsisH = faEllipsisH;

  constructor(
    private route: ActivatedRoute,
    private service: PortfolioMaintenanceService,
    private dialog: MatDialog
  ) {
    const portfolioSubscription = this.service
      .getPortfolioHierarchyList()
      .subscribe((result) => {
        this.portfolioMaintenanceData = result.data.portfolioHierarchies.filter(
          (data) => {
            return data.companyID !== -1;
          }
        );
        this.setCompanyNameDisplay();
        this.hidePremise = result.data.HidePremise;
        this.loading = false;
      });
    this.subscriptions.push(portfolioSubscription);
  }

  ngOnInit() {
    this.setGridcolumns();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private setCompanyNameDisplay() {
    this.portfolioMaintenanceData.forEach((data) => {
      data.companyNameDisplay =
        (data.parentGroup ? data.companyLevelLabel + ': ' : '') +
        data.companyID +
        ' - ' +
        data.companyName +
        (data.isActive ? '' : ' (Archived)');
    });
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.portfolioMaintenanceData.forEach((row) => {
        this.treeList.instance.expandRow(row.companyID);
      });
    } else {
      this.portfolioMaintenanceData.forEach((row) => {
        this.treeList.instance.collapseRow(row.companyID);
      });
    }
  }

  searchTreeList(data) {
    this.treeList.instance.searchByText(data);
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

  public onCellClicked(e): void {
    if (
      !(
        e.event.target.parentElement.classList.contains(
          'dx-treelist-expanded'
        ) ||
        e.event.target.parentElement.classList.contains(
          'dx-treelist-collapsed'
        ) ||
        e.event.target.parentElement.classList.contains(
          'dx-treelist-icon-container'
        ) ||
        e.event.target.parentElement.classList.contains(
          'dx-texteditor-input-container'
        ) ||
        e.event.target.parentElement.classList.contains(
          'dx-treelist-form-buttons-container'
        ) ||
        e.event.target.parentElement.classList.contains('dx-button-content')
      ) &&
      e.column.dataField !== 'Actions'
    ) {
      if (e.data.companyLevel !== 0 && e.data.isActive) {
        this.inlineAddOrEdit(e.rowIndex, e.data, 'edit');
      } else if (e.data.isPortfolio && e.data.isActive) {
        this.redirectToAction(e.data, 'editPortfolio');
      }
    }
  }

  public onCellPrepared(e) {
    if (e.rowType === 'data') {
      if (e.column.dataField === 'Actions') {
        e.cellElement.className += ' not-clickable';
      } else {
        if (
          !(e.data.companyLevel !== 0 && e.data.isActive) &&
          !(e.data.isPortfolio && e.data.isActive)
        ) {
          e.cellElement.className += ' not-clickable';
        }
      }
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

  exportTreeList() {
    const workbook = new ExcelJS.Workbook();
    const portfolioMaintenanceSheet = workbook.addWorksheet('Portfolio', {
      views: [{ showGridLines: false }],
    });
    portfolioMaintenanceSheet.getColumn(2).width = 4;
    portfolioMaintenanceSheet.getColumn(3).width = 4;
    portfolioMaintenanceSheet.getColumn(4).width = 4;
    portfolioMaintenanceSheet.getColumn(5).width = 4;
    portfolioMaintenanceSheet.getColumn(6).width = 4;

    portfolioMaintenanceSheet.getRow(2).getCell(2).value = 'Portfolio';
    portfolioMaintenanceSheet.getRow(2).getCell(2).font = {
      bold: true,
      size: 16,
      underline: 'double',
    };

    portfolioMaintenanceSheet.mergeCells('B4:G4');
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Portfolio Name',
      4,
      2,
      'B4',
      4
    );
    this.setColumnHeaderStyle(portfolioMaintenanceSheet, 'Info', 4, 8, 'H4', 6);
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Master Group ID',
      4,
      9,
      'I4',
      15
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company ID',
      4,
      10,
      'J4',
      12
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Name',
      4,
      11,
      'K4',
      15
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Hierarchy Level1',
      4,
      12,
      'L4',
      24
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Hierarchy Level2',
      4,
      13,
      'M4',
      24
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Hierarchy Level3',
      4,
      14,
      'N4',
      24
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Hierarchy Level4',
      4,
      15,
      'O4',
      24
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Hierarchy Level5',
      4,
      16,
      'P4',
      24
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Level',
      4,
      17,
      'Q4',
      13
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Company Level Label',
      4,
      18,
      'R4',
      24
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Grouping Levels',
      4,
      19,
      'S4',
      15
    );
    this.setColumnHeaderStyle(
      portfolioMaintenanceSheet,
      'Parent Group',
      4,
      20,
      'T4',
      12
    );

    const objectTreeList = this.buildObjectTreeList(
      this.portfolioMaintenanceData
    );

    this.addExportData(portfolioMaintenanceSheet, objectTreeList);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const fileName = 'Portfolios.xlsx';
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        fileName
      );
    });
  }

  private setColumnHeaderStyle(
    portfolioMaintenanceSheet,
    value,
    row,
    column,
    cell,
    rowWidth
  ) {
    portfolioMaintenanceSheet.getColumn(column).width = rowWidth;
    portfolioMaintenanceSheet.getRow(row).getCell(column).value = value;
    portfolioMaintenanceSheet.getRow(row).getCell(column).font = {
      color: { argb: '00558E' },
    };
    portfolioMaintenanceSheet.getRow(row).getCell(column).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd2d2d2' },
      bgColor: { argb: 'd2d2d2' },
    };
    portfolioMaintenanceSheet.getCell(cell).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  }

  private addExportData(portfolioMaintenanceSheet, data) {
    let row = 5;
    let column = 2;
    let maxWidth = 4;

    data.forEach((item) => {
      column = 2;
      if (
        item.data.companyID.toString().length +
          item.data.companyNameDisplay.length -
          17 >
        maxWidth
      ) {
        maxWidth =
          item.data.companyID.toString().length +
          item.data.companyNameDisplay.length -
          17;
      }
      this.addCellData(portfolioMaintenanceSheet, 'B', row, column, item);

      if (item.childItems.length) {
        item.childItems.forEach((childItem1) => {
          row++;
          column = 3;
          if (
            childItem1.data.companyID.toString().length +
              childItem1.data.companyNameDisplay.length -
              13 >
            maxWidth
          ) {
            maxWidth =
              childItem1.data.companyID.toString().length +
              childItem1.data.companyNameDisplay.length -
              13;
          }
          this.addCellData(
            portfolioMaintenanceSheet,
            'C',
            row,
            column,
            childItem1
          );
          if (childItem1.childItems.length) {
            childItem1.childItems.forEach((childItem2) => {
              row++;
              column = 4;
              if (
                childItem2.data.companyID.toString().length +
                  childItem2.data.companyNameDisplay.length -
                  9 >
                maxWidth
              ) {
                maxWidth =
                  childItem2.data.companyID.toString().length +
                  childItem2.data.companyNameDisplay.length -
                  9;
              }
              this.addCellData(
                portfolioMaintenanceSheet,
                'D',
                row,
                column,
                childItem2
              );

              if (childItem2.childItems.length) {
                childItem2.childItems.forEach((childItem3) => {
                  row++;
                  column = 5;
                  if (
                    childItem3.data.companyID.toString().length +
                      childItem3.data.companyNameDisplay.length -
                      5 >
                    maxWidth
                  ) {
                    maxWidth =
                      childItem3.data.companyID.toString().length +
                      childItem3.data.companyNameDisplay.length -
                      5;
                  }
                  this.addCellData(
                    portfolioMaintenanceSheet,
                    'E',
                    row,
                    column,
                    childItem3
                  );
                  if (childItem3.childItems.length) {
                    childItem3.childItems.forEach((childItem4) => {
                      row++;
                      column = 6;
                      if (
                        childItem4.data.companyID.toString().length +
                          childItem4.data.companyNameDisplay.length -
                          1 >
                        maxWidth
                      ) {
                        maxWidth =
                          childItem4.data.companyID.toString().length +
                          childItem4.data.companyNameDisplay.length -
                          1;
                      }
                      this.addCellData(
                        portfolioMaintenanceSheet,
                        'F',
                        row,
                        column,
                        childItem4
                      );
                      if (childItem4.childItems.length) {
                        childItem4.childItems.forEach((childItem5) => {
                          row++;
                          column = 7;
                          if (
                            childItem5.data.companyID.toString().length +
                              childItem5.data.companyNameDisplay.length +
                              3 >
                            maxWidth
                          ) {
                            maxWidth =
                              childItem5.data.companyID.toString().length +
                              childItem5.data.companyNameDisplay.length +
                              3;
                          }
                          this.addCellData(
                            portfolioMaintenanceSheet,
                            'G',
                            row,
                            column,
                            childItem5
                          );
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
      row++;
    });

    portfolioMaintenanceSheet.getColumn(7).width = maxWidth;
  }

  private addCellData(portfolioMaintenanceSheet, nameCell, row, column, item) {
    portfolioMaintenanceSheet.getRow(row).getCell(column).value =
      item.data.companyNameDisplay;
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'I',
      row,
      9,
      'masterGroupID',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'J',
      row,
      10,
      'companyID',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'K',
      row,
      11,
      'companyName',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'L',
      row,
      12,
      'companyHierarchyLevel1',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'M',
      row,
      13,
      'companyHierarchyLevel2',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'N',
      row,
      14,
      'companyHierarchyLevel3',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'O',
      row,
      15,
      'companyHierarchyLevel4',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'P',
      row,
      16,
      'companyHierarchyLevel5',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'Q',
      row,
      17,
      'companyLevel',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'R',
      row,
      18,
      'companyLevelLabel',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'S',
      row,
      19,
      'groupingLevels',
      item.data
    );
    this.setCellDataAndStyle(
      portfolioMaintenanceSheet,
      'T',
      row,
      20,
      'parentGroup',
      item.data
    );

    // adding info column data
    let infoValue = '';

    if (item.data.groupLooksUp === 1) {
      infoValue += 'G';
    }

    if (item.data.companyLevel === 0) {
      if (infoValue) {
        infoValue += ' ';
      }
      infoValue += 'P';
    }

    portfolioMaintenanceSheet.getRow(row).getCell(8).value = infoValue;
    portfolioMaintenanceSheet.getRow(row).getCell(8).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    portfolioMaintenanceSheet.mergeCells(nameCell + row + ':G' + row);
    portfolioMaintenanceSheet.getCell(nameCell + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    portfolioMaintenanceSheet.getCell('H' + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  }

  public setCellDataAndStyle(
    portfolioMaintenanceSheet,
    nameCell,
    row,
    column,
    columnName,
    data
  ) {
    portfolioMaintenanceSheet.getRow(row).getCell(column).value =
      data[columnName];
    portfolioMaintenanceSheet.getCell(nameCell + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    const columnWidth = portfolioMaintenanceSheet.getColumn(column).width;
    if (data[columnName]?.length > columnWidth) {
      portfolioMaintenanceSheet.getColumn(column).width =
        data[columnName].length;
    }
  }

  public inlineAddOrEdit(rowIndex, data, action) {
    switch (action) {
      case 'addSubPortfolio': {
        this.parentDropdownText = data.companyLevelLabel;
        this.service
          .getCompanyHierarchyLabels(data.masterGroupID)
          .subscribe((result) => {
            const hierarchyLabel = result.data.find((label) => {
              return label.companyHierarchyLabelOrder === data.companyLevel + 1;
            });
            this.companyNameInputText =
              hierarchyLabel?.companyHierarchyLabelDesc;

            this.setInlineDropdownDisplayCondition(data);
            setTimeout(() => {
              this.treeList.instance.addRow(data.companyID);
            });
          });
        break;
      }

      case 'edit': {
        const index = this.portfolioMaintenanceData.findIndex((item) => {
          return item.companyID === data.parentGroup;
        });
        const selectedData = this.portfolioMaintenanceData[index];
        this.companyNameInputText = data.companyLevelLabel;
        this.parentDropdownText = selectedData.companyLevelLabel;
        this.setInlineDropdownDisplayCondition(selectedData);
        setTimeout(() => {
          this.treeList.instance.editRow(rowIndex);
        });

        break;
      }
      default: {
        break;
      }
    }
  }

  public setInlineDropdownDisplayCondition(data) {
    if (data.companyLevel === 0) {
      this.showInlineDropdown = false;
    } else {
      this.inlineEditDropdownData = this.portfolioMaintenanceData.filter(
        (item) => {
          return item.parentGroup === data.parentGroup;
        }
      );
      this.showInlineDropdown = true;
    }
  }

  public onRowUpdated(event, action) {
    const request = {
      name: '',
      parentCompanyId: '',
      masterGroupId: 0,
      level: 0,
      action: '',
    };
    let parentItem;

    request.name = event.data.companyName;
    request.parentCompanyId = event.data.parentGroup.toString();
    if (action === 'add') {
      event.data.isActive = true;
      parentItem = this.portfolioMaintenanceData.find((item) => {
        return event.data.parentGroup === item.companyID;
      });
      request.level = (parentItem.companyLevel + 1).toString();
      request.masterGroupId = parentItem.masterGroupID;
      request.action = 'add';
    } else {
      request.level = event.data.companyLevel.toString();
      request.masterGroupId = event.data.companyID;
      request.action = 'edit';
    }

    this.service.saveSubHierarchy(request).subscribe(() => {
      this.service.getPortfolioHierarchyList().subscribe((result) => {
        this.portfolioMaintenanceData = result.data.portfolioHierarchies.filter(
          (data) => {
            return data.companyID !== -1;
          }
        );
        this.setCompanyNameDisplay();
        this.treeList.instance.refresh();
      });
    });
  }

  public isPortfolio(data: any) {
    return data.companyLevel === 0 ? true : false;
  }

  public redirectToAction(data, action) {
    let basewebPage: string = '/PortfolioMaintenanceWithNav.aspx';
    let route: string = '';
    switch (action) {
      case 'addPortfolio': {
        route = `${this.basepageUrl}editPortfolio/0/0${basewebPage}`;
        break;
      }
      case 'editPortfolio': {
        route = `${this.basepageUrl}editPortfolio/${data.masterGroupID}/${
          data.companyID + basewebPage
        }`;
        break;
      }
      case 'showData': {
        route = `${this.basepageUrl}${
          this.isPortfolio(data)
            ? 'portfolioAssociatedObjects'
            : 'noPortfolioAssociatedObjects'
        }/${data.masterGroupID}/${data.companyID + basewebPage}`;
        break;
      }
      case 'changeCurrency': {
        route = `/v06/Admin/Portfolio/EditCurrencies.aspx?GroupID=${data.masterGroupID}&From=HierMaint&KeyID=${data.companyID}&pgMode=Edit`;
        break;
      }
      //delete company/sub-hierarchy
      // case 'delete': {
      //   route = `${this.basepageUrl}DeleteHierarchy.aspx?MasterGroupID=${data.masterGroupID}}&CompanyID=${data.companyID}`
      //   break;
      // }
    }
    window.location.href = route;
    return false;
  }

  public viewContacts(data) {
    this.service.getGroupContacts(data.masterGroupID).subscribe((result) => {
      this.openViewContactModal(result.data?.contacts);
    });
  }

  public deleteOrArchiveData(data) {
    let isPortfolio = this.isPortfolio(data);
    let errorObject: any = {
      isNotAuthorized: false,
      isServerError: false,
      hasRightsLinked: false,
      rights: '',
    };
    if (isPortfolio) {
      const modalConfiguration = {
        modalTitle: 'Archive Portfolio',
        modalConfirmationButtonText: 'Confirm',
        modalCancelButtonText: 'Cancel',
      };

      if (!data.isActive) {
        modalConfiguration.modalTitle = 'Delete Portfolio';
        this.openDeleteModal(
          data,
          true,
          false,
          modalConfiguration,
          errorObject,
          '600px'
        );
      } else {
        /*possible use cases
                1.	Happy path – 200 OK
                2.	If user does not have admin or greater rights 
                3.	Server error when SQL fails in the archive proc (catch all)
                4.	Portfolio has some module rights linked to it and cannot be archived. The popup message shows what objects are linked 
              */
        this.service
          .archivePortfolio(data.masterGroupID)
          .subscribe((result) => {
            if (!result.success) {
              //clientErrorMessage has the status code of the error
              switch (result.statusCode) {
                // use case 4 - bad request
                case 400: {
                  errorObject.hasRightsLinked = true;
                  errorObject.rights = result.clientErrorMessage;

                  modalConfiguration.modalConfirmationButtonText = '';
                  modalConfiguration.modalCancelButtonText = 'Close';
                  break;
                }
                // use case 2
                case 403: {
                  errorObject.isNotAuthorized = true;

                  modalConfiguration.modalConfirmationButtonText = '';
                  modalConfiguration.modalCancelButtonText = 'Close';
                  break;
                }
                //use case 3
                default:
                case 500: {
                  errorObject.isServerError = true;

                  modalConfiguration.modalConfirmationButtonText = '';
                  modalConfiguration.modalCancelButtonText = 'Close';
                  break;
                }
              }
            }

            const canDelete = !(
              errorObject.hasRightsLinked ||
              errorObject.isNotAuthorized ||
              errorObject.isServerError
            );
            let width = '400px';
            if (canDelete) {
              width = '600px';
            }

            this.openDeleteModal(
              data,
              true,
              false,
              modalConfiguration,
              errorObject,
              width
            );
          });
      }
    } else {
      this.service
        .hasData(data.parentGroup, data.companyID, isPortfolio)
        .subscribe((result) => {
          const hasData = result.data;
          const modalConfiguration = {
            modalTitle: 'Delete Hierarchy',
            modalConfirmationButtonText: 'Confirm',
            modalCancelButtonText: 'Cancel',
          };
          let width = '400px';
          if (hasData) {
            modalConfiguration.modalConfirmationButtonText = '';
            modalConfiguration.modalCancelButtonText = 'Close';
            width = '600px';
          }
          this.openDeleteModal(
            data,
            false,
            hasData,
            modalConfiguration,
            errorObject,
            width
          );
        });
    }
  }

  public openViewContactModal(data) {
    let dialogRef = this.dialog.open(ViewGroupContactsComponent, {
      width: '600px',
      panelClass: 'view-contact-modal',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public openDeleteModal(
    data,
    isPortfolio,
    hasData,
    modalConfiguration,
    errorObject,
    width
  ) {
    const modalObject = {
      isPortfolio,
      hasData,
      data,
      showConfirm: !hasData,
      modalConfiguration,
      errorObject,
    };
    let dialogRef = this.dialog.open(HierarchyDeletionComponent, {
      width: width,
      panelClass: 'portfolio-maintenance-deletion-modal',
      data: modalObject,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleting = true;
        if (!result.isPortfolio) {
          //path for deleting hierarchy
          this.service
            .deleteCompany(data.parentGroup, data.companyID, isPortfolio)
            .subscribe(() => {
              this.deleting = false;
            });
          const index = this.portfolioMaintenanceData.findIndex((item) => {
            return (
              item.companyID.toString() === result.data.companyID?.toString() &&
              !(item.companyLevel === 0)
            );
          });
          this.portfolioMaintenanceData.splice(index, 1);
        } else {
          //path for deleting portfolio
          const index = this.portfolioMaintenanceData.findIndex((item) => {
            return (
              item.companyID.toString() === result.data.companyID?.toString()
            );
          });
          if (result.data.isActive) {
            //service call involving archiving portfolio go here
            this.service
              .archivePortfolio(data.masterGroupID, true)
              .subscribe(() => {
                // Align the UI for the archived row without refreshing the grid
                this.portfolioMaintenanceData[index].enableArchivePortfolio =
                  false;
                this.portfolioMaintenanceData[index].enableDeletePortfolio =
                  true;

                //archive company in ui if company is active
                this.portfolioMaintenanceData[index].isActive = false;
                this.setCompanyNameDisplay();
              });
          } else {
            this.service
              .deletePortfolio(
                data.masterGroupID,
                result.deleteAllContactsAndGroups,
                data.companyName
              )
              .subscribe(() => {});
            this.portfolioMaintenanceData.splice(index, 1);
          }
        }
      }
    });
  }

  public toggleGroupLooksUp(id, state) {
    if (state === 'on') {
      this.groupLooksUpTooltipVisible[id] = true;
    } else {
      this.groupLooksUpTooltipVisible[id] = false;
    }
  }

  public toggleIsPortfolio(id, state) {
    if (state === 'on') {
      this.isPortfolioTooltipVisible[id] = true;
    } else {
      this.isPortfolioTooltipVisible[id] = false;
    }
  }

  public toggleExclaimation(id, state) {
    if (state === 'on') {
      this.isWarningVisible[id] = true;
    } else {
      this.isWarningVisible[id] = false;
    }
  }

  private setGridcolumns() {
    this.columns = [
      {
        dataField: 'companyName',
        caption: 'Portfolio Name',
        visible: false,
      },
      {
        dataField: 'companyNameDisplay',
        caption: 'Portfolio Name',
      },
      {
        dataField: 'lookUpText',
        visible: false,
      },
    ];
  }

  private buildObjectTreeList(data) {
    const objectTreeList = [];
    const parentItems = data.filter((item) => {
      return !item.parentGroup;
    });

    parentItems.forEach((item) => {
      const childItems = this.findChildItemArray(item.companyID);
      const parentItems = {
        data: item,
        childItems: childItems,
      };
      objectTreeList.push(parentItems);
    });

    return objectTreeList;
  }

  private findChildItemArray(parentID) {
    const chilItems = this.portfolioMaintenanceData.filter((item) => {
      return parentID === item.parentGroup;
    });

    if (chilItems.length) {
      const childObjectArray = [];
      chilItems.forEach((childItem) => {
        const child = this.findChildItemArray(childItem.companyID);
        const chilItemsObject = {
          data: childItem,
          childItems: child,
        };
        childObjectArray.push(chilItemsObject);
      });
      return childObjectArray;
    } else {
      return [];
    }
  }

  public addADAAttributes(e) {
    setTimeout(() => {
      const spanElement = e.element.querySelector(
        '.dx-header-filter.dx-header-filter-empty'
      );
      if (spanElement) {
        const caption = e.component.columnOption(1, 'caption');
        spanElement.setAttribute(
          'aria-label',
          'Show filter options for column ' + caption + ' button sub menu'
        );
        spanElement.setAttribute('role', 'button');
        spanElement.setAttribute('aria-haspopup', 'dialog');
        spanElement.setAttribute('aria-expanded', 'false');
      }
    });
  }
}
