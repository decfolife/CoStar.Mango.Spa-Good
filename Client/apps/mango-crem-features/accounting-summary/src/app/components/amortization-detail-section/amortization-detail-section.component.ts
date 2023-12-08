import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { AmortizationGridColumnsService } from '@accounting-summary/services/amortization-grid-columns.service';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { DxDataGridComponent  } from 'devextreme-angular';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'mango-amortization-detail-section',
  templateUrl: './amortization-detail-section.component.html',
  styleUrls: ['./amortization-detail-section.component.scss']
})

export class AmortizationDetailSectionComponent implements OnChanges, OnDestroy {
  @ViewChild("AmortizationDataGrid") amortizationDataGrid: DxDataGridComponent;
  @Input()
  eventScheduleData: any;
  @Input()
  classificationID: number;
  @Input() userInfo: UserInfoResponse;
  componentName = "amortization-grid"
  isGridStateChanged = false;
  amortizationdetailsGridData;
  periodNameHeaderFilterDataSource: any[] = [];
  amortizationDetailColumns = [];
  summaryFields: any = {};
  gridName = 'Periods';
  isLoading = false;
  selectedRowKey: number[];
  customGridClass = 'custom-grid';
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  expanded = true;
  preferenceSavePendingMessage: string;
  initialState = {};
  portfolioSettings: PortfolioSettingsResponse;
  isActionColumnClicked = false;
  selectedRowValue = 0;
  popupVisible = false;
  private subscription = new Subscription();

