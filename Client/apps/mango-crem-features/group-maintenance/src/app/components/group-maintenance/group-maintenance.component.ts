import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowUp, faFolderOpen, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { DxTreeListComponent } from 'devextreme-angular';
import { GroupMaintenanceService } from './group-maintenance.service';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver-es';

@Component({
  selector: 'group-maintenance',
  templateUrl: './group-maintenance.component.html',
  styleUrls: ['./group-maintenance.component.scss']
})
export class GroupMaintenanceComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public groupMaintenanceData: any[];
  public isExpanded: Boolean = false;
  public columns: any;
  public dropdownField: any;
  public selectedParentItem: any = {};
  public testID = 290;
  public basepageUrl: string = '/v06/Admin/SecurityMaintenance/SecurityMaintenance.aspx#/';
  public userHaveAdminRights = false;
  public groupLooksUpTooltipVisible = {};
  public groupLooksUpTooltipVisibleDelay = {};
  public isPortfolioTooltipVisible = {};
  public isPortfolioTooltipVisibleDelay = {};

  faArrowUp = faArrowUp;
  faFolderOpen = faFolderOpen;
  faEllipsisH = faEllipsisH;

  @ViewChild("TreeList") treeList: DxTreeListComponent;

  constructor(
    private route: ActivatedRoute,
    private service: GroupMaintenanceService
  ) { }

  ngOnInit() {
    this.setGridcolumns();
    this.getUserHaveAdminRights();
    this.getGroupList()
  }

  private setCompanyNameDisplay() {
    this.groupMaintenanceData.forEach((data) => {
      data.companyNameDisplay = "(" + data.companyID + ") " + data.companyName;
    })
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.groupMaintenanceData.forEach(row => {
        this.treeList.instance.expandRow(row.companyID)
      });
    } else {
      this.groupMaintenanceData.forEach(row => {
        this.treeList.instance.collapseRow(row.companyID)
      });
    }
  }

  searchTreeList(data) {
    this.treeList.instance.searchByText(data);
  }

  exportTreeList() {
    const workbook = new ExcelJS.Workbook();
    const groupMaintenanceSheet = workbook.addWorksheet('Security Groups', { views: [{ showGridLines: false }] });
    groupMaintenanceSheet.getColumn(2).width = 4;
    groupMaintenanceSheet.getColumn(3).width = 4;
    groupMaintenanceSheet.getColumn(4).width = 4;
    groupMaintenanceSheet.getColumn(5).width = 4;
    groupMaintenanceSheet.getColumn(6).width = 4;

    groupMaintenanceSheet.getRow(2).getCell(2).value = 'Security Groups';
    groupMaintenanceSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

    groupMaintenanceSheet.mergeCells("B4:G4")
    this.setColumnHeaderStyle(groupMaintenanceSheet, "Group Name", 4, 2, "B4");
    this.setColumnHeaderStyle(groupMaintenanceSheet, "Portfolio", 4, 8, "H4");
    this.setColumnHeaderStyle(groupMaintenanceSheet, "Looks Up", 4, 9, "I4");

    const objectTreeList = this.buildObjectTreeList(this.groupMaintenanceData);

    this.addExportData(groupMaintenanceSheet, objectTreeList);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const fileName = 'Security Groups.xlsx'
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
    });
  }

  public onCellClicked(e): void {
    if (!(e.event.target.parentElement.classList.contains("dx-treelist-expanded") || e.event.target.parentElement.classList.contains("dx-treelist-collapsed") || e.event.target.parentElement.classList.contains("dx-treelist-icon-container")) && e.column.dataField !== "Actions") {  
      this.redirectToAction(e.data.companyID, e.data.portfolio, 'edit')
    }
  }

  public onCellPrepared(e) {
    if (e.rowType == "data" && e.column.dataField === "Actions") {
      e.cellElement.className += " not-clickable";  
    }
  }

  private setColumnHeaderStyle(groupMaintenanceSheet, value, row, column, cell) {
    groupMaintenanceSheet.getRow(row).getCell(column).value = value;
    groupMaintenanceSheet.getRow(row).getCell(column).font = { color: { argb: '00558E' } }
    groupMaintenanceSheet.getRow(row).getCell(column).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
    groupMaintenanceSheet.getCell(cell).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  }

  private addExportData(groupMaintenanceSheet, data) {
    let row = 5;
    let column = 2;
    let maxWidth = 4;

    data.forEach((item) => {
      column = 2;
      if (item.data.companyID.toString().length + item.data.companyName.length - 17 > maxWidth) {
        maxWidth = item.data.companyID.toString().length + item.data.companyName.length - 17;
      }
      this.addCellData(groupMaintenanceSheet, "B", row, column, item)

      if (item.childItems.length) {
        item.childItems.forEach((childItem1) => {
          row++;
          column = 3;
          if (childItem1.data.companyID.toString().length + childItem1.data.companyName.length - 13 > maxWidth) {
            maxWidth = childItem1.data.companyID.toString().length + childItem1.data.companyName.length - 13;
          }
          this.addCellData(groupMaintenanceSheet, "C", row, column, childItem1)
          if (childItem1.childItems.length) {
            childItem1.childItems.forEach((childItem2) => {
              row++;
              column = 4;
              if (childItem2.data.companyID.toString().length + childItem2.data.companyName.length - 9 > maxWidth) {
                maxWidth = childItem2.data.companyID.toString().length + childItem2.data.companyName.length - 9;
              }
              this.addCellData(groupMaintenanceSheet, "D", row, column, childItem2)
              
              if (childItem2.childItems.length) {
                childItem2.childItems.forEach((childItem3) => {
                  row++;
                  column = 5;
                  if (childItem3.data.companyID.toString().length  + childItem3.data.companyName.length - 5 > maxWidth) {
                    maxWidth = childItem3.data.companyID.toString().length  + childItem3.data.companyName.length - 5;
                  }
                  this.addCellData(groupMaintenanceSheet, "E", row, column, childItem3)
                  if (childItem3.childItems.length) {
                    childItem3.childItems.forEach((childItem4) => {
                      row++;
                      column = 6;
                      if (childItem4.data.companyID.toString().length  + childItem4.data.companyName.length -1 > maxWidth) {
                        maxWidth = childItem4.data.companyID.toString().length  + childItem4.data.companyName.length - 1;
                      }
                      this.addCellData(groupMaintenanceSheet, "F", row, column, childItem4)
                      if (childItem4.childItems.length) {
                        childItem4.childItems.forEach((childItem5) => {
                          row++;
                          column = 7;
                          if (childItem5.data.companyID.toString().length + childItem5.data.companyName.length + 3 > maxWidth) {
                            maxWidth = childItem5.data.companyID.toString().length + childItem5.data.companyName.length + 3;
                          }
                          this.addCellData(groupMaintenanceSheet, "G", row, column, childItem5)
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
      row++
    })

    groupMaintenanceSheet.getColumn(7).width = maxWidth;
  }

  private addCellData(groupMaintenanceSheet, nameCell, row, column, item) {
    groupMaintenanceSheet.getRow(row).getCell(column).value = "(" + item.data.companyID + ") " + item.data.companyName;
    if (item.data.portfolio === item.data.companyID) {
      groupMaintenanceSheet.getRow(row).getCell(8).value = "P";
      groupMaintenanceSheet.getRow(row).getCell(8).alignment = {
        vertical: "middle",
        horizontal: "center"
      }
    }
    if (item.data.groupLooksUp) {
      groupMaintenanceSheet.getRow(row).getCell(9).value = "H";
      groupMaintenanceSheet.getRow(row).getCell(9).alignment = {
        vertical: "middle",
        horizontal: "center"
      }
    }
    groupMaintenanceSheet.mergeCells(nameCell + row + ":G" + row)
    groupMaintenanceSheet.getCell(nameCell + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    groupMaintenanceSheet.getCell('H' + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    groupMaintenanceSheet.getCell('I' + row).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  }

  public add() {
    // adding
  }

  public getUserHaveAdminRights() {
    this.service.getHasAdminLinkRights()
    .subscribe(result => {
      this.userHaveAdminRights = result.data;
    })
  }

  public getGroupList() {
    this.service.getGroupList()
      .subscribe(result => {
        this.groupMaintenanceData = result.data.filter((data) => {
          return data.companyID !== -1;
        });
        
        //need to remove parentGroupID if parentgroupID not part of dataset to render
        this.groupMaintenanceData.forEach((data) => {
          const index = this.groupMaintenanceData.findIndex((itemIndex) => {
            return itemIndex.companyID === data.parentGroupID;
          })
          if (index === -1) {
            data.parentGroupID = null;
          }
        })
        this.setCompanyNameDisplay();
        this.setSearchField();  

      })
  }
  public setSearchField() {
    this.groupMaintenanceData.forEach((data) => {
      let searchField = data.companyNameDisplay;
      if (data.parentGroupID) {
        searchField = this.getParentDisplayName(searchField, data.parentGroupID);
      }
      data.lookUpText = searchField;
    })
  }

  public getParentDisplayName(searchName, id: number) {
    const parentItem = this.groupMaintenanceData.find((item) => {
      return item.companyID === id
    })
    searchName = searchName + ";" + parentItem.companyNameDisplay;
    if (parentItem.parentGroupID) {
      searchName = this.getParentDisplayName(searchName, parentItem.parentGroupID);
    }
    return searchName;
  }

  public redirectToAction(companyId, portfolioId, action) {
    let basewebPage: string = '/GroupMaintenanceWithNav.aspx';
    let route : string = '';
    
    switch(action) { 
      case 'addSubGroup': { 
        route = `${this.basepageUrl}editGroup/11/0${basewebPage}/${companyId.toString()}/11`
        break; 
      } 
      case 'addGroup': { 
        route = `${this.basepageUrl}editGroup/51/0${basewebPage}`
        break; 
      } 
      case 'edit': {
        route = companyId === portfolioId 
                ? `${this.basepageUrl}editPortfolio/${companyId.toString()}/${companyId.toString() + basewebPage}`
                : `${this.basepageUrl}editGroup/11/${companyId.toString() + basewebPage}`
        break; 
      } 
      default: { 
        route = `${this.basepageUrl + action}/11/${companyId.toString() + basewebPage}`
        break; 
      } 
   }
   window.location.href = route;
   return false;

  }
 
  public assignAdminLinks(companyId) {
    // route
    window.location.href = '/v06/Admin/SecurityMaintenance/UserGroupLinks.aspx?GroupID=' 
                            + companyId.toString();
    return false;
  }


  private setGridcolumns() {
    this.columns = [
      {
        dataField: "companyNameDisplay",
        caption: "Group Name",
      },
      {
        dataField: "lookUpText",
        visible: false
      }
    ]
  }

  private buildObjectTreeList(data) {
    const objectTreeList = [];
    const parentItems = data.filter((item) => {
      return !item.parentGroupID;
    })

    parentItems.forEach((item) => {
      const childItems = this.findChildItemArray(item.companyID)
      const parentItems = {
        data: item,
        childItems: childItems
      }
      objectTreeList.push(parentItems)
    })

    return objectTreeList
  }

  private findChildItemArray(parentID) {
    const chilItems = this.groupMaintenanceData.filter((item) => {
      return parentID === item.parentGroupID;
    })

    if (chilItems.length) {
      const childObjectArray = [];
      chilItems.forEach((childItem) => {
        const child = this.findChildItemArray(childItem.companyID)
        const chilItemsObject = {
          data: childItem,
          childItems: child
        }
        childObjectArray.push(chilItemsObject)
      })
      return childObjectArray

    } else {
      return [];
    }
  }

  public toggleGroupLooksUp(id) {
      this.groupLooksUpTooltipVisible[id] = !this.groupLooksUpTooltipVisible[id]
  }

  public toggleIsPortfolio(id) {
      this.isPortfolioTooltipVisible[id] = !this.isPortfolioTooltipVisible[id];
  }
}
