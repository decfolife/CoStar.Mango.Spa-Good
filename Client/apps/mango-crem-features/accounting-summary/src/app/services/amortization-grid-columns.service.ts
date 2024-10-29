import { Injectable } from '@angular/core';
import { FormattingService } from './formatting.service';

@Injectable({
  providedIn: 'root',
})
export class AmortizationGridColumnsService {
  private commonStartingColumns = [];
  private commonEndingColumns = []; // is not used for operating 840
  private functionalAssetColumns = [];
  private nonFunctionalAssetColumns = [];
  private operating840Columns = [];
  private capital840Columns = [];
  private finance842Columns = [];
  private ifrs16Columns = [];
  private operating842Columns = [];
  private operatingLessorColumns = [];
  private salesTypeLessorColumns = [];
  private journalEntryColumns = [];
  private jePaymentColumns = [];
  public functionalCurrencyEnabled = undefined;
  public isFiscalCalendar = undefined;
  private classificationId = -1;

  constructor(private formattingService: FormattingService) {}

  // NAME: field is used because we store off the column setting of caption with the appended currency names
  // however local and functional currency can be changed and thus the stored caption will be wrong, so we need
  // to re-append it every time the table is loaded, so we store "name" in order to associated the column correctly

  private updateCommonStartingColumns() {
    this.commonStartingColumns = [
      {
        caption: 'Period Event',
        isParent: true,
        band: 'Period Event',
        columns: [
          {
            caption: 'Period Index',
            name: 'PeriodIndex',
            dataField: 'periodIndex',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Period Begin',
            name: 'PeriodStart',
            dataField: 'periodStart',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            dataType: 'date',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Period End',
            name: 'PeriodEnd',
            dataField: 'periodEnd',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            dataType: 'date',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Year',
            name: 'Year',
            dataField: 'year',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Quarter',
            name: 'Quarter',
            dataField: 'quarter',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Period',
            name: 'Period',
            dataField: 'period',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Days In Period',
            name: 'DaysInPeriod',
            dataField: 'actualDaysInPeriod',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Remaining Term (Months)',
            name: 'RemainingTermInMonths',
            dataField: 'remainingTermInMonths',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Period Name',
            name: 'DisplayPeriod',
            dataField: 'displayPeriod',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'JE Status',
            name: 'JEStatus',
            dataField: 'jeStatus',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Days In Full Period',
            name: 'DaysInFullPeriod',
            dataField: 'daysInFullPeriod',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Period Event',
            name: 'PeriodEvent',
            dataField: 'periodEvent',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Created By Schedule ID',
            name: 'CreatedByScheduleID',
            dataField: 'createdByScheduleID',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Event Index',
            name: 'ScheduleIndex',
            dataField: 'scheduleIndex',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
          },
          {
            caption: 'Is Liability Matured',
            name: 'IsLiabilityMatured',
            dataField: 'isLiabilityMatured',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'false',
            visible: false,
            isParent: false,
            band: 'Period Event',
            headerCellTemplate: 'amortizationHeader',
            cellTemplate: 'pointer',
            calculateCellValue: (rowData) =>
              rowData.isLiabilityMatured ? 'Yes' : 'No',
          },
        ],
      },
    ];
  }

