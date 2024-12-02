import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DxPivotGridComponent } from 'devextreme-angular/ui/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { CardConfig } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'asc-842-quarterly-disclosures',
  templateUrl: './asc-842-quarterly-disclosures.component.html',
  styleUrls: ['./asc-842-quarterly-disclosures.component.scss'],
})
export class Asc842QuarterlyDisclosuresComponent implements OnInit {
  public cardData: Partial<CardConfig>[] = [
    {
      id: 'ASC842-Quarterly-LeaseCounts',
      name: 'Lease Counts',
      showFieldChooser: true,
      index: 0,
    },
    {
      id: 'ASC842-Quarterly-AssetBalance',
      name: 'Assets and Liabilities Balances',
      index: 1,
    },
    {
      id: 'ASC842-Quarterly-LeaseCosts',
      name: 'Lease Cost',
      index: 2,
    },
    {
      id: 'ASC842-Quarterly-ShortTermReportingExceptionsMetrics',
      name: 'Reporting Exceptions Cost',
      index: 3,
    },
    {
      id: 'ASC842-Quarterly-OtherInformation',
      name: 'Other Information',
      index: 4,
    },
    {
      id: 'ASC842-Quarterly-LeaseLiabilityMaturityAnalysis',
      name: 'Liability Maturity',
      index: 5,
      filterData: [
        { displayKey: '5 years', valueKey: 5 },
        { displayKey: '10 years', valueKey: 10 },
      ],
      filterInitialValue: { displayKey: '5 years', valueKey: 5 },
    },
    {
      id: 'ASC842-Quarterly-ReconciliationOfLeaseLiabilities',
      name: 'Reconciliation of Lease Liabilities',
      index: 6,
    },
    {
      id: 'ASC842-Quarterly-FutureCommitments',
      name: 'Future Commitments',
      index: 7,
      filterData: [
        { displayKey: '5 years', valueKey: 5 },
        { displayKey: '10 years', valueKey: 10 },
      ],
      filterInitialValue: { displayKey: '5 years', valueKey: 5 },
    },
  ];
  public pivotCardData: any;
  public loading = true as boolean;
  public fieldConfigs: any;
  public dataSources: any;
  public pendoId = 'Asc842QuarterlyDisclosures' as string;
  public fullWidth = true as boolean;
  IADCardData;

  @Input() selectedCurrency;
  public currencyDecimalPrecision: number;

  @Input() dashboardId: number;
  @Input() selectedSegment: number;
  @Input() reportingYear: number;

  @ViewChild('PivotGrid') pivotGrid: DxPivotGridComponent;

  constructor(private inAppDisclosureService: InAppDisclosureService) {}

  ngOnInit() {
    this.dataSources = [];
    this.fieldConfigs = [];
    this.inAppDisclosureService
      .getCurrencyDecimalPrecision(this.selectedCurrency)
      .subscribe((result) => {
        this.currencyDecimalPrecision = result?.data?.DecimalPrecision;
        this.refreshCardData();
      });
  }

  onSelectedFilter(e: Event, config) {
    switch (config.name) {
      case 'Liability Maturity':
        this.setMaturityAnalysis(this.IADCardData.data[6], e['valueKey']);
        break;
      case 'Future Commitments':
        this.setFutureCommitments(this.IADCardData.data[8], e['valueKey']);
        break;
    }
  }

  public refreshCardData() {
    this.loading = true;
    this.setFieldConfigs();
    this.inAppDisclosureService
      .getIADCardData(
        this.dashboardId,
        this.selectedSegment,
        this.reportingYear,
        this.selectedCurrency
      )
      .subscribe((result) => {
        result.data.forEach((item) => {
          item.forEach((data) => {
            if (
              data.ClassificationName &&
              data.ClassificationName.includes('ASC 842')
            ) {
              data.ClassificationName = data.ClassificationName.replace(
                '(ASC 842)',
                ''
              );
            }

            if (
              data.DisclosureClassification &&
              data.DisclosureClassification.includes('842')
            ) {
              data.DisclosureClassification =
                data.DisclosureClassification.replace('842', '');
            }
          });
        });

        this.IADCardData = result;
        this.setLeaseCountCardData(result.data[0]);
        this.setROUAssetBalanceCardData(result.data[1]);
        this.setLeaseCostCardData(
          this.mergeArraysOfObjects(result.data[2], result.data[3])
        );
        this.setShortTermReportingExceptionsMetrics(result.data[4]);
        this.setOtherInformation(result.data[5]);
        this.setMaturityAnalysis(result.data[6]);
        this.setReconciliationOfLeaseLiabilities(result.data[7]);
        this.setFutureCommitments(result.data[8]);
        this.loading = false;
      });
  }