  constructor(public accountingSummaryService: AccountingSummaryService, private columnService: AmortizationGridColumnsService, private formatService: FormattingService) {
    this.summaryFields = this.getSummaryFields();
    this.preferenceSavePendingMessage = accountingSummaryService.preferenceSavePendingMessage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.eventScheduleData && this.eventScheduleData.leaseRecognitionScheduleID !== undefined && this.classificationID !== undefined &&
            //The first time loading or the value in the dropdown changed
            (changes.eventScheduleData.previousValue === undefined || 
            (changes.eventScheduleData.previousValue.leaseRecognitionScheduleID !== this.eventScheduleData.leaseRecognitionScheduleID))) {
      this.isGridStateChanged = false;
      this.amortizationGridSetup(this.eventScheduleData.leaseRecognitionScheduleID);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onGridOptionChanged(event) {
    if (event.fullName != 'columns' && event.name === 'columns') {
      // The grid state has changed
      this.isGridStateChanged = true;
    }
  }

  amortizationGridSetup(leaseRecognitionScheduleID: number) {
    const amortizationDetails = this.accountingSummaryService.getAmortizationDetails(leaseRecognitionScheduleID);
    const portfolioSettings = this.accountingSummaryService.getPortfolioSettings();
    this.subscription.add(combineLatest([amortizationDetails, portfolioSettings]).subscribe(([amortizationDetailsResponse, portfolioSettingsResponse]) => {
      if (amortizationDetailsResponse.success && portfolioSettingsResponse.success) {
        this.amortizationdetailsGridData = amortizationDetailsResponse.data;
        this.selectedRowKey = [this.amortizationdetailsGridData[0].scheduleIndex];
        this.portfolioSettings = portfolioSettingsResponse.data;
        this.periodNameHeaderFilterDataSource = amortizationDetailsResponse.data.map(amp => { return { text: amp.displayPeriod, value: ['displayPeriod', '=', amp.displayPeriod] } })
 
        this.isEuroDateFormat = this.userInfo.useDateEU;
        if (this.isEuroDateFormat) {
          this.dateFormat = 'dd.MM.yyyy';
        }
        this.amortizationDetailColumns = this.getAmortizationColumns(this.classificationID, this.eventScheduleData, this.periodNameHeaderFilterDataSource);
        this.getGridPreferences();
      } else if (!amortizationDetailsResponse.success || !portfolioSettingsResponse.success) {
        this.accountingSummaryService.errorNotify(!amortizationDetailsResponse.success ? amortizationDetailsResponse.clientErrorMessage : portfolioSettingsResponse.clientErrorMessage);
      }
    }));
  }

  showColumnChooser() {
    this.amortizationDataGrid.instance.showColumnChooser();
  }

  getGridPreferences() {
    this.subscription.add(this.accountingSummaryService.getGridPreferences().subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        const state = JSON.parse(sessionStorage.getItem("amortizationGridStateKey"))
        // Filter the data
        const filteredData = response.data.filter(item => {
          return item.classificationID === this.classificationID && item.gridName === this.gridName;
        });

        if(state !== null) {
          state.columns = [];

          filteredData.forEach((item) => {
            const parsedColumns = JSON.parse(item.columnJson);
            state.columns.push(...parsedColumns);
          });
        }

        this.initialState = state;
        this.amortizationDataGrid.instance.state(state);
        sessionStorage.setItem("amortizationGridStateKey", JSON.stringify(state));
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  resetGrid() {
    this.isGridStateChanged = false;
    this.amortizationDataGrid.instance.state(this.initialState);
  }

  saveGridPreferences() { 
    this.isGridStateChanged = false;
    const newState = this.amortizationDataGrid.instance.state();
    sessionStorage.setItem("amortizationGridStateKey", JSON.stringify(newState));
    const columnsState = this.amortizationDataGrid.instance.state().columns;
    for (let index = 0; index < columnsState.length; index++) {
      if (columnsState[index].name === 'PeriodStart' || columnsState[index].name === 'PeriodEnd') {
        columnsState[index].format = this.dateFormat;
      }
      columnsState[index].appendsCurrency = this.amortizationDataGrid.instance.columnOption(index, 'appendsCurrency');
      columnsState[index].caption = this.amortizationDataGrid.instance.columnOption(index, 'caption');
      columnsState[index].usesLocalFormat = this.amortizationDataGrid.instance.columnOption(index, 'usesLocalFormat');
      columnsState[index].usesFunctionalFormat = this.amortizationDataGrid.instance.columnOption(index, 'usesFunctionalFormat');
      columnsState[index].headerCellTemplate = 'amortizationHeader';
    }
  
    const columns = JSON.stringify(columnsState);
  
    this.subscription.add(this.accountingSummaryService.saveGridPreferences(this.classificationID, this.gridName, columns).subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.initialState = newState;
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }
  
  loadState() {
    return JSON.parse(sessionStorage.getItem("amortizationGridStateKey"));
  }

  saveState(state) {
      sessionStorage.setItem("amortizationGridStateKey", JSON.stringify(state));
    }

  /**
  * Gets the appropriate columns from the service.
  * @param classificationId Lease recognition classification ID
  */
  getAmortizationColumns(classificationId, currencyInfo, periodNameHeaderFilterDataSource) {
      const defaultColumns = this.columnService
        .getSummaryColumns(classificationId, this.portfolioSettings.functionalCurrencyEnabled,
          this.portfolioSettings.leaseRecognitionCalendarID != 1, periodNameHeaderFilterDataSource);
  
      // columns is ultimatly what will be used, it is the default by default
      const columns = defaultColumns;
  
      // these are the columns that appear when the lease's Functional Currency Site Setting is TRUE
      // If these appear, then they have the Functional Currency Name appended behind their captions
      const FunctionalColumns = [
        'Functional_Asset',
        'FunctionalAssetBeginBalance',
        'Functional_AssetBalance',
        'Functional_AccumulatedAssetAmortization',
        'Functional_AssetAmortization',
        'Functional_AssetAdjustmentAmount',
        'Functional_LevelExpense',
        'Functional_ROUAssetInterestExpense',
        'Functional_SystemAssetAdjustment',
        'Functional_ManualAssetAdjustment',
        'Functional_DirectCostsTotal',
        'Functional_TerminationFee',
        'Functional_AdjustmentGainLoss',
      ];
  
      let firstRetroPeriodRow = null;

      columns.forEach((col, index) => {
        col.visibleIndex = col.visibleIndex ?? index;
      
        // Format based on conditions
        if (col.usesLocalFormat === 'true') {
          col.format = value => this.formatService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision);
        } else if (col.usesFunctionalFormat === 'true') {
          col.format = value => this.formatService.functionalFormat(+value, currencyInfo.functionalCurrencyDecimalPrecision);
        } else if (col.name === 'PeriodStart' || col.name === 'PeriodEnd') {
          col.format = this.dateFormat;
        }
      
        // Append currency information to the caption if needed
        if (col.appendsCurrency === 'true') {
          const currency = FunctionalColumns.includes(col.name)
            ? `(${currencyInfo.functionalCurrency})`
            : `(${currencyInfo.localCurrency})`;
          col.caption = `${col.caption} ${currency}`;
        }
      
        // Set the column alignment
        col.alignment = 'center';
      
        // Process sub-columns if they exist
        if (col.columns) {
          col.columns.forEach((subCol, subIndex) => {
  
            subCol.visibleIndex = subCol.visibleIndex ?? subIndex;
      
            if (subCol.usesLocalFormat === 'true') {
              subCol.format = value => this.formatService.localFormat(+value, currencyInfo.localCurrencyDecimalPrecision);
            } else if (subCol.usesFunctionalFormat === 'true') {
              subCol.format = value => this.formatService.functionalFormat(+value, currencyInfo.functionalCurrencyDecimalPrecision);
            } else if (subCol.name === 'PeriodStart' || subCol.name === 'PeriodEnd') {
              subCol.format = this.dateFormat;
            } 

            if (subCol.name === 'AssetAdjustment' || subCol.name === 'Functional_AssetAdjustmentAmount' || subCol.name === 'LiabilityAdjustment') {

              subCol.cellTemplate = (container, options) => {
                if (options.data.isImpactedByRetro && options.text !== null && options.text !== undefined) {
                  if (firstRetroPeriodRow === null || (firstRetroPeriodRow !== null && options.rowIndex === firstRetroPeriodRow)) {
                    container.innerHTML = `<div>${options.text}</div>`;
                    firstRetroPeriodRow = options.rowIndex;
                  } else {
                    container.innerHTML = `<div class="adjust-text">Adjusted</div>`;
                  }
                } else {
                  container.innerHTML = `<div>${options.text}</div>`;
                }
              };
            }
          });
        }
      });

      return columns;
    }

  showPopup(event: any) {
    this.popupVisible = true;
  }

  onPopupHidden() {
    this.popupVisible = false;
  }

  currencyDisplay() {
    return this.amortizationDataGrid[0].functionalCurrency == this.amortizationDataGrid[0].localCurrency ?
      this.amortizationDataGrid[0].localCurrency : this.amortizationDataGrid[0].localCurrency + " | " +
      this.amortizationDataGrid[0].functionalCurrency + ": " + (this.amortizationDataGrid[0].functionalCurrencyRate).toString("N4");
  }

  getSummaryFields() {
    interface SummaryField {
      column: string;
      summaryType: string;
      displayFormat: string | ((value: any) => string);
      alignment?: string;
    }

    const totalItems: Array<SummaryField> = [],
      columns = [
        'DepreciationExpense',
        'AssetAdjustmentAmount',
        'LiabilityReductionAmount',
        'LiabilityAdjustmentAmount',
        'CashAPAmount',
        'StraightLineExpense',
        'DeferredLeaseExpense',
        'AdjustmentAmount',
        'AssetAmortization',
        'InterestExpense',
        'LevelExpense'],
      functionalColumns = [
        'FunctionalAssetAdjustmentAmount',
        'FunctionalAssetAmortization',
        'FunctionalROUAssetInterestExpense',
        'FunctionalLevelExpense'
      ];

    columns.forEach(name => {
      totalItems.push({
        column: name,
        summaryType: 'sum',
        displayFormat: value => this.formatService.localFormat(+value, this.eventScheduleData.localCurrencyDecimalPrecision),
        alignment: 'right'
      });
    });

    functionalColumns.forEach(name => {
      totalItems.push({
        column: name,
        summaryType: 'sum',
        displayFormat: value => this.formatService.functionalFormat(+value, this.eventScheduleData.functionalCurrencyDecimalPrecision),
        alignment: 'right'
      });
    });

    return { totalItems };
  }
}