  private updateFunctional842AssetColumns(classificationId: number) {
    this.functionalAssetColumns = [
      {
        caption: 'Functional Asset',
        name: 'Functional_Asset',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'true',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Functional Asset',
        columns: [
          {
            caption: 'Asset Balance - Opening',
            name: 'FunctionalAssetBeginBalance',
            dataField: 'functionalAssetBeginBalance',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Asset Balance - Closing',
            name: 'Functional_AssetBalance',
            dataField: 'functional_AssetBalance',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Asset Amortization',
            name: 'FunctionalAssetAmortization',
            dataField: 'functional_AssetAmortization',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Accumulated Asset Amortization',
            name: 'FunctionalAccumulatedAssetAmortization',
            dataField: 'functional_AccumulatedAssetAmortization',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Total Asset Adjustment',
            name: 'FunctionalAssetAdjustmentAmount',
            dataField: 'functional_AssetAdjustmentAmount',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'ROU Asset Obtained Amount',
            name: 'functional_ROUAssetObtainedAmount',
            dataField: 'functionalROUAssetObtainedAmount',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'System Asset Adjustment',
            name: 'Functional_SystemAssetAdjustment',
            dataField: 'functional_SystemAssetAdjustment',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Manual Asset Adjustment',
            name: 'FunctionalManualAssetAdjustment',
            dataField: 'functional_ManualAssetAdjustment',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Direct Costs',
            name: 'Functional_DirectCostsTotal',
            dataField: 'functional_DirectCostsTotal',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Termination Fee',
            name: 'FunctionalTerminationFee',
            dataField: 'functional_TerminationFee',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
          {
            caption: 'Gain (Loss)',
            name: 'Functional_AdjustmentGainLoss',
            dataField: 'functional_AdjustmentGainLoss',
            usesLocalFormat: 'false',
            usesFunctionalFormat: 'true',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Functional Asset',
          },
        ],
      },
    ];

    if (classificationId === 3 && this.functionalCurrencyEnabled) {
      this.functionalAssetColumns[0].columns.push(
        {
          caption: 'Level Expense',
          name: 'FunctionalLevelExpense',
          dataField: 'functional_LevelExpense',
          usesLocalFormat: 'false',
          usesFunctionalFormat: 'true',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Functional Asset',
        },
        {
          caption: 'ROU Asset Interest Expense',
          name: 'FunctionalROUAssetInterestExpense',
          dataField: 'functional_ROUAssetInterestExpense',
          usesLocalFormat: 'false',
          usesFunctionalFormat: 'true',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Functional Asset',
        }
      );
    }
  }
  // these columns exist both on Functiona AND non functional leases, BUT, they are
  // hidden by default when viewing a functional lease
  private updateNonFunctional842AssetColumns() {
    if (this.functionalCurrencyEnabled) {
      this.nonFunctionalAssetColumns = [
        {
          caption: 'Local Asset',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'true',
          visible: false,
          isParent: true,
          band: 'Local Asset',
          columns: [
            {
              caption: 'Asset Balance - Opening',
              name: 'ROUAssetBeginBalance',
              dataField: 'rouAssetBeginBalance',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Asset Balance - Closing',
              name: 'ROUAsset',
              dataField: 'rouAsset',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Asset Amortization',
              name: 'AssetAmortization',
              dataField: 'assetAmortization',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Accumulated Asset Amortization',
              name: 'AccumulatedAssetAmortization',
              dataField: 'accumulatedAssetAmortization',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Total Asset Adjustment',
              name: 'AssetAdjustment',
              dataField: 'adjustmentAmount',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'ROU Asset Obtained Amount',
              name: 'rouAssetObtainedAmount',
              dataField: 'rouAssetObtainedAmount',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'System Asset Adjustment',
              name: 'SystemAssetAdjustment',
              dataField: 'systemAssetAdjustment',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Manual Asset Adjustment',
              name: 'ManualAssetAdjustment',
              dataField: 'manualAssetAdjustment',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Direct Costs',
              name: 'DirectCosts',
              dataField: 'directCosts',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Termination Fee',
              name: 'TerminationFee',
              dataField: 'terminationFee',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Gain (Loss)',
              name: 'AdjustmentGainLoss',
              dataField: 'adjustmentGainLoss',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Cumulative Asset Adjustment Amount',
              name: 'CumulativeAdjustmentAmount',
              dataField: 'cumulativeAdjustmentAmount',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
          ],
        },
      ];
    } else {
      this.nonFunctionalAssetColumns = [
        {
          caption: 'Local Asset',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'true',
          isParent: true,
          band: 'Local Asset',
          columns: [
            {
              caption: 'Asset Balance - Opening',
              name: 'ROUAssetBeginBalance',
              dataField: 'rouAssetBeginBalance',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Asset Balance - Closing',
              name: 'ROUAsset',
              dataField: 'rouAsset',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Asset Amortization',
              name: 'AssetAmortization',
              dataField: 'assetAmortization',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Accumulated Asset Amortization',
              name: 'AccumulatedAssetAmortization',
              dataField: 'accumulatedAssetAmortization',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Total Asset Adjustment',
              name: 'AssetAdjustment',
              dataField: 'adjustmentAmount',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'ROU Asset Obtained Amount',
              name: 'rouAssetObtainedAmount',
              dataField: 'rouAssetObtainedAmount',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'System Asset Adjustment',
              name: 'SystemAssetAdjustment',
              dataField: 'systemAssetAdjustment',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Manual Asset Adjustment',
              name: 'ManualAssetAdjustment',
              dataField: 'manualAssetAdjustment',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Direct Costs',
              name: 'DirectCosts',
              dataField: 'directCosts',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Termination Fee',
              name: 'TerminationFee',
              dataField: 'terminationFee',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Gain (Loss)',
              name: 'AdjustmentGainLoss',
              dataField: 'adjustmentGainLoss',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
            {
              caption: 'Cumulative Asset Adjustment Amount',
              name: 'CumulativeAdjustmentAmount',
              dataField: 'cumulativeAdjustmentAmount',
              usesLocalFormat: 'true',
              usesFunctionalFormat: 'false',
              visible: false,
              appendsCurrency: 'false',
              headerCellTemplate: 'amortizationHeader',
              isParent: false,
              band: 'Local Asset',
            },
          ],
        },
      ];
    }
  }

  private updateOperating840Columns() {
    this.operating840Columns = this.commonStartingColumns.concat([
      {
        caption: 'Straight Line Expense',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Straight Line Expense',
        columns: [
          {
            caption: 'Straight Line Expense',
            name: 'StraightLineExpense',
            dataField: 'straightLineExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Straight Line Expense',
          },
          {
            caption: 'Cumulative Straight Line Expense',
            name: 'CumulativeStraightLineExpense',
            dataField: 'cumulativeStraightLineExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Straight Line Expense',
          },
        ],
      },
      {
        caption: 'Deferred Rent Expense',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Deferred Rent Expense',
        columns: [
          {
            caption: 'Deferred Lease Expense',
            name: 'DeferredLeaseExpense',
            dataField: 'deferredLeaseExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Deferred Rent Expense',
          },
          {
            caption: 'Cumulative Deferred Lease Expense',
            name: 'CumulativeDeferredLeaseExpense',
            dataField: 'cumulativeDeferredLeaseExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Deferred Rent Expense',
          },
          {
            caption: 'Deferred Lease Expense Balance',
            name: 'DeferredLeaseExpenseBalance',
            dataField: 'deferredLeaseExpenseBalance',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Deferred Rent Expense',
          },
          {
            caption: 'Long Term Liability - Closing',
            name: 'LongTermLiability',
            dataField: 'longTermLiability',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Deferred Rent Expense',
          },
          {
            caption: 'Short Term Liability - Closing',
            name: 'ShortTermLiability',
            dataField: 'shortTermLiability',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Deferred Rent Expense',
          },
        ],
      },
      {
        caption: 'Adjustments',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Adjustments',
        columns: [
          {
            caption: 'Adjustments',
            name: 'AdjustmentAmountOperating13',
            dataField: 'adjustmentAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Adjustments',
          },
          {
            caption: 'Cumulative Adjustments',
            name: 'CumulativeAdjustments',
            dataField: 'cumulativeAdjustments',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Adjustments',
          },
        ],
      },
      {
        caption: 'Payments',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Payments',
        columns: [
          {
            caption: 'Scheduled Payments',
            name: 'CashAPAmount',
            dataField: 'cashAPAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Payments',
          },
          {
            caption: 'Remaining Payments',
            name: 'RemainingPayments',
            dataField: 'remainingPayments',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Payments',
          },
          {
            caption: 'Cumulative Scheduled Payments',
            name: 'CumulativeCash',
            dataField: 'cumulativeCash',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Payments',
          },
        ],
      },
    ]);
  }

  private updateCapital840Columns() {
    this.capital840Columns = this.commonStartingColumns.concat([
      {
        caption: 'Local Asset',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Local Asset',
        columns: [
          {
            caption: 'Asset Balance - Opening',
            name: 'ROUAssetBeginBalance',
            dataField: 'rouAssetBeginBalance',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Local Asset',
          },
          {
            caption: 'Asset Balance - Closing',
            name: 'CapitalLeaseAssetAmount',
            dataField: 'capitalLeaseAssetAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Local Asset',
          },
          {
            caption: 'Accumulated Asset Amortization',
            name: 'AccumulatedAssetAmortization',
            dataField: 'accumulatedAssetAmortization',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Local Asset',
          },
          {
            caption: 'Depreciation Expense',
            name: 'DepreciationExpense',
            dataField: 'depreciationExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Local Asset',
          },
          {
            caption: 'Cumulative Depreciation Expense',
            name: 'CumulativeDepreciationExpense',
            dataField: 'cumulativeDepreciationExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Local Asset',
          },
          {
            caption: 'Asset Adjustment',
            name: 'AssetAdjustment',
            dataField: 'adjustmentAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Local Asset',
          },
          {
            caption: 'Cumulative Asset Adjustment Amount',
            name: 'CumulativeAdjustmentAmount',
            dataField: 'cumulativeAdjustmentAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Local Asset',
          },
        ],
      },
      {
        caption: 'Liability',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        isParent: true,
        band: 'Liability',
        columns: [
          {
            caption: 'Liability Balance - Opening',
            name: 'LiabilityBeginBalance',
            dataField: 'liabilityBeginBalance',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Balance - Closing',
            name: 'CapitalLeaseLiability',
            dataField: 'capitalLeaseLiabilityAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },

          {
            caption: 'Liability Reduction',
            name: 'LiabilityReduction',
            dataField: 'liabilityReductionAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Cumulative Liability Reduction',
            name: 'CumulativeLiabilityReductionAmount',
            dataField: 'cumulativeLiabilityReductionAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Adjustment',
            name: 'LiabilityAdjustment',
            dataField: 'liabilityAdjustmentAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Lease Liability Interest Expense',
            name: 'LeaseLiabilityInterestExpense',
            dataField: 'interestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Cumulative Liability Adjustment',
            name: 'CumulativeLiabilityAdjustmentAmount',
            dataField: 'cumulativeLiabilityAdjustmentAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Cumulative Interest Expense',
            name: 'CumulativeInterestExpense',
            dataField: 'cumulativeInterestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
        ],
      },
    ]);

    this.capital840Columns = this.capital840Columns.concat(
      this.commonEndingColumns
    );
  }

  private updateFinance842Columns() {
    // If functional site setting is on, we concact both
    // else, we concact only non functional
    this.finance842Columns = this.functionalCurrencyEnabled
      ? this.commonStartingColumns
          .concat(this.functionalAssetColumns)
          .concat(this.nonFunctionalAssetColumns)
      : this.commonStartingColumns.concat(this.nonFunctionalAssetColumns);
    this.finance842Columns = this.finance842Columns.concat([
      {
        caption: 'Liability',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Liability',
        columns: [
          {
            caption: 'Liability Balance - Opening',
            name: 'LiabilityBeginBalance',
            dataField: 'liabilityBeginBalance',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Balance - Closing',
            name: 'Liability',
            dataField: 'typeALiabilityAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Reduction',
            name: 'LiabilityReduction',
            dataField: 'liabilityReductionAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Lease Liability Interest Expense',
            name: 'LeaseLiabilityInterestExpense',
            dataField: 'interestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Cumulative Interest Expense',
            name: 'CumulativeInterestExpense',
            dataField: 'cumulativeInterestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
        ],
      },
    ]);

    if (!this.functionalCurrencyEnabled) {
      this.finance842Columns[2].columns.push(
        {
          caption: 'Cumulative Liability Reduction',
          name: 'CumulativeLiabilityReductionAmount',
          dataField: 'cumulativeLiabilityReductionAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Liability Adjustment',
          name: 'LiabilityAdjustment',
          dataField: 'liabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Cumulative Liability Adjustment',
          name: 'CumulativeLiabilityAdjustmentAmount',
          dataField: 'cumulativeLiabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        }
      );
    } else {
      this.finance842Columns[3].columns.push(
        {
          caption: 'Cumulative Liability Reduction',
          name: 'CumulativeLiabilityReductionAmount',
          dataField: 'cumulativeLiabilityReductionAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Liability Adjustment',
          name: 'LiabilityAdjustment',
          dataField: 'liabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Cumulative Liability Adjustment',
          name: 'CumulativeLiabilityAdjustmentAmount',
          dataField: 'cumulativeLiabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        }
      );
    }
    this.finance842Columns = this.finance842Columns.concat(
      this.commonEndingColumns
    );
  }

  private updateOperating842Columns() {
    // If functional site setting is on, we concact both
    // else, we concact only non functional
    this.operating842Columns = this.functionalCurrencyEnabled
      ? this.commonStartingColumns
          .concat(this.functionalAssetColumns)
          .concat(this.nonFunctionalAssetColumns)
      : this.commonStartingColumns.concat(this.nonFunctionalAssetColumns);
    this.operating842Columns = this.operating842Columns.concat([
      {
        caption: 'Liability',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Liability',
        columns: [
          {
            caption: 'Liability Balance - Opening',
            name: 'LiabilityBeginBalance',
            dataField: 'liabilityBeginBalance',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Balance - Closing',
            name: 'Liability',
            dataField: 'typeBLiabilityAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Reduction',
            name: 'LiabilityReduction',
            dataField: 'liabilityReductionAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Lease Liability Interest Expense',
            name: 'LeaseLiabilityInterestExpense',
            dataField: 'interestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Cumulative Interest Expense',
            name: 'CumulativeInterestExpense',
            dataField: 'cumulativeInterestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
        ],
      },
    ]);

    if (!this.functionalCurrencyEnabled) {
      this.operating842Columns[2].columns.push(
        {
          caption: 'Cumulative Liability Reduction',
          name: 'CumulativeLiabilityReductionAmount',
          dataField: 'cumulativeLiabilityReductionAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Liability Adjustment',
          name: 'LiabilityAdjustment',
          dataField: 'liabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Cumulative Liability Adjustment',
          name: 'CumulativeLiabilityAdjustmentAmount',
          dataField: 'cumulativeLiabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        }
      );

      this.operating842Columns[1].columns.push(
        {
          caption: 'Cumulative Level Expense',
          name: 'CumulativeLevelExpense',
          dataField: 'cumulativeLevelExpense',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Local Asset',
        },
        {
          caption: 'Level Expense',
          name: 'LevelExpense',
          dataField: 'levelExpense',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Local Asset',
        }
      );
    } else {
      this.operating842Columns[3].columns.push(
        {
          caption: 'Cumulative Liability Reduction',
          name: 'CumulativeLiabilityReductionAmount',
          dataField: 'cumulativeLiabilityReductionAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Liability Adjustment',
          name: 'LiabilityAdjustment',
          dataField: 'liabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Cumulative Liability Adjustment',
          name: 'CumulativeLiabilityAdjustmentAmount',
          dataField: 'cumulativeLiabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        }
      );
      this.operating842Columns[2].columns.push(
        {
          caption: 'Cumulative Level Expense',
          name: 'CumulativeLevelExpense',
          dataField: 'cumulativeLevelExpense',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Local Asset',
        },
        {
          caption: 'Level Expense',
          name: 'LevelExpense',
          dataField: 'levelExpense',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Local Asset',
        }
      );
    }
    this.operating842Columns = this.operating842Columns.concat(
      this.commonEndingColumns
    );
  }

  private updateIfrs16Columns() {
    this.ifrs16Columns = this.functionalCurrencyEnabled
      ? this.commonStartingColumns
          .concat(this.functionalAssetColumns)
          .concat(this.nonFunctionalAssetColumns)
      : this.commonStartingColumns.concat(this.nonFunctionalAssetColumns);
    this.ifrs16Columns = this.ifrs16Columns.concat([
      {
        caption: 'Liability',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Liability',
        columns: [
          {
            caption: 'Liability Balance - Opening',
            name: 'LiabilityBeginBalance',
            dataField: 'liabilityBeginBalance',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Balance - Closing',
            name: 'Liability',
            dataField: 'typeALiabilityAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Liability Reduction',
            name: 'LiabilityReduction',
            dataField: 'liabilityReductionAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Lease Liability Interest Expense',
            name: 'LeaseLiabilityInterestExpense',
            dataField: 'interestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Cumulative Interest Expense',
            name: 'CumulativeInterestExpense',
            dataField: 'cumulativeInterestExpense',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            visible: false,
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
          {
            caption: 'Cumulative Liability Reduction',
            name: 'CumulativeLiabilityReductionAmount',
            dataField: 'cumulativeLiabilityReductionAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Liability',
          },
        ],
      },
    ]);

    if (!this.functionalCurrencyEnabled) {
      this.ifrs16Columns[2].columns.push(
        {
          caption: 'Liability Adjustment',
          name: 'LiabilityAdjustment',
          dataField: 'liabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Cumulative Liability Adjustment',
          name: 'CumulativeLiabilityAdjustmentAmount',
          dataField: 'cumulativeLiabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        }
      );
    } else {
      this.ifrs16Columns[3].columns.push(
        {
          caption: 'Liability Adjustment',
          name: 'LiabilityAdjustment',
          dataField: 'liabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        },
        {
          caption: 'Cumulative Liability Adjustment',
          name: 'CumulativeLiabilityAdjustmentAmount',
          dataField: 'cumulativeLiabilityAdjustmentAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          visible: false,
          appendsCurrency: 'false',
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Liability',
        }
      );
    }

    this.ifrs16Columns = this.ifrs16Columns.concat(this.commonEndingColumns);
  }

  // is not used for operating 840
  private updateCommonEndingColumns() {
    this.commonEndingColumns = [
      {
        caption: 'Short Term Liability',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Short Term Liability',
        columns: [
          {
            caption: 'Short Term Liability - Opening',
            name: 'ShortTermLiabilityBeginBalance',
            dataField: 'shortTermLiabilityBeginBalance',
            usesLocalFormat: 'true',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Short Term Liability',
          },
          {
            caption: 'Short Term Liability - Closing',
            name: 'ShortTermLiability',
            dataField: 'shortTermLiability',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Short Term Liability',
          },
        ],
      },
    ];

    if ([1, 2, 3, 4].includes(this.classificationId)) {
      this.commonEndingColumns[0].columns.push(
        {
          caption: 'Short Term Liability Reduction',
          name: 'ShortTermLiabilityReductionAmount',
          dataField: 'shortTermLiabilityReductionAmount',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          visible: false,
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Short Term Liability',
        },
        {
          caption: 'Short Term Liability Adjustment',
          name: 'ShortTermLiabilityAdjustment',
          dataField: 'shortTermLiabilityAdjustment',
          usesLocalFormat: 'true',
          usesFunctionalFormat: 'false',
          appendsCurrency: 'false',
          visible: false,
          headerCellTemplate: 'amortizationHeader',
          isParent: false,
          band: 'Short Term Liability',
        }
      );
    }

    this.commonEndingColumns = this.commonEndingColumns.concat([
      {
        caption: 'Long Term Liability',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Long Term Liability',
        columns: [
          {
            caption: 'Long Term Liability - Opening',
            name: 'LongTermLiabilityBeginBalance',
            dataField: 'longTermLiabilityBeginBalance',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Long Term Liability',
          },
          {
            caption: 'Long Term Liability - Closing',
            name: 'LongTermLiability',
            dataField: 'longTermLiability',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Long Term Liability',
          },
          {
            caption: 'Long Term Liability Reduction',
            name: 'LongTermLiabilityReductionAmount',
            dataField: 'longTermLiabilityReductionAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Long Term Liability',
          },
          {
            caption: 'Long Term Liability Adjustment',
            name: 'LongTermLiabilityAdjustment',
            dataField: 'longTermLiabilityAdjustment',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Long Term Liability',
          },
        ],
      },
      {
        caption: 'Payments',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'true',
        isParent: true,
        band: 'Payments',
        columns: [
          {
            caption: 'Scheduled Payments',
            name: 'CashAPAmount',
            dataField: 'cashAPAmount',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Payments',
          },
          {
            caption: 'Remaining Payments',
            name: 'RemainingPayments',
            dataField: 'remainingPayments',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Payments',
          },
          {
            caption: 'Cumulative Scheduled Payments',
            name: 'CumulativeCash',
            dataField: 'cumulativeCash',
            usesLocalFormat: 'true',
            usesFunctionalFormat: 'false',
            appendsCurrency: 'false',
            visible: false,
            headerCellTemplate: 'amortizationHeader',
            isParent: false,
            band: 'Payments',
          },
        ],
      },
    ]);
  }

  private updateOperatingLessorColumns() {
    this.updateOperating840Columns();
    this.operatingLessorColumns = this.operating840Columns;
    this.operatingLessorColumns.forEach((column) => {
      if (column.caption.includes('Straight Line Expense')) {
        column.caption = column.caption.replace(
          'Straight Line Expense',
          'Straight Line Income'
        );
        column.band = column.band.replace(
          'Straight Line Expense',
          'Straight Line Income'
        );
      }
      if (column.caption.includes('Deferred Rent Expense')) {
        column.caption = column.caption.replace(
          'Deferred Rent Expense',
          'Deferred Rent Receivable'
        );
        column.band = column.band.replace(
          'Deferred Rent Expense',
          'Deferred Rent Receivable'
        );
      }

      column.columns.forEach((subcolumn) => {
        if (subcolumn.caption.includes('Expense')) {
          if (subcolumn.caption.includes('Straight Line Income')) {
            subcolumn.caption = subcolumn.caption.replace(
              'Lease Expense',
              'Rent Receivable'
            );
          } else {
            subcolumn.caption = subcolumn.caption.replace('Expense', 'Income');
            subcolumn.band = subcolumn.band.replace(
              'Deferred Rent Expense',
              'Deferred Rent Receivable'
            );
            subcolumn.band = subcolumn.band.replace(
              'Straight Line Expense',
              'Straight Line Income'
            );
          }
        }
        if (subcolumn.caption.includes('Short Term Liability - Closing')) {
          subcolumn.caption = subcolumn.caption.replace(
            'Short Term Liability - Closing',
            'ST DRR'
          );
          subcolumn.band = subcolumn.band.replace(
            'Deferred Rent Expense',
            'Deferred Rent Receivable'
          );
        }
        if (subcolumn.caption.includes('Long Term Liability - Closing')) {
          subcolumn.caption = subcolumn.caption.replace(
            'Long Term Liability - Closing',
            'LT DRR'
          );
          subcolumn.band = subcolumn.band.replace(
            'Deferred Rent Expense',
            'Deferred Rent Receivable'
          );
        }
      });
    });
  }

  private updateSalesTypeLessorColumns() {
    this.updateCapital840Columns();
    this.salesTypeLessorColumns = this.capital840Columns;
    this.salesTypeLessorColumns.forEach((column) => {
      if (column.caption.includes('Expense')) {
        column.caption = column.caption.replace('Expense', 'Income');
      }
    });
  }

  private updateColumns(classificationId: number) {
    this.classificationId = classificationId;
    this.updateCommonStartingColumns();

    this.updateCommonEndingColumns();
    this.updateFunctional842AssetColumns(classificationId);
    this.updateNonFunctional842AssetColumns();

    switch (classificationId) {
      case 0:
        this.updateOperating840Columns();
        break;
      case 1:
        this.updateCapital840Columns();
        break;
      case 2:
        this.updateFinance842Columns();
        break;
      case 3:
        this.updateOperating842Columns();
        break;
      case 4:
        this.updateIfrs16Columns();
        break;
      case 5:
        this.updateOperatingLessorColumns();
        break;
      case 6:
        this.updateSalesTypeLessorColumns();
        break;
    }
  }

  public getSummaryColumns(
    classificationId: number,
    functionalCurrencyEnabled: boolean,
    usesFiscalCalendar: boolean
  ) {
    this.functionalCurrencyEnabled = functionalCurrencyEnabled;
    this.isFiscalCalendar = usesFiscalCalendar;
    this.updateColumns(classificationId);

    switch (classificationId) {
      case 0:
        return this.operating840Columns;
      case 1:
        return this.capital840Columns;
      case 2:
        return this.finance842Columns;
      case 3:
        return this.operating842Columns;
      case 4:
        return this.ifrs16Columns;
      case 5:
        return this.operatingLessorColumns;
      case 6:
        return this.salesTypeLessorColumns;
      default:
        return this.commonStartingColumns;
    }
  }

  public getJournalEntryGridColumns() {
    this.journalEntryColumns = [
      {
        caption: 'Period ID',
        name: 'LeaseRecognitionPeriodID',
        dataField: 'leaseRecognitionPeriodID',
        visible: false,
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Account Name',
        name: 'AccountName',
        dataField: 'accountName',
        alignment: 'left',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Account #',
        name: 'AccountCode',
        dataField: 'accountCode',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Sub Account #',
        name: 'AccountSubCode',
        dataField: 'accountSubCode',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Description',
        name: 'Description',
        dataField: 'description',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Debit/Credit',
        name: 'DebitCredit',
        dataField: 'debitCredit',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        alignment: 'left',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Currency',
        name: 'Currency',
        dataField: 'currency',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        alignment: 'left',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Amount',
        name: 'Amount',
        dataField: 'amount',
        usesLocalFormat: 'true',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'IsBalanced',
        name: 'IsBalanced',
        dataField: 'isBalanced',
        visible: false,
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'JE Type',
        name: 'JEType',
        dataField: 'jeType',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Source',
        name: 'SourceAlias',
        dataField: 'sourceAlias',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Segment 1',
        name: 'Segment1',
        dataField: 'segment1',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Segment 2',
        name: 'Segment2',
        dataField: 'segment2',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Segment 3',
        name: 'Segment3',
        dataField: 'segment3',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Segment 4',
        name: 'Segment4',
        dataField: 'segment4',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Cost %',
        name: 'CostPercent',
        dataField: 'costPercent',
        usesLocalFormat: 'false',
        usesFunctionalFormat: 'false',
        appendsCurrency: 'false',
        headerCellTemplate: 'amortizationHeader',
      },
    ];
    return this.journalEntryColumns;
  }

  public getJePaymentGridColumns(dateFormat: string) {
    this.jePaymentColumns = [
      {
        caption: 'Payment Event Source',
        name: 'PaymentEventSource',
        dataField: 'paymentEventSource',
        visible: true,
        alignment: 'left',
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Accounting Name',
        name: 'GlAccountName',
        dataField: 'glAccountName',
        visible: true,
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Recognition Category',
        name: 'RecognitionCategory',
        dataField: 'recognitionCategory',
        visible: true,
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Payment Frequency',
        name: 'PaymentFrequency',
        dataField: 'paymentFrequency',
        visible: true,
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Due By Date',
        name: 'DueBy',
        dataField: 'dueBy',
        dataType: 'date',
        format: dateFormat,
        visible: true,
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Currency',
        name: 'Currency',
        dataField: 'currency',
        visible: true,
        headerCellTemplate: 'amortizationHeader',
        width: '230px',
      },
      {
        caption: 'Amount in Payment Currency',
        name: 'ChargeAmount',
        dataField: 'chargeAmount',
        visible: true,
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Direct Cost',
        name: 'DirectCosts',
        dataField: 'directCosts',
        visible: true,
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Termination Fee',
        name: 'TerminationFees',
        dataField: 'terminationFees',
        visible: true,
        headerCellTemplate: 'amortizationHeader',
      },
      {
        caption: 'Amount Due in Period',
        name: 'ActualAmountDueInPeriod',
        dataField: 'actualAmountDueInPeriod',
        visible: true,
        alignment: 'right',
        headerCellTemplate: 'amortizationHeader',
        appendsCurrency: 'true',
      },
    ];
    return this.jePaymentColumns;
  }
}
