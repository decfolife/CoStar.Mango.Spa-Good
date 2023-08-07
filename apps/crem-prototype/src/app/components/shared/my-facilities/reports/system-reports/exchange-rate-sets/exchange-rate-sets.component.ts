import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../../../../../app.service';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import {saveAs} from 'file-saver-es';

@Component({
  selector: 'exchange-rate-sets',
  templateUrl: './exchange-rate-sets.component.html',
  styleUrls: ['./exchange-rate-sets.component.scss']
})
export class ExchangeRateSetsComponent implements OnInit {

  data : Array<any>;
  columns : Array<any>;
  searchModeOption: string = "contains";
  searchExprOption: string = "Name";
  searchTimeoutOption: number = 200;
  minSearchLengthOption: number = 0;
  periods: any;
  selectedPortfolio: string;
  exchangeRateData: Array<any>;
  selectedPeriod: string;
  isApplied = false;

  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;

  constructor(
    public service : Service
  ) { }

  ngOnInit() {
    this.getColumnContent();
  }

  public onContentReady(event) {

  }

  public getColumnContent() {
    this.columns = [
			{	dataField : "rateSets",
				alignment : null,
				visible : true,
        dataType : "string",
			},
			{	dataField : "effectiveDate",
				alignment : null,
				visible : true,
				dataType : "date"
			},
			{	dataField : "baseCurrency",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{
				dataField : "targetCurrency",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "isCurrent",
				alignment : null,
				visible : true,
				dataType : "string"
			},			
			{	dataField : "rate",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "period",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "lastModified",
				alignment : null,
				visible : true,
				dataType : "date"
			}			,
			{	dataField : "lastModifiedBy",
				alignment : null,
				visible : true,
				dataType : "string"
			}			
		];
  }

  public searchDataGrid(data) {
		this.dataGrid.instance.searchByText(data);
  }

  public onPortfolioChange(e) {
    if (this.selectedPortfolio !== e) {
      this.selectedPortfolio = e && e[0];
      this.selectedPeriod = null;
      this.isApplied = false;
      this.exchangeRateData = this.service.getPortfolioExchangeRate().filter((exchangeRate) => {
        return exchangeRate.portfolio === this.selectedPortfolio;
      });
      this.buildPeriodDropdown();
    }
  }

  public onPeriodChange(e) {
    if (this.selectedPeriod !== e.value) {
      this.selectedPeriod = e.value;
      this.isApplied = false;
    }
  }

  public apply() {
    this.data = this.exchangeRateData.filter((exchangeRate) => {
      return exchangeRate.period === this.selectedPeriod
    });
    this.isApplied = true;
  }

  public exportGrids() {
		const context = this;
		const workbook = new ExcelJS.Workbook();
		const rateSetSheet = workbook.addWorksheet('Rate Set');

		rateSetSheet.getRow(2).getCell(2).value = 'Rate Set';
    rateSetSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    
    rateSetSheet.getRow(2).getCell(4).value = 'Portfolio:';
    rateSetSheet.getRow(3).getCell(4).value = 'Period:';
    rateSetSheet.getRow(2).getCell(5).value = this.selectedPortfolio;
    rateSetSheet.getRow(3).getCell(5).value = this.selectedPeriod;

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

		exportDataGrid({
			worksheet: rateSetSheet,
			component: this.dataGrid.instance,
			topLeftCell: { row: 5, column: 2 },
			customizeCell: ({ gridCell, excelCell }) => {
				setBackground(gridCell, excelCell)
			}
		}).then(() => {   
			workbook.xlsx.writeBuffer().then((buffer) => {
				saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Rate_Set.xlsx');
			});
		});
	}

  private buildPeriodDropdown() {
    const periods = [];
    this.exchangeRateData.forEach((exchangeRate) => {
      if (!periods.includes(exchangeRate.period)) {
        periods.push(exchangeRate.period);
      }
    });
    const periodsDropdown = periods.map((period) => {
      return {
        Name: period,
        ID: period
      }
    });
    this.periods = periodsDropdown;
  }
  

}