import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPreferences } from '../../shared/models';
import { SharedService } from '../../shared/services/shared.service';
import { BlockedAdminLink } from './group-user-blocked-admin-links.model';
import { GroupUserBlockedAdminLinksService } from './group-user-blocked-admin-links.service';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mango-group-user-blocked-admin-links',
  templateUrl: './group-user-blocked-admin-links.component.html',
  styleUrls: ['./group-user-blocked-admin-links.component.scss']
})
export class GroupUserBlockedAdminLinksComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];

  dateFormat: string;
  blockedAdminLinkData: BlockedAdminLink[];
  columns : Array<any>;

  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;
  @ViewChild('FilterDataGrid') filterDataGrid: DxDataGridComponent;

  constructor(
    public service: GroupUserBlockedAdminLinksService,
    private datepipe: DatePipe,
    private sharedService: SharedService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sharedService.getUserPreferences()
      .subscribe(result => {
        const userPreferences = result.data || {};
        this.dateFormat = userPreferences?.dateFormat || "MM/dd/yyyy"
        this.getColumnContent();
      });

    this.service.getBlockedAdminLinkData()
      .subscribe(result => {
        this.blockedAdminLinkData = result.data;
      });
  }

  public getColumnContent() {
    this.columns = [
			{	
        dataField: "entityType",
				alignment: "left",
				caption: "Group/User",
				visible: true,
        dataType: "string",
        groupIndex: "1"
			},
			{	
        dataField: "id",
				alignment: null,
				visible: true,
				dataType: "string"
			},
			{	
        dataField: "name",
				alignment: null,
				visible: true,
				dataType: "string"
			},
			{
				dataField: "adminSection",
				alignment: null,
				visible: true,
				dataType: "string"
			},
			{	
        dataField: "adminLink",
				alignment: null,
				visible: true,
				dataType: "string"
			},			
			{	
        dataField: "lastModifiedBy",
				alignment: null,
				visible: true,
				dataType: "string"
			},
      {	
        dataField: "lastModifiedDate",
        caption: "Last Modified",
				alignment: null,
				visible: true,
        dataType: "date",
        format: this.dateFormat
			}			
		];
  }

  public searchDataGrid(data) {
		this.dataGrid.instance.searchByText(data);
  }

  public exportGrids() {
    const workbook = new ExcelJS.Workbook();
    const blockedAdminLinksSheet = workbook.addWorksheet('Group and User Blocked Admin Links');
    const filterSheet = workbook.addWorksheet('Filters');

    blockedAdminLinksSheet.getRow(2).getCell(2).value = 'Group and User Blocked Admin Links';
    blockedAdminLinksSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

    const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = { argb: '00558E' }
        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
      }
    }

    const userGroupFilter = this.buildFilterColumns('dataGrid', 'name');
    filterSheet.getRow(2).getCell(2).value = 'Filters';
    filterSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    filterSheet.getRow(4).getCell(2).value = 'Users';
    filterSheet.getRow(4).getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
    filterSheet.getRow(4).getCell(2).font = { bold: true, color: {argb: '00558E'} };
    filterSheet.getRow(4).getCell(3).value = 'Group';
    filterSheet.getRow(4).getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
    filterSheet.getRow(4).getCell(3).font = { bold: true, color: {argb: '00558E'} };

    let userRow = 0;
    let groupRow = 0;
    let userRowWidth = 10;
    let groupRowWidth = 10;
    userGroupFilter.forEach((name) => {
      const nameObj = this.blockedAdminLinkData.find((data) => {
        return data.name === name
      })

      if (nameObj?.entityType === "Group") {
        groupRow++;
        filterSheet.getRow(4 + groupRow).getCell(3).value = name;
        if (userRowWidth < name.length) {
          userRowWidth = name.length
        }
      } else {
        userRow++;
        filterSheet.getRow(4 + userRow).getCell(2).value = name;
        if (groupRowWidth < name.length) {
          groupRowWidth = name.length
        }
      }
    })

    filterSheet.columns[1].width = userRowWidth + 2;
    filterSheet.columns[2].width = groupRowWidth + 2;


    exportDataGrid({
      worksheet: blockedAdminLinksSheet,
      component: this.dataGrid.instance,
      topLeftCell: { row: 4, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setBackground(gridCell, excelCell)
      }
    }).then(() => {
      return exportDataGrid({
        worksheet: filterSheet,
        component: this.filterDataGrid?.instance,
        topLeftCell: { row: 4, column: 2 }
      });
    }).then(() => {
      const date = this.getCurrentDate();
			workbook.xlsx.writeBuffer().then((buffer) => {
				saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Group and User Blocked Admin Links - ' + date +'.xlsx');
			});
		});
  }

  private buildFilterColumns(grid, columnName) {
    
    let selectedItems = [];
    var column = this[grid].instance.columnOption(columnName);
    var filterValues = column.filterValues;

    if (filterValues && filterValues.length) {  
      if (column.filterType !== 'exclude') { 
          selectedItems = filterValues;   
      }  
      else {  
        var filterExpression = [];  
        for (var j = 0; j < filterValues.length; j++) {  
            if (filterExpression.length > 0) {  
                filterExpression.push('or');  
            }  
            filterExpression.push(column.calculateFilterExpression(filterValues[j], '<>'));  
        }  
          
        this[grid].instance.getDataSource().store().load({ filter: filterExpression, group: { selector: column.dataField, isExpanded: false } }).done(function (data) {  
          selectedItems = data.map(function (item) {  
              return item.key;  
          })  
        });  
      }  
    }  
    else {  
      this[grid].instance.getDataSource().store().load({ filter: filterExpression, group: { selector: column.dataField, isExpanded: false } }).done(function (data) {  
        selectedItems = data.map(function (item) {  
            return item.key;  
        })   
      });  
    } 
    return selectedItems;
  }

  private getCurrentDate(): string {
    const date = new Date();
    return this.datepipe.transform(date, this.dateFormat);
  }
}
