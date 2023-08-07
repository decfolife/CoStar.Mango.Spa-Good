import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownComponent } from '@mango/ui-shared/lib-ui-elements';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { Portfolio, ResolvedData, UserPreferences } from '../../shared/models/index';
import { SharedService } from '../../shared/services/shared.service';
import { ExchangeRateSetsService } from './exchange-rate-sets.service';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { ExchangeRate } from './exchange-rate-sets.model'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'exchange-rate-sets',
  templateUrl: './exchange-rate-sets.component.html',
  styleUrls: ['./exchange-rate-sets.component.scss']
})
export class ExchangeRateSetsComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public selectedMasterGroupID: number = +this.route.snapshot.paramMap.get('portfolioId') || undefined;
  public resolvedData: ResolvedData = this.route.snapshot.data['resolvedData'];

  portfolioList: Portfolio[];
  periodList: number[];
  errorMessage: any;
  dateFormat: string;

  columns: any[];
  selectedPortfolio: Portfolio;
  exchangeRateData: ExchangeRate[];
  selectedPeriods: number[];
  periodDropdownData: any = {};
  portfolioDropdownData: any;
  dataGridLoading = false;

  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;
  @ViewChild('PeriodDropdown') periodDropdown: DropdownComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;

  constructor(
    public exchangeRateSetsService: ExchangeRateSetsService,
    private datepipe: DatePipe,
    private sharedService: SharedService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.portfolioList = this.resolvedData.data;
    this.errorMessage = this.resolvedData.error;
    if (this.selectedMasterGroupID) {
      this.selectedPortfolio = this.portfolioList.find(x => x.masterGroupID === this.selectedMasterGroupID);
    }

    this.builderPortfolioDropdown();
    this.buildPeriodDropdown();

    this.sharedService.getUserPreferences()
      .subscribe(result => {
        const userPreferences = result.data || {};
        this.dateFormat = userPreferences?.dateFormat || "MM/dd/yyyy"
        this.getColumnContent();
      })
  }

  public getPeriodList(): void {
    this.exchangeRateSetsService.getPeriodList(this.selectedPortfolio.masterGroupID)
      .subscribe(result => {
        this.periodList = result.data;
        this.buildPeriodDropdown();
      });
  }

  public getExchangeRateSetData(): void {
    this.exchangeRateSetsService.getExchangeRateSetData(this.selectedPortfolio.masterGroupID, this.selectedPeriods)
      .subscribe(result => {
        this.exchangeRateData = (result.data || []).map((d, index) => ({ ...d, gridIndex: index }));
        this.dataGridLoading = false;
      });
  }

  public getColumnContent(): void {
    this.columns = [
      {
        dataField: "fxRateSetName",
        caption: "Rate Sets",
        alignment: null,
        visible: true,
        dataType: "string",
      },
      {
        dataField: "effectiveDate",
        alignment: null,
        visible: true,
        dataType: "date",
        format: this.dateFormat
      },
      {
        dataField: "baseCurrency",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "targetCurrency",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "isCurrent",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "rate",
        alignment: null,
        visible: true,
        dataType: "number"
      },
      {
        dataField: "period",
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
      },
      {
        dataField: "lastModifiedBy",
        alignment: null,
        visible: true,
        dataType: "string"
      }
    ];
  }

  public searchDataGrid(data: string): void {
    this.dataGrid?.instance?.searchByText(data);
  }

  public onPortfolioChange(e: any[]): void {
    const selectedPortfolio: Portfolio = e?.[0] && { masterGroupID: e?.[0]?.valueKey, companyName: e?.[0].companyName };
    if (this.selectedPortfolio !== selectedPortfolio) {
      this.periodDropdown?.clearDropdown();
      this.selectedPortfolio = selectedPortfolio;
      this.selectedPeriods = undefined;
      this.exchangeRateData = undefined;
      this.searchBox?.handleClear();
      if (this.selectedPortfolio) {
        this.getPeriodList();
      }
    }
  }

  public onPeriodChange(e: any): void {
    const selectedPeriods = e?.map((item) => {
      return item.period
    });
    if (this.selectedPeriods !== selectedPeriods) {
      this.selectedPeriods = selectedPeriods;
      this.exchangeRateData = undefined;
      this.searchBox?.handleClear();
    }
  }

  public apply(): void {
    this.dataGridLoading = true;
    this.getExchangeRateSetData();
  }

  public exportGrids(): void {
    const context = this;
    const workbook = new ExcelJS.Workbook();
    const rateSetSheet = workbook.addWorksheet('Rate Set');

    rateSetSheet.getRow(2).getCell(2).value = 'Rate Set';
    rateSetSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

    rateSetSheet.getRow(2).getCell(4).value = 'Portfolio:';
    rateSetSheet.getRow(2).getCell(4).font = { bold: true };
    rateSetSheet.getRow(3).getCell(4).value = 'Period(s):';
    rateSetSheet.getRow(3).getCell(4).font = { bold: true };
    rateSetSheet.getRow(2).getCell(5).value = this.selectedPortfolio.companyName;
    if (this.selectedPeriods.length > 10) {
      rateSetSheet.getRow(3).getCell(5).value = 'Multiple Periods Selected';
    } else {
      rateSetSheet.getRow(3).getCell(5).value = this.selectedPeriods.toString();
    }


    const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = { argb: '00558E' }
        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
      }
      if (gridCell.rowType === 'data') {

        if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "Add") {
          excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'dff0d8' }, bgColor: { argb: 'dff0d8' } };
        }
        if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "View") {
          excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd9edf7' }, bgColor: { argb: 'd9edf7' } };
        }
        if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "Delete") {
          excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f2dede' }, bgColor: { argb: 'f2dede' } };
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
        const date = this.getCurrentDate();
        const fileName = 'Rate Set - ' + this.selectedPortfolio.companyName + '_' + date + '.xlsx'
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
      });
    });
  }

  private buildPeriodDropdown(): void {
    if (!this.periodList) {
      return;
    }
    const dropdownData = this.periodList.map((period) => {
      return {
        ID: period,
        period: period.toString()
      }
    })
    this.periodDropdownData = {
      items: dropdownData,
      valueExpr: "ID",
      displayExpr: "period",
      placeholder: "Period",
      controlType: "dropdown",
      visible: true,
      selectMode: "single",
      showColumnHeader: true,
      showSearchRow: true,
      allowClear: true,
    }
  }

  private builderPortfolioDropdown(): void {
    const dropdownData = this.portfolioList.map((portfolio) => {
      return {
        valueKey: portfolio.masterGroupID,
        companyName: portfolio.companyName
      }
    });
    this.portfolioDropdownData = {
      items: dropdownData,
      valueExpr: "valueKey",
      displayExpr: "companyName",
      placeholder: "Portfolio",
      controlType: "dropdown",
      selected: this.selectedPortfolio?.masterGroupID,
      visible: true,
      selectMode: "single",
      showColumnHeader: true,
      showSearchRow: true,
      allowClear: true,
    }
    if (this.selectedPortfolio) {
      this.onPortfolioChange([{ valueKey: this.selectedPortfolio.masterGroupID, companyName: this.selectedPortfolio.companyName }]);
    }
  }

  private getCurrentDate(): string {
    const date = new Date();
    return this.datepipe.transform(date, this.dateFormat);
  }
}