  public setLeaseCountCardData(data) {
    this.pivotCardData = [];
    data.forEach((item) => {
      const disclosureName = item.DisclosureClassification.trim();
      const items = [
        {
          DisclosureClassificiation: disclosureName,
          LeaseTemplate: item.LeaseTemplate,
          Display: 'Opening Lease Count',
          PeriodQuarter: item.PeriodQuarter,
          data: item.OpeningCount,
        },
        {
          DisclosureClassificiation: disclosureName,
          LeaseTemplate: item.LeaseTemplate,
          Display: ' - Leases Added',
          PeriodQuarter: item.PeriodQuarter,
          data: item.AddedCount,
        },
        {
          DisclosureClassificiation: disclosureName,
          LeaseTemplate: item.LeaseTemplate,
          Display: ' - Leases Expired/Cancelled',
          PeriodQuarter: item.PeriodQuarter,
          data: item.EndedCount,
        },
        {
          DisclosureClassificiation: disclosureName,
          LeaseTemplate: item.LeaseTemplate,
          Display: 'Closing Lease Count',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ClosingCount,
        },
        {
          DisclosureClassificiation: 'Total',
          LeaseTemplate: item.LeaseTemplate,
          Display: 'Opening Lease Count',
          PeriodQuarter: item.PeriodQuarter,
          data: item.OpeningCount,
        },
        {
          DisclosureClassificiation: 'Total',
          LeaseTemplate: item.LeaseTemplate,
          Display: ' - Leases Added',
          PeriodQuarter: item.PeriodQuarter,
          data: item.AddedCount,
        },
        {
          DisclosureClassificiation: 'Total',
          LeaseTemplate: item.LeaseTemplate,
          Display: ' - Leases Expired/Cancelled',
          PeriodQuarter: item.PeriodQuarter,
          data: item.EndedCount,
          dataType: 'number',
        },
        {
          DisclosureClassificiation: 'Total',
          LeaseTemplate: item.LeaseTemplate,
          Display: 'Closing Lease Count',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ClosingCount,
          dataType: 'number',
        },
      ];

      items.forEach((item) => {
        this.pivotCardData.push(item);
      });
    });

    if (this.dataSources.length > 0) {
      this.dataSources[0] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[0],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[0],
        })
      );
    }
    this.loading = false;
  }

  public setROUAssetBalanceCardData(data) {
    this.pivotCardData = [];
    data.forEach((item) => {
      if (item.ClassificationName.includes('Finance')) {
        item.ClassificationName = 'Finance';
      } else if (item.ClassificationName.includes('Operating')) {
        item.ClassificationName = 'Operating';
      }
      const items = [
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'ROU Asset Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.AssetBalanceClosingReporting,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Short Term Liability Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ShortTermLiabilityClosingReporting,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Long Term Liability Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.LongTermLiabilityClosingReporting,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Total Liability Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.LiabilityBalanceClosingReporting,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'ROU Asset Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.AssetBalanceClosingReporting,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Short Term Liability Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ShortTermLiabilityClosingReporting,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Long Term Liability Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.LongTermLiabilityClosingReporting,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Total Liability Balance',
          PeriodQuarter: item.PeriodQuarter,
          data: item.LiabilityBalanceClosingReporting,
        },
      ];

      items.forEach((item) => {
        this.pivotCardData.push(item);
      });
    });

    if (this.dataSources.length > 1) {
      this.dataSources[1] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[1],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[1],
        })
      );
    }
    this.loading = false;
  }

  public setFutureCommitments(data: any, years?: number) {
    this.pivotCardData = [];
    years = !years ? 5 : years;
    const filteredData = this.filterByPeriodYear(
      data,
      this.reportingYear,
      this.reportingYear + years
    );

    const groupedItems = filteredData.reduce((acc, item) => {
      if (!acc[item.PeriodYear]) {
        acc[item.PeriodYear] = [];
      }
      acc[item.PeriodYear].push(item);
      return acc;
    }, {});

    for (const year in groupedItems) {
      groupedItems[year].forEach((item) => {
        const total = item.ScheduledPaymentsReporting;

        const baseItems = [
          {
            Display: year,
            DisclosureClassificiation: item.ClassificationName,
            data: total,
          },
          {
            Display: year,
            DisclosureClassificiation: 'Total',
            data: total,
          },
        ];

        this.pivotCardData.push(...baseItems);
      });
    }

    const lastYear = Math.max(...Object.keys(groupedItems).map(Number));
    const lastItems = groupedItems[lastYear];

    lastItems.forEach((item) => {
      const remainingItems = [
        {
          Display: 'Thereafter',
          DisclosureClassificiation: item.ClassificationName,
          data: item.RemainingPaymentsReporting,
        },
        {
          Display: 'Thereafter',
          DisclosureClassificiation: 'Total',
          data: item.RemainingPaymentsReporting,
        },
      ];

      this.pivotCardData.push(...remainingItems);
    });

    if (this.dataSources.length > 0) {
      this.dataSources[7] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[7],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[7],
        })
      );
    }
    this.loading = false;
  }

  public setReconciliationOfLeaseLiabilities(data) {
    this.pivotCardData = [];

    data.forEach((item) => {
      const items = [
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Weighted-Average Remaining Years to Accounting Term',
          data: item.WeightedAverageYearsRemainingToAccountingTerm,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Weighted-Average Remaining Years To Expiration',
          data: item.WeightedAverageYearsRemainingToExpiration,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Weighted-Average Discount Rate',
          data: item.WeightedAverageDiscountRate,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Total Undiscounted Lease Liability',
          data: item.TotalUndiscountedLeaseLiability,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Imputed Interest',
          data: item.ImputedInterest,
        },
        {
          DisclosureClassificiation: item.ClassificationName,
          Display: 'Total Discounted Lease Liability',
          data: item.TotalDiscountedLeaseLiability,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Weighted-Average Remaining Years to Accounting Term',
          data: item.WeightedAverageYearsRemainingToAccountingTerm,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Weighted-Average Remaining Years To Expiration',
          data: item.WeightedAverageYearsRemainingToExpiration,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Weighted-Average Discount Rate',
          data: item.WeightedAverageDiscountRate,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Total Undiscounted Lease Liability',
          data: item.TotalUndiscountedLeaseLiability,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Imputed Interest',
          data: item.ImputedInterest,
        },
        {
          DisclosureClassificiation: 'Total',
          Display: 'Total Discounted Lease Liability',
          data: item.TotalDiscountedLeaseLiability,
        },
      ];

      items.forEach((item) => {
        this.pivotCardData.push(item);
      });
    });

    if (this.dataSources.length > 0) {
      this.dataSources[6] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[6],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[6],
        })
      );
    }
    this.loading = false;
  }

  public setMaturityAnalysis(data, years?: number) {
    this.pivotCardData = [];
    years = !years ? 5 : years;
    const filteredData = this.filterByPeriodYear(
      data,
      this.reportingYear,
      this.reportingYear + years
    );

    const groupedItems = filteredData.reduce((acc, item) => {
      if (!acc[item.PeriodYear]) {
        acc[item.PeriodYear] = [];
      }
      acc[item.PeriodYear].push(item);
      return acc;
    }, {});

    for (const year in groupedItems) {
      groupedItems[year].forEach((item) => {
        const total = item.ScheduledPaymentsReporting;

        const baseItems = [
          {
            Display: year,
            DisclosureClassificiation: item.ClassificationName,
            data: total,
          },
          {
            Display: year,
            DisclosureClassificiation: 'Total',
            data: total,
          },
        ];

        this.pivotCardData.push(...baseItems);
      });
    }

    const lastYear = Math.max(...Object.keys(groupedItems).map(Number));
    const lastItems = groupedItems[lastYear];

    lastItems.forEach((item) => {
      const remainingItems = [
        {
          Display: 'Thereafter',
          DisclosureClassificiation: item.ClassificationName,
          data: item.RemainingPaymentsReporting,
        },
        {
          Display: 'Thereafter',
          DisclosureClassificiation: 'Total',
          data: item.RemainingPaymentsReporting,
        },
      ];

      this.pivotCardData.push(...remainingItems);
    });

    if (this.dataSources.length > 0) {
      this.dataSources[5] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[5],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[5],
        })
      );
    }
    this.loading = false;
  }

  filterByPeriodYear(data: any, startYear: number, endYear: number): any {
    return data.filter(
      (item) => item.PeriodYear >= startYear && item.PeriodYear <= endYear
    );
  }

  public setOtherInformation(data) {
    this.pivotCardData = [];
    data.forEach((item) => {
      const cashFlowTotal =
        item.OperatingCashFlowsFromFinanceLeases +
        item.OperatingCashFlowsFromOperatingLeases +
        item.FinancingCashFlowsFromFinanceLeases;
      const items = [
        {
          Display:
            'Cash Paid for Amounts Included In Measurement of Liabilities',
          PeriodQuarter: item.PeriodQuarter,
          data: cashFlowTotal,
        },
        {
          Display: ' - Operating Cash Flows From Finance Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.OperatingCashFlowsFromFinanceLeases,
        },
        {
          Display: ' - Operating Cash Flows From Operating Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.OperatingCashFlowsFromOperatingLeases,
        },
        {
          Display: ' - Financing Cash Flows From Finance Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.FinancingCashFlowsFromFinanceLeases,
        },
        {
          Display:
            'ROU Assets Obtained In Exchange For New Finance Liabilities',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ROUAssetsObtainedInExchangeForNewFinanceLiabilities,
        },
        {
          Display:
            'ROU Assets Obtained In Exchange For New Operating Liabilities',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ROUAssetsObtainedInExchangeForNewOperatingLiabilities,
        },
        {
          Display:
            'Weighted-Average Remaining Years to Accounting Term - Finance Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.WeightedAverageRemainingYearsRemainingToAccountingTermFinance,
        },
        {
          Display:
            'Weighted-Average Remaining Years to Accounting Term - Operating Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.WeightedAverageRemainingYearsRemainingToAccountingTermOperating,
        },
        {
          Display:
            'Weighted-Average Remaining Years to Expiration - Finance Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.WeightedAverageYearsRemainingToExpirationFinance,
        },
        {
          Display:
            'Weighted-Average Remaining Years to Expiration - Operating Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.WeightedAverageYearsRemainingToExpirationOperating,
        },
        {
          Display: 'Weighted-Average Discount Rate - Finance Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.WeightedAverageDiscountRateFinance,
        },
        {
          Display: 'Weighted-Average Discount Rate - Operating Leases',
          PeriodQuarter: item.PeriodQuarter,
          data: item.WeightedAverageDiscountRateOperating,
        },
      ];

      items.forEach((item) => {
        this.pivotCardData.push(item);
      });
    });

    if (this.dataSources.length > 0) {
      this.dataSources[4] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[4],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[4],
        })
      );
    }
    this.loading = false;
  }

  public setShortTermReportingExceptionsMetrics(data) {
    this.pivotCardData = [];
    data.forEach((item) => {
      const items = [
        {
          Display: 'ST Lease & Reporting Exceptions Cost - Cash Basis',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ShortTermLeaseAndReportingExceptionCostCashBasisReporting,
        },
        {
          Display: '- ST Lease & Reporting Exceptions Cost - SL Accrual Basis',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ShortTermLeaseAndReportingExceptionCostAccrualBasisReporting,
        },
      ];
      items.forEach((item) => {
        this.pivotCardData.push(item);
      });
    });

    if (this.dataSources.length > 1) {
      this.dataSources[3] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[3],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[3],
        })
      );
    }
    this.loading = false;
  }

  public setLeaseCostCardData(data) {
    this.pivotCardData = [];

    data.forEach((item) => {
      const total =
        item.FinanceLeaseCostReporting +
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
          PeriodQuarter: item.PeriodQuarter,
          data: item.FinanceLeaseCostReporting,
        },
        {
          Display: ' - Amortization of right-of-use Assets',
          PeriodQuarter: item.PeriodQuarter,
          data: item.AssetAmortizationReporting,
        },
        {
          Display: ' - Interest on Lease Liabilities',
          PeriodQuarter: item.PeriodQuarter,
          data: item.LeaseLiabilityInterestReporting,
        },
        {
          Display: 'Operating Lease Cost',
          PeriodQuarter: item.PeriodQuarter,
          data: item.OperatingLeaseCostReporting,
        },
        {
          Display: 'Short-term Lease & Reporting Exceptions Cost',
          PeriodQuarter: item.PeriodQuarter,
          data: item.ShortTermLeaseAndReportingExceptionCostReporting,
        },
        {
          Display: 'Variable Lease Cost',
          PeriodQuarter: item.PeriodQuarter,
          data: item.VariableLeaseCostReporting,
        },
        {
          Display: 'Variable Cost of Indexed Payments',
          PeriodQuarter: item.PeriodQuarter,
          data: item.VariableLeaseCostOfIndexedPaymentsReporting,
        },
        {
          Display: 'Sublease Income',
          PeriodQuarter: item.PeriodQuarter,
          data: item.SubleaseIncome,
        },
        {
          Display: 'Total Lease Cost',
          PeriodQuarter: item.PeriodQuarter,
          data: total,
        },
      ];

      items.forEach((item) => {
        this.pivotCardData.push(item);
      });
    });

    if (this.dataSources.length > 0) {
      this.dataSources[2] = new PivotGridDataSource({
        store: this.pivotCardData,
        fields: this.fieldConfigs[2],
      });
    } else {
      this.dataSources.push(
        new PivotGridDataSource({
          store: this.pivotCardData,
          fields: this.fieldConfigs[2],
        })
      );
    }
    this.loading = false;
  }

  mergeArraysOfObjects(
    data1: { [key: string]: any }[],
    data2: { [key: string]: any }[]
  ): Array<object> {
    if (data1.length === 0 && data2.length === 0) {
      return [];
    }
    if (data1.length === 0) {
      return data2;
    }
    if (data2.length === 0) {
      return data1;
    }

    const hashMap = new Map(
      data2.map((item) => {
        return [`${item.DueByQuarter}`, item];
      })
    );
    const mergedArray = data1.map((item) => {
      const key = item.PeriodQuarter;
      const itemToMerge = hashMap.get(key);
      if (itemToMerge && typeof itemToMerge === 'object') {
        return { ...item, ...itemToMerge };
      }
      return item;
    });
    return mergedArray;
  }

  public setFieldConfigs() {
    this.inAppDisclosureService
      .getIADCardConfigs(this.dashboardId)
      .subscribe((result) => {
        result.data.forEach((card) => {
          let config = JSON.parse(card.CardJSONSchema);
          config[0].sortingMethod = this.rowSort;
          config[2].sortingMethod = this.disclosureClassificationSort;

          switch (card.Title) {
            case 'ASC 842 Quarterly Disclosures Lease Counts':
              config[config.length - 1].calculateSummaryValue = function (
                summaryCell
              ) {
                if (
                  summaryCell.field('column')?.dataField === 'PeriodQuarter'
                ) {
                  return summaryCell.value() / 2;
                } else {
                  return summaryCell.value();
                }
              };
              break;
            case 'ASC 842 Quarterly Disclosures ROU Asset Balance':
              config[0].width = 134.469;
              config[3].format = {
                type: 'fixedPoint',
                precision: this.currencyDecimalPrecision,
              };
              config[config.length - 1].calculateSummaryValue = function (
                summaryCell
              ) {
                if (
                  summaryCell.field('column')?.dataField === 'PeriodQuarter'
                ) {
                  return summaryCell.value() / 2;
                } else {
                  return summaryCell.value();
                }
              };
              break;
            case 'ASC 842 Quarterly Disclosures Lease Cost':
              config[0].width = 180;
              config[2].format = {
                type: 'fixedPoint',
                precision: this.currencyDecimalPrecision,
              };
              break;
            case 'ASC 842 Quarterly Disclosures Reporting Exceptions Cost':
              config[0].width = 200;
              config[2].format = {
                type: 'fixedPoint',
                precision: this.currencyDecimalPrecision,
              };
              break;
            case 'ASC 842 Quarterly Disclosures Other Information':
              config[0].width = 200;
              config[2].format = {
                type: 'fixedPoint',
                precision: this.currencyDecimalPrecision,
              };
              break;
            case 'ASC 842 Quarterly Disclosures Lease Liability Maturity Analysis':
              config[0].width = 200;
              config[2].format = {
                type: 'fixedPoint',
                precision: this.currencyDecimalPrecision,
              };
              break;
            case 'ASC 842 Quarterly Disclosures Lease Liability Reconciliation':
              config[0].width = 200;
              config[2].format = {
                type: 'fixedPoint',
                precision: this.currencyDecimalPrecision,
              };
              config[config.length - 1].summaryType = 'sum';
              break;
            case 'ASC 842 Quarterly Disclosures Future Commitments':
              config[0].width = 200;
              config[2].format = {
                type: 'fixedPoint',
                precision: this.currencyDecimalPrecision,
              };
              break;
          }

          config[config.length - 1].calculateCustomSummary = (options) => {
            switch (options.summaryProcess) {
              case 'start':
                options.totalValue = 0;
                break;
              case 'calculate':
                options.totalValue += options.value;
                break;
              case 'finalize':
                options.totalValue = options.totalValue.toFixed(
                  this.currencyDecimalPrecision
                );
                break;
            }
          };
          this.fieldConfigs.push(config);
        });
      });
  }

  public rowSort(a, b) {
    const rowSortOrderObject = {
      'Opening Lease Count': 1,
      ' - Leases Added': 2,
      ' - Leases Expired/Cancelled': 3,
      'Closing Lease Count': 4,
    };

    if (rowSortOrderObject?.[a.value] > rowSortOrderObject?.[b.value]) return 1;
    if (rowSortOrderObject?.[b.value] > rowSortOrderObject?.[a.value])
      return -1;
    else return 0;
  }

  public disclosureClassificationSort(a, b) {
    const disclosureClassificationSortOrderObject = {
      Mixed: 1,
      Finance: 2,
      'Finance 842': 2.5,
      Operating: 3,
      'Operating 842': 3.5,
      Total: 4,
    };

    if (
      disclosureClassificationSortOrderObject?.[a.value] >
      disclosureClassificationSortOrderObject?.[b.value]
    )
      return 1;
    if (
      disclosureClassificationSortOrderObject?.[b.value] >
      disclosureClassificationSortOrderObject?.[a.value]
    )
      return -1;
    else return 0;
  }

  public contextMenuPreparing(e) {
    const dataSource = e.component.getDataSource();
    const sourceField = e.field;

    if (sourceField && sourceField.dataType === 'number') {
      let numberType = 'number';

      const setSummaryType = function (args) {
        let format;
        if (numberType === 'currency') {
          if (args.itemData.value === 'total') {
            format = ',###';
          } else if (args.itemData.value === 'sum') {
            format = ',##0.00';
          }
        } else {
          if (args.itemData.value === 'total') {
            format = ',###';
          } else if (args.itemData.value === 'sum') {
            format = ',###.##';
          }
        }

        if (format) {
          dataSource.field(sourceField.index, {
            summaryType: args.itemData.value,
            format: format,
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
    this.updateDimension();
  }

  public updateDimension() {
    this.pivotGrid?.instance.updateDimensions();
    setTimeout(() => {
      this.pivotGrid?.instance.updateDimensions();
    });
  }
}
