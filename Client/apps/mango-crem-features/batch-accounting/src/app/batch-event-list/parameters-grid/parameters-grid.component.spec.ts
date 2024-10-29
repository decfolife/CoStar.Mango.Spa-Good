/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatCardModule } from '@angular/material/card';
import { DevExtremeModule, DxDataGridModule } from 'devextreme-angular';

import { ParametersGridComponent } from './parameters-grid.component';

const serviceMock = (returnObj) => () => ({ subscribe: (fn) => fn(returnObj) });

describe('ParametersGridComponent', () => {
  let component: ParametersGridComponent;
  let fixture: ComponentFixture<ParametersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametersGridComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        DevExtremeModule,
        DxDataGridModule,
        MatCardModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get isValid status', () => {
    expect(component.isValid).toBeFalsy();
    (component as any)._isValid = true;
    expect(component.isValid).toBeTruthy();
  });

  it('should implement ngOnInit', () => {
    expect(component).toHaveProperty('ngOnInit');
    expect(component.ngOnInit).toBeInstanceOf(Function);

    const popPCCOSpy = spyOn(
      component as any,
      'populatePortfolioClassificationConfigurationOptions'
    );
    const popPSPCCSpy = spyOn(
      component as any,
      'populatePortfolioSettingsAndPortfolioClassificationConfiguration'
    );
    const setDGGEOSpy = spyOn(component as any, 'setDefaultGridEditorOptions');

    component.parametersData = {
      gridLoaded: true,
      gridOverrides: null,
      gridData: [],
    } as any;

    component.ngOnInit();

    expect(component.parameterOverrides).toBeNull();
    expect(component.gridData.length).toEqual(0);
    expect(popPCCOSpy).toHaveBeenCalled();
    expect(popPSPCCSpy).toHaveBeenCalled();
    expect(setDGGEOSpy).toHaveBeenCalled();
  });

  it('should get classification name', () => {
    component.classificationTypes = [
      { classificationID: 1, classificationType: 'test' },
    ];

    const type = component.getClassificationName(1);

    expect(type).toEqual('test');
  });

  it('should set measurement settings by measure event', () => {
    const fullTermSpy = spyOn(component, 'checkFullTermination');
    const measureEvent = { remeasureTypeId: 1, remeasureTypeName: 'test' };

    component.isReadOnly = true;
    component.parametersData = { cardMeasureEvent: {} } as any;
    component.setMeasurementSettingsByMeasureEvent(measureEvent);

    expect(fullTermSpy).toHaveBeenCalled();

    component.isReadOnly = false;
    component.setMeasurementSettingsByMeasureEvent(null);

    expect(component.measureEventType).toBeNull();
    expect((component as any).remeasureParameters.length).toEqual(0);

    let customLoadingBegin = false;
    let customLoadingEnd = false;

    component.availableDataGrid = {
      instance: {
        beginCustomLoading: () => {
          customLoadingBegin = true;
        },
        endCustomLoading: () => {
          customLoadingEnd = true;
        },
      },
    } as any;

    component.portfolioClassificationConfiguration = [
      { remeasureTypeName: 'test', classificationID: 1 },
    ] as any[];
    component.classificationTypes = [{ classificationID: 1 }] as any[];

    component.setMeasurementSettingsByMeasureEvent(measureEvent);

    expect(component.measureEventType).toEqual(measureEvent);
    expect(customLoadingBegin).toBeTruthy();
    expect(customLoadingEnd).toBeTruthy();
  });

  it('should check for full termination', () => {
    component.checkFullTermination({ remeasureTypeName: 'whatever' } as any);

    expect(component.beginDateReadOnly).toBeFalsy();
    expect(component.discountRateReadOnly).toBeFalsy();

    (component as any).remeasureParameters = [{}];
    component.checkFullTermination({
      remeasureTypeName: 'Full Termination',
    } as any);

    expect(component.beginDateReadOnly).toBeTruthy();
    expect(component.discountRateReadOnly).toBeTruthy();
    expect(component.defaultManualAdjustmentOptions.length).toEqual(1);
    expect(component.discountRateOptions.length).toEqual(1);
    expect(component.parameterOverrides.annualRateOverride).toEqual('0');

    const params = (component as any).remeasureParameters[0];
    expect(params.manualAdjustmentOption).toEqual('No Adjustment');
    expect(params.discountRateProfile).toEqual('Not Applicable');
  });

  it('should handle discount rate parameter changes', () => {
    component.parameterOverrides = {} as any;
    component.discountRateParameterChange('test', { value: 'val' });

    expect((component.parameterOverrides as any).test).toEqual('val');
  });

  it('should handle editor preparing', () => {
    const evt = {
      dataField: 'beginValueExpr',
      editorOptions: {},
      row: { data: {} },
    };

    component.onEditorPreparing(evt);

    const val = { value: 'whatever 2 3 4' };
    (evt.editorOptions as any).onValueChanged(val);

    expect((evt.row.data as any).beginDateOptionID).toEqual(2);
    expect((evt.row.data as any).beginDateFormItemID).toEqual(4);
    expect((evt.row.data as any).beginValueExpr).toEqual(val.value);

    evt.dataField = 'endValueExpr';
    component.onEditorPreparing(evt);

    val.value = 'abcd 1 2 3';
    (evt.editorOptions as any).onValueChanged(val);

    expect((evt.row.data as any).endDateOptionID).toEqual(1);
    expect((evt.row.data as any).endDateFormItemID).toEqual(3);
    expect((evt.row.data as any).endValueExpr).toEqual(val.value);

    evt.dataField = 'journalEntryProfileID';
    (evt.row.data as any).classificationID = 1;
    component.portfolioClassificationConfigurationOptions = {
      journalEntryProfiles: [{ leaseRecognitionType: 1 }],
    };

    component.onEditorPreparing(evt);
    expect((evt.editorOptions as any).dataSource.length).toEqual(3);
  });

  it('should handle parameter cell changes', () => {
    let saveCalled = false;
    const mockGrid = {
      instance: {
        hasEditData: () => true,
        saveEditData: () => {
          saveCalled = true;
        },
      },
    } as any;

    component.availableDataGrid = mockGrid;

    expect(saveCalled).toBeFalsy();
    component.onParameterCellChange();
    expect(saveCalled).toBeTruthy();
  });

  it('should update validity', () => {
    component.form = null;
    component.updateValidity();

    component.form = {
      instance: { validate: () => ({ isValid: true }) },
    } as any;
    component.parameterOverrideRequired = {
      discountRateOverride: false,
    } as any;

    component.updateValidity();
    expect(component.isValid).toBeTruthy();
  });

  it('should handle annual rate value changes', () => {
    component.parameterOverrides = {
      annualRateOverride: true,
      annualRateTypeOverride: true,
      paymentTimingOverride: true,
      discountRateOverride: true,
    } as any;

    component.annualRateValueChanged({ value: true });

    expect(component.parameterOverrides.annualRateOverride).toBeTruthy();
    expect(component.parameterOverrides.annualRateTypeOverride).toBeTruthy();
    expect(component.parameterOverrides.paymentTimingOverride).toBeTruthy();
    expect(component.parameterOverrides.discountRateOverride).toBeTruthy();

    component.annualRateValueChanged({ value: null });

    expect(component.parameterOverrides.annualRateOverride).toBeNull();
    expect(component.parameterOverrides.annualRateTypeOverride).toBeNull();
    expect(component.parameterOverrides.paymentTimingOverride).toBeNull();
    expect(component.parameterOverrides.discountRateOverride).toBeNull();
  });

  it('should update discount rate', () => {
    const validSpy = spyOn(component, 'validateDiscountRateOverride');

    component.updateDiscountRate({ value: null });
    expect(validSpy).toHaveBeenCalledTimes(0);

    component.parameterOverrides = {
      annualRateOverride: 1,
      annualRateTypeOverride: 'APY',
    } as any;
    component.parameterOverrideRequired = {
      discountRateOverride: false,
    } as any;
    component.updateDiscountRate({ value: true });

    expect(validSpy).toHaveBeenCalled();
    expect(component.parameterOverrides.discountRateOverride).toBeNull(); // Because of the spy
  });

  it('should validate JE profiles', () => {
    component.portfolioClassificationConfigurationOptions = {
      journalEntryProfiles: [{ journalEntryProfileID: 1 }],
    };
    component.availableDataGrid = {
      instance: {
        getDataSource: () => ({ items: () => [{ journalEntryOption: '' }] }),
      },
    } as any;

    component.validateJEProfiles();
  });

  it('should validate a JE profile', () => {
    let valid = component.validateJEProfile({ value: 1 });
    expect(valid).toBeTruthy();

    component.portfolioClassificationConfigurationOptions = {
      journalEntryProfiles: [{ profileName: 'test', profileID: 1 }],
    };
    const obj = { data: {}, value: 1 };
    valid = component.validateJEProfile(obj);

    expect((obj.data as any).journalEntryOption).toEqual('test');
    expect(valid).toBeTruthy();
  });

  it('should validate a rate range', () => {
    expect(component.validateRateRange({ value: null })).toBeFalsy();
    expect(component.validateRateRange({ value: 10000 })).toBeFalsy();
    expect(component.validateRateRange({ value: -9999 })).toBeTruthy();
    expect(component.validateRateRange({ value: 1234.9876 })).toBeTruthy();
  });

  it('should validate begin date entries', () => {
    expect(component.validateBeginDate({ value: null })).toBeTruthy();
    component.parameterOverrides = {
      accountingTermEndDateOverride: null,
    } as any;
    expect(component.validateBeginDate({ value: new Date() })).toBeTruthy();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    component.parameterOverrides = {
      accountingTermEndDateOverride: tomorrow,
    } as any;
    expect(component.validateBeginDate({ value: new Date() })).toBeTruthy();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    component.parameterOverrides = {
      accountingTermEndDateOverride: yesterday,
    } as any;
    expect(component.validateBeginDate({ value: new Date() })).toBeFalsy();
  });

  it('should validate end date entries', () => {
    expect(component.validateEndDate({ value: null })).toBeTruthy();
    component.parameterOverrides = {
      accountingTermBeginDateOverride: null,
    } as any;
    expect(component.validateEndDate({ value: new Date() })).toBeTruthy();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    component.parameterOverrides = {
      accountingTermBeginDateOverride: yesterday,
    } as any;
    expect(component.validateEndDate({ value: new Date() })).toBeTruthy();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    component.parameterOverrides = {
      accountingTermBeginDateOverride: tomorrow,
    } as any;
    expect(component.validateEndDate({ value: new Date() })).toBeFalsy();
  });

  it('should validate discount rate override', () => {
    component.parameterOverrideRequired.discountRateOverride = null;
    expect(component.validateDiscountRateOverride()).toBeTruthy();

    component.parameterOverrideRequired.discountRateOverride = true;
    component.parameterOverrides = { annualRateOverride: 1 } as any;
    expect(component.validateDiscountRateOverride()).toBeFalsy();

    component.parameterOverrides = {
      annualRateOverride: 1,
      annualRateTypeOverride: '',
      paymentTimingOverride: '',
    } as any;
  });

  it('should handle parameter changes', () => {
    expect((component as any).parameterChange()).toBeUndefined();

    component.availableDataGrid = {
      instance: {
        getDataSource: () => ({
          items: () => [
            { beginValueExpr: 'OptionID: 2 FormItemID: -1' },
            { endValueExpr: 'OptionID: 2 FormItemID: -1' },
            { commentsOption: 'Direct Entry' },
            { discountRateProfile: 'Direct Entry' },
            { manualAdjustmentOption: 'Direct Entry' },
          ],
        }),
      },
    } as any;

    (component as any).parameterChange();

    expect(
      component.parameterOverrideRequired.accountingTermBeginDateOverride
    ).toBeTruthy();
    expect(
      component.parameterOverrideRequired.accountingTermEndDateOverride
    ).toBeTruthy();
    expect(component.parameterOverrideRequired.commentsOverride).toBeTruthy();
    expect(
      component.parameterOverrideRequired.discountRateOverride
    ).toBeTruthy();
    expect(
      component.parameterOverrideRequired.manualAssetAdjustmentOverride
    ).toBeTruthy();
  });

  it('should populate portfolio classification config options', () => {
    component.masterGroupID = 1;

    const mockData = { journalEntryProfiles: [] };
    const spy = spyOn(
      component.batchParametersService,
      'getPortfolioClassificationConfigurationOptions'
    ).and.callFake(serviceMock(mockData));

    (component as any).populatePortfolioClassificationConfigurationOptions();

    expect(spy).toHaveBeenCalledWith(1);
    expect(mockData.journalEntryProfiles.length).toEqual(2);
  });

  it('should populate portfolio settings and portfolio classification config options', () => {
    component.masterGroupID = 1;
    const mockData = {
      item1: {
        defaultAnnualRateType: 1,
        directEntryDiscountRateEnabled: true,
        discountRateMatching: true,
      },
      item2: {},
    };

    const settingsSpy = spyOn(
      component.batchParametersService,
      'getPortfolioSettings'
    ).and.callFake(serviceMock(mockData));
    const configSpy = spyOn(
      component.batchParametersService,
      'getPortfolioClassificationConfiguration'
    ).and.callFake(serviceMock([{ discountRateProfile: 1 }]));

    (
      component as any
    ).populatePortfolioSettingsAndPortfolioClassificationConfiguration();

    expect(settingsSpy).toHaveBeenCalledWith(1);
    expect(configSpy).toHaveBeenCalledWith(1);

    expect(component.portfolioSettings).toHaveProperty('defaultAnnualRateType');
    expect(component.parameterOverrides.annualRateTypeOverride).toEqual('APR');
  });
});
