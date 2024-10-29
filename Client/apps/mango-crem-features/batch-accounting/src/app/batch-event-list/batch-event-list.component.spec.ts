/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatStepperModule } from '@angular/material/stepper';
import { DevExtremeModule } from 'devextreme-angular';

import { environment } from '@mangoSpa/src/environments/environment.local';

import { BatchEventListComponent } from './batch-event-list.component';
import { Router } from '@angular/router';

const serviceMock = (returnObj) => () => ({ subscribe: (fn) => fn(returnObj) });

describe('BatchEventListComponent', () => {
  let component: BatchEventListComponent;
  let fixture: ComponentFixture<BatchEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchEventListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        DevExtremeModule,
        MatStepperModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isSuperUser getter', () => {
    expect(component).toHaveProperty('isSuperUser');

    environment.name = 'LOCAL';
    expect(component.isSuperUser).toBeTruthy();
    environment.name = 'whatever';
    expect(component.isSuperUser).toBeFalsy();
    (component as any).isSuperUserElement = { innerText: 'true' };
    expect(component.isSuperUser).toBeTruthy();
  });

  it('should have selectedCount getter ', () => {
    expect(component).toHaveProperty('selectedCount');

    expect(component.selectedCount).toEqual(0);
    component.availableDataGrid = {} as any;
    expect(component.selectedCount).toEqual(0);
    component.availableDataGrid = { selectedRowKeys: [1, 2, 3] } as any;
    expect(component.selectedCount).toEqual(3);
  });

  it('should have readyForGrid getter', () => {
    expect(component).toHaveProperty('readyForGrid');

    expect(component.readyForGrid).toBeFalsy();
    component.selectedPortfolio = 1;
    expect(component.readyForGrid).toBeFalsy();
    component.selectedViewWorkflowStatus = {} as any;
    expect(component.readyForGrid).toBeFalsy();
    component.selectedView = {} as any;
    expect(component.readyForGrid).toBeTruthy();
  });

  it('should populate measure events', () => {
    const remeasureTypesSpy = spyOn(
      (component as any).batchParametersService,
      'getRemeasureTypes'
    ).and.callFake(serviceMock(['one type']));

    component.populateMeasureEvents();
    expect(remeasureTypesSpy).toHaveBeenCalled();
    expect(component.parametersData.measureEvents.length).toEqual(1);
  });

  it('should populate portfolios', () => {
    const portfoliosSpy = spyOn(
      component.baseService,
      'getPortfolios'
    ).and.callFake(serviceMock(['one portfolio']));

    component.populatePortfolios();
    expect(portfoliosSpy).toHaveBeenCalled();
    expect(component.portfolios.length).toEqual(1);
  });

  it('should populate workflow statuses', () => {
    const mockData = {
      item1: [
        { allowScheduleEdit: true, statusOrder: 1 },
        { allowScheduleEdit: true, statusOrder: 0 },
      ],
      item2: { isCommentsEnabled: true },
    };
    const wfStatusSpy = spyOn(
      component.batchEventListService,
      'getWorkflowStatuses'
    ).and.callFake(serviceMock(mockData));

    component.populateWorkflowStatuses();
    expect(wfStatusSpy).toHaveBeenCalled();
    expect(component.parametersData.workflowStatuses.length).toEqual(2);
    expect(
      component.parametersData.workflowSettings.isCommentsEnabled
    ).toBeTruthy();
  });

  it('should populate list views', () => {
    let mockData: any = null;
    const listViewSpy = spyOn(
      component.batchEventListService,
      'getListViews'
    ).and.callFake(serviceMock(mockData));

    component.populateListViews();

    mockData = {
      coStarListViews: [
        {
          id: 1,
          listPageId: 1,
          view: '{ "filterValue": ["", "", "2022-01-01"]}',
        },
        {
          id: 2,
          listPageId: 1,
          view: '{ "filterValue": ["", "", ["", "", "2022-01-01"]] }',
        },
      ],
      hiddenListViews: [],
      myListViews: [],
      sharedListViews: [],
    };
    listViewSpy.and.callFake(serviceMock(mockData));
    component.populateListViews();

    expect(listViewSpy).toHaveBeenCalledTimes(2);
    expect(component.listViewDataSource.length).toEqual(4);
    expect(component.listViewDisplayDataSource.length).toEqual(2);
  });

  it('should copy SQL to the clipboard', () => {
    let commandCalled = '';

    (document as any).execCommand = (command) => {
      commandCalled = command;
    };

    component.copyToClipboard();
    expect(commandCalled).toEqual('copy');
  });

  it('should close the SQL popup', () => {
    component.sqlPopupVisible = true;
    component.closeSqlPopup();
    expect(component.sqlPopupVisible).toBeFalsy();
  });

  it('should show dynamic SQL', () => {
    const mockData = { success: false, data: '' };
    const sqlSpy = spyOn(
      component.batchEventListService,
      'getDynamicSQL'
    ).and.callFake(serviceMock(mockData));

    component.selectedView = { id: 1, listViewType: 2 } as any;
    component.selectedViewWorkflowStatus = { workflowStatus: '' } as any;

    component.showDynamicSQL();
    expect(component.sqlPopupVisible).toBeFalsy();

    component.selectedView = { listViewType: 1 } as any;
    (component as any).gridState = {};

    mockData.success = true;
    sqlSpy.and.callFake(serviceMock(mockData));
    component.showDynamicSQL();

    expect(sqlSpy).toHaveBeenCalled();
    expect(component.sqlPopupVisible).toBeTruthy();
  });

  it('should handle grid selection changes', () => {
    let refreshCalled = false;
    const rowData = {
      component: {
        instance: () => ({
          refresh: () => {
            refreshCalled = true;
          },
        }),
      },
    };

    component.onGridSelectionChanged(rowData);
    expect(refreshCalled).toBeTruthy();
  });

  it('should calculate selected row values', () => {
    const opts = {
      name: '',
      summaryProcess: '',
      component: {},
      totalValue: null,
    };

    component.calculateSelectedRow(opts);
    expect(opts.totalValue).toBeNull();

    opts.name = 'SelectedRowsSummary';
    component.calculateSelectedRow(opts);
    expect(opts.totalValue).toBeNull();

    opts.summaryProcess = 'start';
    component.calculateSelectedRow(opts);
    expect(opts.totalValue).toEqual(0);

    opts.summaryProcess = 'calculate';
    opts.component = { getSelectedRowKeys: () => ['', ''] };
    component.calculateSelectedRow(opts);
    expect(opts.totalValue).toEqual(2);
  });

  it('should export the data grid', () => {
    let exportCalled = false;
    component.availableDataGrid = {
      instance: {
        exportToExcel: () => {
          exportCalled = true;
        },
      },
    } as any;

    component.exportDataGrid();
    expect(exportCalled).toBeTruthy();
  });

  it('should search the data grid', () => {
    let searchCalled = false;
    component.availableDataGrid = {
      instance: {
        searchByText: () => {
          searchCalled = true;
        },
      },
    } as any;

    component.availableSearchDataGrid({ value: 'test' });
    expect(searchCalled).toBeTruthy();
  });

  it('should handle the grid content ready event', () => {
    component.availableDataGrid = {
      instance: {
        getVisibleColumns: () => [{}, {}, { dataField: '' }, { dataField: '' }],
        columnOption: () => {},
        getCombinedFilter: () => [],
      },
    } as any;

    component.userFilterApplied = false;
    component.onGridContentReady();
    expect(component.userFilterApplied).toBeTruthy();
  });

  it('should clear grid filters', () => {
    let stopCalled = false;
    let clearCalled = false;
    const e = {
      stopPropagation: () => {
        stopCalled = true;
      },
    };

    component.availableDataGrid = {
      instance: {
        clearFilter: () => {
          clearCalled = true;
        },
      },
    } as any;

    component.availableClearGridFilters(e);
    expect(stopCalled).toBeTruthy();
    expect(clearCalled).toBeTruthy();
    expect(component.showClearFilters).toBeFalsy();
  });

  it('should toggle clear filters visibility', () => {
    component.showClearFilters = true;
    component.availableToggleClearFilters();
    expect(component.showClearFilters).toBeFalsy();
  });

  it('should handle portfolio change', () => {
    const reloadSpy = spyOn(component as any, 'reloadGrid');

    component.onPortfolioChange();
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should handle workflow change', () => {
    const reloadSpy = spyOn(component as any, 'reloadGrid');

    component.onWorkflowChanged();
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('should get the view name', () => {
    component.selectedView = { name: 'test' } as any;

    const name = component.getViewName();
    expect(name).toEqual('test');
  });

  it('should handle list view tree click', () => {
    component.isListViewDropdownOpened = true;

    const e = { component: { getSelectedNodes: () => [] } };
    component.onListViewTreeClick(e);
    expect(component.isListViewDropdownOpened).toBeTruthy();

    e.component.getSelectedNodes = () => [{ key: 2000000 }];
    component.onListViewTreeClick(e);
    expect(component.isListViewDropdownOpened).toBeTruthy();

    e.component.getSelectedNodes = () => [];
    component.selectedView = {} as any;
    component.onListViewTreeClick(e);
    expect(component.isListViewDropdownOpened).toBeFalsy();

    const reloadSpy = spyOn(component as any, 'reloadGrid');
    component.listViewDisplayDataSource = [{ id: 1, name: 'test' }];
    e.component.getSelectedNodes = () => [{ itemData: { id: 1 } }];

    component.onListViewTreeClick(e);
    expect(component.selectedView.name).toEqual('test');
    expect(reloadSpy).toHaveBeenCalledWith(true);
  });

  it('should handle list view value change', () => {
    const e = { value: true };
    component.onListViewValueChanged(e);

    component.gridData = [{}, {}];
    component.gridDataFiltered = [{}, {}];
    component.gridColumns = [{}, {}];
    component.onListViewValueChanged({});

    expect(component.gridData.length).toEqual(0);
    expect(component.gridDataFiltered).toBeNull();
    expect(component.gridColumns.length).toEqual(0);
  });

  it('should handle going to the log step', () => {
    const stepper: any = { selected: { completed: true }, selectedIndex: 1 };
    const gridSpy = spyOn(component as any, 'setGridValues');
    const paramSpy = spyOn(component as any, 'resetParametersData');

    component.currentStep = 1;
    component.logStep(stepper);

    expect(stepper.selected.completed).toBeFalsy();
    expect(stepper.selectedIndex).toEqual(0);
    expect(component.currentStep).toEqual(0);
    expect(gridSpy).toHaveBeenCalled();
    expect(paramSpy).toHaveBeenCalled();
  });

  it('should handle going to the parameters step', () => {
    const stepper: any = { selected: { completed: false }, selectedIndex: 2 };
    const bsoSpy = spyOn(component as any, 'buildScheduleObject');

    component.parametersGrid = { checkFullTermination: () => {} } as any;

    component.currentStep = 0;
    component.parametersStep(stepper);

    expect(stepper.selectedIndex).toEqual(1);
    expect(component.currentStep).toEqual(1);

    stepper.selectedIndex = 0;
    component.currentStep = 0;
    component.availableDataGrid = { selectedRowKeys: [] } as any;
    component.parametersStep(stepper);

    expect(stepper.selected.completed).toBeTruthy();
    expect(stepper.selectedIndex).toEqual(1);
    expect(component.currentStep).toEqual(1);
    expect(bsoSpy).toHaveBeenCalled();

    stepper.selectedIndex = 0;
    component.currentStep = 0;
    component.showLimitReachedMessage = true;

    component.batchSchedules = [];
    component.parametersData = { cardMeasureEvent: true, gridData: [] } as any;

    component.parametersStep(stepper);

    expect(component.showLimitReachedMessage).toBeFalsy();
  });

  it('should handle going to the confirmation step', () => {
    const stepper: any = { selected: { completed: false }, selectedIndex: 1 };
    const gridSpy = spyOn(component as any, 'setGridValues');

    component.currentStep = 1;
    component.confirmationStep(stepper);

    expect(stepper.selected.completed).toBeTruthy();
    expect(stepper.selectedIndex).toEqual(2);
    expect(component.currentStep).toEqual(2);
    expect(gridSpy).toHaveBeenCalled();
  });

  it('should handle measure event change', () => {
    let funcCalled = false;
    component.parametersGrid = {
      setMeasurementSettingsByMeasureEvent: () => {
        funcCalled = true;
      },
    } as any;

    component.onMeasureEventChange({} as any);
    expect(funcCalled).toBeTruthy();
  });

  it('should display column chooser', async (done) => {
    let showCalled = false;
    component.availableDataGrid = {
      instance: {
        showColumnChooser: () => {
          showCalled = true;
        },
      },
    } as any;

    component.displayColumnChooser();
    expect(showCalled).toBeTruthy();

    setTimeout(() => {
      (component as any).hasListener = true;
      component.displayColumnChooser();
      done();
    }, 100);
  });

  it('should handle column chooser close', () => {
    (component as any).hasListener = true;
    (component as any).includedincludedDataFieldsFromLastGridReload = [];

    component.availableDataGrid = {
      instance: {
        getVisibleColumns: () => [{ dataField: '' }],
        state: () => {},
      },
    } as any;

    component.columnChooserClosed();
    expect((component as any).hasListener).toBeFalsy();
  });

  it('should queue a batch', inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigate').and.stub();
    const rows = [];
    for (let i = 0; i < 11000; ++i) {
      rows.push({ OID: i, LeaseRecognitionScheduleID: 100 + i });
    }

    component.selectedViewWorkflowStatus = { workflowStatusID: 1 } as any;
    component.selectedView = {
      listViewType: 1,
      listPageId: 1,
    } as any;
    component.availableDataGrid = {
      instance: { getSelectedRowsData: () => rows },
    } as any;
    component.parametersData = {
      cardMeasureEvent: { remeasureTypeId: 1 },
      cardNextWorkflowStatus: { workflowStatusID: 1 },
      cardWorkflowComment: '',
      gridData: [{}],
      grid: {
        parameterOverrides: {
          manualAssetAdjustmentOverride: null,
          paymentTimingOverride: null,
        },
        portfolioClassificationConfigurationOptions: {
          journalEntryProfiles: [],
        },
      },
    } as any;

    const batchSpy = spyOn(
      component.batchEventListService,
      'queueBatch'
    ).and.callFake(serviceMock(true));

    component.queueBatch(false);
    expect(batchSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(['batchlogs'], {
      queryParamsHandling: 'merge',
    });
  }));

  it('should set grid values', () => {
    component.parametersData.gridLoaded = false;
    component.parametersGrid = {
      gridData: [],
      parameterOverrides: {},
    } as any;

    (component as any).setGridValues();
    expect(component.parametersData.gridLoaded).toBeTruthy();
    expect(component.parametersData.gridData.length).toEqual(0);
  });

  it('should load grid data', () => {
    const gridSpy = spyOn(
      component.batchEventListService,
      'getGridData'
    ).and.callFake(serviceMock({ data: [] }));

    component.selectedViewWorkflowStatus = { workflowStatus: 1 } as any;
    component.selectedView = { view: '{}' } as any;

    (component as any).loadGridData(1, 1);
    expect(gridSpy).toHaveBeenCalled();
  });

  it('should get grid columns', () => {
    const data = {
      columnDefinitions: [{ dataField: 'some thing' }],
    };
    const colSpy = spyOn(
      component.batchEventListService,
      'getColumnDefinitionList'
    ).and.callFake(serviceMock(data));
    const json = JSON.stringify({ columns: [{ dataField: 'some thing' }] });

    (component as any).lastListPageId = 1;

    (component as any).getGridColumns(1, json);
    expect(colSpy).toHaveBeenCalledTimes(0);

    (component as any).getGridColumns(1, json, true);
    expect(colSpy).toHaveBeenCalled();
  });

  it('should reload the grid', () => {
    // Make 'readyForGrid' true
    component.selectedPortfolio = 1;
    component.selectedViewWorkflowStatus = {} as any;
    component.selectedView = { listViewType: 1 } as any;

    const spy = spyOn(component as any, 'getGridColumns');
    const loadSpy = spyOn(component as any, 'loadGridData');

    (component as any).reloadGrid(true);
    expect(spy).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should filter grid data', () => {
    // Make 'readyForGrid' true
    component.selectedPortfolio = 1;
    component.selectedViewWorkflowStatus = { workflowStatus: 1 } as any;
    component.selectedView = { listViewType: 1 } as any;

    component.portfolios = [{ masterGroupID: 1, calendarID: 2 }] as any[];

    component.gridData = [
      { Lease_AccountingWorkflowStatus: 1, ClassificationID: 1 },
    ];

    (component as any).filterGridData();
    expect(component.gridDataFiltered.length).toEqual(0);
  });

  it('should build a schedule object', () => {
    // Make 'readyForGrid' true
    component.selectedPortfolio = 1;
    component.selectedViewWorkflowStatus = {} as any;
    component.selectedView = { listViewType: 1 } as any;

    component.portfolios = [{ masterGroupId: 1 }] as any[];
    component.batchSchedules = [
      {
        OID: 1,
        ClassificationID: 1,
        ClassificationType: 1,
        LeaseRecognitionScheduleID: 1,
      },
    ];

    (component as any).buildScheduleObject();
    expect(component.classificationTypes.length).toEqual(1);
  });
});
