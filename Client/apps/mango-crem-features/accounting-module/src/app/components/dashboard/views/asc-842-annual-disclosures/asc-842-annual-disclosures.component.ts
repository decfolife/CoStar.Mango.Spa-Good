/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxPivotGridComponent } from 'devextreme-angular/ui/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
  selector: 'asc-842-annual-disclosures',
  templateUrl: './asc-842-annual-disclosures.component.html',
  styleUrls: ['./asc-842-annual-disclosures.component.scss'],
})
export class Asc842AnnualDisclosuresComponent implements OnInit {
  public cardData: any = [{
      id: 'LeaseCounts',
      name: 'Lease Counts',
      index: 0
    },
    {
      id: 'AssetBalance',
      name: 'Assets and Liabilities Balances',
      index: 1
    }
  ];
  public pivotCardData: any;
  public loading: boolean = true;
  public fieldConfigs: any;
  public dataSources: any;
  public pendoId: string = "Asc842AnnualDisclosures"
  public fullWidth: boolean = true;
  private cardConfigs: string[];

  public selectedCurrency = "usd";
  public currencyDecimalPrecision: number;
  
  @Input() selectedSegment: number;
  @Input() reportingYear: number;

  @ViewChild("PivotGrid") pivotGrid: DxPivotGridComponent;
 
  constructor(
    private inAppDisclosureService: InAppDisclosureService
  ) {}

  ngOnInit() {
    this.dataSources = [];
    this.fieldConfigs = [];
    this.inAppDisclosureService.getCurrencyDecimalPrecision(this.selectedCurrency).subscribe((result) => {
      this.currencyDecimalPrecision = result?.data?.DecimalPrecision;
      this.refreshCardData();
    })

  }

  public refreshCardData() {
    this.loading = true;
    this.setFieldConfigs();
    
    this.inAppDisclosureService.getIADCardData(this.selectedSegment, this.reportingYear, this.selectedCurrency).subscribe((result) => {
      this.setLeaseCountCardData(result.data[0])
      this.setROUAssetBalanceCardData(result.data[1])
      this.loading = false;
    });
  }

