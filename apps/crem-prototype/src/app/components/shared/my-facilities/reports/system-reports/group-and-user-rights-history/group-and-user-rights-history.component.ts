import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../../../../../app.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import {saveAs} from 'file-saver-es';

@Component({
	selector: 'group-and-user-rights-history',
	templateUrl: './group-and-user-rights-history.component.html',
	styleUrls: ['./group-and-user-rights-history.component.scss']
})
export class GroupAndUserRightsHistoryComponent implements OnInit {

	data: Array<any>;
	userDataFiltered: Array<any>;
	groupDataFiltered: Array<any>;
	userColumns: Array<any>;
	groupColumns: Array<any>;
	dateFormat = {
		type: 'MM/dd/yyyy'
	}
	periodFrom: any;
	periodTo: Date;
	periodFromParsed: string;
	periodToParsed: string;
	isApplied = false;
	tabs: any;

	@ViewChild("DataGrid") dataGrid: DxDataGridComponent;
	@ViewChild('userDataGrid', { static: false }) userDataGrid: DxDataGridComponent;
	@ViewChild('groupDataGrid', { static: false }) groupDataGrid: DxDataGridComponent;
	@ViewChild('filterDataGrid', { static: false }) filterDataGrid: DxDataGridComponent;

	constructor(
		public service : Service
	) { }

	ngOnInit() {
		this.tabs = [{ "title": "User Rights History", "template":"userRights" }, { "title": "Group Rights History", "template":"groupRights" }]; 
		this.getColumnContent();
		this.getGroupAndUserRightsHistory();
		this.setPeriodDates();
	}

	public onContentReady(event) {

	}

	public getColumnContent() {
		this.userColumns = [
			{	dataField : "id",
				alignment : null,
				visible : true,
				dataType : "number"
			},
			{	dataField : "name",
				alignment : null,
				caption: "User",
				visible : true,
				dataType : "string"
			},
			{
				dataField : "changeType",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "displayName",
				alignment : null,
				visible : true,
				dataType : "string"
			},			
			{	dataField : "beforeChange",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "afterChange",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "description",
				alignment : null,
				visible : true,
				dataType : "string"
			}		,
			{	dataField : "changeDate",
				alignment : null,
				visible : true,
				dataType : "date"
			}		,
			{	dataField : "changedBy",
				alignment : null,
				visible : true,
				dataType : "string"
			}		
		];

		this.groupColumns = [
			{	dataField : "id",
				alignment : null,
				visible : true,
				dataType : "number"
			},
			{	dataField : "name",
				alignment : null,
				caption : "Group",
				visible : true,
				dataType : "string"
			},
			{
				dataField : "changeType",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "displayName",
				alignment : null,
				visible : true,
				dataType : "string"
			},			
			{	dataField : "beforeChange",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "afterChange",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "description",
				alignment : null,
				visible : true,
				dataType : "string"
			}		,
			{	dataField : "changeDate",
				alignment : null,
				visible : true,
				dataType : "date"
			}		,
			{	dataField : "changedBy",
				alignment : null,
				visible : true,
				dataType : "string"
			}		
		];
	}

	public getGroupAndUserRightsHistory() {
		this.data = this.service.getGroupAndUserRightsHistory();
	}

	public searchDataGrid(data) {
		this.userDataGrid.instance.searchByText(data);
		this.groupDataGrid.instance.searchByText(data);
	}

	public onPeriodFromChange(event) {
		const year = event.value.getFullYear();
		const month = event.value.getMonth() + 1;
		const day = event.value.getDate();
		this.periodFromParsed = month + '/' + day + '/' + year;
		this.isApplied = false;
	}

	public onPeriodToChange(event) {
		const year = event.value.getFullYear();
		const month = event.value.getMonth() + 1;
		const day = event.value.getDate();
		this.periodToParsed = month + '/' + day + '/' + year;
		this.isApplied = false;
	}

	public apply() {
		this.userDataFiltered = this.data.filter((data) => {
			const date = new Date(data.changeDate);
			return date >= this.periodFrom && date <= this.periodTo && data.type === "User";
		})

		this.groupDataFiltered = this.data.filter((data) => {
			const date = new Date(data.changeDate);
			return date >= this.periodFrom && date <= this.periodTo && data.type === "Group";
		})
		this.isApplied = true;
	}

