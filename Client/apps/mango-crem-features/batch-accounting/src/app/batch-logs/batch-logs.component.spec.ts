/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { DevExtremeModule, DxDataGridModule } from 'devextreme-angular';
import { of } from 'rxjs';

import { BatchLogsComponent } from './batch-logs.component';

jest.mock('file-saver-es');

describe('BatchLogsComponent', () => {
  let component: BatchLogsComponent;
  let fixture: ComponentFixture<BatchLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatchLogsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        DevExtremeModule,
        DxDataGridModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should implement ngOnInit', () => {
    expect(component).toHaveProperty('ngOnInit');

    spyOn(component.baseService, 'getUserRights').and.returnValue(of(2));
    component.ngOnInit();

    expect(component.baseService.dateFormat).toEqual('MM/dd/yyyy');
    expect(component.columns.length).toBeGreaterThan(0);
    expect(component.title).toBe('Batch Accounting');
    expect(component.service.userRights).toEqual(2);

    // Also with European date format
    const el = document.createElement('div') as HTMLDivElement;
    el.id = 'IsEuroDateFormat';
    el.innerHTML = 'true';
    document.body.appendChild(el);

    component.ngOnInit();

    expect(component.baseService.dateFormat).toEqual('dd.MM.yyyy');
  });

  it('should implement ngAfterViewInit', () => {
    expect(component).toHaveProperty('ngAfterViewInit');

    const spy = spyOn(
      (component as any).batchEventService,
      'getListViews'
    ).and.returnValue(
      of({
        coStarListViews: [],
        hiddenListViews: [],
        myListViews: [],
        sharedListViews: [],
      })
    );

    component.ngAfterViewInit();

    expect(spy.calls.count()).toEqual(1);
  });

  it('should populate the grid', async () => {
    expect(component).toHaveProperty('populateBatchLogsAndParameters');

    const spy = spyOn(
      component.service,
      'getBatchLogsAndParameters'
    ).and.returnValue(of({ errors: [] }));

    component.populateBatchLogsAndParameters();

    spy.and.returnValue(
      of([{ listOfLeaseIDs: '1', listOfScheduleIDs: '1,2' }])
    );

    component.populateBatchLogsAndParameters();

    expect((component.batchLogs[0] as any).leaseCount).toEqual(1);
    expect((component.batchLogs[0] as any).batchCount).toEqual(2);

    expect(spy.calls.count()).toEqual(2);
  });

  it('should not display any buttons if no rights', () => {
    component.service.userRights = 0;
    expect(component.menuButtonVisible('whatever', {})).toBeFalsy();

    component.service.userRights = 1;
    expect(component.menuButtonVisible('whatever', {})).toBeFalsy();
  });

  it('should display a download button by batch status', () => {
    component.service.userRights = 2;
    const data = { batchStatus: '' };

    [
      'Validation Complete',
      'Queued for Processing',
      'Complete',
      'Complete with Error',
      'Canceled',
      'Error',
      'Reversed',
    ].forEach((status) => {
      data.batchStatus = status;

      expect(component.menuButtonVisible('download', data)).toBeTruthy();
    });

    ['Queued for Validation', 'Validating', 'Processing'].forEach((status) => {
      data.batchStatus = status;

      expect(component.menuButtonVisible('download', data)).toBeFalsy();
    });
  });

  it('should display a process button by batch status', () => {
    component.service.userRights = 2;
    const data = {
      batchStatus: 'Validation Complete',
      validationSuccessTotal: 1,
    };

    expect(component.menuButtonVisible('process', data)).toBeTruthy();
    data.validationSuccessTotal = 0;
    expect(component.menuButtonVisible('process', data)).toBeFalsy();
  });

  it('should display a cancel button by batch status', () => {
    component.service.userRights = 2;
    const data = { batchStatus: '' };

    [
      'Queued for Validation',
      'Validation Complete',
      'Queued for Processing',
    ].forEach((status) => {
      data.batchStatus = status;

      expect(component.menuButtonVisible('cancel', data)).toBeTruthy();
    });

    [
      'Validating',
      'Processing',
      'Complete',
      'Complete with Error',
      'Canceled',
      'Error',
      'Reversed',
    ].forEach((status) => {
      data.batchStatus = status;

      expect(component.menuButtonVisible('cancel', data)).toBeFalsy();
    });
  });

  it('should display a reverse button by batch status', () => {
    component.service.userRights = 2;
    const data = { batchStatus: '' };

    expect(component.menuButtonVisible('', data)).toBeFalsy();

    ['Complete', 'Complete with Error'].forEach((status) => {
      data.batchStatus = status;

      expect(component.menuButtonVisible('reverse', data)).toBeTruthy();
    });

    [
      'Queued for Validation',
      'Validating',
      'Validation Complete',
      'Queued for Processing',
      'Processing',
      'Canceled',
      'Error',
      'Reversed',
    ].forEach((status) => {
      data.batchStatus = status;

      expect(component.menuButtonVisible('reverse', data)).toBeFalsy();
    });
  });

  it('should map menu callbacks to methods', () => {
    const exportSpy = spyOn(component as any, 'exportExcel');
    component.actionMenuCallback('download', {});
    expect(exportSpy.calls.count()).toEqual(1);

    const processSpy = spyOn(component as any, 'queueForProcessing');
    component.actionMenuCallback('process', {});
    expect(processSpy.calls.count()).toEqual(1);

    const cancelSpy = spyOn(component as any, 'cancelModalToggle');
    component.actionMenuCallback('cancel', {});
    expect(cancelSpy.calls.count()).toEqual(1);

    const reverseSpy = spyOn(component as any, 'reverseBatch');
    component.actionMenuCallback('reverse', {});
    expect(reverseSpy.calls.count()).toEqual(1);
  });

  it('should queue a batch', () => {
    const callResults = [true, false];
    const queueSpy = spyOn(
      component.service,
      'queueForProcessing'
    ).and.callFake((batchId) => {
      return { subscribe: (fn) => fn(callResults[batchId]) };
    });

    component.actionMenuCallback('process', { id: 0 });
    component.actionMenuCallback('process', { id: 1 });

    expect(queueSpy).toHaveBeenCalledTimes(2);
  });

  it('should reverse a batch', () => {
    const callResults = [true, false];
    const reverseSpy = spyOn(component.service, 'reverseBatch').and.callFake(
      (batchId) => {
        return { subscribe: (fn) => fn(callResults[batchId]) };
      }
    );

    component.actionMenuCallback('reverse', { id: 0 });
    component.actionMenuCallback('reverse', { id: 1 });

    expect(reverseSpy).toHaveBeenCalledTimes(2);
  });

  it('should export batch logs to Excel', () => {
    const batchMock = { isAutoProcess: false };
    const batchSpy = spyOn(component.service, 'getBatchById').and.callFake(
      () => {
        return { subscribe: (fn) => fn(batchMock) };
      }
    );

    (component as any).listViews = [{ id: 1 }];
    component.actionMenuCallback('download', {
      userViewID: 1,
      validationStarted: '2022-01-01',
      accountingBatchEvents: [{}],
    });

    expect(batchSpy).toHaveBeenCalled();
  });

  it('should pass through calls to the data grid', () => {
    let showColumnChooserCalled = false;
    let searchByTextCalled = false;

    (component.dataGrid as any) = {
      instance: {
        showColumnChooser: () => {
          showColumnChooserCalled = true;
        },
        searchByText: () => {
          searchByTextCalled = true;
        },
      },
    };

    component.showColumnChooser();
    component.searchDataGrid({ value: '' });

    expect(showColumnChooserCalled).toBeTruthy();
    expect(searchByTextCalled).toBeTruthy();
  });

  it('should display the filter builder', () => {
    expect(component.filterBuilderVisible).toBeFalsy();
    component.showFilterBuilder();
    expect(component.filterBuilderVisible).toBeTruthy();
  });

  it('calculates applied filter counts', () => {
    const mock = {
      instance: {
        getCombinedFilter: () => ['', '', ''],
      },
    };

    (component.dataGrid as any) = mock;

    component.calculateAppliedFilterCount();
    expect(component.appliedFilterCount).toEqual(1);

    mock.instance.getCombinedFilter = () =>
      ['', '', [['2', '', ''], 'or', ['', '', ''], 'or', ['', '', '']]] as any;

    component.searchText = 'test';
    component.calculateAppliedFilterCount();
    expect(component.appliedFilterCount).toEqual(2);
  });

  it('should handle grid cell prepared events', () => {
    type cellEvt = {
      rowType: string;
      column: any;
      data: any;
      cellElement: any;
    };

    const evt: cellEvt = { rowType: '', column: {}, data: {}, cellElement: {} };

    evt.rowType = 'detail';
    evt.data.id = 1;

    component.onCellPrepared(evt);
    expect(evt.cellElement.id).toEqual('ba-detail-1');

    evt.rowType = 'data';
    evt.column.type = 'detailExpand';

    component.onCellPrepared(evt);
    expect(evt.cellElement.id).toEqual('ba-expand-1');

    evt.rowType = 'header';
    evt.column.caption = 'whatever';

    component.onCellPrepared(evt);
    expect(evt.cellElement.id).toEqual('ba-header-whatever');
  });

  it('should toggle the clear filters text', () => {
    expect(component.showClearFilters).toBeFalsy();
    component.toggleClearFilters();
    expect(component.showClearFilters).toBeTruthy();
  });

  it('should clear grid filters', () => {
    let stopPropagationCalled = false;
    let clearFilterCalled = false;

    const evtMock = {
      stopPropagation: () => {
        stopPropagationCalled = true;
      },
    };
    const gridMock = {
      instance: {
        clearFilter: () => {
          clearFilterCalled = true;
        },
      },
    };

    (component.dataGrid as any) = gridMock;
    component.clearGridFilters(evtMock);

    expect(stopPropagationCalled).toBeTruthy();
    expect(clearFilterCalled).toBeTruthy();
    expect(component.showClearFilters).toBeFalsy();
    expect(component.searchText).toBeNull();
  });

  it('should toggle the cancel modal', () => {
    expect(component.cancelModalVisible).toBeFalsy();
    component.cancelModalToggle();
    expect(component.cancelModalVisible).toBeTruthy();
  });

  it('should navigate to add a new batch', inject(
    [Router],
    (router: Router) => {
      const spy = spyOn(router, 'navigate').and.stub();

      component.addNewBatch();
      expect(spy).toHaveBeenCalledWith(['batcheventlist'], {
        queryParamsHandling: 'merge',
      });
    }
  ));

  it('should cancel a batch', () => {
    const spySuccess = spyOn(component.service, 'cancelBatch').and.callFake(
      () => of({ isCancelled: true })
    );

    component.cancelModalVisible = true;
    (component as any).hoveredRowBatchId = 1;

    component.cancelBatch();

    expect(component.cancelModalVisible).toBeFalsy();
    expect(spySuccess).toHaveBeenCalledWith(1);

    const spyFail = spySuccess.and.callFake(() =>
      of({ isCancelled: false, errorMessage: 'err' })
    );

    component.cancelModalVisible = true;
    (component as any).hoveredRowBatchId = 2;

    component.cancelBatch();

    expect(component.cancelModalVisible).toBeFalsy();
    expect(spyFail).toHaveBeenCalledWith(2);
  });

  it('should handle detail content ready events', () => {
    const batchLog = {
      data: {
        classificationParameters: [
          {
            accountingTermBeginDate: '',
            accountingTermEndDate: '',
            termBeginDirectEntry: '2022-01-01T12:00:00Z',
            termEndDirectEntry: '2022-01-01T12:00:00Z',
            discountRateProfile: 'Direct Entry',
            annualRate: 1,
            annualRateType: 'APR',
            commentsDirectEntry: 'comments',
            comments: '',
            manualAssetAdjustment: 'Direct Entry',
            manualAdjustmentDirectEntry: 100,
          },
          {
            accountingTermBeginDate: '1/1/2022',
            accountingTermEndDate: '1/1/2022',
            termBeginDirectEntry: null,
            termEndDirectEntry: null,
            discountRateProfile: 'whatever',
            annualRate: null,
            annualRateType: null,
            commentsDirectEntry: '',
            comments: 'comments',
            manualAssetAdjustment: 0,
            manualAdjustmentDirectEntry: null,
          },
        ],
      },
    };

    component.baseService.dateFormat = 'MM/dd/yyyy';
    component.onDetailContentReady(batchLog);

    const modifiedDirectEntry = batchLog.data.classificationParameters[0];
    const modified = batchLog.data.classificationParameters[1];

    expect(modifiedDirectEntry.discountRateProfile).toEqual('1% APR');
    expect(modifiedDirectEntry.accountingTermBeginDate).toEqual('1/1/2022');
    expect(modifiedDirectEntry.accountingTermEndDate).toEqual('1/1/2022');
    expect(modifiedDirectEntry.comments).toEqual('comments');
    expect(modifiedDirectEntry.manualAssetAdjustment).toEqual(100);

    expect(modified.discountRateProfile).toEqual('whatever');
    expect(modified.accountingTermBeginDate).toEqual('1/1/2022');
    expect(modified.accountingTermEndDate).toEqual('1/1/2022');
    expect(modified.comments).toEqual('comments');
    expect(modified.manualAssetAdjustment).toEqual(0);
  });

  it('should update the hovered row batch ID on hover', () => {
    (component as any).hoveredRowBatchId = 1;

    // It expects an object with a 'key' property, which itself is
    // an object with an 'id' property. But it should not fail if sent bad data.
    component.cellHoverChanged(null);
    component.cellHoverChanged({ key: null });
    component.cellHoverChanged({ key: { id: 3 } });

    expect((component as any).hoveredRowBatchId).toEqual(3);
  });
});