  public setLeaseCountCardData(data) {
    this.pivotCardData = [];

    data.forEach((item) => {
      let items = [
        { 
          DisclosureClassification:  item.DisclosureClassification,
          Display: "Opening Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.OpeningCount,
        },
        { 
          DisclosureClassification:  item.DisclosureClassification,
          Display: " - Lease Added",
          PeriodYear: item.PeriodYear,
          data: item.AddedCount,
        },
        { 
          DisclosureClassification:  item.DisclosureClassification,
          Display: " - Leases Expired/Cancelled",
          PeriodYear: item.PeriodYear,
          data: item.EndedCount,
        },
        { 
          DisclosureClassification:  item.DisclosureClassification,
          Display: "Closing Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.ClosingCount,
        },
        /**{ 
          DisclosureClassification:  "Total",
          Display: "Opening Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.OpeningCount,
        },
        { 
          DisclosureClassification:  "Total",
          Display: " - Lease Added",
          PeriodYear: item.PeriodYear,
          data: item.AddedCount,
        },
        { 
          DisclosureClassification:  "Total",
          Display: " - Leases Expired/Cancelled",
          PeriodYear: item.PeriodYear,
          data: item.EndedCount,
          dataType: 'number',
        },
        { 
          DisclosureClassification:  "Total",
          Display: "Closing Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.ClosingCount,
          dataType: 'number',
        }**/
      ]

      items.forEach((item) => {
        this.pivotCardData.push(item)

      })
    })

    if (this.dataSources.length > 0) {
      this.dataSources[0] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[0]
      });
    } else {
      this.dataSources.push(new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[0]
      }));
    }
    this.loading = false;
  }

  public setROUAssetBalanceCardData(data) {
    this.pivotCardData = [];

    data.forEach((item) => {
      if (item.ClassificationName.includes('Finance')) {
        item.ClassificationName = 'Finance'
      } else if (item.ClassificationName.includes('Operating')) {
        item.ClassificationName = 'Operating'
      }
      let items = [
        { 
          DisclosureClassification:  item.ClassificationName,
          Display: "ROU Asset Balance",
          PeriodYear: item.PeriodYear,
          data: item.AssetBalanceClosingReporting,
        },
        { 
          DisclosureClassification:  item.ClassificationName,
          Display: "Short Term Liability Balance",
          PeriodYear: item.PeriodYear,
          data: item.ShortTermLiabilityClosingReporting,
        },
        { 
          DisclosureClassification:  item.ClassificationName,
          Display: "Long Term Liability Balance",
          PeriodYear: item.PeriodYear,
          data: item.LongTermLiabilityClosingReporting,
        },
        { 
          DisclosureClassification:  item.ClassificationName,
          Display: "Total Liability Balance",
          PeriodYear: item.PeriodYear,
          data: item.LiabilityBalanceClosingReporting,
        },
        /**{ 
          DisclosureClassification:  "Total",
          Display: "ROU Asset Balance",
          PeriodYear: item.PeriodYear,
          data: item.AssetBalanceClosingReporting,
        },
        { 
          DisclosureClassification:  "Total",
          Display: "Short Term Liability Balance",
          PeriodYear: item.PeriodYear,
          data: item.ShortTermLiabilityClosingReporting,
        },
        { 
          DisclosureClassification:  "Total",
          Display: "Long Term Liability Balance",
          PeriodYear: item.PeriodYear,
          data: item.LongTermLiabilityClosingReporting,
        },
        { 
          DisclosureClassification:  "Total",
          Display: "Total Liability Balance",
          PeriodYear: item.PeriodYear,
          data: item.LiabilityBalanceClosingReporting,
        },**/

      ]

      items.forEach((item) => {
        this.pivotCardData.push(item)
      })
    })

    if (this.dataSources.length > 1) {
      this.dataSources[1] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[1]
      });
    } else {
      this.dataSources.push( new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[1]
      }));
    }
    this.loading = false;
  }

  public setFieldConfigs() {
    this.inAppDisclosureService.getIADCardConfigs(1004).subscribe((result) => {
      result.data.forEach((card) => {
        let config = JSON.parse(card.CardJSONSchema);
        config[0].sortingMethod = this.rowSort;
        config[2].sortingMethod = this.disclosureClassificationSort;
        if (card.Title === 'ASC 842 Annual Disclosures') {
          config[3].format = ",###";
        } else if (card.Title === 'ASC 842 Annual Disclosures ROU Asset Balance') {
          config[3].format = {
            type: "fixedPoint",
            precision: this.currencyDecimalPrecision
          }
        }
        config[3].calculateCustomSummary = (options) => {
          switch(options.summaryProcess) {
            case "start":
              options.totalValue = 0;
              break;
            case "calculate":
              options.totalValue += options.value;
              break;
            case "finalize":
              options.totalValue = options.totalValue.toFixed(this.currencyDecimalPrecision);
              break;
          }
        }
        this.fieldConfigs.push(config);
      })
    })
  }

  public rowSort(a, b) {
    const rowSortOrderObject = {
      "Opening Lease Count": 1,
      " - Lease Added": 2,
      " - Leases Expired/Cancelled": 3,
      "Closing Lease Count": 4
    }

    if (rowSortOrderObject?.[a.value] > rowSortOrderObject?.[b.value])  
      return 1;  
    if (rowSortOrderObject?.[b.value] > rowSortOrderObject?.[a.value])  
      return -1;  
    else  
      return 0; 
  }

  public disclosureClassificationSort(a, b) {
    const disclosureClassificationSortOrderObject = {
      "Mixed": 1,
      "Finance": 2,
      "Finance 842": 2.5,
      "Operating": 3,
      "Operating 842": 3.5,
      "Total": 4
    }

    if (disclosureClassificationSortOrderObject?.[a.value] > disclosureClassificationSortOrderObject?.[b.value])  
      return 1;  
    if (disclosureClassificationSortOrderObject?.[b.value] > disclosureClassificationSortOrderObject?.[a.value])  
      return -1;  
    else  
      return 0; 
  }

  public contextMenuPreparing(e) {
    const dataSource = e.component.getDataSource();
    const sourceField = e.field;

    if (sourceField && sourceField.dataType === 'number') {
        let numberType = "number";
        
        const setSummaryType = function (args) {
          let format;
          if (numberType === "currency") {
            if (args.itemData.value === "total") {
              format = ",###";
            } else if (args.itemData.value === "sum") {
              format = ",##0.00"
            }
          } else {
            if (args.itemData.value === "total") {
              format = ",###";
            } else if (args.itemData.value === "sum") {
              format = ",###.##"
            }
          }

          if (format) {
            dataSource.field(sourceField.index, {
              summaryType: args.itemData.value,
              format: format
            });
          } else {
            dataSource.field(sourceField.index, {
              summaryType: args.itemData.value,
            });
          }

          dataSource.load();
        };
        const menuItems = [];

        e.items.push({ text: 'Summary Type', items: menuItems });

        for (const summaryType of ['Sum', 'Total']) {
          const summaryTypeValue = summaryType.toLowerCase();

          menuItems.push({
            text: summaryType,
            value: summaryType.toLowerCase(),
            onItemClick: setSummaryType,
            selected: e.field.summaryType === summaryTypeValue,
          });
        }  
    }
  }

  public onCellPrepared(e) {
    if (e.area === "data" && e.cell.text === "") {
        e.cellElement.textContent = "0";
    }
    if (e.cell.text === "ROU Asset Balance" || e.cell.text === "Total Liability Balance") {
      e.cellElement.style.fontWeight = 'bold';
    }
    if (e.area === "column") { // Apply background color when cell's header is total
      if (e.cell.text === "Total"){
        e.cellElement.classList.add("total");
      }
    }
    if (e.rowType === "data" || e.area === "data") { // Apply background color when cell is a total
      if (e.cell.columnPath[1] === "Total"){
        e.cellElement.classList.add("total");
      }
    }
  }

  public cardMove(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cardData, event.previousIndex, event.currentIndex);
  }

  public toggleCardWidth() {
    this.fullWidth = !this.fullWidth;
    this.updateDimention();
  }

  public updateDimention() {
    this.pivotGrid?.instance.updateDimensions();
  }

}