	private setPeriodDates() {
		this.periodTo = new Date();
		this.periodFrom = new Date();
		this.periodFrom.setDate(new Date().getDate() - 30);
		this.periodTo.setHours(23,59,59);
		this.periodFrom.setHours(0,0,0);
		this.onPeriodFromChange({value: this.periodFrom});
		this.onPeriodToChange({value: this.periodTo})
	}

	public builderFilterSheet(filterSheet) {
		const workbook = new ExcelJS.Workbook();

		const userFilter = this.userDataGrid.instance.columnOption("name", "filterValues") || [];
		const userChangeTypeFilter = this.userDataGrid.instance.columnOption("changeType", "filterValues") || [];
		const groupFilter = this.groupDataGrid.instance.columnOption("name", "filterValues") || []
		const groupChangeTypeFilter = this.groupDataGrid.instance.columnOption("changeType", "filterValues") || []
		filterSheet.getRow(2).getCell(2).value = 'Filters';
		filterSheet.getRow(2).getCell(2).font = { bold: true,  underline: 'double' };

		filterSheet = this.buildExportFilterItems(2, userFilter, 'Users', filterSheet);
		filterSheet = this.buildExportFilterItems(3, userChangeTypeFilter, 'Change Type', filterSheet);
		filterSheet = this.buildExportFilterItems(5, groupFilter, 'Group', filterSheet);
		filterSheet = this.buildExportFilterItems(6, groupChangeTypeFilter, 'Change Type', filterSheet);
		return filterSheet
	}

	public buildExportFilterItems(column, filters, title, sheet) {
		sheet.getRow(4).getCell(column).value = title;
		sheet.getRow(4).getCell(column).font = { bold: true, color: { argb: '00558E' }};
		sheet.getRow(4).getCell(column).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' }};
		let counter = 0;
		filters.forEach((item) => {
			counter++;
			sheet.getRow(4 + counter).getCell(column).value = item;
		})

		return sheet
	}

	public exportGrids() {
		const context = this;
		const workbook = new ExcelJS.Workbook();
		const usersSheet = workbook.addWorksheet('Users');
		const groupsSheet = workbook.addWorksheet('Groups');
		let filterSheet = workbook.addWorksheet('filters')

		usersSheet.getRow(2).getCell(2).value = 'Users';
		usersSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

		groupsSheet.getRow(2).getCell(2).value = 'Groups';
    	groupsSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

		const setBackground = (gridCell, excelCell) => {
		if (gridCell.rowType === 'header') {
			excelCell.font.color = {argb: '00558E'}
			excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' }};
		}
			if (gridCell.rowType === 'data') {
		
				if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "Add") {
					excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'dff0d8' }, bgColor: { argb: 'dff0d8' }};
				}
				if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "View") {
							excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd9edf7' }, bgColor: { argb: 'd9edf7' }};
				}
				if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "Delete") {
							excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f2dede' }, bgColor: { argb: 'f2dede' }};
				}
			}
		}
		
		filterSheet = this.builderFilterSheet(filterSheet);
	

		exportDataGrid({
			worksheet: usersSheet,
			component: this.userDataGrid.instance,
			topLeftCell: { row: 4, column: 2 },
			customizeCell: ({ gridCell, excelCell }) => {
				setBackground(gridCell, excelCell)
			}
		}).then(() => {
			return exportDataGrid({
				worksheet: groupsSheet,
				component: this.groupDataGrid.instance,
				topLeftCell: { row: 4, column: 2 },
				customizeCell: ({ gridCell, excelCell }) => {
					setBackground(gridCell, excelCell)
				}
			});
		}).then(() => {
			return exportDataGrid({
				worksheet: filterSheet,
				component: this.filterDataGrid?.instance,
				topLeftCell: { row: 4, column: 2 },
				customizeCell: ({ gridCell, excelCell }) => {
					setBackground(gridCell, excelCell)
				}
			});
		}).then(() => {   
			workbook.xlsx.writeBuffer().then((buffer) => {
				saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'MultipleGrids.xlsx');
			});
		});
	}
  
}
