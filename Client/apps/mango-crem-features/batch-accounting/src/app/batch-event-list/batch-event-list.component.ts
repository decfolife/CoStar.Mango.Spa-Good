/* eslint-disable rxjs-angular/prefer-composition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ExportDevexDatagridService } from '@mango/core-shared';

import { DxDataGridComponent, DxTreeViewComponent } from 'devextreme-angular';
import DataGrid from 'devextreme/ui/data_grid';
import { format } from 'sql-formatter';
import { environment } from '@mangoSpa/src/environments/environment.local';

import { BaseService } from '../services/base.service';
import { BatchEventListService } from '../services/batch-event-list.service';
import { BatchParametersService } from '../services/batch-parameters.service';
import { ParametersGridComponent } from './parameters-grid/parameters-grid.component';
import { ParametersCardComponent } from './parameters-card/parameters-card.component';

import {
  AccountingBatch,
  BatchParameter,
  BatchStatus,
  ClassificationParameters,
  ClassificationType,
  GetGridDataRequest,
  ListView,
  MeasureEvent,
  ParametersData,
  Portfolio,
  ScheduleObject,
  WorkflowSettings,
  WorkflowStatus,
} from '../shared/models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { ToastMessageService } from '@batch-accounting/services/toast-message.service';
import { Subscription } from 'rxjs';
import { CLIENT_ERROR_MESSAGE } from '@batch-accounting/shared/models/batch-accounting-constants';

(DataGrid as any).registerModule('columnChooserSorting', {
  extenders: {
    controllers: {
      columns: {
        getChooserColumns: function (loadAllColumns: any) {
          const result = this.callBase(loadAllColumns);

          result.sort(function (col1: any, col2: any) {
            return col1?.caption
              ?.toLowerCase()
              .localeCompare(col2?.caption?.toLowerCase());
          });

          return result;
        },
      },
    },
  },
});

const MAX_SCHEDULE_LIMIT = 10000;

@Component({
  selector: 'mango-batch-event-list',
  templateUrl: './batch-event-list.component.html',
  styleUrls: ['./batch-event-list.component.scss'],
})
export class BatchEventListComponent implements OnInit, OnDestroy {
  selectedPortfolio: number | null = null;
  availableAppliedFilterCount = 0;
  currentStep = 0;

  availableSearchText: string | null = null;

  showClearFilters = false;
  filterBuilderVisible = false;
  isListViewDropdownOpened = false;
  loading = false;
  userFilterApplied = false;
  batchQueueing = false;
  sqlPopupVisible = false;
  showLimitReachedMessage = false;

  showLoader = true;
  portfoliosLoaded = false;
  workflowStatusesLoaded = false;
  listViewsLoaded = false;

  selectedView: ListView;
  selectedViewWorkflowStatus: WorkflowStatus;

  scheduleObject: ScheduleObject;

  portfolios: Portfolio[];

  listViewDataSource: any;
  listViewDisplayDataSource: any;
  viewData: any;

  batchSchedules: any[] = [];
  columnsDef: any[] = [];
  visibleColumns: any[];
  sortedFilterFields: any[] = [];
  gridColumns: any[] | null = [];
  gridData: any[] | null = [];
  gridDataFiltered: any[] | null = null;

  selectedClassificationTypes: ClassificationType[];
  classificationTypes: ClassificationType[];
  workflowStatuses: WorkflowStatus[];

  parametersData: ParametersData;
  formattedSql = '';

  private workflowSettings: WorkflowSettings;
  private hasListener = false;
  private includedDataFieldsFromLastGridReload: any[];
  private gridState: any | null = null;
  private lastListPageId = 0;
  private options = ['Queue for validation and process'];
  isSuperUser = false;
  selectedPortfolioName: string;
  selectedWorkflowStatusName: string;
  selectedViewName: string;

  faCaretDown = faCaretDown;
  private subscriptions: Subscription[] = [];
  ignoreFilterCount = false;

  @ViewChild('AvailableDataGrid', { static: false })
  availableDataGrid: DxDataGridComponent;

  @ViewChild('ListViewTree', { static: false })
  listViewTree: DxTreeViewComponent;

  @ViewChild('ParametersGrid')
  parametersGrid: ParametersGridComponent;

  @ViewChild('ParametersCard')
  parametersCard: ParametersCardComponent;

  get selectedCount(): number {
    if (!this.availableDataGrid || !this.availableDataGrid.selectedRowKeys) {
      return 0;
    }

    return Math.min(
      this.availableDataGrid.selectedRowKeys.length,
      MAX_SCHEDULE_LIMIT
    );
  }

  get readyForGrid() {
    return (
      !!this.selectedPortfolio &&
      !!this.selectedViewWorkflowStatus &&
      !!this.selectedView
    );
  }

  constructor(
    public baseService: BaseService,
    public toastMessage: ToastMessageService,
    public batchEventListService: BatchEventListService,
    private batchParametersService: BatchParametersService,
    private exportToExcelService: ExportDevexDatagridService,
    public router: Router,
    public cdRef: ChangeDetectorRef,
    private mangoAppFacade: MangoAppFacade
  ) {
    this.resetParametersData();
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.populatePortfolios();
    this.populateWorkflowStatuses();
    this.populateListViews();
    this.populateMeasureEvents();
    this.gridData = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getUserInfo() {
    this.subscriptions.push(
      this.mangoAppFacade.contactRecord$.subscribe((contact) => {
        this.isSuperUser = contact.userRoleName === 'SuperUser' ? true : false;
      })
    );
  }

  populateMeasureEvents(): void {
    this.subscriptions.push(
      this.batchParametersService.getRemeasureTypes().subscribe((result) => {
        if (result?.success) {
          this.parametersData.measureEvents = result.data;
        } else {
          this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
        }
      })
    );
  }

  populatePortfolios(): void {
    this.subscriptions.push(
      this.baseService.getPortfolios().subscribe((result) => {
        if (result?.success) {
          this.portfolios = result.data;
          this.portfoliosLoaded = true;
          this.updateShowLoaderValue();
        } else {
          this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
        }
      })
    );
  }

  populateWorkflowStatuses(): void {
    this.subscriptions.push(
      this.batchEventListService.getWorkflowStatuses().subscribe((result) => {
        if (result?.success) {
          // The parameters card will handle its own sorting/filtering
          this.parametersData.workflowStatuses = result?.data?.item1;
          this.workflowStatuses = result?.data.item1
            .filter((workflow) => workflow.allowScheduleEdit)
            .sort((a, b) => a.statusOrder - b.statusOrder);

          this.workflowSettings = result?.data.item2;
          this.parametersData.workflowSettings = this.workflowSettings;
          this.workflowStatusesLoaded = true;
          this.updateShowLoaderValue();
        } else {
          this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
        }
      })
    );
  }

  populateListViews(): void {
    this.subscriptions.push(
      this.batchEventListService.getListViews().subscribe((result) => {
        if (!result) {
          this.listViewsLoaded = true;
          this.updateShowLoaderValue();
          this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
          return;
        }

        const {
          coStarListViews,
          hiddenListViews,
          myListViews,
          sharedListViews,
        } = result.data;

        [
          coStarListViews,
          hiddenListViews,
          myListViews,
          sharedListViews,
        ].forEach((list) => {
          list.forEach((item) => {
            if (item.id === item.listPageId) {
              item.id = `${item.listViewType}.${item.id}.0`;
            }

            item.id = `${item.listViewType}.${item.id}.${item.listPageId}`;
          });
        });

        this.cleanDateFilters([
          ...coStarListViews,
          ...hiddenListViews,
          ...myListViews,
          ...sharedListViews,
        ]);

        this.listViewDataSource = [
          {
            expanded: false,
            id: 11111111,
            name: 'CoStar List Views',
            items: coStarListViews,
          },
          {
            expanded: false,
            id: 22222222,
            name: 'My List Views',
            items: myListViews,
          },
          {
            expanded: false,
            id: 33333333,
            name: 'Shared With Me',
            items: sharedListViews,
          },
          {
            expanded: false,
            id: 44444444,
            name: 'Hidden List Views',
            items: hiddenListViews,
          },
        ];

        this.listViewDisplayDataSource = [
          ...coStarListViews,
          ...hiddenListViews,
          ...myListViews,
          ...sharedListViews,
        ];

        this.listViewsLoaded = true;
        this.updateShowLoaderValue();
      })
    );
  }

  copyToClipboard() {
    const sql = document.getElementById('dynamic-sql')?.innerText;
    const el = document.createElement('textarea');

    el.value = sql;

    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.toastMessage.showToast(
      'success',
      'Copy to Clipboard',
      'Query successfully copied to the clipboard.'
    );
  }

  closeSqlPopup() {
    this.sqlPopupVisible = false;
  };

  showDynamicSQL() {
    const viewId =
      this.selectedView.listViewType === 1
        ? null
        : +this.selectedView.id.toString().split('.')[1];

    const getGridDataRequest: GetGridDataRequest = {
      ListPageId: this.selectedView.listPageId,
      UserViewId: viewId,
      MasterGroupId: this.selectedPortfolio,
      GridStateOverride: this.gridState ? JSON.stringify(this.gridState) : '',
      BatchAccountingWorkflowStatus:
        this.selectedViewWorkflowStatus.workflowStatus,
    };

    this.subscriptions.push(
      this.batchEventListService
        .getDynamicSQL(getGridDataRequest)
        .subscribe((res) => {
          if (!res?.success) {
            this.toastMessage.showError(
              'An error occurred while generating the sql for this view. Please see the error logs for further details.'
            );
            return;
          }

          const leftRegEx = new RegExp('\\[\\s', 'g');
          const rightRegEx = new RegExp('\\s\\]', 'g');

          this.formattedSql = format(res.data)
            .replace(leftRegEx, '[')
            .replace(rightRegEx, ']');

          this.sqlPopupVisible = true;
        })
    );
  }

  onGridSelectionChanged(rowData: any) {
    // This forces the summary items to be recalculated
    rowData.component.instance().refresh();
  }

  calculateSelectedRow(options): void {
    if (options.name !== 'SelectedRowsSummary') {
      return;
    }

    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
      return;
    }

    if (options.summaryProcess === 'calculate') {
      options.totalValue = options.component.getSelectedRowKeys().length;
    }
  }

  exportDataGrid(): void {
    if (this.availableDataGrid?.instance) {
      this.exportToExcelService.exportToExcel(
        this.availableDataGrid.instance,
        `AccountingEventListData - ${this.baseService
          .getTimeStamp()
          .toLocaleString()}_${environment.name}`
      );
    }
  }

  availableSearchDataGrid(event): void {
    const searchText = event;
    this.availableDataGrid?.instance.searchByText(searchText);
    this.ignoreFilterCount = true;
  }

  onGridContentReady(e: any): void {
    this.visibleColumns = this.availableDataGrid?.instance.getVisibleColumns();
    this.availableDataGrid?.instance.columnOption(
      this.visibleColumns?.[2]?.dataField,
      'minWidth',
      '100px'
    );

    this.availableDataGrid?.instance.columnOption(
      this.visibleColumns?.[3]?.dataField,
      'minWidth',
      '200px'
    );
    if (!this.ignoreFilterCount) {
      this.updateFilterCount();
    }
    const hasColumns =
      this.availableDataGrid?.instance.getVisibleColumns()?.length > 0;

    if (hasColumns && !this.userFilterApplied) {
      this.availableDataGrid.filterValue = this.viewData?.filterValue;
      this.userFilterApplied = true;
    }
    this.ignoreFilterCount = false;
    this.updateAriaAttributes();
  }

  availableClearGridFilters(e): void {
    e.stopPropagation();

    this.availableDataGrid?.instance.clearFilter();
    this.showClearFilters = false;
  }

  availableToggleClearFilters(): void {
    this.showClearFilters = !this.showClearFilters;
  }

  onPortfolioChange(event: any): void {
    this.selectedPortfolio = event[0]?.masterGroupID;
    this.selectedPortfolioName = event[0]?.portfolioName ?? '';
    this.reloadGrid();
  }

  onWorkflowChanged(event: any): void {
    this.selectedViewWorkflowStatus = event[0];
    this.selectedWorkflowStatusName = event[0]?.workflowStatus ?? '';
    this.reloadGrid();
  }

  // Fat-arrow function for proper 'this' context
  getViewName = () => {
    return this.selectedView?.name;
  };

  onListViewTreeClick(e): void {
    const selectedNodes = e.component.getSelectedNodes();

    if (
      (!selectedNodes.length && !this.selectedView) ||
      (selectedNodes.length && selectedNodes[0].key > 1000000)
    ) {
      return;
    }

    this.isListViewDropdownOpened = false;

    // No 'selection' because the click was on the already-selected view
    if (selectedNodes.length === 0 && this.selectedView) {
      return;
    }

    this.selectedView = this.listViewDisplayDataSource.find(
      (x) => x.id === selectedNodes[0].itemData.id
    );

    this.reloadGrid(true);
  }

  onListViewValueChanged(e: any): void {
    this.selectedViewName = e.value.name ?? '';
    if (e.value) {
      return;
    }

    this.gridData = [];
    this.gridDataFiltered = null;
    this.gridColumns = [];
  }

  logStep(stepper): void {
    stepper.selected.completed = false;

    this.setGridValues();
    this.resetParametersData();

    stepper.selectedIndex = 0;
    this.currentStep = 0;
  }

  parametersStep(stepper): void {
    if (stepper.selectedIndex == 2) {
      stepper.selected.completed = false;
    }
    this.currentStep = 1;

    if (stepper.selectedIndex !== 0) {
      // Not coming from events list
      stepper.selectedIndex = 1;
      return;
    }

    this.batchSchedules = this.availableDataGrid.selectedRowKeys.slice();
    stepper.selected.completed = true;
    stepper.selectedIndex = 1;

    this.buildScheduleObject();

    if (this.showLimitReachedMessage) {
      const message =
        'For performance reasons, your batch has been limited to the first ten thousand schedules selected.';
      this.toastMessage.showInfo(message);
      this.showLimitReachedMessage = false;
    }

    if (this.parametersData.cardMeasureEvent) {
      // Have to wait for the grid to exist
      setTimeout(() => {
        if (
          this.parametersData.gridData?.length === this.batchSchedules.length
        ) {
          this.parametersGrid.checkFullTermination(
            this.parametersData.cardMeasureEvent
          );
          return;
        }

        this.parametersGrid.setMeasurementSettingsByMeasureEvent(
          this.parametersData.cardMeasureEvent
        );
      }, 100);
    }
  }

  onCancel() {
    window?.history?.back();
  }

  confirmationStep(stepper): void {
    stepper.selected.completed = true;
    stepper.selectedIndex = 2;
    this.currentStep = 2;

    this.setGridValues();
  }

  onMeasureEventChange(measureEvent: MeasureEvent): void {
    this.parametersGrid?.setMeasurementSettingsByMeasureEvent(measureEvent);
  }

  displayColumnChooser() {
    this.availableDataGrid?.instance.showColumnChooser();

    if (this.hasListener) {
      return;
    }

    setTimeout(() => {
      const choosers = document.getElementsByClassName(
        'dx-datagrid-column-chooser'
      );

      for (let i = 0; i < choosers.length; i++) {
        const closeButton =
          choosers[i].getElementsByClassName('dx-closebutton')[0];

        if (closeButton && !this.hasListener) {
          closeButton.addEventListener('click', () => {
            this.columnChooserClosed();
          });

          this.hasListener = true;
        }
      }
    }, 100);
  }

  columnChooserClosed() {
    this.hasListener = false;

    const gridColumns = this.availableDataGrid?.instance
      .getVisibleColumns()
      .map((item) => item.dataField)
      .filter((x) => x);

    const hasAllColumns = this.doesLeftArrayIncludeRight(
      this.includedDataFieldsFromLastGridReload,
      gridColumns
    );

    if (!hasAllColumns || this.gridData?.length === 0) {
      this.gridState = this.availableDataGrid?.instance.state();

      this.reloadGrid(true);
    }
  }

  queueBatch(isAutoProcess: boolean) {
    this.batchQueueing = true;

    const viewId =
      this.selectedView.listViewType === 1
        ? null
        : +this.selectedView.id.toString().split('.')[1];

    const clientBatch = new AccountingBatch(
      this.selectedPortfolio,
      BatchStatus.QueuedForValidation,
      -1,
      null,
      -1,
      null,
      isAutoProcess,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );

    const listOfScheduleIds = [];
    const listOfLeaseIds = [];

    this.availableDataGrid?.instance
      .getSelectedRowsData()
      .forEach((row, index) => {
        if (index >= MAX_SCHEDULE_LIMIT) {
          return;
        }

        if (listOfScheduleIds.indexOf(row.LeaseRecognitionScheduleID) === -1) {
          listOfScheduleIds.push(row.LeaseRecognitionScheduleID);
        }

        if (listOfLeaseIds.indexOf(row.OID) === -1) {
          listOfLeaseIds.push(row.OID);
        }
      });

    const batchParameter = new BatchParameter(
      this.parametersData.cardMeasureEvent.remeasureTypeId,
      this.selectedViewWorkflowStatus.workflowStatusID,
      this.parametersData.cardNextWorkflowStatus.workflowStatusID,
      this.parametersData.cardWorkflowComment,
      viewId,
      this.selectedView.listPageId,
      listOfLeaseIds.toString(),
      listOfScheduleIds.toString(),
      null
    );

    clientBatch.batchParameter = batchParameter;

    const classifications: ClassificationParameters[] = [];

    this.parametersData.gridData.forEach((row) => {
      const grid = this.parametersData.grid;
      const overrides = grid.parameterOverrides;

      const isFullTermination = row.remeasureTypeID === 9;

      const accountingTermBeginDate =
        row.beginDateOptionID === 2
          ? isFullTermination
            ? overrides.accountingTermEndDateOverride
            : overrides.accountingTermBeginDateOverride
          : null;

      const accountingTermEndDate =
        row.endDateOptionID === 2
          ? overrides.accountingTermEndDateOverride
          : null;

      const annualRate =
        row.discountRateProfile === 'Direct Entry'
          ? overrides.annualRateOverride
          : 0;

      //Check if it is Operating, Operating Lessor or capital
      const isAsc840 = [0, 1, 5].includes(row.classificationID);

      const paymentTiming = overrides.paymentTimingOverride
        ? overrides.paymentTimingOverride
            .toLocaleLowerCase()
            .startsWith('beginning')
          ? 1
          : 2
        : null;

      const jeProfileId =
        grid.portfolioClassificationConfigurationOptions.journalEntryProfiles.find(
          (x) => x.profileName === row.journalEntryOption
        )?.profileID ?? 0;

      const manualAssetAdjustment =
        row.manualAdjustmentOption === 'Direct Entry'
          ? +overrides.manualAssetAdjustmentOverride
          : 0;

      const rouAssetMethodID =
        grid.portfolioClassificationConfigurationOptions.rouAssetMethods.find(
          (id) => id.name === row.rouAssetObtainedMethodName && !isAsc840
        )?.id ?? null;

      const rouAssetAmount = isAsc840
        ? null
        : rouAssetMethodID === 1
        ? overrides.rouAssetObtainedMethodOverride
        : null;

      const rouAssetDate = isAsc840
        ? null
        : row.defaultRouAssetObtainedDateOption === 'Direct Entry'
        ? overrides.rouAssetObtainedDateOverride
        : null;

      const rouAssetDateMethod = isAsc840
        ? 'Not Applicable'
        : row.defaultRouAssetObtainedDateOption;

      const commentsDirectEntry =
        row.commentsOption === 'Direct Entry' ? overrides.commentsOverride : '';

      classifications.push(
        new ClassificationParameters(
          row.classificationID,
          row.beginDateOptionID,
          row.beginDateFormItemID,
          accountingTermBeginDate,
          row.endDateOptionID,
          row.endDateFormItemID,
          accountingTermEndDate,
          row.discountRateProfile,
          +annualRate,
          overrides.annualRateTypeOverride === 'APR' ? 1 : 2,
          paymentTiming,
          jeProfileId,
          row.journalEntryOption,
          row.manualAdjustmentOption,
          manualAssetAdjustment,
          rouAssetMethodID,
          rouAssetAmount,
          rouAssetDateMethod,
          rouAssetDate,
          row.commentsOption,
          commentsDirectEntry
        )
      );
    });

    clientBatch.batchParameter.classificationParameters = classifications;

    this.subscriptions.push(
      this.batchEventListService
        .queueBatch(clientBatch)
        .subscribe((isSuccess) => {
          const message = isSuccess
            ? 'Batch successfully queued.'
            : 'Batch failed to create.';

          this.toastMessage.showToast(
            isSuccess ? 'success' : 'error',
            isSuccess ? 'Success' : 'Error',
            message
          );
          this.batchQueueing = false;

          if (isSuccess) {
            this.router.navigate(['crem/accounting/batch-accounting'], {
              queryParamsHandling: 'merge',
            });
          }
        })
    );
  }

  directEntryIsValid(): boolean {
    let isValid = true;

    const itemsArray = this.parametersGrid.availableDataGrid?.instance
      .getDataSource()
      ?.items();

    if (!itemsArray) {
      return true;
    }

    const isFullTermination =
      this.parametersData.cardMeasureEvent.remeasureTypeName ===
      'Full Termination';

    itemsArray.forEach((item) => {
      if (item.beginValueExpr === 'OptionID: 2 FormItemID: -1') {
        if (
          !this.parametersGrid.parameterOverrides
            .accountingTermBeginDateOverride &&
          !isFullTermination
        ) {
          isValid = false;
        }
      }

      if (item.endValueExpr === 'OptionID: 2 FormItemID: -1') {
        if (
          !this.parametersGrid.parameterOverrides.accountingTermEndDateOverride
        ) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  private updateFilterCount() {
    const filters = this.availableDataGrid?.instance.getCombinedFilter(true);
    const filterProperties = [];

    let filterArrays = [];

    if (filters) {
      const hasSearchText =
        this.availableSearchText !== null && this.availableSearchText !== '';

      filterArrays = hasSearchText
        ? filters[2].filter((itm) => Array.isArray(itm))
        : filters.filter((itm) => Array.isArray(itm));

      if (filterArrays.length === 0) {
        filterProperties.push(filters[0]);
      }

      filterArrays.forEach((itm) => {
        if (!filterProperties.includes(itm[0][0])) {
          filterProperties.push(itm[0][0]);
        }
      });
    }

    this.availableAppliedFilterCount = filters ? filterProperties.length : 0;
  }

  private cleanDateFilters(listViews) {
    listViews.forEach((lv) => {
      const view = JSON.parse(lv.view);
      const dateMatch = /([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9])/;

      let dateCleaned = false;

      // A filter is an array of strings: ['filterField', 'check', 'filterValue']
      // The `view.filterValue` is either a single filter, or a jagged array comprised
      // of filters and operators ('and', 'or', etc.).
      //    e.g. `filterValue: [[filter], 'and', [filter]]`

      // Handle when filter is an array of length 3 and the 3rd item is not an array
      // (i.e. a single filter)
      if (
        view.filterValue?.length === 3 &&
        !Array.isArray(view.filterValue[2])
      ) {
        const match = view.filterValue[2]?.toString().match(dateMatch);

        if (match) {
          const date = new Date(match[0].replaceAll('-', '/'));

          if (isNaN(+date)) {
            view.filterValue[2] = this.baseService.filterFormatter(
              new Date('0001')
            );
            lv.view = JSON.stringify(view);

            return;
          }

          view.filterValue[2] = this.baseService.filterFormatter(date);
          lv.view = JSON.stringify(view);
        }

        return;
      }

      // Handle when filter is an array of filters
      view.filterValue?.forEach((val, index) => {
        if (!Array.isArray(val)) {
          return;
        }

        const match = val[2]?.toString().match(dateMatch);

        if (match) {
          const date = new Date(match[0].replaceAll('-', '/'));

          if (isNaN(+date)) {
            view.filterValue[index][2] = this.baseService.filterFormatter(
              new Date('0001')
            );
          } else {
            view.filterValue[index][2] = this.baseService.filterFormatter(date);
          }

          dateCleaned = true;
        }
      });

      if (dateCleaned) {
        lv.view = JSON.stringify(view);
      }
    });
  }

  private resetParametersData() {
    this.parametersData = {
      // Don't reset these three since they're only loaded once
      workflowSettings: this.parametersData?.workflowSettings,
      workflowStatuses: this.parametersData?.workflowStatuses,
      measureEvents: this.parametersData?.measureEvents,

      cardMeasureEvent: null,
      cardNextWorkflowStatus: null,
      cardWorkflowComment: '',

      grid: null,
      gridData: null,
      gridOverrides: null,
      gridLoaded: false,
    };
  }

  private setGridValues() {
    this.parametersData.grid = this.parametersGrid;
    this.parametersData.gridData = this.parametersGrid?.gridData;
    this.parametersData.gridOverrides = this.parametersGrid?.parameterOverrides;
    this.parametersData.gridLoaded = true;
  }

  private loadGridData(listPageId: number, userViewId: number): void {
    const getGridDataRequest: GetGridDataRequest = {
      ListPageId: listPageId,
      UserViewId: userViewId,
      MasterGroupId: this.selectedPortfolio,
      GridStateOverride: this.gridState ? JSON.stringify(this.gridState) : '',
      BatchAccountingWorkflowStatus:
        this.selectedViewWorkflowStatus.workflowStatus,
    };

    this.subscriptions.push(
      this.batchEventListService
        .getGridData(getGridDataRequest)
        .subscribe((result) => {
          if (result?.success) {
            this.gridData = result.data;
            this.gridState = null;

            this.filterGridData();
            this.includedDataFieldsFromLastGridReload = this.gridData?.length
              ? this.getObjectsValuesFrom(this.gridData[0])
              : [];

            const view = JSON.parse(this.selectedView.view);
            const pageSize = view.pageSize;

            setTimeout(() => {
              this.availableDataGrid?.instance?.pageSize(pageSize);
            }, 10);

            this.loading = false;
          } else {
            this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
          }
        })
    );
  }

  private getGridColumns(
    listPageId: number,
    view: string,
    forceReload = false
  ): void {
    if (listPageId === this.lastListPageId && !forceReload) {
      return;
    }

    this.viewData = JSON.parse(view);
    this.lastListPageId = listPageId;

    this.subscriptions.push(
      this.batchEventListService
        .getColumnDefinitionList(listPageId)
        .subscribe((result) => {
          if (result?.success) {
            this.columnsDef = result.data.columnDefinitions;
            this.gridColumns = [];

            const viewColumns = this.viewData.columns;

            this.columnsDef.forEach((col: any) => {
              const viewColumn = viewColumns.filter(
                (x: any) =>
                  x.dataField?.replace(' ', '') ===
                  col.dataField?.replace(' ', '')
              )[0];

              let column: any = {
                dataField: col.dataField,

                visible: viewColumn ? viewColumn.visible : false,

                visibleIndex: viewColumn ? viewColumn.visibleIndex : -1,

                showInColumnChooser: true,
              };

              column = Object.assign(column, viewColumn);

              column.caption = col.caption ?? col.dataField?.replace('_', ' ');
              column.useDefaultObjectFields = col.useDefaultObjectFields;
              column.fieldType = col.fieldType;
              column.dataType = col.dataType ?? 'string';
              column.format = col.format;

              this.gridColumns.push(column);
            });

            // The state has already been applied before the column order was
            // overriden by the loop assignment above - need to re-sort.
            this.gridColumns.sort(
              (n1, n2) => n1.visibleIndex - n2.visibleIndex
            );

            this.sortedFilterFields = this.gridColumns.slice().sort((a, b) => {
              return a.caption
                .toLowerCase()
                .localeCompare(b.caption.toLowerCase());
            });

            // This internally enforces 'columns' (filters) to respect the current
            // view settings.
            this.cdRef.detectChanges();
          } else {
            this.toastMessage.showError(CLIENT_ERROR_MESSAGE);
          }
        })
    );
  }

  private doesLeftArrayIncludeRight(source: string[], mustInclude: string[]) {
    for (const column of mustInclude) {
      if (!source.includes(column)) {
        return false;
      }
    }

    return true;
  }

  private getObjectsValuesFrom(object: any) {
    const result: string[] = [];

    Object.keys(object).map(function (key) {
      result.push(key);
    });

    return result;
  }

  private reloadGrid(forceColumnReload = false): void {
    if (!this.readyForGrid) {
      return;
    }

    this.loading = true;
    this.userFilterApplied = false;
    this.gridData = null;
    this.gridDataFiltered = null;

    const view = this.gridState
      ? JSON.stringify(this.gridState)
      : this.selectedView.view;

    this.getGridColumns(this.selectedView.listPageId, view, forceColumnReload);

    const viewId =
      this.selectedView.listViewType === 1
        ? null
        : +this.selectedView.id.toString().split('.')[1];

    this.loadGridData(this.selectedView.listPageId, viewId);
  }

  private filterGridData(): void {
    this.gridDataFiltered = null;

    if (!this.readyForGrid) {
      return;
    }

    this.gridDataFiltered = this.gridData.filter((schedule) => {
      const isSameStatus =
        schedule.Lease_AccountingWorkflowStatus ===
        this.selectedViewWorkflowStatus.workflowStatus;
      const filterCapital840 =
        this.portfolios.find((x) => x.masterGroupID === this.selectedPortfolio)
          ?.calendarID !== 1;
      const isCapital840 = schedule.ClassificationID === 1;

      return (
        isSameStatus &&
        schedule.LsIsPublished &&
        (filterCapital840 ? !isCapital840 : true)
      );
    });
  }

  private updateShowLoaderValue() {
    this.showLoader =
      !this.portfoliosLoaded ||
      !this.workflowStatusesLoaded ||
      !this.listViewsLoaded;
  }

  private buildScheduleObject(): void {
    const leaseAbstractIDs: number[] = [];
    const leaseRecognitionScheduleIDs: number[] = [];
    const classificationTypes: ClassificationType[] = [];

    const selectedPortfolio = this.portfolios.find((portfolio) => {
      return portfolio.masterGroupID === this.selectedPortfolio;
    });

    this.batchSchedules.forEach((schedule, index) => {
      if (index >= MAX_SCHEDULE_LIMIT) {
        this.showLimitReachedMessage = true;
        return;
      }

      if (!leaseAbstractIDs.includes(schedule.OID)) {
        leaseAbstractIDs.push(schedule.OID);
      }

      if (
        !classificationTypes.find(
          (x) => x.classificationID === schedule.ClassificationID
        )
      ) {
        const classificationType: ClassificationType = {
          classificationID: schedule.ClassificationID,
          classificationType: schedule.ClassificationType,
        };

        classificationTypes.push(classificationType);
      }

      if (
        !leaseRecognitionScheduleIDs.includes(
          schedule.LeaseRecognitionScheduleID
        )
      ) {
        leaseRecognitionScheduleIDs.push(schedule.LeaseRecognitionScheduleID);
      }
    });

    this.scheduleObject = {
      SelectedWorkflowStatus: this.selectedViewWorkflowStatus,
      SelectedPortfolio: selectedPortfolio,
      SelectedView: this.selectedView,
      ClassificationTypes: classificationTypes,
      LeaseAbstractIDs: leaseAbstractIDs,
      LeaseRecognitionScheduleIDs: leaseRecognitionScheduleIDs,
    };

    this.selectedClassificationTypes = classificationTypes;
    this.classificationTypes = classificationTypes;
  }

  updateAriaAttributes() {
    const rows = document.querySelectorAll('.dx-checkbox-icon');
    rows.forEach((item) => {
      const isChecked = item.classList.contains('dx-checkbox-checked');
      const ariaLabel = isChecked ? 'Selected' : 'Not selected';
      item.setAttribute('aria-label', ariaLabel);
    });
  }
}
