/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { DevExtremeModule } from 'devextreme-angular';
import { ParametersData } from '../../shared/models';

import { ParametersCardComponent } from './parameters-card.component';

describe('ParametersCardComponent', () => {
  let component: ParametersCardComponent;
  let fixture: ComponentFixture<ParametersCardComponent>;

  const parametersData: ParametersData = {
    workflowStatuses: null,
    workflowSettings: null,
    measureEvents: null,
    cardMeasureEvent: null,
    cardNextWorkflowStatus: null,
    cardWorkflowComment: '',
    grid: null,
    gridData: null,
    gridOverrides: null,
    gridLoaded: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametersCardComponent],
      imports: [MatCardModule, DevExtremeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersCardComponent);
    component = fixture.componentInstance;
    component.parametersData = parametersData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get isValid status', () => {
    expect(component.isValid).toBeFalsy();
    component.form = null;
    expect(component.isValid).toBeTruthy();
  });

  it('should handle measure event changes', async (done) => {
    component.selectedMeasureEventChange.subscribe((val) => {
      expect(val).toEqual('test');
      done();
    });

    component.measureEventChanged({ value: 'test' });
  });

  it('should filter the next workflow status dropdown options', () => {
    component.scheduleObject = {
      SelectedWorkflowStatus: { statusOrder: 0 },
    } as any;
    component.parametersData.workflowSettings = {
      isIncrementOneLevelEnforced: false,
    } as any;
    component.parametersData.workflowStatuses = [
      { statusOrder: 0, userHasRights: false, allUsersHaveRights: true } as any,
      { statusOrder: 2, userHasRights: false, allUsersHaveRights: true } as any,
      {
        statusOrder: 1,
        userHasRights: false,
        allUsersHaveRights: false,
      } as any,
    ];

    (component as any).filterNextWorkflowStatusDropdown();
    expect(component.nextWorkflowStatuses.length).toEqual(2);

    component.parametersData.workflowSettings.isIncrementOneLevelEnforced =
      true;
    (component as any).filterNextWorkflowStatusDropdown();
    expect(component.nextWorkflowStatuses.length).toEqual(2);
  });

  it('should filter the measure event dropdown options', () => {
    component.parametersData.measureEvents = [{ remeasureTypeId: 1 }] as any[];
    component.parametersData.cardMeasureEvent = { remeasureTypeId: 1 } as any;
    component.scheduleObject = {
      SelectedWorkflowStatus: { statusOrder: 0 },
      ClassificationTypes: [{ classificationID: 1 }],
    } as any;

    (component as any).filterMeasureEventDropdown();
    expect(component.measureEvents.length).toEqual(1);
  });
});
