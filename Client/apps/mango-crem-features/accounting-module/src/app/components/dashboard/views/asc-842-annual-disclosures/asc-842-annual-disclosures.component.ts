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
    },
    {
      id: 'LeaseCosts',
      name: 'Lease Cost',
      index: 2
    },
    {
      id: 'ShortTermReportingExceptionsMetrics',
      name: 'Short Term Reporting Exceptions Metrics',
      index: 3
    },
    {
      id: 'OtherInformation',
      name: 'Other Information',
      index: 4
    },
    {
      id: 'LeaseLiabilityMaturityAnalysis',
      name: 'Lease Liability Maturity Analysis',
      index: 5
    },
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
    this.inAppDisclosureService.getCurrencyDecimalPrecision(this.selectedCurrency)
      .subscribe((result) => {
        this.currencyDecimalPrecision = result?.data?.DecimalPrecision;
        this.refreshCardData();
      });

  }

  public refreshCardData() {
    this.loading = true;
    this.setFieldConfigs();
    this.inAppDisclosureService.getIADCardData(4, this.selectedSegment, this.reportingYear, this.selectedCurrency)
      .subscribe((result) => {
        this.setLeaseCountCardData(result.data[0])
        this.setROUAssetBalanceCardData(result.data[1])
        this.setLeaseCostCardData(this.mergeArraysOfObjects(result.data[2],result.data[3]));
        this.setShortTermReportingExceptionsMetrics(result.data[4]);
        this.setOtherInformation(result.data[5]);
        this.setMaturityAnalysis(result.data[6]);
        this.loading = false;
      });
  }

  public setMaturityAnalysis(data, years:number = 6){ // copy/pasted function
    this.pivotCardData = [];
    const filteredData = this.filterByPeriodYear(data, this.reportingYear, this.reportingYear + years);

    filteredData.forEach((item, i) => {
      const total: number = item.ScheduledPaymentsReporting;

      const items = [
        {
          Display: item.PeriodYear.toString(),
          DisclosureClassificiation: item.ClassificationName,
          data: item.ScheduledPaymentsReporting,
        },
        {
          Display: item.PeriodYear.toString(),
          DisclosureClassificiation: 'Total',
          data: total,
        },
      ];

      if(i === filteredData.length - 1 || i === filteredData.length - 2){
        items.forEach( e => {
          e.Display = 'Thereafter';
        });
      }

      items.forEach((item) => {
        this.pivotCardData.push(item)
      });
    });

    if (this.dataSources.length > 0) {
      this.dataSources[5] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[5]
      });
    } else {
      this.dataSources.push(new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[5]
      }));
    }
    this.loading = false;
  }

  filterByPeriodYear(data: any, startYear: number, endYear: number):any {
    return data.filter(item => item.PeriodYear >= startYear && item.PeriodYear <= endYear);
  }

  public setOtherInformation(data){ // copy/pasted function
    this.pivotCardData = [];
    data.forEach((item) => {
      const cashFlowTotal = item.OperatingCashFlowsFromFinanceLeases +
                            item.OperatingCashFlowsFromOperatingLeases +
                            item.FinancingCashFlowsFromFinanceLeases;
      const items = [
        {
          Display: 'Cash Paid for Amounts Included In Measurement of Liabilities',
          PeriodYear: item.PeriodYear,
          data: cashFlowTotal,
        },
        {
          Display: ' - Operating Cash Flows From Finance Leases',
          PeriodYear: item.PeriodYear,
          data: item.OperatingCashFlowsFromFinanceLeases,
        },
        {
          Display: ' - Operating Cash Flows From Operating Leases',
          PeriodYear: item.PeriodYear,
          data: item.OperatingCashFlowsFromOperatingLeases,
        },
        {
          Display: ' - Financing Cash Flows From Finance Leases',
          PeriodYear: item.PeriodYear,
          data: item.FinancingCashFlowsFromFinanceLeases,
        },
        {
          Display: 'ROU Assets Obtained In Exchange For New Finance Liabilities',
          PeriodYear: item.PeriodYear,
          data: item.ROUAssetsObtainedInExchangeForNewFinanceLiabilities,
        },
        {
          Display: 'ROU Assets Obtained In Exchange For New Operating Liabilities',
          PeriodYear: item.PeriodYear,
          data: item.ROUAssetsObtainedInExchangeForNewOperatingLiabilities,
        },
        {
          Display: 'Weight-Average Remaining Lease Term - Finance Leases',
          PeriodYear: item.PeriodYear,
          data: item.WeightedAverageMonthsRemainingFinance,
        },
        {
          Display: 'Weight-Average Remaining Lease Term - Operating Leases',
          PeriodYear: item.PeriodYear,
          data: item.WeightedAverageMonthsRemainingOperating,
        },
        {
          Display: 'Weight-Average Discount Rate - Finance Leases',
          PeriodYear: item.PeriodYear,
          data: item.WeightedAverageDiscountRateFinance,
        },
        {
          Display: 'Weight-Average Discount Rate - Operating Leases',
          PeriodYear: item.PeriodYear,
          data: item.WeightedAverageDiscountRateOperating,
        },
      ]

      items.forEach((item) => {
        this.pivotCardData.push(item)
      })
    });

    if (this.dataSources.length > 0) {
      this.dataSources[4] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[4]
      });
    } else {
      this.dataSources.push(new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[4]
      }));
    }
    this.loading = false;
  }

  public setLeaseCountCardData(data) {
    this.pivotCardData = [];

    data.forEach((item) => {
      let items = [
        { 
          DisclosureClassification:  item.DisclosureClassification,
          LeaseTemplate: item.LeaseTemplate,
          Display: "Opening Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.OpeningCount,
        },
        { 
          DisclosureClassification:  item.DisclosureClassification,
          LeaseTemplate: item.LeaseTemplate,
          Display: " - Lease Added",
          PeriodYear: item.PeriodYear,
          data: item.AddedCount,
        },
        { 
          DisclosureClassification:  item.DisclosureClassification,
          LeaseTemplate: item.LeaseTemplate,
          Display: " - Leases Expired/Cancelled",
          PeriodYear: item.PeriodYear,
          data: item.EndedCount,
        },
        { 
          DisclosureClassification:  item.DisclosureClassification,
          LeaseTemplate: item.LeaseTemplate,
          Display: "Closing Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.ClosingCount,
        },
        { 
          DisclosureClassification:  "Total",
          LeaseTemplate: item.LeaseTemplate,
          Display: "Opening Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.OpeningCount,
        },
        { 
          DisclosureClassification:  "Total",
          LeaseTemplate: item.LeaseTemplate,
          Display: " - Lease Added",
          PeriodYear: item.PeriodYear,
          data: item.AddedCount,
        },
        { 
          DisclosureClassification:  "Total",
          LeaseTemplate: item.LeaseTemplate,
          Display: " - Leases Expired/Cancelled",
          PeriodYear: item.PeriodYear,
          data: item.EndedCount,
          dataType: 'number',
        },
        { 
          DisclosureClassification:  "Total",
          LeaseTemplate: item.LeaseTemplate,
          Display: "Closing Lease Count",
          PeriodYear: item.PeriodYear,
          data: item.ClosingCount,
          dataType: 'number',
        }
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

  public setShortTermReportingExceptionsMetrics(data){
    this.pivotCardData = [];
    data.forEach((item) => {
      const items = [
        {
          Display: "ST Lease & Reporting Exceptions Cost - Cash Basis",
          PeriodYear: item.PeriodYear,
          data: item.ShortTermLeaseAndReportingExceptionCostCashBasisReporting,
        },
        {
          Display: "- ST Lease & Reporting Exceptions Cost - SL Accrual Basis",
          PeriodYear: item.PeriodYear,
          data: item.ShortTermLeaseAndReportingExceptionCostAccrualBasisReporting,
        },
      ];
      items.forEach((item) => {
        this.pivotCardData.push(item)
      })
    })

    if (this.dataSources.length > 1) {
      this.dataSources[3] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[3]
      });
    } else {
      this.dataSources.push( new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[3]
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
        { 
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
        }

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

  public setLeaseCostCardData(data){ // copy/paste function
    this.pivotCardData = [];

    data.forEach((item) => {
      const total = item.FinanceLeaseCostReporting +
                    item.AssetAmortizationReporting +
                    item.LeaseLiabilityInterestReporting +
                    item.OperatingLeaseCostReporting +
                    item.ShortTermLeaseAndReportingExceptionCostReporting +
                    item.VariableLeaseCostReporting +
                    item.VariableLeaseCostOfIndexedPaymentsReporting +
                    item.SubleaseIncome;
      const items = [
        {
          Display: 'Finance Lease Cost',
          PeriodYear: item.PeriodYear,
          data: item.FinanceLeaseCostReporting,
        },
        {
          Display: ' - Amortization of right-of-use Assets',
          PeriodYear: item.PeriodYear,
          data: item.AssetAmortizationReporting,
        },
        {
          Display: ' - Interest on Lease Liabilities',
          PeriodYear: item.PeriodYear,
          data: item.LeaseLiabilityInterestReporting,
        },
        {
          Display: 'Operating Lease Cost',
          PeriodYear: item.PeriodYear,
          data: item.OperatingLeaseCostReporting,
        },
        {
          Display: 'Short-term Lease & Reporting Exceptions Cost',
          PeriodYear: item.PeriodYear,
          data: item.ShortTermLeaseAndReportingExceptionCostReporting,
        },
        {
          Display: 'Variable Lease Cost',
          PeriodYear: item.PeriodYear,
          data: item.VariableLeaseCostReporting,
        },
        {
          Display: 'Variable Cost of Indexed Payments',
          PeriodYear: item.PeriodYear,
          data: item.VariableLeaseCostOfIndexedPaymentsReporting,
        },
        {
          Display: 'Sublease Income',
          PeriodYear: item.PeriodYear,
          data: item.SubleaseIncome,
        },
        {
          Display: 'Total Lease Cost',
          PeriodYear: item.PeriodYear,
          data: total,
        },
      ]

      items.forEach((item) => {
        this.pivotCardData.push(item)
      })
    });

    if (this.dataSources.length > 0) {
      this.dataSources[2] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[2]
      });
    } else {
      this.dataSources.push(new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[2]
      }));
    }
    this.loading = false;
  }

  mergeArraysOfObjects(data1: {[key: string]: any}[], data2: {[key: string]: any}[]): Array<object>{
    const hashMap = new Map(
      data2.map( item => {
        return [`${item.LeaseTemplate}-${item.DueByYear}`, item]
      })
    );
    const mergedArray = data1.map( item => {
      const key = `${item.LeaseTemplate}-${item.PeriodYear}`;
      const itemToMerge = hashMap.get(key);
      if(itemToMerge && typeof itemToMerge === 'object'){
        return { ...item, ...itemToMerge };
      }
    });
    return mergedArray;
  }

  public setFieldConfigs() {
    this.inAppDisclosureService.getIADCardConfigs(4).subscribe((result) => {
      result.data.forEach((card) => {
        let config = JSON.parse(card.CardJSONSchema);
        config[0].sortingMethod = this.rowSort;
        config[2].sortingMethod = this.disclosureClassificationSort;

        switch(card.Title){
          case 'ASC 842 Annual Disclosures':
            config[4].format = ",###";
            config[config.length - 1].calculateSummaryValue = function(summaryCell) {
              if (summaryCell.field('column')?.dataField === 'LeaseTemplate' || summaryCell.field('column')?.dataField === 'PeriodYear') {
                return summaryCell.value() / 2;
              } else {
                return summaryCell.value();
              }
            }
            break;
          case 'ASC 842 Annual Disclosures ROU Asset Balance':
            config[0].width = 134.469;
            config[3].format = {
              type: "fixedPoint",
              precision: this.currencyDecimalPrecision
            }
            config[config.length - 1].calculateSummaryValue = function(summaryCell) {
              if (summaryCell.field('column')?.dataField === 'PeriodYear') {
                return summaryCell.value() / 2;
              } else {
                return summaryCell.value();
              }
            }
            break;
          case 'ASC 842 Annual Disclosures Short Term Reporting Exceptions Cost':
            config[0].width = 200;
            config[2].format = {
              type: "fixedPoint",
              precision: this.currencyDecimalPrecision
            }
            break;
          case 'ASC 842 Annual Lease Costs':
            config[0].width = 180;
            config[2].format = {
              type: "fixedPoint",
              precision: this.currencyDecimalPrecision
            };
            break;
          case 'ASC 842 Annual Disclosures Other Information':
            config[0].width = 200;
            config[2].format = {
              type: "fixedPoint",
              precision: this.currencyDecimalPrecision
            };
            break;
          case 'ASC 842 Annual Disclosures Lease Liability Maturity Analysis':
            config[0].width = 200;
            config[2].format = {
              type: "fixedPoint",
              precision: this.currencyDecimalPrecision,
            };
            break;
        }

        config[config.length - 1].calculateCustomSummary = (options) => {
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

  public cardMove(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cardData, event.previousIndex, event.currentIndex);
  }

  public toggleCardWidth() {
    this.fullWidth = !this.fullWidth;
    this.updateDimention();
  }

  public updateDimention() {
    this.pivotGrid?.instance.updateDimensions();
    setTimeout(() => {
      this.pivotGrid?.instance.updateDimensions();
    })
  }

}
